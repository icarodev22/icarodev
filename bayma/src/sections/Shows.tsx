import { GradientCarousel } from '../components/GradientCarousel'
import { PlayIcon } from '../components/icons'
import { videosHref } from '../content'
import { shows } from '../media'
import './shows.css'

/** Momentos reais ao vivo em carrossel 3D, com acesso à página de vídeos. */
export function Shows() {
  return (
    <section id="shows" className="shows" aria-labelledby="shows-title">
      <header className="shows__head">
        <p className="eyebrow" data-reveal>
          Ao vivo
        </p>
        <h2 id="shows-title" className="title shows__title" data-reveal style={{ ['--d' as string]: 80 }}>
          Shows
        </h2>
      </header>

      <GradientCarousel items={shows} label="Fotos de shows do BAYMA" />

      <div className="shows__cta">
        <a className="btn btn--light btn--caps shows__videos" href={videosHref}>
          <PlayIcon />
          CONFIRA OS VÍDEOS
        </a>
      </div>
    </section>
  )
}
