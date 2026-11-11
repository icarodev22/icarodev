import manifest from "./portraits.generated.json";

/**
 * Fotografias/obras fornecidas pelo responsável e processadas por
 * `npm run portraits:build` (AVIF + WebP em várias larguras). O manifesto é
 * gerado automaticamente; personalidades sem entrada usam a ilustração SVG.
 */
export interface PortraitPhoto {
  /** Base do caminho público, ex.: "/retratos/albert-einstein". */
  base: string;
  widths: number[];
  width: number;
  height: number;
  kind: "fotografia" | "obra-de-arte" | "reconstrucao-digital";
  credit: string;
  license: string;
  sourceUrl?: string;
  /** Posição de enquadramento (CSS object-position). */
  focus?: string;
}

const PHOTOS = manifest as Record<string, PortraitPhoto>;

export function getPortraitPhoto(slug: string): PortraitPhoto | undefined {
  return PHOTOS[slug];
}

export function photoSrcSet(p: PortraitPhoto, format: "avif" | "webp"): string {
  return p.widths.map((w) => `${p.base}-${w}.${format} ${w}w`).join(", ");
}

export function photoNotice(p: PortraitPhoto): string {
  if (p.kind === "reconstrucao-digital") {
    return `Reconstrução digital — representação artística, não é fotografia autêntica. ${p.credit} — ${p.license}.`;
  }
  const kind = p.kind === "obra-de-arte" ? "Obra de arte" : "Fotografia";
  return `${kind}: ${p.credit} — ${p.license}.`;
}
