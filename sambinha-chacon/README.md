# Sambinha Chacon — site oficial

Site em **Next.js 15 + React 19 + Tailwind CSS**, exportado como estático (`out/`), em pt-BR.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera a pasta out/ pronta para publicar em qualquer hospedagem
```

## Onde editar o conteúdo

**Tudo fica em `src/config/site.ts`** — nenhum componente precisa ser alterado:

| O quê | Constante |
|---|---|
| Link oficial de venda **sem taxa** pelo WhatsApp | `WHATSAPP_URL` |
| Bilheteria Digital / Central de links | `BILHETERIA_URL`, `CENTRAL_LINKS_URL` |
| Edições (arte, data, cidade, local, horário, atrações, patrocinadores) | `EDICOES` |
| Edição em destaque no banner | marque `aVenda: true` na edição confirmada |
| Recordações (fotos das edições anteriores) | `GALERIA` |
| Perguntas frequentes | `FAQ` (perguntas sem resposta não aparecem) |
| Contato e canais do rodapé | `CONTATO`, `CANAIS_OFICIAIS` |
| Título, descrição e domínio (compartilhamento) | `SITE` |

### WhatsApp
Enquanto `WHATSAPP_URL` estiver vazio, os botões de WhatsApp mostram **“Consultar compra sem taxa”**
e levam para a Central de links; o botão flutuante fica oculto. Ao preencher o link oficial,
os textos mudam para “Comprar pelo WhatsApp” e o botão flutuante aparece automaticamente.

### Regras de conteúdo aplicadas
- Datas exatamente como nas artes (07 NOV, 21 NOV, 30 JAN) — **o ano não é deduzido**.
- Nenhuma edição está marcada como à venda: o banner mostra “Confira a próxima edição”.
- Atrações (Jonas Esticado, Kátia & Aduílio, Boa Ousadia, Sambinha Chacon) aparecem só na edição 21 NOV.
- Sem preços, lotes ou disponibilidade; “sem taxa” aparece apenas no canal WhatsApp.
- Patrocinadores só aparecem no rodapé quando preenchidos na edição em destaque.

## Identidade visual (revisão)

**Recursos oficiais usados** (todos vindos dos arquivos enviados, sem redesenho):
- Logo circular oficial → `public/img/logo-badge*.png` (cabeçalho e rodapé).
- Logo sem anel (lettering azul + sol), como aplicada na arte oficial 07 NOV → `public/img/logo-wordmark.*` (banner). Fundo removido do JPG; sem sombra, contorno ou distorção.
- Arte ilustrada oficial (desktop e vertical) → banner.
- Faixa ornamental (folhas e sóis) recortada da arte 07 NOV → `public/img/orn-faixa-oficial.webp` (divisórias).
- Cena do casal dançando recortada da arte → `public/img/arte-cena-danca.webp`.
- Artes das edições e fotos das edições anteriores.

**Paleta extraída dos arquivos oficiais** (`tailwind.config.ts`):
marinho `#032E71` (lettering da logo) · royal `#0648AE` (coqueiros/janelas) · amarelo `#FFB200` (fundo da logo) ·
vermelho `#C62B11` (sol) · laranja `#F17C1B` (anel) · verde `#227947` (folhas) · rosa `#F49CD3` (casarões) ·
céu `#E0FCFC` · creme `#FBF4E6`.

**Escolhas complementares (não oficiais):**
- Fonte de apoio **Archivo** (títulos, textos e botões). A fonte oficial da marca não foi fornecida; o lettering da logo é tratado só como imagem.
- Botões em pílula, marcador de seção (traço), cards e abas: elementos de interface simples, sem ornamentos inventados.
- Área de proteção proposta da logo: 20% da altura da logo; tamanho mínimo proposto: 56 px (circular) e 140 px de largura (lettering).

**Pendências de material:** manual de marca, logo em SVG/PNG transparente original, arquivo da fonte oficial (WOFF2/OTF),
link oficial do WhatsApp de vendas (`WHATSAPP_URL`).

## Imagens
Fotos e artes otimizadas em WebP (`public/img`). O banner do celular usa a arte vertical
dividida em 3 faixas (`hero-m-top`, `hero-m-band`, `hero-m-bottom`): o céu estica sem deformar a arte,
então o logotipo e os textos nunca são cortados.
