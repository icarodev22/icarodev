import { resetEnvCache } from "@/server/config/env";
import type { AIProvider, ProviderEvent, StreamChatInput } from "@/server/ai/provider";

export const ORIGIN = "http://localhost:3000";

export function setTestEnv(extra: Record<string, string | undefined> = {}) {
  const base: Record<string, string | undefined> = {
    NODE_ENV: "test",
    ANTHROPIC_API_KEY: undefined,
    DATABASE_URL: undefined,
    APP_SECRET: "test-secret-test-secret-test-secret-0001",
    RATE_LIMIT_PER_MINUTE: "50",
    RATE_LIMIT_PER_DAY: "500",
    GLOBAL_DAILY_MESSAGE_CAP: "10000",
    TRUST_PROXY: "false",
    ALLOWED_ORIGINS: "",
    CRON_SECRET: undefined,
    ALLOW_IN_MEMORY_STORE: undefined,
    MAX_MESSAGES_PER_SESSION: undefined,
  };
  for (const [k, v] of Object.entries({ ...base, ...extra })) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  resetEnvCache();
}

/** Dublê de provedor usado SOMENTE em testes automatizados. */
export class FakeProvider implements AIProvider {
  readonly name = "fake";
  calls: StreamChatInput[] = [];
  constructor(private reply: (input: StreamChatInput) => string[] = () => ["Olá, ", "estudante."]) {}
  isConfigured() {
    return true;
  }
  async *streamChat(input: StreamChatInput): AsyncIterable<ProviderEvent> {
    this.calls.push(input);
    for (const t of this.reply(input)) yield { type: "text", text: t };
    yield { type: "end", stopReason: "end_turn", inputTokens: 10, outputTokens: 5, model: "fake-model" };
  }
}

export function chatRequest(body: unknown, opts: { cookie?: string; origin?: string | null; contentType?: string; ip?: string } = {}) {
  const headers = new Headers({ "content-type": opts.contentType ?? "application/json" });
  if (opts.origin !== null) headers.set("origin", opts.origin ?? ORIGIN);
  if (opts.cookie) headers.set("cookie", opts.cookie);
  if (opts.ip) headers.set("x-forwarded-for", opts.ip);
  return new Request(`${ORIGIN}/api/chat`, { method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body) });
}

export async function readEvents(res: Response): Promise<Record<string, unknown>[]> {
  const text = await res.text();
  return text.split("\n").filter(Boolean).map((l) => JSON.parse(l));
}

export function cookieFrom(res: Response): string | undefined {
  const sc = res.headers.get("set-cookie");
  return sc?.split(";")[0];
}
