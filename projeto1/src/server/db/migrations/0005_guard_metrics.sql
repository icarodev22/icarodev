-- Métricas do Conversation Guard (sem conteúdo de mensagens nem identificadores).
ALTER TABLE ai_usage_events ADD COLUMN IF NOT EXISTS relevance text;
ALTER TABLE ai_usage_events ADD COLUMN IF NOT EXISTS guard_action text;
ALTER TABLE ai_usage_events ADD COLUMN IF NOT EXISTS guard_flags text;
