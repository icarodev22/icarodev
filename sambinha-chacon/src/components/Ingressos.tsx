import { BILHETERIA_URL, CENTRAL_LINKS_URL, canalWhatsApp, whatsappConfigurado } from "@/config/site";
import { IconArrow, IconTicket, IconWhats } from "./Icons";
import Titulo from "./Titulo";
import { Lampiao, Sol } from "./Ornamentos";

export default function Ingressos() {
  return (
    <section id="ingressos" aria-labelledby="ingressos-titulo" className="relative overflow-hidden bg-sol py-16 sm:py-24">
      <div className="listras absolute inset-x-0 top-0 h-3" aria-hidden="true" />
      <Sol className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 animate-girar opacity-25" />
      <Lampiao className="pointer-events-none absolute left-4 top-6 hidden h-24 w-16 sm:block" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Titulo id="ingressos-titulo" kicker="Ingressos" centro>
          Garanta o seu e vem pro samba
        </Titulo>
        <p data-reveal className="mx-auto mt-4 max-w-xl text-center text-[17px] font-semibold text-navy/85">
          Escolha o canal oficial que for melhor pra você.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {/* WhatsApp — o ÚNICO canal com a indicação "sem taxa" */}
          <article data-reveal aria-labelledby="canal-whats" className="relative flex flex-col overflow-hidden rounded-[26px] border-[3px] border-navy bg-white shadow-bloco">
            <div className="flex items-center justify-between gap-4 bg-verde px-6 py-5 text-white">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-white/40 bg-white/15">
                  <IconWhats className="h-7 w-7" />
                </span>
                <h3 id="canal-whats" className="titulo text-[28px] sm:text-[32px]">
                  WhatsApp
                </h3>
              </div>
              <span className="-rotate-3 whitespace-nowrap rounded-lg border-2 border-navy bg-sol px-3 py-1 text-sm font-black uppercase tracking-[0.12em] text-navy shadow-bloco-sm">
                Sem taxa
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-lg font-semibold leading-snug text-navy">Fale com a equipe e consulte os ingressos disponíveis.</p>
              <div className="mt-auto pt-6">
                <a href={canalWhatsApp.href} target="_blank" rel="noopener noreferrer" className="btn btn-whats w-full text-base">
                  <IconWhats /> {canalWhatsApp.rotuloBotao}
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
                {!whatsappConfigurado && (
                  <p className="mt-3 text-center text-[13px] font-medium text-navy/70">Você será direcionado à central de links oficial.</p>
                )}
              </div>
            </div>
          </article>

          {/* Bilheteria Digital */}
          <article data-reveal style={{ ["--d" as string]: "90ms" }} aria-labelledby="canal-bilheteria" className="relative flex flex-col overflow-hidden rounded-[26px] border-[3px] border-navy bg-white shadow-bloco">
            <div className="flex items-center gap-3 bg-vermelho px-6 py-5 text-white">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-white/40 bg-white/15">
                <IconTicket className="h-7 w-7" />
              </span>
              <h3 id="canal-bilheteria" className="titulo text-[28px] sm:text-[32px]">
                Bilheteria Digital
              </h3>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-lg font-semibold leading-snug text-navy">Consulte os ingressos e finalize sua compra na plataforma.</p>
              <div className="mt-auto pt-6">
                <a href={BILHETERIA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-bilheteria w-full text-base">
                  <IconTicket /> Ir para a Bilheteria Digital <IconArrow />
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </div>
            </div>
          </article>
        </div>

        <p data-reveal className="mx-auto mt-8 max-w-2xl text-center text-[15px] font-medium text-navy/80">
          Valores, lotes e disponibilidade são informados diretamente nos canais oficiais. Todos os canais em um só lugar:{" "}
          <a href={CENTRAL_LINKS_URL} target="_blank" rel="noopener noreferrer" className="font-extrabold text-navy underline decoration-vermelho decoration-[3px] underline-offset-4">
            central de links<span className="sr-only"> (abre em nova aba)</span>
          </a>
          .
        </p>
      </div>
    </section>
  );
}
