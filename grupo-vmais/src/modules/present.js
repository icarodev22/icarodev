import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * Modo apresentação (reuniões comerciais): navegação entre as seções principais
 * pelas setas do teclado. Desativado, o site se comporta normalmente.
 * Ativar: botão "Modo apresentação" no menu ou tecla P. Sair: Esc ou P.
 */
export function initPresentation() {
  const btn = document.getElementById('present-toggle');
  const sections = () => [...document.querySelectorAll('[data-present]')];
  const root = document.documentElement;
  let on = false;
  let busy = false;
  const hint = document.createElement('div');
  hint.className = 'present-hint';
  hint.setAttribute('role', 'status');
  document.body.appendChild(hint);
  let hintTimer;
  const showHint = (txt) => {
    hint.textContent = txt;
    hint.classList.add('is-on');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => hint.classList.remove('is-on'), 2600);
  };

  const headerH = () => document.getElementById('site-header')?.offsetHeight || 0;
  const currentIndex = () => {
    const list = sections();
    const y = window.scrollY + window.innerHeight * 0.35;
    let idx = 0;
    list.forEach((s, i) => { if (s.offsetTop <= y) idx = i; });
    return idx;
  };
  const goTo = (i) => {
    const list = sections();
    const target = list[Math.max(0, Math.min(list.length - 1, i))];
    if (!target) return;
    busy = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = () => (i <= 0 ? 0 : target.getBoundingClientRect().top + window.scrollY - (target.id === 'contato' ? 0 : headerH() * 0.4));
    gsap.to(window, {
      scrollTo: { y: top(), autoKill: false }, duration: reduce ? 0 : 0.9, ease: 'power3.inOut',
      onComplete: () => {
        // Confere a posição final (imagens/fonte podem ter alterado o layout durante a rolagem)
        const y = Math.max(0, top());
        if (Math.abs(window.scrollY - y) > 4) window.scrollTo(0, y);
        busy = false;
      },
    });
  };

  const set = (value) => {
    on = value;
    root.classList.toggle('is-presenting', on);
    btn?.setAttribute('aria-pressed', String(on));
    showHint(on ? 'Modo apresentação · use ← → para navegar · Esc para sair' : 'Modo apresentação desativado');
  };
  btn?.addEventListener('click', () => set(!on));

  document.addEventListener('keydown', (e) => {
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'p' || e.key === 'P') { set(!on); return; }
    if (!on) return;
    if (e.key === 'Escape') { set(false); return; }
    const next = ['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key);
    const prev = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key);
    if (!next && !prev) return;
    e.preventDefault();
    if (busy) return;
    const list = sections();
    const i = currentIndex();
    // Nas empresas, as setas percorrem V+ Produções → Tickets → Sports antes de sair da seção
    if (list[i]?.id === 'empresas' && window.__vmaisEco?.step(next ? 1 : -1)) return;
    goTo(i + (next ? 1 : -1));
  });
}
