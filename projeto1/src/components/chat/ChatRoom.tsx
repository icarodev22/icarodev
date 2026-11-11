"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowUp, Info, Loader2, Mic, RotateCcw, Square, Users, X } from "lucide-react";
import { SIMULATION_DISCLAIMER } from "@/content/notices";
import { LEVELS, LEVEL_LABELS, MAX_MESSAGE_CHARS, type Level } from "@/lib/chat-shared";
import { ChatRequestError, streamChat, type ChatSource } from "@/lib/chat-client";
import { AnimatedPortrait } from "@/components/portrait/AnimatedPortrait";
import { PortraitSvg } from "@/components/portrait/PortraitSvg";
import { MessageText } from "./MessageText";
import { ProfilePanel } from "./ProfilePanel";
import type { ChatProfile, SwitchOption } from "./types";

interface UiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  status: "streaming" | "done" | "error";
  sources?: ChatSource[];
  truncated?: boolean;
}

const LEVEL_KEY = "p1:nivel";
const sessionKey = (slug: string) => `p1:sessao:${slug}`;

function safeStorage(kind: "local" | "session"): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function ChatRoom({
  profile,
  options,
  initialQuestion,
}: {
  profile: ChatProfile;
  options: SwitchOption[];
  initialQuestion?: string;
}) {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState(initialQuestion?.slice(0, MAX_MESSAGE_CHARS) ?? "");
  const [level, setLevel] = useState<Level>("geral");
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
  const [restoring, setRestoring] = useState(true);
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const aboutRef = useRef<HTMLDialogElement>(null);
  const switchRef = useRef<HTMLDialogElement>(null);

  // Preferências e restauração da conversa da sessão atual (somente o ID fica no navegador).
  useEffect(() => {
    let cancelled = false;
    const restore = async () => {
      const stored = safeStorage("local")?.getItem(LEVEL_KEY);
      try {
        const r = await fetch("/api/status", { cache: "no-store" });
        const d = (await r.json()) as { ai?: boolean };
        if (!cancelled) setAiAvailable(Boolean(d.ai));
      } catch {
        if (!cancelled) setAiAvailable(null);
      }
      if (cancelled) return;
      if (stored && (LEVELS as readonly string[]).includes(stored)) setLevel(stored as Level);

      const sid = safeStorage("session")?.getItem(sessionKey(profile.slug));
      if (sid) {
        try {
          const r = await fetch(`/api/sessions/${encodeURIComponent(sid)}`, { cache: "no-store", credentials: "same-origin" });
          if (!r.ok) throw new Error("expirada");
          const data = (await r.json()) as { messages: { role: "user" | "assistant"; content: string }[] };
          if (!cancelled) {
            setSessionId(sid);
            setMessages(data.messages.map((m, i) => ({ id: `r${i}`, role: m.role, content: m.content, status: "done" })));
          }
        } catch {
          safeStorage("session")?.removeItem(sessionKey(profile.slug));
        }
      }
      if (!cancelled) setRestoring(false);
    };
    void restore();
    return () => {
      cancelled = true;
    };
  }, [profile.slug]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const changeLevel = (l: Level) => {
    setLevel(l);
    safeStorage("local")?.setItem(LEVEL_KEY, l);
  };

  const send = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || sending) return;
      if (message.length > MAX_MESSAGE_CHARS) {
        setNotice(`A pergunta deve ter no máximo ${MAX_MESSAGE_CHARS} caracteres.`);
        return;
      }
      setNotice(null);
      setInput("");
      setSending(true);
      const userMsg: UiMessage = { id: crypto.randomUUID(), role: "user", content: message, status: "done" };
      const botId = crypto.randomUUID();
      setMessages((m) => [...m, userMsg, { id: botId, role: "assistant", content: "", status: "streaming" }]);
      const update = (fn: (m: UiMessage) => UiMessage) => setMessages((all) => all.map((m) => (m.id === botId ? fn(m) : m)));

      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        await streamChat(
          { personalitySlug: profile.slug, sessionId, level, message },
          (e) => {
            if (e.type === "meta") {
              setSessionId(e.sessionId);
              safeStorage("session")?.setItem(sessionKey(profile.slug), e.sessionId);
              update((m) => ({ ...m, sources: e.sources }));
            } else if (e.type === "delta") {
              update((m) => ({ ...m, content: m.content + e.text }));
            } else if (e.type === "done") {
              update((m) => ({ ...m, status: "done", truncated: e.truncated }));
            } else if (e.type === "error") {
              update((m) => ({ ...m, status: "error", content: e.message }));
            }
          },
          ctrl.signal,
        );
        update((m) => (m.status === "streaming" ? { ...m, status: m.content ? "done" : "error", content: m.content || "A resposta foi interrompida." } : m));
      } catch (err) {
        if (ctrl.signal.aborted) {
          update((m) => ({ ...m, status: "done", content: m.content ? `${m.content}\n\n(Resposta interrompida.)` : "(Resposta interrompida.)" }));
        } else {
          const msg = err instanceof ChatRequestError ? err.message : "Falha de conexão. Verifique sua internet e tente novamente.";
          if (err instanceof ChatRequestError && err.code === "session_not_found") {
            setSessionId(undefined);
            safeStorage("session")?.removeItem(sessionKey(profile.slug));
          }
          // Remove a mensagem do estudante que não foi processada e devolve o texto ao campo.
          setMessages((all) => all.filter((m) => m.id !== botId && m.id !== userMsg.id));
          setInput(message);
          setNotice(msg);
        }
      } finally {
        setSending(false);
        abortRef.current = null;
        inputRef.current?.focus();
      }
    },
    [level, profile.slug, sending, sessionId],
  );

  const newConversation = async () => {
    abortRef.current?.abort();
    const old = sessionId;
    setMessages([]);
    setSessionId(undefined);
    setNotice(null);
    safeStorage("session")?.removeItem(sessionKey(profile.slug));
    if (old) {
      // Minimização de dados: a conversa anterior é apagada no servidor.
      await fetch(`/api/sessions/${encodeURIComponent(old)}`, { method: "DELETE", credentials: "same-origin" }).catch(() => undefined);
    }
    inputRef.current?.focus();
  };

  const empty = messages.length === 0 && !restoring;
  const last = messages[messages.length - 1];
  const liveText =
    last?.role === "assistant" && last.status === "done"
      ? `${profile.name} respondeu.`
      : last?.status === "error"
        ? "Não foi possível obter a resposta."
        : sending
          ? "Aguardando resposta."
          : "";

  return (
    <div className="mx-auto grid h-[calc(100dvh-3.5rem)] max-w-7xl grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(300px,380px)_minmax(0,1fr)]">
      {/* Coluna de perfil (desktop) */}
      <aside aria-label={`Sobre ${profile.name}`} className="hidden min-h-0 flex-col border-r hairline lg:flex">
        <div className="relative aspect-[4/5] max-h-[46dvh] w-full">
          <AnimatedPortrait art={profile.art} title={profile.portraitAlt} className="h-full w-full" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="eyebrow">{profile.categoryName}</p>
            <h1 className="mt-1 font-serif text-3xl leading-tight text-ivory">{profile.name}</h1>
            <p className="text-sm text-stone">{profile.periodLabel} · {profile.field}</p>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-3">
          <p className="mb-3 text-[0.7rem] leading-snug text-stone/70">{profile.portraitNotice}</p>
          <ProfilePanel p={profile} />
        </div>
      </aside>

      {/* Coluna de conversa */}
      <section aria-label="Conversa" className="flex min-h-0 min-w-0 flex-col">
        <div className="flex items-center gap-3 border-b hairline px-3 py-2.5 sm:px-5">
          <div className="flex min-w-0 flex-1 items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => aboutRef.current?.showModal()}
              className="relative size-11 shrink-0 overflow-hidden rounded-full border border-bronze/40"
              aria-label={`Ver informações sobre ${profile.name}`}
            >
              <PortraitSvg art={profile.art} title={profile.portraitAlt} className="h-full w-full" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate font-serif text-lg leading-tight text-ivory">{profile.name}</h1>
              <p className="truncate text-xs text-stone">{profile.periodLabel} · {profile.field}</p>
            </div>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-forest bg-forest/30 px-2.5 py-1 text-xs text-ivory/90 lg:inline-flex">
            <span aria-hidden className="size-1.5 rounded-full bg-bronze" />
            Simulação educacional
          </span>
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <label className="sr-only" htmlFor="nivel">Nível do estudante</label>
            <select
              id="nivel"
              value={level}
              onChange={(e) => changeLevel(e.target.value as Level)}
              className="max-w-[9.5rem] rounded-md border hairline bg-graphite px-2 py-1.5 text-xs text-ivory focus:border-bronze/60 focus:outline-none sm:max-w-none"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>{LEVEL_LABELS[l]}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => switchRef.current?.showModal()}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-stone hover:bg-charcoal hover:text-ivory"
            >
              <Users className="size-4" aria-hidden />
              <span className="hidden sm:inline">Trocar</span>
              <span className="sr-only sm:hidden">Trocar de personalidade</span>
            </button>
            <button
              type="button"
              onClick={newConversation}
              disabled={messages.length === 0 && !sessionId}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-stone hover:bg-charcoal hover:text-ivory disabled:opacity-40"
              title="Inicia uma nova conversa e apaga a atual"
            >
              <RotateCcw className="size-4" aria-hidden />
              <span className="hidden sm:inline">Nova conversa</span>
              <span className="sr-only sm:hidden">Nova conversa</span>
            </button>
          </div>
        </div>

        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-3 py-5 sm:px-6" aria-busy={sending}>
          {aiAvailable === false && (
            <div role="status" className="mx-auto mb-4 flex max-w-2xl gap-2 rounded-lg border border-umber bg-umber/25 p-3 text-sm text-ivory/90">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-bronze" aria-hidden />
              <p>A integração com a inteligência artificial ainda não foi configurada neste ambiente. As conversas ficarão disponíveis assim que a chave do provedor for definida no servidor.</p>
            </div>
          )}

          {restoring ? (
            <p className="flex items-center justify-center gap-2 py-10 text-sm text-stone">
              <Loader2 className="size-4 animate-spin" aria-hidden /> Carregando conversa…
            </p>
          ) : empty ? (
            <div className="mx-auto flex max-w-2xl flex-col items-center py-6 text-center">
              <p className="eyebrow">Comece a conversa</p>
              <p className="mt-2 font-serif text-2xl text-ivory">O que você gostaria de perguntar a {profile.name}?</p>
              <ul className="mt-6 grid w-full gap-2 sm:grid-cols-2">
                {profile.suggestedQuestions.map((q) => (
                  <li key={q}>
                    <button
                      type="button"
                      onClick={() => send(q)}
                      disabled={sending || aiAvailable === false}
                      className="h-full w-full rounded-lg border hairline bg-graphite/80 px-3.5 py-3 text-left text-sm text-ivory/90 transition-colors hover:border-bronze/50 disabled:opacity-50"
                    >
                      {q}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ol className="mx-auto flex max-w-3xl flex-col gap-5">
              {messages.map((m) => (
                <li key={m.id} className={m.role === "user" ? "flex justify-end" : "flex gap-3"}>
                  {m.role === "assistant" && (
                    <div aria-hidden className="mt-1 hidden size-8 shrink-0 overflow-hidden rounded-full border border-bronze/30 sm:block">
                      <PortraitSvg art={profile.art} title="" className="h-full w-full" />
                    </div>
                  )}
                  {m.role === "user" ? (
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-umber/70 px-4 py-2.5 text-[0.95rem] leading-relaxed text-ivory">
                      <span className="sr-only">Você: </span>
                      <p className="whitespace-pre-wrap break-words">{m.content}</p>
                    </div>
                  ) : (
                    <div className="min-w-0 max-w-[92%] flex-1">
                      <span className="sr-only">{profile.name} (simulação): </span>
                      <div
                        className={`space-y-3 break-words text-[0.97rem] leading-relaxed ${m.status === "error" ? "rounded-lg border border-umber bg-umber/20 p-3 text-ivory/90" : "text-ivory/90"}`}
                      >
                        {m.content ? (
                          <MessageText text={m.content} />
                        ) : (
                          <p className="flex items-center gap-2 text-stone">
                            <Loader2 className="size-4 animate-spin" aria-hidden /> {profile.name} está formulando a resposta…
                          </p>
                        )}
                      </div>
                      {m.truncated && <p className="mt-2 text-xs text-stone">A resposta atingiu o limite de tamanho e pode estar incompleta.</p>}
                      {m.status === "done" && m.sources && m.sources.length > 0 && (
                        <details className="mt-2 text-xs text-stone">
                          <summary className="cursor-pointer select-none hover:text-ivory">Fontes de referência consultadas</summary>
                          <ul className="mt-1.5 space-y-1 pl-3">
                            {m.sources.map((s) => (
                              <li key={s.title + s.publisher}>
                                {s.url ? (
                                  <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="underline decoration-bronze/40 underline-offset-2 hover:text-ivory">
                                    {s.title}
                                  </a>
                                ) : (
                                  s.title
                                )}{" "}
                                — {s.publisher}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-1 pl-3 text-stone/70">Trechos da base curada da plataforma (não houve consulta à internet em tempo real).</p>
                        </details>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="border-t hairline bg-ink/80 px-3 pb-3 pt-2 sm:px-6">
          {!empty && !restoring && (
            <div className="mx-auto mb-2 flex max-w-3xl gap-2 overflow-x-auto pb-1" aria-label="Perguntas sugeridas">
              {profile.suggestedQuestions.slice(0, 3).map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={sending}
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border hairline bg-graphite px-3 py-1 text-xs text-stone hover:text-ivory disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          {notice && (
            <div role="alert" className="mx-auto mb-2 flex max-w-3xl items-start gap-2 rounded-md border border-umber bg-umber/25 px-3 py-2 text-sm text-ivory/90">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-bronze" aria-hidden />
              <span className="flex-1">{notice}</span>
              <button type="button" onClick={() => setNotice(null)} aria-label="Fechar aviso" className="text-stone hover:text-ivory">
                <X className="size-4" aria-hidden />
              </button>
            </div>
          )}
          <form
            className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border hairline bg-graphite p-2 focus-within:border-bronze/50"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <label htmlFor="pergunta" className="sr-only">Sua pergunta para {profile.name}</label>
            <textarea
              id="pergunta"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_MESSAGE_CHARS}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder={`Pergunte algo a ${profile.name}…`}
              className="max-h-40 min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-2 text-[0.95rem] text-ivory placeholder:text-stone/70 focus:outline-none [field-sizing:content]"
            />
            {/* Estrutura preparada para entrada por voz; ainda não implementada. */}
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Entrada por voz: ainda não disponível nesta versão"
              className="grid size-10 shrink-0 cursor-not-allowed place-items-center rounded-xl text-stone/40"
            >
              <Mic className="size-5" aria-hidden />
              <span className="sr-only">Entrada por voz (indisponível nesta versão)</span>
            </button>
            {sending ? (
              <button
                type="button"
                onClick={() => abortRef.current?.abort()}
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-charcoal text-ivory hover:bg-umber"
              >
                <Square className="size-4" aria-hidden />
                <span className="sr-only">Parar resposta</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || aiAvailable === false}
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-ivory text-ink transition-colors hover:bg-bronze disabled:bg-charcoal disabled:text-stone/50"
              >
                <ArrowUp className="size-5" aria-hidden />
                <span className="sr-only">Enviar pergunta</span>
              </button>
            )}
          </form>
          <p className="mx-auto mt-2 flex max-w-3xl items-start gap-1.5 text-[0.7rem] leading-snug text-stone/80">
            <Info className="mt-px size-3 shrink-0" aria-hidden />
            <span>
              {SIMULATION_DISCLAIMER}{" "}
              <Link href="/transparencia" className="underline underline-offset-2 hover:text-ivory">Saiba mais</Link>
            </span>
          </p>
        </div>
      </section>

      <p className="sr-only" aria-live="polite">{liveText}</p>

      {/* Painel "Sobre" (mobile) */}
      <dialog
        ref={aboutRef}
        aria-labelledby="sobre-titulo"
        className="m-0 mt-auto max-h-[85dvh] w-full max-w-none overflow-y-auto rounded-t-2xl border hairline bg-graphite p-0 text-ivory backdrop:bg-ink/70 sm:m-auto sm:max-w-lg sm:rounded-2xl"
        onClick={(e) => e.target === aboutRef.current && aboutRef.current?.close()}
      >
        <div className="relative aspect-[16/10]">
          <PortraitSvg art={profile.art} title={profile.portraitAlt} className="h-full w-full" />
          <button
            type="button"
            onClick={() => aboutRef.current?.close()}
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ink/80 text-ivory"
          >
            <X className="size-4" aria-hidden />
            <span className="sr-only">Fechar</span>
          </button>
        </div>
        <div className="p-5">
          <h2 id="sobre-titulo" className="font-serif text-2xl">{profile.name}</h2>
          <p className="text-sm text-stone">{profile.periodLabel} · {profile.field}</p>
          <p className="mb-3 mt-2 text-[0.7rem] text-stone/70">{profile.portraitNotice}</p>
          <ProfilePanel p={profile} />
        </div>
      </dialog>

      {/* Troca de personalidade */}
      <dialog
        ref={switchRef}
        aria-labelledby="trocar-titulo"
        className="m-auto max-h-[80dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border hairline bg-graphite p-5 text-ivory backdrop:bg-ink/70"
        onClick={(e) => e.target === switchRef.current && switchRef.current?.close()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 id="trocar-titulo" className="font-serif text-xl">Trocar de personalidade</h2>
          <button type="button" onClick={() => switchRef.current?.close()} className="grid size-8 place-items-center rounded-full hover:bg-charcoal">
            <X className="size-4" aria-hidden />
            <span className="sr-only">Fechar</span>
          </button>
        </div>
        <ul className="divide-y divide-stone/10">
          {options.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/conversar/${o.slug}`}
                aria-current={o.slug === profile.slug ? "page" : undefined}
                className={`flex items-center justify-between py-2.5 text-sm ${o.slug === profile.slug ? "text-bronze" : "text-ivory/90 hover:text-bronze"}`}
              >
                {o.name}
                <span className="text-xs text-stone">{o.categoryName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </dialog>
    </div>
  );
}
