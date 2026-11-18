import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduceMotion } from './motion.js';

/**
 * Ecossistema V+ — três painéis de marca.
 * Desktop (≥1024px): as abas trocam a empresa em destaque no mesmo lugar (sem fixar a rolagem).
 * Mobile/tablet: trilho horizontal por toque (scroll-snap) sincronizado com as abas.
 */
export function initEcosystem() {
  const section = document.getElementById('empresas');
  if (!section) return;
  const pin = section.querySelector('.eco__pin');
  const head = section.querySelector('.eco__head');
  const track = section.querySelector('.eco__track');
  const panels = [...section.querySelectorAll('.eco-panel')];
  const tabs = [...section.querySelectorAll('.eco-tab')];
  const bar = section.querySelector('.eco-tabs__bar');
  const n = panels.length;
  let active = 0;
  let leaveTimer;

  const moveBar = () => {
    const t = tabs[active];
    if (!t || !bar) return;
    bar.style.width = `${t.offsetWidth}px`;
    bar.style.transform = `translateX(${t.offsetLeft - t.parentElement.scrollLeft}px)`;
  };

  const setActive = (i, { focus = false } = {}) => {
    i = Math.max(0, Math.min(n - 1, i));
    if (i === active && panels[i].classList.contains('is-active')) { moveBar(); return; }
    const prev = active;
    active = i;
    panels.forEach((p, k) => {
      p.classList.toggle('is-active', k === i);
      p.classList.toggle('is-leaving', k === prev && k !== i);
      p.setAttribute('aria-hidden', String(isDesktop() ? k !== i : false));
    });
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => panels.forEach((p) => p.classList.remove('is-leaving')), 950);
    section.dataset.ecoTheme = panels[i].className.match(/eco-panel--(\w+)/)?.[1] || '';
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
    });
    if (focus) tabs[i].focus();
    tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    moveBar();
  };

  const mq = window.matchMedia('(min-width: 1024px)');
  const isDesktop = () => section.classList.contains('is-enhanced');

  const goTo = (i) => {
    if (isDesktop()) {
      setActive(i);
    } else {
      track.scrollTo({ left: i * track.clientWidth, behavior: reduceMotion() ? 'auto' : 'smooth' });
      setActive(i);
    }
  };

  tabs.forEach((t, i) => t.addEventListener('click', () => goTo(i)));
  section.querySelector('.eco-tabs').addEventListener('keydown', (e) => {
    const k = { ArrowRight: 1, ArrowLeft: -1, Home: -99, End: 99 }[e.key];
    if (k === undefined) return;
    e.preventDefault();
    const next = Math.max(0, Math.min(n - 1, k === -99 ? 0 : k === 99 ? n - 1 : active + k));
    goTo(next);
    tabs[next].focus();
  });

  // Mobile: sincroniza abas com o gesto horizontal
  let raf;
  track.addEventListener('scroll', () => {
    if (isDesktop()) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      if (i !== active) setActive(i);
    });
  }, { passive: true });

  const enable = () => {
    section.classList.add('is-enhanced');
    track.scrollLeft = 0;
    setActive(active);
  };
  const disable = () => {
    section.classList.remove('is-enhanced');
    panels.forEach((p) => p.removeAttribute('aria-hidden'));
    track.scrollLeft = active * track.clientWidth;
    moveBar();
  };

  // API usada pelo modo apresentação: avança/volta entre as empresas
  window.__vmaisEco = {
    step(dir) {
      const next = active + dir;
      if (next < 0 || next >= n) return false;
      goTo(next);
      if (isDesktop()) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    },
  };

  const apply = () => { (mq.matches ? enable : disable)(); ScrollTrigger.refresh(); };
  mq.addEventListener('change', () => { disable(); apply(); });
  apply();
  window.addEventListener('resize', moveBar, { passive: true });
  section.querySelector('.eco-tabs').addEventListener('scroll', moveBar, { passive: true });
  if (document.fonts?.ready) document.fonts.ready.then(moveBar);
  moveBar();
}
