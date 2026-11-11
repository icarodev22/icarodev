import { getEnv } from "@/server/config/env";
import { getConversationStore } from "@/server/conversations/store";
import { safeEqual } from "@/server/security/crypto";
import { logError, logEvent } from "@/server/observability/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Expurgo de conversas expiradas (retenção). Chamado pelo Vercel Cron com Bearer CRON_SECRET. */
export async function GET(req: Request) {
  const secret = getEnv().CRON_SECRET;
  const auth = req.headers.get("authorization") ?? "";
  if (!secret || !safeEqual(auth, `Bearer ${secret}`)) {
    return Response.json({ error: { code: "not_found", message: "Não encontrado." } }, { status: 404 });
  }
  try {
    const removed = await getConversationStore().purgeExpired();
    logEvent("purge_completed", { removed });
    return Response.json({ removed });
  } catch (err) {
    logError("purge_failed", err);
    return Response.json({ error: { code: "internal_error", message: "Erro interno." } }, { status: 500 });
  }
}
