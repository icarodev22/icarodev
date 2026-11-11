# Arquitetura

## Visão geral

```
Navegador ──HTTPS──▶ Next.js (Vercel)
   │                   ├─ Páginas (RSC): início, biblioteca, sala de conversa, transparência
   │                   ├─ proxy.ts: CSP com nonce por requisição, 404 de slugs desconhecidos
   │                   └─ Route Handlers (Node):
   │                        POST /api/chat ─▶ chat/service.ts
   │                        GET|DELETE /api/sessions/:id
   │                        GET /api/status   GET /api/cron/purge (Bearer CRON_SECRET)
   │
   │   chat/service.ts: Origin ▶ corpo ≤16 KB ▶ Zod ▶ identidade anônima ▶ limites
   │                    ▶ sessão (dono) ▶ histórico ▶ RAG ▶ prompt em camadas ▶ IA (stream)
   │                    ▶ canário de vazamento ▶ persistência ▶ métricas agregadas
   │
   ├──────────────▶ PostgreSQL/Supabase (papel projeto1_app, RLS por owner_hash)
   └──────────────▶ Anthropic Messages API (chave somente no servidor; sem ferramentas)
```

O navegador **nunca** acessa o banco nem o provedor de IA diretamente.

## Módulos

| Caminho | Responsabilidade |
|---|---|
| `src/content/` | Conteúdo curado (18 personalidades, categorias, avisos). Fonte de verdade versionada |
| `src/components/` | UI: `layout/`, `library/`, `chat/`, `portrait/`, `ui/` |
| `src/app/` | Páginas e rotas de API (finas, delegam a `src/server`) |
| `src/lib/chat-shared.ts` | Constantes/tipos seguros para o navegador |
| `src/lib/validation.ts` | Schemas Zod (somente servidor) |
| `src/server/config/env.ts` | Variáveis de ambiente validadas; falha sem expor valores |
| `src/server/ai/` | `AIProvider` (abstração), `anthropic.ts`, `prompt.ts` (camadas), `guard.ts` (injeção) |
| `src/server/knowledge/` | Chunking, tokenização pt-BR, `MemoryRetriever` (BM25) e `PostgresRetriever` (FTS) |
| `src/server/conversations/` | `ConversationStore` em memória ou PostgreSQL — toda operação exige `ownerHash` |
| `src/server/limits/` | Rate limiting de janela fixa (memória ou PostgreSQL compartilhado) |
| `src/server/security/` | Origin/CSRF, leitura de corpo limitada, IP confiável, HMAC, identidade anônima |
| `src/server/db/` | Pool `pg`, `withOwner()` (define `app.owner_hash` por transação), migrações SQL |
| `src/server/chat/` | Orquestração do chat, sessões e métricas de uso |
| `scripts/` | Migração, seed, checagem de conteúdo e de referências |
| `tests/` | Unitários e integração |

## Fluxo de uma mensagem

1. **Origin** obrigatório e na allowlist (proteção CSRF; CORS não é usado como autenticação).
2. **Corpo** JSON ≤ 16 KB, lido em streaming com corte; `Content-Type` obrigatório.
3. **Zod** `strict()`: slug na allowlist, `sessionId` UUID, nível em enum, mensagem 1–2000 caracteres sem caracteres de controle/bidi.
4. **IA configurada?** Caso contrário, `503` — não há respostas simuladas.
5. **Identidade anônima**: cookie HttpOnly (`__Host-p1_anon` em produção) com 256 bits aleatórios; o servidor guarda só o SHA-256.
6. **Limites**: por estudante (min/dia), por IP pseudonimizado via HMAC (quando `TRUST_PROXY=true`) e teto global diário.
7. **Sessão**: carregada somente com `ownerHash` (resposta 404 idêntica para inexistente/alheia); deve ser da mesma personalidade; limite de mensagens por sessão.
8. **RAG**: até 4 trechos **da base da própria personalidade** (filtro por slug no SQL/índice).
9. **Prompt em camadas**:
   - `system` (confiável): regras de segurança e precisão + configuração curada da personalidade + canário.
   - mensagem do usuário: `<documentos_de_referencia>` e `<mensagem_do_estudante>` (dados **não confiáveis**, com `<`/`>` neutralizados).
   - lembrete de segurança como mensagem `system` no meio da conversa quando heurísticas detectam tentativa de injeção.
10. **Streaming NDJSON** (`meta` → `delta`… → `done`/`error`). Se o canário aparecer na saída, o fluxo é interrompido.
11. **Persistência** da pergunta e da resposta somente após sucesso; métricas agregadas sem conteúdo.

## Decisões técnicas

| Decisão | Motivo |
|---|---|
| Busca full-text PostgreSQL (português + `unaccent`) em vez de pgvector | Corpus pequeno e curado (≈70 documentos); evita um provedor de embeddings adicional (a Anthropic não oferece embeddings). A interface `KnowledgeRetriever` permite trocar por pgvector depois. |
| `pg` direto com papel de menor privilégio em vez de `supabase-js` + `service_role` | `service_role` ignora RLS; o papel `projeto1_app` tem apenas os GRANTs necessários e RLS forçado nas conversas. |
| Rate limiting no PostgreSQL em vez de Upstash Redis | Um serviço a menos; adequado ao volume inicial. Trocar por Redis é local a `limits/limiter.ts`. |
| Sem Cloudflare Turnstile nesta versão | Não há cadastro nem formulário além do chat; os limites cobrem o volume inicial. Recomendado antes de divulgação pública ampla (ver SEGURANCA.md). |
| Conversas sempre no servidor | Evita que o navegador forje turnos do "assistente" no histórico (injeção via histórico). |
| Retratos como ilustrações SVG originais | Fotos reais exigiriam verificação de licença por imagem; o acesso ao Wikimedia estava bloqueado no ambiente. A estrutura `portrait.kind` aceita `fotografia`/`obra-de-arte` com crédito futuramente. |
| Renderização dinâmica de todas as páginas | Necessária para o nonce da CSP ser aplicado aos scripts do Next.js. |

## Preparação para evolução (não implementado nesta fase)

- **Autenticação/contas**: `ownerHash` é o ponto único de identidade; substituir por `auth.uid()` (Supabase Auth) mantém as mesmas checagens e políticas RLS.
- **Acesso vitalício/pagamentos**: futuras tabelas `entitlements` alimentadas **apenas** por webhooks assinados e idempotentes do provedor; o servidor verificaria o direito antes de `enforceLimits`. Nada no navegador serve como prova de pagamento.
- **Painel administrativo**: rotas `/admin` exigiriam papel verificado no servidor; nenhuma existe hoje.
- **Novas personalidades/categorias/idiomas**: adicionar arquivos em `src/content/personalities`, ajustar o `CHECK` de categoria por migração, rodar `db:seed`.
- **Voz/avatares**: `Permissions-Policy` bloqueia o microfone até haver implementação real; o botão de voz está desabilitado e rotulado como indisponível.
