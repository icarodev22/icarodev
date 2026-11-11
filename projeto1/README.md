# Projeto 1 — Converse com a história

Plataforma educacional em que estudantes conversam com **representações digitais fictícias** de 18 personalidades
históricas e científicas. As respostas são geradas por IA (Anthropic Claude) a partir de uma base de referência curada
e isolada por personalidade (RAG), com regras de precisão histórica e proteção contra prompt injection.

> Representação digital fictícia para fins educacionais. As respostas são geradas por inteligência artificial e não
> correspondem a declarações reais da personalidade.

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide |
| Backend | Route Handlers do Next.js (runtime Node), Zod |
| IA | `@anthropic-ai/sdk` atrás da interface `AIProvider` (`src/server/ai`) |
| Banco | PostgreSQL (compatível com Supabase), busca full-text em português com `unaccent`, RLS |
| Testes | Vitest (unitários + integração com PostgreSQL real), Playwright (verificação visual manual) |
| Infra alvo | Vercel + Supabase |

## Experiência principal

A página inicial apresenta uma **personalidade em destaque** (retrato grande, nome, contexto e acesso direto à
conversa) e uma **barra flutuante inferior** com as 18 personalidades. A seleção troca o destaque sem recarregar a
página e fica refletida na URL (`/?p=marie-curie`), inclusive em acesso direto. A barra respeita a área segura do
iPhone, funciona por teclado (setas, Home, End) e tem um painel expansível com todas as personalidades por categoria.

Fotografias reais podem ser adicionadas sem alterar a interface: veja [assets/retratos/README.md](assets/retratos/README.md).
Enquanto não houver foto, cada personalidade usa sua ilustração original, identificada como tal.

## Início rápido (desenvolvimento)

```bash
cd projeto1
npm ci
cp .env.example .env.local      # preencha ANTHROPIC_API_KEY para habilitar as conversas
npm run dev                     # http://localhost:3000
```

Sem `DATABASE_URL`, o modo de desenvolvimento usa armazenamento **em memória** (conversas e limites somem ao reiniciar).
Sem `ANTHROPIC_API_KEY`, a interface funciona, mas o envio de mensagens responde `503 ai_not_configured` — **não há
respostas simuladas**.

## Banco de dados (PostgreSQL / Supabase)

1. Crie o projeto no Supabase (ou um PostgreSQL 14+).
2. Rode as migrações e o seed com o usuário administrativo (ex.: `postgres`):
   ```bash
   DATABASE_ADMIN_URL='postgresql://postgres:...@db.<ref>.supabase.co:5432/postgres' npm run db:migrate
   DATABASE_ADMIN_URL='...' npm run db:seed
   ```
3. Defina a senha do papel de aplicação (criado sem login pela migração 0002), **fora do repositório**:
   ```sql
   ALTER ROLE projeto1_app WITH LOGIN PASSWORD '<gerada com openssl rand -hex 24>';
   ```
4. Configure `DATABASE_URL` da aplicação com o usuário `projeto1_app` (nunca o `postgres`/`service_role`).
   Em produção use `DATABASE_SSL=verify-full` + `DATABASE_CA_CERT`.

As migrações são aditivas, idempotentes e registradas em `schema_migrations`. O seed pode ser reexecutado.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` / `build` / `start` | Desenvolvimento, build e servidor de produção |
| `npm run lint` / `typecheck` | ESLint (com regras anti-XSS) e TypeScript |
| `npm test` | Testes unitários (integração é pulada sem banco de teste) |
| `TEST_DATABASE_URL=… TEST_DATABASE_ADMIN_URL=… npm test` | Inclui testes de integração (RLS, privilégios, FTS) |
| `npm run db:migrate` / `db:seed` | Migrações e carga do conteúdo curado |
| `npm run check:content` | Integridade do conteúdo (18 personalidades, referências) |
| `npm run check:references` | Verifica se as URLs de referência respondem (requer internet) |
| `npm run portraits:build` | Otimiza as fotos fornecidas em `assets/retratos/` (AVIF/WebP) e atualiza o manifesto |

## Deploy (Vercel) — requer autorização

Nenhum deploy foi feito. Para publicar: importe o diretório `projeto1` como Root Directory, configure as variáveis de
`.env.example` (com `TRUST_PROXY=true`, `APP_SECRET`, `CRON_SECRET`, `DATABASE_URL`), e o `vercel.json` agenda o expurgo
diário de conversas expiradas.

## Documentação

- [docs/ARQUITETURA.md](docs/ARQUITETURA.md) — arquitetura, módulos, fluxo do chat, decisões e evolução
- [docs/SEGURANCA.md](docs/SEGURANCA.md) — relatório de segurança (AppSec) e riscos residuais
- [docs/VALIDACAO.md](docs/VALIDACAO.md) — testes executados e resultados
- [docs/CONTEUDO.md](docs/CONTEUDO.md) — curadoria, fontes, retratos e como adicionar personalidades
