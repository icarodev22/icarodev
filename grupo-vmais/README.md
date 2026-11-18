# Grupo V+ — site institucional

Apresentação institucional do **Grupo V+**, com as três empresas: **V+ Produções**, **V+ Tickets** e **V+ Sports**.

- Auditoria de materiais e pendências: [`docs/INVENTARIO.md`](docs/INVENTARIO.md)
- Direção criativa: [`docs/DIRECAO-CRIATIVA.md`](docs/DIRECAO-CRIATIVA.md)

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/
npm run preview  # serve dist/
```

Para forçar a abertura cinematográfica (ela roda uma vez por sessão), acrescente `?intro=1` à URL.

## Publicar na Vercel

Importe o repositório e defina **Root Directory = `grupo-vmais`**. Framework: Vite (já configurado em `vercel.json`).

## Arquitetura

Usei Vite com JavaScript puro e GSAP (ScrollTrigger). Não usei framework de componentes porque é um site de uma página só, sem estado complexo. Assim o bundle fica em cerca de 50 KB gzip.

O HTML de cada seção é **gerado em tempo de build** (plugin em `vite.config.js`) a partir dos dados centralizados. Resultado: conteúdo indexável, que funciona sem JavaScript. O JS só adiciona movimento e interação.

```
src/
  data/content.js      ← TODO o conteúdo institucional, links e mídias (com fonte de cada texto)
  templates.js         ← componentes visuais (HTML das seções)
  brand/vplus-paths.js ← geometria do símbolo oficial V+
  modules/
    intro.js           ← abertura cinematográfica
    motion.js          ← reveals, text reveal, máscaras, parallax
    ecosystem.js       ← painéis das 3 empresas (abas no desktop, swipe no mobile)
    player.js          ← player de vídeo (com som)
    header.js          ← cabeçalho, menu compacto e indicador da seção ativa
    holo.js            ← efeito HoloCard nas fotos do Grupo (não clicáveis)
    present.js         ← modo apresentação (tecla P, setas, Esc)
    split.js           ← divisão de títulos em palavras
  styles/main.css      ← tokens de cor e estilos
public/
  brand/               ← logos, favicon, OG
  media/img/           ← fotografias e posters (webp)
  media/video/         ← vídeos comprimidos (mp4 faststart)
```

## Atualizar conteúdo

Edite `src/data/content.js`:

- **Produções** (`producoes`), **Momentos V+** (`momentos`) e **Feedbacks** (`depoimentos`) estão vazios e, por isso, **não aparecem no site**. Basta preencher o array (o formato está comentado no arquivo) para a seção ser publicada e entrar no menu.
- Nada pode ser publicado sem fonte confirmada. Esta é a regra do projeto.

## Regras implementadas

- Fotografias só de apresentação: não são clicáveis, não abrem lightbox, não podem ser arrastadas e não abrem preview com toque longo.
- Vídeo do hero mudo e em loop, pausado fora da tela. Vídeos com som tocam só por ação do usuário, um por vez, e pausam ao sair da área visível.
- `prefers-reduced-motion`: sem abertura e sem animações.
- Abertura pulável (botão/Esc). Um timeout de 5 s libera o conteúdo caso algo falhe.
- Layout validado em 320, 360, 375, 390, 430, 768, 1024 e 1440 px, sem rolagem horizontal.
