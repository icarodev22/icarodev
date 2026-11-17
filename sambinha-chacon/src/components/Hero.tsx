import { edicaoDestaque } from "@/config/site";
import { BotaoBilheteria, BotaoWhats } from "./BotoesCompra";
import { Flor } from "./Ornamentos";

const TITULO = "O nosso encontro tem samba, alegria e muita história pra viver.";
const APOIO = "Reúna sua turma e venha sentir a energia do Sambinha Chacon.";

/** Linha de data/horário/local — só aparece quando a edição destacada estiver confirmada. */
function LinhaEdicao({ grande = false }: { grande?: boolean }) {
  const e = edicaoDestaque;
  const base = grande ? "text-[clamp(13px,0.95vw,17px)]" : "text-[12px] tracking-[0.14em]";
  if (!e) {
    return (
      <a
        href="#eventos"
        className={`inline-flex items-center gap-3 font-extrabold uppercase tracking-[0.2em] text-navy hover:text-royal ${base}`}
      >
        <span className="h-[2px] w-5 shrink-0 bg-sol" aria-hidden="true" />
        <span className="whitespace-nowrap">Confira a próxima edição</span>
        <span className="h-[2px] w-5 shrink-0 bg-sol" aria-hidden="true" />
      </a>
    );
  }
  const partes = [`${e.dia} ${e.mes}${e.ano ? ` ${e.ano}` : ""}`, e.horario, e.local, e.cidade].filter(Boolean);
  return (
    <p className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-extrabold uppercase tracking-[0.16em] text-navy ${base}`}>
      {partes.map((p, i) => (
        <span key={i} className="flex items-center gap-3">
          {i > 0 && <span className="text-laranja" aria-hidden="true">✶</span>}
          {p}
        </span>
      ))}
    </p>
  );
}

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="relative pt-[var(--header-h)]">
      <h1 id="hero-titulo" className="sr-only">
        Sambinha Chacon — o nosso encontro tem samba
      </h1>
      {/* ===== CELULAR / TABLET: arte vertical em 3 faixas — topo, céu elástico e cenário ===== */}
      <div
        className="relative lg:hidden"
        style={{ backgroundImage: "url(/img/hero-m-band.png)", backgroundSize: "100% auto", backgroundRepeat: "repeat-y" }}
      >
        <img src="/img/hero-m-top.webp" alt="" width={941} height={225} className="block w-full" fetchPriority="high" />
        <div className="relative mx-auto flex max-w-[560px] flex-col items-center px-[9%] pb-2 pt-1 text-center sm:px-10">
          <img
            src="/img/logo-wordmark.webp"
            alt="Sambinha Chacon"
            width={725}
            height={518}
            className="w-[min(62vw,300px)] drop-shadow-[0_2px_0_rgba(255,255,255,0.6)]"
            fetchPriority="high"
          />
          <div className="my-3 flex items-center gap-3" aria-hidden="true">
            <span className="h-[3px] w-10 rounded-full bg-sol" />
            <Flor className="h-5 w-5" />
            <span className="h-[3px] w-10 rounded-full bg-sol" />
          </div>
          <p className="titulo text-balance text-[clamp(23px,6.6vw,34px)] text-navy">{TITULO}</p>
          <p className="mt-2.5 max-w-[34ch] text-balance text-[15px] font-medium leading-snug text-navy/85 sm:text-base">{APOIO}</p>
          <div className="mt-3.5">
            <LinhaEdicao />
          </div>
          <div className="mt-4 flex w-full max-w-[380px] flex-col gap-3">
            <BotaoWhats className="w-full px-3" />
            <BotaoBilheteria className="w-full px-3" />
          </div>
        </div>
        <img
          src="/img/hero-m-bottom.webp"
          alt="Ilustração: casal dançando samba numa rua de calçamento entre casarios coloridos de Recife, com coqueiros, cavaquinho e pandeiro."
          width={941}
          height={761}
          className="block w-full"
        />
      </div>

      {/* ===== COMPUTADOR: arte horizontal completa com conteúdo no céu ===== */}
      <div className="relative hidden lg:block">
        <img
          src="/img/hero-desktop.webp"
          srcSet="/img/hero-desktop-960.webp 960w, /img/hero-desktop.webp 1672w"
          sizes="100vw"
          alt="Ilustração: casal dançando samba numa rua de casarios coloridos de Recife, emoldurada por portas em arco, lampiões, coqueiros, cavaquinho e pandeiro."
          width={1672}
          height={941}
          className="block h-auto w-full"
          fetchPriority="high"
        />
        <div className="absolute inset-x-[17%] top-[10.5%] flex h-[52%] flex-col items-center justify-center text-center">
          <img
            src="/img/logo-wordmark.webp"
            alt="Sambinha Chacon"
            width={725}
            height={518}
            className="w-[13.2vw] drop-shadow-[0_2px_0_rgba(255,255,255,0.6)]"
          />
          <p className="titulo mt-[1.1vw] max-w-[30ch] text-balance text-[clamp(22px,2.25vw,44px)] text-navy">{TITULO}</p>
          <p className="mt-[0.6vw] text-[clamp(14px,1.05vw,20px)] font-medium text-navy/85">{APOIO}</p>
          <div className="mt-[0.8vw]">
            <LinhaEdicao grande />
          </div>
          <div className="mt-[1.1vw] flex items-center justify-center gap-[1vw]">
            <BotaoWhats className="min-h-[clamp(46px,3.3vw,62px)] whitespace-nowrap px-[1.3vw] text-[clamp(12.5px,0.95vw,17px)]" />
            <BotaoBilheteria className="min-h-[clamp(46px,3.3vw,62px)] whitespace-nowrap px-[1.3vw] text-[clamp(12.5px,0.95vw,17px)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
