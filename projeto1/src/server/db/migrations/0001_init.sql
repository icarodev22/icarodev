-- Projeto 1 — esquema inicial.
-- Migração aditiva e idempotente (não remove dados existentes).

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Wrapper IMMUTABLE de unaccent (necessário para coluna gerada e índice).
CREATE OR REPLACE FUNCTION p1_unaccent(text) RETURNS text
LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
SET search_path = public, extensions, pg_temp
AS $$ SELECT unaccent('unaccent'::regdictionary, $1) $$;

-- Catálogo público de personalidades (conteúdo curado, versionado no repositório).
CREATE TABLE IF NOT EXISTS personalities (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]{2,64}$'),
  name          text NOT NULL CHECK (char_length(name) <= 200),
  category      text NOT NULL CHECK (category IN ('fisica','quimica','filosofia','musica','historia','imperadores')),
  field         text NOT NULL,
  period_label  text NOT NULL,
  data          jsonb NOT NULL,          -- perfil completo (datas, linha do tempo, referências)
  content_hash  text NOT NULL,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS knowledge_documents (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  personality_id  uuid NOT NULL REFERENCES personalities(id) ON DELETE CASCADE,
  doc_key         text NOT NULL CHECK (doc_key ~ '^[a-z0-9-]{1,64}$'),
  title           text NOT NULL,
  body            text NOT NULL,
  references_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  review_status   text NOT NULL DEFAULT 'pending_expert_review'
                  CHECK (review_status IN ('pending_expert_review','reviewed')),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (personality_id, doc_key)
);

CREATE TABLE IF NOT EXISTS knowledge_chunks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     uuid NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
  personality_id  uuid NOT NULL REFERENCES personalities(id) ON DELETE CASCADE,
  chunk_index     int  NOT NULL,
  content         text NOT NULL,
  search_vector   tsvector GENERATED ALWAYS AS (to_tsvector('portuguese', p1_unaccent(content))) STORED,
  UNIQUE (document_id, chunk_index)
);
CREATE INDEX IF NOT EXISTS knowledge_chunks_search_idx ON knowledge_chunks USING gin (search_vector);
CREATE INDEX IF NOT EXISTS knowledge_chunks_personality_idx ON knowledge_chunks (personality_id);

-- Conversas anônimas. owner_hash = SHA-256 de um token aleatório guardado em cookie HttpOnly.
-- Nenhum dado pessoal identificável (nome, e-mail, IP) é armazenado.
CREATE TABLE IF NOT EXISTS conversation_sessions (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_hash        text NOT NULL CHECK (owner_hash ~ '^[0-9a-f]{64}$'),
  personality_slug  text NOT NULL REFERENCES personalities(slug) ON UPDATE CASCADE,
  level             text NOT NULL CHECK (level IN ('fundamental','medio','superior','geral')),
  created_at        timestamptz NOT NULL DEFAULT now(),
  expires_at        timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS conversation_sessions_owner_idx ON conversation_sessions (owner_hash);
CREATE INDEX IF NOT EXISTS conversation_sessions_expires_idx ON conversation_sessions (expires_at);

CREATE TABLE IF NOT EXISTS conversation_messages (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  session_id  uuid NOT NULL REFERENCES conversation_sessions(id) ON DELETE CASCADE,
  owner_hash  text NOT NULL,
  role        text NOT NULL CHECK (role IN ('user','assistant')),
  content     text NOT NULL CHECK (char_length(content) <= 20000),
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS conversation_messages_session_idx ON conversation_messages (session_id, id);

-- Contadores de consumo (rate limiting distribuído e cotas diárias).
-- bucket_key contém apenas HMACs, nunca IPs em texto puro.
CREATE TABLE IF NOT EXISTS usage_limits (
  bucket_key    text NOT NULL CHECK (char_length(bucket_key) <= 200),
  window_start  timestamptz NOT NULL,
  count         int NOT NULL DEFAULT 0,
  expires_at    timestamptz NOT NULL,
  PRIMARY KEY (bucket_key, window_start)
);
CREATE INDEX IF NOT EXISTS usage_limits_expires_idx ON usage_limits (expires_at);

-- Registro agregado de consumo de tokens (sem conteúdo de mensagens).
CREATE TABLE IF NOT EXISTS ai_usage_events (
  id                bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  personality_slug  text NOT NULL,
  model             text NOT NULL,
  input_tokens      int NOT NULL DEFAULT 0,
  output_tokens     int NOT NULL DEFAULT 0,
  stop_reason       text,
  injection_flagged boolean NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
ALTER TABLE personalities          ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_documents    ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_chunks       ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_sessions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages  ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_limits           ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_events        ENABLE ROW LEVEL SECURITY;

-- FORCE: as políticas valem até para o dono das tabelas (exceto superusuários/BYPASSRLS).
ALTER TABLE conversation_sessions  FORCE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages  FORCE ROW LEVEL SECURITY;

-- Conversas: somente o dono definido em app.owner_hash (por transação) acessa suas linhas.
DROP POLICY IF EXISTS sessions_owner_all ON conversation_sessions;
CREATE POLICY sessions_owner_all ON conversation_sessions
  FOR ALL
  USING (owner_hash = current_setting('app.owner_hash', true))
  WITH CHECK (owner_hash = current_setting('app.owner_hash', true));

DROP POLICY IF EXISTS messages_owner_all ON conversation_messages;
CREATE POLICY messages_owner_all ON conversation_messages
  FOR ALL
  USING (owner_hash = current_setting('app.owner_hash', true))
  WITH CHECK (owner_hash = current_setting('app.owner_hash', true));

-- Papéis expostos pela API REST do Supabase (anon/authenticated) não recebem acesso algum:
-- o navegador nunca fala diretamente com o banco.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    EXECUTE 'REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon';
    EXECUTE 'REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon';
    EXECUTE 'REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    EXECUTE 'REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated';
    EXECUTE 'REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM authenticated';
    EXECUTE 'REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM authenticated';
  END IF;
END
$$;

-- Papel de aplicação com privilégios mínimos (criado em 0002 se possível).
