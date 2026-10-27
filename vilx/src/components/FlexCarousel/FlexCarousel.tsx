import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { clamp, hasWebGL, prefersReducedMotion } from '../../lib/env'
import './FlexCarousel.css'

export type FlexCarouselItem = {
  id: string
  src: string
  srcSet?: string
  width: number
  height: number
  alt: string
  /** Legenda exibida abaixo da foto. `null` = sem legenda de evento. */
  caption: string | null
}

export type FlexCarouselProps = {
  items: FlexCarouselItem[]
  label: string
  /** Intensidade da distorção líquida (0 a 1). */
  distortion?: number
  /** Curvatura de profundidade da faixa (0 a 1). */
  bend?: number
  /** Raio dos cantos, em px. */
  radius?: number
  /** Texto usado quando a foto não tem legenda confirmada. */
  fallbackCaption?: string
}

/**
 * FlexCarousel
 *
 * A faixa em DOM é a fonte da verdade: layout, legendas, teclado e leitores de
 * tela funcionam sem WebGL. Por cima dela, um canvas OGL redesenha cada foto
 * como um plano com curvatura de profundidade, distorção líquida proporcional
 * à velocidade do arrasto e uma lente sutil sob o cursor. Se o WebGL falhar,
 * as fotos em DOM simplesmente continuam visíveis.
 */
export function FlexCarousel({
  items,
  label,
  distortion = 0.55,
  bend = 0.5,
  radius = 6,
  fallbackCaption = 'Ao vivo',
}: FlexCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const goToRef = useRef<(i: number) => void>(() => {})
  const [index, setIndex] = useState(0)
  const [near, setNear] = useState(false)
  const [gl, setGl] = useState(false)
  const uid = useId()

  // Só baixa as fotos quando a seção se aproxima da tela.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setNear(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '1200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!near) return
    const root = rootRef.current!
    const viewport = viewportRef.current!
    const track = trackRef.current!
    const canvas = canvasRef.current!
    const reduced = prefersReducedMotion()
    const strength = reduced ? 0 : distortion

    const itemEls = Array.from(track.querySelectorAll<HTMLElement>('[data-flex-item]'))
    const frames = itemEls.map((el) => el.querySelector<HTMLElement>('[data-flex-frame]')!)
    const imgs = itemEls.map((el) => el.querySelector<HTMLImageElement>('img')!)

    // ---- estado de movimento
    let current = 0
    let target = 0
    let min = 0
    let max = 0
    let vpW = 0
    let centers: number[] = [] // centro de cada item relativo à faixa (px)
    let layout: { x: number; y: number; w: number; h: number }[] = []
    let velocity = 0
    let visible = false
    let raf = 0
    let last = performance.now()
    let activeIndex = 0
    let dirty = true
    let applied = 0 // deslocamento realmente escrito no DOM

    const apply = (x: number) => {
      applied = x
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`
    }

    const snapPositions = () => centers.map((c) => vpW / 2 - c)

    const measure = () => {
      vpW = viewport.clientWidth
      const trackRect = track.getBoundingClientRect()
      const canvasRect = canvas.getBoundingClientRect()
      centers = frames.map((f) => {
        const r = f.getBoundingClientRect()
        return r.left - trackRect.left + r.width / 2
      })
      // posição de cada moldura dentro do canvas, com a faixa em x = 0
      layout = frames.map((f) => {
        const r = f.getBoundingClientRect()
        return {
          x: r.left - canvasRect.left - applied,
          y: r.top - canvasRect.top,
          w: r.width,
          h: r.height,
        }
      })
      const snaps = snapPositions()
      max = snaps[0] ?? 0
      min = snaps[snaps.length - 1] ?? 0
      target = clamp(target, min, max)
      current = clamp(current, min, max)
      if (!started) {
        current = target = max
        started = true
      }
      apply(current)
      glLayer?.resize()
      dirty = true
    }
    let started = false

    const nearestIndex = (x: number) => {
      const snaps = snapPositions()
      let best = 0
      for (let i = 1; i < snaps.length; i++) if (Math.abs(snaps[i] - x) < Math.abs(snaps[best] - x)) best = i
      return best
    }

    const goTo = (i: number) => {
      const snaps = snapPositions()
      const k = clamp(i, 0, snaps.length - 1)
      target = snaps[k]
      if (reduced) current = target
      dirty = true
      kick()
    }
    goToRef.current = (i) => goTo(i)

    // ---- arrasto (mouse e toque)
    let dragging = false
    let pointerId = -1
    let startX = 0
    let startY = 0
    let startTarget = 0
    let lastMoveX = 0
    let lastMoveT = 0
    let dragVel = 0
    let axis: 'x' | 'y' | null = null
    let moved = false

    const rubber = (x: number) => {
      if (x > max) return max + (x - max) * 0.35
      if (x < min) return min + (x - min) * 0.35
      return x
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      dragging = true
      pointerId = e.pointerId
      startX = lastMoveX = e.clientX
      startY = e.clientY
      startTarget = target = current
      lastMoveT = performance.now()
      dragVel = 0
      axis = e.pointerType === 'mouse' ? 'x' : null
      moved = false
      if (axis === 'x') viewport.setPointerCapture(pointerId)
      root.classList.add('is-dragging')
    }

    const onMove = (e: PointerEvent) => {
      updateMouse(e)
      if (!dragging || e.pointerId !== pointerId) return
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      if (!axis) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
        axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
        if (axis === 'y') {
          // gesto vertical: devolve para a rolagem da página
          dragging = false
          root.classList.remove('is-dragging')
          return
        }
        viewport.setPointerCapture(pointerId)
      }
      if (Math.abs(dx) > 4) moved = true
      const now = performance.now()
      const dt = Math.max(1, now - lastMoveT)
      dragVel = dragVel * 0.6 + ((e.clientX - lastMoveX) / dt) * 0.4
      lastMoveX = e.clientX
      lastMoveT = now
      // resposta 1:1 ao dedo, sem atraso
      target = current = rubber(startTarget + dx)
      dirty = true
      kick()
    }

    const onUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return
      dragging = false
      root.classList.remove('is-dragging')
      if (viewport.hasPointerCapture(pointerId)) viewport.releasePointerCapture(pointerId)
      // inércia curta: projeta ~180ms à frente e encaixa na foto mais próxima
      const projected = current + dragVel * 180
      goTo(nearestIndex(clamp(projected, min, max)))
    }

    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }

    let wheelTimer = 0
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      target = clamp(target - e.deltaX, min, max)
      dirty = true
      kick()
      clearTimeout(wheelTimer)
      wheelTimer = window.setTimeout(() => goTo(nearestIndex(target)), 140)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(activeIndex + 1)
      else if (e.key === 'ArrowLeft') goTo(activeIndex - 1)
      else if (e.key === 'Home') goTo(0)
      else if (e.key === 'End') goTo(items.length - 1)
      else return
      e.preventDefault()
    }

    // ---- lente sob o cursor
    const mouse = { x: 0, y: 0, inside: false }
    function updateMouse(e: PointerEvent) {
      if (e.pointerType !== 'mouse') return
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.inside = true
      dirty = true
      kick()
    }
    const onLeave = () => {
      mouse.inside = false
      dirty = true
      kick()
    }

    viewport.addEventListener('pointerdown', onDown)
    viewport.addEventListener('pointermove', onMove)
    viewport.addEventListener('pointerup', onUp)
    viewport.addEventListener('pointercancel', onUp)
    viewport.addEventListener('pointerleave', onLeave)
    viewport.addEventListener('click', onClick, true)
    viewport.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('keydown', onKey)

    // ---- camada WebGL (opcional)
    let glLayer: GLLayer | null = null
    const glFailed = () => {
      glLayer?.dispose()
      glLayer = null
      root.classList.remove('is-gl')
      itemEls.forEach((el) => el.classList.remove('has-tex'))
      setGl(false)
    }
    if (hasWebGL()) {
      import('./glLayer')
        .then(({ createGLLayer }) => {
          if (disposed) return
          glLayer = createGLLayer({
            canvas,
            images: imgs,
            radius,
            strength,
            bend: reduced ? bend * 0.6 : bend,
            onReady: () => {
              dirty = true
              kick()
            },
            onShown: (i) => itemEls[i].classList.add('has-tex'),
            onLost: glFailed,
          })
          root.classList.add('is-gl')
          setGl(true)
          measure()
          kick()
        })
        .catch(glFailed)
    }

    // ---- loop: só roda enquanto há movimento e a seção está visível
    let disposed = false
    function kick() {
      if (!raf && visible && !disposed) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }

    function tick(now: number) {
      raf = 0
      const dt = Math.min(64, now - last) / 1000
      last = now
      const prev = current
      if (!dragging) {
        const k = reduced ? 1 : 1 - Math.exp(-dt * 11)
        current += (target - current) * k
        if (Math.abs(target - current) < 0.05) current = target
      }
      const frameVel = (current - prev) / Math.max(dt * 60, 0.001) // px por frame a 60fps
      velocity += (clamp(frameVel / 50, -1, 1) - velocity) * (1 - Math.exp(-dt * 10))
      if (Math.abs(velocity) < 0.0005) velocity = 0

      apply(current)
      const idx = nearestIndex(current)
      if (idx !== activeIndex) {
        activeIndex = idx
        setIndex(idx)
      }

      let animating = false
      if (glLayer) {
        animating = glLayer.render({
          offset: current,
          layout,
          velocity,
          mouse,
          active: activeIndex,
          dt,
        })
      }
      const moving = current !== target || dragging || velocity !== 0
      if (moving || animating || dirty) {
        dirty = false
        if (moving || animating) raf = requestAnimationFrame(tick)
      }
    }

    const vio = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) {
        dirty = true
        kick()
      } else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    vio.observe(root)

    const ro = new ResizeObserver(() => {
      measure()
      goTo(activeIndex)
    })
    ro.observe(viewport)
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure, { once: true })
    })
    measure()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      clearTimeout(wheelTimer)
      vio.disconnect()
      ro.disconnect()
      viewport.removeEventListener('pointerdown', onDown)
      viewport.removeEventListener('pointermove', onMove)
      viewport.removeEventListener('pointerup', onUp)
      viewport.removeEventListener('pointercancel', onUp)
      viewport.removeEventListener('pointerleave', onLeave)
      viewport.removeEventListener('click', onClick, true)
      viewport.removeEventListener('wheel', onWheel)
      root.removeEventListener('keydown', onKey)
      glLayer?.dispose()
    }
  }, [near, items, distortion, bend, radius])

  const go = useCallback((d: number) => goToRef.current(index + d), [index])
  const current = items[index]

  return (
    <div
      ref={rootRef}
      className={`flex-carousel ${gl ? 'is-gl' : ''}`}
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      tabIndex={0}
    >
      <div ref={viewportRef} className="flex-carousel__viewport">
        <canvas ref={canvasRef} className="flex-carousel__gl" aria-hidden="true" />
        <ul ref={trackRef} className="flex-carousel__track" id={`${uid}-track`}>
          {items.map((it, i) => (
            <li
              key={it.id}
              data-flex-item
              className={`flex-carousel__item ${i === index ? 'is-active' : ''}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${items.length}`}
              aria-current={i === index ? 'true' : undefined}
            >
              <figure>
                <div data-flex-frame className="flex-carousel__frame" style={{ aspectRatio: `${it.width} / ${it.height}` }}>
                  <img
                    src={near ? it.src : undefined}
                    srcSet={near ? it.srcSet : undefined}
                    sizes="(max-width: 720px) 80vw, 50vw"
                    width={it.width}
                    height={it.height}
                    alt={it.alt}
                    draggable={false}
                    decoding="async"
                  />
                </div>
                <figcaption>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className={it.caption ? '' : 'is-muted'}>{it.caption ?? fallbackCaption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-carousel__controls">
        <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-controls={`${uid}-track`} aria-label="Foto anterior">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <p className="flex-carousel__status mono" aria-live="polite">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <i style={{ ['--k' as string]: (index + 1) / items.length }} />
          <span>{String(items.length).padStart(2, '0')}</span>
          <span className="sr-only">{current?.caption ?? fallbackCaption}</span>
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === items.length - 1}
          aria-controls={`${uid}-track`}
          aria-label="Próxima foto"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

type GLLayer = import('./glLayer').GLLayer
