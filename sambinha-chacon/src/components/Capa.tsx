"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BOTOES, MOMENTOS, eventosFuturos, type Evento } from "@/config/site";
import Lightbox from "./Lightbox";

type Aba = "inicio" | "momentos" | "eventos";
const ABAS: { id: Aba; rotulo: string; hash: string }[] = [
  { id: "inicio", rotulo: "Início", hash: "#inicio" },
  { id: "momentos", rotulo: "Momentos", hash: "#momentos" },
  { id: "eventos", rotulo: "Próximos eventos", hash: "#proximos-eventos" },
];
const abaDoHash = (h: string): Aba => ABAS.find((a) => a.hash === h)?.id ?? "inicio";

/* ---------- Ícones vetoriais ---------- */
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
const IconClose = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
const IconSeta = ({ esquerda = false }: { esquerda?: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={esquerda ? { transform: "rotate(180deg)" } : undefined}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);
const IconPlay = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

/* ---------- Hero ---------- */
function Nav({ aba, className = "" }: { aba: Aba; className?: string }) {
  return (
    <nav aria-label="Navegação" className={`entrada ${className}`}>
      <ul className="flex items-center justify-center gap-[0.2em]">
        {ABAS.map((a) => (
          <li key={a.id}>
            <a href={a.hash} aria-current={aba === a.id ? "page" : undefined} className={`nav-link ${aba === a.id ? "is-ativo" : ""}`}>
              {a.rotulo}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Logo oficial com fundo transparente (lettering + sol). Uma única aplicação, sem efeitos. */
function Logo({ className }: { className: string }) {
  return (
    <h1 className={`entrada ${className}`} style={{ animationDelay: "60ms" }}>
      <img src="/img/logo-sambinha-transparente.webp" alt="Sambinha Chacon" width={729} height={522} className="block h-auto w-full" fetchPriority="high" />
    </h1>
  );
}

function Botoes({ className }: { className: string }) {
  const { semTaxa, digitais } = BOTOES;
  return (
    <div className={className}>
      <div className="entrada" style={{ animationDelay: "140ms" }}>
        <a href={semTaxa.href} target="_blank" rel="noopener noreferrer" className="btn btn-verde">
          <IconWhats />
          <span>{semTaxa.rotulo}</span>
          <span className="sr-only">({semTaxa.destino}, abre em nova aba)</span>
        </a>
      </div>
      <div className="entrada" style={{ animationDelay: "220ms" }}>
        <a href={digitais.href} target="_blank" rel="noopener noreferrer" className="btn btn-vermelho">
          <IconTicket />
          <span>{digitais.rotulo}</span>
          <span className="sr-only">({digitais.destino}, abre em nova aba)</span>
        </a>
      </div>
    </div>
  );
}

/* ---------- Aba Momentos ---------- */
function Momentos({ onAbrir }: { onAbrir: (i: number) => void }) {
  const trilho = useRef<HTMLUListElement>(null);
  const rolar = (d: number) => {
    const el = trilho.current;
    if (!el) return;
    const item = el.querySelector("li");
    el.scrollBy({ left: d * ((item?.clientWidth ?? 240) + 12), behavior: "smooth" });
  };
  return (
    <div>
      <div className="relative">
        <ul ref={trilho} className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:-mx-7 sm:px-7" aria-label="Fotos e vídeos do Sambinha Chacon">
          {MOMENTOS.map((m, i) => (
            <li key={m.src} className="w-[68%] shrink-0 snap-start sm:w-[40%] lg:w-[calc((100%-36px)/4)]">
              <button type="button" onClick={() => onAbrir(i)} className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-marinho" aria-label={`Ampliar ${m.tipo === "video" ? "vídeo" : "foto"}: ${m.legenda}`}>
                <img
                  src={m.tipo === "video" ? m.poster ?? m.miniatura : m.miniatura}
                  alt={m.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ objectPosition: m.foco ?? "50% 50%" }}
                />
                {m.tipo === "video" && (
                  <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-marinho" aria-hidden="true">
                    <IconPlay />
                  </span>
                )}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-marinho-escuro/85 to-transparent px-3 pb-3 pt-10 text-left text-[13px] font-semibold text-white">
                  {m.legenda}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 hidden justify-end gap-2 lg:flex">
          <button type="button" onClick={() => rolar(-1)} className="ctrl" aria-label="Momentos anteriores">
            <IconSeta esquerda />
          </button>
          <button type="button" onClick={() => rolar(1)} className="ctrl" aria-label="Próximos momentos">
            <IconSeta />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Aba Próximos eventos ---------- */
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const dataPorExtenso = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
};

function ProximosEventos() {
  // Calculado no navegador, na data de hoje em São Paulo (a página é estática).
  const [lista, setLista] = useState<Evento[] | null>(null);
  useEffect(() => setLista(eventosFuturos()), []);

  if (lista === null) return <p className="py-6 text-marinho/60">Carregando…</p>;
  if (lista.length === 0) return <p className="py-8 text-center text-[19px] font-bold text-marinho">Novas datas em breve.</p>;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lista.map((e) => (
        <li key={e.id} className="flex overflow-hidden rounded-2xl bg-white ring-1 ring-marinho/10 sm:flex-col">
          <img src={e.arte.src} alt={e.arte.alt} width={e.arte.largura} height={e.arte.altura} loading="lazy" className="w-[38%] shrink-0 bg-ceu object-contain sm:aspect-[4/5] sm:w-full" />
          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-[17px] font-extrabold leading-tight text-marinho">{e.nome}</h3>
            <p className="mt-1 text-[14px] font-semibold text-vermelho">
              <time dateTime={e.data!}>{dataPorExtenso(e.data!)}</time>
            </p>
            {e.local && <p className="mt-0.5 text-[14px] text-marinho/80">{e.local}</p>}
            <a href={e.ingressos} target="_blank" rel="noopener noreferrer" className="btn btn-vermelho mt-auto [--btn-fs:14px] [--btn-h:48px]" style={{ marginTop: "auto" }}>
              <IconTicket />
              <span>Comprar ingressos</span>
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Painel (aba aberta sobre a capa) ---------- */
function Painel({ aba, onFechar, bloqueado, children }: { aba: Exclude<Aba, "inicio">; onFechar: () => void; bloqueado: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const titulo = ABAS.find((a) => a.id === aba)!.rotulo;

  useEffect(() => {
    ref.current?.querySelector<HTMLElement>("h2")?.focus();
  }, [aba]);

  useEffect(() => {
    if (bloqueado) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a[href],button");
        if (!f.length) return;
        if (e.shiftKey && (document.activeElement === f[0] || document.activeElement === ref.current.querySelector("h2"))) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bloqueado, onFechar]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button type="button" className="fundo-painel absolute inset-0 cursor-default bg-marinho-escuro/45" onClick={onFechar} aria-label="Fechar e voltar ao início" tabIndex={-1} />
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="painel-titulo" className="painel relative w-full max-w-[1100px] overflow-y-auto rounded-t-[28px] bg-creme px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-4 sm:px-7 lg:mb-6 lg:rounded-[28px]">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-marinho/15 lg:hidden" aria-hidden="true" />
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-7 rounded-full bg-vermelho" aria-hidden="true" />
            <h2 id="painel-titulo" tabIndex={-1} className="text-[22px] font-extrabold tracking-[-0.01em] text-marinho outline-none sm:text-[26px]">
              {titulo}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <nav aria-label="Abas" className="hidden sm:block">
              <ul className="flex gap-1">
                {ABAS.filter((a) => a.id !== "inicio").map((a) => (
                  <li key={a.id}>
                    <a href={a.hash} aria-current={aba === a.id ? "page" : undefined} className={`aba-link ${aba === a.id ? "is-ativo" : ""}`}>
                      {a.rotulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <button type="button" onClick={onFechar} className="ctrl" aria-label="Fechar e voltar ao início">
              <IconClose />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Página ---------- */
export default function Capa() {
  const [aba, setAba] = useState<Aba>("inicio");
  const [foto, setFoto] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => setAba(abaDoHash(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Trava a rolagem do fundo com a aba aberta
  useEffect(() => {
    if (aba === "inicio") return;
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = o;
    };
  }, [aba]);

  const fechar = useCallback(() => {
    history.pushState(null, "", "#inicio");
    setAba("inicio");
    setFoto(null);
  }, []);

  const itens = MOMENTOS.map((m) => ({ src: m.src, alt: m.alt, legenda: m.legenda, largura: m.largura, altura: m.altura, tipo: m.tipo, poster: m.poster }));

  return (
    <>
    <main className="capa" aria-hidden={aba !== "inicio" ? true : undefined}>
      <div className="preenchimento" aria-hidden="true" />

      {/* Telas horizontais: arte horizontal inteira */}
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
          <div className="absolute inset-x-[20%] top-[14.5%] flex h-[43%] flex-col items-center justify-center [--nav-fs:clamp(12px,0.95cqw,16px)]">
            <Nav aba={aba} />
            <Logo className="mt-[1.6cqw] w-[15cqw]" />
            <Botoes className="mt-[2.2cqw] flex items-center justify-center gap-[1.4cqw] [--btn-fs:clamp(14px,1.15cqw,20px)] [--btn-h:clamp(52px,3.9cqw,68px)]" />
          </div>
        </div>
      </div>

      {/* Telas verticais: arte vertical em 3 faixas */}
      <div className="layout-v">
        <div className="coluna-v">
          <img src="/img/hero-m-top.webp" alt="" width={941} height={225} className="block w-full" fetchPriority="high" />
          <div className="ceu-v flex flex-1 flex-col items-center justify-center px-[9%] pb-[5%] pt-[2%] [--nav-fs:12.5px]">
            <Nav aba={aba} />
            <Logo className="mt-[clamp(14px,3.5vh,28px)] w-[min(64%,290px)]" />
            <Botoes className="mt-[clamp(22px,5vh,40px)] flex w-full max-w-[330px] flex-col gap-3.5 [--btn-fs:16px] [--btn-h:56px]" />
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
      {aba !== "inicio" && (
        <Painel aba={aba} onFechar={fechar} bloqueado={foto !== null}>
          {aba === "momentos" ? <Momentos onAbrir={setFoto} /> : <ProximosEventos />}
        </Painel>
      )}
      <Lightbox itens={itens} indice={foto} onFechar={() => setFoto(null)} onIr={setFoto} />
    </>
  );
}
