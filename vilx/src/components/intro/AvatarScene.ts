import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import avatar from '../../assets/avatar-voxels.json'

/**
 * Abertura: fragmento ampliado do rosto do VILX.
 *
 * O avatar é o mesmo de sempre: cada pixel da arte original vira uma coluna
 * 3D (voxel extrudado) com a cor original e a profundidade de um mapa gerado
 * a partir da própria arte. O que muda é a câmera: ela começa em close —
 * no desktop uma faixa horizontal do cabelo ao bigode, com os óculos
 * encostando nas bordas; no celular uma faixa vertical, com uma lente
 * inteira, nariz e bigode — e recua conforme a rolagem até revelar o rosto
 * inteiro.
 *
 * O fundo não é desenhado aqui: o canvas é transparente e deixa aparecer o
 * fundo compartilhado do site (AmbientBackground).
 */

type Voxel = [x: number, y: number, r: number, g: number, b: number, zFront: number, zBack: number, region: number]

export type AvatarSceneOptions = {
  canvas: HTMLCanvasElement
  reducedMotion: boolean
  lowPower: boolean
  onReady?: () => void
  onContextLost?: () => void
}

const DEPTH = 1.25 // multiplica o mapa de profundidade
const GAP = 1 // sem frestas: no close, frestas deixariam a contraluz vermelha vazar em linhas
const RED = new THREE.Color('#ff2a1f')

// Enquadramentos (coordenadas do avatar: x -27..27, y -32..32)
const CLOSE = { x: -2.5, y: -3, span: 26 } // span = lado curto visível
const FULL = { x: 0, y: 0, span: 84 } // rosto inteiro, com respiro
const FOCUS_Z = 10 // plano de foco: perto da superfície do rosto

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

export class AvatarScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(30, 1, 1, 1000)
  private rig = new THREE.Group()
  private meshes: THREE.InstancedMesh[] = []
  private key!: THREE.DirectionalLight
  private rim!: THREE.PointLight
  private fill!: THREE.PointLight
  private glint!: THREE.PointLight
  private hemi!: THREE.HemisphereLight
  private clock = new THREE.Clock()
  private raf = 0
  private active = true
  private disposed = false
  private readyFired = false

  private pointer = new THREE.Vector2()
  private pointerSmooth = new THREE.Vector2()
  private dragYaw = 0
  private dragVel = 0
  private progress = 0
  private intro = 0 // 0 → 1: entrada (aproximação + luz)
  private tanHalf = Math.tan(THREE.MathUtils.degToRad(15))
  private frameSamples: number[] = []
  private degraded = false

  constructor(private opts: AvatarSceneOptions) {
    const { canvas, lowPower } = opts
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !lowPower,
      alpha: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.5 : 1.75))
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    // sombra própria dos voxels (relevo entre os pixels) só onde sobra fôlego
    this.renderer.shadowMap.enabled = !lowPower
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    canvas.addEventListener('webglcontextlost', this.handleContextLost, false)

    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    this.scene.environmentIntensity = 0.3
    pmrem.dispose()

    this.buildAvatar()
    this.buildLights()
    this.scene.add(this.rig)

    if (opts.reducedMotion) this.intro = 1

    this.resize()
    this.loop()
  }

  // ---------------------------------------------------------------- build

  private buildAvatar() {
    const voxels = avatar.v as unknown as Voxel[]
    const groups: Voxel[][] = [[], [], []]
    for (const v of voxels) groups[v[7]].push(v)

    // 0 pele, 1 cabelo, 2 lentes/armação
    const mats = [
      new THREE.MeshStandardMaterial({ roughness: 0.62, metalness: 0 }),
      new THREE.MeshStandardMaterial({ roughness: 0.48, metalness: 0.05 }),
      new THREE.MeshPhysicalMaterial({ roughness: 0.08, metalness: 0.35, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 2.4 }),
    ]
    const dummy = new THREE.Object3D()
    const color = new THREE.Color()
    const geo = new THREE.BoxGeometry(1, 1, 1)

    groups.forEach((list, region) => {
      const mesh = new THREE.InstancedMesh(geo, mats[region], list.length)
      list.forEach((v, i) => {
        const [x, y, r, g, b, zf, zb] = v
        const front = zf * DEPTH
        const back = zb * DEPTH
        dummy.position.set(x, y, (front + back) / 2)
        dummy.scale.set(GAP, GAP, Math.max(1, front - back))
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        color.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace)
        mesh.setColorAt(i, color)
      })
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
      mesh.castShadow = mesh.receiveShadow = !this.opts.lowPower
      this.meshes.push(mesh)
      this.rig.add(mesh)
    })
  }

  private buildLights() {
    this.hemi = new THREE.HemisphereLight('#3a1210', '#000000', 0.7)

    const key = new THREE.DirectionalLight('#ffeee2', 2.4)
    key.position.set(-40, 55, 110)
    key.castShadow = !this.opts.lowPower
    key.shadow.mapSize.set(2048, 2048)
    const sc = key.shadow.camera
    sc.left = sc.bottom = -40
    sc.right = sc.top = 40
    sc.near = 20
    sc.far = 260
    key.shadow.bias = -0.0006
    key.shadow.normalBias = 0.35
    this.key = key

    // contraluz vermelho recorta as laterais; preenchimento vermelho baixo
    this.rim = new THREE.PointLight(RED, 9, 0, 0)
    this.rim.position.set(70, 15, -20)
    this.fill = new THREE.PointLight('#ff1408', 4, 0, 0)
    this.fill.position.set(-75, -20, 10)
    // brilho que passeia devagar pelas lentes
    this.glint = new THREE.PointLight('#ffffff', 2.2, 0, 0)

    this.scene.add(this.hemi, key, this.rim, this.fill, this.glint)
  }

  // ---------------------------------------------------------------- api

  setPointer(x: number, y: number) {
    this.pointer.set(x, y)
  }

  /** Arrasto no toque: vira levemente a cabeça e ela volta sozinha. */
  nudge(dx: number) {
    this.dragVel += dx * 0.0015
  }

  setProgress(p: number) {
    this.progress = p
  }

  setActive(active: boolean) {
    if (active === this.active) return
    this.active = active
    if (active) {
      this.clock.getDelta()
      this.loop()
    } else {
      cancelAnimationFrame(this.raf)
    }
  }

  resize() {
    const canvas = this.renderer.domElement
    const w = canvas.clientWidth || window.innerWidth
    const h = canvas.clientHeight || window.innerHeight
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.renderer.domElement.removeEventListener('webglcontextlost', this.handleContextLost)
    this.meshes.forEach((m) => {
      m.geometry.dispose()
      ;(m.material as THREE.Material).dispose()
    })
    this.scene.environment?.dispose()
    this.renderer.dispose()
  }

  // ---------------------------------------------------------------- loop

  private handleContextLost = (e: Event) => {
    e.preventDefault()
    cancelAnimationFrame(this.raf)
    this.opts.onContextLost?.()
  }

  private loop = () => {
    if (this.disposed || !this.active) return
    this.raf = requestAnimationFrame(this.loop)
    const dt = Math.min(this.clock.getDelta(), 1 / 20)
    this.update(dt, this.clock.elapsedTime)
    this.renderer.render(this.scene, this.camera)
    if (!this.readyFired) {
      this.readyFired = true
      this.opts.onReady?.()
    }
    this.watchPerformance(dt)
  }

  /** distância da câmera para que `span` unidades caibam no lado curto da tela */
  private distFor(span: number) {
    const a = this.camera.aspect
    // paisagem: span na altura; retrato: span na largura
    const visH = a >= 1 ? span : span / a
    return visH / (2 * this.tanHalf) + FOCUS_Z
  }

  private update(dt: number, t: number) {
    const rm = this.opts.reducedMotion
    const damp = (k: number) => 1 - Math.exp(-dt * k)

    // entrada: a câmera se aproxima devagar enquanto a luz acende
    this.intro = Math.min(1, this.intro + dt / 2.8)
    const e = easeOutCubic(this.intro)

    // no retrato o rosto inteiro precisa caber na largura
    const fullSpan = this.camera.aspect >= 1 ? FULL.span : Math.min(FULL.span, 64)
    const closeDist = this.distFor(CLOSE.span)
    const fullDist = this.distFor(fullSpan)
    // rolagem: do fragmento ao rosto inteiro
    const p = easeInOut(Math.min(1, this.progress / 0.85))
    const dist = THREE.MathUtils.lerp(closeDist * (1.22 - 0.22 * e), fullDist, p)
    const fx = THREE.MathUtils.lerp(CLOSE.x, FULL.x, p)
    const fy = THREE.MathUtils.lerp(CLOSE.y, FULL.y, p)

    this.pointerSmooth.lerp(this.pointer, damp(rm ? 1.5 : 2.4))
    const px = this.pointerSmooth.x
    const py = this.pointerSmooth.y

    // arrasto (toque) com mola de volta
    this.dragYaw += this.dragVel
    this.dragVel *= Math.pow(0.86, dt * 60)
    this.dragYaw += (0 - this.dragYaw) * damp(1.8)
    this.dragYaw = THREE.MathUtils.clamp(this.dragYaw, -0.35, 0.35)

    // movimento ambiente quase imperceptível; um pouco mais solto ao recuar
    const amb = rm ? 0 : 1
    const yaw = amb * (Math.sin(t * 0.21) * 0.05 + p * Math.sin(t * 0.17) * 0.18) + px * (0.1 + p * 0.25) + this.dragYaw
    const pitch = amb * Math.sin(t * 0.29) * 0.025 - py * 0.06
    const r = this.rig.rotation
    r.y += (yaw - r.y) * damp(2)
    r.x += (pitch - r.x) * damp(2)
    this.rig.position.y = amb * Math.sin(t * 0.6) * 0.35 * (0.4 + p)

    // câmera: paralaxe leve em volta do ponto de foco
    const cam = this.camera.position
    cam.x += (fx + px * 1.6 + amb * Math.sin(t * 0.13) * 0.5 - cam.x) * damp(2.2)
    cam.y += (fy - py * 1.2 + amb * Math.sin(t * 0.19) * 0.35 - cam.y) * damp(2.2)
    cam.z = dist
    this.camera.lookAt(fx, fy, 0)

    // luz: acende na entrada e varia devagar
    const light = rm ? 1 : e
    this.key.intensity = 2.4 * light
    this.hemi.intensity = 0.7 * light
    this.rim.intensity = (8.5 + Math.sin(t * 0.9) * 1.1) * (0.35 + 0.65 * light)
    this.fill.intensity = 4 * light
    this.key.position.x = -40 + px * 25
    // o brilho cruza as lentes num arco lento
    this.glint.position.set(Math.sin(t * 0.35) * 40, 18 + Math.cos(t * 0.27) * 10, 45)
    this.glint.intensity = 2.2 * light
  }

  /** Se o aparelho não sustentar a cena completa, corta o que é mais caro. */
  private watchPerformance(dt: number) {
    if (this.degraded || this.intro < 1) return
    this.frameSamples.push(dt)
    if (this.frameSamples.length < 90) return
    const avg = this.frameSamples.reduce((a, b) => a + b, 0) / this.frameSamples.length
    this.frameSamples = []
    if (avg > 1 / 40) {
      this.degraded = true
      this.renderer.setPixelRatio(1)
      this.resize()
      this.key.castShadow = false
      this.renderer.shadowMap.enabled = false
      this.meshes.forEach((m) => {
        m.castShadow = m.receiveShadow = false
        ;(m.material as THREE.Material).needsUpdate = true
      })
    }
  }
}
