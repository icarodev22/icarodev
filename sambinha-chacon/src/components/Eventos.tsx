"use client";

import { useState } from "react";
import { CENTRAL_LINKS_URL, EDICOES, edicaoDestaque, type Edicao } from "@/config/site";
import { IconArrow, IconExpand, IconPin, IconTicket } from "./Icons";
import Lightbox from "./Lightbox";
import Titulo from "./Titulo";
import { Bandeirinhas } from "./Ornamentos";

function Card({ e, onAmpliar, i }: { e: Edicao; onAmpliar: () => void; i: number }) {
  const bloco = e.tema === "bloco";
  return (
    <article
      data-reveal
      style={{ ["--d" as string]: `${i * 90}ms` }}
      aria-labelledby={`ev-${e.id}`}
      className={`group relative flex w-[82vw] max-w-[380px] shrink-0 snap-center flex-col overflow-hidden rounded-[22px] border-[3px] border-navy shadow-bloco sm:w-[46vw] lg:w-full lg:max-w-none ${
        bloco ? "bg-sol" : "bg-white"
      }`}
    >
      {/* Arte oficial completa (sem corte) */}
      <button
        type="button"
        onClick={onAmpliar}
        className={`relative block aspect-[4/5] w-full overflow-hidden border-b-[3px] border-navy ${bloco ? "bg-[#F6B21A]" : "bg-ceu"}`}
        aria-label={`Ampliar arte oficial da edição ${e.dia} ${e.mes}`}
      >
        <img
          src={e.arte.srcSm}
          alt={e.arte.alt}
          width={e.arte.largura}
          height={e.arte.altura}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border-2 border-navy bg-white/95 text-navy opacity-90 shadow-bloco-sm" aria-hidden="true">
          <IconExpand className="h-[18px] w-[18px]" />
        </span>
      </button>

      {/* Canhoto do ingresso */}
      <div className="relative flex flex-1 flex-col p-5">
        <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border-[3px] border-navy bg-creme" aria-hidden="true" />
        <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full border-[3px] border-navy bg-creme" aria-hidden="true" />

        <div className="flex items-start gap-4">
          <div className={`flex shrink-0 flex-col items-center rounded-xl border-[3px] border-navy px-3 py-1.5 leading-none ${bloco ? "bg-royal text-sol" : "bg-navy text-sol"}`}>
            <span className="font-display text-[34px] font-extrabold">{e.dia}</span>
            <span className="mt-0.5 text-[13px] font-black tracking-[0.2em] text-white">{e.mes}</span>
          </div>
          <div className="min-w-0">
            {e.subtitulo && <p className={`text-[12px] font-extrabold uppercase tracking-[0.18em] ${bloco ? "text-vermelho-deep" : "text-vermelho"}`}>{e.subtitulo}</p>}
            <h3 id={`ev-${e.id}`} className="titulo mt-1 text-[26px] text-navy">
              {e.nome}
            </h3>
          </div>
        </div>

        {(e.cidade || e.local || e.horario) && (
          <ul className="mt-4 space-y-1.5 text-[15px] font-semibold text-navy">
            {e.local && (
              <li className="flex items-center gap-2">
                <IconPin className="h-4 w-4 shrink-0 text-vermelho" />
                {e.local}
              </li>
            )}
            {e.cidade && (
              <li className="flex items-center gap-2">
                <IconPin className="h-4 w-4 shrink-0 text-vermelho" />
                {e.cidade}
              </li>
            )}
            {e.horario && <li>{e.horario}</li>}
          </ul>
        )}

        <div className="mt-auto pt-5">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-navy/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-navy/80">
            <span className={`h-2 w-2 rounded-full ${e.aVenda ? "bg-verde-soft" : "bg-sol"}`} aria-hidden="true" />
            {e.aVenda ? "Ingressos à venda" : "Consulte nos canais oficiais"}
          </p>
          <a href="#ingressos" className={`btn w-full ${bloco ? "btn-claro" : "btn-sol"}`}>
            <IconTicket /> Acessar ingressos
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Eventos() {
  const [aberto, setAberto] = useState<number | null>(null);
  const itens = EDICOES.map((e) => ({
    src: e.arte.src,
    alt: e.arte.alt,
    largura: e.arte.largura,
    altura: e.arte.altura,
    legenda: `${e.nome}${e.subtitulo ? ` · ${e.subtitulo}` : ""} — ${e.dia} ${e.mes}`,
  }));

  return (
    <section id="eventos" aria-labelledby="eventos-titulo" className="relative overflow-hidden bg-creme py-16 sm:py-24">
      <Bandeirinhas className="absolute inset-x-0 top-0 h-9 w-full" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Titulo id="eventos-titulo" kicker="Agenda">
            Próximos eventos
          </Titulo>
          <div className="max-w-md lg:text-right" data-reveal>
            {!edicaoDestaque && <p className="titulo text-2xl text-vermelho">Confira a próxima edição</p>}
            <p className="mt-1 text-[15px] font-medium leading-relaxed text-navy/80">
              Cada edição tem sua arte e suas informações. Datas conforme as artes oficiais — consulte a disponibilidade nos canais de compra.
            </p>
            <a href={CENTRAL_LINKS_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-[0.12em] text-royal underline decoration-sol decoration-[3px] underline-offset-4 hover:text-navy">
              Canais oficiais <IconArrow />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl lg:px-6">
        <div
          className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 pt-1 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible lg:px-0"
          role="list"
          aria-label="Edições do Sambinha Chacon"
        >
          {EDICOES.map((e, i) => (
            <div role="listitem" key={e.id} className="flex">
              <Card e={e} i={i} onAmpliar={() => setAberto(i)} />
            </div>
          ))}
        </div>
        <p className="px-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-navy/50 lg:hidden" aria-hidden="true">
          Arraste para o lado →
        </p>
      </div>

      <Lightbox itens={itens} indice={aberto} onFechar={() => setAberto(null)} onIr={setAberto} />
    </section>
  );
}
