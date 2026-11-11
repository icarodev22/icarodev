import "server-only";
import type { Reference } from "@/content/types";
import { getPersonality, PERSONALITIES } from "@/content";
import { allChunksFor, type KnowledgeChunk } from "./chunker";
import { normalize, searchTerms, stem } from "./tokenize";
import { getPool, isDatabaseConfigured } from "../db/pool";

export interface RetrievedChunk {
  documentTitle: string;
  content: string;
  references: Reference[];
  score: number;
}

export interface KnowledgeRetriever {
  /** Recupera trechos SOMENTE da base da personalidade indicada (isolamento de contexto). */
  retrieve(personalitySlug: string, query: string, k: number): Promise<RetrievedChunk[]>;
}

/** Recuperação em memória (BM25 simplificado) sobre o mesmo corpus curado do banco. */
export class MemoryRetriever implements KnowledgeRetriever {
  private index = new Map<string, { chunk: KnowledgeChunk; terms: Map<string, number>; len: number }[]>();

  constructor() {
    for (const p of PERSONALITIES) {
      this.index.set(
        p.slug,
        allChunksFor(p).map((chunk) => {
          const terms = new Map<string, number>();
          const words = normalize(`${chunk.documentTitle} ${chunk.content}`).replace(/[^a-z0-9\s]/g, " ").split(/\s+/);
          for (const w of words) {
            if (w.length < 3) continue;
            const s = stem(w);
            terms.set(s, (terms.get(s) ?? 0) + 1);
          }
          return { chunk, terms, len: words.length };
        }),
      );
    }
  }

  async retrieve(personalitySlug: string, query: string, k: number): Promise<RetrievedChunk[]> {
    const docs = this.index.get(personalitySlug);
    if (!docs) return [];
    const qTerms = searchTerms(query).map(stem);
    const avgLen = docs.reduce((a, d) => a + d.len, 0) / Math.max(docs.length, 1);
    const scored = docs.map((d) => {
      let score = 0;
      for (const t of qTerms) {
        const tf = d.terms.get(t) ?? 0;
        if (!tf) continue;
        const df = docs.filter((x) => x.terms.has(t)).length;
        const idf = Math.log(1 + (docs.length - df + 0.5) / (df + 0.5));
        score += idf * ((tf * 2.2) / (tf + 1.2 * (0.25 + 0.75 * (d.len / avgLen))));
      }
      return { d, score };
    });
    const top = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, k);
    // Sem correspondência: devolve o perfil como base mínima.
    const chosen = top.length ? top : scored.filter((s) => s.d.chunk.documentKey === "perfil").slice(0, 1);
    return chosen.map(({ d, score }) => ({
      documentTitle: d.chunk.documentTitle,
      content: d.chunk.content,
      references: d.chunk.references,
      score,
    }));
  }
}

/** Recuperação via busca full-text do PostgreSQL (dicionário português). */
export class PostgresRetriever implements KnowledgeRetriever {
  async retrieve(personalitySlug: string, query: string, k: number): Promise<RetrievedChunk[]> {
    type Row = { title: string; content: string; references_json: Reference[]; score: number };
    const pool = getPool();
    // Termos já sanitizados (apenas [a-z0-9]) e ainda assim enviados como parâmetro.
    const tsquery = searchTerms(query).map((t) => `${t}:*`).join(" | ");
    let rows: Row[] = [];
    if (tsquery) {
      ({ rows } = await pool.query<Row>(
        `SELECT d.title, c.content, d.references_json, ts_rank_cd(c.search_vector, q) AS score
         FROM knowledge_chunks c
         JOIN knowledge_documents d ON d.id = c.document_id
         JOIN personalities p ON p.id = c.personality_id
         CROSS JOIN to_tsquery('portuguese', $3) q
         WHERE p.slug = $1 AND c.search_vector @@ q
         ORDER BY score DESC
         LIMIT $2`,
        [personalitySlug, k, tsquery],
      ));
    }
    if (!rows.length) {
      // Sem correspondência: devolve o perfil como base mínima.
      ({ rows } = await pool.query<Row>(
        `SELECT d.title, c.content, d.references_json, 0::float AS score
         FROM knowledge_chunks c
         JOIN knowledge_documents d ON d.id = c.document_id
         JOIN personalities p ON p.id = c.personality_id
         WHERE p.slug = $1 AND d.doc_key = 'perfil'
         ORDER BY c.chunk_index LIMIT 1`,
        [personalitySlug],
      ));
    }
    return rows.map((r) => ({ documentTitle: r.title, content: r.content, references: r.references_json, score: Number(r.score) }));
  }
}

let retriever: KnowledgeRetriever | null = null;

export function getRetriever(): KnowledgeRetriever {
  retriever ??= isDatabaseConfigured() ? new PostgresRetriever() : new MemoryRetriever();
  return retriever;
}

export function assertKnownPersonality(slug: string): void {
  if (!getPersonality(slug)) throw new Error("Personalidade desconhecida.");
}
