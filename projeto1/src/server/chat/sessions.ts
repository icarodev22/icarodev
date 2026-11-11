import "server-only";
import { SessionIdSchema } from "@/lib/validation";
import { getConversationStore } from "../conversations/store";
import { assertSameOrigin, HttpError, jsonError } from "../security/request";
import { resolveIdentity } from "../security/identity";
import { logError } from "../observability/logger";

function parseId(id: string): string {
  const r = SessionIdSchema.safeParse(id);
  if (!r.success) throw new HttpError(404, "session_not_found", "Conversa não encontrada.");
  return r.data;
}

/** GET: histórico de uma conversa do próprio estudante. */
export async function handleGetSession(req: Request, rawId: string): Promise<Response> {
  try {
    const id = parseId(rawId);
    const identity = resolveIdentity(req.headers, false);
    if (!identity) throw new HttpError(404, "session_not_found", "Conversa não encontrada.");
    const store = getConversationStore();
    const session = await store.getSession(identity.ownerHash, id);
    if (!session) throw new HttpError(404, "session_not_found", "Conversa não encontrada.");
    const messages = await store.listMessages(identity.ownerHash, id, 200);
    return Response.json(
      {
        session: { id: session.id, personalitySlug: session.personalitySlug, level: session.level, expiresAt: session.expiresAt },
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    if (err instanceof HttpError) return jsonError(err);
    logError("session_get_failed", err);
    return jsonError(new HttpError(500, "internal_error", "Erro interno."));
  }
}

/** DELETE: o estudante apaga a própria conversa (direito de exclusão). */
export async function handleDeleteSession(req: Request, rawId: string): Promise<Response> {
  try {
    assertSameOrigin(req);
    const id = parseId(rawId);
    const identity = resolveIdentity(req.headers, false);
    if (!identity) throw new HttpError(404, "session_not_found", "Conversa não encontrada.");
    const ok = await getConversationStore().deleteSession(identity.ownerHash, id);
    if (!ok) throw new HttpError(404, "session_not_found", "Conversa não encontrada.");
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof HttpError) return jsonError(err);
    logError("session_delete_failed", err);
    return jsonError(new HttpError(500, "internal_error", "Erro interno."));
  }
}
