import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduceMotion } from './motion.js';

/**
 * Três empresas, um só grupo — seletor em tabs acessíveis.
 * Um painel visível por vez. Na troca: o conteúdo atual sai (≈200 ms), o indicador
 * desliza (300 ms), a altura acompanha o novo conteúdo (350 ms) e banner, logo e textos
 * entram com fade e deslocamento mínimo (≈400 ms). Funciona por clique, toque
 * (deslizar no painel) e teclado (setas, Home, End).
 */
export function initEcosystem() {
  const section = document.getElementById('empresas');
  if (!section) return;
  const stage = section.querySelector('.eco__stage');
  const panels = [...section.querySelectorAll('.eco-panel')];
  const tabs = [...section.querySelectorAll('.eco-tab')];
  const tablist = section.querySelector('.eco-tabs');
  const bar = section.querySelector('.eco-tabs__bar');
  const n = panels.length;
  let active = Math.max(0, panels.findIndex((p) => !p.hidden));
  let busy = false;
  let refreshTimer;

  const moveBar = () => {
    const t = tabs[active];
    if (!t || !bar) return;
    bar.style.width = `${t.offsetWidth}px`;
    bar.style.transform = `translateX(${t.offsetLeft}px)`;
  };

  const updateTabs = (focus) => {
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === active));
      t.tabIndex = k === active ? 0 : -1;
    });
    if (focus) tabs[active].focus();
    moveBar();
  };

  const refresh = () => { clearTimeout(refreshTimer); refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120); };

  // Interrompe uma transição em andamento e deixa o painel ativo no estado final
  const finishNow = () => {
    gsap.killTweensOf(stage);
    stage.style.height = '';
    panels.forEach((p, k) => {
      gsap.killTweensOf(p);
      gsap.killTweensOf(p.querySelectorAll('*'));
      gsap.set([p, ...p.querySelectorAll('.eco-banner, .eco-logo, .eco-panel__name, .eco-panel__body > *')], { clearProps: 'opacity,transform' });
      p.hidden = k !== active;
    });
    busy = false;
  };

  const show = (i, { focus = false } = {}) => {
    i = Math.max(0, Math.min(n - 1, i));
    if (busy) finishNow();
    if (i === active) { if (focus) tabs[active].focus(); return; }
    const prev = panels[active];
    const next = panels[i];
    active = i;
    updateTabs(focus);

    if (reduceMotion()) {
      prev.hidden = true;
      next.hidden = false;
      refresh();
      return;
    }
    busy = true;
    const h0 = stage.offsetHeight;
    stage.style.height = `${h0}px`;
    gsap.to(prev, {
      opacity: 0, y: -8, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        prev.hidden = true;
        gsap.set(prev, { clearProps: 'opacity,transform' });
        next.hidden = false;
        stage.style.height = 'auto';
        const h1 = stage.offsetHeight;
        stage.style.height = `${h0}px`;
        gsap.to(stage, { height: h1, duration: 0.35, ease: 'power2.inOut', onComplete: () => { stage.style.height = ''; refresh(); } });
        const banner = next.querySelector('.eco-banner');
        const parts = [next.querySelector('.eco-logo'), ...next.querySelectorAll('.eco-panel__body > *')].filter(Boolean);
        gsap.fromTo(banner, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'opacity,transform' });
        gsap.fromTo(parts, { opacity: 0, y: 8 }, {
          opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.03, delay: 0.08, clearProps: 'opacity,transform',
          onComplete: () => { busy = false; },
        });
      },
    });
  };

  tabs.forEach((t, i) => t.addEventListener('click', () => show(i)));
  tablist.addEventListener('keydown', (e) => {
    const map = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: n - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    show((map[e.key] + n) % n, { focus: true });
  });

  // Toque: deslizar horizontalmente sobre o painel troca de empresa (sem bloquear o scroll vertical)
  let sx = 0; let sy = 0;
  stage.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - sx; const dy = t.clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(active + (dx < 0 ? 1 : -1));
  }, { passive: true });

  // Integração com o contato inteligente: "Falar com a V+ ..." pré-seleciona a área no formulário
  section.querySelectorAll('[data-contact]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('vmais:contact-select', { detail: { id: a.dataset.contact, scroll: true } }));
  }));

  // API usada pelo modo apresentação
  window.__vmaisEco = {
    step(dir) {
      const next = active + dir;
      if (next < 0 || next >= n) return false;
      show(next);
      return true;
    },
  };

  if ('ResizeObserver' in window) {
    new ResizeObserver(() => { if (!busy) stage.style.height = ''; moveBar(); }).observe(stage);
  }
  window.addEventListener('resize', moveBar, { passive: true });
  if (document.fonts?.ready) document.fonts.ready.then(moveBar);
  updateTabs(false);
}
