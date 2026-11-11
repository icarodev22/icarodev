import "server-only";
import { z } from "zod";

/**
 * Configuração do servidor validada com Zod.
 * Nenhum segredo usa o prefixo NEXT_PUBLIC_, portanto nada aqui chega ao bundle do navegador.
 */
const boolish = z
  .enum(["true", "false", "1", "0"])
  .transform((v) => v === "true" || v === "1");

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // IA
  AI_PROVIDER: z.enum(["anthropic"]).default("anthropic"),
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  AI_MODEL: z.string().min(1).default("claude-opus-5-5"),
  AI_EFFORT: z.enum(["low", "medium", "high"]).default("low"),
  AI_MAX_OUTPUT_TOKENS: z.coerce.number().int().min(256).max(16000).default(4096),
  AI_TIMEOUT_MS: z.coerce.number().int().min(5000).max(300000).default(90000),
  /** Modelo do classificador do Conversation Guard (padrão: o mesmo de AI_MODEL). */
  AI_GUARD_MODEL: z.string().min(1).optional(),
  AI_GUARD_TIMEOUT_MS: z.coerce.number().int().min(1000).max(60000).default(12000),
  /** Habilita o fallback server-side da Anthropic em caso de recusa por política. */
  AI_REFUSAL_FALLBACK: boolish.default(true),

  // Banco (PostgreSQL / Supabase). Opcional: sem ele, usa armazenamento em memória (somente dev/instância única).
  DATABASE_URL: z.string().url().optional(),
  DATABASE_SSL: z.enum(["disable", "require", "verify-full"]).default("require"),
  /** Certificado CA (PEM) para verify-full. */
  DATABASE_CA_CERT: z.string().optional(),

  // Segurança
  /** Segredo para HMAC de identificadores (IP e cookies). Mínimo 32 caracteres. */
  APP_SECRET: z.string().min(32).optional(),
  /** Origens autorizadas a chamar a API (separadas por vírgula). */
  ALLOWED_ORIGINS: z.string().default(""),
  /** Confia no cabeçalho X-Forwarded-For (ex.: Vercel). */
  TRUST_PROXY: boolish.default(false),

  /** Segredo para o endpoint de expurgo agendado (Vercel Cron envia como Bearer). */
  CRON_SECRET: z.string().min(32).optional(),

  // Limites
  RATE_LIMIT_PER_MINUTE: z.coerce.number().int().min(1).max(600).default(8),
  RATE_LIMIT_PER_DAY: z.coerce.number().int().min(1).max(100000).default(120),
  GLOBAL_DAILY_MESSAGE_CAP: z.coerce.number().int().min(1).max(10_000_000).default(5000),
  MAX_MESSAGES_PER_SESSION: z.coerce.number().int().min(2).max(500).default(60),

  /** Permite armazenamento em memória em produção (NÃO recomendado: limites não são compartilhados). */
  ALLOW_IN_MEMORY_STORE: boolish.default(false),

  // Privacidade
  CONVERSATION_RETENTION_HOURS: z.coerce.number().int().min(1).max(24 * 90).default(24),
});

export type ServerEnv = z.infer<typeof EnvSchema>;

let cached: ServerEnv | null = null;

export function getEnv(): ServerEnv {
  if (cached) return cached;
  // Variáveis vazias (ex.: copiadas do .env.example) contam como não definidas.
  const raw = Object.fromEntries(Object.entries(process.env).filter(([, v]) => v !== undefined && v.trim() !== ""));
  const parsed = EnvSchema.safeParse(raw);
  if (!parsed.success) {
    // Mostra apenas os nomes das variáveis inválidas — nunca os valores.
    const names = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Configuração inválida nas variáveis: ${names}`);
  }
  const env = parsed.data;
  if (env.NODE_ENV === "production" && !env.APP_SECRET) {
    throw new Error("APP_SECRET é obrigatório em produção.");
  }
  if (env.NODE_ENV === "production" && !env.DATABASE_URL && !env.ALLOW_IN_MEMORY_STORE) {
    throw new Error("DATABASE_URL é obrigatório em produção (rate limiting e conversas compartilhados entre instâncias).");
  }
  cached = env;
  return env;
}

/** Apenas para testes. */
export function resetEnvCache(): void {
  cached = null;
}
