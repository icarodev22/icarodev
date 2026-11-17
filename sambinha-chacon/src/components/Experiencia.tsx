import { GALERIA } from "@/config/site";
import Titulo from "./Titulo";

const PILARES = [
  { t: "Samba ao vivo", d: "Roda, banda e repertório pra cantar do começo ao fim." },
  { t: "Sua turma reunida", d: "O encontro que junta os amigos e rende novas histórias." },
  { t: "Do jeito de Recife", d: "Alegria de rua, calor e aquela energia que só a gente tem." },
];

export default function Experiencia() {
  const [vertical, banda, galera] = [GALERIA[0], GALERIA[1], GALERIA[2]];
  return (
    <section id="experiencia" aria-labelledby="exp-titulo" className="fundo-claro relative overflow-hidden bg-ceu py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">
          <Titulo id="exp-titulo" rotulo="A experiência">
            Mais que uma festa, um encontro pra ficar na memória.
          </Titulo>
          <p data-reveal className="mt-5 max-w-xl text-[17px] leading-relaxed text-marinho/85 sm:text-lg">
            Samba, gente reunida e aquela vontade de cantar junto. O Sambinha Chacon é um convite para viver bons momentos e criar novas histórias com a sua turma.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {PILARES.map((p, i) => (
              <li key={p.t} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="rounded-2xl bg-white p-4 ring-1 ring-marinho/10">
                <span className="block h-1 w-8 rounded-full bg-vermelho" aria-hidden="true" />
                <p className="titulo mt-3 text-[19px] text-marinho">{p.t}</p>
                <p className="mt-1 text-sm leading-snug text-marinho/75">{p.d}</p>
              </li>
            ))}
          </ul>
          <a href="#recordacoes" className="btn btn-contorno mt-8">
            Ver recordações
          </a>
        </div>

        {/* Fotos reais + recorte da ilustração oficial */}
        <div className="relative mx-auto w-full max-w-[560px] lg:order-1" data-reveal>
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <figure className="col-span-7 overflow-hidden rounded-t-[999px] rounded-b-[18px] bg-marinho">
              <img src={vertical.srcSm} alt={vertical.alt} width={800} height={1067} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: "50% 30%" }} />
            </figure>
            <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
              <figure className="overflow-hidden rounded-[18px] bg-marinho">
                <img src={galera.srcSm} alt={galera.alt} width={800} height={1059} loading="lazy" className="aspect-[4/5] h-full w-full object-cover" style={{ objectPosition: "50% 35%" }} />
              </figure>
              <figure className="flex-1 overflow-hidden rounded-[18px] bg-ceu-medio">
                <img
                  src="/img/arte-cena-danca.webp"
                  alt=""
                  width={720}
                  height={421}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "45% 60%" }}
                />
              </figure>
            </div>
            <figure className="col-span-12 overflow-hidden rounded-[18px] bg-marinho">
              <img src={banda.srcSm} alt={banda.alt} width={800} height={533} loading="lazy" className="aspect-[16/8] w-full object-cover" style={{ objectPosition: "50% 45%" }} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
