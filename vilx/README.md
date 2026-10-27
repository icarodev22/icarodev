# VILX — site oficial

Portfólio do VILX (João Vilaça, Recife/PE). Vite + React + TypeScript, Three.js na abertura e OGL no carrossel e no fundo líquido.

```bash
npm install
npm run dev            # desenvolvimento
npm run build          # checagem de tipos + build de produção (dist/)
npm run audit:images   # confere a regra "nenhuma imagem repetida"
```

## Abertura 3D

`src/components/intro/AvatarScene.ts`. O avatar não é uma imagem plana: cada pixel da arte original
(`reference/vilx-avatar-original.jpg`) vira uma coluna 3D com profundidade própria, gerada por
`scripts/voxelize.py` em `src/assets/avatar-voxels.json`:

- fundo vermelho e contorno branco removidos, ficando só a silhueta;
- volume da cabeça a partir da silhueta (domo + distância até a borda);
- óculos projetados à frente do rosto, cabelo numa camada própria;
- cores = cores originais de cada pixel; nenhum traço novo é desenhado.

A cena tem montagem dos voxels na entrada, flutuação, rotação lenta, resposta ao cursor e ao arrasto
no toque, luz-chave com sombra, contraluz vermelho, luz orbitando, lentes com reflexo, piso
translúcido com reflexo espelhado (desligado em aparelhos modestos) e degradação automática se a taxa
de quadros cair. Sem WebGL, ou se o contexto for perdido, entra uma versão 2D com o recorte da arte
(`src/assets/vilx-avatar-cutout.png`, gerado pelo mesmo script).

Para regerar os voxels:

```bash
python3 scripts/voxelize.py reference/vilx-avatar-original.jpg src/assets/avatar-voxels.json /tmp/depth.png src/assets/vilx-avatar-cutout.png
```

## FlexCarousel

`src/components/FlexCarousel/`. A faixa em DOM é a fonte da verdade (layout, legendas, teclado,
leitores de tela); um canvas OGL redesenha cada foto com curvatura de profundidade, distorção líquida
proporcional à velocidade e uma lente sob o cursor. Sem WebGL, as fotos em DOM continuam visíveis.
Mouse, toque (gesto vertical continua rolando a página), roda horizontal, setas, Home/End e botões.

## Imagens

Cada imagem é usada uma única vez (`src/media.ts` é o registro; `npm run audit:images` valida).
As fotos foram otimizadas para WebP por `scripts/prep_media.py`.

| Seção | Arquivo | Origem |
| --- | --- | --- |
| Abertura | avatar 3D (voxels) | avatar pixelado |
| História | historia-oculos | PART4 VILACAPrancheta 1.jpg |
| História | historia-lua | PART5 VILACAPrancheta 1.jpg |
| História | historia-vermelho | PART2 VILACAPrancheta 1.jpg |
| História | historia-olhar | PART1 VILACAPrancheta 2.jpg |
| Lançamentos | capa-o-predio-vai-tremer | card do Spotify no release, p. 4 |
| Lançamentos | capa-toda-nua | card do Spotify no release, p. 4 |
| Shows | show-esbornia-recife | Esbórnia Recife.jpg |
| Shows | show-pre-reveillon-bp-fortaleza | Pré Réveillon BP _ Fortaleza.jpg |
| Shows | show-aniversario-kaio-jorge | Aniversário Kaio Jorge.jpg |
| Shows | show-evento-privado | Evento Privado.jpg |
| Shows | show-liveset | Vilx Liveset.jpg |
| Shows | show-ao-vivo-01/02/03 | SaveClip.App_*.jpg (sem evento identificado) |

Não usadas (disponíveis para o futuro): PART1 Prancheta 1 e 3, PART2 Prancheta 2 e 3,
PART3 Prancheta 2, PART5 Prancheta 2, PART6 Prancheta 1 e 5.

## Pendências de conteúdo

- **E-mail de contato**: não consta nos materiais. Preencha `links.email` em `src/content.ts` e o
  canal aparece na seção Contato.
- **Capa de "Sumir Com VC"**: não fornecida; a faixa usa uma arte tipográfica temporária.
- **Capas em alta resolução**: as capas atuais vêm dos cards do release (~360 px).
- **Eventos das fotos SaveClip**: sem identificação, ficam com a legenda neutra "Ao vivo".
