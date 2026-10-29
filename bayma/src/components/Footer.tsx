import { contacts, sections } from '../content'
import { logo } from '../media'
import { InstagramIcon, WhatsAppIcon } from './icons'
import './footer.css'

/**
 * Rodapé centralizado (estrutura do Footer 8 do React Bits Pro): logo
 * original, navegação essencial, ícones sociais reais e direitos autorais.
 * `home` é o endereço da página principal ('' nela mesma, '/' nas outras).
 */
export function Footer({ home = '' }: { home?: string }) {
  return (
    <footer className="footer">
      <a href={`${home}#top`} className="footer__logo" aria-label="BAYMA, voltar ao início">
        <img src={logo.purple} width={logo.width} height={logo.height} alt="" loading="lazy" />
      </a>

      <nav className="footer__nav" aria-label="Rodapé">
        {sections.map((s) => (
          <a key={s.id} href={`${home}#${s.id}`}>
            {s.label}
          </a>
        ))}
      </nav>

      <ul className="footer__social">
        <li>
          <a href={contacts.instagram.href} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            <span>{contacts.instagram.display}</span>
          </a>
        </li>
        <li>
          <a href={contacts.whatsapp.href} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span>
              <span className="sr-only">WhatsApp, contratação: </span>
              {contacts.whatsapp.display}
            </span>
          </a>
        </li>
      </ul>

      <p className="footer__copy">© {new Date().getFullYear()} BAYMA. Todos os direitos reservados.</p>
    </footer>
  )
}
