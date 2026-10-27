import { stages } from '../content'
import { media, src, srcSet, type Media } from '../media'
import { FlexCarousel, type FlexCarouselItem } from '../components/FlexCarousel/FlexCarousel'

// Legendas só onde o evento está confirmado (nome do arquivo enviado).
// As fotos sem identificação ficam com uma legenda neutra, sem nome de evento.
const photos: [Media, string | null][] = [
  [media.showEsbornia, 'Esbórnia Recife'],
  [media.showAoVivo2, null],
  [media.showPreReveillon, 'Pré Réveillon BP · Fortaleza'],
  [media.showKaioJorge, 'Aniversário Kaio Jorge'],
  [media.showAoVivo1, null],
  [media.showPrivado, 'Evento privado'],
  [media.showAoVivo3, null],
  [media.showLiveset, 'VILX Liveset'],
]

const items: FlexCarouselItem[] = photos.map(([m, caption]) => ({
  id: m.id,
  src: src(m),
  srcSet: srcSet(m),
  width: m.w,
  height: m.h,
  alt: m.alt,
  caption,
}))

export function Shows() {
  const loop = [...stages, ...stages]
  return (
    <section id="shows" className="section shows" aria-labelledby="shows-title">
      <header className="section-head">
        <span className="mono">03 / Shows</span>
        <span className="rule" data-reveal="rule" />
      </header>

      <div className="shows__lead">
        <h2 id="shows-title" className="display" data-reveal>
          Grandes
          <br />
          <span>palcos</span>
        </h2>
        <p data-reveal style={{ ['--d' as string]: '0.12s' }}>
          Do house às pistas de funk, VILX marcou presença em eventos e palcos como estes:
        </p>
      </div>

      <div className="stages" aria-label="Palcos citados no release">
        <ul className="sr-only">
          {stages.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="stages__track" aria-hidden="true">
          {loop.map((s, i) => (
            <span key={i}>
              {s}
              <i />
            </span>
          ))}
        </div>
      </div>

      <div className="shows__carousel">
        <FlexCarousel items={items} label="Fotos de shows do VILX" distortion={0.55} bend={0.55} fallbackCaption="Ao vivo" />
      </div>
    </section>
  )
}
