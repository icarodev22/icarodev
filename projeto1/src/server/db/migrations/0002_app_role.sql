-- Papel de aplicação com menor privilégio.
-- A senha NÃO é definida aqui: configure-a manualmente fora do repositório
--   ALTER ROLE projeto1_app WITH LOGIN PASSWORD '<senha forte gerada>';
-- e use esse usuário em DATABASE_URL na aplicação. Use o usuário administrador
-- apenas para rodar migrações e seed.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'projeto1_app') THEN
    CREATE ROLE projeto1_app NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO projeto1_app;

-- Catálogo e base de conhecimento: somente leitura.
GRANT SELECT ON personalities, knowledge_documents, knowledge_chunks TO projeto1_app;

-- Conversas: leitura, criação e exclusão (sem UPDATE: mensagens são imutáveis).
GRANT SELECT, INSERT, DELETE ON conversation_sessions, conversation_messages TO projeto1_app;

-- Limites e métricas.
GRANT SELECT, INSERT, UPDATE, DELETE ON usage_limits TO projeto1_app;
GRANT INSERT ON ai_usage_events TO projeto1_app;

-- Políticas de leitura do catálogo para o papel de aplicação.
DROP POLICY IF EXISTS personalities_app_read ON personalities;
CREATE POLICY personalities_app_read ON personalities FOR SELECT TO projeto1_app USING (true);
DROP POLICY IF EXISTS documents_app_read ON knowledge_documents;
CREATE POLICY documents_app_read ON knowledge_documents FOR SELECT TO projeto1_app USING (true);
DROP POLICY IF EXISTS chunks_app_read ON knowledge_chunks;
CREATE POLICY chunks_app_read ON knowledge_chunks FOR SELECT TO projeto1_app USING (true);
DROP POLICY IF EXISTS usage_app_all ON usage_limits;
CREATE POLICY usage_app_all ON usage_limits FOR ALL TO projeto1_app USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS ai_usage_app_insert ON ai_usage_events;
CREATE POLICY ai_usage_app_insert ON ai_usage_events FOR INSERT TO projeto1_app WITH CHECK (true);

-- Expurgo de conversas expiradas: função SECURITY DEFINER com escopo fixo,
-- pois o papel de aplicação não enxerga conversas de outros donos via RLS.
CREATE OR REPLACE FUNCTION purge_expired_conversations() RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE n integer;
BEGIN
  DELETE FROM conversation_sessions WHERE expires_at < now();
  GET DIAGNOSTICS n = ROW_COUNT;
  DELETE FROM usage_limits WHERE expires_at < now();
  RETURN n;
END
$$;
REVOKE ALL ON FUNCTION purge_expired_conversations() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION purge_expired_conversations() TO projeto1_app;

-- Política que permite o expurgo apenas de sessões expiradas e apenas quando a
-- execução NÃO ocorre como projeto1_app (ou seja, dentro da função SECURITY DEFINER
-- acima, executada como dono das tabelas). Mensagens são removidas por cascata.
DROP POLICY IF EXISTS sessions_purge_expired ON conversation_sessions;
CREATE POLICY sessions_purge_expired ON conversation_sessions
  FOR DELETE
  USING (expires_at < now() AND current_user <> 'projeto1_app');
