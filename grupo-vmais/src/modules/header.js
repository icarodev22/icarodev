/** Cabeçalho: fundo sólido ao rolar, ocultar/mostrar, menu compacto (três traços) e link ativo. */
export function initHeader() {
  const header = document.getElementById('site-header');
  const btn = document.getElementById('menu-btn');
  const panel = document.getElementById('site-menu');
  if (!header) return;

  let open = false;
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-solid', y > 40);
    if (!open && y > 480 && y > lastY + 2) header.classList.add('is-hidden');
    if (y < lastY - 2 || y < 480) header.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();

  // Menu compacto: dropdown no desktop, painel compacto no mobile
  let hideTimer;
  const setOpen = (value, { focusButton = false } = {}) => {
    if (!btn || !panel || value === open) return;
    open = value;
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    clearTimeout(hideTimer);
    if (open) {
      header.classList.remove('is-hidden');
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add('is-open'));
    } else {
      panel.classList.remove('is-open');
      hideTimer = setTimeout(() => { if (!open) panel.hidden = true; }, 260);
      if (focusButton) btn.focus();
    }
  };
  btn?.addEventListener('click', () => setOpen(!open));
  panel?.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', (e) => { if (open && !e.target.closest('.menu')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) setOpen(false, { focusButton: true }); });
  window.addEventListener('resize', () => setOpen(false), { passive: true });

  // Link ativo conforme a seção visível
  const links = [...document.querySelectorAll('.menu-panel a[href^="#"]')];
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      map.get(en.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}
