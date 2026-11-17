"use client";

import { useState } from "react";
import { GALERIA } from "@/config/site";
import { IconExpand } from "./Icons";
import Lightbox from "./Lightbox";
import Titulo from "./Titulo";

export default function Galeria() {
  const [aberto, setAberto] = useState<number | null>(null);
  const itens = GALERIA.map((f) => ({ src: f.src, alt: f.alt, legenda: f.legenda, largura: f.largura, altura: f.altura }));

  return (
    <section id="galeria" aria-labelledby="galeria-titulo" className="relative bg-creme py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Titulo id="galeria-titulo" kicker="Galeria">
            Quem vive, entende.
          </Titulo>
          <p data-reveal className="max-w-sm text-[15px] font-medium text-navy/75 sm:text-right">
            Palco, pista e a turma reunida. Toque nas fotos para ampliar.
          </p>
        </div>

        {/* Mosaico em colunas: cada foto mantém sua proporção original (sem cortar rostos) */}
        <ul className="mt-10 columns-2 gap-3 sm:gap-5 lg:columns-3">
          {GALERIA.map((f, i) => (
            <li key={f.src} className="mb-3 break-inside-avoid sm:mb-5" data-reveal style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}>
              <button
                type="button"
                onClick={() => setAberto(i)}
                className="group relative block w-full overflow-hidden rounded-[18px] border-[3px] border-navy bg-navy shadow-bloco-sm"
                aria-label={`Ampliar foto: ${f.legenda}`}
              >
                <img
                  src={f.srcSm}
                  alt={f.alt}
                  width={f.largura}
                  height={f.altura}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-navy-ink/85 to-transparent px-3 pb-2.5 pt-10 text-left text-[13px] font-bold text-white sm:text-sm">
                  {f.legenda}
                  <IconExpand className="h-4 w-4 shrink-0 text-sol" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox itens={itens} indice={aberto} onFechar={() => setAberto(null)} onIr={setAberto} />
    </section>
  );
}
