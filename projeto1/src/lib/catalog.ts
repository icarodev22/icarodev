import { getCategory, PERSONALITIES } from "@/content";
import type { CategoryId, Personality, PortraitArt } from "@/content/types";

/** Dados mínimos enviados ao navegador para cartões e busca (sem a base de conhecimento). */
export interface PersonalityCardData {
  slug: string;
  name: string;
  field: string;
  category: CategoryId;
  categoryName: string;
  periodLabel: string;
  shortDescription: string;
  art: PortraitArt;
  portraitAlt: string;
  searchText: string;
}

export function toCardData(p: Personality): PersonalityCardData {
  return {
    slug: p.slug,
    name: p.name,
    field: p.field,
    category: p.category,
    categoryName: getCategory(p.category).name,
    periodLabel: p.periodLabel,
    shortDescription: p.shortDescription,
    art: p.portrait.art,
    portraitAlt: p.portrait.alt,
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
