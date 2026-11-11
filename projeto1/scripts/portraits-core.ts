import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import type { PortraitPhoto } from "../src/content/portraits";

export interface CreditEntry {
  file: string;
  kind?: "fotografia" | "obra-de-arte" | "reconstrucao-digital";
  credit: string;
  license: string;
  sourceUrl?: string;
  focus?: string;
}

export const TARGET_WIDTHS = [320, 720, 1200];
export const MIN_SOURCE_WIDTH = 600;

/** Processa um retrato: valida, redimensiona sem ampliar e gera AVIF + WebP sem metadados. */
export async function processPortrait(slug: string, entry: CreditEntry, srcDir: string, outDir: string): Promise<PortraitPhoto> {
  if (!/^[a-z0-9-]{2,64}$/.test(slug)) throw new Error(`${slug}: slug inválido.`);
  if (!entry.credit?.trim() || !entry.license?.trim()) throw new Error(`${slug}: informe "credit" e "license".`);
  if (entry.kind && !["fotografia", "obra-de-arte", "reconstrucao-digital"].includes(entry.kind)) throw new Error(`${slug}: kind inválido.`);
  if (entry.sourceUrl && !entry.sourceUrl.startsWith("https://")) throw new Error(`${slug}: sourceUrl deve usar https.`);
  const file = path.basename(entry.file); // impede path traversal
  const input = path.join(srcDir, file);
  if (!existsSync(input)) throw new Error(`${slug}: arquivo ${file} não encontrado.`);

  const buffer = readFileSync(input);
  const meta = await sharp(buffer).rotate().metadata();
  if (!meta.width || !meta.height) throw new Error(`${slug}: não foi possível ler a imagem.`);
  if (!["jpeg", "png", "webp", "avif", "heif"].includes(meta.format ?? "")) throw new Error(`${slug}: formato não suportado (${meta.format}).`);
  if (meta.width < MIN_SOURCE_WIDTH) throw new Error(`${slug}: largura ${meta.width}px < ${MIN_SOURCE_WIDTH}px.`);

  mkdirSync(outDir, { recursive: true });
  const widths = [...new Set(TARGET_WIDTHS.map((w) => Math.min(w, meta.width!)))].sort((a, b) => a - b);
  for (const w of widths) {
    // .rotate() aplica a orientação EXIF; sharp não copia metadados por padrão.
    const base = sharp(buffer).rotate().resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 62, effort: 5 }).toFile(path.join(outDir, `${slug}-${w}.avif`));
    await base.clone().webp({ quality: 82 }).toFile(path.join(outDir, `${slug}-${w}.webp`));
  }
  const oriented = await sharp(buffer).rotate().toBuffer({ resolveWithObject: true });
  return {
    base: `/retratos/${slug}`,
    widths,
    width: oriented.info.width,
    height: oriented.info.height,
    kind: entry.kind ?? "fotografia",
    credit: entry.credit.trim(),
    license: entry.license.trim(),
    ...(entry.sourceUrl ? { sourceUrl: entry.sourceUrl } : {}),
    ...(entry.focus && /^\d{1,3}% \d{1,3}%$/.test(entry.focus) ? { focus: entry.focus } : {}),
  };
}
