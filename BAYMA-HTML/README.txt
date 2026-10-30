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
  fonts/                Fontes Anton e Instrument Sans (locais, com licenças).
  icons/                Favicon e ícone para celular.
  videos/               Pasta para os vídeos de shows (vazia por enquanto).


COMO EDITAR
-----------
Abra os arquivos em qualquer editor de texto (VS Code, Bloco de Notas...).

- Textos: direto no index.html. Cada seção começa com um comentário
  (<!-- HERO -->, <!-- HISTÓRIA -->, <!-- SHOWS --> ...).
- História: o texto de "QUEM É VITOR BAYMA?" fica no index.html, dentro de
  <div class="hist__text"> (um <p> por parágrafo). A linha FUNK · BREGA FUNK ·
  MEGA FUNK logo abaixo é a lista <ul class="hist__styles">.
- Navegação: as abas ficam no index.html, dentro de <nav class="nav__tabs">.
  O destaque azul acompanha sozinho a seção que está na tela.
- Abertura: toca uma vez por visita (ao recarregar na mesma aba, não repete)
  e não aparece para quem ativou "reduzir movimento". Clique, toque, rolagem
  ou qualquer tecla pulam a abertura. Para ver de novo, abra o site em uma
  aba nova. Ela fica no bloco <!-- ABERTURA --> do index.html; os tempos estão
  no fim do css/style.css (seção ABERTURA).
- Cores: no início do css/style.css, em :root (--blue, --purple, --black...).
- Fundo do site: o bloco "AMBIENTE" no fim do css/style.css (luz azul e roxa
  lenta e textura horizontal). Fica igual em todas as seções e páginas.
- Carrossel de Shows: composição 3D (foto ativa no centro, vizinhas em
  perspectiva). Setas no computador; no celular, deslize o dedo. A foto ativa
  também ilumina o fundo da seção. Cada foto é um <li class="gcar__slide"> no
  index.html. O atributo data-tint traz as duas cores usadas no fundo
  quando a foto está ativa. Para trocar uma foto, mude o src, o width/height
  (tamanho real do arquivo) e o alt (descrição).
- Ajuste de enquadramento de uma foto: style="object-position: X% Y%" na
  própria <img>.
- Telefone e Instagram aparecem em vários lugares; use "Localizar e
  substituir" do editor para trocar todos de uma vez.


FORMULÁRIO DE CONTRATAÇÃO
-------------------------
A seção Contratação ("VAMOS FAZER ACONTECER?") tem um formulário com LOCAL,
TIPO DO EVENTO e MAIS INFORMAÇÕES, ao lado de uma foto. Ao clicar em
SOLICITAR CONTRATAÇÃO, o site confere se o local e o tipo foram preenchidos e
abre o WhatsApp oficial com a mensagem pronta:

  Olá, BAYMA! Gostaria de solicitar uma contratação.

  LOCAL:
  ...

  TIPO DO EVENTO:
  ...

  MAIS INFORMAÇÕES:
  ...

Nada é enviado automaticamente: o visitante confirma o envio no WhatsApp.
- Opções de tipo de evento: no index.html, dentro de <select id="f-tipo">.
  Mantenha a opção "Outro" (ela abre um campo para escrever o tipo).
- Número e texto da mensagem: no js/script.js, bloco "Contratação"
  (WHATSAPP_NUMBER e buildBookingMessage).


COMO ADICIONAR VÍDEOS DE SHOWS
------------------------------
Os 6 vídeos da pasta "claude acesso" do Google Drive já estão cadastrados.
Basta copiar os arquivos para a pasta assets/videos/ com exatamente estes nomes:

  BAYMA - Bololô.mp4
  BAYMA - Cabedelo-PB.mp4
  BAYMA - GINGA.mp4
  BAYMA - Pega Vareta.mp4
  BAYMA GGE-.mp4
  BAYNA - KOSMUS.mp4

ATENÇÃO: no Drive, os nomes de "Bololô" e "Pega Vareta" aparecem cortados.
Se o arquivo baixado tiver um nome mais longo, renomeie para o nome da lista
acima (ou troque o nome em videos.html, na lista window.BAYMA_VIDEOS).

Depois de copiar, abra videos.html:
- Os vídeos tocam como foram enviados, sem conversão nem perda de qualidade,
  com play, pausa, volume e tela cheia.
- A proporção vem do próprio arquivo (vertical continua vertical).
- Um quadro do próprio vídeo aparece como prévia antes do play.
- Só um vídeo toca por vez.
- Vídeo que não estiver na pasta não aparece (a página nunca mostra player
  vazio). Sem nenhum vídeo, aparece "Nenhum vídeo publicado ainda."

Para adicionar outro vídeo depois, copie uma linha de window.BAYMA_VIDEOS em
videos.html e troque o título e o nome do arquivo. YouTube também funciona:
  { titulo: 'Nome do show', tipo: 'youtube', id: 'ID_DO_VIDEO', largura: 1920, altura: 1080 }

Hospedagem: vídeos de show costumam ser grandes. Verifique se a sua hospedagem
aceita o tamanho dos arquivos; se não aceitar, publique no YouTube e use a
opção acima.

FOTOGRAFIAS
-----------
As fotos são os arquivos originais, sem recompressão. Os nomes foram trocados
para facilitar a edição:

  estudio-roxo.jpg          = @gabriellrec-44.jpg            (História)
  estudio-perfil-azul.jpg   = @gabriellrec-38.jpg            (Galeria)
  estudio-cinza.jpg         = @gabriellrec-22.jpg            (Galeria)
  show-bone.jpg             = SaveClip.App_523905652_...jpg  (Galeria)
  show-preto-e-branco.jpg   = SaveClip.App_809209129_...jpg  (Contratação)
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
- Links para WhatsApp (wa.me) e Instagram, inclusive o formulário de
  contratação, que abre o WhatsApp.
- Vídeos do YouTube, se forem usados na página de vídeos.

O efeito animado do fundo azul do Hero usa WebGL do próprio navegador. Em
aparelhos sem WebGL, ou com "reduzir movimento" ativado, o fundo fica
estático, sem perder o conteúdo.

Fontes: Anton (títulos) e Instrument Sans (textos, navegação e botões) — SIL
Open Font License, licenças em assets/fonts.
