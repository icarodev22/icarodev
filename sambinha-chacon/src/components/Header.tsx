"use client";

import { useEffect, useRef, useState } from "react";
import { MENU } from "@/config/site";
import { IconClose, IconTicket } from "./Icons";

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [ativo, setAtivo] = useState("#inicio");
  const botaoRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca o link da seção visível
  useEffect(() => {
    const secoes = MENU.map((m) => document.querySelector(m.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => e.isIntersecting && setAtivo(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secoes.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menu mobile: trava rolagem, ESC fecha, foco no painel
  useEffect(() => {
    if (!aberto) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    painelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botaoRef.current?.focus();
      }
      if (e.key === "Tab" && painelRef.current) {
        const foc = painelRef.current.querySelectorAll<HTMLElement>("a,button");
        const prim = foc[0];
        const ult = foc[foc.length - 1];
        if (e.shiftKey && document.activeElement === prim) {
          e.preventDefault();
          ult.focus();
        } else if (!e.shiftKey && document.activeElement === ult) {
          e.preventDefault();
          prim.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [aberto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b-4 border-amarelo bg-marinho text-white transition-shadow ${
        rolou ? "shadow-[0_8px_24px_-12px_rgba(2,31,79,0.6)]" : ""
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-amarelo focus:px-4 focus:py-2 focus:font-bold focus:text-marinho"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#inicio" className="flex shrink-0 items-center" aria-label="Sambinha Chacon – voltar ao início">
          {/* Logo oficial (versão circular) — sem efeitos, sem texto digitado ao lado */}
          <img src="/img/logo-badge-256.png" alt="" width={56} height={56} className="h-14 w-14" />
        </a>

        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1.5">
            {MENU.map((m) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  aria-current={ativo === m.href ? "location" : undefined}
                  className={`relative block whitespace-nowrap rounded-lg px-2 py-2 text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-amarelo xl:px-3 ${
                    ativo === m.href ? "text-amarelo" : "text-white/90"
                  }`}
                >
                  {m.rotulo}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-amarelo transition-transform duration-300 ${
                      ativo === m.href ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#ingressos" className="btn btn-amarelo min-h-[44px] whitespace-nowrap px-4 text-[13px] sm:px-5">
            <IconTicket className="h-[18px] w-[18px]" />
            <span className="hidden min-[380px]:inline">Comprar ingressos</span>
            <span className="min-[380px]:hidden">Ingressos</span>
          </a>
          <button
            ref={botaoRef}
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="grid h-11 w-11 place-items-center rounded-lg border-2 border-white/25 lg:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-[2.5px] w-5 rounded bg-white transition-transform ${aberto ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6px] h-[2.5px] w-5 rounded bg-white transition-opacity ${aberto ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[12px] h-[2.5px] w-5 rounded bg-white transition-transform ${aberto ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        ref={painelRef}
        hidden={!aberto}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-marinho lg:hidden"
      >
        <nav aria-label="Menu principal (celular)" className="px-5 pb-10 pt-4">
          <ul className="divide-y divide-white/10">
            {MENU.map((m, i) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  onClick={() => setAberto(false)}
                  className="titulo flex min-h-[56px] items-center justify-between py-3 text-[26px]"
                >
                  {m.rotulo}
                  <span className="text-sm font-bold text-amarelo" aria-hidden="true">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#ingressos" onClick={() => setAberto(false)} className="btn btn-amarelo mt-6 w-full">
            <IconTicket /> Comprar ingressos
          </a>
          <button
            type="button"
            onClick={() => {
              setAberto(false);
              botaoRef.current?.focus();
            }}
            className="mx-auto mt-6 flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-widest text-white/80"
          >
            <IconClose className="h-5 w-5" /> Fechar
          </button>
        </nav>
      </div>
    </header>
  );
}
