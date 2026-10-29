/**
 * Vídeos de shows do BAYMA. Só vídeos reais de apresentações dele.
 *
 * Como adicionar:
 * - Arquivo próprio: coloque o .mp4 (H.264) e um pôster .webp em
 *   public/videos/ e use { type: 'file', src: '/videos/x.mp4', poster: '/videos/x.webp' }.
 * - YouTube: use { type: 'youtube', id: 'ID_DO_VIDEO' }.
 * Informe a proporção real (width/height) para não distorcer o vídeo.
 *
 * Nada é baixado antes do clique: arquivos usam preload="none" e o YouTube
 * só é carregado quando o visitante pede para assistir.
 */
export type ShowVideo = {
  title: string
  width: number
  height: number
} & ({ type: 'file'; src: string; poster?: string } | { type: 'youtube'; id: string })

export const videos: ShowVideo[] = []
