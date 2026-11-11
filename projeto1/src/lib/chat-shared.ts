/** Constantes e tipos usados no navegador e no servidor (sem importar o conteúdo curado). */
export const LEVELS = ["fundamental", "medio", "superior", "geral"] as const;
export type Level = (typeof LEVELS)[number];

export const LEVEL_LABELS: Record<Level, string> = {
  fundamental: "Ensino fundamental",
  medio: "Ensino médio",
  superior: "Ensino superior",
  geral: "Conhecimento geral",
};

export const MAX_MESSAGE_CHARS = 2000;

/** Remove caracteres de controle (exceto quebra de linha e tab) e normaliza Unicode. */
export function sanitizeUserText(s: string): string {
  return s
    .normalize("NFC")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁦-⁩﻿]/g, "")
    .trim();
}

/** Eventos NDJSON enviados pelo endpoint de chat. */
export type ChatStreamEvent =
  | { type: "meta"; sessionId: string; sources: { title: string; publisher: string; url?: string }[] }
  | { type: "delta"; text: string }
  | { type: "done"; truncated: boolean }
  | { type: "error"; code: string; message: string };
