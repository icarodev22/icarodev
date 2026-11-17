"use client";

import { useRef, useState } from "react";
import { EDICOES, GALERIA } from "@/config/site";
import { IconExpand } from "./Icons";
import Lightbox, { type ItemLightbox } from "./Lightbox";
import Titulo from "./Titulo";

type Aba = { id: string; rotulo: string; descricao: string; itens: (ItemLightbox & { srcSm: string })[] };

const ABAS: Aba[] = [
  {
    id: "fotos",
    rotulo: "Recordações",
    descricao: "Fotos das edições anteriores: palco, pista e a turma reunida.",
    itens: GALERIA.map((f) => ({ src: f.src, srcSm: f.srcSm, alt: f.alt, legenda: f.legenda, largura: f.largura, altura: f.altura })),
  },
  {
    id: "artes",
    rotulo: "Artes oficiais",
    descricao: "As artes de divulgação de cada edição.",
    itens: EDICOES.map((e) => ({
      src: e.arte.src,
      srcSm: e.arte.srcSm,
      alt: e.arte.alt,
      legenda: `${e.nome}${e.subtitulo ? ` · ${e.subtitulo}` : ""} — ${e.dia} ${e.mes}`,
      largura: e.arte.largura,
      altura: e.arte.altura,
    })),
  },
];

export default function Galeria() {
  const [aba, setAba] = useState(0);
  const [aberto, setAberto] = useState<number | null>(null);
  const abasRef = useRef<(HTMLButtonElement | null)[]>([]);
  const atual = ABAS[aba];

  const onTecla = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + ABAS.length) % ABAS.length;
    setAba(n);
    abasRef.current[n]?.focus();
  };

  return (
    <section id="recordacoes" aria-labelledby="galeria-titulo" className="fundo-claro relative bg-creme py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Titulo id="galeria-titulo" rotulo="Recordações">
            Quem vive, entende.
          </Titulo>

          <div role="tablist" aria-label="Escolha o que ver" className="flex w-full gap-1 rounded-full bg-white p-1.5 ring-1 ring-marinho/10 sm:w-auto sm:gap-2" data-reveal>
            {ABAS.map((a, i) => (
              <button
                key={a.id}
                ref={(el) => {
                  abasRef.current[i] = el;
                }}
                id={`aba-${a.id}`}
                role="tab"
                type="button"
                aria-selected={aba === i}
                aria-controls={`painel-${a.id}`}
                tabIndex={aba === i ? 0 : -1}
                onClick={() => setAba(i)}
                onKeyDown={(e) => onTecla(e, i)}
                className={`min-h-[44px] flex-1 whitespace-nowrap rounded-full px-3 text-[13px] font-bold uppercase tracking-[0.06em] sm:px-5 sm:text-[14px] transition-colors sm:flex-none ${
                  aba === i ? "bg-marinho text-white" : "text-marinho hover:bg-ceu"
                }`}
              >
                {a.rotulo}
                <span className={`ml-2 hidden text-[12px] min-[360px]:inline ${aba === i ? "text-amarelo" : "text-marinho/60"}`}>{a.itens.length}</span>
              </button>
            ))}
          </div>
        </div>

        <div id={`painel-${atual.id}`} role="tabpanel" aria-labelledby={`aba-${atual.id}`} tabIndex={0} className="mt-6 rounded-2xl">
          <p className="text-[15px] text-marinho/75">{atual.descricao} Toque para ampliar.</p>

          {/* Mosaico em colunas: cada imagem mantém a proporção original (sem cortar rostos) */}
          <ul className="mt-6 columns-2 gap-3 sm:gap-5 lg:columns-3">
            {atual.itens.map((f, i) => (
              <li key={f.src} className="mb-3 break-inside-avoid sm:mb-5">
                <button
                  type="button"
                  onClick={() => setAberto(i)}
                  className="group relative block w-full overflow-hidden rounded-[18px] bg-marinho"
                  aria-label={`Ampliar: ${f.legenda}`}
                >
                  <img
                    src={f.srcSm}
                    alt={f.alt}
                    width={f.largura}
                    height={f.altura}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-marinho-escuro/85 to-transparent px-3 pb-2.5 pt-10 text-left text-[13px] font-semibold text-white sm:text-sm">
                    {f.legenda}
                    <IconExpand className="h-4 w-4 shrink-0 text-amarelo" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Lightbox itens={atual.itens} indice={aberto} onFechar={() => setAberto(null)} onIr={setAberto} />
    </section>
  );
}
