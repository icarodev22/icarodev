/**
 * Dados oficiais do BAYMA. Só entra aqui o que foi confirmado pelo artista:
 * nada de cidade, datas, eventos, músicas ou números inventados.
 */
export const artist = {
  name: 'BAYMA',
  realName: 'Vitor Bayma',
  styles: ['Funk', 'Brega Funk', 'Mega Funk'],
}

/**
 * Texto da seção "Quem é Vitor Bayma?", um parágrafo por item.
 * PROVISÓRIO: substituir pelo texto do presskit oficial (pasta do Google
 * Drive enviada pelo artista) quando ele estiver disponível.
 */
export const story: string[] = [
  'Vitor Bayma é o DJ BAYMA.',
  'Texto provisório: a história completa entra aqui com o presskit oficial.',
]

export const contacts = {
  whatsapp: {
    label: 'WhatsApp',
    purpose: 'Contratação',
    display: '(81) 9 8957-5353',
    href: 'https://wa.me/5581989575353',
  },
  instagram: {
    label: 'Instagram',
    purpose: 'Perfil oficial',
    display: '@bayma11',
    href: 'https://www.instagram.com/bayma11/',
  },
} as const

/** Seções da página principal, na ordem da navegação. */
export const sections = [
  { id: 'historia', label: 'História' },
  { id: 'shows', label: 'Shows' },
  { id: 'contato', label: 'Contato' },
] as const

/** Endereço da página de vídeos (videos/index.html). */
export const videosHref = '/videos/'
