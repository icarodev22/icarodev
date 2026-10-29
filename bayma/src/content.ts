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
 * Biografia da seção "Quem é Vitor Bayma?".
 * Deve vir do presskit oficial (pasta do Google Drive informada). Enquanto o
 * material não for extraído, fica vazia e a seção mostra só os fatos
 * confirmados acima. Cada item é um parágrafo.
 */
export const story: string[] = []

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
