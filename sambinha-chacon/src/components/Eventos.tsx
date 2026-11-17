"use client";

import { useState } from "react";
import { CENTRAL_LINKS_URL, EDICOES, edicaoDestaque, type Edicao } from "@/config/site";
import { IconArrow, IconExpand, IconPin, IconTicket } from "./Icons";
import Lightbox from "./Lightbox";
import Titulo from "./Titulo";

function Card({ e, onAmpliar, i }: { e: Edicao; onAmpliar: () => void; i: number }) {
  const bloco = e.tema === "bloco";
  return (
    <article
      data-reveal
      style={{ ["--d" as string]: `${i * 80}ms` }}
      aria-labelledby={`ev-${e.id}`}
      className="group flex w-[80vw] max-w-[360px] shrink-0 snap-center flex-col overflow-hidden rounded-[20px] bg-white ring-1 ring-marinho/10 sm:w-[44vw] lg:w-full lg:max-w-none"
    >
      <button
        type="button"
        onClick={onAmpliar}
        className={`relative block aspect-[4/5] w-full overflow-hidden ${bloco ? "bg-amarelo" : "bg-ceu"}`}
        aria-label={`Ampliar arte oficial da edição ${e.dia} ${e.mes}`}
      >
        <img
          src={e.arte.srcSm}
          alt={e.arte.alt}
          width={e.arte.largura}
          height={e.arte.altura}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
        <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-marinho" aria-hidden="true">
          <IconExpand className="h-[18px] w-[18px]" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-4">
          <div className="flex shrink-0 flex-col items-center rounded-xl bg-marinho px-3 py-2 leading-none text-white">
            <span className="titulo text-[30px] text-amarelo">{e.dia}</span>
            <span className="mt-1 text-[12px] font-bold tracking-[0.2em]">{e.mes}</span>
          </div>
          <div className="min-w-0">
            {e.subtitulo && <p className="rotulo text-[11px] text-vermelho">{e.subtitulo}</p>}
            <h3 id={`ev-${e.id}`} className="titulo mt-1 text-[22px] text-marinho">
              {e.nome}
            </h3>
          </div>
        </div>

        {(e.cidade || e.local || e.horario) && (
          <ul className="mt-4 space-y-1.5 text-[15px] font-medium text-marinho">
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
          <p className="mb-3 text-[13px] font-medium text-marinho/70">
            {e.aVenda ? "Ingressos à venda." : "Consulte a disponibilidade nos canais oficiais."}
          </p>
          <a href="#ingressos" className="btn btn-contorno w-full">
            <IconTicket /> Ver ingressos
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
    <section id="eventos" aria-labelledby="eventos-titulo" className="fundo-claro relative bg-creme py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Titulo id="eventos-titulo" rotulo="Agenda">
            Próximos eventos
          </Titulo>
          <div className="max-w-md lg:text-right" data-reveal>
            {!edicaoDestaque && <p className="titulo text-[22px] text-vermelho">Confira a próxima edição</p>}
            <p className="mt-1 text-[15px] leading-relaxed text-marinho/80">
              Cada edição tem sua arte e suas informações. Datas conforme as artes oficiais.
            </p>
            <a
              href={CENTRAL_LINKS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold uppercase tracking-[0.12em] text-royal underline decoration-amarelo decoration-2 underline-offset-4 hover:text-marinho"
            >
              Canais oficiais <IconArrow />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl lg:px-6">
        <ul
          className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0"
          aria-label="Edições do Sambinha Chacon"
        >
          {EDICOES.map((e, i) => (
            <li key={e.id} className="flex">
              <Card e={e} i={i} onAmpliar={() => setAberto(i)} />
            </li>
          ))}
        </ul>
        <p className="px-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-marinho/60 lg:hidden" aria-hidden="true">
          Arraste para o lado →
        </p>
      </div>

      <Lightbox itens={itens} indice={aberto} onFechar={() => setAberto(null)} onIr={setAberto} />
    </section>
  );
}
