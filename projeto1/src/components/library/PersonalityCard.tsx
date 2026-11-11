import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { PersonalityCardData } from "@/lib/catalog";
import { Portrait } from "@/components/portrait/Portrait";

export function PersonalityCard({ p, headingLevel = 3 }: { p: PersonalityCardData; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-xl border hairline bg-graphite transition-colors hover:border-bronze/40">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Portrait data={p.portrait} sizes="(min-width: 768px) 33vw, 50vw" className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-ivory/15 bg-ink/70 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-stone backdrop-blur">
          {p.categoryName}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <H className="font-serif text-xl leading-tight text-ivory">{p.name}</H>
        <p className="text-xs text-bronze">
          {p.field} · <span className="text-stone">{p.periodLabel}</span>
        </p>
        <p className="line-clamp-3 text-sm leading-relaxed text-stone">{p.shortDescription}</p>
        <Link
          href={`/conversar/${p.slug}`}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-ivory/95 px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-bronze focus-visible:bg-bronze after:absolute after:inset-0 after:content-['']"
          aria-label={`Conversar com ${p.name}`}
        >
          <MessageCircle className="size-4" aria-hidden />
          Conversar
        </Link>
      </div>
    </article>
  );
}
