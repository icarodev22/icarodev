import { getCategory, PERSONALITIES } from "@/content";
import type { CategoryId, Personality } from "@/content/types";
import { getPortraitPhoto, photoNotice } from "@/content/portraits";
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
    searchText: [p.name, p.fullName ?? "", p.field, getCategory(p.category).name]
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
