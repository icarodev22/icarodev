import "server-only";
import { getPool, isDatabaseConfigured } from "../db/pool";

export interface LimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export interface LimitStore {
  /** Incrementa o contador da janela fixa e informa se o limite foi respeitado. */
  hit(key: string, windowSeconds: number, limit: number): Promise<LimitResult>;
}

function windowStart(windowSeconds: number, now = Date.now()): number {
  return Math.floor(now / (windowSeconds * 1000)) * windowSeconds * 1000;
}

export class MemoryLimitStore implements LimitStore {
  private counters = new Map<string, { count: number; expires: number }>();

  async hit(key: string, windowSeconds: number, limit: number): Promise<LimitResult> {
    const now = Date.now();
    const start = windowStart(windowSeconds, now);
    const k = `${key}|${start}`;
    const expires = start + windowSeconds * 1000;
    const entry = this.counters.get(k) ?? { count: 0, expires };
    entry.count += 1;
    this.counters.set(k, entry);
    if (this.counters.size > 50_000) {
      for (const [kk, v] of this.counters) if (v.expires < now) this.counters.delete(kk);
    }
    return {
      allowed: entry.count <= limit,
      remaining: Math.max(0, limit - entry.count),
      retryAfterSeconds: Math.ceil((expires - now) / 1000),
    };
  }
}

/** Contadores compartilhados no PostgreSQL (funciona com múltiplas instâncias). */
export class PostgresLimitStore implements LimitStore {
  async hit(key: string, windowSeconds: number, limit: number): Promise<LimitResult> {
    const now = Date.now();
    const start = new Date(windowStart(windowSeconds, now));
    const expires = new Date(start.getTime() + windowSeconds * 1000);
    const { rows } = await getPool().query<{ count: number }>(
      `INSERT INTO usage_limits (bucket_key, window_start, count, expires_at)
       VALUES ($1, $2, 1, $3)
       ON CONFLICT (bucket_key, window_start) DO UPDATE SET count = usage_limits.count + 1
       RETURNING count`,
      [key, start, expires],
    );
    const count = rows[0]?.count ?? limit + 1;
    return {
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
      retryAfterSeconds: Math.ceil((expires.getTime() - now) / 1000),
    };
  }
}

let limitStore: LimitStore | null = null;
export function getLimitStore(): LimitStore {
  limitStore ??= isDatabaseConfigured() ? new PostgresLimitStore() : new MemoryLimitStore();
  return limitStore;
}
