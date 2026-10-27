// Embute as fotos de public/media (e o favicon) no HTML único como data URIs.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const file = join(root, 'dist-single/index.html')
let html = readFileSync(file, 'utf8')
const b64 = (p) => readFileSync(join(root, 'public', p)).toString('base64')
const map = {}
for (const f of readdirSync(join(root, 'public/media'))) map[f] = `data:image/webp;base64,${b64('media/' + f)}`
html = html.replace('<head>', `<head>\n<script>window.__VILX_MEDIA__=${JSON.stringify(map)}</script>`)
html = html.replace('/favicon.svg', `data:image/svg+xml;base64,${b64('favicon.svg')}`)
writeFileSync(file, html)
const left = html.match(/["'(]\/(media|assets)\/[^"')]*/g)
console.log(`index.html: ${(html.length / 1024 / 1024).toFixed(2)} MB; referências locais restantes: ${left ? left.join(', ') : 0}`)
