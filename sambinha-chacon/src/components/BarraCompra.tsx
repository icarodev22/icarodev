"use client";

import { useEffect, useState } from "react";
import { BILHETERIA_URL, canalWhatsApp } from "@/config/site";
import { IconTicket, IconWhats } from "./Icons";

/** Barra fixa inferior (celular/tablet) com os dois canais. O body tem padding-bottom equivalente, então nada fica coberto. */
export default function BarraCompra() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-navy bg-creme/95 px-3 pt-2.5 backdrop-blur transition-transform duration-300 lg:hidden ${
        visivel ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
      aria-hidden={!visivel}
    >
      <p className="sr-only">Comprar ingressos</p>
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2.5">
        <a
          href={canalWhatsApp.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visivel ? 0 : -1}
          className="btn btn-whats min-h-[52px] gap-2 rounded-xl border-2 px-2 text-[13px] shadow-[3px_3px_0_0_#13256B]"
        >
          <IconWhats className="h-5 w-5 shrink-0" />
          <span className="leading-tight">{canalWhatsApp.rotuloCurto}</span>
        </a>
        <a
          href={BILHETERIA_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visivel ? 0 : -1}
          className="btn btn-bilheteria min-h-[52px] gap-2 rounded-xl border-2 px-2 text-[13px] shadow-[3px_3px_0_0_#13256B]"
        >
          <IconTicket className="h-5 w-5 shrink-0" />
          <span className="leading-tight">Bilheteria Digital</span>
        </a>
      </div>
    </div>
  );
}
