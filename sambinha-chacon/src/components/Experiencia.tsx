import { GALERIA } from "@/config/site";
import Titulo from "./Titulo";
import { Cavaquinho, Folha, Pandeiro, Sol, SolLeque } from "./Ornamentos";

const PILARES = [
  { t: "Samba ao vivo", d: "Roda, banda e repertório pra cantar do começo ao fim." },
  { t: "Sua turma reunida", d: "O encontro que junta os amigos e rende novas histórias." },
  { t: "Do jeito de Recife", d: "Alegria de rua, calor e aquela energia que só a gente tem." },
];

export default function Experiencia() {
  const [vertical, banda, galera] = [GALERIA[0], GALERIA[1], GALERIA[2]];
  return (
    <section id="experiencia" aria-labelledby="exp-titulo" className="relative overflow-hidden bg-ceu py-16 sm:py-24">
      <Folha className="pointer-events-none absolute -left-6 top-6 hidden sm:block h-24 w-48 -rotate-12 opacity-90" />
      <Folha className="pointer-events-none absolute -right-8 bottom-10 h-24 w-48 rotate-[200deg] opacity-90" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Texto */}
        <div className="relative z-10 lg:order-2">
          <Titulo id="exp-titulo" kicker="A experiência">
            Mais que uma festa, um encontro pra ficar na memória.
          </Titulo>
          <p data-reveal className="mt-5 max-w-xl text-[17px] font-medium leading-relaxed text-navy/85 sm:text-lg">
            Samba, gente reunida e aquela vontade de cantar junto. O Sambinha Chacon é um convite para viver bons momentos e criar novas histórias com a sua turma.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {PILARES.map((p, i) => (
              <li
                key={p.t}
                data-reveal
                style={{ ["--d" as string]: `${i * 90}ms` }}
                className="rounded-2xl border-[3px] border-navy bg-white p-4 shadow-bloco-sm"
              >
                <Sol className="h-7 w-7" />
                <p className="mt-2 font-display text-xl font-extrabold leading-tight text-navy">{p.t}</p>
                <p className="mt-1 text-sm font-medium leading-snug text-navy/75">{p.d}</p>
              </li>
            ))}
          </ul>
          <a href="#galeria" className="btn btn-sol mt-8">
            Ver a galeria
          </a>
        </div>

        {/* Composição de fotos */}
        <div className="relative mx-auto w-full max-w-[560px] lg:order-1" data-reveal>
          <SolLeque className="absolute -top-10 left-1/2 z-0 h-20 w-40 -translate-x-1/2 sm:-top-12 sm:h-24 sm:w-48" />
          <div className="relative z-10 grid grid-cols-12 gap-3 sm:gap-4">
            <figure className="arco col-span-7 overflow-hidden border-[3px] border-navy bg-navy shadow-bloco">
              <img src={vertical.srcSm} alt={vertical.alt} width={800} height={1067} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: "50% 30%" }} />
            </figure>
            <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
              <figure className="overflow-hidden rounded-[18px] border-[3px] border-navy bg-navy shadow-bloco-sm">
                <img src={galera.srcSm} alt={galera.alt} width={800} height={1059} loading="lazy" className="aspect-[4/5] h-full w-full object-cover" style={{ objectPosition: "50% 35%" }} />
              </figure>
              <div className="listras flex-1 rounded-[18px] border-[3px] border-navy" aria-hidden="true" />
            </div>
            <figure className="col-span-12 overflow-hidden rounded-[18px] border-[3px] border-navy bg-navy shadow-bloco">
              <img src={banda.srcSm} alt={banda.alt} width={800} height={533} loading="lazy" className="aspect-[16/8] w-full object-cover" style={{ objectPosition: "50% 45%" }} />
            </figure>
          </div>
          <Pandeiro className="absolute -bottom-8 -right-4 z-20 h-24 w-24 animate-balanco sm:h-28 sm:w-28" />
          <Cavaquinho className="absolute -left-6 bottom-24 z-20 h-32 w-20 -rotate-12 sm:-left-10" />
        </div>
      </div>
    </section>
  );
}
