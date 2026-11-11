import { getAIProvider } from "@/server/ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Informa apenas se a IA está disponível (sem detalhes de infraestrutura). */
export async function GET() {
  return Response.json({ ai: getAIProvider().isConfigured() }, { headers: { "Cache-Control": "no-store" } });
}
