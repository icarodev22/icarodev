import type { ClientConfig } from "pg";

export function adminClientConfig(): ClientConfig {
  const url = process.env.DATABASE_ADMIN_URL;
  if (!url) throw new Error("Defina DATABASE_ADMIN_URL (usuário com permissão de DDL).");
  const ssl = process.env.DATABASE_SSL ?? "require";
  return {
    connectionString: url,
    ssl: ssl === "disable" ? false : ssl === "verify-full" ? { rejectUnauthorized: true, ca: process.env.DATABASE_CA_CERT } : { rejectUnauthorized: false },
  };
}
