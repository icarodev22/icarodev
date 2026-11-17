"use client";
import { useEffect } from "react";

/** Ativa as animações de entrada (data-reveal). Sem JS ou com movimento reduzido, tudo aparece normalmente. */
export default function Reveal() {
  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mostrar = (el: Element) => el.classList.add("is-visible");
    if (!("IntersectionObserver" in window) || reduzido) {
      const tudo = () => document.querySelectorAll("[data-reveal]").forEach(mostrar);
      tudo();
      const mo = new MutationObserver(tudo);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }
    const io = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            mostrar(e.target);
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 }
    );
    const observar = () =>
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));
    observar();
    // Conteúdo que entra depois (ex.: troca de edição nas atrações)
    const mo = new MutationObserver(observar);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
