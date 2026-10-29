import { useEffect, useRef, useState } from 'react'
import { CrtField, crtPresets } from '../components/CrtField'
import { ArrowUpRight, InstagramIcon } from '../components/icons'
import { artist, contacts } from '../content'
import { hero, logo } from '../media'
import { clamp, isCoarsePointer, prefersReducedMotion } from '../lib/env'
import './hero.css'

/**
 * Abertura: azul elétrico dominante, logo original em escala monumental e o
 * recorte da fotografia real à frente das letras. Cursor e rolagem só
 * escrevem variáveis CSS (--mx, --my, --p); todo o movimento está no CSS.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Dois quadros garantem que o estado inicial foi pintado antes da entrada.
    let r2 = 0
    const r1 = requestAnimationFrame(() => (r2 = requestAnimationFrame(() => setReady(true))))
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    let progress = -1
    let raf = 0
    let visible = true

    const tick = () => {
      raf = 0
      pointer.x += (pointer.tx - pointer.x) * 0.08
      pointer.y += (pointer.ty - pointer.y) * 0.08
      el.style.setProperty('--mx', pointer.x.toFixed(4))
      el.style.setProperty('--my', pointer.y.toFixed(4))
      const p = clamp(window.scrollY / el.offsetHeight)
      if (p !== progress) {
        progress = p
        el.style.setProperty('--p', p.toFixed(4))
      }
      if (Math.abs(pointer.tx - pointer.x) > 0.001 || Math.abs(pointer.ty - pointer.y) > 0.001) schedule()
    }
    const schedule = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1
      schedule()
    }
    const onLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
      schedule()
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      schedule()
    })
    io.observe(el)
    const coarse = isCoarsePointer()
    if (!coarse) {
      el.addEventListener('pointermove', onMove, { passive: true })
      el.addEventListener('pointerleave', onLeave)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <section ref={ref} id="top" className={`hero ${ready ? 'is-ready' : ''}`} aria-label="Abertura">
      <div className="hero__frame">
        <CrtField preset={crtPresets.hero} className="hero__bg" />
        <div className="hero__glow" aria-hidden="true" />

        <h1 className="hero__logo">
          <img src={logo.white} width={logo.width} height={logo.height} alt={artist.name} fetchPriority="high" />
        </h1>

        <div className="hero__photo">
          <img
            src={hero.src}
            srcSet={hero.srcSet}
            sizes="(max-width: 719px) 92vw, (max-width: 1099px) 56vw, 40vh"
            width={hero.width}
            height={hero.height}
            alt={hero.alt}
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="hero__side hero__side--left">
          <p className="hero__kicker">DJ</p>
          <ul className="hero__styles" aria-label="Estilos musicais">
            {artist.styles.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <a className="btn" href={contacts.whatsapp.href} target="_blank" rel="noopener noreferrer">
            Contratar
            <ArrowUpRight />
          </a>
        </div>

        <div className="hero__side hero__side--right">
          <p className="hero__kicker">{contacts.whatsapp.purpose}</p>
          <a className="hero__phone" href={contacts.whatsapp.href} target="_blank" rel="noopener noreferrer">
            <span className="sr-only">WhatsApp </span>
            {contacts.whatsapp.display}
          </a>
          <a className="hero__ig" href={contacts.instagram.href} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            {contacts.instagram.display}
          </a>
        </div>
      </div>
    </section>
  )
}
