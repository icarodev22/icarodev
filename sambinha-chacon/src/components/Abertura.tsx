"use client";

import { useEffect, useRef } from "react";

/**
 * Abertura (~1,5 s): o sol oficial da logo gira e desacelera; o lettering oficial
 * é revelado por máscara + opacidade; a logo completa se estabiliza e a tela sai.
 *
 * - Sol e lettering são duas camadas recortadas do MESMO arquivo oficial
 *   (logo-sol + logo-letras = logo original, pixel a pixel). Só o sol gira.
 * - Aparece só quando o <html> tem a classe "abertura" (definida no <head>:
 *   1º acesso da sessão e sem "movimento reduzido").
 * - A saída é 100% CSS: mesmo sem JavaScript, a tela some sozinha e libera a página.
 */
export default function Abertura() {
  const pular = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const raiz = document.documentElement;
    if (!raiz.classList.contains("abertura")) return;
    const encerrar = () => raiz.classList.remove("abertura");
    // a saída já é visual via CSS; a classe é limpa depois que a entrada da capa termina
    const t = window.setTimeout(encerrar, 2400);
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && encerrar();
    window.addEventListener("keydown", tecla);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", tecla);
    };
  }, []);

  return (
    <div className="abertura-tela">
      <div className="abertura-logo" role="img" aria-label="Sambinha Chacon">
        <span className="abertura-letras" />
        <span className="abertura-sol" />
      </div>
      <button
        ref={pular}
        type="button"
        className="abertura-pular"
        onClick={() => document.documentElement.classList.remove("abertura")}
      >
        Pular abertura
      </button>
    </div>
  );
}
