import '@fontsource-variable/archivo/wdth.css';
import './styles/main.css';

import { runIntro } from './modules/intro.js';
import { heroEntrance, scrollMotion, ScrollTrigger } from './modules/motion.js';
import { initHeader } from './modules/header.js';
import { initEcosystem } from './modules/ecosystem.js';
import { initPlayer, initHeroVideo } from './modules/player.js';
import { initHolo } from './modules/holo.js';
import { initPresentation } from './modules/present.js';
import { initContact } from './modules/contact.js';

const safe = (fn, name) => { try { fn(); } catch (e) { console.error(`[V+] ${name}:`, e); } };

safe(initHeader, 'header');
safe(initHeroVideo, 'hero video');
safe(initPlayer, 'player');
safe(initEcosystem, 'ecossistema');
safe(scrollMotion, 'motion');
safe(initHolo, 'holo');
safe(initPresentation, 'apresentação');
safe(initContact, 'contato');

safe(() => runIntro({ onReveal: (afterIntro) => safe(() => heroEntrance(afterIntro), 'hero') }), 'intro');

window.addEventListener('load', () => ScrollTrigger.refresh());
if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
