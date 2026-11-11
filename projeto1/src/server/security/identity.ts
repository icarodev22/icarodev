import "server-only";
import { getEnv } from "../config/env";
import { randomToken, sha256Hex } from "./crypto";

/**
 * Identidade anônima do estudante: token aleatório de 256 bits em cookie
 * HttpOnly. O servidor só armazena o SHA-256 do token (owner_hash).
 * Não há cadastro nesta versão; a arquitetura permite trocar por um ID de
 * usuário autenticado no futuro (Supabase Auth), mantendo a mesma checagem.
 */
const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

export function cookieName(): string {
  return getEnv().NODE_ENV === "production" ? "__Host-p1_anon" : "p1_anon";
}

function readCookie(headers: Headers, name: string): string | undefined {
  const raw = headers.get("cookie");
  if (!raw) return undefined;
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return undefined;
}

export interface AnonIdentity {
  ownerHash: string;
  /** Cabeçalho Set-Cookie a enviar quando um novo token foi emitido. */
  setCookie?: string;
}

export function resolveIdentity(headers: Headers, create: boolean): AnonIdentity | null {
  const name = cookieName();
  const existing = readCookie(headers, name);
  if (existing && TOKEN_RE.test(existing)) return { ownerHash: sha256Hex(existing) };
  if (!create) return null;
  const token = randomToken(32);
  const env = getEnv();
  const maxAge = env.CONVERSATION_RETENTION_HOURS * 3600;
  const secure = env.NODE_ENV === "production" ? "; Secure" : "";
  return {
    ownerHash: sha256Hex(token),
    setCookie: `${name}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`,
  };
}
