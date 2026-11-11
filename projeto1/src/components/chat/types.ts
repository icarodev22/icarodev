import type { Reference, TimelineEvent } from "@/content/types";
import type { PortraitData } from "@/components/portrait/Portrait";

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
  portrait: PortraitData;
  portraitNotice: string;
}

export interface SwitchOption {
  slug: string;
  name: string;
  categoryName: string;
}
