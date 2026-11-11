import type { PortraitArt, Reference, TimelineEvent } from "@/content/types";

export interface ChatProfile {
  slug: string;
  name: string;
  field: string;
  categoryName: string;
  periodLabel: string;
  born: string;
  died: string;
  birthPlace: string;
  deathPlace?: string;
  historicalContext: string;
  contributions: string[];
  works: string[];
  timeline: TimelineEvent[];
  references: Reference[];
  suggestedQuestions: string[];
  art: PortraitArt;
  portraitAlt: string;
  portraitNotice: string;
}

export interface SwitchOption {
  slug: string;
  name: string;
  categoryName: string;
}
