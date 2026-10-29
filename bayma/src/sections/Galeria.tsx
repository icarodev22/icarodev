import { gallery } from '../media'
import './galeria.css'

/**
 * Composição editorial: tamanhos, recortes e alturas diferentes para cada
 * foto, com posição ajustada individualmente (media.ts). Nada se repete.
 */
export function Galeria() {
  return (
    <section id="galeria" className="gal" aria-labelledby="gal-title">
      <header className="gal__head">
        <h2 id="gal-title" className="label mono" data-reveal>
          02 · Galeria
        </h2>
        <p className="mono gal__count" data-reveal>
          {String(gallery.length).padStart(2, '0')} fotografias
        </p>
      </header>

      <div className="gal__grid">
        {gallery.map((p, i) => (
          <figure key={p.src} className={`gal__item gal__item--${i + 1}`}>
            <div className="gal__frame" data-reveal="image" style={{ ['--d' as string]: (i % 2) * 120 }}>
              <img
                src={p.src}
                srcSet={p.srcSet}
                sizes={
                  i === 1 || i === 3 || i === 4 || i === 6
                    ? '(max-width: 719px) 48vw, 34vw'
                    : '(max-width: 719px) 100vw, 62vw'
                }
                width={p.width}
                height={p.height}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                data-speed="0.05"
                style={{ objectPosition: p.position }}
              />
            </div>
            <figcaption className="mono">{String(i + 1).padStart(2, '0')}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
