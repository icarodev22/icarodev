import { CENTRAL_LINKS_URL, canalBilheteria, canalWhatsApp, whatsappConfigurado } from "@/config/site";
import { IconTicket, IconWhats } from "./Icons";
import { BotaoBilheteria, BotaoWhats } from "./BotoesCompra";
import FaixaOficial from "./FaixaOficial";
import Titulo from "./Titulo";

export default function Ingressos() {
  return (
    <section id="ingressos" aria-labelledby="ingressos-titulo" className="fundo-claro relative bg-amarelo">
      <FaixaOficial />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <Titulo id="ingressos-titulo" rotulo="Ingressos" centro sobreAmarelo>
          Garanta o seu e vem pro samba
        </Titulo>
        <p data-reveal className="mx-auto mt-4 max-w-xl text-center text-[17px] font-medium text-marinho">
          Escolha o canal oficial que for melhor pra você.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
          {/* Vendas sem taxa — o ÚNICO canal com a indicação "sem taxa" */}
          <article data-reveal aria-labelledby="canal-whats" className="flex flex-col rounded-[24px] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-verde text-white">
                <IconWhats className="h-6 w-6" />
              </span>
              <div>
                <h3 id="canal-whats" className="titulo text-[26px] text-marinho">
                  {canalWhatsApp.rotulo}
                </h3>
                <p className="rotulo text-[11px] text-verde">Atendimento pelo WhatsApp</p>
              </div>
            </div>
            <p className="mt-5 text-[17px] leading-snug text-marinho">Fale com a equipe e consulte os ingressos disponíveis.</p>
            <div className="mt-auto pt-6">
              <BotaoWhats className="w-full" />
              {!whatsappConfigurado && (
                <p className="mt-3 text-center text-[13px] text-marinho/70">Você será direcionado aos canais oficiais de atendimento.</p>
              )}
            </div>
          </article>

          {/* Vendas digitais — Bilheteria Digital */}
          <article data-reveal style={{ ["--d" as string]: "80ms" }} aria-labelledby="canal-bilheteria" className="flex flex-col rounded-[24px] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-vermelho text-white">
                <IconTicket className="h-6 w-6" />
              </span>
              <div>
                <h3 id="canal-bilheteria" className="titulo text-[26px] text-marinho">
                  {canalBilheteria.rotulo}
                </h3>
                <p className="rotulo text-[11px] text-vermelho">Bilheteria Digital</p>
              </div>
            </div>
            <p className="mt-5 text-[17px] leading-snug text-marinho">Consulte os ingressos e finalize sua compra na plataforma.</p>
            <div className="mt-auto pt-6">
              <BotaoBilheteria className="w-full" />
            </div>
          </article>
        </div>

        <p data-reveal className="mx-auto mt-8 max-w-2xl text-center text-[15px] text-marinho">
          Valores, lotes e disponibilidade são informados nos canais oficiais. Todos os canais em um só lugar:{" "}
          <a href={CENTRAL_LINKS_URL} target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-vermelho decoration-2 underline-offset-4">
            central de links<span className="sr-only"> (abre em nova aba)</span>
          </a>
          .
        </p>
      </div>
    </section>
  );
}
