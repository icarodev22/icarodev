import type { KnowledgeDocument, Personality, Reference } from "@/content/types";

export interface KnowledgeChunk {
  personalitySlug: string;
  documentKey: string;
  documentTitle: string;
  chunkIndex: number;
  content: string;
  references: Reference[];
}

const MAX_CHUNK_CHARS = 900;

/** Divide um documento por parágrafos, agrupando-os até ~900 caracteres. */
export function chunkDocument(personality: Personality, doc: KnowledgeDocument): KnowledgeChunk[] {
  const refs = doc.referenceIdx
    .map((i) => personality.references[i])
    .filter((r): r is Reference => Boolean(r));
  const paragraphs = doc.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";
  for (const p of paragraphs) {
    if (current && current.length + p.length + 2 > MAX_CHUNK_CHARS) {
      chunks.push(current);
      current = p;
    } else {
      current = current ? `${current}\n\n${p}` : p;
    }
  }
  if (current) chunks.push(current);
  return chunks.map((content, chunkIndex) => ({
    personalitySlug: personality.slug,
    documentKey: doc.id,
    documentTitle: doc.title,
    chunkIndex,
    content,
    references: refs,
  }));
}

/** Documento-síntese gerado a partir do perfil curado (sempre disponível como base). */
export function profileDocument(p: Personality): KnowledgeDocument {
  const body = [
    `${p.name} (${p.periodLabel}) — ${p.field}. ${p.shortDescription}`,
    `Contexto histórico: ${p.historicalContext}`,
    `Biografia resumida: ${p.biography}`,
    `Principais contribuições: ${p.contributions.join(" ")}`,
    `Linha do tempo: ${p.timeline.map((t) => `${t.when}: ${t.event}`).join(" ")}`,
  ].join("\n\n");
  return { id: "perfil", title: `Perfil de ${p.name}`, body, referenceIdx: p.references.map((_, i) => i) };
}

export function allChunksFor(p: Personality): KnowledgeChunk[] {
  return [profileDocument(p), ...p.knowledge].flatMap((d) => chunkDocument(p, d));
}
