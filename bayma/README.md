# BAYMA — site oficial

Vite + React 18 + TypeScript (mesma stack do projeto `vilx/`, que segue intacto).
WebGL com [OGL](https://github.com/oframe/ogl).

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # gera dist/ (enviar o conteúdo para a hospedagem)
npm run preview   # serve o build localmente
```

## Estrutura

| Seção | Arquivo | Conteúdo |
| --- | --- | --- |
| Hero | `src/sections/Hero.tsx` | Azul elétrico + efeito CRT, logo original monumental, recorte da foto @gabriellrec-27 sobreposto às letras, estilos, contratação |
| 01 Identidade | `src/sections/Identidade.tsx` | FUNK · BREGA FUNK · MEGA FUNK cruzando o retrato em fundo roxo (@gabriellrec-44) |
| 02 Galeria | `src/sections/Galeria.tsx` | 7 fotos em composição editorial assimétrica |
| 03 Contato | `src/sections/Contato.tsx` | WhatsApp e Instagram, sobre o efeito CRT roxo |
| Rodapé | `src/components/Footer.tsx` | Logo roxa original, navegação, ícones sociais, direitos autorais |

Dados oficiais em `src/content.ts`; fotos e textos alternativos em `src/media.ts`;
cores em tokens CSS no topo de `src/styles/global.css`.

## Fotos

- `scripts/prep_media.py <pasta-dos-originais>` gera `public/media/` (WebP em várias larguras).
- O recorte do Hero (`reference/hero-recorte-27.webp`) foi feito com segmentação de pessoa
  (rembg, `isnet-general-use`) sobre a foto original: só a máscara, nenhum pixel gerado.
- A logo branca é a logo original com a cor trocada (mesmo canal alfa, mesmo desenho).
- Não usadas: a versão P&B de um clique que entrou colorido (evita repetição) e a foto com a
  marca de um patrocinador em primeiro plano. A `BAYMA - PRETO.png` está em `reference/`
  para usos em fundo claro.

## Pendências e limitações

- **React Bits Pro (Contact 3, Footer 8, CRTWarp): não instalados.** O ambiente não tinha
  `REACTBITS_LICENSE_KEY` e a rede bloqueava `pro.reactbits.dev`. Contato e rodapé foram
  construídos à mão seguindo a estrutura desses blocos (dois canais reais, sem inventar um
  terceiro). O fundo CRT é um shader próprio (`src/components/CrtField.tsx`) com os
  parâmetros pedidos (emissão `#c755f7`, fundo `#120f17`, curvatura, scanlines,
  persistência, distorção, cursor). Com a licença, rode no diretório `bayma/`
  `npx shadcn@latest add @reactbits-pro/contact-3` (e `footer-8`) seguindo
  https://pro.reactbits.dev/docs/installation; o projeto ainda não tem `components.json`.
- **Links externos:** `https://wa.me/5581989575353` e `https://www.instagram.com/bayma11/`
  estão no código, mas não puderam ser abertos a partir do ambiente de desenvolvimento
  (rede bloqueada). Confira os dois num navegador antes de publicar.
- Sem músicas, sets ou agenda: nenhuma seção foi criada para isso.
