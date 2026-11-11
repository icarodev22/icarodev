-- Correção de segurança (P1-SEC-DB-01): no Supabase, privilégios padrão concedem
-- acesso automático a anon/authenticated em objetos criados depois do REVOKE da
-- migração 0001 (ex.: a função SECURITY DEFINER purge_expired_conversations,
-- que ficava executável via RPC pública). Esta migração revoga novamente tudo e
-- remove os privilégios padrão para objetos futuros criados pelo dono do schema.
DO $$
DECLARE r text;
BEGIN
  FOREACH r IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = r) THEN
      EXECUTE format('REVOKE ALL ON ALL TABLES IN SCHEMA public FROM %I', r);
      EXECUTE format('REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM %I', r);
      EXECUTE format('REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM %I', r);
      EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM %I', r);
      EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM %I', r);
      EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM %I', r);
    END IF;
  END LOOP;
END
$$;

REVOKE ALL ON FUNCTION purge_expired_conversations() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION purge_expired_conversations() TO projeto1_app;
