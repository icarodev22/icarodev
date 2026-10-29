/**
 * Registro das fotografias (geradas por scripts/prep_media.py).
 * Cada foto aparece uma única vez no site. O clique de @gabriellrec-27 vira
 * o recorte do Hero; o par P&B/colorido do mesmo momento ao vivo entrou só
 * na versão colorida, e a foto com marca de patrocinador em primeiro plano
 * ficou de fora.
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

export const identidade = photo(
  'identidade-roxo',
  [720, 1100, 1365],
  [1365, 2048],
  'Retrato de BAYMA em fundo roxo, sorrindo, com jaqueta preta bordada',
  '50% 18%',
)

export const gallery: Photo[] = [
  photo(
    'palco-telao',
    [900, 1440],
    [1440, 1154],
    'BAYMA no palco, com o nome BAYMA no telão e o público em primeiro plano',
    '50% 55%',
  ),
  photo('estudio-perfil', [720, 1100, 1365], [1365, 2048], 'BAYMA de perfil em fundo azul, sorrindo', '42% 20%'),
  photo(
    'ao-vivo-azul',
    [900, 1500, 2200],
    [2730, 1820],
    'BAYMA tocando com fones no pescoço, braço erguido, sob luzes azuis e roxas',
    '50% 40%',
  ),
  photo('ao-vivo-bone', [720, 1200], [1440, 1922], 'BAYMA de boné nas pick-ups, sorrindo durante o set', '60% 40%'),
  photo('ao-vivo-vermelho', [720, 1200], [1365, 1820], 'BAYMA nas pick-ups sob luz vermelha', '55% 45%'),
  photo(
    'ao-vivo-brasil',
    [900, 1500],
    [2730, 1820],
    'BAYMA com camisa da seleção brasileira, vibrando atrás das pick-ups',
    '50% 35%',
  ),
  photo('estudio-cinza', [720, 1100], [1365, 2048], 'BAYMA em fundo cinza, segurando os fones, sorrindo', '50% 15%'),
]
