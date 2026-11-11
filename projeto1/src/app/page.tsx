import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND, CATEGORIES, PERSONALITIES, PERSONALITY_SLUGS } from "@/content";
import { allCards } from "@/lib/catalog";
import { SearchBox } from "@/components/library/SearchBox";
import { PersonalityCard } from "@/components/library/PersonalityCard";
import { FeaturedStage } from "@/components/stage/FeaturedStage";

const DEFAULT_SLUG = "albert-einstein";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { p } = await searchParams;
  const initial = typeof p === "string" && PERSONALITY_SLUGS.includes(p) ? p : DEFAULT_SLUG;
  const cards = allCards();
  const featured = cards.filter((c) => PERSONALITIES.find((x) => x.slug === c.slug)?.featured && c.slug !== initial).slice(0, 4);

  return (
    <div className="epoch-backdrop overflow-x-clip">
      {/* Abertura */}
      <section aria-labelledby="titulo" className="mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <p className="eyebrow">
          <span className="normal-case tracking-normal">{BRAND.name}</span> · {BRAND.tagline}
        </p>
        <h1 id="titulo" className="mt-4 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-6xl">
          Grandes mentes.<br />
          <span className="text-accent">Novas perspectivas.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-[1.05rem]">
          Converse com representações digitais educacionais de pessoas que transformaram a ciência, a filosofia, a música e a
          história. Pergunte, questione e aprenda em diálogo.
        </p>
        <div className="mt-7">
          <SearchBox items={cards} />
        </div>
        <nav aria-label="Categorias" className="mt-5">
          <ul className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/personalidades?categoria=${c.id}`}
                  className="inline-flex rounded-full border hairline bg-surface/70 px-3.5 py-1.5 text-sm text-muted transition-colors duration-[140ms] hover:border-accent/50 hover:text-fg"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <div aria-hidden className="epoch-timeline mx-auto max-w-6xl" />

      {/* Personalidade em destaque */}
      <div className="pb-6 pt-6">
        <p className="mx-auto max-w-6xl px-4 eyebrow sm:px-6">Em destaque</p>
        <FeaturedStage p={cards.find((c) => c.slug === initial)!} />
      </div>

      {/* Outros destaques */}
      <section aria-labelledby="mais" className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="mais" className="font-display text-2xl font-semibold text-fg">Para começar</h2>
          <Link href="/personalidades" className="inline-flex items-center gap-1 text-sm text-accent hover:text-fg">
            Biblioteca completa <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((c) => (
            <li key={c.slug} className="flex">
              <PersonalityCard p={c} />
            </li>
          ))}
        </ul>
      </section>

      {/* Seis categorias */}
      <section aria-labelledby="categorias" className="mx-auto mt-16 max-w-6xl px-4 pb-16 sm:px-6">
        <h2 id="categorias" className="font-display text-2xl font-semibold text-fg">Seis caminhos para explorar</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <li key={c.id}>
              <Link
                href={`/personalidades?categoria=${c.id}`}
                className="group flex h-full flex-col gap-2 rounded-2xl border hairline bg-surface p-5 transition-[border-color,transform] duration-[220ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-0.5 hover:border-accent/50"
              >
                <span className="font-display text-xs tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg font-semibold text-fg">{c.name}</span>
                <span className="text-sm text-muted">{c.description}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm text-muted transition-colors group-hover:text-accent">
                  {cards.filter((x) => x.category === c.id).length} personalidades <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
