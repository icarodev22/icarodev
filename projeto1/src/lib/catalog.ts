import { getCategory, PERSONALITIES } from "@/content";
import type { CategoryId, Personality } from "@/content/types";
import { getPortraitPhoto, photoNotice } from "@/content/portraits";
import { getScope } from "@/content/scopes";
import type { PortraitData } from "@/components/portrait/Portrait";

/** Dados mínimos enviados ao navegador para cartões e busca (sem a base de conhecimento). */
export interface PersonalityCardData {
  slug: string;
  name: string;
  /** Nome curto para a barra de seleção (ex.: "Einstein", "Pedro II"). */
  shortName: string;
  field: string;
  category: CategoryId;
  categoryName: string;
  periodLabel: string;
  shortDescription: string;
  portrait: PortraitData;
  portraitNotice: string;
  suggestedQuestions: string[];
  searchText: string;
}

export function toCardData(p: Personality): PersonalityCardData {
  return {
    slug: p.slug,
    name: p.name,
    shortName: shortName(p),
    field: p.field,
    category: p.category,
    categoryName: getCategory(p.category).name,
    periodLabel: p.periodLabel,
    shortDescription: p.shortDescription,
    portrait: portraitData(p),
    portraitNotice: portraitNotice(p),
    suggestedQuestions: p.suggestedQuestions.slice(0, 3),
    searchText: [p.name, p.fullName ?? "", p.field, getCategory(p.category).name, p.periodLabel, eraTerms(p), ...(getScope(p.slug)?.core ?? [])]
      .join(" ")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase(),
  };
}

export function allCards(): PersonalityCardData[] {
  return PERSONALITIES.map(toCardData);
}

export function portraitData(p: Personality): PortraitData {
  const photo = getPortraitPhoto(p.slug);
  return { art: p.portrait.art, alt: photo ? `${photo.kind === "reconstrucao-digital" ? "Reconstrução digital do retrato" : "Retrato"} de ${p.name}` : p.portrait.alt, ...(photo ? { photo } : {}) };
}

export function portraitNotice(p: Personality): string {
  const photo = getPortraitPhoto(p.slug);
  return photo ? photoNotice(photo) : p.portrait.notice;
}

const SHORT_NAMES: Record<string, string> = {
  "dom-pedro-ii": "Pedro II",
  "napoleao-bonaparte": "Napoleão",
  "ibn-khaldun": "Ibn Khaldun",
};

export function shortName(p: Personality): string {
  return SHORT_NAMES[p.slug] ?? p.name.split(" ").at(-1) ?? p.name;
}

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];

/** Termos de época para a busca: século(s) de vida e grandes períodos. */
export function eraTerms(p: Personality): string {
  const centuryOf = (y: number) => (y > 0 ? Math.floor((y - 1) / 100) + 1 : Math.floor((-y - 1) / 100) + 1);
  const label = (y: number) => `seculo ${ROMAN[centuryOf(y)] ?? ""}${y < 0 ? " a.c." : ""}`;
  const terms = new Set([label(p.born.year), label(p.died.year)]);
  if (p.died.year < 500) terms.add("antiguidade");
  else if (p.born.year < 1500) terms.add("idade media");
  else if (p.born.year < 1789) terms.add("idade moderna");
  else terms.add("idade contemporanea");
  return [...terms].join(" ").toLowerCase();
}
