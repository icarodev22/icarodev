/** Cabeçalho: fundo sólido ao rolar, ocultar/mostrar, menu móvel e link ativo. */
export function initHeader() {
  const header = document.getElementById('site-header');
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const root = document.documentElement;
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-solid', y > 40);
    const open = root.classList.contains('menu-open');
    header.classList.toggle('is-hidden', !open && y > 480 && y > lastY + 2);
    if (y < lastY - 2 || y < 480) header.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();

  // Menu móvel
  const outside = [document.getElementById('conteudo'), document.querySelector('.site-footer')];
  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('.menu-btn__label').textContent = open ? 'Fechar' : 'Menu';
    root.classList.toggle('menu-open', open);
    outside.forEach((el) => el && (el.inert = open));
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
      setTimeout(() => menu.querySelector('a')?.focus({ preventScroll: true }), 300);
    } else {
      menu.classList.remove('is-open');
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 700);
    }
  };
  btn?.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (e) => { if (e.target.closest('a[href^="#"]')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) { setOpen(false); btn.focus(); }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });

  // Link ativo conforme a seção visível
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
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
