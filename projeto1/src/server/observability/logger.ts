import "server-only";

/**
 * Logs estruturados. Regra: nunca registrar conteúdo de mensagens, segredos,
 * cookies, IPs em texto puro ou dados pessoais. Apenas eventos e métricas.
 */
type Fields = Record<string, string | number | boolean | null | undefined>;

export function logEvent(event: string, fields: Fields = {}): void {
  if (process.env.NODE_ENV === "test") return;
  console.log(JSON.stringify({ ts: new Date().toISOString(), level: "info", event, ...fields }));
}

export function logError(event: string, err: unknown, fields: Fields = {}): void {
  if (process.env.NODE_ENV === "test") return;
  const name = err instanceof Error ? err.name : "UnknownError";
  const kind = (err as { kind?: string })?.kind;
  console.error(JSON.stringify({ ts: new Date().toISOString(), level: "error", event, error: name, kind, ...fields }));
}
