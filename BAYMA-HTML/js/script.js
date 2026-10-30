/*
 * BAYMA — script do site (JavaScript puro, sem dependências).
 * Cada bloco abaixo só roda se o elemento correspondente existir na página,
 * então o mesmo arquivo serve para index.html e videos.html.
 */
;(function () {
  'use strict'

  // ---------------------------------------------------------------------------
  // Utilidades
  // ---------------------------------------------------------------------------

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  var coarsePointer = window.matchMedia('(pointer: coarse)').matches

  function clamp(v, a, b) {
    return Math.min(b, Math.max(a, v))
  }

  function lowPowerDevice() {
    var cores = navigator.hardwareConcurrency || 4
    var mem = navigator.deviceMemory || 4
    return cores <= 4 || mem <= 2
  }

  // Ano do rodapé sempre atualizado.
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear())
  })

  // ---------------------------------------------------------------------------
  // Âncoras da página (#historia, #shows, #contato, #top): rolam até a seção sem
  // gravar o "#" no endereço. Assim, recarregar ou reabrir o site começa no
  // topo, e não na última seção clicada. Links vindos de fora com seção
  // (index.html#shows) continuam funcionando normalmente.
  // ---------------------------------------------------------------------------

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    var link = e.target.closest && e.target.closest('a[href^="#"]')
    if (!link) return
    var id = link.getAttribute('href').slice(1)
    var target = id && document.getElementById(id)
    if (!target) return
    e.preventDefault()
    var behavior = reducedMotion ? 'auto' : 'smooth'
    if (id === 'top') window.scrollTo({ top: 0, behavior: behavior })
    else target.scrollIntoView({ behavior: behavior, block: 'start' })
    // Leva o foco para a seção (teclado e leitores de tela), sem pular a rolagem.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    if (location.hash) history.replaceState(null, '', location.pathname + location.search)
  })

  // ---------------------------------------------------------------------------
  // Revelação ao rolar: [data-reveal] ganha .is-in ao entrar na tela.
  // ---------------------------------------------------------------------------

  ;(function reveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'))
    if (!els.length) return
    var show = function (el) {
      el.classList.add('is-in')
    }
    if (!('IntersectionObserver' in window)) {
      els.forEach(show)
      return
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            show(e.target)
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    els.forEach(function (el) {
      io.observe(el)
    })
    // Segurança: nada acima da dobra fica escondido se algo falhar.
    setTimeout(function () {
      els.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el)
      })
    }, 2500)
  })()

  // ---------------------------------------------------------------------------
  // Paralaxe discreta para imagens com [data-speed].
  // ---------------------------------------------------------------------------

  ;(function parallax() {
    if (reducedMotion) return
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-speed]'))
    if (!els.length) return
    var visible = new Set()
    var raf = 0
    var update = function () {
      raf = 0
      var vh = window.innerHeight
      visible.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect()
        var offset = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.speed)
        el.style.transform = 'translate3d(0, ' + offset.toFixed(1) + 'px, 0)'
      })
    }
    var schedule = function () {
      if (!raf) raf = requestAnimationFrame(update)
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) visible.add(e.target)
          else visible.delete(e.target)
        })
        schedule()
      },
      { rootMargin: '20% 0px' },
    )
    els.forEach(function (el) {
      io.observe(el)
    })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  })()

  // ---------------------------------------------------------------------------
  // Progresso de rolagem (--sp de -1 a 1) para [data-scroll-progress].
  // ---------------------------------------------------------------------------

  document.querySelectorAll('[data-scroll-progress]').forEach(function (el) {
    if (reducedMotion) return
    var raf = 0
    var visible = false
    var update = function () {
      raf = 0
      var r = el.getBoundingClientRect()
      var vh = window.innerHeight
      var sp = clamp((vh / 2 - (r.top + r.height / 2)) / ((vh + r.height) / 2), -1, 1)
      el.style.setProperty('--sp', sp.toFixed(4))
    }
    var schedule = function () {
      if (!raf && visible) raf = requestAnimationFrame(update)
    }
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting
      schedule()
    }).observe(el)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  })

  // ---------------------------------------------------------------------------
  // Hero: entrada, cursor (--mx, --my) e rolagem (--p).
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Abertura com a logo (index.html). Toca uma vez por visita; o <head> decide
  // antes da primeira pintura (classe .has-intro). Ao terminar, avisa o Hero
  // com o evento "bayma:intro-out". Clique, toque, rolagem ou tecla pulam.
  // ---------------------------------------------------------------------------

  var INTRO_HOLD = 1600 // ms até a abertura começar a sair (igual ao CSS)
  var introDone = !document.documentElement.classList.contains('has-intro')

  ;(function intro() {
    var el = document.querySelector('[data-intro]')
    if (introDone || !el) {
      introDone = true
      return
    }
    try {
      sessionStorage.setItem('bayma-intro', '1')
    } catch (e) {}

    var out = false
    // Enquanto a abertura está na tela, rolagem não move a página por baixo
    // dela (antes, o gesto que pulava a abertura levava a página para a História).
    // O bloqueio dura até o gesto em curso terminar: um dedo que ainda desliza
    // ou o "embalo" da rolagem do trackpad não podem rolar a página depois.
    var SCROLL_KEYS = [' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End']
    var touching = false
    var lastWheel = 0
    var block = function (e) {
      if (e.type === 'keydown' && SCROLL_KEYS.indexOf(e.key) < 0) return
      if (e.type === 'wheel') lastWheel = Date.now()
      if (e.cancelable) e.preventDefault()
    }
    var onTouch = function (e) {
      touching = e.type === 'touchstart' || (e.touches && e.touches.length > 0)
    }
    ;['wheel', 'touchmove', 'keydown'].forEach(function (t) {
      window.addEventListener(t, block, { passive: false })
    })
    ;['touchstart', 'touchend', 'touchcancel'].forEach(function (t) {
      window.addEventListener(t, onTouch, { passive: true })
    })
    var release = function () {
      if (touching || Date.now() - lastWheel < 250) {
        setTimeout(release, 120)
        return
      }
      ;['wheel', 'touchmove', 'keydown'].forEach(function (t) {
        window.removeEventListener(t, block)
      })
      ;['touchstart', 'touchend', 'touchcancel'].forEach(function (t) {
        window.removeEventListener(t, onTouch)
      })
    }
    // A camada só é escondida, não removida: se o dedo começou o gesto sobre
    // ela, os eventos de toque continuam indo para ela e precisam continuar
    // chegando ao bloqueio acima (um elemento removido não os repassa).
    var finished = false
    var finish = function () {
      if (finished) return
      finished = true
      document.documentElement.classList.remove('has-intro')
      el.hidden = true
      release()
    }
    var leave = function (skip) {
      if (out) return
      out = true
      introDone = true
      if (skip) el.classList.add('is-skipping')
      document.dispatchEvent(new CustomEvent('bayma:intro-out'))
      ;['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (t) {
        window.removeEventListener(t, skipNow)
      })
      // Remove a camada quando a saída termina (com folga, caso a animação não dispare).
      el.addEventListener('animationend', function (e) {
        if (e.target === el) finish()
      })
      setTimeout(finish, skip ? 450 : 700)
    }
    var skipNow = function () {
      leave(true)
    }
    ;['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (t) {
      window.addEventListener(t, skipNow, { passive: true })
    })
    setTimeout(function () {
      leave(false)
    }, INTRO_HOLD)
  })()

  ;(function hero() {
    var el = document.querySelector('[data-hero]')
    if (!el) return

    // Dois quadros garantem que o estado inicial foi pintado antes da entrada.
    // Com a abertura, a entrada do Hero começa quando ela sai.
    var enter = function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.classList.add('is-ready')
        })
      })
    }
    if (introDone) enter()
    else document.addEventListener('bayma:intro-out', enter, { once: true })

    if (reducedMotion) return
    var pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    var progress = -1
    var raf = 0
    var visible = true

    var tick = function () {
      raf = 0
      pointer.x += (pointer.tx - pointer.x) * 0.08
      pointer.y += (pointer.ty - pointer.y) * 0.08
      el.style.setProperty('--mx', pointer.x.toFixed(4))
      el.style.setProperty('--my', pointer.y.toFixed(4))
      var p = clamp(window.scrollY / el.offsetHeight, 0, 1)
      if (p !== progress) {
        progress = p
        el.style.setProperty('--p', p.toFixed(4))
      }
      if (Math.abs(pointer.tx - pointer.x) > 0.001 || Math.abs(pointer.ty - pointer.y) > 0.001) schedule()
    }
    var schedule = function () {
      if (!raf && visible) raf = requestAnimationFrame(tick)
    }

    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting
      schedule()
    }).observe(el)

    if (!coarsePointer) {
      el.addEventListener(
        'pointermove',
        function (e) {
          pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
          pointer.ty = (e.clientY / window.innerHeight) * 2 - 1
          schedule()
        },
        { passive: true },
      )
      el.addEventListener('pointerleave', function () {
        pointer.tx = 0
        pointer.ty = 0
        schedule()
      })
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
  })()

  // ---------------------------------------------------------------------------
  // Fundo CRT do Hero (WebGL). Sem WebGL, fica o fundo em CSS (.crt--static).
  // ---------------------------------------------------------------------------

  var CRT_VERTEX = "\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUv;\nvoid main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }"
  var CRT_FRAGMENT = "\nprecision highp float;\nvarying vec2 vUv;\nuniform float uTime;\nuniform vec2 uRes;\nuniform vec2 uMouse;\nuniform float uMouseAmt;\nuniform vec3 uBase;\nuniform vec3 uEmit;\nuniform vec3 uEmit2;\nuniform float uGlow;\nuniform float uCurve;\nuniform float uWarp;\nuniform float uNoise;\n\nfloat hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }\nfloat noise(vec2 p) {\n  vec2 i = floor(p), f = fract(p);\n  vec2 u = f * f * (3.0 - 2.0 * f);\n  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);\n}\nfloat fbm(vec2 p) {\n  float v = 0.0, a = 0.5;\n  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }\n  return v;\n}\n// Campo de emiss\u00e3o num instante t: duas manchas de luz + f\u00f3sforo granulado.\nfloat field(vec2 p, float t) {\n  vec2 a = vec2(sin(t * 0.21) * 0.9, cos(t * 0.17) * 0.45 + 0.15);\n  vec2 b = vec2(cos(t * 0.13 + 2.0) * 1.0, sin(t * 0.19 + 1.0) * 0.5 - 0.2);\n  float l = exp(-dot(p - a, p - a) * 1.6) + 0.8 * exp(-dot(p - b, p - b) * 2.2);\n  float n = fbm(p * 1.4 + vec2(t * 0.05, -t * 0.03));\n  return l * (0.55 + 0.75 * n);\n}\n\nvoid main() {\n  // Curvatura: o canto da tela \"foge\" um pouco, como num tubo.\n  vec2 c = vUv * 2.0 - 1.0;\n  c *= 1.0 + uCurve * dot(c.yx, c.yx);\n  vec2 uv = c * 0.5 + 0.5;\n\n  // Ondula\u00e7\u00e3o horizontal e uma faixa de varredura que desce devagar.\n  float t = uTime;\n  float roll = fract(t * 0.045);\n  float band = exp(-pow((uv.y - (1.0 - roll)) * 9.0, 2.0));\n  uv.x += (sin(uv.y * 38.0 + t * 1.7) * 0.0016 + band * 0.006) * uWarp;\n\n  float aspect = uRes.x / uRes.y;\n  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.0;\n  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0) * 2.0;\n  float md = exp(-dot(p - m, p - m) * 2.4) * uMouseAmt;\n  p += (p - m) * md * 0.06;\n\n  // Persist\u00eancia: o f\u00f3sforo de instantes anteriores ainda brilha um pouco.\n  float e = field(p, t);\n  e = max(e, field(p, t - 0.6) * 0.62);\n  e = max(e, field(p, t - 1.3) * 0.34);\n  e += md * 0.55;\n\n  vec3 col = uBase;\n  col = mix(col, uEmit, clamp(e * uGlow, 0.0, 1.0));\n  col += uEmit2 * pow(clamp(e * uGlow, 0.0, 1.0), 3.0) * 0.35;\n  col += uEmit * band * 0.05 * uWarp;\n\n  // Ru\u00eddo de sinal e sombra nas bordas do tubo.\n  col += (hash(gl_FragCoord.xy + fract(t * 7.3) * 91.0) - 0.5) * uNoise;\n  float vig = smoothstep(1.25, 0.35, length(c * vec2(0.85, 1.0)));\n  col *= mix(0.72, 1.0, vig);\n  gl_FragColor = vec4(col, 1.0);\n}"
  var CRT_HERO = { base: '#0a3cf2', emit: '#8a2cff', emit2: '#c755f7', glow: 0.62, curve: 0.04, warp: 1, noise: 0.035 }

  function hexToRgb(h) {
    var n = parseInt(h.slice(1), 16)
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
  }

  document.querySelectorAll('[data-crt]').forEach(function (host) {
    var canvas = host.querySelector('canvas')
    var fail = function () {
      host.classList.add('crt--static')
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
    var gl = canvas && (canvas.getContext('webgl', { antialias: false, alpha: false }) || canvas.getContext('experimental-webgl'))
    if (!gl) return fail()

    var compile = function (type, src) {
      var sh = gl.createShader(type)
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh))
      return sh
    }
    var program
    try {
      program = gl.createProgram()
      gl.attachShader(program, compile(gl.VERTEX_SHADER, CRT_VERTEX))
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, CRT_FRAGMENT))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
    } catch (err) {
      return fail()
    }
    gl.useProgram(program)

    // Um triângulo que cobre a tela inteira (posição + uv).
    var buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 0, 3, -1, 2, 0, -1, 3, 0, 2]), gl.STATIC_DRAW)
    var aPos = gl.getAttribLocation(program, 'position')
    var aUv = gl.getAttribLocation(program, 'uv')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0)
    gl.enableVertexAttribArray(aUv)
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8)

    var u = {}
    ;['uTime', 'uRes', 'uMouse', 'uMouseAmt', 'uBase', 'uEmit', 'uEmit2', 'uGlow', 'uCurve', 'uWarp', 'uNoise'].forEach(function (n) {
      u[n] = gl.getUniformLocation(program, n)
    })
    var c = CRT_HERO
    gl.uniform3fv(u.uBase, hexToRgb(c.base))
    gl.uniform3fv(u.uEmit, hexToRgb(c.emit))
    gl.uniform3fv(u.uEmit2, hexToRgb(c.emit2))
    gl.uniform1f(u.uGlow, c.glow)
    gl.uniform1f(u.uCurve, c.curve)
    gl.uniform1f(u.uWarp, coarsePointer ? c.warp * 0.5 : c.warp) // menos ondulação no toque
    gl.uniform1f(u.uNoise, c.noise)

    // Resolução reduzida: é um campo suave, não precisa de mais.
    var dpr = coarsePointer || lowPowerDevice() ? 0.4 : 0.6
    var time = 12
    var mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, amt: 0, tamt: 0 }
    var visible = false
    var raf = 0
    var last = performance.now()

    var render = function () {
      gl.uniform1f(u.uTime, time)
      gl.uniform2f(u.uMouse, mouse.x, mouse.y)
      gl.uniform1f(u.uMouseAmt, mouse.amt)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    var resize = function () {
      var w = host.clientWidth
      var h = host.clientHeight
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(u.uRes, w, h)
      if (!raf) render()
    }
    var frame = function (now) {
      raf = visible && !reducedMotion ? requestAnimationFrame(frame) : 0
      var dt = Math.min(0.05, (now - last) / 1000)
      last = now
      time += dt
      var k = 1 - Math.exp(-dt * 3)
      mouse.x += (mouse.tx - mouse.x) * k
      mouse.y += (mouse.ty - mouse.y) * k
      mouse.amt += (mouse.tamt - mouse.amt) * k
      render()
    }

    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting
      if (visible && !raf && !reducedMotion) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }).observe(canvas)

    if (!coarsePointer) {
      var area = host.parentElement
      area.addEventListener(
        'pointermove',
        function (e) {
          var r = canvas.getBoundingClientRect()
          mouse.tx = (e.clientX - r.left) / r.width
          mouse.ty = 1 - (e.clientY - r.top) / r.height
          mouse.tamt = 1
        },
        { passive: true },
      )
      area.addEventListener('pointerleave', function () {
        mouse.tamt = 0
      })
    }
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host)
    else window.addEventListener('resize', resize)
    canvas.addEventListener('webglcontextlost', function (e) {
      e.preventDefault()
      cancelAnimationFrame(raf)
      fail()
    })
    resize()
    canvas.classList.add('is-live')
  })

  // ---------------------------------------------------------------------------
  // Navegação: cápsula com a aba ativa marcada por um destaque que desliza.
  // A logo entra na cápsula depois do Hero.
  // ---------------------------------------------------------------------------

  ;(function nav() {
    var header = document.querySelector('[data-nav]')
    if (!header) return
    var mark = header.querySelector('.nav__mark')
    var tabsBox = header.querySelector('.nav__tabs')
    var indicator = header.querySelector('.nav__indicator')
    var tabs = Array.prototype.slice.call(header.querySelectorAll('.nav__tab'))
    var ids = tabs.map(function (a) {
      return a.getAttribute('href').slice(1)
    })
    var active = null

    var place = function () {
      var tab = active && header.querySelector('.nav__tab[href="#' + active + '"]')
      tabsBox.classList.toggle('has-active', !!tab)
      if (!tab) return
      indicator.style.setProperty('--ind-x', tab.offsetLeft + 'px')
      indicator.style.setProperty('--ind-w', tab.offsetWidth + 'px')
    }
    var setActive = function (id) {
      if (id === active) return
      active = id
      tabs.forEach(function (a) {
        if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'location')
        else a.removeAttribute('aria-current')
      })
      place()
    }

    var onScroll = function () {
      var solid = window.scrollY > window.innerHeight * 0.82
      header.classList.toggle('nav--solid', solid)
      mark.tabIndex = solid ? 0 : -1
      // Acima da primeira seção nenhuma aba fica ativa.
      var first = document.getElementById(ids[0])
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', place)
    // A largura das abas depende da fonte: reposiciona quando ela carregar.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place)

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach(function (id) {
      var el = document.getElementById(id)
      if (el) io.observe(el)
    })
  })()

  // ---------------------------------------------------------------------------
  // Carrossel de Shows: perspectiva 3D, fundo na cor da foto ativa.
  // Botões, setas do teclado, arrastar e clique nas fotos vizinhas.
  // ---------------------------------------------------------------------------

  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var stage = root.querySelector('.gcar__stage')
    var track = root.querySelector('.gcar__track')
    var slides = Array.prototype.slice.call(root.querySelectorAll('.gcar__slide'))
    var current = root.querySelector('[data-current]')
    var total = root.querySelector('[data-total]')
    var n = slides.length
    var index = 0
    var suppressClick = false
    var pad = function (v) {
      return String(v).padStart(2, '0')
    }
    total.textContent = pad(n)

    var render = function () {
      slides.forEach(function (li, i) {
        // Posição relativa circular em torno da foto ativa.
        var o = i - index
        if (o > n / 2) o -= n
        if (o < -n / 2) o += n
        li.style.setProperty('--o', o)
        li.style.setProperty('--a', Math.abs(o))
        li.classList.toggle('is-active', o === 0)
        li.setAttribute('aria-hidden', o === 0 ? 'false' : 'true')
        li.setAttribute('aria-roledescription', 'slide')
        li.setAttribute('aria-label', i + 1 + ' de ' + n)
        // Fotos próximas carregam já; as distantes esperam.
        if (Math.abs(o) <= 1) li.querySelector('img').loading = 'eager'
      })
      var tint = slides[index].dataset.tint.split(' ')
      root.style.setProperty('--c1', tint[0])
      root.style.setProperty('--c2', tint[1])
      current.textContent = pad(index + 1)
    }
    var go = function (to) {
      index = ((to % n) + n) % n
      render()
    }

    root.querySelector('[data-prev]').addEventListener('click', function () {
      go(index - 1)
    })
    root.querySelector('[data-next]').addEventListener('click', function () {
      go(index + 1)
    })
    slides.forEach(function (li, i) {
      li.addEventListener('click', function () {
        if (!li.classList.contains('is-active') && !suppressClick) go(i)
      })
    })
    stage.addEventListener('keydown', function (e) {
      var keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: n - 1 }
      if (e.key in keys) {
        e.preventDefault()
        go(keys[e.key])
      }
    })

    // Arrastar: o trilho acompanha o dedo e decide no fim do gesto.
    var drag = null
    var setDrag = function (v) {
      track.style.setProperty('--drag', v)
      root.classList.toggle('is-dragging', v !== 0)
    }
    stage.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return
      drag = { x: e.clientX, id: e.pointerId, moved: false }
    })
    stage.addEventListener('pointermove', function (e) {
      if (!drag || drag.id !== e.pointerId) return
      var dx = e.clientX - drag.x
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true
        stage.setPointerCapture(e.pointerId)
      }
      if (drag.moved) setDrag(dx / (stage.clientWidth || 1))
    })
    var end = function (e) {
      if (!drag || drag.id !== e.pointerId) return
      var dx = (e.clientX - drag.x) / (stage.clientWidth || 1)
      var moved = drag.moved
      drag = null
      setDrag(0)
      if (moved) {
        // O click disparado ao soltar não deve trocar a foto.
        suppressClick = true
        setTimeout(function () {
          suppressClick = false
        }, 0)
        if (Math.abs(dx) > 0.08) go(index + (dx < 0 ? 1 : -1))
      }
    }
    stage.addEventListener('pointerup', end)
    stage.addEventListener('pointercancel', end)

    render()
  })

  // ---------------------------------------------------------------------------
  // Página de vídeos: monta os players a partir de window.BAYMA_VIDEOS.
  //
  // Arquivos próprios (assets/videos/):
  // - Os vídeos tocam como foram enviados, sem conversão, no player do navegador
  //   (play, pausa, volume, tela cheia).
  // - Só os metadados são lidos ao abrir a página (preload="metadata"); o vídeo
  //   em si só é baixado quando o visitante dá play.
  // - A proporção vem do próprio arquivo: verticais continuam verticais.
  // - Cada item aceita mais de um nome de arquivo ("arquivos"); vale o primeiro
  //   que existir. Se nenhum existir, o item não aparece (nada de player vazio).
  // ---------------------------------------------------------------------------

  ;(function videos() {
    var list = document.querySelector('[data-video-list]')
    if (!list) return
    var empty = document.querySelector('[data-video-empty]')
    var items = (window.BAYMA_VIDEOS || []).filter(function (v) {
      return v && (v.src || v.id || (v.arquivos && v.arquivos.length))
    })
    if (!items.length) return

    var shown = 0
    var reveal = function (li) {
      li.hidden = false
      shown += 1
      list.hidden = false
      empty.hidden = true
    }

    // Caminho de cada nome possível, nas duas formas de acento (NFC/NFD), porque
    // macOS e Windows podem gravar "ô" de jeitos diferentes no nome do arquivo.
    var candidates = function (v) {
      var names = v.src ? [v.src] : v.arquivos.map(function (n) {
        return 'assets/videos/' + n
      })
      var out = []
      names.forEach(function (n) {
        ;[n.normalize('NFC'), n.normalize('NFD')].forEach(function (form) {
          var url = form
            .split('/')
            .map(function (part) {
              return encodeURIComponent(part)
            })
            .join('/')
          if (out.indexOf(url) < 0) out.push(url)
        })
      })
      return out
    }

    var players = []
    var missing = []

    items.forEach(function (v) {
      var li = document.createElement('li')
      var title = v.titulo || 'Vídeo de show do BAYMA'
      var player

      if (v.tipo === 'youtube') {
        var ratio = (v.largura || 16) + ' / ' + (v.altura || 9)
        if ((v.altura || 9) > (v.largura || 16)) li.className = 'is-vertical'
        // Pôster leve até o clique; depois o player oficial, sem cookies.
        player = document.createElement('button')
        player.type = 'button'
        player.className = 'vplayer vplayer--poster'
        player.style.aspectRatio = ratio
        var thumb = document.createElement('img')
        thumb.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(v.id) + '/hqdefault.jpg'
        thumb.alt = ''
        thumb.loading = 'lazy'
        var play = document.createElement('span')
        play.className = 'vplayer__play'
        play.innerHTML = '<svg aria-hidden="true"><use href="#i-play"/></svg><span class="sr-only"></span>'
        play.querySelector('.sr-only').textContent = 'Assistir: ' + title
        player.appendChild(thumb)
        player.appendChild(play)
        player.addEventListener('click', function () {
          var frame = document.createElement('iframe')
          frame.className = 'vplayer'
          frame.style.aspectRatio = ratio
          frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) + '?autoplay=1&rel=0&playsinline=1'
          frame.title = title
          frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'
          frame.allowFullscreen = true
          player.replaceWith(frame)
        })
        li.hidden = true
        reveal(li)
      } else {
        var urls = candidates(v)
        var attempt = 0
        player = document.createElement('video')
        player.className = 'vplayer'
        player.controls = true
        player.playsInline = true
        player.preload = 'metadata'
        player.setAttribute('aria-label', title)
        if (v.poster) player.poster = v.poster
        li.hidden = true

        player.addEventListener('loadedmetadata', function () {
          var w = player.videoWidth
          var h = player.videoHeight
          if (w && h) {
            player.style.aspectRatio = w + ' / ' + h
            li.classList.toggle('is-vertical', h > w)
          }
          if (li.hidden) reveal(li)
        })
        // Arquivo não encontrado ou ilegível: tenta o próximo nome; sem nenhum, some.
        player.addEventListener('error', function () {
          if (!li.hidden) return
          attempt += 1
          if (attempt < urls.length) {
            player.src = urls[attempt] + '#t=0.1'
          } else {
            missing.push((v.arquivos || [v.src]).join(' ou '))
            li.remove()
            if (window.console) console.info('BAYMA vídeos: arquivo não encontrado em assets/videos/: ' + missing.join('; '))
          }
        })
        // Um vídeo por vez: dar play em um pausa os outros.
        player.addEventListener('play', function () {
          players.forEach(function (other) {
            if (other !== player && !other.paused) other.pause()
          })
        })
        players.push(player)
        // "#t=0.1" faz o navegador mostrar um quadro do vídeo como prévia.
        player.src = urls[0] + '#t=0.1'
      }

      li.appendChild(player)
      if (v.titulo) {
        var name = document.createElement('p')
        name.className = 'videos__name'
        name.textContent = v.titulo
        li.appendChild(name)
      }
      list.appendChild(li)
    })
  })()
  // ---------------------------------------------------------------------------
  // Seleção própria ([data-select]): botão + lista, com o visual do site.
  // Teclado: setas, Home/End, Enter/Espaço, Esc, Tab e a inicial da opção.
  // O valor vai para o campo oculto da seleção, que dispara "change".
  // ---------------------------------------------------------------------------

  document.querySelectorAll('[data-select]').forEach(function (root) {
    var button = root.querySelector('.select__button')
    var valueEl = root.querySelector('.select__value')
    var list = root.querySelector('.select__list')
    var input = root.querySelector('input[type="hidden"]')
    var options = Array.prototype.slice.call(list.querySelectorAll('[role="option"]'))
    var placeholder = valueEl.textContent
    var active = -1

    var setActive = function (i) {
      active = Math.max(0, Math.min(options.length - 1, i))
      options.forEach(function (o, k) {
        o.classList.toggle('is-active', k === active)
      })
      list.setAttribute('aria-activedescendant', options[active].id)
      options[active].scrollIntoView({ block: 'nearest' })
    }
    var isOpen = function () {
      return !list.hidden
    }
    var open = function () {
      if (isOpen()) return
      list.hidden = false
      button.setAttribute('aria-expanded', 'true')
      var current = options.findIndex(function (o) {
        return o.getAttribute('aria-selected') === 'true'
      })
      setActive(current >= 0 ? current : 0)
      list.focus({ preventScroll: true })
    }
    var close = function (focusButton) {
      if (!isOpen()) return
      list.hidden = true
      button.setAttribute('aria-expanded', 'false')
      list.removeAttribute('aria-activedescendant')
      if (focusButton) button.focus({ preventScroll: true })
    }
    var choose = function (i) {
      var o = options[i]
      options.forEach(function (x) {
        x.setAttribute('aria-selected', x === o ? 'true' : 'false')
      })
      valueEl.textContent = o.textContent
      valueEl.classList.remove('is-placeholder')
      var changed = input.value !== o.dataset.value
      input.value = o.dataset.value
      close(true)
      if (changed) input.dispatchEvent(new Event('change', { bubbles: true }))
    }
    // Permite limpar a seleção (usado se o formulário for reiniciado).
    root.reset = function () {
      options.forEach(function (x) {
        x.setAttribute('aria-selected', 'false')
      })
      valueEl.textContent = placeholder
      valueEl.classList.add('is-placeholder')
      input.value = ''
    }

    button.addEventListener('click', function () {
      if (isOpen()) close(true)
      else open()
    })
    button.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        open()
      }
    })
    options.forEach(function (o, i) {
      o.addEventListener('mousemove', function () {
        if (active !== i) setActive(i)
      })
      o.addEventListener('click', function () {
        choose(i)
      })
    })
    list.addEventListener('keydown', function (e) {
      var k = e.key
      if (k === 'ArrowDown') setActive(active + 1)
      else if (k === 'ArrowUp') setActive(active - 1)
      else if (k === 'Home') setActive(0)
      else if (k === 'End') setActive(options.length - 1)
      else if (k === 'Enter' || k === ' ') choose(active)
      else if (k === 'Escape') close(true)
      else if (k === 'Tab') {
        close(false)
        return
      } else if (k.length === 1) {
        // Pula para a próxima opção que começa com a letra digitada.
        var letter = k.toLowerCase()
        for (var n = 1; n <= options.length; n++) {
          var idx = (active + n) % options.length
          if (options[idx].textContent.trim().toLowerCase().indexOf(letter) === 0) {
            setActive(idx)
            break
          }
        }
      } else return
      e.preventDefault()
    })
    // Fecha ao clicar/tocar fora.
    document.addEventListener('pointerdown', function (e) {
      if (isOpen() && !root.contains(e.target)) close(false)
    })
  })

  // ---------------------------------------------------------------------------
  // Contratação: formulário → mensagem organizada no WhatsApp oficial.
  // Mesma lógica de bayma/src/lib/booking.ts (versão React).
  // A mensagem só é enviada quando o visitante confirma no próprio WhatsApp.
  // ---------------------------------------------------------------------------

  var WHATSAPP_NUMBER = '5581989575353'
  var LIMITS = { tipo: 80, local: 160, info: 1200 }

  // Campos de uma linha: qualquer quebra vira espaço, para não desmontar a mensagem.
  function oneLine(s, max) {
    return String(s || '').replace(/\s+/g, ' ').trim().slice(0, max)
  }

  // Texto livre: mantém as quebras do visitante, mas sem linhas em branco,
  // que se confundiriam com o separador entre os campos da mensagem.
  function multiLine(s, max) {
    return String(s || '')
      .replace(/\r\n?/g, '\n')
      .split('\n')
      .map(function (l) {
        return l.replace(/[ \t]+/g, ' ').trim()
      })
      .join('\n')
      .replace(/\n{2,}/g, '\n')
      .trim()
      .slice(0, max)
  }

  function validateBooking(d) {
    var errors = {}
    if (!d.tipo) errors.tipo = 'Escolha o tipo do evento.'
    else if (d.tipo === 'Outro' && !oneLine(d.tipoOutro, LIMITS.tipo)) errors.tipoOutro = 'Escreva qual é o tipo do evento.'
    if (!oneLine(d.local, LIMITS.local)) errors.local = 'Informe o local do evento.'
    return errors
  }

  // Ordem obrigatória: LOCAL, TIPO DO EVENTO, MAIS INFORMAÇÕES.
  function buildBookingMessage(d) {
    var tipo = d.tipo === 'Outro' ? oneLine(d.tipoOutro, LIMITS.tipo) : oneLine(d.tipo, LIMITS.tipo)
    var info = multiLine(d.info, LIMITS.info) || 'Não informado.'
    return [
      'Olá, BAYMA! Gostaria de solicitar uma contratação.',
      '',
      'LOCAL:',
      oneLine(d.local, LIMITS.local),
      '',
      'TIPO DO EVENTO:',
      tipo,
      '',
      'MAIS INFORMAÇÕES:',
      info,
    ].join('\n')
  }

  function bookingUrl(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message)
  }

  // Exposto só para testes e manutenção (não envia nada).
  window.BAYMA_BOOKING = { validate: validateBooking, message: buildBookingMessage, url: bookingUrl }

  document.querySelectorAll('[data-booking]').forEach(function (form) {
    var tipo = form.elements.tipo // campo oculto da seleção própria
    var tipoButton = form.querySelector('#f-tipo') // o que o visitante vê e foca
    var outroField = form.querySelector('[data-outro]')
    var outro = form.elements.tipoOutro
    var status = form.querySelector('[data-booking-status]')
    var fields = { tipo: tipoButton, tipoOutro: outro, local: form.elements.local }

    var showError = function (key, msg) {
      var el = fields[key]
      var box = document.getElementById('err-' + key)
      if (msg) {
        el.setAttribute('aria-invalid', 'true')
        box.textContent = msg
        box.hidden = false
      } else {
        el.removeAttribute('aria-invalid')
        box.textContent = ''
        box.hidden = true
      }
    }

    // "Outro": mostra o campo para escrever o tipo de evento.
    tipo.addEventListener('change', function () {
      var isOutro = tipo.value === 'Outro'
      outroField.hidden = !isOutro
      outro.required = isOutro
      showError('tipo', '')
      if (!isOutro) showError('tipoOutro', '')
    })
    ;['tipoOutro', 'local'].forEach(function (key) {
      fields[key].addEventListener('input', function () {
        showError(key, '')
        status.textContent = ''
      })
    })

    form.addEventListener('submit', function (e) {
      e.preventDefault()
      var data = { tipo: tipo.value, tipoOutro: outro.value, local: form.elements.local.value, info: form.elements.info.value }
      var errors = validateBooking(data)
      var first = null
      // Ordem dos campos na tela: o foco vai para o primeiro com erro.
      ;['local', 'tipo', 'tipoOutro'].forEach(function (key) {
        showError(key, errors[key])
        if (errors[key] && !first) first = fields[key]
      })
      if (first) {
        status.textContent = ''
        first.focus()
        return
      }
      var url = bookingUrl(buildBookingMessage(data))
      // Nova aba no computador; no celular o link abre o aplicativo.
      var win = window.open(url, '_blank')
      if (win) win.opener = null
      else window.location.href = url
      status.textContent = 'A mensagem abriu no WhatsApp. Ela só é enviada quando você confirmar lá.'
    })
  })
})()
