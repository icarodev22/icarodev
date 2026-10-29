import { useState } from 'react'
import type { ShowVideo } from '../videos'
import { PlayIcon } from './icons'

/**
 * Player de um vídeo de show. Respeita a proporção original, nunca toca
 * sozinho e só carrega mídia depois de uma ação do visitante.
 */
export function VideoPlayer({ video }: { video: ShowVideo }) {
  const [started, setStarted] = useState(false)
  const ratio = `${video.width} / ${video.height}`

  if (video.type === 'file') {
    return (
      <video
        className="vplayer"
        style={{ aspectRatio: ratio }}
        src={video.src}
        poster={video.poster}
        controls
        playsInline
        preload="none"
        aria-label={video.title}
      />
    )
  }

  // YouTube: pôster leve até o clique; depois o player oficial, sem cookies.
  return started ? (
    <iframe
      className="vplayer"
      style={{ aspectRatio: ratio }}
      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
      title={video.title}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
    />
  ) : (
    <button
      type="button"
      className="vplayer vplayer--poster"
      style={{ aspectRatio: ratio }}
      onClick={() => setStarted(true)}
    >
      <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
      <span className="vplayer__play">
        <PlayIcon />
        <span className="sr-only">Assistir: {video.title}</span>
      </span>
    </button>
  )
}
