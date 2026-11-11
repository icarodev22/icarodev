"use client";

import { useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { PersonalityCardData } from "@/lib/catalog";

function norm(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

/** Busca rápida com combobox acessível (setas, Enter, Esc). */
export function SearchBox({ items }: { items: PersonalityCardData[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const listId = useId();

  const results = useMemo(() => {
    const n = norm(q);
    if (!n) return [];
    return items.filter((i) => i.searchText.includes(n)).slice(0, 6);
  }, [q, items]);

  const go = (slug: string) => router.push(`/conversar/${slug}`);

  return (
    <div className="relative w-full max-w-xl">
      <label htmlFor={`${listId}-input`} className="sr-only">
        Buscar personalidade
      </label>
      <div className="flex items-center gap-2 rounded-xl border hairline bg-surface px-4 py-3 focus-within:border-accent/60">
        <Search className="size-5 text-muted" aria-hidden />
        <input
          id={`${listId}-input`}
          type="search"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && results[active] ? `${listId}-${results[active].slug}` : undefined}
          autoComplete="off"
          maxLength={60}
          placeholder="Busque por personalidade, tema ou época"
          className="w-full bg-transparent text-fg placeholder:text-muted/70 focus:outline-none"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && results[active]) {
              e.preventDefault();
              go(results[active].slug);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        />
      </div>
      {open && q && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border hairline bg-raised shadow-2xl"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted" role="option" aria-selected={false} aria-disabled>
              Ninguém encontrado. Tente um tema, como “relatividade”, ou uma época, como “século XIX”.
            </li>
          ) : (
            results.map((r, i) => (
              <li
                key={r.slug}
                id={`${listId}-${r.slug}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  go(r.slug);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm ${i === active ? "bg-accent/15" : ""}`}
              >
                <span className="text-fg">{r.name}</span>
                <span className="text-xs text-muted">{r.categoryName} · {r.periodLabel}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
