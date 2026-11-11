# Conversation Guard

Camada de políticas de conversa aplicada **no servidor, antes e depois da geração**, para que cada personalidade mantenha
identidade, escopo e finalidade educacional. Não é apenas texto no frontend nem só instrução no prompt.

## Fluxo por mensagem

```
mensagem ─▶ validação (Zod) ─▶ limites ─▶ sessão do dono + personalidade
        ─▶ RAG (base da própria personalidade)
        ─▶ GUARD 1: classificação semântica (modelo, saída estruturada validada por schema)
        ─▶ GUARD 2: decisão determinística (src/server/guard/decision.ts)
              ├─ conteudo_inadequado ─────────────▶ recusa do servidor (sem gerar)
              ├─ fora_do_escopo (não complementar) ▶ redirecionamento do servidor (sem gerar)
              └─ responder ──▶ geração com orientações do Guard como mensagem de SISTEMA
                               (conexão interdisciplinar, limite temporal, citação, orientação
                                profissional, tema sensível, manipulação, ambiguidade)
        ─▶ GUARD 3: validação contínua da saída (canário do prompt, troca de identidade,
                    pedido de dados pessoais, tamanho) ─▶ interrompe e não salva se violar
        ─▶ métricas agregadas (relevância, ação, sinais) — sem conteúdo nem identificadores
```

| Arquivo | Papel |
|---|---|
| `src/content/scopes.ts` | Escopo por personalidade: temas centrais, conexões legítimas, sugestões de retorno |
| `src/server/guard/classification.ts` | Contrato da classificação (Zod) |
| `src/server/guard/classifier-prompt.ts` | Prompt do classificador; histórico recente e mensagem tratados como dados |
| `src/server/guard/decision.ts` | Política de decisão (pura, testável) |
| `src/server/guard/redirect.ts` | Redirecionamentos e recusas variados por personalidade |
| `src/server/guard/output.ts` | Validação da resposta gerada |
| `src/server/ai/prompt.ts` | Regras completas no prompt de sistema (identidade, escopo, níveis, precisão, limites temporais, segurança, profissionais, privacidade, qualidade) |

## Decisões de projeto

- **Classificação semântica, não por palavras-chave**: o modelo recebe o escopo da personalidade e as últimas mensagens
  da sessão (continuidade), e devolve JSON validado. As heurísticas de injeção existentes apenas *somam* sinais.
- **Redirecionamento gerado pelo servidor** em mudanças completas de assunto: garante que o tema paralelo não seja
  desenvolvido. Perguntas complementares (`follow_up`), interdisciplinares e ambíguas seguem para a personalidade.
- **Falha controlada**: se o classificador falhar ou expirar (`AI_GUARD_TIMEOUT_MS`), a conversa continua com as
  regras completas no prompt e uma orientação para a personalidade classificar internamente. Registrado em log.
- **Isolamento**: sessões pertencem a um dono e a uma personalidade; trocar de personalidade cria um contexto novo; o
  histórico nunca é compartilhado entre sessões.
- **Modelo do classificador**: por padrão o mesmo de `AI_MODEL`, com esforço baixo. Pode ser trocado por
  `AI_GUARD_MODEL` (ex.: um modelo mais rápido/barato), decisão de custo que fica com o responsável.

## Limitações (não é infalível)

- A classificação pode errar em casos limítrofes; por isso há a categoria "ambíguo", a regra de não recusar
  aprofundamentos e a segunda camada de regras no prompt.
- A validação de saída cobre desvios objetivos; erros factuais sutis exigem revisão humana e as fontes indicadas.
- Cada mensagem faz **duas chamadas** ao modelo quando a pergunta segue para geração (classificação + resposta).

## Testes

- `tests/unit/guard.test.ts`: os 15 cenários obrigatórios no nível de decisão, prompt, redirecionamento, validação de
  saída e integração com `/api/chat` (com classificador dublê).
- `npm run eval:guard`: os mesmos 15 cenários contra o **modelo real** (requer `ANTHROPIC_API_KEY`; gera custo).
