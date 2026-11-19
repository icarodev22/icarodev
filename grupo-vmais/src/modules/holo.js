/**
 * HoloCard — fotografias reais do Grupo V+ (somente apresentação).
 * Equivalente leve ao HoloCard do React Bits, em JS + CSS (sem WebGL):
 * inclinação 3D pelo cursor, reflexos "shards", brilho que acompanha a luz,
 * leve ampliação no hover, retorno suave e movimento automático discreto.
 * Parâmetros: intensity .22 · glare .2 · edgeSparkle .15 · tiltMax 8 ·
 * hoverScale 1.025 · radius 12 · idle · shadow. Sem backImage, sem clique,
 * sem teclado, sem virada: apenas eventos de movimento do ponteiro.
 */
export function initHolo() {
  const items = [...document.querySelectorAll('[data-holo]')];
  if (!items.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cfg = fine
    ? { intensity: 0.22, glare: 0.2, tiltMax: 8, hoverScale: 1.025, idle: 0.32 }
    : { intensity: 0.13, glare: 0.12, tiltMax: 3.5, hoverScale: 1, idle: 0.55 }; // mobile: mais suave

  items.forEach((el, i) => {
    const card = el.querySelector('.holo__card');
    if (!card) return;
    el.style.setProperty('--holo-i', String(cfg.intensity));
    el.style.setProperty('--holo-glare', String(cfg.glare));
    // Movimento reduzido ou toque: fotografia estática com reflexo discreto (prioridade à rolagem)
    if (reduce || !fine) return;

    const st = { tx: 0.5, ty: 0.5, x: 0.5, y: 0.5, hover: 0, h: 0, visible: false, raf: 0, seed: i * 1.7 };
    const frame = (t) => {
      if (!st.visible) { st.raf = 0; return; }
      if (!st.hover) {
        const s = t / 1000 * 0.6 + st.seed;
        st.tx = 0.5 + Math.sin(s * 0.7) * 0.5 * cfg.idle;
        st.ty = 0.5 + Math.cos(s * 0.53) * 0.5 * cfg.idle;
      }
      st.x += (st.tx - st.x) * 0.075;
      st.y += (st.ty - st.y) * 0.075;
      st.h += (st.hover - st.h) * 0.09;
      const rx = (0.5 - st.y) * 2 * cfg.tiltMax;
      const ry = (st.x - 0.5) * 2 * cfg.tiltMax;
      const sc = 1 + (cfg.hoverScale - 1) * st.h;
      card.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      el.style.setProperty('--px', `${(st.x * 100).toFixed(1)}%`);
      el.style.setProperty('--py', `${(st.y * 100).toFixed(1)}%`);
      el.style.setProperty('--holo-a', (0.55 + 0.45 * st.h).toFixed(3));
      st.raf = requestAnimationFrame(frame);
    };
    // Renderiza somente enquanto a fotografia estiver visível
    new IntersectionObserver(([en]) => {
      st.visible = en.isIntersecting;
      if (st.visible && !st.raf) st.raf = requestAnimationFrame(frame);
    }, { rootMargin: '80px' }).observe(el);

    if (fine) {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        st.tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        st.ty = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        st.hover = 1;
      });
      el.addEventListener('pointerleave', () => { st.hover = 0; });
    }
  });
}
