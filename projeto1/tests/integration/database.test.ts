/**
 * Testes de integração com PostgreSQL real. Executados somente quando
 * TEST_DATABASE_URL (papel de aplicação projeto1_app) e TEST_DATABASE_ADMIN_URL
 * (dono das tabelas) estiverem definidos, apontando para um banco de TESTE.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { Client } from "pg";
import { randomBytes, createHash } from "node:crypto";
import { setTestEnv } from "../helpers";

const APP_URL = process.env.TEST_DATABASE_URL;
const ADMIN_URL = process.env.TEST_DATABASE_ADMIN_URL;
const run = APP_URL && ADMIN_URL ? describe : describe.skip;

const owner = () => createHash("sha256").update(randomBytes(32)).digest("hex");

run("PostgreSQL: RLS, privilégios e stores", () => {
  let app: Client;
  let admin: Client;

  beforeAll(async () => {
    vi.resetModules();
    setTestEnv({ DATABASE_URL: APP_URL, DATABASE_SSL: "disable" });
    app = new Client({ connectionString: APP_URL });
    admin = new Client({ connectionString: ADMIN_URL });
    await app.connect();
    await admin.connect();
  });

  afterAll(async () => {
    await app?.end();
    await admin?.end();
    const { getPool } = await import("@/server/db/pool");
    await getPool().end();
  });

  it("papel de aplicação não lê conversas sem app.owner_hash definido", async () => {
    const { PostgresConversationStore } = await import("@/server/conversations/store");
    const store = new PostgresConversationStore();
    const a = owner();
    await store.createSession(a, "socrates", "geral");
    const { rows } = await app.query("SELECT * FROM conversation_sessions");
    expect(rows).toHaveLength(0);
  });

  it("RLS isola conversas entre donos mesmo sem filtro na consulta", async () => {
    const { PostgresConversationStore } = await import("@/server/conversations/store");
    const store = new PostgresConversationStore();
    const a = owner();
    const b = owner();
    const s = await store.createSession(a, "platao", "medio");
    await store.appendMessages(a, s.id, [{ role: "user", content: "Olá" }, { role: "assistant", content: "Saudações" }]);

    await app.query("BEGIN");
    await app.query("SELECT set_config('app.owner_hash', $1, true)", [b]);
    const leak = await app.query("SELECT * FROM conversation_messages WHERE session_id = $1", [s.id]);
    const del = await app.query("DELETE FROM conversation_sessions WHERE id = $1", [s.id]);
    await app.query("COMMIT");
    expect(leak.rows).toHaveLength(0);
    expect(del.rowCount).toBe(0);

    expect(await store.getSession(b, s.id)).toBeNull();
    expect(await store.listMessages(b, s.id, 10)).toEqual([]);
    expect(await store.listMessages(a, s.id, 10)).toHaveLength(2);
  });

  it("RLS impede inserir linhas em nome de outro dono", async () => {
    const a = owner();
    const b = owner();
    await app.query("BEGIN");
    await app.query("SELECT set_config('app.owner_hash', $1, true)", [a]);
    await expect(
      app.query("INSERT INTO conversation_sessions (owner_hash, personality_slug, level, expires_at) VALUES ($1, 'socrates', 'geral', now() + interval '1 hour')", [b]),
    ).rejects.toThrow(/row-level security/);
    await app.query("ROLLBACK");
  });

  it("papel de aplicação tem privilégios mínimos", async () => {
    await expect(app.query("UPDATE conversation_messages SET content = 'x'")).rejects.toThrow(/permission denied/);
    await expect(app.query("DELETE FROM personalities")).rejects.toThrow(/permission denied/);
    await expect(app.query("INSERT INTO knowledge_chunks (document_id, personality_id, chunk_index, content) VALUES (gen_random_uuid(), gen_random_uuid(), 0, 'x')")).rejects.toThrow(/permission denied/);
    await expect(app.query("SELECT * FROM schema_migrations")).rejects.toThrow(/permission denied/);
    await expect(app.query("SELECT * FROM ai_usage_events")).rejects.toThrow(/permission denied/);
    await expect(app.query("CREATE TABLE hack (id int)")).rejects.toThrow(/permission denied/);
    await expect(app.query("SET ROLE p1_owner")).rejects.toThrow(/permission denied/);
  });

  it("papéis públicos do Supabase (anon/authenticated) não acessam tabelas nem a função de expurgo", async () => {
    const { rows } = await admin.query("SELECT rolname FROM pg_roles WHERE rolname IN ('anon','authenticated')");
    if (rows.length === 0) return; // ambiente sem esses papéis
    for (const { rolname } of rows) {
      const can = await admin.query(
        `SELECT has_table_privilege($1, 'conversation_messages', 'SELECT') AS msgs,
                has_table_privilege($1, 'personalities', 'SELECT') AS pers,
                has_table_privilege($1, 'usage_limits', 'INSERT') AS lim,
                has_function_privilege($1, 'purge_expired_conversations()', 'EXECUTE') AS purge`,
        [rolname],
      );
      expect(can.rows[0]).toEqual({ msgs: false, pers: false, lim: false, purge: false });
    }
  });

  it("catálogo e conhecimento são legíveis pelo papel de aplicação", async () => {
    const { rows } = await app.query("SELECT count(*)::int AS n FROM personalities");
    expect(rows[0].n).toBe(18);
  });

  it("busca full-text recupera somente a base da personalidade, sem acentos", async () => {
    const { PostgresRetriever } = await import("@/server/knowledge/retriever");
    const r = new PostgresRetriever();
    const res = await r.retrieve("marie-curie", "polonio radio descoberta", 3);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]!.content).toMatch(/polônio/);
    const einstein = await r.retrieve("albert-einstein", "polonio radio", 3);
    for (const c of einstein) expect(c.content).not.toMatch(/Pierre Curie/);
    // Entrada maliciosa não quebra a consulta (termos sanitizados + parâmetros).
    const weird = await r.retrieve("socrates", "'); DROP TABLE personalities; -- & | ! :*", 3);
    expect(weird.length).toBeGreaterThan(0);
    const { rows } = await admin.query("SELECT count(*)::int AS n FROM personalities");
    expect(rows[0].n).toBe(18);
  });

  it("limitador compartilhado conta corretamente", async () => {
    const { PostgresLimitStore } = await import("@/server/limits/limiter");
    const l = new PostgresLimitStore();
    const key = `test:${owner().slice(0, 16)}`;
    expect((await l.hit(key, 60, 2)).allowed).toBe(true);
    expect((await l.hit(key, 60, 2)).allowed).toBe(true);
    expect((await l.hit(key, 60, 2)).allowed).toBe(false);
  });

  it("expurgo remove apenas conversas expiradas", async () => {
    const a = owner();
    const expired = await admin.query(
      "INSERT INTO conversation_sessions (owner_hash, personality_slug, level, expires_at) VALUES ($1, 'socrates', 'geral', now() - interval '1 hour') RETURNING id",
      [a],
    ).catch(() => null);
    // Como dono das tabelas com FORCE RLS, o admin também precisa do owner_hash; usamos a store.
    const { PostgresConversationStore } = await import("@/server/conversations/store");
    const store = new PostgresConversationStore();
    const live = await store.createSession(a, "socrates", "geral");
    if (!expired) {
      await admin.query("BEGIN");
      await admin.query("SELECT set_config('app.owner_hash', $1, true)", [a]);
      await admin.query("INSERT INTO conversation_sessions (owner_hash, personality_slug, level, expires_at) VALUES ($1, 'socrates', 'geral', now() - interval '1 hour')", [a]);
      await admin.query("COMMIT");
    }
    // O papel de aplicação também não enxerga sessões expiradas de terceiros.
    expect((await app.query("SELECT count(*)::int AS n FROM conversation_sessions")).rows[0].n).toBe(0);
    const removed = await store.purgeExpired();
    expect(removed).toBeGreaterThanOrEqual(1);
    expect(await store.getSession(a, live.id)).not.toBeNull();
  });
});
