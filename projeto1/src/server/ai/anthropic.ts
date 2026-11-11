import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { getEnv } from "../config/env";
import { AIProviderError, type AIProvider, type ProviderEvent, type StreamChatInput } from "./provider";

/** Integração real com a API da Anthropic (Claude). A chave fica apenas no servidor. */
export class AnthropicProvider implements AIProvider {
  readonly name = "anthropic";
  private client: Anthropic | null = null;

  isConfigured(): boolean {
    return Boolean(getEnv().ANTHROPIC_API_KEY);
  }

  private getClient(): Anthropic {
    const env = getEnv();
    if (!env.ANTHROPIC_API_KEY) throw new AIProviderError("not_configured", "Provedor de IA não configurado.");
    this.client ??= new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, timeout: env.AI_TIMEOUT_MS, maxRetries: 2 });
    return this.client;
  }

  async *streamChat(input: StreamChatInput): AsyncIterable<ProviderEvent> {
    const env = getEnv();
    const client = this.getClient();

    const messages: Anthropic.Beta.BetaMessageParam[] = [
      ...input.history.map((t) => ({ role: t.role, content: t.content })),
      { role: "user", content: input.userContent },
    ];
    if (input.securityReminder) {
      // Mensagem de sistema no meio da conversa: canal de operador, não confundível com o estudante.
      messages.push({ role: "system", content: input.securityReminder });
    }

    let stream;
    try {
      stream = client.beta.messages.stream(
        {
          model: env.AI_MODEL,
          max_tokens: env.AI_MAX_OUTPUT_TOKENS,
          system: [{ type: "text", text: input.system, cache_control: { type: "ephemeral" } }],
          messages,
          thinking: { type: "adaptive" },
          output_config: { effort: env.AI_EFFORT },
          ...(env.AI_REFUSAL_FALLBACK
            ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const }
            : {}),
        },
        { signal: input.signal },
      );
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          yield { type: "text", text: event.delta.text };
        }
      }
      const final = await stream.finalMessage();
      if (final.stop_reason === "refusal") {
        throw new AIProviderError("refused", "O modelo recusou a solicitação.");
      }
      yield {
        type: "end",
        stopReason: final.stop_reason,
        inputTokens: final.usage.input_tokens + (final.usage.cache_read_input_tokens ?? 0) + (final.usage.cache_creation_input_tokens ?? 0),
        outputTokens: final.usage.output_tokens,
        model: final.model,
      };
    } catch (err) {
      throw mapError(err);
    }
  }
}

function mapError(err: unknown): AIProviderError {
  if (err instanceof AIProviderError) return err;
  if (err instanceof Anthropic.RateLimitError) return new AIProviderError("rate_limited", "Limite do provedor atingido.");
  if (err instanceof Anthropic.AuthenticationError) return new AIProviderError("not_configured", "Credencial do provedor inválida.");
  if (err instanceof Anthropic.APIConnectionTimeoutError) return new AIProviderError("timeout", "Tempo de resposta excedido.");
  if (err instanceof Anthropic.InternalServerError) return new AIProviderError("overloaded", "Provedor indisponível.");
  if (err instanceof Anthropic.APIUserAbortError) return new AIProviderError("timeout", "Requisição cancelada.");
  if (err instanceof Anthropic.APIError) return new AIProviderError("upstream", `Erro do provedor (${err.status ?? "?"}).`);
  return new AIProviderError("upstream", "Falha ao contatar o provedor de IA.");
}
