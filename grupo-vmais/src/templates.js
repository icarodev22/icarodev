/**
 * Templates das seções — renderizados em tempo de build (vite.config.js),
 * gerando HTML estático (SEO, acessível e funcional mesmo sem JavaScript).
 * O JavaScript do cliente apenas adiciona movimento e interações.
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  links, grupo, historia, galeriaGrupo, indicadores, contato, secaoVideos, whatsappPorEmpresa, empresas, producoes, momentos, depoimentos,
  videos, heroArte,
} from './data/content.js';
import { VIEWBOX, V_PATH, PLUS_PATH } from './brand/vplus-paths.js';

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const ext = (url, label, cls = '') =>
  `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}<span class="sr-only"> (abre em nova aba)</span></a>`;

/** Fotografias: somente apresentação — nunca clicáveis. */
const photo = ({ src, alt, w = 406, h = 720 }, { eager = false, sizes = '' } = {}) =>
  `<img class="photo" src="${esc(src)}" alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" draggable="false"${sizes ? ` sizes="${sizes}"` : ''}>`;

/** Sprite único do símbolo oficial (V e + separados) — referenciado via <use>. */
export const sprite = () =>
  `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><path id="vp-v" d="${V_PATH}"/><path id="vp-plus" d="${PLUS_PATH}"/></defs></svg>`;

/** Arte de campanha: proporção integral (contain), não clicável. */
const art = ({ src, srcLg, alt, w, h }) =>
  `<img class="photo photo--art" src="${esc(src)}" srcset="${esc(src)} 640w, ${esc(srcLg)} 1086w" sizes="(min-width: 1200px) 16vw, (min-width: 768px) 24vw, 45vw" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async" draggable="false">`;

export const symbol = (cls = '', label = 'Grupo V+') =>
  `<svg class="vplus ${cls}" viewBox="${VIEWBOX}" role="img" aria-label="${esc(label)}"><use href="#vp-v"/><use class="vplus__plus" href="#vp-plus"/></svg>`;

const symbolDeco = (cls = '') =>
  `<svg class="vplus ${cls}" viewBox="${VIEWBOX}" aria-hidden="true" focusable="false"><use href="#vp-v"/><use class="vplus__plus" href="#vp-plus"/></svg>`;


/* ---------------------------------------------------------------- INTRO */
export const intro = () => `${sprite()}
<div class="intro" id="intro" aria-hidden="true">
  <div class="intro__glow"></div>
  <div class="intro__mark">
    <svg class="intro__layer intro__v" viewBox="${VIEWBOX}"><use href="#vp-v"/></svg>
    <svg class="intro__layer intro__plus" viewBox="${VIEWBOX}"><use href="#vp-plus"/></svg>
    <span class="intro__ring"></span>
  </div>
</div>
<button class="intro-skip" id="intro-skip" type="button">Pular abertura</button>`;

/* ---------------------------------------------------------------- NAV */
const navItems = [
  ['#grupo', 'O Grupo'],
  ['#empresas', 'Empresas'],
  ...(producoes.length ? [['#producoes', 'Produções']] : []),
  ['#videos', 'Vídeos'],
  ['#contato', 'Contato'],
];

export const header = () => `
<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<div class="progress" aria-hidden="true"><i id="progress-bar"></i></div>
<div class="ambient" aria-hidden="true"><i class="ambient__a"></i><i class="ambient__b"></i><i class="ambient__c"></i><i class="ambient__grain"></i></div>
<header class="site-header" id="site-header">
  <a class="brand" href="#topo" aria-label="Grupo V+ — início">
    ${symbolDeco('brand__mark')}
    <span class="brand__name">Grupo V+</span>
  </a>
  <a class="btn btn--sm btn--yellow header-cta" href="#contato">Contato comercial</a>
  <div class="menu">
    <span class="menu-current" id="menu-current" aria-hidden="true"></span>
    <button class="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Abrir menu">
      <span class="menu-btn__icon" aria-hidden="true"><i></i><i></i><i></i></span>
    </button>
    <nav class="menu-panel" id="site-menu" aria-label="Principal" hidden>
      <ul>${navItems.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>
      <div class="menu-panel__foot">
        <a class="menu-panel__cta" href="#contato">Contato comercial</a>
        <button class="present-toggle" id="present-toggle" type="button" aria-pressed="false"><span class="present-toggle__dot" aria-hidden="true"></span>Modo apresentação <kbd>P</kbd></button>
        <p>${ext(links.instagram.grupo.url, links.instagram.grupo.handle)} ${ext(links.instagram.tickets.url, links.instagram.tickets.handle)} ${ext(links.instagram.sports.url, links.instagram.sports.handle)}</p>
      </div>
    </nav>
  </div>
</header>`;

/* ---------------------------------------------------------------- HERO */
const heroArteExiste = () => existsSync(resolve('public', heroArte.arquivo));
export const hero = () => `
<section class="hero" id="topo" aria-labelledby="hero-title" data-present>
  <div class="hero__light" aria-hidden="true"><i></i><i></i><i class="hero__beam"></i><i class="hero__beam hero__beam--2"></i></div>
  <div class="hero__inner">
    <div class="hero__copy">
      <p class="eyebrow hero__eyebrow" data-hero>Grupo V+ <span>·</span> Produções <span>·</span> Tickets <span>·</span> Sports</p>
      <h1 class="hero__title" id="hero-title" data-split>${esc(grupo.assinatura).replace('experiência', '<em>experiência</em>')}</h1>
      <p class="hero__fronts" data-hero>${grupo.frentes.map((f) => esc(f)).join('<span aria-hidden="true"> / </span>')}</p>
      <div class="hero__actions" data-hero>
        <a class="btn btn--white" href="#grupo">Conhecer o grupo</a>
        <a class="btn btn--ghost" href="#contato">Contato comercial</a>
      </div>
    </div>
    <div class="hero__media${heroArteExiste() ? '' : ' hero__media--symbol'}" data-hero-media>
      ${heroArteExiste() ? `<figure class="hero__frame">${photo({ src: heroArte.arquivo, alt: heroArte.alt, w: heroArte.w, h: heroArte.h }, { eager: true })}</figure>` : '<!-- Arte do Hero: aguardando public/media/hero/hero-arte.webp (ver src/data/content.js → heroArte) -->'}
      ${symbolDeco('hero__symbol')}
    </div>
  </div>
  <a class="scroll-cue" href="#grupo"><span class="sr-only">Rolar para o conteúdo</span><i aria-hidden="true"></i></a>
  <svg class="edge edge--bottom" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120V58C180 18 360 0 560 22s380 78 560 66 260-50 320-64v96Z"/></svg>
</section>`;

/* ---------------------------------------------------------------- HISTÓRIA */
/** Fotos reais (só as que existem em public/). Fotos: somente apresentação, com HoloCard. */
const fotoGrupo = (f, i) => `<figure class="ed-photo ed-photo--${i} holo" style="aspect-ratio: ${f.w} / ${f.h}" data-holo${i === 0 ? ' data-mask-photo' : ' data-reveal-photo'}>
        <div class="holo__card"><img class="photo" src="${esc(f.arquivo)}" srcset="${esc(f.arquivoSm)} 720w, ${esc(f.arquivo)} 1400w" sizes="(min-width: 768px) 40vw, 60vw" alt="${esc(f.alt)}" width="${f.w}" height="${f.h}" loading="lazy" decoding="async" draggable="false"><span class="holo__shine" aria-hidden="true"></span><span class="holo__glare" aria-hidden="true"></span></div>
      </figure>`;

const numero = (n) => `<strong class="ed-num" data-count="${n.valor}" data-prefix="${esc(n.prefixo)}">${esc(n.prefixo)}${n.valor.toLocaleString('pt-BR')}</strong>`;

export const story = () => {
  const fotos = galeriaGrupo.filter((f) => existsSync(resolve('public', f.arquivo)));
  const [anos, eventos, clientes] = indicadores;
  return `
<section class="story" id="grupo" aria-labelledby="story-title" data-present>
  <div class="container ed">
    <header class="ed-head">
      <h2 class="ed-kicker" id="story-title">Conheça o Grupo V+</h2>
      <p class="ed-statement" data-split>Nascida em 2023, a V+ vem transformando momentos em <em>experiências inesquecíveis.</em></p>
    </header>
    <p class="ed-copy" data-reveal>Somos o mais (+) que você procura: produção de eventos sociais e esportivos, ingressos e campeonatos, com a V+ Produções, a V+ Tickets e a V+ Sports.</p>
    ${fotos.length ? `<div class="ed-gallery" aria-label="Fotografias de eventos do Grupo V+"><div class="ed-track">
      ${fotos.map(fotoGrupo).join('')}
    </div></div>` : '<!-- Galeria: aguardando fotos reais -->'}
    ${indicadores.length === 3 ? `<p class="ed-figures" data-reveal>Em ${numero(anos)} anos de trajetória, ${numero(eventos)} eventos realizados e ${numero(clientes)} clientes satisfeitos.</p>` : ''}
    <blockquote class="ed-quote" data-reveal><p>“Aqui na V+, a gente cuida de tudo, do começo até o último minuto do evento. Porque o básico nunca foi o suficiente.”</p></blockquote>
  </div>
</section>`;
};

/* ---------------------------------------------------------------- ECOSSISTEMA */
const ecoPanel = (e, i) => `
<article class="eco-panel eco-panel--${e.tema}" id="eco-${e.id}" role="tabpanel" aria-labelledby="tab-${e.id}" tabindex="0" data-index="${i}"${i === 0 ? '' : ' hidden'}>
  ${e.banner ? `<figure class="eco-banner"><img class="photo" src="${esc(e.banner.src)}" srcset="${esc(e.banner.srcSm)} 720w, ${esc(e.banner.src)} 1086w, ${esc(e.banner.srcLg)} 1920w" sizes="(min-width: 1440px) 1328px, calc(100vw - 2 * var(--gutter, 16px))" alt="${esc(e.banner.alt)}" width="${e.banner.w}" height="${e.banner.h}" loading="lazy" decoding="async" draggable="false"></figure>` : ''}
  <div class="eco-panel__info">
    <div class="eco-panel__brand">
      <img class="eco-logo eco-logo--${e.tema}" src="${e.logo.src}" alt="${esc(e.logo.alt)}" width="${e.logo.w}" height="${e.logo.h}" loading="lazy" decoding="async" draggable="false">
      <h3 class="eco-panel__name sr-only">${esc(e.nome)}</h3>
    </div>
    <div class="eco-panel__body">
      <p class="eco-panel__resumo">${esc(e.manifesto ? e.manifesto.texto : e.resumo)}</p>
      ${e.frase ? `<p class="eco-panel__frase">${esc(e.frase)}</p>` : ''}
      ${e.destaques.length ? `<ul class="eco-panel__list">${e.destaques.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
      ${e.publico ? `<p class="eco-panel__publico">${esc(e.publico)}</p>` : ''}
      ${e.cupom ? `<p class="eco-cupom"><span>Cupom</span><strong>${esc(e.cupom.codigo)}</strong><em>${esc(e.cupom.texto)}</em></p>` : ''}
      <div class="eco-panel__links">
        <a class="btn btn--yellow btn--sm" href="#contato" data-contact="${e.id}">Falar com a ${esc(e.nome)}</a>
        ${e.links.map((l) => ext(l.url, esc(l.rotulo), 'link-arrow')).join('')}
      </div>
    </div>
  </div>
</article>`;

export const ecosystem = () => `
<section class="eco" id="empresas" aria-labelledby="eco-title" data-present>
  <div class="container">
    <div class="eco__head">
      <h2 class="display eco__title" id="eco-title" data-split>Três empresas, um só grupo</h2>
      <div class="eco-tabs" role="tablist" aria-label="Empresas do Grupo V+">
        ${empresas.map((e, i) => `<button class="eco-tab" id="tab-${e.id}" role="tab" type="button" aria-controls="eco-${e.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-index="${i}">${esc(e.nome)}</button>`).join('')}
        <span class="eco-tabs__bar" aria-hidden="true"></span>
      </div>
    </div>
    <div class="eco__stage">${empresas.map(ecoPanel).join('')}</div>
  </div>
</section>`;

/* ---------------------------------------------------------------- PRODUÇÕES (só com dados) */
export const portfolio = () =>
  !producoes.length ? '<!-- Seção Produções: aguardando eventos confirmados (src/data/content.js → producoes) -->' : `
<section class="portfolio" id="producoes" aria-labelledby="port-title">
  <div class="container">
    <p class="eyebrow">Produções</p>
    <h2 class="display" id="port-title" data-split>Produções</h2>
    <div class="portfolio__list">
      ${producoes.map((p, i) => `
      <article class="portfolio__item portfolio__item--${i % 3}">
        <figure data-mask>${photo(p.capa)}</figure>
        <div><h3>${esc(p.titulo)}</h3><p>${[p.ano, p.local].filter(Boolean).map(esc).join(' · ')}</p></div>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ---------------------------------------------------------------- MOMENTOS (só com dados) */
export const moments = () =>
  !momentos.length ? '<!-- Seção Momentos V+: aguardando fotografias reais do público (src/data/content.js → momentos) -->' : `
<section class="moments" id="momentos" aria-labelledby="mom-title">
  <div class="container"><p class="eyebrow">Momentos V+</p><h2 class="display" id="mom-title" data-split>Momentos V+</h2></div>
  <div class="cluster">${momentos.map((m, i) => `<figure class="cluster__item cluster__item--${i % 7}" data-speed="${[0.9, 1.15, 1, 1.25, 0.85, 1.1, 0.95][i % 7]}">${photo(m)}</figure>`).join('')}</div>
</section>`;

/* ---------------------------------------------------------------- VÍDEOS */
export const films = () => `
<section class="films" id="videos" aria-labelledby="films-title" data-present>
  <div class="container films__grid">
    <div class="films__head">
      <p class="eyebrow films__label">${esc(secaoVideos.rotulo)}</p>
      <h2 class="display films__title" id="films-title" data-split>${esc(secaoVideos.titulo)}</h2>
      <p class="films__intro" data-reveal>${esc(secaoVideos.texto)}</p>
      <ol class="films__list" role="list">
        ${videos.map((v, i) => `
        <li><button class="film-item${i === 0 ? ' is-active' : ''}" type="button" data-video="${i}" aria-pressed="${i === 0}">
          <span class="film-item__n" aria-hidden="true"></span>
          <span class="film-item__t"><strong>${esc(v.titulo)}</strong><em>${esc(v.empresa)} · ${esc(v.duracao)}</em></span>
        </button></li>`).join('')}
      </ol>
      <p class="films__desc" id="film-desc" aria-live="polite">${esc(videos[0].descricao)}</p>
    </div>
    <div class="player" id="player" data-state="paused">
      <div class="player__screen">
        <video class="player__video" id="player-video" src="${videos[0].src}" poster="${videos[0].poster}" playsinline preload="none" width="${videos[0].w}" height="${videos[0].h}"></video>
        <button class="player__big" type="button" aria-label="Reproduzir vídeo: ${esc(videos[0].titulo)}"><span aria-hidden="true"></span></button>
        <p class="player__error" hidden>Não foi possível carregar o vídeo.</p>
      </div>
      <div class="player__bar">
        <button class="player__btn" data-act="toggle" type="button" aria-label="Reproduzir"><span class="ico ico--play" aria-hidden="true"></span></button>
        <div class="player__progress"><input type="range" min="0" max="1000" value="0" step="1" aria-label="Posição do vídeo"><span class="player__fill"></span></div>
        <span class="player__time" aria-hidden="true">0:00</span>
        <button class="player__btn" data-act="mute" type="button" aria-label="Desativar som" aria-pressed="false"><span class="ico ico--sound" aria-hidden="true"></span></button>
        <button class="player__btn" data-act="fs" type="button" aria-label="Tela cheia"><span class="ico ico--fs" aria-hidden="true"></span></button>
      </div>
    </div>
  </div>
</section>`;

/* ---------------------------------------------------------------- FEEDBACKS (só com dados) */
export const testimonials = () =>
  !depoimentos.length ? '<!-- Seção Feedbacks: aguardando depoimentos reais e autorizados (src/data/content.js → depoimentos) -->' : `
<section class="quotes" id="feedbacks" aria-labelledby="quotes-title">
  <div class="container"><p class="eyebrow">Feedbacks</p><h2 class="display" id="quotes-title">Quem viveu</h2></div>
  <div class="quotes__track" tabindex="0" aria-label="Depoimentos — arraste para navegar">
    ${depoimentos.map((d) => `<blockquote class="quote"><p>“${esc(d.texto)}”</p><footer>${esc(d.autor)}${d.evento ? ` — ${esc(d.evento)}` : ''}<cite>${esc(d.fonte)}</cite></footer></blockquote>`).join('')}
  </div>
</section>`;

/* ---------------------------------------------------------------- CONTATO */
export const contact = () => `
<section class="contact" id="contato" aria-labelledby="contact-title" data-present>
  <div class="contact__light" aria-hidden="true"><i class="hero__beam"></i></div>
  <svg class="edge edge--top" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0v62c200 46 420 58 640 30S1080 8 1260 34c80 12 140 30 180 44V0Z"/></svg>
  <div class="container contact__grid">
    <div class="contact__main">
      ${symbol('contact__symbol')}
      <h2 class="contact__title" id="contact-title" data-split>${esc(contato.titulo)}</h2>
      <p class="contact__text" data-reveal>${esc(contato.texto)}</p>
    </div>
    <form class="lead" id="lead-form" novalidate>
      <fieldset class="lead__services">
        <legend class="lead__label">Tipo de projeto</legend>
        <div class="lead__options">
          ${contato.servicos.map((sv, i) => `<label class="lead__option">
            <input type="radio" name="servico" value="${sv.id}"${i === 0 ? ' checked' : ''}>
            <span class="lead__option-name">${esc(sv.nome)}</span>
            <span class="lead__option-desc">${esc(sv.descricao)}</span>
          </label>`).join('')}
        </div>
      </fieldset>
      <div class="lead__field">
        <label class="lead__label" for="lead-nome">Nome</label>
        <input id="lead-nome" name="nome" type="text" autocomplete="name" required maxlength="80" aria-describedby="lead-nome-erro">
        <p class="lead__error" id="lead-nome-erro" hidden>Informe seu nome para continuar.</p>
      </div>
      <div class="lead__field">
        <label class="lead__label" for="lead-sobre">Sobre o projeto</label>
        <textarea id="lead-sobre" name="sobre" rows="3" maxlength="600" placeholder="Conte em poucas linhas o que você está planejando."></textarea>
      </div>
      <div class="lead__field lead__field--date">
        <label class="lead__label" for="lead-data">Data prevista <span>(opcional)</span></label>
        <input id="lead-data" name="data" type="date">
      </div>
      <div class="lead__actions">
        <button class="btn btn--yellow btn--lg lead__submit" type="submit">${esc(contato.botao)}</button>
        <p class="lead__note">Abre o WhatsApp oficial com a mensagem pronta. O envio é feito por você, no WhatsApp.</p>
      </div>
    </form>
  </div>
</section>`;

export const footer = () => `
<footer class="site-footer">
  <div class="container site-footer__grid">
    <a class="brand" href="#topo" aria-label="Grupo V+ — voltar ao início">${symbolDeco('brand__mark')}<span class="brand__name">Grupo V+</span></a>
    <nav aria-label="Rodapé"><ul>${navItems.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></nav>
    <ul class="site-footer__links" aria-label="Canais oficiais">
      <li>${ext(links.instagram.grupo.url, links.instagram.grupo.handle)}</li>
      <li>${ext(links.instagram.tickets.url, links.instagram.tickets.handle)}</li>
      <li>${ext(links.instagram.sports.url, links.instagram.sports.handle)}</li>
      <li>${ext(links.tickets, 'vmaistickets.com.br')}</li>
      <li>${ext(links.linktree, 'Linktree')}</li>
      <li>${ext(links.whatsapp, `WhatsApp ${links.whatsappExibicao}`)}</li>
    </ul>
    <p class="site-footer__copy">© ${new Date().getFullYear()} Grupo V+ · V+ Produções · V+ Tickets · V+ Sports</p>
  </div>
</footer>`;

export const renderAll = () => ({
  intro: intro(),
  header: header(),
  main: [hero(), story(), ecosystem(), portfolio(), moments(), films(), testimonials(), contact()].join('\n'),
  footer: footer(),
});

export const contatoJSON = () => JSON.stringify({ whatsapp: whatsappPorEmpresa, servicos: contato.servicos.map(({ id, abertura, pedido }) => ({ id, abertura, pedido })) });

export const videosJSON = () => JSON.stringify(videos.map(({ src, poster, titulo, descricao, w, h }) => ({ src, poster, titulo, descricao, w, h })));
