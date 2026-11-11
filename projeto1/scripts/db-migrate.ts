/**
 * Aplica as migrações SQL. Use um usuário com permissão de DDL (ex.: postgres no Supabase):
 *   DATABASE_ADMIN_URL=postgres://... npm run db:migrate
 * Nunca use esse usuário administrativo na aplicação em execução.
 */
import path from "node:path";
import { Client } from "pg";
import { runMigrations } from "../src/server/db/migrations";
import { adminClientConfig } from "./db-common";

async function main() {
  const client = new Client(adminClientConfig());
  await client.connect();
  try {
    await runMigrations(client, path.resolve(process.cwd(), "src/server/db/migrations"));
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("Falha na migração:", err instanceof Error ? err.message : err);
  process.exit(1);
});
