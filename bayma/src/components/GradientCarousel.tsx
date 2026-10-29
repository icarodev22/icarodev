import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import type { ShowPhoto } from '../media'
import { ArrowLeft, ArrowRight } from './icons'
import './gradient-carousel.css'

/**
 * Carrossel 3D com fundo que assume a tonalidade da foto ativa.
 * Implementação própria no lugar do Gradient Carousel do React Bits (a
 * instalação oficial não estava disponível): mesma ideia, sem Tailwind.
 * As cores de cada foto vêm de tints.json (extraídas da própria imagem).
 *
 * Navegação: botões, setas do teclado (com o carrossel em foco), arrastar
 * no toque/mouse e clique nas fotos vizinhas. Nada roda sozinho.
 */
export function GradientCarousel({ items, label }: { items: ShowPhoto[]; label: string }) {
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ x: number; id: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)
  const n = items.length

  const go = useCallback((to: number) => setIndex(((to % n) + n) % n), [n])
  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    } else if (e.key === 'Home') {
      e.preventDefault()
      go(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      go(n - 1)
    }
  }

  // Arrastar: o trilho acompanha o dedo e decide no fim do gesto.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const width = () => stage.clientWidth || 1
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return
      dragState.current = { x: e.clientX, id: e.pointerId, moved: false }
    }
    const move = (e: PointerEvent) => {
      const s = dragState.current
      if (!s || s.id !== e.pointerId) return
      const dx = e.clientX - s.x
      if (!s.moved && Math.abs(dx) > 6) {
        s.moved = true
        stage.setPointerCapture(e.pointerId)
      }
      if (s.moved) setDrag(dx / width())
    }
    const up = (e: PointerEvent) => {
      const s = dragState.current
      if (!s || s.id !== e.pointerId) return
      const dx = (e.clientX - s.x) / width()
      dragState.current = null
      setDrag(0)
      if (s.moved) {
        // O click que o navegador dispara ao soltar não deve trocar a foto.
        suppressClick.current = true
        setTimeout(() => (suppressClick.current = false), 0)
      }
      if (s.moved && Math.abs(dx) > 0.08) setIndex((i) => (((i + (dx < 0 ? 1 : -1)) % n) + n) % n)
    }
    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerup', up)
    stage.addEventListener('pointercancel', up)
    return () => {
      stage.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerup', up)
      stage.removeEventListener('pointercancel', up)
    }
  }, [n])

  const active = items[index]

  return (
    <div
      className={`gcar ${drag ? 'is-dragging' : ''}`}
      style={{ ['--c1' as string]: active.tint[0], ['--c2' as string]: active.tint[1] } as CSSProperties}
    >
      <div className="gcar__bg" aria-hidden="true" />

      <div
        ref={stageRef}
        className="gcar__stage"
        role="region"
        aria-roledescription="carrossel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <ul className="gcar__track" style={{ ['--drag' as string]: drag } as CSSProperties}>
          {items.map((p, i) => {
            // Posição relativa circular: -2 … 2 em torno da foto ativa.
            let o = i - index
            if (o > n / 2) o -= n
            if (o < -n / 2) o += n
            const near = Math.abs(o) <= 1
            return (
              <li
                key={p.src}
                className={`gcar__slide ${o === 0 ? 'is-active' : ''}`}
                style={{ ['--o' as string]: o, ['--a' as string]: Math.abs(o) } as CSSProperties}
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${n}`}
                aria-hidden={o !== 0}
                onClick={() => {
                  if (o !== 0 && !suppressClick.current) go(i)
                }}
              >
                <img
                  src={p.src}
                  srcSet={p.srcSet}
                  sizes="(max-width: 719px) 78vw, 46vw"
                  width={p.width}
                  height={p.height}
                  alt={p.alt}
                  loading={near ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                  style={{ objectPosition: p.position }}
                />
              </li>
            )
          })}
        </ul>
      </div>

      <div className="gcar__controls">
        <button type="button" className="gcar__btn" onClick={prev} aria-label="Foto anterior">
          <ArrowLeft />
        </button>
        <p className="gcar__count" aria-live="polite">
          <span className="sr-only">Foto </span>
          <strong>{String(index + 1).padStart(2, '0')}</strong>
          <span aria-hidden="true"> / </span>
          <span className="sr-only"> de </span>
          {String(n).padStart(2, '0')}
        </p>
        <button type="button" className="gcar__btn" onClick={next} aria-label="Próxima foto">
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}
