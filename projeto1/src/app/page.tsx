import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, PERSONALITY_SLUGS } from "@/content";
import { allCards } from "@/lib/catalog";
import { SearchBox } from "@/components/library/SearchBox";
import { HomeExperience } from "@/components/stage/HomeExperience";

const DEFAULT_SLUG = "albert-einstein";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { p } = await searchParams;
  const initial = typeof p === "string" && PERSONALITY_SLUGS.includes(p) ? p : DEFAULT_SLUG;
  const cards = allCards();

  return (
    <div className="museum-texture overflow-x-clip">
      <HomeExperience items={cards} categories={CATEGORIES.map((c) => ({ id: c.id, name: c.name }))} initial={initial} />

      <section aria-labelledby="explorar" className="mx-auto mt-20 max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/[0.06] bg-graphite/50 p-5 sm:p-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Simulação educacional com IA</p>
            <h2 id="explorar" className="mt-2 font-serif text-2xl text-ivory sm:text-3xl">Procure alguém para conversar</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              As respostas são geradas por inteligência artificial a partir de fontes de referência e indicam quando algo é incerto.
            </p>
            <div className="mt-5">
              <SearchBox items={cards} />
            </div>
          </div>
          <nav aria-label="Categorias">
            <ul className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/personalidades?categoria=${c.id}`}
                    className="inline-flex rounded-full border hairline bg-ink/60 px-3.5 py-1.5 text-sm text-stone transition-colors hover:border-bronze/50 hover:text-ivory"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/personalidades" className="inline-flex items-center gap-1 px-2 py-1.5 text-sm text-bronze hover:text-ivory">
                  Biblioteca <ArrowRight className="size-4" aria-hidden />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}
