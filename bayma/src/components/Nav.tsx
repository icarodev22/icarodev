import { useEffect, useState } from 'react'
import { contacts, sections } from '../content'
import { logo } from '../media'
import { ArrowUpRight, InstagramIcon, WhatsAppIcon } from './icons'
import './nav.css'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.82)
      // Acima da primeira seção nenhuma aba está ativa.
      const first = document.getElementById(sections[0].id)
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 820 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`nav ${solid ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
        <a
          href="#top"
          className="nav__mark"
          aria-label="BAYMA, voltar ao início"
          onClick={close}
          tabIndex={solid || open ? 0 : -1}
        >
          <img src={logo.white} width={logo.width} height={logo.height} alt="" />
        </a>

        <nav className="nav__links" aria-label="Principal">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>
              {s.label}
            </a>
          ))}
          <a
            className="btn btn--light nav__cta"
            href={contacts.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contratar
            <ArrowUpRight />
          </a>
        </nav>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span>{open ? 'Fechar' : 'Menu'}</span>
          <i aria-hidden="true" />
        </button>
      </header>

      <div id="nav-menu" className="nav__menu" hidden={!open}>
        <nav aria-label="Menu">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={close}
              aria-current={active === s.id ? 'location' : undefined}
              style={{ ['--i' as string]: i }}
            >
              {s.label}
            </a>
          ))}
          <a
            href={contacts.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{ ['--i' as string]: sections.length }}
          >
            Contratar
            <ArrowUpRight />
          </a>
        </nav>
        <div className="nav__menu-contacts">
          <a href={contacts.whatsapp.href} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span>
              <small>{contacts.whatsapp.purpose}</small>
              {contacts.whatsapp.display}
            </span>
          </a>
          <a href={contacts.instagram.href} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            <span>
              <small>{contacts.instagram.label}</small>
              {contacts.instagram.display}
            </span>
          </a>
        </div>
      </div>
    </>
  )
}
