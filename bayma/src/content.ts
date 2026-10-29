/**
 * Dados oficiais do BAYMA. Só entra aqui o que foi confirmado pelo artista:
 * nada de biografia, cidade, eventos, músicas ou números inventados.
 */
export const artist = {
  name: 'BAYMA',
  styles: ['Funk', 'Brega Funk', 'Mega Funk'],
}

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

/** Seções reais do site, na ordem da página. A navegação só aponta para elas. */
export const sections = [
  { id: 'identidade', label: 'Identidade' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'contato', label: 'Contato' },
] as const
