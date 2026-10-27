import { artist, stats, story } from '../content'
import { media, src, srcSet, type Media } from '../media'

function Photo({ item, className, speed, sizes }: { item: Media; className: string; speed: number; sizes: string }) {
  return (
    <figure className={`historia__photo ${className}`} data-reveal="clip">
      <div className="historia__photo-inner" data-speed={speed}>
        <img src={src(item)} srcSet={srcSet(item)} sizes={sizes} width={item.w} height={item.h} alt={item.alt} loading="lazy" decoding="async" />
      </div>
    </figure>
  )
}

export function Historia() {
  const [a, b, c, d] = story
  return (
    <section id="historia" className="section historia" aria-labelledby="historia-title">
      <header className="section-head">
        <span className="mono">01 / História</span>
        <span className="rule" data-reveal="rule" />
        <span className="mono historia__origin">{artist.origin}</span>
      </header>

      <div className="historia__lead">
        <h2 id="historia-title" className="display historia__title">
          <span data-reveal>{artist.realName}</span>
          <span data-reveal style={{ ['--d' as string]: '0.1s' }}>
            é <em>{artist.name}</em>
          </span>
        </h2>
        <p className="historia__intro" data-reveal style={{ ['--d' as string]: '0.2s' }}>
          Artista em ascensão no funk brasileiro e destaque no Nordeste. Cresceu entre o funk, o pop e a música eletrônica, e
          é essa mistura que sai das caixas.
        </p>
      </div>

      <div className="historia__grid">
        <Photo item={media.historiaOculos} className="p-oculos" speed={-0.06} sizes="(max-width: 720px) 92vw, 46vw" />

        <div className="historia__chapters c-1">
          {[a, b].map((ch, i) => (
            <article key={ch.n} className="chapter" data-reveal style={{ ['--d' as string]: `${i * 0.08}s` }}>
              <span className="mono">{ch.n}</span>
              <h3>{ch.title}</h3>
              <p>{ch.text}</p>
            </article>
          ))}
        </div>

        <Photo item={media.historiaLua} className="p-lua" speed={0.08} sizes="(max-width: 720px) 60vw, 26vw" />

        <p className="historia__quote display" data-reveal>
          Funk <span>com pop</span> e <span>eletrônica</span> na mistura
        </p>

        <Photo item={media.historiaVermelho} className="p-vermelho" speed={-0.04} sizes="(max-width: 720px) 92vw, 40vw" />

        <div className="historia__chapters c-2">
          {[c, d].map((ch, i) => (
            <article key={ch.n} className="chapter" data-reveal style={{ ['--d' as string]: `${i * 0.08}s` }}>
              <span className="mono">{ch.n}</span>
              <h3>{ch.title}</h3>
              <p>{ch.text}</p>
            </article>
          ))}
        </div>

        <Photo item={media.historiaOlhar} className="p-olhar" speed={0.06} sizes="(max-width: 720px) 60vw, 24vw" />
      </div>

      <div className="historia__stats">
        <ul>
          {stats.map((s, i) => (
            <li key={s.label + s.platform} data-reveal style={{ ['--d' as string]: `${i * 0.07}s` }}>
              <strong className="display">{s.value}</strong>
              <span>{s.label}</span>
              <span className="mono">{s.platform}</span>
            </li>
          ))}
        </ul>
        <p className="mono historia__source">Números do release oficial do artista, 2026.</p>
      </div>
    </section>
  )
}
