BAYMA — SITE OFICIAL (HTML, CSS e JavaScript puro)
===================================================

COMO ABRIR
----------
Dê dois cliques em index.html. O site abre direto no navegador, sem instalar
nada e sem rodar comandos. Não usa React, Node.js nem processo de build.

Para publicar (Hostinger, Netlify, Vercel, GitHub Pages etc.): envie o
CONTEÚDO desta pasta (index.html, videos.html, css/, js/, assets/) para a
hospedagem. Funciona na raiz do domínio ou em uma subpasta.


ESTRUTURA
---------
index.html        Página principal: Hero, História, Shows, Galeria,
                  Contratação e rodapé.
videos.html       Página separada de vídeos de shows.
css/style.css     Todo o visual (cores, tipografia, layout, animações).
js/script.js      Menu, carrossel, animações, efeito do Hero e vídeos.
assets/
  img/fotos-do-bayma/   Fotografias do artista (arquivos originais).
  img/logo/             Logos do BAYMA.
  fonts/                Fontes Anton e DM Sans (locais, com licenças).
  icons/                Favicon e ícone para celular.
  videos/               Pasta para os vídeos de shows (vazia por enquanto).


COMO EDITAR
-----------
Abra os arquivos em qualquer editor de texto (VS Code, Bloco de Notas...).

- Textos: direto no index.html. Cada seção começa com um comentário
  (<!-- HERO -->, <!-- HISTÓRIA -->, <!-- SHOWS --> ...).
- História: o texto de "QUEM É VITOR BAYMA?" é PROVISÓRIO. Procure por
  "TEXTO PROVISÓRIO" no index.html e troque os parágrafos <p> pelo texto do
  presskit oficial (um <p> por parágrafo).
- Cores: no início do css/style.css, em :root (--blue, --purple, --black...).
- Fotos do carrossel de Shows: cada foto é um <li class="gcar__slide"> no
  index.html. O atributo data-tint traz as duas cores usadas no fundo
  quando a foto está ativa. Para trocar uma foto, mude o src, o width/height
  (tamanho real do arquivo) e o alt (descrição).
- Ajuste de enquadramento de uma foto: style="object-position: X% Y%" na
  própria <img>.
- Telefone e Instagram aparecem em vários lugares; use "Localizar e
  substituir" do editor para trocar todos de uma vez.


COMO ADICIONAR VÍDEOS DE SHOWS
------------------------------
Nenhum vídeo foi fornecido até agora, por isso a página de vídeos mostra
"Nenhum vídeo publicado ainda." Para publicar:

1. Arquivo de vídeo próprio (.mp4):
   - Coloque o arquivo em assets/videos/ (e, se quiser, uma imagem de capa).
   - No videos.html, procure "window.BAYMA_VIDEOS = []" e preencha, por exemplo:

     window.BAYMA_VIDEOS = [
       { titulo: 'Nome do show', tipo: 'arquivo', src: 'assets/videos/show.mp4',
         poster: 'assets/videos/show.jpg', largura: 1920, altura: 1080 }
     ]

2. Vídeo do YouTube:
     { titulo: 'Nome do show', tipo: 'youtube', id: 'ID_DO_VIDEO', largura: 1920, altura: 1080 }

   largura/altura = proporção real do vídeo (vertical: largura 1080, altura 1920).
   Os vídeos não tocam sozinhos e só carregam quando o visitante clica.

Vídeos muito grandes: se o .mp4 for pesado demais para a hospedagem, publique
no YouTube e use a opção 2, ou hospede o arquivo em outro serviço e coloque o
endereço completo em src (ex.: src: 'https://.../show.mp4').


FOTOGRAFIAS
-----------
As fotos são os arquivos originais, sem recompressão. Os nomes foram trocados
para facilitar a edição:

  estudio-roxo.jpg          = @gabriellrec-44.jpg            (História)
  estudio-perfil-azul.jpg   = @gabriellrec-38.jpg            (Galeria)
  estudio-cinza.jpg         = @gabriellrec-22.jpg            (Galeria)
  show-bone.jpg             = SaveClip.App_523905652_...jpg  (Galeria)
  show-palco-telao.jpg      = SaveClip.App_590403485_...jpg  (Shows)
  show-luz-azul.jpg         = SaveClip.App_814229713_...jpg  (Shows)
  show-luz-vermelha.jpg     = SaveClip.App_671186325_...jpg  (Shows)
  show-camisa-brasil.jpg    = SaveClip.App_723562034_...jpg  (Shows)
  show-cabine.jpg           = SaveClip.App_617281599_...jpg  (Shows)

  hero-recorte-estudio-azul.png: recorte (fundo transparente) de
  @gabriellrec-27.jpg, usado no Hero. Só a máscara de recorte foi aplicada;
  nenhum pixel da foto foi gerado ou retocado. PNG sem perda.

Logos: logo-bayma-roxo.png = LOGO (5).png (original); logo-bayma-preto.png =
BAYMA - PRETO.png (original, não usado no site, para fundos claros);
logo-bayma-branco.png = a logo original com a cor trocada para branco
(mesmo desenho).

As fotos originais são grandes (até 2731 px e 1,8 MB). Todas as que ficam
abaixo da primeira tela carregam só quando o visitante chega perto delas.


DEPENDÊNCIAS EXTERNAS
---------------------
O site funciona offline. Só dependem de internet:
- Links para WhatsApp (wa.me) e Instagram.
- Vídeos do YouTube, se forem usados na página de vídeos.

O efeito animado do fundo azul do Hero usa WebGL do próprio navegador. Em
aparelhos sem WebGL, ou com "reduzir movimento" ativado, o fundo fica
estático, sem perder o conteúdo.

Fontes: Anton e DM Sans (SIL Open Font License, licenças em assets/fonts).
