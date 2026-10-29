import { useEffect, useRef, useState } from 'react'
import { hasWebGL, isCoarsePointer, lowPowerDevice, prefersReducedMotion } from '../lib/env'
import './crt.css'

const vertex = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }`

// Tela CRT: fósforo (emissão) se movendo devagar sobre o fundo, com curvatura
// discreta nas bordas, rastro de persistência, ondulação horizontal suave e
// ruído. As scanlines ficam no CSS (.crt::after) para continuarem nítidas
// mesmo com o canvas renderizado em resolução reduzida.
const fragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uMouseAmt;
uniform vec3 uBase;
uniform vec3 uEmit;
uniform vec3 uEmit2;
uniform float uGlow;
uniform float uCurve;
uniform float uWarp;
uniform float uNoise;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return v;
}
// Campo de emissão num instante t: duas manchas de luz + fósforo granulado.
float field(vec2 p, float t) {
  vec2 a = vec2(sin(t * 0.21) * 0.9, cos(t * 0.17) * 0.45 + 0.15);
  vec2 b = vec2(cos(t * 0.13 + 2.0) * 1.0, sin(t * 0.19 + 1.0) * 0.5 - 0.2);
  float l = exp(-dot(p - a, p - a) * 1.6) + 0.8 * exp(-dot(p - b, p - b) * 2.2);
  float n = fbm(p * 1.4 + vec2(t * 0.05, -t * 0.03));
  return l * (0.55 + 0.75 * n);
}

void main() {
  // Curvatura: o canto da tela "foge" um pouco, como num tubo.
  vec2 c = vUv * 2.0 - 1.0;
  c *= 1.0 + uCurve * dot(c.yx, c.yx);
  vec2 uv = c * 0.5 + 0.5;

  // Ondulação horizontal e uma faixa de varredura que desce devagar.
  float t = uTime;
  float roll = fract(t * 0.045);
  float band = exp(-pow((uv.y - (1.0 - roll)) * 9.0, 2.0));
  uv.x += (sin(uv.y * 38.0 + t * 1.7) * 0.0016 + band * 0.006) * uWarp;

  float aspect = uRes.x / uRes.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.0;
  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0) * 2.0;
  float md = exp(-dot(p - m, p - m) * 2.4) * uMouseAmt;
  p += (p - m) * md * 0.06;

  // Persistência: o fósforo de instantes anteriores ainda brilha um pouco.
  float e = field(p, t);
  e = max(e, field(p, t - 0.6) * 0.62);
  e = max(e, field(p, t - 1.3) * 0.34);
  e += md * 0.55;

  vec3 col = uBase;
  col = mix(col, uEmit, clamp(e * uGlow, 0.0, 1.0));
  col += uEmit2 * pow(clamp(e * uGlow, 0.0, 1.0), 3.0) * 0.35;
  col += uEmit * band * 0.05 * uWarp;

  // Ruído de sinal e sombra nas bordas do tubo.
  col += (hash(gl_FragCoord.xy + fract(t * 7.3) * 91.0) - 0.5) * uNoise;
  float vig = smoothstep(1.25, 0.35, length(c * vec2(0.85, 1.0)));
  col *= mix(0.72, 1.0, vig);
  gl_FragColor = vec4(col, 1.0);
}`

type Rgb = [number, number, number]
const hex = (h: string): Rgb => {
  const n = parseInt(h.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export type CrtPreset = {
  base: string
  emit: string
  emit2: string
  glow: number
  curve: number
  warp: number
  noise: number
}

export const crtPresets = {
  /** Hero: o azul elétrico é a base; o roxo é a luz que passa por ele. */
  hero: { base: '#0a3cf2', emit: '#8a2cff', emit2: '#c755f7', glow: 0.62, curve: 0.04, warp: 1, noise: 0.035 },
  /** Contato: a configuração de partida do CRT (roxo sobre quase-preto). */
  contato: { base: '#120f17', emit: '#c755f7', emit2: '#3d6bff', glow: 0.4, curve: 0.06, warp: 0.8, noise: 0.05 },
} satisfies Record<string, CrtPreset>

/**
 * Fundo CRT em WebGL (OGL). Renderiza em resolução reduzida, só enquanto
 * está na tela, congela o tempo com prefers-reduced-motion e cai para um
 * fundo em CSS se o WebGL não existir ou o contexto se perder.
 */
export function CrtField({ preset, className }: { preset: CrtPreset; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [ok, setOk] = useState(true)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !hasWebGL()) {
      setOk(false)
      return
    }
    let disposed = false
    let cleanup = () => {}
    import('ogl')
      .then(({ Renderer, Program, Mesh, Triangle }) => {
        if (disposed) return
        const reduced = prefersReducedMotion()
        const coarse = isCoarsePointer()
        const dpr = coarse || lowPowerDevice() ? 0.4 : 0.6
        const renderer = new Renderer({ canvas, dpr, alpha: false, antialias: false })
        const gl = renderer.gl
        const program = new Program(gl, {
          vertex,
          fragment,
          uniforms: {
            uTime: { value: 12 },
            uRes: { value: [1, 1] },
            uMouse: { value: [0.5, 0.5] },
            uMouseAmt: { value: 0 },
            uBase: { value: hex(preset.base) },
            uEmit: { value: hex(preset.emit) },
            uEmit2: { value: hex(preset.emit2) },
            uGlow: { value: preset.glow },
            uCurve: { value: preset.curve },
            // No toque, menos ondulação: a tela é menor e o efeito pesa mais.
            uWarp: { value: coarse ? preset.warp * 0.5 : preset.warp },
            uNoise: { value: preset.noise },
          },
        })
        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
        const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, amt: 0, tamt: 0 }
        let visible = false
        let raf = 0
        let last = performance.now()

        const render = () => renderer.render({ scene: mesh })
        const resize = () => {
          const host = canvas.parentElement!
          renderer.setSize(host.clientWidth, host.clientHeight)
          program.uniforms.uRes.value = [host.clientWidth, host.clientHeight]
          if (!raf) render()
        }
        const frame = (now: number) => {
          raf = visible && !reduced ? requestAnimationFrame(frame) : 0
          const dt = Math.min(0.05, (now - last) / 1000)
          last = now
          program.uniforms.uTime.value += dt
          const k = 1 - Math.exp(-dt * 3)
          mouse.x += (mouse.tx - mouse.x) * k
          mouse.y += (mouse.ty - mouse.y) * k
          mouse.amt += (mouse.tamt - mouse.amt) * k
          program.uniforms.uMouse.value = [mouse.x, mouse.y]
          program.uniforms.uMouseAmt.value = mouse.amt
          render()
        }
        const io = new IntersectionObserver(([e]) => {
          visible = e.isIntersecting
          if (visible && !raf && !reduced) {
            last = performance.now()
            raf = requestAnimationFrame(frame)
          }
        })
        io.observe(canvas)

        // Cursor só em ponteiro fino: no toque não há "hover" para seguir.
        const host = canvas.parentElement!
        const onMove = (e: PointerEvent) => {
          const r = canvas.getBoundingClientRect()
          mouse.tx = (e.clientX - r.left) / r.width
          mouse.ty = 1 - (e.clientY - r.top) / r.height
          mouse.tamt = 1
        }
        const onLeave = () => (mouse.tamt = 0)
        if (!coarse) {
          host.addEventListener('pointermove', onMove, { passive: true })
          host.addEventListener('pointerleave', onLeave)
        }
        const ro = new ResizeObserver(resize)
        ro.observe(host)
        const onLost = (e: Event) => {
          e.preventDefault()
          setOk(false)
        }
        canvas.addEventListener('webglcontextlost', onLost)
        resize()
        canvas.classList.add('is-live')

        cleanup = () => {
          cancelAnimationFrame(raf)
          io.disconnect()
          ro.disconnect()
          host.removeEventListener('pointermove', onMove)
          host.removeEventListener('pointerleave', onLeave)
          canvas.removeEventListener('webglcontextlost', onLost)
          gl.getExtension('WEBGL_lose_context')?.loseContext()
        }
      })
      .catch(() => setOk(false))
    return () => {
      disposed = true
      cleanup()
    }
  }, [preset])

  return (
    <div
      className={`crt ${ok ? '' : 'crt--static'} ${className ?? ''}`}
      style={{ ['--crt-base' as string]: preset.base, ['--crt-emit' as string]: preset.emit }}
      aria-hidden="true"
    >
      {ok && <canvas ref={ref} />}
    </div>
  )
}
