// Registro único de imagens do site. Cada arquivo de origem aparece aqui uma
// única vez e pertence a uma única seção. O script `npm run audit:images`
// confere esta regra no código e no build final.

export type Media = {
  id: string
  section: 'historia' | 'lancamentos' | 'shows'
  source: string // arquivo original recebido
  w: number
  h: number
  srcset: [string, number][]
  alt: string
}

const base = '/media/'
// No build de arquivo único (npm run build:single) as fotos vêm embutidas
// como data URIs neste mapa; no site normal ele não existe.
const inlined = (globalThis as { __VILX_MEDIA__?: Record<string, string> }).__VILX_MEDIA__
const url = (file: string) => inlined?.[file] ?? `${base}${file}`

function m(
  id: string,
  section: Media['section'],
  source: string,
  w: number,
  h: number,
  widths: number[],
  alt: string,
): Media {
  return {
    id,
    section,
    source,
    w,
    h,
    srcset: widths.map((x) => [url(`${id}-${x}.webp`), x]),
    alt,
  }
}

export const media = {
  // História — ensaio de estúdio
  historiaOculos: m('historia-oculos', 'historia', 'PART4 VILACAPrancheta 1.jpg', 4000, 6000, [800, 1400], 'VILX de óculos escuros e camiseta branca, em luz quente'),
  historiaOlhar: m('historia-olhar', 'historia', 'PART1 VILACAPrancheta 2.jpg', 4000, 6000, [800, 1400], 'VILX em close, com a mão no rosto'),
  historiaVermelho: m('historia-vermelho', 'historia', 'PART2 VILACAPrancheta 1.jpg', 4000, 6000, [800, 1400], 'VILX sorrindo, sentado diante de uma luz vermelha'),
  historiaLua: m('historia-lua', 'historia', 'PART5 VILACAPrancheta 1.jpg', 4000, 6000, [800, 1400], 'VILX sentado em uma cadeira diante de um círculo de luz'),

  // Lançamentos — capas recortadas dos cards do release
  capaPredio: m('capa-o-predio-vai-tremer', 'lancamentos', 'VILX - RELEASE.pdf (p. 4, card O Prédio Vai Tremer)', 360, 360, [360], 'Capa de O Prédio Vai Tremer'),
  capaTodaNua: m('capa-toda-nua', 'lancamentos', 'VILX - RELEASE.pdf (p. 4, card Toda Nua)', 340, 340, [340], 'Capa de Toda Nua'),

  // Shows
  showEsbornia: m('show-esbornia-recife', 'shows', 'Esbórnia Recife.jpg', 1024, 1536, [1024], 'VILX nos decks sob luzes rosa no Esbórnia Recife'),
  showPreReveillon: m('show-pre-reveillon-bp-fortaleza', 'shows', 'Pré Réveillon BP _ Fortaleza.jpg', 1024, 683, [1024], 'VILX de costas para o público no Pré Réveillon BP, em Fortaleza'),
  showKaioJorge: m('show-aniversario-kaio-jorge', 'shows', 'Aniversário Kaio Jorge.jpg', 854, 1280, [1024], 'VILX em preto e branco no Aniversário Kaio Jorge'),
  showPrivado: m('show-evento-privado', 'shows', 'Evento Privado.jpg', 854, 1280, [1024], 'VILX nos decks em um evento privado'),
  showLiveset: m('show-liveset', 'shows', 'Vilx Liveset.jpg', 854, 1280, [1024], 'VILX com camisa roxa em um liveset noturno'),
  showAoVivo1: m('show-ao-vivo-01', 'shows', 'SaveClip.App_680763459_….jpg', 1024, 1365, [1024], 'VILX sorrindo no meio do público sob luzes neon'),
  showAoVivo2: m('show-ao-vivo-02', 'shows', 'SaveClip.App_723331329_….jpg', 1024, 1365, [1024], 'VILX com a mão para o alto no palco, com luzes coloridas'),
  showAoVivo3: m('show-ao-vivo-03', 'shows', 'SaveClip.App_847630209_….jpg', 1024, 1365, [1024], 'VILX tocando para a pista sob luz vermelha'),
} satisfies Record<string, Media>

export function srcSet(item: Media) {
  return item.srcset.map(([src, w]) => `${src} ${w}w`).join(', ')
}

export function src(item: Media) {
  return item.srcset[item.srcset.length - 1][0]
}

export const coverById: Record<string, Media> = {
  [media.capaPredio.id]: media.capaPredio,
  [media.capaTodaNua.id]: media.capaTodaNua,
}

if (import.meta.env.DEV) {
  const ids = Object.values(media).map((item) => item.id)
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dup.length) console.error('[media] imagem registrada mais de uma vez:', dup)
}
