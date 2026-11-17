"use client";

import { useEffect } from "react";

/**
 * Camada de movimento — NÃO altera a aparência em repouso.
 *
 * 1) Capa: enquanto a pessoa rola a página, o cenário desliza um pouco mais devagar
 *    que o conteúdo (profundidade) e escurece suavemente para o azul da Agenda.
 *    Com a página no topo, tudo fica exatamente como a arte original (--y: 0; --p: 0).
 * 2) Revelações: elementos com [data-revelar] entram uma única vez (opacidade + 16px)
 *    ao aparecer na tela e terminam no seu estado original.
 *
 * Só usa transform/opacity, requestAnimationFrame e IntersectionObserver.
 * Com "movimento reduzido", nada se move e tudo aparece direto.
 */
export default function Movimento() {
  useEffect(() => {
    const raiz = document.documentElement;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    raiz.classList.add("mov-ativo");

    /* ---------- Revelações (uma vez) ---------- */
    const mostrar = (el: Element) => el.classList.add("revelado");
    let io: IntersectionObserver | null = null;
    const observar = () => {
      const alvos = document.querySelectorAll("[data-revelar]:not(.revelado)");
      if (reduzido || !("IntersectionObserver" in window)) return alvos.forEach(mostrar);
      alvos.forEach((el) => io!.observe(el));
    };
    if (!reduzido && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entradas) =>
          entradas.forEach((e) => {
            if (e.isIntersecting) {
              mostrar(e.target);
              io!.unobserve(e.target);
            }
          }),
        { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
      );
    }
    observar();
    // A Agenda é montada depois (data calculada no navegador): observa novos elementos
    const mo = new MutationObserver(observar);
    mo.observe(document.body, { childList: true, subtree: true });

    /* ---------- Capa: profundidade + transição para a Agenda ---------- */
    const capa = document.querySelector<HTMLElement>(".capa");
    let raf = 0;
    let visivel = true;
    const atualizar = () => {
      raf = 0;
      if (!capa) return;
      const h = capa.offsetHeight || 1;
      const s = Math.min(Math.max(window.scrollY, 0), h);
      capa.style.setProperty("--y", `${(s * 0.22).toFixed(1)}px`);
      capa.style.setProperty("--p", (s / h).toFixed(3));
      // no topo, nenhum transform é aplicado: a capa fica pixel a pixel igual à original
      capa.classList.toggle("rolando", s > 0);
    };
    const agendar = () => {
      if (visivel && !raf) raf = requestAnimationFrame(atualizar);
    };
    // pausa as animações contínuas do cenário fora da tela ou com a aba em segundo plano
    const pausar = () => raiz.classList.toggle("mov-pausado", document.hidden || !visivel);
    document.addEventListener("visibilitychange", pausar);
    let ioCapa: IntersectionObserver | null = null;
    if (capa && !reduzido) {
      ioCapa = new IntersectionObserver(([e]) => {
        visivel = e.isIntersecting;
        pausar();
        if (!visivel) {
          // fora da tela: fixa o estado final, sem trabalho contínuo
          capa.style.setProperty("--p", "1");
          capa.classList.add("rolando");
        } else agendar();
      });
      ioCapa.observe(capa);
      window.addEventListener("scroll", agendar, { passive: true });
      window.addEventListener("resize", agendar, { passive: true });
      atualizar();
    }

    return () => {
      io?.disconnect();
      mo.disconnect();
      ioCapa?.disconnect();
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      document.removeEventListener("visibilitychange", pausar);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
