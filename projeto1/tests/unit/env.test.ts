import { describe, expect, it } from "vitest";
import { getEnv } from "@/server/config/env";
import { setTestEnv } from "../helpers";

describe("configuração", () => {
  it("exige APP_SECRET e DATABASE_URL em produção", () => {
    setTestEnv({ NODE_ENV: "production", APP_SECRET: undefined });
    expect(() => getEnv()).toThrow(/APP_SECRET/);
    setTestEnv({ NODE_ENV: "production" });
    expect(() => getEnv()).toThrow(/DATABASE_URL/);
    setTestEnv({ NODE_ENV: "production", ALLOW_IN_MEMORY_STORE: "true" });
    expect(() => getEnv()).not.toThrow();
  });
  it("não expõe valores de variáveis inválidas na mensagem de erro", () => {
    setTestEnv({ DATABASE_URL: "nao-e-url-segredo-123" });
    try {
      getEnv();
      throw new Error("deveria falhar");
    } catch (e) {
      expect(String(e)).toMatch(/DATABASE_URL/);
      expect(String(e)).not.toMatch(/segredo-123/);
    }
  });
});
