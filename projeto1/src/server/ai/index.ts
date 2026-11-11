import "server-only";
import { getEnv } from "../config/env";
import { AnthropicProvider } from "./anthropic";
import type { AIProvider } from "./provider";

let provider: AIProvider | null = null;
let override: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (override) return override;
  if (!provider) {
    const env = getEnv();
    switch (env.AI_PROVIDER) {
      case "anthropic":
        provider = new AnthropicProvider();
        break;
    }
  }
  return provider!;
}

/** Somente para testes automatizados (injeção de dublê). Nunca usado em produção. */
export function __setAIProviderForTests(p: AIProvider | null): void {
  if (process.env.NODE_ENV === "production") throw new Error("Indisponível em produção.");
  override = p;
}
