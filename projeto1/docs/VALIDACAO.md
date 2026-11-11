# Relatório de validação

Executado em 11/11/2026 no ambiente de desenvolvimento (Linux, Node 22.23, PostgreSQL 16.15 local).
Todos os resultados abaixo foram obtidos efetivamente; o que não pôde ser executado está indicado.

## Resultado geral

| Verificação | Comando | Resultado |
|---|---|---|
| Testes unitários e de API | `npm test` | 50 aprovados (9 de integração pulados sem banco) |
| Testes de integração (PostgreSQL real) | `TEST_DATABASE_URL=… TEST_DATABASE_ADMIN_URL=… npm test` | **59/59 aprovados** |
| Tipos | `npm run typecheck` | sem erros |
| Lint (inclui regras anti-XSS) | `npm run lint` | sem erros |
| Auditoria de dependências | `npm audit` | 0 vulnerabilidades (produção e desenvolvimento) |
| Integridade do conteúdo | `npm run check:content` | 18 personalidades em 6 categorias |
| Build de produção | `npm run build` | sucesso |
| Migrações (usuário não superusuário, como no Supabase) | `npm run db:migrate` ×2 | aplicadas; 2ª execução idempotente |
| Seed | `npm run db:seed` ×2 | 18 personalidades, idempotente |
| Verificação de URLs de referência | `npm run check:references` | **não executado** — domínios bloqueados pelo proxy do ambiente |
| Conversa com o modelo real | — | **não executado** — sem `ANTHROPIC_API_KEY` no ambiente |

## Verificações manuais no servidor de produção local (`next start`)

| Verificação | Resultado |
|---|---|
| Cabeçalhos: CSP com nonce, HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP/CORP | presentes |
| `GET /api/status` sem chave de IA | `{"ai":false}` |
| `POST /api/chat` sem chave de IA | `503 ai_not_configured` (sem resposta simulada) |
| `POST /api/chat` sem cabeçalho Origin | `403 origin_required` |
| `/conversar/julio-cesar`, `/conversar/%E0%A4%A`, `/nada` | `404` |
| Source maps em `.next/static` | 0 arquivos |
| Prompt de sistema, base de conhecimento e nomes de variáveis secretas no bundle público | 0 ocorrências |
| Padrões de segredo no código e em todo o histórico Git | nenhum encontrado |
| Playwright (desktop 1440×900, iPhone 13, movimento reduzido): erros de console, erros de página, overflow horizontal | nenhum (após correções) |
| Teste de interface do streaming (resposta de rede interceptada no navegador, rotulada como não-IA) | texto incremental, lista, negrito e fontes renderizados; `<script>` exibido como texto, nenhum script injetado |

## Testes automatizados (lista completa)

- unit/content › possui 6 categorias com 3 personalidades cada (18 no total)
- unit/content › classifica corretamente os imperadores (sem Júlio César)
- unit/content › cada personalidade tem os campos obrigatórios
- unit/content › referências usam https e índices válidos
- unit/content › slugs são únicos e seguros
- unit/content › formata datas antigas e aproximadas sem inventar precisão
- unit/validation › aceita requisição válida com nível padrão
- unit/validation › rejeita personalidade fora da allowlist
- unit/validation › rejeita campos extras (mass assignment)
- unit/validation › rejeita mensagens vazias ou longas demais
- unit/validation › rejeita sessionId que não é UUID e nível inválido
- unit/validation › remove caracteres de controle e bidirecionais
- unit/env › exige APP_SECRET e DATABASE_URL em produção
- unit/env › não expõe valores de variáveis inválidas na mensagem de erro
- unit/prompt-guard › sinaliza 7 padrões de injeção (ignorar instruções, revelar prompt, troca de papel, modo desenvolvedor, segredos, conversas de terceiros, tags falsas)
- unit/prompt-guard › não sinaliza perguntas educacionais comuns
- unit/prompt-guard › neutraliza delimitadores
- unit/prompt-guard › inclui regras de segurança, horizonte de conhecimento e o canário
- unit/prompt-guard › contexto de cada personalidade é independente
- unit/prompt-guard › mensagens do estudante e documentos não conseguem fechar as tags estruturais
- unit/retriever › retorna trechos relevantes
- unit/retriever › é insensível a acentos
- unit/retriever › nunca mistura bases de personalidades diferentes
- unit/retriever › devolve o perfil quando não há correspondência
- unit/retriever › personalidade desconhecida não retorna nada
- unit/api-chat › exige cabeçalho Origin (CSRF) · rejeita origem não autorizada · aceita origem explicitamente autorizada
- unit/api-chat › exige JSON · limita o tamanho do corpo · rejeita JSON inválido sem expor detalhes internos
- unit/api-chat › rejeita personalidade desconhecida e campos extras
- unit/api-chat › retorna 503 quando a IA não está configurada (sem respostas simuladas)
- unit/api-chat › transmite meta, texto e conclusão; define cookie HttpOnly; separa camadas do prompt
- unit/api-chat › mantém o histórico na mesma sessão e isola sessões entre estudantes (anti-IDOR, GET e DELETE)
- unit/api-chat › não permite reutilizar a sessão com outra personalidade
- unit/api-chat › adiciona lembrete de segurança quando detecta tentativa de injeção
- unit/api-chat › interrompe a resposta se o canário do prompt de sistema vazar
- unit/api-chat › rate limiting por estudante · por IP mesmo descartando o cookie · teto global diário · limite por conversa
- unit/api-chat › não aceita cookie malformado como identidade
- unit/api-chat › cron de expurgo retorna 404 sem o segredo correto
- integration › papel de aplicação não lê conversas sem `app.owner_hash` definido
- integration › RLS isola conversas entre donos mesmo sem filtro na consulta
- integration › RLS impede inserir linhas em nome de outro dono
- integration › papel de aplicação tem privilégios mínimos (sem UPDATE/DDL/SET ROLE, sem métricas/migrações)
- integration › papéis públicos do Supabase (anon/authenticated) não acessam tabelas nem a função de expurgo
- integration › catálogo e conhecimento são legíveis pelo papel de aplicação
- integration › busca full-text recupera somente a base da personalidade, sem acentos; entrada maliciosa não altera o banco
- integration › limitador compartilhado conta corretamente
- integration › expurgo remove apenas conversas expiradas

> Os testes de API usam um **provedor de IA dublê** (`tests/helpers.ts`) apenas para exercitar validação, autorização,
> limites e streaming. Ele não é usado pela aplicação e é bloqueado em produção (`__setAIProviderForTests`).

## Problemas encontrados pela validação e corrigidos

Ver [SEGURANCA.md §4](SEGURANCA.md#45-vulnerabilidades-encontradas-severidade-e-impacto): P1-SEC-01 a P1-SEC-06, além de
soft-404, erro de hidratação com movimento reduzido, overflow horizontal no celular, gradientes do retrato que sumiam
quando a primeira instância estava oculta (IDs SVG duplicados) e aviso de retrato incompleto em 5 personalidades antigas.

## Como reproduzir os testes de integração

```bash
# banco de TESTE (nunca produção)
createdb projeto1_test
DATABASE_ADMIN_URL=postgres://owner:***@localhost/projeto1_test DATABASE_SSL=disable npm run db:migrate
DATABASE_ADMIN_URL=... DATABASE_SSL=disable npm run db:seed
psql projeto1_test -c "ALTER ROLE projeto1_app WITH LOGIN PASSWORD '<senha de teste>'"
TEST_DATABASE_URL=postgres://projeto1_app:***@localhost/projeto1_test \
TEST_DATABASE_ADMIN_URL=postgres://owner:***@localhost/projeto1_test npm test
```

## Atualização — personalidade em destaque e barra flutuante (11/11/2026)

| Verificação | Resultado |
|---|---|
| `npm test` com PostgreSQL | **61/61** (2 novos testes do pipeline de retratos) |
| lint, typecheck, build, `npm audit`, `check:content` | sem erros · 0 vulnerabilidades |
| Playwright em iPhone 13, iPhone SE, Pixel 7, iPad Mini, iPhone paisagem, notebook 1366×768 e monitor 1920×1080 | seleção dos 18 itens por clique sem recarregar a página; `aria-checked` correto; URL `?p=` sincronizada; teclado (Home/End/setas) com foco acompanhando; painel expandido abre, seleciona e fecha (inclusive com Esc); sem overflow horizontal; rodapé não encoberto pela barra; área de toque ≥ 44 px; CTA leva à conversa |
| Acesso direto `/?p=socrates` | destaque e estado ativo corretos já no HTML do servidor |
| Movimento reduzido | sem erros (após correção de hidratação com `MotionConfig reducedMotion="user"`) |
| Safe Area | `viewport-fit=cover` presente e `padding-bottom: max(0.75rem, env(safe-area-inset-bottom))` na barra. O Chromium não emula o recorte do iPhone; **confirmar em aparelho real** |
| Fotos reais | **não verificado com fotos reais** — nenhuma imagem foi fornecida; pipeline testado com imagens sintéticas |
