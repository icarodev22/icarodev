"use client";

import { useEffect, useState } from "react";
import { canalBilheteria, canalWhatsApp } from "@/config/site";
import { IconTicket, IconWhats } from "./Icons";

/** Barra fixa inferior (celular/tablet). O body reserva o espaço (padding-bottom), então nada fica coberto. */
export default function BarraCompra() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t-4 border-amarelo bg-marinho px-3 pt-2.5 transition-transform duration-300 lg:hidden ${
        visivel ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
      aria-hidden={!visivel}
    >
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2.5">
        <a href={canalWhatsApp.href} target="_blank" rel="noopener noreferrer" tabIndex={visivel ? 0 : -1} className="btn btn-whats min-h-[50px] gap-2 px-3 text-[13px]">
          <IconWhats className="h-5 w-5 shrink-0" />
          <span>{canalWhatsApp.rotulo}</span>
          <span className="sr-only">({canalWhatsApp.destino}, abre em nova aba)</span>
        </a>
        <a href={canalBilheteria.href} target="_blank" rel="noopener noreferrer" tabIndex={visivel ? 0 : -1} className="btn btn-bilheteria min-h-[50px] gap-2 px-3 text-[13px]">
          <IconTicket className="h-5 w-5 shrink-0" />
          <span>{canalBilheteria.rotulo}</span>
          <span className="sr-only">({canalBilheteria.destino}, abre em nova aba)</span>
        </a>
      </div>
    </div>
  );
}
