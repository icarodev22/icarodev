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
