import "server-only";
import { randomUUID } from "node:crypto";
import type { Level } from "@/lib/chat-shared";
import { getPool, isDatabaseConfigured, withOwner } from "../db/pool";
import { getEnv } from "../config/env";

export interface ConversationSession {
  id: string;
  personalitySlug: string;
  level: Level;
  createdAt: Date;
  expiresAt: Date;
}

export interface StoredMessage {
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

/**
 * Armazenamento de conversas. TODAS as operações exigem o ownerHash do
 * estudante: não existe método que leia conversas de outro dono (anti-IDOR).
 */
export interface ConversationStore {
  createSession(ownerHash: string, personalitySlug: string, level: Level): Promise<ConversationSession>;
  getSession(ownerHash: string, sessionId: string): Promise<ConversationSession | null>;
  listMessages(ownerHash: string, sessionId: string, limit: number): Promise<StoredMessage[]>;
  countMessages(ownerHash: string, sessionId: string): Promise<number>;
  appendMessages(ownerHash: string, sessionId: string, msgs: { role: "user" | "assistant"; content: string }[]): Promise<void>;
  deleteSession(ownerHash: string, sessionId: string): Promise<boolean>;
  /** Apaga todas as conversas do próprio estudante (direito de exclusão). */
  deleteAllSessions(ownerHash: string): Promise<number>;
  purgeExpired(): Promise<number>;
}

function expiry(): Date {
  return new Date(Date.now() + getEnv().CONVERSATION_RETENTION_HOURS * 3600_000);
}

/** Implementação em memória: apenas desenvolvimento/instância única (dados somem ao reiniciar). */
export class MemoryConversationStore implements ConversationStore {
  private sessions = new Map<string, ConversationSession & { ownerHash: string; messages: StoredMessage[] }>();

  async createSession(ownerHash: string, personalitySlug: string, level: Level) {
    await this.purgeExpired();
    const s = { id: randomUUID(), personalitySlug, level, createdAt: new Date(), expiresAt: expiry(), ownerHash, messages: [] };
    this.sessions.set(s.id, s);
    return { id: s.id, personalitySlug, level, createdAt: s.createdAt, expiresAt: s.expiresAt };
  }

  private owned(ownerHash: string, id: string) {
    const s = this.sessions.get(id);
    if (!s || s.ownerHash !== ownerHash || s.expiresAt.getTime() < Date.now()) return null;
    return s;
  }

  async getSession(ownerHash: string, id: string) {
    const s = this.owned(ownerHash, id);
    return s ? { id: s.id, personalitySlug: s.personalitySlug, level: s.level, createdAt: s.createdAt, expiresAt: s.expiresAt } : null;
  }

  async listMessages(ownerHash: string, id: string, limit: number) {
    return (this.owned(ownerHash, id)?.messages ?? []).slice(-limit);
  }

  async countMessages(ownerHash: string, id: string) {
    return this.owned(ownerHash, id)?.messages.length ?? 0;
  }

  async appendMessages(ownerHash: string, id: string, msgs: { role: "user" | "assistant"; content: string }[]) {
    const s = this.owned(ownerHash, id);
    if (!s) throw new Error("Sessão inexistente.");
    s.messages.push(...msgs.map((m) => ({ ...m, createdAt: new Date() })));
  }

  async deleteSession(ownerHash: string, id: string) {
    if (!this.owned(ownerHash, id)) return false;
    return this.sessions.delete(id);
  }

  async deleteAllSessions(ownerHash: string) {
    let n = 0;
    for (const [id, s] of this.sessions) {
      if (s.ownerHash === ownerHash) {
        this.sessions.delete(id);
        n++;
      }
    }
    return n;
  }

  async purgeExpired() {
    let n = 0;
    for (const [id, s] of this.sessions) {
      if (s.expiresAt.getTime() < Date.now()) {
        this.sessions.delete(id);
        n++;
      }
    }
    return n;
  }
}

type SessionRow = { id: string; personality_slug: string; level: Level; created_at: Date; expires_at: Date };
const toSession = (r: SessionRow): ConversationSession => ({
  id: r.id,
  personalitySlug: r.personality_slug,
  level: r.level,
  createdAt: r.created_at,
  expiresAt: r.expires_at,
});

/** Implementação PostgreSQL: filtro explícito por owner_hash + RLS (defesa em profundidade). */
export class PostgresConversationStore implements ConversationStore {
  async createSession(ownerHash: string, personalitySlug: string, level: Level) {
    return withOwner(ownerHash, async (c) => {
      const { rows } = await c.query<SessionRow>(
        `INSERT INTO conversation_sessions (owner_hash, personality_slug, level, expires_at)
         VALUES ($1, $2, $3, $4) RETURNING id, personality_slug, level, created_at, expires_at`,
        [ownerHash, personalitySlug, level, expiry()],
      );
      return toSession(rows[0]!);
    });
  }

  async getSession(ownerHash: string, id: string) {
    return withOwner(ownerHash, async (c) => {
      const { rows } = await c.query<SessionRow>(
        `SELECT id, personality_slug, level, created_at, expires_at FROM conversation_sessions
         WHERE id = $1 AND owner_hash = $2 AND expires_at > now()`,
        [id, ownerHash],
      );
      return rows[0] ? toSession(rows[0]) : null;
    });
  }

  async listMessages(ownerHash: string, id: string, limit: number) {
    return withOwner(ownerHash, async (c) => {
      const { rows } = await c.query<{ role: "user" | "assistant"; content: string; created_at: Date }>(
        `SELECT role, content, created_at FROM (
           SELECT m.id, m.role, m.content, m.created_at FROM conversation_messages m
           JOIN conversation_sessions s ON s.id = m.session_id
           WHERE m.session_id = $1 AND m.owner_hash = $2 AND s.expires_at > now()
           ORDER BY m.id DESC LIMIT $3) t ORDER BY id ASC`,
        [id, ownerHash, limit],
      );
      return rows.map((r) => ({ role: r.role, content: r.content, createdAt: r.created_at }));
    });
  }

  async countMessages(ownerHash: string, id: string) {
    return withOwner(ownerHash, async (c) => {
      const { rows } = await c.query<{ n: string }>(
        "SELECT count(*) AS n FROM conversation_messages WHERE session_id = $1 AND owner_hash = $2",
        [id, ownerHash],
      );
      return Number(rows[0]?.n ?? 0);
    });
  }

  async appendMessages(ownerHash: string, id: string, msgs: { role: "user" | "assistant"; content: string }[]) {
    await withOwner(ownerHash, async (c) => {
      for (const m of msgs) {
        await c.query(
          "INSERT INTO conversation_messages (session_id, owner_hash, role, content) VALUES ($1, $2, $3, $4)",
          [id, ownerHash, m.role, m.content],
        );
      }
    });
  }

  async deleteSession(ownerHash: string, id: string) {
    return withOwner(ownerHash, async (c) => {
      const r = await c.query("DELETE FROM conversation_sessions WHERE id = $1 AND owner_hash = $2", [id, ownerHash]);
      return (r.rowCount ?? 0) > 0;
    });
  }

  async deleteAllSessions(ownerHash: string) {
    return withOwner(ownerHash, async (c) => {
      const r = await c.query("DELETE FROM conversation_sessions WHERE owner_hash = $1", [ownerHash]);
      return r.rowCount ?? 0;
    });
  }

  async purgeExpired() {
    const { rows } = await getPool().query<{ n: number }>("SELECT purge_expired_conversations() AS n");
    return rows[0]?.n ?? 0;
  }
}

let store: ConversationStore | null = null;
export function getConversationStore(): ConversationStore {
  store ??= isDatabaseConfigured() ? new PostgresConversationStore() : new MemoryConversationStore();
  return store;
}
