import { artist, links } from '../content'
import { Arrow } from '../components/Arrow'
import { FluidField } from '../components/FluidField'

export function Contato() {
  const channels = [
    { label: 'Presskit', detail: 'Google Drive', href: links.presskit },
    { label: 'Spotify', detail: 'Perfil do artista', href: links.spotifyArtist },
    { label: 'Instagram', detail: links.instagramHandle, href: links.instagram },
    ...(links.email ? [{ label: 'E-mail', detail: links.email, href: `mailto:${links.email}` }] : []),
  ]
  return (
    <section id="contato" className="contato" aria-labelledby="contato-title">
      <FluidField className="contato__fluid" />
      <div className="contato__inner">
        <header className="section-head">
          <span className="mono">04 / Contato</span>
          <span className="rule" data-reveal="rule" />
        </header>

        <h2 id="contato-title" className="display contato__title">
          <span data-reveal>Contrate</span>
          <span data-reveal style={{ ['--d' as string]: '0.08s' }}>
            o <em>{artist.name}</em>
          </span>
        </h2>

        <div className="contato__row">
          <p className="contato__lede" data-reveal>
            Shows, festas e eventos. Fale direto com o escritório do artista para agenda e propostas.
          </p>
          <a className="btn btn--red contato__cta" href={links.booking} target="_blank" rel="noopener noreferrer" data-reveal>
            Chamar o escritório no WhatsApp <Arrow />
          </a>
        </div>

        <ul className="channels">
          {channels.map((c, i) => (
            <li key={c.label} data-reveal style={{ ['--d' as string]: `${i * 0.06}s` }}>
              <a href={c.href} target="_blank" rel="noopener noreferrer">
                <span className="channels__label">{c.label}</span>
                <span className="channels__detail mono">{c.detail}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
