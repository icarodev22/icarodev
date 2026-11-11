import { PERSONALITIES } from "@/content";
import type { Personality } from "@/content/types";
import { normalize } from "../knowledge/tokenize";

export type OutputViolation = "identidade_trocada" | "solicita_dado_pessoal";

const PII_REQUEST =
  /\b(me (informe|diga|passe|envie|mande)|qual (e|eh) (o |a )?seu|digite|envie)\b.{0,40}\b(senha|cpf|rg|endereco|numero do cartao|cartao de credito|conta bancaria|telefone|e-?mail)\b/;

/**
 * Validação da resposta gerada (camada final). Detecta desvios objetivos:
 * assumir a identidade de outra personalidade ou solicitar dados pessoais.
 */
export function validateOutput(text: string, current: Personality): OutputViolation | null {
  const t = normalize(text);
  for (const other of PERSONALITIES) {
    if (other.slug === current.slug) continue;
    const names = [other.name, other.name.split(" ").at(-1)!].map(normalize).filter((n) => n.length >= 4);
    for (const n of new Set(names)) {
      const re = new RegExp(`\\b(eu sou|me chamo|meu nome e|aqui (e|quem fala e))\\s+(o |a )?${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
      if (re.test(t)) return "identidade_trocada";
    }
  }
  if (PII_REQUEST.test(t)) return "solicita_dado_pessoal";
  return null;
}
