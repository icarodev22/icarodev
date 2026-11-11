/**
 * Otimiza os retratos fornecidos em assets/retratos e atualiza o manifesto.
 *   npm run portraits:build
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PERSONALITY_SLUGS } from "../src/content";
import { processPortrait, type CreditEntry } from "./portraits-core";

async function main() {
  const root = process.cwd();
  const srcDir = path.join(root, "assets/retratos");
  const outDir = path.join(root, "public/retratos");
  const credits = JSON.parse(readFileSync(path.join(srcDir, "creditos.json"), "utf8")) as Record<string, CreditEntry>;
  const manifest: Record<string, unknown> = {};
  const errors: string[] = [];
  for (const [slug, entry] of Object.entries(credits)) {
    if (!PERSONALITY_SLUGS.includes(slug)) {
      errors.push(`${slug}: personalidade inexistente.`);
      continue;
    }
    try {
      manifest[slug] = await processPortrait(slug, entry, srcDir, outDir);
      console.log(`✓ ${slug}`);
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }
  writeFileSync(path.join(root, "src/content/portraits.generated.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  const missing = PERSONALITY_SLUGS.filter((s) => !manifest[s]);
  console.log(`\n${Object.keys(manifest).length} retratos processados; ${missing.length} usam a ilustração (${missing.join(", ") || "nenhuma"}).`);
  if (errors.length) {
    console.error(`\nErros:\n- ${errors.join("\n- ")}`);
    process.exit(1);
  }
}
void main();
