import { FAQ } from "@/config/site";
import { IconChevron } from "./Icons";
import Titulo from "./Titulo";

export default function Faq() {
  if (FAQ.length === 0) return null;
  return (
    <section id="duvidas" aria-labelledby="faq-titulo" className="bg-creme py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Titulo id="faq-titulo" kicker="Dúvidas">
            Perguntas frequentes
          </Titulo>
          <p data-reveal className="mt-4 max-w-sm text-[15px] font-medium text-navy/75">
            Respostas com base nas informações oficiais divulgadas. Mais detalhes de cada edição nos canais de compra.
          </p>
        </div>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <details
              key={f.pergunta}
              data-reveal
              style={{ ["--d" as string]: `${i * 60}ms` }}
              className="group rounded-2xl border-[3px] border-navy bg-white shadow-bloco-sm open:bg-white [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-extrabold text-navy">
                {f.pergunta}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sol text-navy transition-transform duration-300 group-open:rotate-90">
                  <IconChevron className="h-5 w-5" />
                </span>
              </summary>
              <p className="border-t-2 border-dashed border-navy/15 px-5 pb-5 pt-4 text-[16px] font-medium leading-relaxed text-navy/85">{f.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
