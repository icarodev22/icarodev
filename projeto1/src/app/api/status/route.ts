import { getAIProvider } from "@/server/ai";
import { getEnv } from "@/server/config/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Informa se a IA está disponível e o prazo de retenção (sem detalhes de infraestrutura). */
export async function GET() {
  return Response.json({ ai: getAIProvider().isConfigured(), retentionHours: getEnv().CONVERSATION_RETENTION_HOURS }, { headers: { "Cache-Control": "no-store" } });
}
