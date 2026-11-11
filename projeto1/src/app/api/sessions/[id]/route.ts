import { handleDeleteSession, handleGetSession } from "@/server/chat/sessions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  return handleGetSession(req, (await ctx.params).id);
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  return handleDeleteSession(req, (await ctx.params).id);
}
