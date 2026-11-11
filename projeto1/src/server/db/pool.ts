import "server-only";
import { Pool, type PoolClient, type PoolConfig } from "pg";
import { getEnv } from "../config/env";

let pool: Pool | null = null;

export function isDatabaseConfigured(): boolean {
  return Boolean(getEnv().DATABASE_URL);
}

export function buildPoolConfig(url: string, ssl: string, ca?: string): PoolConfig {
  return {
    connectionString: url,
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
    // Evita consultas presas consumindo conexões.
    statement_timeout: 5_000,
    query_timeout: 6_000,
    ssl:
      ssl === "disable"
        ? false
        : ssl === "verify-full"
          ? { rejectUnauthorized: true, ca }
          : { rejectUnauthorized: false },
  };
}

export function getPool(): Pool {
  const env = getEnv();
  if (!env.DATABASE_URL) throw new Error("DATABASE_URL não configurada.");
  pool ??= new Pool(buildPoolConfig(env.DATABASE_URL, env.DATABASE_SSL, env.DATABASE_CA_CERT));
  return pool;
}

/**
 * Executa `fn` em uma transação com o identificador do dono da conversa
 * definido em `app.owner_hash`. As políticas RLS das tabelas de conversa
 * usam esse valor como segunda camada de autorização (defesa em profundidade).
 */
export async function withOwner<T>(ownerHash: string, fn: (c: PoolClient) => Promise<T>): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT set_config('app.owner_hash', $1, true)", [ownerHash]);
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw err;
  } finally {
    client.release();
  }
}
