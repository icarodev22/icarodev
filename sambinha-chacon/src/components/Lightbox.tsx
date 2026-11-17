"use client";

import { useCallback, useEffect, useRef } from "react";
import { IconChevron, IconClose } from "./Icons";

export type ItemLightbox = { src: string; alt: string; legenda?: string; largura: number; altura: number };

export default function Lightbox({
  itens,
  indice,
  onFechar,
  onIr,
}: {
  itens: ItemLightbox[];
  indice: number | null;
  onFechar: () => void;
  onIr: (i: number) => void;
}) {
  const fecharRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const toque = useRef<number | null>(null);
  const aberto = indice !== null;
  const total = itens.length;

  const ir = useCallback(
    (d: number) => {
      if (indice === null) return;
      onIr((indice + d + total) % total);
    },
    [indice, total, onIr]
  );

  useEffect(() => {
    if (!aberto) return;
    const anterior = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    fecharRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
      else if (e.key === "ArrowRight") ir(1);
      else if (e.key === "ArrowLeft") ir(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      anterior?.focus();
    };
  }, [aberto, ir, onFechar]);

  // Pré-carrega as vizinhas
  useEffect(() => {
    if (indice === null || total < 2) return;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = itens[(indice + d + total) % total].src;
    });
  }, [indice, itens, total]);

  if (indice === null) return null;
  const item = itens[indice];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ${indice + 1} de ${total}: ${item.legenda ?? item.alt}`}
      className="fixed inset-0 z-[80] flex flex-col bg-marinho-escuro/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onFechar()}
      onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toque.current === null) return;
        const dx = e.changedTouches[0].clientX - toque.current;
        if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1);
        toque.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amarelo" aria-live="polite">
          {indice + 1} / {total}
        </p>
        <button
          ref={fecharRef}
          type="button"
          onClick={onFechar}
          className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/30 bg-white/10 transition hover:bg-white/20"
          aria-label="Fechar imagem ampliada"
        >
          <IconClose />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20" onClick={(e) => e.target === e.currentTarget && onFechar()}>
        <figure className="flex h-full max-h-full w-full flex-col items-center justify-center">
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            width={item.largura}
            height={item.altura}
            className="h-auto max-h-[calc(100svh-150px)] w-auto max-w-full rounded-lg object-contain shadow-2xl"
          />
          {item.legenda && <figcaption className="mt-3 px-4 text-center text-sm font-medium text-white/85">{item.legenda}</figcaption>}
        </figure>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => ir(-1)}
              className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-amarelo text-marinho transition-colors hover:bg-amarelo-claro sm:left-5"
              aria-label="Imagem anterior"
            >
              <IconChevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => ir(1)}
              className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-amarelo text-marinho transition-colors hover:bg-amarelo-claro sm:right-5"
              aria-label="Próxima imagem"
            >
              <IconChevron />
            </button>
          </>
        )}
      </div>
      <div className="h-4" />
    </div>
  );
}
