import { links, releases, spotifyEmbed, spotifyReleases, spotifyUrl, type Release, type SpotifyRelease } from '../content'
import { coverById, src } from '../media'
import { Arrow } from '../components/Arrow'
import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal'

/** "VILX, MC Bruninho & Maduff" → "MC Bruninho & Maduff" (o VILX já é o dono da página) */
function guests(credits: string | null) {
  if (!credits) return null
  const rest = credits.replace(/^VILX,\s*/i, '')
  return rest === credits ? credits : rest
}

function Cover({ release }: { release: Release }) {
  const item = release.cover ? coverById[release.cover] : null
  if (item) {
    return <img src={src(item)} width={item.w} height={item.h} alt={item.alt} loading="lazy" decoding="async" />
  }
  // Sem capa nos materiais: arte tipográfica, sem imitar uma capa real.
  const [first, ...rest] = release.title.split(' ')
  return (
    <div className="rcard__type" role="img" aria-label={`${release.title}: arte tipográfica provisória (capa original não fornecida)`}>
      <span>{first}</span>
      <span className="serif">{rest.join(' ')}</span>
    </div>
  )
}

/** Lançamento vindo de link do Spotify: card no formato padrão quando título e
 *  capa estão confirmados; até lá, o player oficial (capa e título reais). */
function SpotifyCard({ release: r, index }: { release: SpotifyRelease; index: number }) {
  const n = String(index + 1).padStart(2, '0')
  const cover = r.cover ? coverById[r.cover] : null
  const label = r.title ? `Ouvir ${r.title} no Spotify` : `Ouvir ${r.kind.toLowerCase()} do VILX no Spotify`
  return (
    <li className={`rcard ${cover && r.title ? '' : 'rcard--embed'}`} data-reveal style={{ ['--d' as string]: `${index * 0.09}s` }}>
      {cover && r.title ? (
        <div className="rcard__cover">
          <img src={src(cover)} width={cover.w} height={cover.h} alt={cover.alt} loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="rcard__embed">
          <iframe
            title={`Player do Spotify: ${r.kind.toLowerCase()} do VILX`}
            src={spotifyEmbed(r)}
            width="100%"
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      )}
      <div className="rcard__body">
        <div className="rcard__top">
          <span className="rcard__n serif">{n}</span>
          <span className="rcard__kind">{r.kind}</span>
        </div>
        {r.title && <h3 className="rcard__title">{r.title}</h3>}
        <a className="rcard__link" href={spotifyUrl(r)} target="_blank" rel="noopener noreferrer" aria-label={label}>
          Ouvir no Spotify
          <Arrow />
        </a>
      </div>
    </li>
  )
}

export function Lancamentos() {
  return (
    <section id="lancamentos" className="section lancamentos" aria-labelledby="lancamentos-title">
      <p className="eyebrow">
        <span className="eyebrow__n">02</span>Lançamentos
      </p>

      <div className="lanc__head">
        <h2 id="lancamentos-title" className="lanc__title">
          <ScrollReveal as="span" className="lanc__number" mode="once" splitBy="chars" stagger={0.035} baseOpacity={0} baseOffset={24} blurStrength={3}>
            +15 milhões
          </ScrollReveal>
          <ScrollReveal as="span" className="lanc__unit serif" mode="once" stagger={0.08} baseOpacity={0} baseOffset={12} delay={0.25}>
            de streams
          </ScrollReveal>
        </h2>
        <ScrollReveal className="t-lede lanc__lede" mode="scrub" splitBy="words" stagger={0.035} baseOpacity={0.12} blurStrength={3} baseOffset={8} smoothing={0.12}>
          Na produção musical, VILX soma mais de 15 milhões de streams. Ouça os lançamentos:
        </ScrollReveal>
      </div>

      <ul className="rcards" aria-label="Lançamentos">
        {releases.map((r, i) => {
          const g = guests(r.credits)
          return (
            <li key={r.title} className="rcard" data-reveal style={{ ['--d' as string]: `${i * 0.09}s` }}>
              <div className="rcard__cover">
                <Cover release={r} />
              </div>
              <div className="rcard__body">
                <div className="rcard__top">
                  <span className="rcard__n serif">{String(i + 1).padStart(2, '0')}</span>
                  {r.stat && <span className="rcard__stat">{r.stat}</span>}
                </div>
                <h3 className="rcard__title">{r.title}</h3>
                <p className="rcard__credits">{g ? `com ${g}` : 'VILX'}</p>
                {/* cada card leva à própria faixa; sem link confirmado, ao perfil (e diz isso) */}
                <a
                  className="rcard__link"
                  href={r.spotify ?? links.spotifyArtist}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.spotify ? `Ouvir ${r.title} no Spotify` : `Abrir o perfil do VILX no Spotify, onde está ${r.title}`}
                >
                  {r.spotify ? 'Ouvir no Spotify' : 'Ouvir no perfil do Spotify'}
                  <Arrow />
                </a>
              </div>
            </li>
          )
        })}
        {spotifyReleases.map((r, i) => (
          <SpotifyCard key={r.id} release={r} index={releases.length + i} />
        ))}
      </ul>

      <div className="listen" data-reveal>
        <div className="listen__copy">
          <p className="t-h3">Ouça agora</p>
          <p className="t-meta">Uma faixa do VILX, direto do Spotify.</p>
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
