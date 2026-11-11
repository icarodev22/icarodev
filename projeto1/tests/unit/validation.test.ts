import { describe, expect, it } from "vitest";
import { ChatRequestSchema, sanitizeUserText } from "@/lib/validation";

const ok = { personalitySlug: "socrates", message: "O que é justiça?" };

describe("validação de entrada", () => {
  it("aceita requisição válida com nível padrão", () => {
    const r = ChatRequestSchema.parse(ok);
    expect(r.level).toBe("geral");
  });
  it("rejeita personalidade fora da allowlist", () => {
    expect(ChatRequestSchema.safeParse({ ...ok, personalitySlug: "../etc/passwd" }).success).toBe(false);
    expect(ChatRequestSchema.safeParse({ ...ok, personalitySlug: "julio-cesar" }).success).toBe(false);
  });
  it("rejeita campos extras (mass assignment)", () => {
    expect(ChatRequestSchema.safeParse({ ...ok, role: "admin" }).success).toBe(false);
    expect(ChatRequestSchema.safeParse({ ...ok, system: "ignore" }).success).toBe(false);
  });
  it("rejeita mensagens vazias ou longas demais", () => {
    expect(ChatRequestSchema.safeParse({ ...ok, message: "   " }).success).toBe(false);
    expect(ChatRequestSchema.safeParse({ ...ok, message: "a".repeat(2001) }).success).toBe(false);
  });
  it("rejeita sessionId que não é UUID e nível inválido", () => {
    expect(ChatRequestSchema.safeParse({ ...ok, sessionId: "1 OR 1=1" }).success).toBe(false);
    expect(ChatRequestSchema.safeParse({ ...ok, level: "admin" }).success).toBe(false);
  });
  it("remove caracteres de controle e bidirecionais", () => {
    expect(sanitizeUserText("ol\u0000á‮ mundo​")).toBe("olá mundo");
  });
});
