import { useEffect, type RefObject } from 'react'
import { clamp, prefersReducedMotion } from '../lib/env'

/**
 * Escreve --sp no elemento: -1 quando ele entra por baixo da tela, 0 com o
 * centro alinhado ao centro da tela, 1 quando sai por cima. Só calcula
 * enquanto o elemento está visível.
 */
export function useScrollProgress(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let raf = 0
    let visible = false
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const sp = clamp((vh / 2 - (r.top + r.height / 2)) / ((vh + r.height) / 2), -1, 1)
      el.style.setProperty('--sp', sp.toFixed(4))
    }
    const schedule = () => {
      if (!raf && visible) raf = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      schedule()
    })
    io.observe(el)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ref])
}
