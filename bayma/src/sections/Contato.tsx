import { ArrowUpRight, InstagramIcon, WhatsAppIcon } from '../components/icons'
import { contacts } from '../content'
import './contato.css'

const methods = [
  { ...contacts.whatsapp, Icon: WhatsAppIcon },
  { ...contacts.instagram, Icon: InstagramIcon },
] as const

/**
 * Contratação: painel azul que fecha a página espelhando o Hero.
 * Só os dois canais reais, como linhas tipográficas grandes.
 */
export function Contato() {
  return (
    <section id="contato" className="contato" aria-labelledby="contato-title">
      <h2 id="contato-title" className="title contato__title" data-reveal>
        Contratação
      </h2>

      <ul className="contato__list">
        {methods.map(({ label, display, href, Icon }, i) => (
          <li key={label} data-reveal style={{ ['--d' as string]: 120 + i * 100 }}>
            <a className="contato__row" href={href} target="_blank" rel="noopener noreferrer">
              <span className="contato__label">
                <Icon />
                {label}
              </span>
              <span className="contato__value">{display}</span>
              <ArrowUpRight className="contato__arrow" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
