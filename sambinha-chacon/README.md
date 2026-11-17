# Sambinha Chacon — capa de vendas

Página única: arte oficial de fundo, logo oficial e dois botões de venda.
Next.js 15 + Tailwind, exportação estática (`out/`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera out/ para publicar em qualquer hospedagem
```

## Editar links
Tudo em `src/config/site.ts`:
- `WHATSAPP_URL` — link oficial do WhatsApp de vendas (**pendente**). Enquanto vazio,
  "Vendas sem taxa" usa o destino oficial já existente (central de links).
- `BILHETERIA_URL` — "Vendas digitais".
- `SITE.url` — domínio definitivo (imagem de compartilhamento).

## Composição
- Telas horizontais (largura ≥ altura e altura ≥ 540 px): arte horizontal inteira, sem corte nem distorção;
  logo e botões no céu da arte; sobras da tela preenchidas com a própria arte desfocada.
- Telas verticais: arte vertical em 3 faixas (`hero-m-top`, `hero-m-band`, `hero-m-bottom`); o céu estica
  sem deformar, então logo e botões ficam juntos na primeira tela.

## Marca
- Logo: lettering + sol como aplicado na arte oficial 07 NOV (fundo removido do JPG; sem efeitos).
- Botões: verde `#227947` (folhas) e vermelho `#C62B11` (sol), extraídos da arte.
- Fonte dos botões: Archivo (apoio, complementar — fonte oficial não fornecida).
- Pendências: logo em SVG/PNG original, fonte oficial, link do WhatsApp de vendas.
