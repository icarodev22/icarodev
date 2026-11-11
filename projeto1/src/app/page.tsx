import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, PERSONALITIES } from "@/content";
import { allCards, toCardData } from "@/lib/catalog";
import { SearchBox } from "@/components/library/SearchBox";
import { PersonalityCard } from "@/components/library/PersonalityCard";

export default function HomePage() {
  const featured = PERSONALITIES.filter((p) => p.featured).map(toCardData);
  const cards = allCards();
  const quick = PERSONALITIES.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="museum-texture">
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
        <p className="eyebrow">Simulação educacional com IA</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.1] text-ivory sm:text-5xl">
          Converse com quem mudou a história — e aprenda perguntando.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone">
          Escolha uma personalidade, faça perguntas, discorde e explore ideias. As respostas são geradas por
          inteligência artificial a partir de fontes de referência e indicam quando algo é incerto.
        </p>
        <div className="mt-7">
          <SearchBox items={cards} />
        </div>
        <nav aria-label="Categorias" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/personalidades?categoria=${c.id}`}
                  className="inline-flex rounded-full border hairline bg-graphite/70 px-3.5 py-1.5 text-sm text-stone transition-colors hover:border-bronze/50 hover:text-ivory"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section aria-labelledby="destaques" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="destaques" className="font-serif text-2xl text-ivory">Em destaque</h2>
          <Link href="/personalidades" className="inline-flex items-center gap-1 text-sm text-bronze hover:text-ivory">
            Ver as 18 personalidades <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {featured.map((p) => (
            <li key={p.slug} className="flex">
              <PersonalityCard p={p} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="comece" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 id="comece" className="font-serif text-2xl text-ivory">Comece com uma pergunta</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {quick.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/conversar/${p.slug}?pergunta=${encodeURIComponent(p.suggestedQuestions[0] ?? "")}`}
                className="flex h-full flex-col gap-2 rounded-xl border hairline bg-graphite/80 p-4 transition-colors hover:border-bronze/40"
              >
                <span className="text-xs uppercase tracking-[0.14em] text-bronze">{p.name}</span>
                <span className="font-serif text-lg leading-snug text-ivory">“{p.suggestedQuestions[0]}”</span>
                <span className="mt-auto inline-flex items-center gap-1 text-sm text-stone">
                  Perguntar <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
