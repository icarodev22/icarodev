# BAYMA — site oficial

Vite + React 18 + TypeScript (mesma stack do projeto `vilx/`, que segue intacto).
WebGL com [OGL](https://github.com/oframe/ogl). Fontes: Anton (títulos) e DM Sans (texto,
navegação, botões), via Fontsource.

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # gera dist/ (enviar o conteúdo para a hospedagem)
npm run preview   # serve o build localmente
```

O site tem duas páginas e deve ser publicado na **raiz do domínio**:
`/` (principal) e `/videos/` (vídeos de shows).

## Estrutura

| Área | Arquivo | Conteúdo |
| --- | --- | --- |
| Hero | `src/sections/Hero.tsx` | Azul elétrico + textura CRT, logo original monumental, recorte da foto @gabriellrec-27 com o rosto livre das letras |
| História | `src/sections/Historia.tsx` | "Quem é Vitor Bayma?" com o retrato roxo (@gabriellrec-44) |
| Shows | `src/sections/Shows.tsx` + `src/components/GradientCarousel.tsx` | Carrossel 3D de 5 fotos ao vivo; o fundo assume a cor da foto ativa; botão "CONFIRA OS VÍDEOS" |
| Galeria | `src/sections/Galeria.tsx` | 3 fotos grandes em composição assimétrica |
| Contratação | `src/sections/Contato.tsx` + `src/lib/booking.ts` | "Vamos fazer acontecer?": formulário compacto (composição do Contact 7) + foto P&B; abre o WhatsApp com a mensagem organizada: LOCAL, TIPO DO EVENTO, MAIS INFORMAÇÕES |
| Rodapé | `src/components/Footer.tsx` | Logo roxa, História/Shows/Contato, Instagram, WhatsApp, ano automático |
| Vídeos | `videos/index.html` + `src/pages/VideosPage.tsx` | Página só com os vídeos e o rodapé, botão "VOLTAR AO INÍCIO" |

Dados oficiais em `src/content.ts`; fotos e textos alternativos em `src/media.ts`;
cores em tokens CSS no topo de `src/styles/global.css`.

## Conteúdo que ainda depende de material

- **Biografia (História):** o presskit no Google Drive não pôde ser acessado pelo ambiente de
  desenvolvimento. A seção tem um texto provisório curto e marcado como tal. Para publicar a
  biografia, troque `story` em `src/content.ts` (um parágrafo por item) pelo texto do presskit.
- **Vídeos:** adicione em `src/videos.ts` (instruções no arquivo). Arquivos próprios usam
  `preload="none"`; YouTube só carrega depois do clique. Sem vídeos, a página diz apenas que
  nenhum vídeo foi publicado e leva ao Instagram, sem players vazios.

## Fotos

- `scripts/prep_media.py <pasta-dos-originais>` gera `public/media/` (WebP em várias larguras)
  e `src/tints.json` (duas cores de cada foto de show, usadas no fundo do carrossel).
- O recorte do Hero (`reference/hero-recorte-27.webp`) foi feito com segmentação de pessoa
  (rembg, `isnet-general-use`) sobre a foto original: só a máscara, nenhum pixel gerado.
- A logo branca é a logo original com a cor trocada (mesmo canal alfa, mesmo desenho).
- Cada arquivo aparece uma vez. O clique em P&B da Contratação é do mesmo momento de uma
  foto colorida do carrossel; as duas ficam separadas pela galeria.

## React Bits Pro

Não instalado. O ambiente não tinha `REACTBITS_LICENSE_KEY` e a rede bloqueava
`pro.reactbits.dev`. Por isso:

- **Gradient Carousel** → `GradientCarousel.tsx`, implementação própria com a mesma ideia
  (perspectiva 3D, vizinhas parcialmente visíveis, fundo na tonalidade da foto ativa, botões,
  teclado, arrastar). A variante `-tw` do React Bits exige Tailwind, que o projeto não usa.
- **Contact 7** → formulário de contratação feito à mão seguindo a composição do bloco,
  em duas colunas (formulário e foto) e com a tipografia do resto do site.
- **Footer 8** → rodapé feito à mão seguindo a estrutura do bloco.
- **CRTWarp** → shader próprio em `src/components/CrtField.tsx`, usado só no fundo do Hero.

Com a licença e o acesso liberados, a instalação oficial é feita em `bayma/` com
`npx shadcn@latest add @reactbits-starter/gradient-carousel-tw` e
`npx shadcn@latest add @reactbits-pro/contact-7` seguindo
https://pro.reactbits.dev/docs/installation. O projeto ainda não tem `components.json`.

## Links externos

`https://wa.me/5581989575353` e `https://www.instagram.com/bayma11/` estão no código, mas não
puderam ser abertos a partir do ambiente de desenvolvimento (rede bloqueada). Confira os dois
num navegador antes de publicar.
