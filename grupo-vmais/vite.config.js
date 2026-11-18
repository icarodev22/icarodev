import { defineConfig } from 'vite';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

/**
 * Gera o HTML das seções em tempo de build a partir de src/data/content.js.
 * Resultado: site estático (Vercel), com conteúdo indexável e funcional sem JS.
 */
function institutionalHtml() {
  return {
    name: 'grupo-vmais-html',
    async transformIndexHtml(html) {
      const url = pathToFileURL(resolve('src/templates.js')).href + `?t=${Date.now()}`;
      const t = await import(url);
      const r = t.renderAll();
      return html
        .replace('<!--INTRO-->', r.intro)
        .replace('<!--HEADER-->', r.header)
        .replace('<!--MAIN-->', r.main)
        .replace('<!--FOOTER-->', r.footer)
        .replace('<!--VIDEOS_JSON-->', t.videosJSON());
    },
  };
}

export default defineConfig({
  plugins: [institutionalHtml()],
  base: './',
  build: { target: 'es2019', cssCodeSplit: false, assetsInlineLimit: 0 },
});
