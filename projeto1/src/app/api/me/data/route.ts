import { handleDeleteAllData } from "@/server/chat/sessions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  return handleDeleteAllData(req);
}
