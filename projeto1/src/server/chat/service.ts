import "server-only";
import { getPersonality } from "@/content";
import type { Reference } from "@/content/types";
import { ChatRequestSchema, type ChatStreamEvent } from "@/lib/validation";
import { getEnv } from "../config/env";
import { getAIProvider } from "../ai";
import { AIProviderError, type ChatTurn } from "../ai/provider";
import { assessInjection, neutralizeDelimiters } from "../ai/guard";
import { buildSystemPrompt, buildUserContent } from "../ai/prompt";
import { runGuard } from "../guard";
import { buildRedirect, buildUnsafeDecline } from "../guard/redirect";
import { validateOutput } from "../guard/output";
import { getRetriever } from "../knowledge/retriever";
import { getConversationStore } from "../conversations/store";
import { getLimitStore } from "../limits/limiter";
import { getClientIp, HttpError, jsonError, readJsonBody, assertSameOrigin } from "../security/request";
import { resolveIdentity } from "../security/identity";
import { hmac } from "../security/crypto";
import { logError, logEvent } from "../observability/logger";
import { recordUsage } from "./usage";

const MAX_BODY_BYTES = 16 * 1024;
const HISTORY_TURNS = 20;
const RETRIEVAL_K = 4;
/** Limite defensivo do tamanho da resposta acumulada. */
const MAX_RESPONSE_CHARS = 20_000;

/** Marcador secreto no prompt de sistema; se aparecer na saída, houve vazamento. */
export function systemCanary(): string {
  return `P1-${hmac("system-prompt", "canary").slice(0, 16)}`;
}

const AI_ERROR_MESSAGES: Record<AIProviderError["kind"], { status: number; message: string }> = {
  not_configured: { status: 503, message: "A inteligência artificial ainda não está configurada neste ambiente." },
  rate_limited: { status: 503, message: "O serviço de IA está com alta demanda. Tente novamente em instantes." },
  overloaded: { status: 503, message: "O serviço de IA está temporariamente indisponível. Tente novamente em instantes." },
  refused: { status: 422, message: "Não posso ajudar com essa solicitação. Que tal fazer outra pergunta sobre o tema?" },
  timeout: { status: 504, message: "A resposta demorou demais. Tente novamente." },
  upstream: { status: 502, message: "Não foi possível gerar a resposta agora. Tente novamente." },
};

async function enforceLimits(req: Request, ownerHash: string): Promise<void> {
  const env = getEnv();
  const limits = getLimitStore();
  const ip = getClientIp(req.headers);
  const checks: [string, number, number][] = [
    [`own:m:${ownerHash}`, 60, env.RATE_LIMIT_PER_MINUTE],
    [`own:d:${ownerHash}`, 86_400, env.RATE_LIMIT_PER_DAY],
    ["global:d", 86_400, env.GLOBAL_DAILY_MESSAGE_CAP],
  ];
  // Limite por IP (pseudonimizado via HMAC) impede contornar o limite apagando o cookie.
  if (ip !== "unknown") {
    const ipKey = hmac(ip, "ip").slice(0, 32);
    checks.unshift([`ip:m:${ipKey}`, 60, env.RATE_LIMIT_PER_MINUTE * 2], [`ip:d:${ipKey}`, 86_400, env.RATE_LIMIT_PER_DAY * 3]);
  }
  for (const [key, window, limit] of checks) {
    const r = await limits.hit(key, window, limit);
    if (!r.allowed) {
      logEvent("rate_limited", { bucket: key.split(":").slice(0, 2).join(":") });
      throw Object.assign(
        new HttpError(429, "rate_limited", key.startsWith("global")
          ? "O limite diário da plataforma foi atingido. Tente novamente amanhã."
          : "Você enviou muitas mensagens. Aguarde um pouco e tente novamente."),
        { retryAfter: r.retryAfterSeconds },
      );
    }
  }
}

function uniqueSources(refs: Reference[]): { title: string; publisher: string; url?: string }[] {
  const seen = new Set<string>();
  const out: { title: string; publisher: string; url?: string }[] = [];
  for (const r of refs) {
    const key = r.url ?? r.title;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ title: r.title, publisher: r.publisher, ...(r.url?.startsWith("https://") ? { url: r.url } : {}) });
  }
  return out.slice(0, 6);
}

export async function handleChat(req: Request): Promise<Response> {
  let setCookie: string | undefined;
  try {
    assertSameOrigin(req);
    const raw = await readJsonBody(req, MAX_BODY_BYTES);
    const parsed = ChatRequestSchema.safeParse(raw);
    if (!parsed.success) {
      throw new HttpError(400, "invalid_request", parsed.error.issues[0]?.message ?? "Requisição inválida.");
    }
    const input = parsed.data;
    const personality = getPersonality(input.personalitySlug)!;

    const provider = getAIProvider();
    if (!provider.isConfigured()) {
      throw new HttpError(503, "ai_not_configured", AI_ERROR_MESSAGES.not_configured.message);
    }

    const identity = resolveIdentity(req.headers, true)!;
    setCookie = identity.setCookie;
    const owner = identity.ownerHash;

    await enforceLimits(req, owner);

    const store = getConversationStore();
    const env = getEnv();
    let session = input.sessionId ? await store.getSession(owner, input.sessionId) : null;
    if (input.sessionId && !session) {
      // Mesmo erro para "inexistente" e "de outra pessoa": não revela a existência de sessões alheias.
      throw new HttpError(404, "session_not_found", "Conversa não encontrada ou expirada. Inicie uma nova conversa.");
    }
    if (session && session.personalitySlug !== personality.slug) {
      throw new HttpError(400, "session_mismatch", "Esta conversa pertence a outra personalidade.");
    }
    session ??= await store.createSession(owner, personality.slug, input.level);

    if ((await store.countMessages(owner, session.id)) >= env.MAX_MESSAGES_PER_SESSION) {
      throw new HttpError(409, "session_full", "Esta conversa atingiu o limite de mensagens. Inicie uma nova conversa.");
    }

    const history: ChatTurn[] = (await store.listMessages(owner, session.id, HISTORY_TURNS)).map((m) => ({
      role: m.role,
      content: m.role === "user" ? `<mensagem_do_estudante>\n${neutralizeDelimiters(m.content)}\n</mensagem_do_estudante>` : m.content,
    }));
    // A API exige que o histórico comece com o usuário.
    while (history[0]?.role === "assistant") history.shift();

    const chunks = await getRetriever().retrieve(personality.slug, input.message, RETRIEVAL_K);
    const injection = assessInjection(input.message);
    if (injection.flagged) logEvent("injection_signal", { personality: personality.slug, reasons: injection.reasons.join(",") });

    const canary = systemCanary();
    const system = buildSystemPrompt(personality, canary);
    const userContent = buildUserContent(chunks, input.message, input.level);
    const sources = uniqueSources(chunks.flatMap((c) => c.references));
    const sessionId = session.id;
    const turn = history.length;

    const encoder = new TextEncoder();
    const abort = new AbortController();
    req.signal?.addEventListener("abort", () => abort.abort());

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        const send = (e: ChatStreamEvent) => controller.enqueue(encoder.encode(`${JSON.stringify(e)}\n`));
        let text = "";
        try {
          // 1) Conversation Guard: classificação semântica e decisão ANTES da geração.
          const decision = await runGuard(provider, personality, history, input.message, injection.flagged, abort.signal);
          logEvent("guard_decision", { personality: personality.slug, action: decision.action, relevance: decision.relevance, flags: decision.flags.join(",") });

          // 2) Fora do escopo / conteúdo inadequado: resposta do servidor, sem desenvolver o assunto.
          if (decision.action !== "respond") {
            const reply =
              decision.action === "redirect"
                ? buildRedirect(personality, input.message, turn)
                : buildUnsafeDecline(personality, input.message, turn);
            send({ type: "meta", sessionId, sources: [] });
            send({ type: "delta", text: reply });
            await store.appendMessages(owner, sessionId, [
              { role: "user", content: input.message },
              { role: "assistant", content: reply },
            ]);
            await recordUsage({
              personalitySlug: personality.slug,
              model: "guard",
              inputTokens: 0,
              outputTokens: 0,
              stopReason: decision.action,
              injectionFlagged: injection.flagged,
              relevance: decision.relevance,
              guardAction: decision.action,
              guardFlags: decision.flags,
            });
            send({ type: "done", truncated: false });
            return;
          }

          // 3) Geração com as orientações do Guard e validação contínua da saída.
          send({ type: "meta", sessionId, sources });
          for await (const ev of provider.streamChat({
            system,
            history,
            userContent,
            operatorNote: decision.notes.length ? decision.notes.join("\n\n") : undefined,
            signal: abort.signal,
          })) {
            if (ev.type === "text") {
              text += ev.text;
              const violation = text.includes(canary) ? "canary" : text.length > MAX_RESPONSE_CHARS ? "length" : validateOutput(text, personality);
              if (violation) {
                abort.abort();
                logEvent("output_blocked", { personality: personality.slug, reason: violation });
                send({ type: "error", code: "output_blocked", message: "A resposta foi interrompida por desviar das regras da simulação. Tente reformular a pergunta." });
                return;
              }
              send({ type: "delta", text: ev.text });
            } else {
              const truncated = ev.stopReason === "max_tokens";
              await store.appendMessages(owner, sessionId, [
                { role: "user", content: input.message },
                { role: "assistant", content: text.trim() || "(sem resposta)" },
              ]);
              await recordUsage({
                personalitySlug: personality.slug,
                model: ev.model,
                inputTokens: ev.inputTokens,
                outputTokens: ev.outputTokens,
                stopReason: ev.stopReason,
                injectionFlagged: injection.flagged,
                relevance: decision.relevance,
                guardAction: decision.action,
                guardFlags: decision.flags,
              });
              send({ type: "done", truncated });
            }
          }
        } catch (err) {
          const kind = err instanceof AIProviderError ? err.kind : "upstream";
          logError("chat_stream_failed", err, { personality: personality.slug });
          send({ type: "error", code: `ai_${kind}`, message: AI_ERROR_MESSAGES[kind].message });
        } finally {
          try {
            controller.close();
          } catch {
            /* já fechado */
          }
        }
      },
      cancel() {
        abort.abort();
      },
    });

    const headers: Record<string, string> = {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    };
    if (setCookie) headers["Set-Cookie"] = setCookie;
    return new Response(body, { status: 200, headers });
  } catch (err) {
    if (err instanceof HttpError) {
      const extra: Record<string, string> = {};
      const retryAfter = (err as HttpError & { retryAfter?: number }).retryAfter;
      if (retryAfter) extra["Retry-After"] = String(retryAfter);
      if (setCookie) extra["Set-Cookie"] = setCookie;
      return jsonError(err, extra);
    }
    logError("chat_failed", err);
    return jsonError(new HttpError(500, "internal_error", "Erro interno. Tente novamente mais tarde."));
  }
}
