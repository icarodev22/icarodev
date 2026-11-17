import { edicaoDestaque } from "@/config/site";
import { BotaoBilheteria, BotaoWhats } from "./BotoesCompra";

const TITULO = "O nosso encontro tem samba, alegria e muita história pra viver.";
const APOIO = "Reúna sua turma e venha sentir a energia do Sambinha Chacon.";

/** Data/horário/local — só aparece quando a edição destacada estiver confirmada. */
function LinhaEdicao({ grande = false }: { grande?: boolean }) {
  const e = edicaoDestaque;
  const base = grande ? "text-[clamp(12px,0.9vw,16px)]" : "text-[12px]";
  if (!e) {
    return (
      <a
        href="#eventos"
        className={`inline-flex min-h-[44px] items-center gap-3 font-bold uppercase tracking-[0.18em] text-marinho underline decoration-amarelo decoration-2 underline-offset-[6px] hover:text-royal ${base}`}
      >
        Confira a próxima edição
      </a>
    );
  }
  const partes = [`${e.dia} ${e.mes}${e.ano ? ` ${e.ano}` : ""}`, e.horario, e.local, e.cidade].filter(Boolean);
  return (
    <p className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-bold uppercase tracking-[0.16em] text-marinho ${base}`}>
      {partes.map((p, i) => (
        <span key={i} className="flex items-center gap-3">
          {i > 0 && <span className="h-1.5 w-1.5 rounded-full bg-vermelho" aria-hidden="true" />}
          {p}
        </span>
      ))}
    </p>
  );
}

/**
 * Logo oficial: versão sem anel, como aplicada na arte oficial 07 NOV (lettering azul sobre o céu).
 * Sem sombra, contorno ou distorção. Área de proteção proposta: 20% da altura da logo em todos os lados.
 */
function Logo({ className }: { className: string }) {
  return (
    <img
      src="/img/logo-wordmark.webp"
      alt="Sambinha Chacon"
      width={725}
      height={518}
      className={`h-auto ${className}`}
      fetchPriority="high"
    />
  );
}

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="fundo-claro relative pt-[var(--header-h)]">
      <h1 id="hero-titulo" className="sr-only">
        Sambinha Chacon — o nosso encontro tem samba
      </h1>

      {/* ===== CELULAR / TABLET: arte vertical oficial em 3 faixas (topo, céu elástico, cenário) ===== */}
      <div
        className="relative lg:hidden"
        style={{ backgroundImage: "url(/img/hero-m-band.png)", backgroundSize: "100% auto", backgroundRepeat: "repeat-y" }}
      >
        <img src="/img/hero-m-top.webp" alt="" width={941} height={225} className="block w-full" fetchPriority="high" />
        <div className="relative mx-auto flex max-w-[520px] flex-col items-center px-[10%] pb-6 pt-[4vw] text-center sm:px-12">
          <div className="px-[4%] py-[2%]">
            <Logo className="w-[min(60vw,290px)]" />
          </div>
          <p className="titulo mt-5 text-balance text-[clamp(22px,6.2vw,32px)] text-marinho">{TITULO}</p>
          <p className="mt-3 max-w-[32ch] text-balance text-[16px] leading-snug text-marinho/85">{APOIO}</p>
          <div className="mt-2">
            <LinhaEdicao />
          </div>
          <div className="mt-3 flex w-full max-w-[340px] flex-col gap-3">
            <BotaoWhats className="w-full" />
            <BotaoBilheteria className="w-full" />
          </div>
        </div>
        <img
          src="/img/hero-m-bottom.webp"
          alt="Ilustração oficial: casal dançando samba numa rua de calçamento entre casarios coloridos, com coqueiros, cavaquinho e pandeiro."
          width={941}
          height={761}
          className="block w-full"
        />
      </div>

      {/* ===== COMPUTADOR: arte horizontal oficial completa; conteúdo restrito ao céu ===== */}
      <div className="relative hidden lg:block">
        <img
          src="/img/hero-desktop.webp"
          srcSet="/img/hero-desktop-960.webp 960w, /img/hero-desktop.webp 1672w"
          sizes="100vw"
          alt="Ilustração oficial: casal dançando samba numa rua de casarios coloridos, emoldurada por portas em arco, lampiões, coqueiros, cavaquinho e pandeiro."
          width={1672}
          height={941}
          className="block h-auto w-full"
          fetchPriority="high"
        />
        {/* Área do céu: entre as colunas e acima das copas das árvores */}
        <div className="absolute inset-x-[17%] top-[15.5%] flex h-[42%] flex-col items-center justify-start text-center">
          <Logo className="w-[10.5vw]" />
          <p className="titulo mt-[1.2vw] max-w-[28ch] text-balance text-[clamp(20px,1.9vw,38px)] text-marinho">{TITULO}</p>
          <p className="mt-[0.5vw] text-[clamp(14px,1vw,19px)] text-marinho/85">{APOIO}</p>
          <div className="mt-[0.3vw]">
            <LinhaEdicao grande />
          </div>
          <div className="mt-[0.5vw] flex items-center justify-center gap-[0.9vw]">
            <BotaoWhats className="min-h-[clamp(48px,3.2vw,60px)] whitespace-nowrap px-[1.6vw] text-[clamp(13px,0.92vw,17px)]" />
            <BotaoBilheteria className="min-h-[clamp(48px,3.2vw,60px)] whitespace-nowrap px-[1.6vw] text-[clamp(13px,0.92vw,17px)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
