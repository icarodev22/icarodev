import { gallery } from '../media'
import './galeria.css'

/**
 * Linguagem visual do artista: poucas fotos, grandes, em escalas e alturas
 * diferentes. O carrossel de Shows cuida dos momentos ao vivo; aqui nenhuma
 * foto se repete.
 */
export function Galeria() {
  return (
    <section className="gal" aria-label="Galeria de fotos">
      {gallery.map((p, i) => (
        <figure
          key={p.src}
          className={`gal__item gal__item--${i + 1}`}
          data-reveal="image"
          style={{ ['--d' as string]: i * 120 }}
        >
          <img
            src={p.src}
            srcSet={p.srcSet}
            sizes={i === 0 ? '(max-width: 719px) 100vw, 48vw' : '(max-width: 719px) 50vw, 32vw'}
            width={p.width}
            height={p.height}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            data-speed="0.05"
            style={{ objectPosition: p.position }}
          />
        </figure>
      ))}
    </section>
  )
}
