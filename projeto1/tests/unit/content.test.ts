import { describe, expect, it } from "vitest";
import { CATEGORIES, PERSONALITIES, formatHistoricalDate, getPersonality } from "@/content";

describe("conteúdo curado", () => {
  it("possui 6 categorias com 3 personalidades cada (18 no total)", () => {
    expect(CATEGORIES).toHaveLength(6);
    expect(PERSONALITIES).toHaveLength(18);
    for (const c of CATEGORIES) expect(PERSONALITIES.filter((p) => p.category === c.id)).toHaveLength(3);
  });

  it("classifica corretamente os imperadores (sem Júlio César)", () => {
    const names = PERSONALITIES.filter((p) => p.category === "imperadores").map((p) => p.name);
    expect(names).toEqual(["Augusto", "Napoleão Bonaparte", "Dom Pedro II"]);
    expect(PERSONALITIES.some((p) => /j[uú]lio c[eé]sar/i.test(p.name))).toBe(false);
  });

  it("cada personalidade tem os campos obrigatórios", () => {
    for (const p of PERSONALITIES) {
      expect(p.name && p.field && p.birthPlace && p.historicalContext && p.biography).toBeTruthy();
      expect(p.contributions.length).toBeGreaterThan(0);
      expect(p.works.length).toBeGreaterThan(0);
      expect(p.timeline.length).toBeGreaterThanOrEqual(5);
      expect(p.references.length).toBeGreaterThan(0);
      expect(p.knowledge.length).toBeGreaterThanOrEqual(3);
      expect(p.suggestedQuestions.length).toBeGreaterThanOrEqual(3);
      expect(p.portrait.kind).toBe("ilustracao-original");
      expect(p.portrait.notice).toMatch(/representação artística, não é (fotografia|retrato autêntico)/i);
    }
  });

  it("referências usam https e índices válidos", () => {
    for (const p of PERSONALITIES) {
      for (const r of p.references) if (r.url) expect(r.url.startsWith("https://")).toBe(true);
      for (const d of p.knowledge) for (const i of d.referenceIdx) expect(p.references[i]).toBeDefined();
    }
  });

  it("slugs são únicos e seguros", () => {
    const slugs = PERSONALITIES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]{2,64}$/);
  });

  it("formata datas antigas e aproximadas sem inventar precisão", () => {
    expect(formatHistoricalDate({ year: -384, label: "384 a.C." })).toBe("384 a.C.");
    expect(formatHistoricalDate({ year: -470, approximate: true })).toBe("c. 470 a.C.");
    expect(formatHistoricalDate(getPersonality("albert-einstein")!.born)).toBe("14 de março de 1879");
  });
});
