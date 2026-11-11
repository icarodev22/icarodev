import "server-only";
import { getEnv } from "../config/env";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

/** IP do cliente. Só confia em X-Forwarded-For quando TRUST_PROXY=true (ex.: Vercel). */
export function getClientIp(headers: Headers): string {
  const env = getEnv();
  if (env.TRUST_PROXY) {
    const xff = headers.get("x-forwarded-for");
    const first = xff?.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
    const real = headers.get("x-real-ip");
    if (real) return real.trim().slice(0, 64);
  }
  return "unknown";
}

function allowedOrigins(requestUrl: string): Set<string> {
  const env = getEnv();
  const set = new Set(
    env.ALLOWED_ORIGINS.split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
  // A própria origem da aplicação é sempre permitida.
  set.add(new URL(requestUrl).origin);
  return set;
}

/**
 * Proteção CSRF para requisições que alteram estado: exige cabeçalho Origin
 * pertencente à allowlist. CORS não é autenticação; isto apenas impede que
 * outros sites disparem requisições com o cookie do estudante.
 */
export function assertSameOrigin(req: Request): void {
  const origin = req.headers.get("origin");
  if (!origin) throw new HttpError(403, "origin_required", "Origem da requisição ausente.");
  if (!allowedOrigins(req.url).has(origin)) {
    throw new HttpError(403, "origin_forbidden", "Origem não autorizada.");
  }
}

/** Lê o corpo JSON com limite de tamanho (proteção contra payloads excessivos). */
export async function readJsonBody(req: Request, maxBytes: number): Promise<unknown> {
  const type = req.headers.get("content-type") ?? "";
  if (!type.toLowerCase().startsWith("application/json")) {
    throw new HttpError(415, "unsupported_media_type", "Envie os dados como JSON.");
  }
  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > maxBytes) throw new HttpError(413, "payload_too_large", "Mensagem muito grande.");
  if (!req.body) throw new HttpError(400, "empty_body", "Corpo da requisição vazio.");

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new HttpError(413, "payload_too_large", "Mensagem muito grande.");
    }
    chunks.push(value);
  }
  const text = new TextDecoder("utf-8", { fatal: false }).decode(Buffer.concat(chunks));
  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, "invalid_json", "JSON inválido.");
  }
}

export function jsonError(err: HttpError, extraHeaders?: HeadersInit): Response {
  return Response.json(
    { error: { code: err.code, message: err.message } },
    { status: err.status, headers: { "Cache-Control": "no-store", ...extraHeaders } },
  );
}
