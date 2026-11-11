import "server-only";
import { getPool, isDatabaseConfigured } from "../db/pool";
import { logError, logEvent } from "../observability/logger";

export interface UsageRecord {
  personalitySlug: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  stopReason: string | null;
  injectionFlagged: boolean;
}

/** Registra consumo agregado (sem conteúdo de mensagens nem identificadores). */
export async function recordUsage(u: UsageRecord): Promise<void> {
  logEvent("ai_usage", { personality: u.personalitySlug, model: u.model, in: u.inputTokens, out: u.outputTokens, stop: u.stopReason });
  if (!isDatabaseConfigured()) return;
  try {
    await getPool().query(
      `INSERT INTO ai_usage_events (personality_slug, model, input_tokens, output_tokens, stop_reason, injection_flagged)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [u.personalitySlug, u.model.slice(0, 100), u.inputTokens, u.outputTokens, u.stopReason?.slice(0, 40) ?? null, u.injectionFlagged],
    );
  } catch (err) {
    logError("usage_record_failed", err);
  }
}
