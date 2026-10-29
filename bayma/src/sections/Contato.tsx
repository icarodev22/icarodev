import { CrtField, crtPresets } from '../components/CrtField'
import { ArrowUpRight, InstagramIcon, WhatsAppIcon } from '../components/icons'
import { contacts } from '../content'
import './contato.css'

const methods = [
  { ...contacts.whatsapp, Icon: WhatsAppIcon, tone: 'blue' },
  { ...contacts.instagram, Icon: InstagramIcon, tone: 'purple' },
] as const

/**
 * Contratação. Estrutura inspirada no bloco Contact 3 do React Bits Pro
 * (métodos de contato com ícone, rótulo e destino), adaptada para os dois
 * canais reais do BAYMA: nenhum terceiro canal foi inventado.
 */
export function Contato() {
  return (
    <section id="contato" className="contato" aria-labelledby="contato-title">
      <CrtField preset={crtPresets.contato} className="contato__bg" />

      <div className="contato__inner">
        <div className="contato__intro">
          <p className="eyebrow" data-reveal>
            Contato
          </p>
          <h2 id="contato-title" className="title contato__title" data-reveal style={{ ['--d' as string]: 100 }}>
            Contratação
          </h2>
        </div>

        <ul className="contato__methods">
          {methods.map(({ label, purpose, display, href, Icon, tone }, i) => (
            <li key={label} data-reveal style={{ ['--d' as string]: 200 + i * 120 }}>
              <a
                className={`method method--${tone}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label}: ${display} (${purpose}). Abre em nova aba.`}
              >
                <span className="method__icon">
                  <Icon />
                </span>
                <span className="method__text">
                  <span className="method__label">
                    {label} · {purpose}
                  </span>
                  <span className="method__value">{display}</span>
                </span>
                <ArrowUpRight className="method__arrow" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
