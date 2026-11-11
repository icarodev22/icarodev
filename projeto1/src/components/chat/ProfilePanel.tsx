"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { ChatProfile } from "./types";

type Tab = "resumo" | "linha" | "fontes";

/** Informações biográficas compactas e complementares à conversa. */
export function ProfilePanel({ p }: { p: ChatProfile }) {
  const [tab, setTab] = useState<Tab>("resumo");
  const tabs: { id: Tab; label: string }[] = [
    { id: "resumo", label: "Resumo" },
    { id: "linha", label: "Linha do tempo" },
    { id: "fontes", label: "Fontes" },
  ];

  return (
    <div className="text-sm">
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-muted">
        <dt className="text-muted/70">Nascimento</dt>
        <dd className="text-fg/90">{p.born}</dd>
        <dt className="text-muted/70">Local</dt>
        <dd className="text-fg/90">{p.birthPlace}</dd>
        <dt className="text-muted/70">Morte</dt>
        <dd className="text-fg/90">{p.died}{p.deathPlace ? ` — ${p.deathPlace}` : ""}</dd>
      </dl>

      <div role="tablist" aria-label={`Informações sobre ${p.name}`} className="mt-4 flex gap-1 border-b hairline">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => {
              const i = tabs.findIndex((x) => x.id === tab);
              if (e.key === "ArrowRight") setTab(tabs[(i + 1) % tabs.length]!.id);
              if (e.key === "ArrowLeft") setTab(tabs[(i - 1 + tabs.length) % tabs.length]!.id);
            }}
            className={`-mb-px border-b-2 px-2.5 py-2 text-xs uppercase tracking-[0.12em] transition-colors ${
              tab === t.id ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-3 leading-relaxed text-muted">
        {tab === "resumo" && (
          <div className="space-y-3">
            <p>{p.historicalContext}</p>
            <div>
              <h3 className="mb-1 text-xs uppercase tracking-[0.12em] text-accent">Contribuições</h3>
              <ul className="list-disc space-y-1 pl-4 marker:text-accent/70">
                {p.contributions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-1 text-xs uppercase tracking-[0.12em] text-accent">Obras e marcos</h3>
              <p>{p.works.join(" · ")}</p>
            </div>
          </div>
        )}
        {tab === "linha" && (
          <ol className="relative space-y-2.5 border-l border-raised pl-4">
            {p.timeline.map((t) => (
              <li key={`${t.when}-${t.event}`} className="relative">
                <span aria-hidden className="absolute -left-[1.32rem] top-1.5 size-2 rounded-full bg-accent" />
                <span className="block text-xs font-medium text-accent">{t.when}</span>
                <span>{t.event}</span>
              </li>
            ))}
          </ol>
        )}
        {tab === "fontes" && (
          <div className="space-y-3">
            <ul className="space-y-2">
              {p.references.map((r) => (
                <li key={r.title + r.publisher}>
                  {r.url ? (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-start gap-1 text-fg/90 underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                    >
                      {r.title}
                      <ExternalLink className="mt-0.5 size-3 shrink-0" aria-hidden />
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                  ) : (
                    <span className="text-fg/90">{r.title}</span>
                  )}
                  <span className="block text-xs text-muted/80">{r.publisher}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted/70">
              Os textos de referência desta plataforma são sínteses editoriais baseadas nessas fontes e aguardam revisão de
              especialistas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
