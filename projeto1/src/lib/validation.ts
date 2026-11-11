import "server-only";
import { z } from "zod";
import { PERSONALITY_SLUGS } from "@/content";
import { LEVELS, MAX_MESSAGE_CHARS, sanitizeUserText } from "./chat-shared";

export * from "./chat-shared";

const slugSchema = z
  .string()
  .max(64)
  .refine((s) => PERSONALITY_SLUGS.includes(s), { message: "Personalidade desconhecida." });

export const ChatRequestSchema = z
  .object({
    personalitySlug: slugSchema,
    sessionId: z.uuid().optional(),
    level: z.enum(LEVELS).default("geral"),
    message: z
      .string()
      .transform(sanitizeUserText)
      .pipe(z.string().min(1, "Digite uma pergunta.").max(MAX_MESSAGE_CHARS, `Limite de ${MAX_MESSAGE_CHARS} caracteres.`)),
  })
  .strict(); // rejeita campos extras (proteção contra mass assignment)

export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export const SessionIdSchema = z.uuid();
