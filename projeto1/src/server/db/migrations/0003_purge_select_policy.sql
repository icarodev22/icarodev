-- Correção: DELETE com cláusula WHERE também aplica as políticas de SELECT.
-- Sem esta política, a função purge_expired_conversations() não enxergava as
-- sessões expiradas (FORCE RLS) e não removia nada. Detectado em teste de integração.
DROP POLICY IF EXISTS sessions_purge_expired_select ON conversation_sessions;
CREATE POLICY sessions_purge_expired_select ON conversation_sessions
  FOR SELECT
  USING (expires_at < now() AND current_user <> 'projeto1_app');
