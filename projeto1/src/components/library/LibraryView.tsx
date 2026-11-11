"use client";

import { useMemo, useState } from "react";
import type { CategoryId } from "@/content/types";
import type { PersonalityCardData } from "@/lib/catalog";
import { PersonalityCard } from "./PersonalityCard";

type Filter = CategoryId | "todas";

export function LibraryView({
  cards,
  categories,
  initial,
}: {
  cards: PersonalityCardData[];
  categories: { id: CategoryId; name: string; description: string }[];
  initial: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initial);
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    const n = q.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
    return cards.filter((c) => (filter === "todas" || c.category === filter) && (!n || c.searchText.includes(n)));
  }, [cards, filter, q]);

  const groups = categories
    .filter((c) => filter === "todas" || c.id === filter)
    .map((c) => ({ ...c, items: visible.filter((v) => v.category === c.id) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filtrar por categoria" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {[{ id: "todas" as const, name: "Todas" }, ...categories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                filter === c.id ? "border-bronze bg-umber/60 text-ivory" : "hairline bg-graphite/70 text-stone hover:text-ivory"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <label className="w-full md:w-72">
          <span className="sr-only">Filtrar por nome</span>
          <input
            type="search"
            value={q}
            maxLength={60}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filtrar por nome…"
            className="w-full rounded-lg border hairline bg-graphite px-3 py-2 text-sm text-ivory placeholder:text-stone/70 focus:border-bronze/60 focus:outline-none"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} personalidades exibidas.
      </p>

      {groups.length === 0 ? (
        <div className="mt-12 rounded-xl border hairline bg-graphite/60 p-8 text-center text-stone">
          Nenhuma personalidade corresponde à busca. Tente outro nome ou categoria.
        </div>
      ) : (
        groups.map((g) => (
          <section key={g.id} aria-labelledby={`cat-${g.id}`} className="mt-10">
            <div className="mb-4 flex items-baseline gap-3 border-b hairline pb-2">
              <h2 id={`cat-${g.id}`} className="font-serif text-2xl text-ivory">{g.name}</h2>
              <p className="text-sm text-stone">{g.description}</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {g.items.map((p) => (
                <li key={p.slug} className="flex">
                  <PersonalityCard p={p} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
