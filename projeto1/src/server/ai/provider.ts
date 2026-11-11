/**
 * Camada de abstração do provedor de IA. Permite trocar de provedor sem
 * alterar o serviço de conversa. Nenhuma ferramenta (tool use) é exposta ao
 * modelo: ele não executa operações nem acessa dados.
 */
import type { ClassifyInput, GuardClassification } from "../guard/classification";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface StreamChatInput {
  system: string;
  history: ChatTurn[];
  userContent: string;
  /** Orientações do Conversation Guard (mensagem de sistema no meio da conversa). */
  operatorNote?: string;
  signal?: AbortSignal;
}

export type ProviderEvent =
  | { type: "text"; text: string }
  | { type: "end"; stopReason: string | null; inputTokens: number; outputTokens: number; model: string };

export interface AIProvider {
  readonly name: string;
  isConfigured(): boolean;
  streamChat(input: StreamChatInput): AsyncIterable<ProviderEvent>;
  /** Classificação semântica pré-geração com saída estruturada. */
  classify(input: ClassifyInput): Promise<GuardClassification>;
}

export class AIProviderError extends Error {
  constructor(
    public readonly kind: "not_configured" | "rate_limited" | "overloaded" | "refused" | "timeout" | "upstream",
    message: string,
  ) {
    super(message);
  }
}
