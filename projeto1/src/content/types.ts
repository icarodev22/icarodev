/**
 * Modelo de conteúdo curado das personalidades.
 *
 * Este conteúdo é a fonte de verdade versionada no repositório. O script
 * `npm run db:seed` o carrega no PostgreSQL (tabelas personalities,
 * knowledge_documents e knowledge_chunks).
 */

export type CategoryId = "fisica" | "quimica" | "filosofia" | "musica" | "historia" | "imperadores";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

/** Data histórica com grau de precisão explícito (evita inventar precisão). */
export interface HistoricalDate {
  /** Ano astronômico simplificado: negativo = a.C. (ex.: -470 = 470 a.C.). */
  year: number;
  month?: number;
  day?: number;
  /** Data aproximada ou debatida pelas fontes. */
  approximate?: boolean;
  /** Texto exibido (ex.: "c. 470 a.C."). Gerado automaticamente se ausente. */
  label?: string;
}

export interface Reference {
  title: string;
  publisher: string;
  /** URL pública da fonte. Sempre https. */
  url?: string;
  kind: "enciclopedia" | "universidade" | "instituicao" | "museu" | "obra" | "arquivo" | "premio";
}

export interface TimelineEvent {
  /** Rótulo do ano (ex.: "1905", "c. 387 a.C."). */
  when: string;
  event: string;
}

export interface KnowledgeDocument {
  /** Identificador estável, único dentro da personalidade. */
  id: string;
  title: string;
  /** Texto de referência curado (pt-BR). Será fragmentado em chunks. */
  body: string;
  /** Índices em `references` que embasam o documento. */
  referenceIdx: number[];
}

export type PortraitKind = "ilustracao-original" | "fotografia" | "obra-de-arte";

export interface PortraitSpec {
  kind: PortraitKind;
  /** Descrição acessível (texto alternativo). */
  alt: string;
  /** Aviso exibido junto ao retrato. */
  notice: string;
  /** Parâmetros da ilustração vetorial original (src/components/portrait). */
  art: PortraitArt;
}

export interface PortraitArt {
  hair:
    | "wild"
    | "receding"
    | "short"
    | "bun"
    | "wig"
    | "long"
    | "bald-sides"
    | "curly-short"
    | "curly-long"
    | "fringe"
    | "pompadour"
    | "turban"
    | "balding"
    | "slick";
  facialHair?: "mustache" | "thick-mustache" | "beard" | "long-beard" | "white-beard";
  headwear?: "fedora" | "bicorne" | "turban";
  attire: "suit" | "high-collar" | "dress" | "coat-cravat" | "himation" | "military" | "jacket" | "robe" | "toga" | "imperial";
  glasses?: boolean;
  /** Variação do enquadramento para evitar retratos idênticos. */
  tilt?: number;
}

export interface Personality {
  slug: string;
  name: string;
  /** Nome completo ou nome de nascimento, quando relevante. */
  fullName?: string;
  category: CategoryId;
  field: string;
  born: HistoricalDate;
  died: HistoricalDate;
  birthPlace: string;
  deathPlace?: string;
  /** Rótulo curto do período (ex.: "1879–1955"). */
  periodLabel: string;
  shortDescription: string;
  historicalContext: string;
  biography: string;
  contributions: string[];
  works: string[];
  timeline: TimelineEvent[];
  references: Reference[];
  suggestedQuestions: string[];
  /** Orientações de voz/estilo para a simulação educacional. */
  persona: {
    voice: string;
    /** Limite de conhecimento: nada após esta data deve ser tratado como vivido. */
    knowledgeHorizon: string;
    /** Temas sensíveis e como tratá-los de forma factual. */
    sensitiveTopics?: string;
    /** Citações populares sabidamente apócrifas que não devem ser usadas. */
    apocryphalQuotes?: string[];
  };
  portrait: PortraitSpec;
  knowledge: KnowledgeDocument[];
  featured?: boolean;
}
