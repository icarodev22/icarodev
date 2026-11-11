import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { BRAND, SIMULATION_DISCLAIMER } from "@/content";

const css = readFileSync(path.resolve(__dirname, "../../src/app/globals.css"), "utf8");

function themeVars(selector: string): Record<string, string> {
  const block = css.slice(css.indexOf(selector));
  const body = block.slice(block.indexOf("{") + 1, block.indexOf("}"));
  return Object.fromEntries([...body.matchAll(/--c-([a-z-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1]!, m[2]!.toLowerCase()]));
}

function luminance(hex: string): number {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!;
}
const contrast = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x! + 0.05) / (y! + 0.05);
};

describe("identidade EPOCH.ia", () => {
  it("usa a paleta oficial no tema escuro", () => {
    const dark = themeVars(":root,");
    expect(dark).toMatchObject({ canvas: "#0b0d12", surface: "#151922", line: "#252b36", accent: "#829bff", fg: "#f1f3f7", muted: "#939baa" });
  });

  for (const [name, selector] of [["escuro", ":root,"], ["claro", '[data-theme="light"]']] as const) {
    it(`tema ${name}: texto e estados atendem WCAG 2.2 AA (4,5:1)`, () => {
      const v = themeVars(selector);
      const pairs: [string, string][] = [
        ["fg", "canvas"], ["fg", "surface"], ["fg", "raised"],
        ["muted", "canvas"], ["muted", "surface"],
        ["accent", "canvas"], ["accent", "surface"],
        ["on-accent", "accent"], ["canvas", "fg"],
        ["warn", "canvas"], ["danger", "canvas"], ["success", "canvas"],
      ];
      for (const [a, b] of pairs) expect(contrast(v[a]!, v[b]!), `${a} sobre ${b}`).toBeGreaterThanOrEqual(4.5);
      // Bordas e componentes não textuais: mínimo 1,2:1 visível (decorativas) — documentado em MARCA.md.
    });
  }

  it("nome, assinatura e aviso de simulação seguem o manual", () => {
    expect(BRAND.name).toBe("EPOCH.ia");
    expect(BRAND.tagline).toBe("Conhecimento além do tempo.");
    expect(SIMULATION_DISCLAIMER).toMatch(/^Esta é uma simulação educacional criada com inteligência artificial\./);
  });

  it("logotipos publicados não dependem de fonte instalada (texto em contornos)", () => {
    const dir = path.resolve(__dirname, "../../public/brand");
    for (const f of readdirSync(dir).filter((x) => x.endsWith(".svg"))) {
      const svg = readFileSync(path.join(dir, f), "utf8");
      expect(svg, f).not.toMatch(/<text|<image|<script|on\w+=/i);
    }
  });
});
