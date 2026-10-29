import { useRef } from 'react'
import { artist } from '../content'
import { identidade } from '../media'
import { useScrollProgress } from '../hooks/useScrollProgress'
import './identidade.css'

/**
 * Os três estilos confirmados em tipografia monumental, cruzando o retrato
 * em fundo roxo: a foto faz a ponte entre o azul do Hero e o roxo da marca.
 */
export function Identidade() {
  const ref = useRef<HTMLElement>(null)
  useScrollProgress(ref)

  return (
    <section ref={ref} id="identidade" className="ident" aria-labelledby="ident-title">
      <h2 id="ident-title" className="label mono" data-reveal>
        01 · Identidade musical
      </h2>

      <div className="ident__stage">
        <ul className="ident__words">
          {artist.styles.map((s, i) => (
            <li
              key={s}
              className={`ident__word ident__word--${i + 1}`}
              data-reveal
              style={{ ['--d' as string]: i * 120 }}
            >
              <span>{s}</span>
            </li>
          ))}
        </ul>

        <figure className="ident__photo" data-reveal="image">
          <img
            src={identidade.src}
            srcSet={identidade.srcSet}
            sizes="(max-width: 719px) 62vw, 34vw"
            width={identidade.width}
            height={identidade.height}
            alt={identidade.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: identidade.position }}
          />
        </figure>
      </div>
    </section>
  )
}
