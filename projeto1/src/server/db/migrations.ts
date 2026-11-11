import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { Client } from "pg";

/**
 * Executor de migrações simples, transacional e apenas "para frente".
 * Cada arquivo .sql é aplicado uma única vez e registrado em schema_migrations.
 */
export async function runMigrations(client: Client, dir: string, log: (m: string) => void = console.log) {
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
  const files = readdirSync(dir).filter((f) => /^\d{4}_[a-z0-9_]+\.sql$/.test(f)).sort();
  const { rows } = await client.query<{ name: string }>("SELECT name FROM schema_migrations");
  const applied = new Set(rows.map((r) => r.name));
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = readFileSync(path.join(dir, file), "utf8");
    log(`Aplicando ${file}...`);
    await client.query("BEGIN");
    try {
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }
  log("Migrações concluídas.");
}
