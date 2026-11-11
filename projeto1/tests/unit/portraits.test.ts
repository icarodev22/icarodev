import { describe, expect, it } from "vitest";
import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { processPortrait } from "../../scripts/portraits-core";
import { photoSrcSet } from "@/content/portraits";

async function fixture(dir: string, name: string, width: number, height: number) {
  await sharp({ create: { width, height, channels: 3, background: { r: 120, g: 90, b: 60 } } })
    .withMetadata({ exif: { IFD0: { Artist: "segredo-gps" } } })
    .jpeg()
    .toFile(path.join(dir, name));
}

const credit = { credit: "Autor de teste", license: "Domínio público" };

describe("pipeline de retratos", () => {
  it("gera AVIF e WebP responsivos sem ampliar e sem metadados", async () => {
    const src = mkdtempSync(path.join(tmpdir(), "p1-src-"));
    const out = mkdtempSync(path.join(tmpdir(), "p1-out-"));
    await fixture(src, "a.jpg", 900, 1125);
    const photo = await processPortrait("albert-einstein", { file: "a.jpg", ...credit }, src, out);
    expect(photo.widths).toEqual([320, 720, 900]);
    expect(photo.width).toBe(900);
    for (const w of photo.widths) {
      expect(existsSync(path.join(out, `albert-einstein-${w}.avif`))).toBe(true);
      expect(existsSync(path.join(out, `albert-einstein-${w}.webp`))).toBe(true);
    }
    const meta = await sharp(path.join(out, "albert-einstein-720.webp")).metadata();
    expect(meta.width).toBe(720);
    expect(meta.exif).toBeUndefined();
    expect(photoSrcSet(photo, "avif")).toContain("/retratos/albert-einstein-720.avif 720w");
  });

  it("recusa imagens sem crédito/licença, pequenas, URL insegura ou caminho externo", async () => {
    const src = mkdtempSync(path.join(tmpdir(), "p1-src-"));
    const out = mkdtempSync(path.join(tmpdir(), "p1-out-"));
    await fixture(src, "small.jpg", 400, 500);
    await fixture(src, "ok.jpg", 800, 1000);
    await expect(processPortrait("socrates", { file: "ok.jpg", credit: "", license: "x" }, src, out)).rejects.toThrow(/credit/);
    await expect(processPortrait("socrates", { file: "small.jpg", ...credit }, src, out)).rejects.toThrow(/600px/);
    await expect(processPortrait("socrates", { file: "ok.jpg", ...credit, sourceUrl: "http://x" }, src, out)).rejects.toThrow(/https/);
    await expect(processPortrait("socrates", { file: "../../etc/passwd", ...credit }, src, out)).rejects.toThrow(/não encontrado/);
  });
});
