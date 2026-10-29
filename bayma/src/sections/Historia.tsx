import { useRef } from 'react'
import { artist, story } from '../content'
import { historia } from '../media'
import { useScrollProgress } from '../hooks/useScrollProgress'
import './historia.css'

/**
 * "Quem é Vitor Bayma?". O texto vem de content.ts (story), que deve ser
 * preenchido com o presskit oficial. Sem ele, a seção mostra apenas os fatos
 * confirmados: nome, função e estilos.
 */
export function Historia() {
  const ref = useRef<HTMLElement>(null)
  useScrollProgress(ref)

  return (
    <section ref={ref} id="historia" className="hist" aria-labelledby="hist-title">
      <figure className="hist__photo" data-reveal="image">
        <img
          src={historia.src}
          srcSet={historia.srcSet}
          sizes="(max-width: 819px) 100vw, 50vw"
          width={historia.width}
          height={historia.height}
          alt={historia.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: historia.position }}
        />
      </figure>

      <div className="hist__body">
        <p className="eyebrow" data-reveal>
          História
        </p>
        <h2 id="hist-title" className="title hist__title" data-reveal style={{ ['--d' as string]: 80 }}>
          Quem é <span>Vitor Bayma?</span>
        </h2>

        <div className="hist__text">
          {story.length > 0 ? (
            story.map((p, i) => (
              <p key={i} data-reveal style={{ ['--d' as string]: 160 + i * 80 }}>
                {p}
              </p>
            ))
          ) : (
            <p data-reveal style={{ ['--d' as string]: 160 }}>
              {artist.realName} é o {artist.name}, DJ de funk, brega funk e mega funk.
            </p>
          )}
          {story.length === 0 && import.meta.env.DEV && (
            <p className="hist__pending" role="note">
              Biografia pendente: depende do presskit oficial (preencher <code>story</code> em src/content.ts).
            </p>
          )}
        </div>

        <ul className="hist__styles" aria-label="Estilos musicais" data-reveal style={{ ['--d' as string]: 240 }}>
          {artist.styles.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
