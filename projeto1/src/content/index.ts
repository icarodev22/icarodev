import type { HistoricalDate, Personality } from "./types";
import { fisica } from "./personalities/fisica";
import { quimica } from "./personalities/quimica";
import { filosofia } from "./personalities/filosofia";
import { musica } from "./personalities/musica";
import { historia } from "./personalities/historia";
import { imperadores } from "./personalities/imperadores";

export * from "./types";
export { CATEGORIES, getCategory } from "./categories";
export { SIMULATION_DISCLAIMER, ILLUSTRATION_NOTICE } from "./notices";

export const PERSONALITIES: readonly Personality[] = [
  ...fisica,
  ...quimica,
  ...filosofia,
  ...musica,
  ...historia,
  ...imperadores,
];

const BY_SLUG = new Map(PERSONALITIES.map((p) => [p.slug, p]));

/** Slugs válidos (allowlist usada pela validação de entrada). */
export const PERSONALITY_SLUGS: readonly string[] = PERSONALITIES.map((p) => p.slug);

export function getPersonality(slug: string): Personality | undefined {
  return BY_SLUG.get(slug);
}

const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function formatHistoricalDate(d: HistoricalDate): string {
  if (d.label) return d.label;
  const era = d.year < 0 ? " a.C." : "";
  const year = `${Math.abs(d.year)}${era}`;
  const prefix = d.approximate ? "c. " : "";
  if (d.day && d.month) return `${prefix}${d.day} de ${MONTHS[d.month - 1]} de ${year}`;
  if (d.month) return `${prefix}${MONTHS[d.month - 1]} de ${year}`;
  return `${prefix}${year}`;
}

/** Texto pesquisável normalizado (sem acentos, minúsculo). */
export function normalizeText(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function searchPersonalities(query: string): Personality[] {
  const q = normalizeText(query.trim());
  if (!q) return [...PERSONALITIES];
  return PERSONALITIES.filter((p) =>
    normalizeText([p.name, p.fullName ?? "", p.field, p.shortDescription, p.category].join(" ")).includes(q),
  );
}
