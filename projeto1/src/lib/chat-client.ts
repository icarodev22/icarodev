import type { ChatStreamEvent, Level } from "./validation";

export interface ChatSource {
  title: string;
  publisher: string;
  url?: string;
}

export class ChatRequestError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

/** Envia a mensagem e consome o fluxo NDJSON do servidor. */
export async function streamChat(
  body: { personalitySlug: string; sessionId?: string; level: Level; message: string },
  onEvent: (e: ChatStreamEvent) => void,
  signal: AbortSignal,
): Promise<void> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
    credentials: "same-origin",
  });
  if (!res.ok || !res.body) {
    let code = "http_error";
    let message = "Não foi possível enviar a mensagem. Tente novamente.";
    try {
      const data = (await res.json()) as { error?: { code?: string; message?: string } };
      code = data.error?.code ?? code;
      message = data.error?.message ?? message;
    } catch {
      /* corpo não-JSON */
    }
    throw new ChatRequestError(code, message, res.status);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, nl).trim();
      buffer = buffer.slice(nl + 1);
      if (!line) continue;
      try {
        onEvent(JSON.parse(line) as ChatStreamEvent);
      } catch {
        /* linha inválida ignorada */
      }
    }
  }
}
