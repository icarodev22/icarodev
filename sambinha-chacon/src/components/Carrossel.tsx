"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const Seta = ({ esquerda = false }: { esquerda?: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={esquerda ? { transform: "rotate(180deg)" } : undefined}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

/**
 * Carrossel horizontal acessível, sem reprodução automática.
 * - Celular: deslizar com o dedo (scroll-snap). Parte do próximo item fica visível.
 * - Desktop: setas discretas + setas do teclado quando o trilho está em foco.
 * - Ocupa a largura da tela sem gerar rolagem horizontal na página.
 */
export default function Carrossel({
  id,
  titulo,
  rotulo,
  children,
}: {
  id: string;
  titulo: string;
  /** Nome acessível do trilho (ex.: "Fotos e vídeos do Sambinha Chacon") */
  rotulo: string;
  children: React.ReactNode;
}) {
  const trilho = useRef<HTMLUListElement>(null);
  const [inicio, setInicio] = useState(true);
  const [fim, setFim] = useState(false);

  const atualizar = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    setInicio(el.scrollLeft <= 4);
    setFim(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    atualizar();
    const el = trilho.current;
    if (!el) return;
    el.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      el.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, [atualizar]);

  const passo = (d: number) => {
    const el = trilho.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(":scope > li");
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: d * ((item?.offsetWidth ?? el.clientWidth * 0.8) + gap), behavior: reduzido ? "auto" : "smooth" });
  };

  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="secao">
      <div className="secao-topo">
        <h2 id={`${id}-titulo`} className="secao-titulo">
          {titulo}
        </h2>
        <div className={`hidden gap-2 ${inicio && fim ? "" : "md:flex"}`}>
          <button type="button" className="seta" onClick={() => passo(-1)} disabled={inicio} aria-controls={`${id}-trilho`} aria-label={`${titulo}: anterior`}>
            <Seta esquerda />
          </button>
          <button type="button" className="seta" onClick={() => passo(1)} disabled={fim} aria-controls={`${id}-trilho`} aria-label={`${titulo}: próximo`}>
            <Seta />
          </button>
        </div>
      </div>
      <div role="region" aria-roledescription="carrossel" aria-label={rotulo}>
      <ul
        id={`${id}-trilho`}
        ref={trilho}
        className="trilho"
        tabIndex={0}
        aria-label={`${rotulo} — use as setas do teclado para navegar`}
        onKeyDown={(e) => {
          const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (!d) return;
          e.preventDefault();
          if (e.target === e.currentTarget) return passo(d);
          // Foco num item: vai para o item vizinho
          const li = (e.target as HTMLElement).closest("li");
          const viz = (d > 0 ? li?.nextElementSibling : li?.previousElementSibling) as HTMLElement | null;
          const alvo = viz?.querySelector<HTMLElement>("a,button");
          if (alvo) {
            alvo.focus({ preventScroll: true });
            viz!.scrollIntoView({ block: "nearest", inline: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
          }
        }}
      >
        {children}
      </ul>
      </div>
    </section>
  );
}
