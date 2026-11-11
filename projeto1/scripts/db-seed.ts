/**
 * Carrega o conteúdo curado (src/content) no banco: personalidades, documentos
 * e chunks de conhecimento. Idempotente: pode ser executado várias vezes.
 *   DATABASE_ADMIN_URL=postgres://... npm run db:seed
 */
import { createHash } from "node:crypto";
import { Client } from "pg";
import { PERSONALITIES } from "../src/content";
import { chunkDocument, profileDocument } from "../src/server/knowledge/chunker";
import { adminClientConfig } from "./db-common";

async function main() {
  const client = new Client(adminClientConfig());
  await client.connect();
  try {
    await client.query("BEGIN");
    for (const p of PERSONALITIES) {
      const { knowledge, ...profile } = p;
      const data = JSON.stringify(profile);
      const hash = createHash("sha256").update(JSON.stringify(p)).digest("hex");
      const { rows } = await client.query<{ id: string }>(
        `INSERT INTO personalities (slug, name, category, field, period_label, data, content_hash, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, now())
         ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, field = EXCLUDED.field,
           period_label = EXCLUDED.period_label, data = EXCLUDED.data, content_hash = EXCLUDED.content_hash, updated_at = now()
         RETURNING id`,
        [p.slug, p.name, p.category, p.field, p.periodLabel, data, hash],
      );
      const personalityId = rows[0]!.id;
      const docs = [profileDocument(p), ...knowledge];
      const keys = docs.map((d) => d.id);
      await client.query("DELETE FROM knowledge_documents WHERE personality_id = $1 AND NOT (doc_key = ANY($2))", [personalityId, keys]);
      for (const d of docs) {
        const refs = d.referenceIdx.map((i) => p.references[i]).filter(Boolean);
        const doc = await client.query<{ id: string }>(
          `INSERT INTO knowledge_documents (personality_id, doc_key, title, body, references_json, updated_at)
           VALUES ($1, $2, $3, $4, $5, now())
           ON CONFLICT (personality_id, doc_key) DO UPDATE SET title = EXCLUDED.title, body = EXCLUDED.body,
             references_json = EXCLUDED.references_json, updated_at = now()
           RETURNING id`,
          [personalityId, d.id, d.title, d.body, JSON.stringify(refs)],
        );
        const docId = doc.rows[0]!.id;
        await client.query("DELETE FROM knowledge_chunks WHERE document_id = $1", [docId]);
        for (const c of chunkDocument(p, d)) {
          await client.query(
            "INSERT INTO knowledge_chunks (document_id, personality_id, chunk_index, content) VALUES ($1, $2, $3, $4)",
            [docId, personalityId, c.chunkIndex, c.content],
          );
        }
      }
      console.log(`✓ ${p.name}: ${docs.length} documentos`);
    }
    await client.query("COMMIT");
    console.log(`Seed concluído: ${PERSONALITIES.length} personalidades.`);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("Falha no seed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
