import tints from './tints.json'

/**
 * Registro das fotografias (geradas por scripts/prep_media.py).
 * Cada foto aparece uma única vez no site:
 * - Hero: recorte de @gabriellrec-27.
 * - História: retrato em fundo roxo (@gabriellrec-44).
 * - Shows (carrossel): cinco momentos reais ao vivo.
 * - Galeria: os retratos de estúdio restantes e um clique ao vivo.
 * O par P&B/colorido do mesmo momento ao vivo entrou só na versão colorida.
 */
export type Photo = {
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
  /** object-position ajustado à mão para cada enquadramento. */
  position: string
}

export type ShowPhoto = Photo & { tint: [string, string] }

const base = `${import.meta.env.BASE_URL}media/`

function photo(name: string, widths: number[], [w, h]: [number, number], alt: string, position = '50% 50%'): Photo {
  const largest = widths[widths.length - 1]
  return {
    src: `${base}${name}-${widths[Math.min(1, widths.length - 1)]}.webp`,
    srcSet: widths.map((x) => `${base}${name}-${x}.webp ${x}w`).join(', '),
    width: largest,
    height: Math.round((largest * h) / w),
    alt,
    position,
  }
}

function show(
  name: keyof typeof tints,
  widths: number[],
  ratio: [number, number],
  alt: string,
  position?: string,
): ShowPhoto {
  return { ...photo(name, widths, ratio, alt, position), tint: tints[name] as [string, string] }
}

export const logo = {
  white: `${base}logo-branco.webp`,
  purple: `${base}logo-roxo.webp`,
  width: 1748,
  height: 506,
}

export const hero = photo(
  'hero-bayma',
  [560, 900, 1300],
  [1300, 1720],
  'BAYMA sorrindo, de óculos escuros, jaqueta preta e camiseta branca',
  '50% 0%',
)

export const historia = photo(
  'identidade-roxo',
  [720, 1100, 1365],
  [1365, 2048],
  'Retrato de Vitor Bayma em fundo roxo, sorrindo, com jaqueta preta bordada',
  '50% 22%',
)

export const shows: ShowPhoto[] = [
  show(
    'palco-telao',
    [900, 1440],
    [1440, 1154],
    'BAYMA no palco, com o nome BAYMA no telão e o público em primeiro plano',
    '50% 50%',
  ),
  show(
    'ao-vivo-azul',
    [900, 1500, 2200],
    [2730, 1820],
    'BAYMA tocando com fones no pescoço, braço erguido, sob luzes azuis e roxas',
    '48% 40%',
  ),
  show('ao-vivo-vermelho', [720, 1200], [1365, 1820], 'BAYMA nas pick-ups sob luz vermelha', '58% 45%'),
  show(
    'ao-vivo-brasil',
    [900, 1500],
    [2730, 1820],
    'BAYMA com camisa da seleção brasileira, vibrando atrás das pick-ups',
    '62% 35%',
  ),
  show('ao-vivo-cabine', [720, 1200], [1344, 1792], 'BAYMA na cabine de DJ, de camisa azul e fones', '55% 40%'),
]

export const gallery: Photo[] = [
  photo('estudio-perfil', [720, 1100, 1365], [1365, 2048], 'BAYMA de perfil em fundo azul, sorrindo', '42% 20%'),
  photo('ao-vivo-bone', [720, 1200], [1440, 1922], 'BAYMA de boné nas pick-ups, sorrindo durante o set', '60% 40%'),
  photo('estudio-cinza', [720, 1100], [1365, 2048], 'BAYMA em fundo cinza, segurando os fones, sorrindo', '50% 15%'),
]
