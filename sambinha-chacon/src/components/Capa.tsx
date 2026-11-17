"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BOTOES } from "@/config/site";
import { dataDestaque, proximasDatas, type Evento } from "@/lib/dados";

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
const IconPlay = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);
const IconPausa = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <rect x="6.5" y="5" width="4" height="14" rx="1" />
    <rect x="13.5" y="5" width="4" height="14" rx="1" />
  </svg>
);
const IconSeta = ({ esquerda = false }: { esquerda?: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={esquerda ? { transform: "rotate(180deg)" } : undefined}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);
const IconCasa = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M10 20v-6h4v6" />
  </svg>
);
const IconAgenda = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);
const IconPontos = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);

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
        <a href={semTaxa.href} target="_blank" rel="noopener noreferrer" className="btn btn-azul">
          <IconWhats />
          <span>{semTaxa.rotulo}</span>
          <span className="sr-only">({semTaxa.destino}, abre em nova aba)</span>
        </a>
      </div>
      <div className="entrada" style={{ animationDelay: "220ms" }}>
        <a href={digitais.href} target="_blank" rel="noopener noreferrer" className="btn btn-amarelo">
          <IconTicket />
          <span>{digitais.rotulo}</span>
          <span className="sr-only">({digitais.destino}, abre em nova aba)</span>
        </a>
      </div>
    </div>
  );
}



/* ---------- Menu ⋮ (canto superior direito) ---------- */
function MenuPontos() {
  const [aberto, setAberto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const botao = useRef<HTMLButtonElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const { semTaxa, digitais } = BOTOES;

  const fechar = (devolverFoco = true) => {
    setAberto(false);
    if (devolverFoco) botao.current?.focus();
  };

  useEffect(() => {
    if (!aberto) return;
    lista.current?.querySelector<HTMLElement>("a")?.focus();
    const fora = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) fechar(false);
    };
    const tecla = (e: KeyboardEvent) => {
      const itens = [...(lista.current?.querySelectorAll<HTMLElement>("a") ?? [])];
      const i = itens.indexOf(document.activeElement as HTMLElement);
      if (e.key === "Escape") {
        e.preventDefault();
        fechar();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        itens[(i + (e.key === "ArrowDown" ? 1 : -1) + itens.length) % itens.length]?.focus();
      } else if (e.key === "Tab") {
        fechar(false);
      }
    };
    document.addEventListener("pointerdown", fora);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", fora);
      document.removeEventListener("keydown", tecla);
    };
  }, [aberto]);

  const itens = [
    { href: "#inicio", rotulo: "Início", icone: <IconCasa />, externo: false },
    { href: "#agenda", rotulo: "Agenda", icone: <IconAgenda />, externo: false },
    { href: semTaxa.href, rotulo: semTaxa.rotulo, icone: <IconWhats />, externo: true, extra: semTaxa.destino },
    { href: digitais.href, rotulo: digitais.rotulo, icone: <IconTicket />, externo: true, extra: digitais.destino },
  ];

  return (
    <div ref={raiz} className="menu-pontos">
      <button
        ref={botao}
        type="button"
        className="menu-botao"
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={aberto}
        aria-controls="menu-pontos-lista"
        onClick={() => setAberto((v) => !v)}
      >
        <IconPontos />
      </button>
      {aberto && (
        <nav aria-label="Menu">
          <ul id="menu-pontos-lista" ref={lista} className="menu-lista">
            {itens.map((it, k) => (
              <li key={it.rotulo}>
                {k === 2 && <div className="menu-sep" aria-hidden="true" />}
                <a
                  href={it.href}
                  className={`menu-item ${k === 2 ? "is-whats" : k === 3 ? "is-online" : ""}`}
                  onClick={() => fechar(false)}
                  {...(it.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="menu-icone">{it.icone}</span>
                  <span>{it.rotulo}</span>
                  {it.externo && <span className="sr-only">({it.extra}, abre em nova aba)</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

/* ---------- Agenda ---------- */
function CardEvento({ e }: { e: Evento }) {
  const d = dataDestaque(e);
  return (
    <article className="evento" aria-labelledby={`ev-${e.id}`}>
      <div className="evento-cartaz">
        <img src={e.imagem} alt={e.imagemAlt} width={e.imagemLargura} height={e.imagemAltura} loading="lazy" decoding="async" />
      </div>
      <div className="evento-info">
        <p className="evento-data">
          <time dateTime={e.horario ? `${e.data}T${e.horario}` : e.data}>
            <span className="evento-dia">{d.dia}</span>
            <span className="evento-mes">
              {d.mes} {d.ano}
              <span className="evento-semana">
                {d.semana}
                {d.hora ? ` · ${d.hora}` : ""}
              </span>
            </span>
          </time>
        </p>
        <h3 id={`ev-${e.id}`} className="evento-nome">
          {e.titulo}
        </h3>
        {e.local && <p className="evento-local">{e.local}</p>}
        <div className="evento-acao">
        <a href={e.linkCompra} target="_blank" rel="noopener noreferrer" className="btn btn-amarelo evento-btn">
          <IconTicket />
          <span>Comprar ingressos</span>
          <span className="sr-only">para {e.titulo} (abre em nova aba)</span>
        </a>
        </div>
      </div>
    </article>
  );
}

/** Carrossel rotativo: avança sozinho para a direita e volta ao primeiro no fim.
 *  Pausa ao tocar, passar o mouse ou focar; tem botão de pausar; não gira com "movimento reduzido". */
const INTERVALO = 5000;

function CarrosselAgenda({ datas }: { datas: Evento[] }) {
  const trilho = useRef<HTMLUListElement>(null);
  const [atual, setAtual] = useState(0);
  const [pausadoUsuario, setPausadoUsuario] = useState(false);
  const [emUso, setEmUso] = useState(false);
  const [reduzido, setReduzido] = useState(false);
  const n = datas.length;
  const rotativo = n > 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setReduzido(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  const ir = useCallback(
    (i: number) => {
      const el = trilho.current;
      if (!el) return;
      const alvo = ((i % n) + n) % n;
      const li = el.children[alvo] as HTMLElement | undefined;
      if (!li) return;
      el.scrollTo({ left: li.offsetLeft - el.offsetLeft - (el.clientWidth - li.offsetWidth) / 2, behavior: reduzido ? "auto" : "smooth" });
    },
    [n, reduzido]
  );

  // Descobre o slide atual pela rolagem (deslize manual, setas ou rotação)
  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const onScroll = () => {
      const centro = el.scrollLeft + el.clientWidth / 2;
      let melhor = 0;
      let dist = Infinity;
      [...el.children].forEach((c, i) => {
        const li = c as HTMLElement;
        const d = Math.abs(li.offsetLeft - el.offsetLeft + li.offsetWidth / 2 - centro);
        if (d < dist) {
          dist = d;
          melhor = i;
        }
      });
      setAtual(melhor);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const girando = rotativo && !pausadoUsuario && !emUso && !reduzido;
  useEffect(() => {
    if (!girando) return;
    const t = window.setTimeout(() => ir(atual + 1), INTERVALO);
    return () => window.clearTimeout(t);
  }, [girando, atual, ir]);

  return (
    <div
      className="carrossel-agenda"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Agenda do Sambinha Chacon"
      onPointerEnter={(e) => e.pointerType === "mouse" && setEmUso(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setEmUso(false)}
      onTouchStart={() => setEmUso(true)}
      onTouchEnd={() => window.setTimeout(() => setEmUso(false), 4000)}
      onFocus={() => setEmUso(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setEmUso(false)}
    >
      <ul ref={trilho} className={`agenda-trilho ${rotativo ? "" : "is-unico"}`} aria-live={girando ? "off" : "polite"}>
        {datas.map((e, i) => (
          <li key={e.id} aria-roledescription="slide" aria-label={`${i + 1} de ${n}`} className={i === atual ? "is-atual" : ""}>
            <CardEvento e={e} />
          </li>
        ))}
      </ul>
      {rotativo && (
        <div className="agenda-controles">
          <button type="button" className="ag-ctrl" onClick={() => ir(atual - 1)} aria-label="Evento anterior">
            <IconSeta esquerda />
          </button>
          <div className="ag-pontos">
            {datas.map((e, i) => (
              <button
                key={e.id}
                type="button"
                className={`ag-ponto ${i === atual ? "is-atual" : ""}`}
                onClick={() => ir(i)}
                aria-label={`Ir para ${e.titulo}`}
                aria-current={i === atual ? "true" : undefined}
              />
            ))}
          </div>
          <button type="button" className="ag-ctrl" onClick={() => ir(atual + 1)} aria-label="Próximo evento">
            <IconSeta />
          </button>
          {!reduzido && (
            <button type="button" className="ag-ctrl" onClick={() => setPausadoUsuario((v) => !v)} aria-label={pausadoUsuario ? "Retomar rotação" : "Pausar rotação"}>
              {pausadoUsuario ? <IconPlay /> : <IconPausa />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Agenda() {
  // Calculado no navegador com a data/hora atual de São Paulo (a página é estática).
  const [datas, setDatas] = useState<Evento[] | null>(null);
  useEffect(() => setDatas(proximasDatas()), []);
  return (
    <section id="agenda" aria-labelledby="agenda-titulo" className="agenda">
      <h2 id="agenda-titulo" className="secao-titulo">
        Agenda
      </h2>
      {datas === null ? null : datas.length === 0 ? (
        <p className="agenda-vazia">Novas datas em breve.</p>
      ) : (
        <CarrosselAgenda datas={datas} />
      )}
    </section>
  );
}

/* ---------- Página ---------- */
export default function Capa() {
  return (
    <>
      <MenuPontos />
      <main id="inicio" tabIndex={-1} className="relative outline-none">
        {/* ===================== HERO ===================== */}
        <header className="capa">
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
              <div className="absolute inset-x-[18%] top-[15%] flex h-[42%] flex-col items-center justify-center">
                <Logo className="w-[15.5cqw]" />
                <Botoes className="mt-[2.4cqw] grid w-[clamp(560px,42cqw,700px)] grid-cols-2 gap-3 [--btn-fs:clamp(15px,1.1cqw,18px)]" />
              </div>
            </div>
          </div>

          {/* Telas verticais: arte vertical em 3 faixas */}
          <div className="layout-v">
            <div className="coluna-v">
              <img src="/img/hero-m-top.webp" alt="" width={941} height={225} className="block w-full" fetchPriority="high" />
              <div className="ceu-v flex flex-1 flex-col items-center justify-center px-[9%] py-2">
                <Logo className="logo-v" />
                <Botoes className="mt-[clamp(16px,3vh,32px)] flex w-full max-w-[340px] flex-col gap-3 [--btn-fs:16px]" />
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
        </header>

        <div className="faixa-oficial" aria-hidden="true" />
        <Agenda />
        <div className="faixa-oficial" aria-hidden="true" />
      </main>
    </>
  );
}
