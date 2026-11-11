# EPOCH.ia — aplicação da marca no produto

**EPOCH.ia — Conhecimento além do tempo.** Território: *Digital Humanism*. Rota de símbolo: **B — Estratos em diálogo**
(três faixas temporais que formam um E), conforme `assets/brand/03_identidade/EPOCHia_brand_guidelines_v1.pdf`.

## Origem dos ativos

`assets/brand/` guarda o pacote recebido **sem alterações** (SVG, PNG, tokens, manual PDF, prompt master).
`public/brand/` contém os arquivos servidos pelo site.

## Auditoria do pacote

| Item | Constatação | Ação |
|---|---|---|
| Símbolo e ícone de app (SVG) | Vetores reais (paths), sem imagens embutidas nem scripts | Usados sem alteração de desenho |
| Logotipos com nome (horizontal, compacto) | O nome usa `<text font-family="Space Grotesk">`: **não está em contornos**. Usado como imagem, o navegador não carrega a fonte e cai para Arial/genérica, e o ".ia" (posição fixa) fica desalinhado | Gerados em `public/brand/` com o texto **convertido em contornos** (`scripts/brand/outline_logos.py`, Space Grotesk 600 instanciada da fonte variável); mesmo layout e cores, sem redesenho. No produto o nome é texto real (componente `EpochLogo`) |
| Azul funcional do tema claro | O manual sugere `#526FE5`, que tem **3,97:1** sobre Cloud White e **4,41:1** sobre branco — abaixo de 4,5:1 (AA) para texto normal | Tema claro usa `#3F59C9` (5,43:1 / 6,03:1) para texto e estados. `#526FE5` permanece no logotipo claro (elemento gráfico) |
| Favicon PNG | Fundo transparente | Ícones de app (180/192/512) gerados a partir do ícone com fundo Midnight |

## Tokens semânticos (src/app/globals.css)

| Token | Escuro (padrão) | Claro | Origem |
|---|---|---|---|
| `canvas` | #0B0D12 | #F1F3F7 | Midnight / Cloud White |
| `surface` | #151922 | #FFFFFF | Deep Surface |
| `raised` | #1C212B | #E6E9F0 | derivado (hover/elevação) |
| `line` | #252B36 | #D3D8E1 | Slate |
| `fg` | #F1F3F7 | #0B0D12 | Cloud White / Midnight |
| `muted` | #939BAA | #5B6474 | Muted Gray / derivado |
| `accent` | #829BFF | #3F59C9 | Electric Blue / derivado AA |
| `on-accent` | #0B0D12 | #FFFFFF | — |
| `warn` / `danger` / `success` | #F2C26B / #FF8A8A / #6FD3A5 | #8A5A00 / #B42318 / #146C43 | funcionais |

Todos os pares de texto usados atingem **≥ 4,5:1** nos dois temas — verificado automaticamente em `tests/unit/brand.test.ts`.
Distribuição: superfícies escuras predominam; o azul fica restrito a foco, estado ativo, links e destaques.

## Tipografia

Space Grotesk (títulos, pesos 500–700, tracking negativo) e Inter (interface), carregadas localmente via `@fontsource`
(sem requisições a terceiros, compatível com a CSP). Fallback: Arial, sans-serif.

## Motion

140 ms (microinterações), 220 ms (padrão), 320 ms (ênfase), `cubic-bezier(.2,.7,.2,1)`. Mensagens entram com fade curto
e 4 px de deslocamento; troca de personalidade usa crossfade; as três faixas do símbolo se aproximam uma única vez ao
carregar. Tudo respeita `prefers-reduced-motion` e a opção "Reduzir animações".

## Produto

- **Home**: "Grandes mentes. Novas perspectivas.", busca por personalidade, tema ou época (inclui séculos e períodos),
  categorias, personalidade em destaque, destaques e seis categorias.
- **Biblioteca, Conversa e Configurações** com a nova paleta; Configurações ganhou **Aparência** (escuro, claro,
  seguir o sistema), idioma e conta (informativos: indisponíveis nesta versão).
- **Navegação inferior**: exatamente Home, Personalidades e Configurações, com destaque azul no item ativo.
- **Aviso de simulação** atualizado para o texto do manual.
- **Ícones**: `icon.svg`, `apple-icon.png`, manifest com 192/512 px; título e Open Graph com o nome EPOCH.ia.

## Fora do escopo desta entrega (não simulado)

Entregáveis de estúdio do prompt master que não fazem parte do código do produto: três novas rotas criativas (o manual
já registra a escolha da Rota B), novo manual PDF, aplicações institucionais (cartão, assinatura de e-mail, redes
sociais, banners, apresentação) e mockups. As ilustrações de 17 personalidades seguem como **ilustrações originais**
até que retratos no padrão do Einstein sejam fornecidos. Antes do lançamento: busca de anterioridade e validação
jurídica da marca, conforme o próprio pacote.
