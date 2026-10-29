import { contacts, sections } from '../content'
import { logo } from '../media'
import { InstagramIcon, WhatsAppIcon } from './icons'
import './footer.css'

/**
 * Rodapé centralizado (estrutura do Footer 8 do React Bits Pro): logo
 * original, navegação essencial, ícones sociais reais e direitos autorais.
 */
export function Footer() {
  return (
    <footer className="footer">
      <a href="#top" className="footer__logo" aria-label="BAYMA, voltar ao início">
        <img src={logo.purple} width={logo.width} height={logo.height} alt="" loading="lazy" />
      </a>

      <nav className="footer__nav" aria-label="Rodapé">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="mono">
            {s.label}
          </a>
        ))}
      </nav>

      <ul className="footer__social">
        <li>
          <a
            href={contacts.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${contacts.instagram.display}`}
          >
            <InstagramIcon />
          </a>
        </li>
        <li>
          <a
            href={contacts.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${contacts.whatsapp.display}`}
          >
            <WhatsAppIcon />
          </a>
        </li>
      </ul>

      <p className="footer__copy mono">© {new Date().getFullYear()} BAYMA · Todos os direitos reservados</p>
    </footer>
  )
}
