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
  type MotionPref,
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
    <section aria-labelledby={id} className="rounded-2xl border border-white/[0.06] bg-graphite/60 p-5 sm:p-6">
      <h2 id={id} className="font-serif text-xl text-ivory">{title}</h2>
      {description && <p className="mt-1 text-sm text-stone">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Option({ name, value, checked, onChange, label, hint }: { name: string; value: string; checked: boolean; onChange: () => void; label: string; hint: string }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-bronze/70 ${
        checked ? "border-bronze/50 bg-bronze/[0.08]" : "border-white/[0.06] hover:border-white/15"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="mt-1 accent-[#a68a68]" />
      <span>
        <span className="block text-sm text-ivory">{label}</span>
        <span className="block text-xs text-stone">{hint}</span>
      </span>
    </label>
  );
}

export function SettingsPanel() {
  const level = useLevelPreference();
  const motion = useMotionPreference();
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

      <Section title="Animações" description="Movimentos dos retratos e transições da interface.">
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
        title="Privacidade e dados"
        description={`As conversas são apagadas automaticamente após ${status ? `${status.retentionHours} hora(s)` : "o prazo de retenção"}. Você pode apagá-las agora.`}
      >
        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-ivory transition-colors hover:border-red-300/40 hover:text-red-200 active:scale-[0.97]"
          >
            <Trash2 className="size-4" aria-hidden /> Apagar minhas conversas
          </button>
        ) : (
          <div role="alertdialog" aria-label="Confirmar exclusão" className="rounded-xl border border-umber bg-umber/20 p-4">
            <p className="text-sm text-ivory/90">Todas as conversas feitas neste navegador serão apagadas do servidor. Esta ação não pode ser desfeita.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={deleteData}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-ink hover:bg-bronze disabled:opacity-60"
              >
                {deleting && <Loader2 className="size-4 animate-spin" aria-hidden />} Confirmar exclusão
              </button>
              <button type="button" onClick={() => setConfirming(false)} className="rounded-full px-4 py-2 text-sm text-stone hover:text-ivory">
                Cancelar
              </button>
            </div>
          </div>
        )}
        <button type="button" onClick={clearPreferences} className="mt-3 block text-sm text-stone underline-offset-2 hover:text-ivory hover:underline">
          Restaurar preferências padrão
        </button>
        <p role="status" className="mt-3 min-h-5 text-sm">
          {result && (
            <span className={`inline-flex items-center gap-1.5 ${result.ok ? "text-ivory/90" : "text-red-200"}`}>
              {result.ok ? <CheckCircle2 className="size-4 text-bronze" aria-hidden /> : <CircleAlert className="size-4" aria-hidden />}
              {result.text}
            </span>
          )}
        </p>
      </Section>

      <Section title="Sobre a plataforma">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-stone">Inteligência artificial</dt>
          <dd className="text-ivory/90">{status === null ? "verificando…" : status.ai ? "disponível" : "não configurada neste ambiente"}</dd>
          <dt className="text-stone">Entrada por voz</dt>
          <dd className="text-ivory/90">não disponível nesta versão</dd>
        </dl>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li><Link className="text-bronze hover:text-ivory" href="/transparencia">Como funciona</Link></li>
          <li><Link className="text-bronze hover:text-ivory" href="/privacidade">Privacidade</Link></li>
          <li><Link className="text-bronze hover:text-ivory" href="/termos">Termos de uso</Link></li>
        </ul>
      </Section>
    </div>
  );
}
