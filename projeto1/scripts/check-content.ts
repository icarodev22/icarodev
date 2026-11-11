/** Valida a integridade do conteúdo curado (executado também nos testes). */
import { PERSONALITIES, CATEGORIES } from "../src/content";

const errors: string[] = [];
for (const c of CATEGORIES) {
  const n = PERSONALITIES.filter((p) => p.category === c.id).length;
  if (n !== 3) errors.push(`Categoria ${c.id} tem ${n} personalidades (esperado 3).`);
}
for (const p of PERSONALITIES) {
  if (!p.references.length) errors.push(`${p.slug}: sem referências.`);
  for (const r of p.references) if (r.url && !r.url.startsWith("https://")) errors.push(`${p.slug}: URL não-https.`);
  for (const d of p.knowledge) for (const i of d.referenceIdx) if (!p.references[i]) errors.push(`${p.slug}/${d.id}: referência ${i} inexistente.`);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Conteúdo OK: ${PERSONALITIES.length} personalidades em ${CATEGORIES.length} categorias.`);
