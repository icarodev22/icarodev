"use client";

import { useState } from "react";
import { CENTRAL_LINKS_URL, edicoesComAtracoes, type Atracao } from "@/config/site";
import { IconArrow, IconExpand, IconPin } from "./Icons";
import Lightbox from "./Lightbox";
import Titulo from "./Titulo";
import { Coqueiro, Pandeiro, Sol } from "./Ornamentos";

const FUNDOS = ["bg-vermelho", "bg-royal", "bg-laranja", "bg-verde"];

function CardAtracao({ a, i, largo }: { a: Atracao; i: number; largo?: boolean }) {
  return (
    <li
      data-reveal
      style={{ ["--d" as string]: `${i * 80}ms` }}
      className={`group relative overflow-hidden rounded-[20px] border-[3px] border-navy-ink shadow-[5px_5px_0_0_#FFB800] ${
        a.destaque
          ? "col-span-2 aspect-[16/11] sm:col-span-3 sm:aspect-[16/9]"
          : largo
            ? "col-span-2 aspect-[16/10] sm:col-span-1 sm:aspect-[4/5]"
            : "aspect-[4/5]"
      } ${FUNDOS[i % FUNDOS.length]}`}
    >
      {a.imagem ? (
        <img
          src={a.imagem}
          alt={`${a.nome} – imagem da arte oficial da edição`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: a.foco ?? "50% 20%" }}
        />
      ) : (
        // Atração sem foto oficial: card gráfico com elementos da marca
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="listras-diag absolute inset-0 opacity-25" />
          <Sol className="absolute -right-8 -top-8 h-36 w-36 animate-girar opacity-90" />
          <Pandeiro className="absolute -bottom-6 -left-6 h-28 w-28 rotate-12" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-ink via-navy-ink/70 to-transparent px-4 pb-4 pt-14">
        <h3 className={`titulo text-white ${a.destaque ? "text-[clamp(28px,4vw,44px)]" : "text-[clamp(20px,2.2vw,28px)]"}`}>{a.nome}</h3>
      </div>
    </li>
  );
}

export default function Atracoes() {
  const [sel, setSel] = useState(0);
  const [arteAberta, setArteAberta] = useState<number | null>(null);
  const ed = edicoesComAtracoes[sel];

  return (
    <section id="atracoes" aria-labelledby="atracoes-titulo" className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
      <Coqueiro className="pointer-events-none absolute -left-10 bottom-0 h-72 w-52 opacity-40" cor="#1F4FD1" />
      <Coqueiro className="pointer-events-none absolute -right-8 top-10 h-64 w-44 -scale-x-100 opacity-30" cor="#1F4FD1" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Titulo id="atracoes-titulo" kicker="Line-up" claro>
            Atrações
          </Titulo>

          {edicoesComAtracoes.length > 1 && (
            <div role="tablist" aria-label="Escolha a edição" className="flex flex-wrap gap-2" data-reveal>
              {edicoesComAtracoes.map((e, i) => (
                <button
                  key={e.id}
                  role="tab"
                  type="button"
                  aria-selected={sel === i}
                  onClick={() => setSel(i)}
                  className={`min-h-[44px] rounded-full border-2 px-4 text-sm font-extrabold uppercase tracking-[0.1em] transition ${
                    sel === i ? "border-sol bg-sol text-navy" : "border-white/30 text-white hover:border-sol"
                  }`}
                >
                  {e.dia} {e.mes}
                </button>
              ))}
            </div>
          )}
        </div>

        {ed ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10" role={edicoesComAtracoes.length > 1 ? "tabpanel" : undefined}>
            {/* Arte oficial da edição */}
            <div data-reveal className="relative mx-auto w-full max-w-[320px] sm:max-w-[420px] lg:max-w-none">
              <div className="arco-sm relative overflow-hidden border-[3px] border-sol bg-royal p-2.5">
                <button
                  type="button"
                  onClick={() => setArteAberta(0)}
                  className="group relative block w-full overflow-hidden rounded-[190px_190px_10px_10px]"
                  aria-label={`Ampliar arte oficial da edição ${ed.dia} ${ed.mes}`}
                >
                  <img src={ed.arte.srcSm} alt={ed.arte.alt} width={ed.arte.largura} height={ed.arte.altura} loading="lazy" className="block h-auto w-full" />
                  <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full border-2 border-navy bg-white text-navy shadow-bloco-sm" aria-hidden="true">
                    <IconExpand className="h-[18px] w-[18px]" />
                  </span>
                </button>
              </div>
            </div>

            <div>
              <div data-reveal className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border-2 border-white/15 bg-white/5 px-5 py-4">
                <span className="rounded-lg bg-sol px-3 py-1 font-display text-2xl font-extrabold text-navy">
                  {ed.dia} {ed.mes}
                </span>
                <div>
                  <p className="font-display text-2xl font-extrabold leading-tight">
                    {ed.nome}
                    {ed.subtitulo && <span className="text-sol"> · {ed.subtitulo}</span>}
                  </p>
                  {(ed.cidade || ed.local) && (
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-white/80">
                      <IconPin className="h-4 w-4 text-sol" />
                      {[ed.local, ed.cidade].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </div>

              <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5" aria-label={`Atrações confirmadas – edição ${ed.dia} ${ed.mes}`}>
                {(() => {
                  const comuns = ed.atracoes.filter((a) => !a.destaque);
                  const ultimaComum = comuns[comuns.length - 1];
                  return ed.atracoes.map((a, i) => (
                    <CardAtracao key={a.nome} a={a} i={i} largo={comuns.length % 2 === 1 && a === ultimaComum} />
                  ));
                })()}
              </ul>
              <p className="mt-5 text-sm font-medium text-white/70">
                Atrações confirmadas na arte oficial desta edição. Line-up de outras edições será divulgado nos{" "}
                <a href={CENTRAL_LINKS_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-sol underline underline-offset-4">
                  canais oficiais<span className="sr-only"> (abre em nova aba)</span>
                </a>
                .
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-8 max-w-xl text-lg text-white/85">
            As atrações serão anunciadas em breve nos{" "}
            <a href={CENTRAL_LINKS_URL} className="font-bold text-sol underline" target="_blank" rel="noopener noreferrer">
              canais oficiais
            </a>
            . <IconArrow className="inline h-4 w-4" />
          </p>
        )}
      </div>

      {ed && (
        <Lightbox
          itens={[{ src: ed.arte.src, alt: ed.arte.alt, largura: ed.arte.largura, altura: ed.arte.altura, legenda: `${ed.nome} · ${ed.subtitulo ?? ""} — ${ed.dia} ${ed.mes}` }]}
          indice={arteAberta}
          onFechar={() => setArteAberta(null)}
          onIr={setArteAberta}
        />
      )}
    </section>
  );
}
