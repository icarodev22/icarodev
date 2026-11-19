# Grupo V+ — Auditoria de materiais e inventário

Data da auditoria: 18/11/2026

## 1. Arquivos recebidos

| Arquivo | Situação |
|---|---|
| `VMAIS-IMAGENS-LOGOS.zip` (1,7 MB) | **Chegou truncado** (sem diretório central). Recuperei 7 arquivos. O 7º veio incompleto e os arquivos seguintes, se existiam, se perderam. **Reenviar o ZIP.** |
| `VMAIS-VIDEO-01.mp4` | 2:45, vertical 406×720, H.264 + áudio. Íntegro. |
| `VMAIS-VIDEO-02.mp4` | 0:22, vertical 720×1280, H.264 + áudio. Íntegro. |
| Documento "Landing page premium — Hyper-Saturated Fluid" | **Não foi anexado.** Apliquei os princípios citados no briefing (high-contrast fluidity, tipografia editorial grande, divisões orgânicas, profundidade, microinterações). |

Arquivos recuperados do ZIP:

| # | Conteúdo | Uso |
|---|---|---|
| 1 | Logo oficial V+ (amarelo `#FFD60C` sobre roxo `#8338EB`, 1080²) | Vetorizada → símbolo do grupo, abertura, favicon e OG |
| 2 | Logo V+ Sports (escudo roxo sobre amarelo, 1080²) | Recortada com transparência → painel V+ Sports |
| 3 | Logo V+ Tickets (branca sobre `#221131`, 1003²) | Referência; usei os arquivos do site oficial (melhor qualidade) |
| 4 | Peça "Mais que eventos, criamos momentos" | História (campanha oficial) |
| 5 | Peça "Grandes eventos começam nos detalhes" | História (campanha oficial) |
| 6 | Peça "Do esporte ao entretenimento" | História e painel V+ Produções |
| 7 | Peça "Você imagina, a V+ realiza" | **Corrompida** (JPEG progressivo decodificado só em parte). Não publicada. Reenviar. |

## 2. Logos identificadas

- **Grupo V+ / símbolo V+**: arquivo 1. Vetorizei o arquivo oficial sem redesenhar (`public/brand/grupo-vmais-simbolo.svg` e `src/brand/vplus-paths.js`). Na abertura, o V e o + se separam apenas porque já são duas formas na logo original. *Pendente: o vetor original (AI/SVG/PDF).*
- **V+ Tickets**: `vmais-logo-horizontal.png` (branca, 1920×401) e `vmais-simbolo.png` (amarela), baixadas de vmaistickets.com.br.
- **V+ Sports**: arquivo 2, com fundo removido (`public/brand/vmais-sports.png`).
- **V+ Produções**: **nenhum arquivo avulso recebido.** Extraí a assinatura "V+ produções" do cabeçalho da peça 5 (cerca de 180 px de largura original, então tem baixa resolução). *Pendente: o arquivo vetorial.*

## 3. Fotografias utilizáveis

- **Não recebi fotos avulsas do público nem de eventos.** As fotos que existem estão dentro das peças publicitárias (polaroides), em baixa resolução, e não dá para confirmar o contexto delas. Algumas parecem imagens de banco (a do vôlei e a da pista com lasers).
- **Foram usados 7 quadros reais do VMAIS-VIDEO-01** (bastidores: espaço, iluminação, materiais e equipe), em `public/media/img/bastidores-*.webp`.

## 4. Vídeos disponíveis

| Vídeo | Conteúdo | Aplicação |
|---|---|---|
| 01 — 2:45 | Vlog de bastidores: integrante da equipe apresenta o espaço, a iluminação montada, a chegada de materiais (caixas e copos) e a equipe se preparando. Tem câmera de celular e efeitos de edição. | Loop mudo de 8,5 s no hero (00:20–00:29, iluminação), quadros em Bastidores e vídeo completo com som no player |
| 02 — 0:22 | Vídeo promocional V+ Produções com o neon V+ e legendas: "Universitário que representa atlética, comissão, turma e quer fazer um evento? (...) fechando banda, estrutura, som. Pois é, aqui na V+, a gente cuida de tudo, do começo até o último minuto do evento. Porque o básico nunca foi o suficiente. É sobre o que vem a +." | Player com som (o usuário aciona) e fonte de textos da História e do painel Produções |

Comprimi os vídeos para a web (H.264, faststart): hero 0,8 MB, 02 → 3,0 MB, 01 → 14 MB (com `preload="none"`).

## 5. Informações verificadas (publicadas)

| Informação | Fonte |
|---|---|
| "Tudo que faz uma experiência acontecer." | Bio do Linktree @grupovmais; vmaistickets.com.br/grupo |
| Eventos universitários • Esportes • Ingressos | Bio do Linktree |
| "Nascida em 2023, a V+ vem transformando momentos em experiências inesquecíveis. Somos o mais (+) que você procura: atuação direta em produção de eventos sociais e esportivos, além de venda de eventos sociais." | vmaistickets.com.br (seção Grupo V+) |
| V+ Produções: "Produção e assessoria de eventos sociais e privados." / "Dos palcos às arquibancadas: a V+ transforma experiências em momentos memoráveis." | vmaistickets.com.br |
| V+ Produções: Campeonatos, Festas, Experiência de marca | Peça oficial "Do esporte ao entretenimento" |
| Público: atléticas, comissões, turmas; "a gente cuida de tudo, do começo até o último minuto do evento" | Vídeo 02 |
| V+ Tickets: "O portal que reúne os melhores eventos da região. Do ingresso à entrada, junto com você." / "O primeiro passo para viver +" / cupom VMAIS / agenda do Nordeste | vmaistickets.com.br |
| V+ Tickets para produtores: divulgação no portal, nas redes e nos grupos; link de compra, cupons e venda sem taxa via WhatsApp | vmaistickets.com.br/produtores |
| V+ Sports: "Campeonatos e produção esportiva." / "O que vem a + já chegou." | vmaistickets.com.br |
| WhatsApp +55 81 99968-7850 | Linktree e vmaistickets.com.br |
| Instagram @grupovmais (rotulado "V+ PRODUÇÕES" no Linktree), @vmaistickets, @sportsvmais | Linktree |

## 6. Informações pendentes (não publicadas)

- Fundadores, equipe e cargos (nomes e fotos autorizadas).
- Cidade ou sede oficial. O DDD 81 sugere Pernambuco, mas isso **não foi publicado** por ser inferência.
- Portfólio: nomes, datas, locais e participação da V+ em cada evento. Aparece um painel "RECOVERY" no vídeo 01, mas o evento não está confirmado.
- Fotos reais do público, que são necessárias para a seção **Momentos V+**.
- Depoimentos reais e autorizados, necessários para a seção **Feedbacks**.
- V+ Sports: modalidades, campeonatos realizados e fotos.
- E-mail comercial oficial.
- Aprovação do slogan "Momentos que fazem história". **Não publicado.**
- Arquivos vetoriais das logos (grupo e V+ Produções) e o reenvio do ZIP completo e da peça "Você imagina".
- Documento "Hyper-Saturated Fluid".
- Domínio final, para o `og:image` com URL absoluta.

## 7. Distribuição dos arquivos pelas seções

| Seção | Material |
|---|---|
| Abertura | Símbolo oficial vetorizado (V + +) |
| Hero | Loop do vídeo 01, símbolo do grupo e assinatura oficial |
| O Grupo (história) | 3 peças de campanha oficiais + textos verificados |
| Ecossistema | Logos das 3 empresas, quadro do vídeo 01, peça "Do esporte ao entretenimento" |
| Produções | **Não publicada.** Estrutura pronta (`producoes` em `src/data/content.js`) |
| Momentos V+ | **Não publicada.** Estrutura pronta (`momentos`) |
| Bastidores | 7 quadros do vídeo 01 (composição agrupada com parallax; faixa automática no mobile) |
| Em movimento | Vídeos 02 e 01 com player próprio |
| Feedbacks | **Não publicada.** Estrutura pronta (`depoimentos`) |
| Contato | WhatsApp, site V+ Tickets, Instagrams e Linktree verificados. Sem formulário (não há um destino de envio confirmado) |

## Atualização — 6 artes V+ (PROMPT_ARTES_VPLUS.txt)

- Os PNGs originais estão preservados, sem nenhuma edição, em `source-assets/vplus/`. As versões WebP (1086 e 640 px) estão em `public/media/artes/`.
- Artes integradas nos painéis do Ecossistema, cada uma na sua empresa, sem misturar: Produções (`producoes-01`, `producoes-02`), Tickets (`tickets-01`, `tickets-02`) e Sports (`sports-01`, `sports-02`). Cada arte aparece uma única vez na página.
- Segundo o prompt, as artes são propostas geradas e estão **aprovadas provisoriamente**. Quando houver fotos e logos oficiais, elas têm prioridade.
- Galeria de fotos reais em "Conheça o Grupo": **bloqueada por falta de fotos**. Ver `docs/FOTOS-NECESSARIAS.md`.
- Som: todos os vídeos agora têm áudio. O loop do hero foi recodificado com som, começa mudo (por regra dos navegadores) e ganhou o botão "Ativar som". Os vídeos do player tocam com som. Só um vídeo toca por vez.

## Atualização — correções (fotos reais, banners, menu)

- **Conheça o Grupo V+:** saíram as 3 peças de campanha. A seção agora usa só as 5 fotos reais enviadas (2 fotos avulsas e 3 colagens), sem corte e sem legendas. Originais em `source-assets/fotos-grupo/`.
- **"O que acontece por trás" (Bastidores):** seção removida por completo, junto com o item do menu, as fotos e o CSS. O vídeo de bastidores continua apenas na seção "Em movimento".
- **Hero:** o vídeo foi removido. A arte oficial ainda não chegou e o espaço está preparado (ver `docs/FOTOS-NECESSARIAS.md`).
- **Menu:** passou a ser um ícone de três traços que abre um dropdown compacto (desktop) ou um painel compacto (mobile).
- **Banners horizontais** (Sports, Produções e Tickets) usados no topo de cada painel de "Três empresas, um só grupo". Exportações em `source-assets/banners/` (PNG original de 2172×724 e PNG de 1920×640) e WebP de 1920, 1086 e 720 px em `public/media/banners/`.
- Os banners foram entregues já prontos, na proporção 3:1. **Não gerei versões em 1920×800**: para chegar a essa proporção seria preciso cortar logos e textos ou inventar fundo.
- **A arte única que junta Produções e Sports não foi criada.** Montá-la exigiria redesenhar a tipografia e recompor as fotografias, o que as regras do pedido proíbem. Ela pode ser feita por um designer a partir dos banners entregues.
- As artes verticais `-01` saíram do site porque repetiam as fotos dos banners. Continuam guardadas em `source-assets/vplus/`.

## Atualização — refinamento final (V+ Live Experience)

- **Banners novos:** V+ Produções ("as festas e experiências que já fazem parte da sua história") e V+ Sports ("Essa temporada tem campeonato novo") substituíram os banners anteriores dessas duas empresas. O banner da V+ Tickets continua o mesmo. Os originais ficam em `source-assets/banners/` e os banners antigos saíram de `public/`.
- **Texto da V+ Sports:** "A V+ sempre soube produzir um evento." e "Dos palcos às arquibancadas, a V+ transformou experiências em momentos memoráveis. Agora, toda essa trajetória entra em campo." Textos enviados pelo Grupo V+. A frase parecida que existia em V+ Produções foi removida para não repetir.
- **Indicadores:** "3 anos de trajetória", "+300 eventos realizados" e "1.000 clientes satisfeitos". Números **informados pelo Grupo V+** no refinamento; o site não traz nenhum outro número.
- **HoloCard:** o código do React Bits citado como anexo não chegou. Fiz um componente equivalente em JS + CSS (`src/modules/holo.js`), com os mesmos parâmetros pedidos, sem WebGL, e por isso funciona em qualquer navegador.
- **Limpeza editorial:** saíram os números decorativos acima dos títulos, as linhas de "Fonte" visíveis, o contador 01/03, as etiquetas em pílula, os cantos de visor e as frases repetidas. As fontes de cada texto continuam registradas em `src/data/content.js`.
- **Hero:** a arte oficial continua pendente (`public/media/hero/hero-arte.webp`). Por isso o Hero mantém o símbolo oficial.

## Atualização — finalização premium

- **Conheça o Grupo V+:** a composição foi refeita em formato editorial assimétrico, com a frase oficial "Nascida em 2023…", as áreas de atuação, os indicadores dentro de uma frase e a citação do vídeo oficial. Saíram os blocos numerados e o painel de estatísticas. No celular e no tablet, as 5 fotos reais formam uma galeria horizontal que anda conforme a rolagem; com movimento reduzido, ela vira uma rolagem lateral comum, sem prender a página. O HoloCard fica estático no toque para priorizar a fluidez.
- **Três empresas:** seletor em abas acessíveis, com um painel visível por vez e altura que se ajusta suavemente. As artes extras (`-02`) foram removidas do site e do `public/`. Os três painéis usam a mesma superfície do grupo: as empresas se diferenciam pela logo, pelo banner e pelo conteúdo. No celular o conteúdo fica centralizado. O botão "Falar com a V+ …" leva ao contato com a área já selecionada.
- **Contato inteligente:** formulário com nome (obrigatório), tipo de projeto, descrição e data (opcional). A mensagem é montada no navegador e abre o WhatsApp oficial. Para usar números específicos por empresa, preencha `whatsappPorEmpresa` em `src/data/content.js`; vazio usa o número do grupo. O site não mostra mensagem de "enviado".
- **Vídeos:** a seção agora se chama "A V+ em ação", com o rótulo "03 — Grupo V+" e o texto de apoio enviado.
- **Rodapé:** compacto, com a navegação e os canais oficiais (Instagrams, V+ Tickets, Linktree e WhatsApp).
- **CTAs "Contato comercial"** (header, menu e Hero) agora levam ao formulário de contato.
- **Pendente:** a arte ou fotografia oficial do Hero. O Hero não tem foto; mostra o símbolo oficial até o arquivo `public/media/hero/hero-arte.webp` ser enviado.
