import "server-only";
import type { Personality } from "@/content/types";
import type { AIProvider, ChatTurn } from "../ai/provider";
import { logError } from "../observability/logger";
import { buildClassifierSystem, buildClassifierUser } from "./classifier-prompt";
import { decide, type GuardDecision } from "./decision";

/**
 * Conversation Guard — camada central de políticas aplicada no servidor antes
 * da geração. Classificação semântica (modelo com saída estruturada) + decisão
 * determinística. Se o classificador falhar, a conversa segue com as regras
 * completas no prompt de sistema e uma orientação extra (falha controlada).
 */
export async function runGuard(
  provider: AIProvider,
  personality: Personality,
  history: ChatTurn[],
  message: string,
  heuristicInjection: boolean,
  signal?: AbortSignal,
): Promise<GuardDecision> {
  let classification = null;
  try {
    classification = await provider.classify({
      system: buildClassifierSystem(personality),
      userContent: buildClassifierUser(history, message),
      signal,
    });
  } catch (err) {
    logError("guard_classification_failed", err, { personality: personality.slug });
  }
  return decide(classification, {
    heuristicInjection,
    personalityName: personality.name,
    horizon: personality.persona.knowledgeHorizon,
  });
}
