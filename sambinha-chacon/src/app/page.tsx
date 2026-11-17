import { BOTOES } from "@/config/site";

/* Ícones vetoriais */
const IconWhats = () => (
  <svg viewBox="0 0 24 24" className="h-[1.35em] w-[1.35em] shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
  </svg>
);
const IconTicket = () => (
  <svg viewBox="0 0 24 24" className="h-[1.35em] w-[1.35em] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z" />
    <path d="M14 6v2m0 3v2m0 3v2" />
  </svg>
);

/** Logo oficial (lettering + sol, como aplicada na arte oficial). Uma única aplicação, sem efeitos. */
function Logo({ className }: { className: string }) {
  return (
    <h1 className={`entrada ${className}`}>
      <img src="/img/logo-wordmark.webp" alt="Sambinha Chacon" width={725} height={518} className="block h-auto w-full" fetchPriority="high" />
    </h1>
  );
}

function Botoes({ className }: { className: string }) {
  const { semTaxa, digitais } = BOTOES;
  return (
    <div className={className}>
      <div className="entrada" style={{ animationDelay: "120ms" }}>
        <a href={semTaxa.href} target="_blank" rel="noopener noreferrer" className="btn btn-verde">
          <IconWhats />
          <span>{semTaxa.rotulo}</span>
          <span className="sr-only">({semTaxa.destino}, abre em nova aba)</span>
        </a>
      </div>
      <div className="entrada" style={{ animationDelay: "200ms" }}>
        <a href={digitais.href} target="_blank" rel="noopener noreferrer" className="btn btn-vermelho">
          <IconTicket />
          <span>{digitais.rotulo}</span>
          <span className="sr-only">({digitais.destino}, abre em nova aba)</span>
        </a>
      </div>
    </div>
  );
}

export default function Capa() {
  return (
    <main className="capa">
      {/* Fundo de preenchimento: a própria arte, desfocada, só nas sobras da tela */}
      <div className="preenchimento" aria-hidden="true" />

      {/* ===== Telas horizontais: arte horizontal inteira (proporção preservada) ===== */}
      <div className="layout-h">
        <div className="palco-h">
          <img
            src="/img/hero-desktop.webp"
            srcSet="/img/hero-desktop-960.webp 960w, /img/hero-desktop.webp 1672w"
            sizes="100vw"
            alt="Ilustração oficial do Sambinha Chacon: casal dançando samba numa rua de casarios coloridos, com lampiões, coqueiros, cavaquinho e pandeiro."
            width={1672}
            height={941}
            className="absolute inset-0 h-full w-full"
            fetchPriority="high"
          />
          {/* Conteúdo no céu da arte, acima das árvores e longe dos personagens */}
          <div className="absolute inset-x-[20%] top-[16%] flex h-[40%] flex-col items-center justify-center">
            <Logo className="w-[15.5cqw]" />
            <Botoes className="mt-[2.4cqw] flex items-center justify-center gap-[1.4cqw] [--btn-fs:clamp(14px,1.15cqw,20px)] [--btn-h:clamp(52px,3.9cqw,68px)]" />
          </div>
        </div>
      </div>

      {/* ===== Telas verticais: arte vertical em 3 faixas (topo, céu elástico, cenário) ===== */}
      <div className="layout-v">
        <div className="coluna-v">
          <img src="/img/hero-m-top.webp" alt="" width={941} height={225} className="block w-full" fetchPriority="high" />
          <div className="ceu-v flex flex-1 flex-col items-center justify-center px-[11%] py-[5%]">
            <Logo className="w-[min(64%,300px)]" />
            <Botoes className="mt-[clamp(24px,6vh,44px)] flex w-full max-w-[330px] flex-col gap-3.5 [--btn-fs:16px] [--btn-h:56px]" />
          </div>
          <img
            src="/img/hero-m-bottom.webp"
            alt="Ilustração oficial do Sambinha Chacon: casal dançando samba numa rua de casarios coloridos, com coqueiros, cavaquinho e pandeiro."
            width={941}
            height={761}
            className="block w-full"
          />
        </div>
      </div>
    </main>
  );
}
