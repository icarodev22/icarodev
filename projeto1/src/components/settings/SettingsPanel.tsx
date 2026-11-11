"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { CheckCircle2, CircleAlert, Loader2, Trash2 } from "lucide-react";
import { LEVELS, LEVEL_LABELS, type Level } from "@/lib/chat-shared";
import {
  PREF_KEYS,
  clearPreferences,
  setPreference,
  useLevelPreference,
  useMotionPreference,
  useThemePreference,
  type MotionPref,
  type ThemePref,
} from "@/lib/preferences";

const LEVEL_HINTS: Record<Level, string> = {
  fundamental: "Frases curtas, exemplos do dia a dia e termos explicados.",
  medio: "Conceitos com exemplos, termos técnicos e fórmulas básicas.",
  superior: "Terminologia técnica, nuances e debates acadêmicos.",
  geral: "Linguagem acessível, sem pressupor formação específica.",
};

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  const id = useId();
  return (
    <section aria-labelledby={id} className="rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
      <h2 id={id} className="font-display text-xl text-fg">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Option({ name, value, checked, onChange, label, hint }: { name: string; value: string; checked: boolean; onChange: () => void; label: string; hint: string }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/70 ${
        checked ? "border-accent/50 bg-accent/[0.08]" : "border-line hover:border-line"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="mt-1 accent-accent" />
      <span>
        <span className="block text-sm text-fg">{label}</span>
        <span className="block text-xs text-muted">{hint}</span>
      </span>
    </label>
  );
}

export function SettingsPanel() {
  const level = useLevelPreference();
  const motion = useMotionPreference();
  const theme = useThemePreference();
  const [status, setStatus] = useState<{ ai: boolean; retentionHours: number } | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/status", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => !cancelled && setStatus(d))
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const deleteData = async () => {
    setDeleting(true);
    setResult(null);
    try {
      const r = await fetch("/api/me/data", { method: "DELETE", credentials: "same-origin" });
      if (!r.ok) throw new Error();
      const { removed } = (await r.json()) as { removed: number };
      try {
        for (const k of Object.keys(window.sessionStorage)) if (k.startsWith("p1:sessao:")) window.sessionStorage.removeItem(k);
      } catch {
        /* indisponível */
      }
      setResult({ ok: true, text: removed > 0 ? `${removed} conversa(s) apagada(s) e identificador deste navegador removido.` : "Não havia conversas salvas. O identificador deste navegador foi removido." });
    } catch {
      setResult({ ok: false, text: "Não foi possível apagar agora. Tente novamente em instantes." });
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <div className="mt-8 space-y-5">
      <Section title="Aparência" description="O tema escuro é o padrão da EPOCH.ia. Todas as opções seguem o contraste mínimo WCAG AA.">
        <fieldset>
          <legend className="sr-only">Tema</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {([
              ["escuro", "Escuro", "Padrão da marca, ideal para leitura longa."],
              ["claro", "Claro", "Fundo claro para ambientes iluminados."],
              ["sistema", "Seguir o sistema", "Acompanha a configuração do dispositivo."],
            ] as [ThemePref, string, string][]).map(([v, label, hint]) => (
              <Option key={v} name="tema" value={v} checked={theme === v} onChange={() => setPreference(PREF_KEYS.theme, v)} label={label} hint={hint} />
            ))}
          </div>
        </fieldset>
      </Section>

      <Section title="Nível de explicação" description="Usado como padrão ao abrir uma conversa. Ajusta a linguagem e a profundidade, não os fatos.">
        <fieldset>
          <legend className="sr-only">Nível de explicação padrão</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {LEVELS.map((l) => (
              <Option key={l} name="nivel" value={l} checked={level === l} onChange={() => setPreference(PREF_KEYS.level, l)} label={LEVEL_LABELS[l]} hint={LEVEL_HINTS[l]} />
            ))}
          </div>
        </fieldset>
      </Section>

      <Section title="Acessibilidade — animações" description="Movimentos dos retratos e transições da interface.">
        <fieldset>
          <legend className="sr-only">Preferência de animações</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {([
              ["sistema", "Seguir o sistema", "Respeita a configuração de movimento do seu dispositivo."],
              ["reduzidas", "Reduzir animações", "Desativa movimentos e transições decorativas."],
            ] as [MotionPref, string, string][]).map(([v, label, hint]) => (
              <Option key={v} name="animacoes" value={v} checked={motion === v} onChange={() => setPreference(PREF_KEYS.motion, v)} label={label} hint={hint} />
            ))}
          </div>
        </fieldset>
      </Section>

      <Section
        title="Privacidade e histórico"
        description={`As conversas são apagadas automaticamente após ${status ? `${status.retentionHours} hora(s)` : "o prazo de retenção"}. Você pode apagá-las agora.`}
      >
        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-fg transition-colors hover:border-danger/50 hover:text-danger active:scale-[0.97]"
          >
            <Trash2 className="size-4" aria-hidden /> Apagar minhas conversas
          </button>
        ) : (
          <div role="alertdialog" aria-label="Confirmar exclusão" className="rounded-xl border border-warn/40 bg-warn/10 p-4">
            <p className="text-sm text-fg/90">Todas as conversas feitas neste navegador serão apagadas do servidor. Esta ação não pode ser desfeita.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={deleteData}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-canvas hover:bg-accent disabled:opacity-60"
              >
                {deleting && <Loader2 className="size-4 animate-spin" aria-hidden />} Confirmar exclusão
              </button>
              <button type="button" onClick={() => setConfirming(false)} className="rounded-full px-4 py-2 text-sm text-muted hover:text-fg">
                Cancelar
              </button>
            </div>
          </div>
        )}
        <button type="button" onClick={clearPreferences} className="mt-3 block text-sm text-muted underline-offset-2 hover:text-fg hover:underline">
          Restaurar preferências padrão
        </button>
        <p role="status" className="mt-3 min-h-5 text-sm">
          {result && (
            <span className={`inline-flex items-center gap-1.5 ${result.ok ? "text-fg/90" : "text-danger"}`}>
              {result.ok ? <CheckCircle2 className="size-4 text-accent" aria-hidden /> : <CircleAlert className="size-4" aria-hidden />}
              {result.text}
            </span>
          )}
        </p>
      </Section>

      <Section title="Sobre a plataforma">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted">Inteligência artificial</dt>
          <dd className="text-fg/90">{status === null ? "verificando…" : status.ai ? "disponível" : "não configurada neste ambiente"}</dd>
          <dt className="text-muted">Idioma</dt>
          <dd className="text-fg/90">Português (Brasil) — único idioma disponível nesta versão</dd>
          <dt className="text-muted">Conta</dt>
          <dd className="text-fg/90">sem cadastro nesta versão; as preferências ficam neste navegador</dd>
          <dt className="text-muted">Entrada por voz</dt>
          <dd className="text-fg/90">não disponível nesta versão</dd>
        </dl>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li><Link className="text-accent hover:text-fg" href="/transparencia">Como funciona</Link></li>
          <li><Link className="text-accent hover:text-fg" href="/privacidade">Privacidade</Link></li>
          <li><Link className="text-accent hover:text-fg" href="/termos">Termos de uso</Link></li>
        </ul>
      </Section>
    </div>
  );
}
