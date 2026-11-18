# Fotografias necessárias — galeria "Conheça o Grupo V+"

O repositório **não tem fotografias reais de pessoas em eventos**. Só há prints dos vídeos (o prompt proíbe usá-los para isso), cartazes e as 6 artes geradas. Por isso a galeria já está pronta no código, mas **fica oculta** até os arquivos existirem.

Basta salvar os arquivos com estes nomes e rodar `npm run build`. Cada foto aparece sozinha, sem nenhuma alteração de código. Se só algumas forem enviadas, só essas aparecem.

| Arquivo (em `public/media/fotos/grupo/`) | Formato | Conteúdo pedido |
|---|---|---|
| `grupo-01-principal.webp` | horizontal 3:2, ≥1600 px | Foto principal de impacto: público em evento V+ (palco ou pista), com emoção |
| `grupo-02-publico.webp` | vertical 2:3 | Pessoas do público: rostos, celebração |
| `grupo-03-esporte.webp` | vertical 2:3 | Atletas em competição V+ Sports |
| `grupo-04-equipe.webp` | quadrada ou horizontal | Equipe V+ trabalhando no evento |
| `grupo-05-palco.webp` | quadrada | Atração ou DJ no palco |
| `grupo-06-entrada.webp` | quadrada ou horizontal | Entrada e acesso do público (V+ Tickets) |

Depois de salvar, preencha também o `alt` (descrição) de cada foto em `galeriaGrupo`, no arquivo `src/data/content.js`.

Layout: no desktop, uma foto principal larga, duas verticais com sobreposição discreta e três quadradas. No mobile, um carrossel com swipe natural, sem setas. As fotos não são clicáveis.
