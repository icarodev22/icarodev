// Auditoria da regra "nenhuma imagem repetida".
// 1. Cada arquivo de origem aparece uma única vez no registro (src/media.ts).
// 2. Cada imagem registrada é usada em no máximo um lugar do código.
// 3. Nenhum arquivo em public/media é idêntico a outro (hash) nem fica órfão.
// 4. Nenhuma foto é usada como fundo via CSS.
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const problems = []
const read = (p) => readFileSync(join(root, p), 'utf8')

function walk(dir) {
  return readdirSync(join(root, dir)).flatMap((f) => {
    const p = join(dir, f)
    return statSync(join(root, p)).isDirectory() ? walk(p) : [p]
  })
}

// 1. registro
const registry = read('src/media.ts')
const entries = [...registry.matchAll(/^\s+(\w+): m\('([\w-]+)', '(\w+)', '([^']+)'/gm)].map((m) => ({
  key: m[1],
  id: m[2],
  section: m[3],
  source: m[4],
}))
const dupBy = (k) => entries.filter((e, i) => entries.findIndex((x) => x[k] === e[k]) !== i)
for (const e of dupBy('id')) problems.push(`id repetido no registro: ${e.id}`)
for (const e of dupBy('source')) problems.push(`arquivo de origem usado duas vezes: ${e.source}`)

// 2. uso no código
const code = walk('src')
  .filter((p) => /\.(tsx?|css)$/.test(p) && !p.endsWith('media.ts'))
  .map((p) => [p, read(p)])
const usage = {}
for (const e of entries) {
  usage[e.key] = []
  for (const [p, txt] of code) {
    const n = (txt.match(new RegExp(`media\\.${e.key}\\b|'${e.id}'`, 'g')) || []).length
    for (let i = 0; i < n; i++) usage[e.key].push(p)
  }
  if (usage[e.key].length > 1) problems.push(`${e.id} usada ${usage[e.key].length}x: ${usage[e.key].join(', ')}`)
}
for (const [p, txt] of code) {
  if (p.endsWith('.css') && /url\([^)]*\.(jpe?g|png|webp)/i.test(txt)) problems.push(`foto usada como fundo em CSS: ${p}`)
}

// 3. arquivos
const files = readdirSync(join(root, 'public/media'))
const hashes = new Map()
for (const f of files) {
  const h = createHash('sha256').update(readFileSync(join(root, 'public/media', f))).digest('hex')
  if (hashes.has(h)) problems.push(`arquivos idênticos: ${f} e ${hashes.get(h)}`)
  hashes.set(h, f)
  const id = f.replace(/-\d+\.webp$/, '')
  if (!entries.some((e) => e.id === id)) problems.push(`arquivo fora do registro: ${f}`)
}

console.log('Mapa de imagens\n')
for (const e of entries) {
  const where = usage[e.key].length ? usage[e.key][0] : '(não usada)'
  console.log(`  ${e.section.padEnd(12)} ${e.id.padEnd(34)} <- ${e.source}  [${where}]`)
}
console.log(`  ${'abertura'.padEnd(12)} ${'avatar 3D (voxels)'.padEnd(34)} <- vilx-avatar.jpg  [src/components/intro]`)
if (problems.length) {
  console.error('\nProblemas:\n  ' + problems.join('\n  '))
  process.exit(1)
}
console.log(`\nOK: ${entries.length} imagens, nenhuma repetida.`)
