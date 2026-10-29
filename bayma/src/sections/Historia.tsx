import { useRef } from 'react'
import { story } from '../content'
import { historia } from '../media'
import { useScrollProgress } from '../hooks/useScrollProgress'
import './historia.css'

/** "Quem é Vitor Bayma?". O texto vem de `story` em content.ts. */
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
        <h2 id="hist-title" className="title hist__title" data-reveal>
          Quem é <span>Vitor Bayma?</span>
        </h2>

        <div className="hist__text">
          {story.map((p, i) => (
            <p key={i} data-reveal style={{ ['--d' as string]: 120 + i * 80 }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
