import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { getEnv } from "../config/env";

let devSecret: string | null = null;

/** Segredo de aplicação. Em desenvolvimento, gera um valor aleatório por processo. */
function appSecret(): string {
  const env = getEnv();
  if (env.APP_SECRET) return env.APP_SECRET;
  devSecret ??= randomBytes(32).toString("hex");
  return devSecret;
}

/** HMAC-SHA256 com o segredo da aplicação (pseudonimização de IPs). */
export function hmac(value: string, purpose: string): string {
  return createHmac("sha256", appSecret()).update(`${purpose}:${value}`).digest("hex");
}

/**
 * Hash de tokens aleatórios de alta entropia (256 bits). Para esse caso SHA-256
 * é adequado; NÃO use para senhas (que exigiriam Argon2id/bcrypt/scrypt).
 */
export function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}
