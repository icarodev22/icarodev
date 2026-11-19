import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from './split.js';

gsap.registerPlugin(ScrollTrigger);

export const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Entrada do hero — chamada pela abertura (ou imediatamente). */
export function heroEntrance(afterIntro) {
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  if (reduceMotion()) { root.classList.add('hero-ready'); return; }

  const title = hero.querySelector('.hero__title');
  const words = splitWords(title);
  const items = hero.querySelectorAll('[data-hero]');
  const frame = hero.querySelector('.hero__frame');
  const symbol = hero.querySelector('.hero__symbol');

  gsap.set(words, { yPercent: 110 });
  gsap.set(items, { y: 24, opacity: 0 });
  if (frame) gsap.set(frame, { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 });
  gsap.set(symbol, { scale: 0.8, rotation: -6, opacity: 0, transformOrigin: '50% 80%' });
  root.classList.add('hero-ready');

  const tl = gsap.timeline({ delay: afterIntro ? 0.05 : 0.15, defaults: { ease: 'expo.out' } });
  tl.fromTo(hero, { scale: afterIntro ? 1.06 : 1 }, { scale: 1, duration: 1.2, clearProps: 'transform' }, 0)
    .to(items[0], { y: 0, opacity: 1, duration: 0.8 }, 0.1)
    .to(words, { yPercent: 0, duration: 0.85, ease: 'power4.out', stagger: 0.035 }, 0.15)
    .to(symbol, { scale: 1, rotation: 0, opacity: 1, duration: 1.3 }, 0.35)
    .to([...items].slice(1), { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 0.55);
  if (frame) tl.to(frame, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.2, ease: 'expo.inOut' }, 0.2);
}

/** Animações de rolagem do site inteiro. */
export function scrollMotion() {
  const reduce = reduceMotion();
  initProgress();
  initZones();
  initCounters(reduce);
  if (reduce) return;
  const mm = gsap.matchMedia();

  // Títulos — revelação por palavras (máscara + translateY/opacity, ~0,8 s)
  document.querySelectorAll('[data-split]').forEach((el) => {
    if (el.closest('.hero')) return;
    const words = splitWords(el);
    gsap.fromTo(words, { yPercent: 105, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 0.8, ease: 'power4.out', stagger: 0.03,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Textos — cada seção com uma entrada própria (curta e discreta)
  const offsetFor = (el) => {
    if (el.closest('.story__steps')) return { x: -22, y: 0 };
    if (el.closest('.contact__links')) return { x: 22, y: 0 };
    if (el.closest('.stats')) return { x: 0, y: 14 };
    return { x: 0, y: 22 };
  };
  gsap.set('[data-reveal]', { opacity: 0 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%', once: true,
    onEnter: (els) => els.forEach((el, k) => {
      const o = offsetFor(el);
      gsap.fromTo(el, { x: o.x, y: o.y, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: k * 0.07 });
    }),
  });

  // Lista de vídeos — entrada lateral escalonada
  gsap.from('.films__list li', {
    x: -18, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger: '.films__list', start: 'top 88%', once: true },
  });

  mm.add('(min-width: 1024px)', () => {
  // Foto principal do Grupo — Image Mask Reveal (somente nela)
    document.querySelectorAll('[data-mask-photo]').forEach((fig) => {
      const img = fig.querySelector('img');
      const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 85%', once: true } });
      tl.fromTo(fig, { clipPath: 'inset(100% 0% 0% 0% round 12px)' }, { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1.2, ease: 'expo.inOut', clearProps: 'clipPath' })
        .fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.5, ease: 'expo.out' }, 0.1);
    });
  
    // Demais fotografias — entrada cinematográfica progressiva
    gsap.set('[data-reveal-photo]', { opacity: 0 });
    ScrollTrigger.batch('[data-reveal-photo]', {
      start: 'top 92%', once: true,
      onEnter: (els) => gsap.fromTo(els, { y: 48, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12 }),
    });
  });

  // Mobile/tablet: galeria horizontal controlada pela rolagem vertical (pin + scrub)
  mm.add('(max-width: 1023px)', () => {
    const gal = document.querySelector('.ed-gallery');
    const track = gal?.querySelector('.ed-track');
    if (!gal || !track) return undefined;
    gal.classList.add('is-pinned');
    gal.scrollLeft = 0;
    const dist = () => Math.max(0, track.scrollWidth - gal.clientWidth);
    const tween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: gal, start: 'center center', end: () => `+=${dist()}`, pin: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); gsap.set(track, { clearProps: 'transform' }); gal.classList.remove('is-pinned'); };
  });

  mm.add('(min-width: 768px)', () => {
    // Hero — profundidade ao iniciar a rolagem
    const hero = document.querySelector('.hero');
    if (hero) {
      const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
      gsap.fromTo('.hero__copy', { y: 0, opacity: 1 }, { y: -80, opacity: 0.2, ease: 'none', immediateRender: false, scrollTrigger: st });
      if (hero.querySelector('.hero__frame')) gsap.to('.hero__frame', { y: -40, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__symbol', { y: 120, rotation: 6, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__light', { y: 90, ease: 'none', scrollTrigger: st });
    }
  });

  // Desktop com mouse: resposta sutil ao cursor no hero + botões magnéticos
  mm.add('(hover: hover) and (pointer: fine)', () => {
    const hero = document.querySelector('.hero');
    const media = hero?.querySelector('.hero__media');
    const light = hero?.querySelector('.hero__light');
    if (hero && media) {
      const mx = gsap.quickTo(media, 'x', { duration: 1.2, ease: 'power3.out' });
      const my = gsap.quickTo(media, 'y', { duration: 1.2, ease: 'power3.out' });
      const lx = light && gsap.quickTo(light, 'x', { duration: 2, ease: 'power3.out' });
      const onMove = (e) => {
        const r = hero.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        mx(dx * 18); my(dy * 12); if (lx) lx(dx * -30);
      };
      const onLeave = () => { mx(0); my(0); if (lx) lx(0); };
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
    }
    const btns = [...document.querySelectorAll('.btn')];
    const cleanups = btns.map((b) => {
      const qx = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3.out' });
      const qy = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3.out' });
      const move = (e) => { const r = b.getBoundingClientRect(); qx(((e.clientX - r.left) / r.width - 0.5) * 6); qy(((e.clientY - r.top) / r.height - 0.5) * 5); };
      const leave = () => { qx(0); qy(0); };
      b.addEventListener('pointermove', move); b.addEventListener('pointerleave', leave);
      return () => { b.removeEventListener('pointermove', move); b.removeEventListener('pointerleave', leave); };
    });
    return () => cleanups.forEach((c) => c());
  });

  // Contato — símbolo entra
  gsap.from('.contact__symbol', {
    y: 50, rotation: -8, opacity: 0, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.contact', start: 'top 75%', once: true },
  });
}

/** Linha de progresso de 2 px no topo. */
function initProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  let tick = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    tick = false;
  };
  window.addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/** Luminosidade do fundo ambiente conforme a seção. */
function initZones() {
  const zones = [['grupo', 'story'], ['empresas', 'eco'], ['videos', 'films']];
  zones.forEach(([id, zone]) => {
    const el = document.getElementById(id);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el, start: 'top 55%', end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) document.documentElement.dataset.zone = zone;
        else if (document.documentElement.dataset.zone === zone) delete document.documentElement.dataset.zone;
      },
    });
  });
}

/** Indicadores — contagem animada uma única vez. */
function initCounters(reduce) {
  const fmt = (n) => Math.round(n).toLocaleString('pt-BR');
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count) || 0;
    const prefix = el.dataset.prefix || '';
    if (reduce) { el.textContent = prefix + fmt(end); return; }
    const obj = { v: 0 };
    el.textContent = prefix + fmt(0);
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(obj, { v: end, duration: end > 10 ? 1.8 : 1.1, ease: 'power2.out', onUpdate: () => { el.textContent = prefix + fmt(obj.v); } }),
    });
  });
}

export { gsap, ScrollTrigger };
