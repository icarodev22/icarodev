import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduceMotion } from './motion.js';

/**
 * Ecossistema V+ — três painéis de marca.
 * Desktop (≥1024px): seção fixada; a rolagem (ou as abas) troca a empresa em destaque.
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
  let st = null;
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
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
    });
    if (focus) tabs[i].focus();
    tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    moveBar();
  };

  const mq = window.matchMedia('(min-width: 1200px) and (min-height: 680px)');
  const isDesktop = () => section.classList.contains('is-enhanced');

  const goTo = (i) => {
    if (isDesktop() && st) {
      const y = st.start + (st.end - st.start) * (i / (n - 1));
      window.scrollTo({ top: Math.round(y) + 1, behavior: reduceMotion() ? 'auto' : 'smooth' });
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
    const headH = head.offsetHeight + (parseFloat(getComputedStyle(pin).paddingTop) || 0);
    section.style.setProperty('--eco-head', `${headH}px`);
    track.scrollLeft = 0;
    st = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: () => `+=${window.innerHeight * 0.85 * (n - 1)}`,
      pin: true,
      anticipatePin: 1,
      snap: reduceMotion() ? false : { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: 'power2.inOut' },
      onUpdate: (self) => {
        const i = Math.round(self.progress * (n - 1));
        if (i !== active) setActive(i);
      },
    });
    setActive(active);
  };
  const disable = () => {
    section.classList.remove('is-enhanced');
    st?.kill(true);
    st = null;
    panels.forEach((p) => p.removeAttribute('aria-hidden'));
    track.scrollLeft = active * track.clientWidth;
    moveBar();
  };

  const apply = () => { (mq.matches ? enable : disable)(); ScrollTrigger.refresh(); };
  mq.addEventListener('change', () => { disable(); apply(); });
  apply();
  window.addEventListener('resize', moveBar, { passive: true });
  section.querySelector('.eco-tabs').addEventListener('scroll', moveBar, { passive: true });
  if (document.fonts?.ready) document.fonts.ready.then(moveBar);
  moveBar();
}
