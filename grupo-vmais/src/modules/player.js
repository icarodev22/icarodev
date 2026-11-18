/**
 * Player audiovisual: reprodução sempre acionada pelo usuário (com som),
 * controles próprios, pausa fora da área visível, um vídeo por vez,
 * tratamento de falhas e vídeos decorativos (hero) sem áudio.
 */
const fmt = (s) => {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

export function initPlayer() {
  const root = document.getElementById('player');
  const video = document.getElementById('player-video');
  if (!root || !video) return;
  let list = [];
  try { list = JSON.parse(document.getElementById('videos-data').textContent); } catch (e) { list = []; }

  const big = root.querySelector('.player__big');
  const toggle = root.querySelector('[data-act="toggle"]');
  const mute = root.querySelector('[data-act="mute"]');
  const fs = root.querySelector('[data-act="fs"]');
  const range = root.querySelector('input[type="range"]');
  const fill = root.querySelector('.player__fill');
  const time = root.querySelector('.player__time');
  const err = root.querySelector('.player__error');
  const desc = document.getElementById('film-desc');
  const items = [...document.querySelectorAll('.film-item')];
  let current = 0;

  const setState = (playing) => {
    root.dataset.state = playing ? 'playing' : 'paused';
    toggle.setAttribute('aria-label', playing ? 'Pausar' : 'Reproduzir');
    toggle.querySelector('.ico').className = `ico ${playing ? 'ico--pause' : 'ico--play'}`;
  };
  const play = () => {
    err.hidden = true;
    const p = video.play();
    if (p && p.catch) p.catch(() => setState(false));
  };
  const pause = () => video.pause();

  big.addEventListener('click', play);
  toggle.addEventListener('click', () => (video.paused ? play() : pause()));
  video.addEventListener('click', () => (video.paused ? play() : pause()));
  video.addEventListener('play', () => { setState(true); document.dispatchEvent(new CustomEvent('vmais:video-play', { detail: video })); });
  video.addEventListener('pause', () => setState(false));
  video.addEventListener('ended', () => setState(false));
  video.addEventListener('error', () => { err.hidden = false; setState(false); });

  mute.addEventListener('click', () => {
    video.muted = !video.muted;
    mute.setAttribute('aria-pressed', String(video.muted));
    mute.setAttribute('aria-label', video.muted ? 'Ativar som' : 'Desativar som');
  });

  fs.addEventListener('click', () => {
    const el = root.querySelector('.player__screen');
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  });

  const sync = () => {
    const d = video.duration || 0;
    const r = d ? video.currentTime / d : 0;
    fill.style.width = `${r * 100}%`;
    range.value = String(Math.round(r * 1000));
    range.setAttribute('aria-valuetext', `${fmt(video.currentTime)} de ${fmt(d)}`);
    time.textContent = fmt(video.currentTime);
  };
  video.addEventListener('timeupdate', sync);
  video.addEventListener('loadedmetadata', sync);
  range.addEventListener('input', () => {
    if (video.duration) video.currentTime = (Number(range.value) / 1000) * video.duration;
    sync();
  });

  const load = (i, autoplay) => {
    const v = list[i];
    if (!v) return;
    current = i;
    pause();
    video.poster = v.poster;
    video.src = v.src;
    video.width = v.w; video.height = v.h;
    video.load();
    big.setAttribute('aria-label', `Reproduzir vídeo: ${v.titulo}`);
    if (desc) desc.textContent = v.descricao;
    items.forEach((b, k) => { b.classList.toggle('is-active', k === i); b.setAttribute('aria-pressed', String(k === i)); });
    sync();
    if (autoplay) play();
  };
  items.forEach((b, i) => b.addEventListener('click', () => (i === current ? (video.paused ? play() : pause()) : load(i, true))));

  document.addEventListener('vmais:hero-sound', pause);

  // Pausar quando sair da área visível
  new IntersectionObserver(([en]) => { if (!en.isIntersecting && !video.paused) pause(); }, { threshold: 0.2 }).observe(root);
}

/** Vídeo decorativo do hero: mudo, em loop, pausado fora da tela. */
export function initHeroVideo() {
  const v = document.querySelector('.hero__video');
  if (!v) return;
  v.muted = true;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  // Som: o vídeo começa mudo (decorativo); o visitante ativa o áudio.
  const btn = document.querySelector('[data-sound]');
  const label = btn?.querySelector('.sound-toggle__txt');
  const setSound = (on) => {
    v.muted = !on;
    btn?.setAttribute('aria-pressed', String(on));
    btn?.setAttribute('aria-label', on ? 'Desativar som do vídeo' : 'Ativar som do vídeo');
    if (label) label.textContent = on ? 'Som ativado' : 'Ativar som';
    if (on) {
      v.volume = 1;
      tryPlay();
      document.dispatchEvent(new CustomEvent('vmais:hero-sound'));
    }
  };
  btn?.addEventListener('click', () => setSound(v.muted));
  document.addEventListener('vmais:video-play', () => setSound(false));
  if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
  new IntersectionObserver(([en]) => (en.isIntersecting ? tryPlay() : v.pause()), { threshold: 0.05 }).observe(v);
  v.addEventListener('error', () => v.closest('.hero__frame')?.classList.add('is-fallback'));
  document.addEventListener('vmais:video-play', (e) => { if (e.detail !== v) v.pause(); });
}
