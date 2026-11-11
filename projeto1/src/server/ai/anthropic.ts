import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { GuardClassificationSchema, type ClassifyInput, type GuardClassification } from "../guard/classification";
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

  async classify(input: ClassifyInput): Promise<GuardClassification> {
    try {
      return await classifyWithAnthropic(this.getClient(), input);
    } catch (err) {
      throw mapError(err);
    }
  }

  async *streamChat(input: StreamChatInput): AsyncIterable<ProviderEvent> {
    const env = getEnv();
    const client = this.getClient();

    const messages: Anthropic.Beta.BetaMessageParam[] = [
      ...input.history.map((t) => ({ role: t.role, content: t.content })),
      { role: "user", content: input.userContent },
    ];
    if (input.operatorNote) {
      // Mensagem de sistema no meio da conversa: canal de operador, não confundível com o estudante.
      messages.push({ role: "system", content: input.operatorNote });
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

export async function classifyWithAnthropic(client: Anthropic, input: ClassifyInput): Promise<GuardClassification> {
  const env = getEnv();
  const response = await client.messages.parse(
    {
      model: env.AI_GUARD_MODEL ?? env.AI_MODEL,
      max_tokens: 2048,
      system: [{ type: "text", text: input.system }],
      messages: [{ role: "user", content: input.userContent }],
      output_config: { effort: "low", format: zodOutputFormat(GuardClassificationSchema) },
    },
    { signal: input.signal, timeout: env.AI_GUARD_TIMEOUT_MS, maxRetries: 1 },
  );
  if (response.stop_reason === "refusal") throw new AIProviderError("refused", "Classificação recusada.");
  if (!response.parsed_output) throw new AIProviderError("upstream", "Classificação inválida.");
  return GuardClassificationSchema.parse(response.parsed_output);
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
