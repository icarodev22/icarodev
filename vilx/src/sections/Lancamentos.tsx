import { useRef, useState } from 'react'
import { links, releases, type Release } from '../content'
import { coverById, src } from '../media'
import { Arrow } from '../components/Arrow'

function Cover({ release }: { release: Release }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.setProperty('--rx', `${(-y * 14).toFixed(2)}deg`)
    ref.current.style.setProperty('--ry', `${(x * 18).toFixed(2)}deg`)
    ref.current.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
    ref.current.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
  }
  const onLeave = () => {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }
  const item = release.cover ? coverById[release.cover] : null
  return (
    <div className="release__cover-wrap" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className={`release__cover ${item ? '' : 'release__cover--type'}`}>
        {item ? (
          <img src={src(item)} width={item.w} height={item.h} alt={item.alt} loading="lazy" decoding="async" />
        ) : (
          <div className="release__type" role="img" aria-label={`${release.title}: arte tipográfica (capa original não fornecida)`}>
            {release.title.split(' ').map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
        )}
        <span className="release__shine" aria-hidden="true" />
      </div>
    </div>
  )
}

export function Lancamentos() {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <section id="lancamentos" className="section lancamentos" aria-labelledby="lancamentos-title">
      <header className="section-head">
        <span className="mono">02 / Lançamentos</span>
        <span className="rule" data-reveal="rule" />
      </header>

      <div className="lancamentos__lead">
        <h2 id="lancamentos-title" className="display" data-reveal>
          +15 milhões
          <br />
          <span>de streams</span>
        </h2>
        <p data-reveal style={{ ['--d' as string]: '0.12s' }}>
          Na produção musical, VILX soma mais de 15 milhões de streams. Os sucessos que puxam esse número:
        </p>
      </div>

      <ol className={`releases ${hover !== null ? 'has-hover' : ''}`}>
        {releases.map((r, i) => (
          <li
            key={r.title}
            className={`release ${hover === i ? 'is-hover' : ''}`}
            data-reveal
            style={{ ['--d' as string]: `${i * 0.08}s` }}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
          >
            <span className="release__n mono">{String(i + 1).padStart(2, '0')}</span>
            <Cover release={r} />
            <div className="release__info">
              <h3 className="display">{r.title}</h3>
              {r.credits && <p className="release__credits">{r.credits}</p>}
            </div>
            {r.stat && <p className="release__stat display">{r.stat}</p>}
          </li>
        ))}
      </ol>

      <div className="listen" data-reveal>
        <div className="listen__copy">
          <span className="mono">Ouça agora</span>
          <p>Toque a faixa aqui mesmo ou abra o perfil completo do VILX no Spotify.</p>
          <div className="listen__actions">
            <a className="btn btn--red" href={links.spotifyArtist} target="_blank" rel="noopener noreferrer">
              Perfil no Spotify <Arrow />
            </a>
            <a className="btn btn--line" href={links.spotifyTrack} target="_blank" rel="noopener noreferrer">
              Abrir a faixa <Arrow />
            </a>
          </div>
        </div>
        <div className="listen__player">
          <iframe
            title="Player do Spotify com uma faixa do VILX"
            src={links.spotifyTrackEmbed}
            width="100%"
            height="152"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      </div>
    </section>
  )
}
