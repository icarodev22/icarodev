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
  gsap.set(frame, { clipPath: 'inset(100% 0% 0% 0%)' });
  gsap.set(symbol, { scale: 0.8, rotation: -6, opacity: 0, transformOrigin: '50% 80%' });
  root.classList.add('hero-ready');

  const tl = gsap.timeline({ delay: afterIntro ? 0.05 : 0.15, defaults: { ease: 'expo.out' } });
  tl.fromTo(hero, { scale: afterIntro ? 1.06 : 1 }, { scale: 1, duration: 1.2, clearProps: 'transform' }, 0)
    .to(items[0], { y: 0, opacity: 1, duration: 0.8 }, 0.1)
    .to(words, { yPercent: 0, duration: 1, stagger: 0.04 }, 0.15)
    .to(frame, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, 0.2)
    .to(symbol, { scale: 1, rotation: 0, opacity: 1, duration: 1.3 }, 0.35)
    .to([...items].slice(1), { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 0.55);
}

/** Animações de rolagem do site inteiro. */
export function scrollMotion() {
  if (reduceMotion()) return;
  const mm = gsap.matchMedia();

  // Títulos — revelação por palavras
  document.querySelectorAll('[data-split]').forEach((el) => {
    if (el.closest('.hero')) return;
    const words = splitWords(el);
    gsap.from(words, {
      yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.035,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Textos — entrada progressiva
  gsap.set('[data-reveal]', { opacity: 0 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.fromTo(els, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 }),
  });

  // Fotografias — revelação por máscara (sem distorcer)
  document.querySelectorAll('[data-mask]').forEach((fig) => {
    const img = fig.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 85%', once: true } });
    tl.fromTo(fig, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' })
      .fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0.1);
  });

  // Contador da história
  const counter = document.querySelector('.story__counter-now');
  document.querySelectorAll('.story__step').forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step, start: 'top 55%', end: 'bottom 55%',
      onToggle: (self) => { if (self.isActive && counter) counter.textContent = String(i + 1).padStart(2, '0'); },
    });
  });

  mm.add('(min-width: 768px)', () => {
    // Hero — profundidade ao iniciar a rolagem
    const hero = document.querySelector('.hero');
    if (hero) {
      const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
      gsap.fromTo('.hero__copy', { y: 0, opacity: 1 }, { y: -80, opacity: 0.2, ease: 'none', immediateRender: false, scrollTrigger: st });
      gsap.to('.hero__frame', { y: -40, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__symbol', { y: 120, rotation: 6, ease: 'none', scrollTrigger: st });
    }
    // Parallax discreto nas composições fotográficas
    document.querySelectorAll('.cluster [data-speed]').forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 1;
      gsap.fromTo(el, { y: (speed - 1) * 160 }, {
        y: (1 - speed) * 160, ease: 'none',
        scrollTrigger: { trigger: el.closest('.cluster'), start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
    });
    // Entrada da composição de bastidores
    gsap.utils.toArray('.cluster--backstage .cluster__item').forEach((el, i) => {
      gsap.from(el.querySelector('img'), {
        clipPath: 'inset(0% 0% 100% 0%)', duration: 1.2, ease: 'expo.out', delay: (i % 4) * 0.08,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    });
    // Story: leve parallax na imagem
    document.querySelectorAll('.story__figure img').forEach((img) => {
      gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  // Contato — símbolo entra
  gsap.from('.contact__symbol', {
    y: 60, rotation: -10, opacity: 0, duration: 1.2, ease: 'expo.out',
    scrollTrigger: { trigger: '.contact', start: 'top 75%', once: true },
  });
}

export { gsap, ScrollTrigger };
