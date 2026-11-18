import { gsap } from 'gsap';

/**
 * Abertura cinematográfica V+ (~2,6 s)
 * 1. Escuridão + luz roxa sutil
 * 2. V oficial entra em 3D, aproximando-se da câmera
 * 3. + entra por outro eixo e encaixa (resposta de luz + micro distorção)
 * 4. A câmera atravessa a abertura do V, revelando o site
 * Pulável (botão / Esc), executada uma vez por sessão, ignorada com movimento reduzido.
 */
export function runIntro({ onReveal }) {
  const root = document.documentElement;
  const intro = document.getElementById('intro');
  const skip = document.getElementById('intro-skip');

  const finish = () => {
    root.classList.remove('has-intro');
    root.classList.add('intro-done');
    intro?.remove();
    skip?.remove();
    document.removeEventListener('keydown', onKey);
  };

  if (!root.classList.contains('has-intro') || !intro) {
    finish();
    onReveal(false);
    return;
  }

  try { sessionStorage.setItem('vmais-intro', '1'); } catch (e) { /* armazenamento indisponível */ }

  const mark = intro.querySelector('.intro__mark');
  const v = intro.querySelector('.intro__v');
  const plus = intro.querySelector('.intro__plus');
  const ring = intro.querySelector('.intro__ring');
  const glow = intro.querySelector('.intro__glow');

  let revealed = false;
  const reveal = () => { if (!revealed) { revealed = true; onReveal(true); } };

  gsap.set(mark, { xPercent: -50, yPercent: -50, x: 0, y: 0, transformOrigin: '45.3% 28.9%' });

  const tl = gsap.timeline({ onComplete: finish, defaults: { overwrite: 'auto' } });
  tl.to(glow, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0)
    .fromTo(v,
      { opacity: 0, z: -900, rotationY: -38, rotationX: 16, scale: 0.6, yPercent: 8, transformPerspective: 900, transformOrigin: '45% 60%' },
      { opacity: 1, z: 0, rotationY: 0, rotationX: 0, scale: 1, yPercent: 0, duration: 0.85, ease: 'expo.out' }, 0.18)
    .fromTo(plus,
      { opacity: 0, xPercent: 55, yPercent: -70, rotation: -180, scale: 0.3, transformOrigin: '89.7% 52%' },
      { opacity: 1, xPercent: 0, yPercent: 0, rotation: 0, scale: 1, duration: 0.6, ease: 'power4.out' }, 0.74)
    .addLabel('lock', 1.32)
    .fromTo(ring, { scale: 0, opacity: 0.95 }, { scale: 5, opacity: 0, duration: 0.6, ease: 'power2.out' }, 'lock')
    .to(mark, { keyframes: [{ skewX: -4, scale: 1.045, duration: 0.07, ease: 'power2.out' }, { skewX: 0, scale: 1, duration: 0.32, ease: 'back.out(3)' }] }, 'lock')
    .to(glow, { opacity: 0.55, duration: 0.35 }, 'lock')
    .addLabel('fly', 'lock+=0.4')
    .to(mark, { scale: 36, duration: 0.78, ease: 'power3.in' }, 'fly')
    .to(glow, { opacity: 0, duration: 0.3 }, 'fly')
    .add(reveal, 'fly+=0.32')
    .to(intro, { backgroundColor: 'rgba(11,6,18,0)', duration: 0.34, ease: 'none' }, 'fly+=0.34')
    .to(intro, { opacity: 0, duration: 0.18 }, 'fly+=0.62');

  function onKey(e) { if (e.key === 'Escape') skipIntro(); }
  function skipIntro() { tl.kill(); reveal(); finish(); }

  skip?.addEventListener('click', skipIntro);
  document.addEventListener('keydown', onKey);
}
