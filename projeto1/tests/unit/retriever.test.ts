import { describe, expect, it } from "vitest";
import { PERSONALITIES } from "@/content";
import { MemoryRetriever } from "@/server/knowledge/retriever";
import { allChunksFor } from "@/server/knowledge/chunker";

const retriever = new MemoryRetriever();

describe("recuperação de conhecimento (RAG)", () => {
  it("retorna trechos relevantes", async () => {
    const r = await retriever.retrieve("albert-einstein", "Como funciona o efeito fotoelétrico?", 3);
    expect(r[0]?.documentTitle).toMatch(/fotoelétrico/i);
  });

  it("é insensível a acentos", async () => {
    const r = await retriever.retrieve("marie-curie", "polonio e radio", 2);
    expect(r[0]?.content).toMatch(/polônio/);
  });

  it("nunca mistura bases de personalidades diferentes", async () => {
    for (const p of PERSONALITIES) {
      const own = new Set(allChunksFor(p).map((c) => c.content));
      const r = await retriever.retrieve(p.slug, "relatividade átomo justiça guerra música império", 4);
      for (const c of r) expect(own.has(c.content)).toBe(true);
    }
  });

  it("devolve o perfil quando não há correspondência", async () => {
    const r = await retriever.retrieve("socrates", "xyzxyz qwerty", 3);
    expect(r).toHaveLength(1);
    expect(r[0]?.documentTitle).toMatch(/Perfil/);
  });

  it("personalidade desconhecida não retorna nada", async () => {
    expect(await retriever.retrieve("inexistente", "teste", 3)).toEqual([]);
  });
});
