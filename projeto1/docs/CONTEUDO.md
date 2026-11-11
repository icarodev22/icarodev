# Conteúdo, fontes e retratos

## Estrutura

Cada personalidade (`src/content/personalities/<categoria>.ts`) contém: nome, retrato, área, nascimento/morte com
grau de precisão, local de nascimento, contexto histórico, resumo biográfico, contribuições, obras/acontecimentos,
linha do tempo, referências, perguntas sugeridas, orientação de voz, **horizonte de conhecimento**, temas sensíveis,
citações apócrifas a evitar e 3 documentos de conhecimento para o RAG (mais um "perfil" gerado automaticamente).

## Curadoria e honestidade

- Os textos são **sínteses editoriais** escritas a partir de conhecimento consolidado e das fontes listadas; não são
  cópias de textos proprietários. Estão marcados como `pending_expert_review` no banco e devem ser revisados por
  especialistas antes de uso institucional.
- Datas incertas são marcadas como aproximadas (ex.: "c. 470/469 a.C.") ou com rótulo explícito (calendário juliano
  para Mendeleev).
- Citações populares sabidamente apócrifas ou de atribuição incerta foram listadas por personalidade para que a IA
  **não** as apresente como falas documentadas (ex.: frase da "insanidade" atribuída a Einstein; "a República não
  precisa de sábios" no julgamento de Lavoisier; "só sei que nada sei").
- Temas sensíveis (acusações contra Michael Jackson, escravidão no Império, Napoleão e o restabelecimento da
  escravidão em 1802, armas nucleares) têm orientação de tratamento factual e neutro, fora do personagem quando cabível.
- Classificação histórica: "Imperadores" contém Augusto (primeiro imperador romano), Napoleão I (Imperador dos
  Franceses) e Dom Pedro II (Imperador do Brasil). Júlio César não está na lista (não foi imperador formal).

## Referências

As URLs apontam para Encyclopaedia Britannica, Stanford Encyclopedia of Philosophy, The Nobel Prize, American Chemical
Society, IUPAC, Rock & Roll Hall of Fame, Museu Imperial/Ibram, Biblioteca Nacional, Institut Curie, Fondation
Napoléon, Graceland e obras originais (sem URL). **Os links não puderam ser verificados online neste ambiente**
(domínios bloqueados). Execute `npm run check:references` em um ambiente com internet antes de publicar e corrija
qualquer link quebrado.

## Retratos

Todos os 18 retratos são **ilustrações vetoriais originais e estilizadas** (silhuetas com luz de recorte), geradas
por `src/components/portrait/PortraitSvg.tsx` a partir de elementos documentados (penteado, barba, chapéu, vestimenta
da época). Cada um exibe o aviso de que é representação artística, não fotografia nem retrato autêntico. Não há
sincronização labial; a animação é um movimento lento de câmera e luz, desativado com "movimento reduzido".

Para usar imagens reais no futuro: adicione o arquivo em `public/retratos/`, altere `portrait.kind` para
`fotografia` ou `obra-de-arte`, registre autor, licença e URL de origem, e verifique a licença de cada imagem
(muitas fotografias de artistas do século XX são protegidas por direitos autorais).

## Adicionar uma personalidade

1. Crie a entrada no arquivo da categoria (ou um novo arquivo + categoria em `categories.ts` e migração ajustando o `CHECK`).
2. `npm run check:content && npm test`.
3. `npm run db:seed` no banco de cada ambiente.
