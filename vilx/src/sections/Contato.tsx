import { artist, links } from '../content'
import { Arrow } from '../components/Arrow'
import { FluidField } from '../components/FluidField'
import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal'

export function Contato() {
  const channels = [
    { label: 'Presskit', detail: 'Fotos, release e material de divulgação', href: links.presskit },
    { label: 'Spotify', detail: 'Perfil do artista', href: links.spotifyArtist },
    { label: 'Instagram', detail: links.instagramHandle, href: links.instagram },
    ...(links.email ? [{ label: 'E-mail', detail: links.email, href: `mailto:${links.email}` }] : []),
  ]
  return (
    <section id="contato" className="contato" aria-labelledby="contato-title">
      <FluidField className="contato__fluid" />
      <div className="contato__inner">
        <p className="eyebrow">
          <span className="eyebrow__n">04</span>Contato
        </p>

        <ScrollReveal as="h2" id="contato-title" className="t-display contato__title" mode="once" effect="rise" stagger={0.09} baseOpacity={0} accent={[artist.name]}>
          {`Contrate o ${artist.name}`}
        </ScrollReveal>

        <div className="contato__row">
          <ScrollReveal className="t-lede contato__lede" mode="once" stagger={0.02} baseOpacity={0} baseOffset={10}>
            Shows, festas e eventos. Fale direto com o escritório do artista para agenda e propostas.
          </ScrollReveal>
          <a className="btn btn--red contato__cta" href={links.booking} target="_blank" rel="noopener noreferrer" data-reveal>
            Falar com o escritório no WhatsApp <Arrow />
          </a>
        </div>

        <ul className="channels">
          {channels.map((c, i) => (
            <li key={c.label} data-reveal style={{ ['--d' as string]: `${i * 0.06}s` }}>
              <a href={c.href} target="_blank" rel="noopener noreferrer">
                <span className="channels__label">{c.label}</span>
                <span className="channels__detail">{c.detail}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
