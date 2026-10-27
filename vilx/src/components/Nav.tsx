import { useEffect, useState } from 'react'
import { links } from '../content'
import './nav.css'

const items = [
  { id: 'historia', label: 'História' },
  { id: 'lancamentos', label: 'Lançamentos' },
  { id: 'shows', label: 'Shows' },
  { id: 'contato', label: 'Contato' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach(({ id }) => {
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
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav ${solid ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <a href="#top" className="nav__logo" aria-label="VILX, voltar ao início" onClick={() => setOpen(false)}>
        VILX
      </a>

      <nav id="nav-links" className="nav__links" aria-label="Seções">
        {items.map((it, i) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={active === it.id ? 'is-active' : ''}
            aria-current={active === it.id ? 'true' : undefined}
            onClick={() => setOpen(false)}
            style={{ ['--i' as string]: i }}
          >
            <span className="mono">0{i + 1}</span>
            {it.label}
          </a>
        ))}
      </nav>

      <a className="nav__cta" href={links.booking} target="_blank" rel="noopener noreferrer">
        Contratar
      </a>

      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-links"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <i />
        <i />
      </button>
    </header>
  )
}
