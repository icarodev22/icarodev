import { useEffect } from 'react'

/**
 * Revela elementos com [data-reveal] quando entram na tela.
 * O conteúdo nunca fica escondido para sempre: sem IntersectionObserver,
 * ou se algo falhar, tudo é revelado depois de um tempo de segurança.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const show = (el: Element) => el.classList.add('is-in')
    if (!('IntersectionObserver' in window)) {
      els.forEach(show)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target)
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    const failsafe = window.setTimeout(() => {
      // Qualquer coisa já acima da dobra que não foi revelada aparece agora.
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el)
      })
    }, 2500)
    return () => {
      io.disconnect()
      clearTimeout(failsafe)
    }
  }, [])
}
