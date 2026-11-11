# Relatório de segurança (AppSec) — Projeto 1

Data: 11/11/2026 · Escopo: diretório `projeto1/` · Ambiente de teste: local (Node 22, PostgreSQL 16).
Este relatório não declara segurança absoluta. Ele registra o que foi verificado, como, e o que permanece pendente.

## 1. Resumo executivo

A aplicação foi construída com segurança desde a concepção: segredos apenas no servidor, validação estrita de entrada,
proteção CSRF por Origin, identidade anônima com cookie HttpOnly, autorização por dono em toda operação de conversa
(reforçada por RLS forçado no PostgreSQL), papel de banco com privilégios mínimos, CSP com nonce, prompt em camadas
com dados não confiáveis delimitados e IA **sem ferramentas** e sem acesso ao banco.

Durante os testes foram encontrados e corrigidos **6 problemas** (1 de severidade média com impacto de segurança,
1 médio funcional, 4 baixos). Todos têm teste ou verificação reproduzível. Permanecem riscos que dependem de
configuração externa (Supabase/Vercel/Anthropic), de revisão jurídica e de testes com o modelo real, que não puderam
ser executados por ausência de credencial.

## 2. Tecnologias identificadas

Next.js 16.4.6 · React 19.3.1 · TypeScript 5.9 · Tailwind CSS 4.3 · Framer Motion 14 · Zod 4.6 · `pg` 8.23 ·
`@anthropic-ai/sdk` 1.8 · Vitest 5 · PostgreSQL 16 (local) / Supabase (alvo) · Vercel (alvo).
O repositório também contém projetos não relacionados (`vilx/`, `ticketx*`), que foram preservados e não alterados.

## 3. Arquitetura encontrada

Repositório sem código do Projeto 1 no início (projeto novo). Superfície de ataque atual:

| Rota | Método | Pública | Autorização | Observações |
|---|---|---|---|---|
| `/`, `/personalidades`, `/conversar/:slug`, `/transparencia`, `/privacidade`, `/termos` | GET | sim | — | SSR; CSP com nonce |
| `/api/chat` | POST | sim | Origin + cookie anônimo + dono da sessão | streaming NDJSON; limites |
| `/api/sessions/:id` | GET | sim | dono (cookie) | 404 uniforme |
| `/api/sessions/:id` | DELETE | sim | Origin + dono | exclusão pelo próprio estudante |
| `/api/status` | GET | sim | — | só informa se a IA está configurada |
| `/api/cron/purge` | GET | não | `Bearer CRON_SECRET` (comparação em tempo constante) | 404 sem segredo |

Não há autenticação de usuários, uploads, formulários além do chat, nem painel administrativo nesta versão.

## 4–5. Vulnerabilidades encontradas, severidade e impacto

| ID | Arquivo | Descrição | Cenário de exploração | Impacto | Severidade | Evidência | Correção | Status |
|---|---|---|---|---|---|---|---|---|
| P1-SEC-01 | `src/server/db/migrations/0002_app_role.sql` | No Supabase, privilégios padrão concedem automaticamente `EXECUTE` a `anon`/`authenticated` em funções criadas depois do `REVOKE` da migração 0001. A função `SECURITY DEFINER purge_expired_conversations()` ficava executável via RPC pública. | Qualquer pessoa com a anon key chama `rpc('purge_expired_conversations')`. | Execução não autorizada de função privilegiada (efeito limitado a apagar dados já expirados), violando menor privilégio. | Média | Banco simulando os privilégios padrão do Supabase: `SET ROLE anon; SELECT purge_expired_conversations();` retornou resultado. | Migração `0004_lockdown_public_roles.sql`: revoga tudo de `anon`/`authenticated` e remove privilégios padrão futuros. Teste de integração verifica `has_function_privilege`. | Corrigido e validado (simulação local). **Validar no Supabase real.** |
| P1-SEC-02 | `0002_app_role.sql` | Com `FORCE ROW LEVEL SECURITY`, `DELETE ... WHERE` também aplica políticas de SELECT; o expurgo não enxergava sessões expiradas. | Sem exploração ativa: a retenção configurada não era cumprida. | Conversas mantidas além do prazo informado (privacidade/LGPD). | Média (privacidade) | Teste de integração "expurgo remove apenas conversas expiradas" falhou (0 removidas). | Migração `0003_purge_select_policy.sql` (SELECT apenas de sessões expiradas e nunca para `projeto1_app`). | Corrigido e validado |
| P1-SEC-03 | `src/server/knowledge/retriever.ts` | Consulta de fallback do RAG enviava 2 parâmetros para 1 placeholder. | Pergunta sem correspondência na busca full-text. | Erro 500 em modo PostgreSQL (indisponibilidade da conversa). | Baixa | Teste de integração: `bind message supplies 2 parameters`. | Consultas separadas e parametrizadas. | Corrigido e validado |
| P1-SEC-04 | `src/proxy.ts` | `decodeURIComponent` em segmento malformado lançava exceção. | `GET /conversar/%E0%A4%A` | Erro 500 (ruído/DoS de logs). | Baixa | `curl` retornou 500. | Comparação direta com a allowlist, sem decodificar. | Corrigido e validado (`404`) |
| P1-SEC-05 | `src/lib/validation.ts` | Import transitivo levava toda a base de conhecimento ao bundle do navegador. | Inspeção do JavaScript público. | Exposição de dados internos (não sigilosos) e peso desnecessário; contrariava o desenho "conhecimento só no servidor". | Baixa | `grep` em `.next/static` encontrou trechos dos documentos. | Módulo `chat-shared.ts` seguro para o cliente; `validation.ts` com `server-only`. | Corrigido e validado (0 ocorrências) |
| P1-SEC-06 | dependências de desenvolvimento | `minimatch` 10.2.6 (ReDoS, GHSA-g3hv-75wg-m249) via `typescript-eslint`. | Apenas ferramentas de lint locais/CI. | Baixo (não vai para produção). | Baixa | `npm audit`: 8 moderadas (dev). | `overrides` para `minimatch ^11.0.7` somente nesse caminho; lint validado. | Corrigido e validado (`npm audit`: 0) |

Também corrigidos (qualidade/robustez): rota de personalidade inexistente devolvia "soft 404" (agora 404 real no
proxy); erro de hidratação com "movimento reduzido"; overflow horizontal no celular.

## 6. Arquivos alterados

Todo o diretório `projeto1/` é novo. Nenhum arquivo fora dele foi modificado.

## 7. Controles implementados

- **Segredos**: somente variáveis de servidor (nenhum `NEXT_PUBLIC_*`); `.env*` no `.gitignore`; `.env.example` sem valores; erro de configuração lista nomes, nunca valores; `APP_SECRET` e `DATABASE_URL` obrigatórios em produção.
- **Entrada**: Zod `strict()` (anti mass assignment), allowlist de slugs, UUID, tamanho máximo, remoção de caracteres de controle/bidi, corpo ≤ 16 KB lido com corte, `Content-Type` obrigatório.
- **CSRF**: `Origin` obrigatório e em allowlist para POST/DELETE; cookie `SameSite=Lax`.
- **Sessão anônima**: 256 bits aleatórios, `HttpOnly`, `Secure` e prefixo `__Host-` em produção, expiração = retenção; servidor guarda só o hash.
- **Autorização/IDOR**: todas as operações exigem `ownerHash`; 404 uniforme; RLS `FORCE` por `app.owner_hash` como segunda camada; sessão presa à personalidade.
- **Banco**: consultas parametrizadas; papel `projeto1_app` sem DDL, sem UPDATE de mensagens, sem acesso a `schema_migrations`/métricas; `statement_timeout`; `anon`/`authenticated` sem acesso.
- **Consumo**: limites por estudante, por IP (HMAC), global diário, por sessão; `max_tokens`, timeout e cancelamento quando o cliente desconecta.
- **IA / prompt injection**: camadas separadas; documentos e mensagens delimitados e com `<`/`>` neutralizados; histórico só do servidor; sem ferramentas; heurísticas que adicionam lembrete de sistema; canário que interrompe a saída se o prompt vazar; tratamento de `refusal` e fallback server-side.
- **Frontend**: nenhum `dangerouslySetInnerHTML`/`innerHTML` (regras ESLint que proíbem); respostas renderizadas como elementos React; links externos com `noopener noreferrer`; `localStorage` só guarda o nível escolhido e `sessionStorage` só o ID da sessão.
- **Cabeçalhos**: CSP com nonce e `strict-dynamic`, `frame-ancestors 'none'`, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy` (microfone/câmera bloqueados), COOP/CORP, `no-store` em APIs; sem `X-Powered-By`; sem source maps públicos.
- **Logs**: JSON estruturado apenas com eventos e contagens — sem conteúdo de mensagens, IPs ou segredos.

## 8–9. Testes executados e resultados

Ver [VALIDACAO.md](VALIDACAO.md). Resumo: 50 testes unitários/API + 9 de integração com PostgreSQL = 59 aprovados;
lint, typecheck, build de produção, `npm audit` (0 vulnerabilidades), verificação de cabeçalhos, varredura de segredos
no código, no histórico Git e no bundle, e checagem visual/console com Playwright.

## 10. Variáveis de ambiente necessárias

Ver `.env.example`. Produção: `ANTHROPIC_API_KEY`, `DATABASE_URL` (papel `projeto1_app`), `DATABASE_SSL=verify-full`,
`DATABASE_CA_CERT`, `APP_SECRET`, `CRON_SECRET`, `TRUST_PROXY=true`. Migrações: `DATABASE_ADMIN_URL` (fora da Vercel).

## 11. Configurações externas pendentes

| Item | Status |
|---|---|
| Chave da Anthropic (preferencialmente em workspace dedicado, com limite de gasto mensal no Console) | Dependente de configuração externa |
| Projeto Supabase: rodar migrações, definir senha do `projeto1_app`, conferir que a Data API não expõe as tabelas, habilitar backups/PITR | Dependente de configuração externa |
| Vercel: variáveis de ambiente separadas por ambiente (Preview ≠ Production), domínio HTTPS, Cron | Dependente de configuração externa |
| Cloudflare Turnstile antes de divulgação pública ampla | Identificado, aguardando autorização |
| Revisão jurídica de privacidade/termos (LGPD, dados de crianças e adolescentes), identificação do controlador | Dependente de validação externa |
| Revisão das sínteses de conteúdo por especialistas e verificação online das URLs (`npm run check:references`) | Dependente de validação externa |

## 12. Limitações da auditoria

- **Sem chave de IA**: nenhum teste de prompt injection contra o modelo real foi executado. Os testes cobrem a montagem do prompt, a detecção e o bloqueio por canário com um provedor dublê — não o comportamento do modelo. **Não verificado.**
- **Sem Supabase real**: RLS, privilégios e papéis foram testados em PostgreSQL 16 local simulando os privilégios padrão do Supabase.
- **Sem acesso à internet** para os domínios de referência (Britannica, SEP, Nobel etc. bloqueados pelo proxy do ambiente): URLs não verificadas.
- Backups e restauração **não verificados** (não há banco gerenciado configurado).
- Nenhum teste de carga ou DAST externo; nenhum teste contra terceiros.

## 13. Riscos ainda existentes

| Risco | Severidade | Classificação |
|---|---|---|
| Prompt injection/jailbreak pode levar o modelo a sair do personagem ou errar fatos. Mitigado (sem ferramentas, sem dados sensíveis no contexto), não eliminado. O prompt de sistema está no repositório e não deve ser tratado como segredo. | Média | Não verificado (modelo real) |
| Abuso de custo por automação: sem login nem CAPTCHA; limitado por estudante/IP/global. Se `TRUST_PROXY=false`, limites por IP ficam desativados e apagar o cookie contorna o limite por estudante (o teto global continua). | Média | Dependente de configuração externa |
| `DATABASE_SSL=require` criptografa mas não valida o certificado; usar `verify-full` em produção. | Baixa | Dependente de configuração externa |
| `style-src 'unsafe-inline'` necessário para estilos inline do Framer Motion (scripts seguem restritos por nonce). | Baixa | Identificado, aceito |
| HSTS com `preload`: só submeter à lista de preload após confirmar HTTPS em todos os subdomínios. | Baixa | Dependente de configuração externa |
| Dados enviados ao provedor de IA ficam sujeitos à política de retenção dele; avaliar ZDR/contrato para uso institucional com menores. | Média (privacidade) | Dependente de validação externa |
| Armazenamento em memória (sem banco) não serve para produção; agora bloqueado por padrão em produção. | Baixa | Corrigido e validado |
