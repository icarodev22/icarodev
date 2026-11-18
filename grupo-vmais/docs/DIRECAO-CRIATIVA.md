# Direção criativa — Grupo V+

## Paleta (extraída dos arquivos oficiais)

| Token | Valor | Origem | Papel |
|---|---|---|---|
| `--purple` | `#8338EB` | Fundo da logo oficial do grupo e do escudo V+ Sports | Cor de marca dominante: hero, painel Produções, contato |
| `--yellow` | `#FFD60C` | Símbolo oficial V+ | Acento: símbolo, CTAs, destaques tipográficos |
| `--yellow-sports` | `#FED42A` | Fundo da logo V+ Sports | Painel V+ Sports |
| `--ink-2` | `#221131` | Fundo da logo V+ Tickets | Painel Tickets, seção de vídeos |
| `--ink` | `#120A1C` | Derivado escuro | Superfícies escuras de contraste |

A hierarquia vem das logos: o roxo é o campo de marca, o amarelo é o sinal (o "+") e o escuro dá o contraste. Não usei degradês aleatórios, glassmorphism nem bordas luminosas.

## Tipografia

Archivo Variable (self-hosted, eixos de peso e largura). Os títulos usam caixa alta, peso 850 e entrelinha 0,88, como as peças oficiais ("MAIS QUE EVENTOS CRIAMOS MOMENTOS"). Os rótulos usam a largura expandida, com espaçamento amplo.

## Elementos gráficos próprios da marca

- **Cantos de visor (viewfinder)**: tirados das peças oficiais. Aparecem no vídeo do hero e no player.
- **O "+"**: marcador de listas, ícone dos botões (gira no hover) e caractere da linguagem ("o que vem a +").
- **Divisões orgânicas**: curvas suaves entre o hero roxo, as seções escuras e o contato.

## Movimento

- Abertura: escuridão → V em 3D → + por outro eixo → encaixe (anel de luz e micro-distorção) → câmera atravessa a abertura do V. São cerca de 2,6 s.
- Títulos revelados por palavras e textos em entrada progressiva. Fotos entram por máscara, sem distorção.
- O Ecossistema fica fixo no desktop: a rolagem troca a empresa, com transição em cortina. No mobile, o trilho é por toque.
- Bastidores: composição agrupada com parallax em velocidades diferentes. No mobile, uma faixa automática, sem interferir no scroll.
- Movimento só com `transform`/`opacity`/`clip-path`. Sem blur pesado e sem cursor personalizado.

## Decisões sobre conteúdo

- Hero: usei a assinatura oficial "Tudo que faz uma experiência acontecer." no lugar do slogan proposto, que ainda não foi aprovado.
- As peças de campanha aparecem identificadas como "Campanha oficial", e não como registros de eventos.
