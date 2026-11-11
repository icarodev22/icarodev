"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp, LibraryBig, X } from "lucide-react";
import type { PersonalityCardData } from "@/lib/catalog";
import { Portrait } from "@/components/portrait/Portrait";

/**
 * Barra flutuante inferior para escolher a personalidade em destaque.
 * Semântica de grupo de rádio: setas/Home/End movem a seleção, Tab sai do grupo.
 */
export function PersonalityDock({
  items,
  categories,
  selected,
  onSelect,
}: {
  items: PersonalityCardData[];
  categories: { id: string; name: string }[];
  selected: string;
  onSelect: (slug: string) => void;
}) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const panelId = useId();

  // Mantém o item selecionado visível dentro da barra.
  useEffect(() => {
    const el = buttonRefs.current.get(selected);
    const scroller = scrollerRef.current;
    if (!el || !scroller) return;
    const target = el.offsetLeft - scroller.clientWidth / 2 + el.clientWidth / 2;
    scroller.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
  }, [selected, reduce]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const move = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const next =
      e.key === "ArrowRight" ? Math.min(index + 1, last)
      : e.key === "ArrowLeft" ? Math.max(index - 1, 0)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    const slug = items[next]!.slug;
    onSelect(slug);
    buttonRefs.current.get(slug)?.focus();
  };

  return (
    <div data-dock className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto relative w-full max-w-[46rem]">
        <AnimatePresence>
          {expanded && (
            <motion.div
              id={panelId}
              role="dialog"
              aria-label="Todas as personalidades"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-[calc(100%+0.5rem)] max-h-[min(60dvh,30rem)] overflow-y-auto rounded-3xl border border-white/[0.07] bg-[#121313]/[0.97] p-4 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="eyebrow">Todas as personalidades</p>
                <button type="button" onClick={() => setExpanded(false)} className="grid size-8 place-items-center rounded-full text-stone hover:bg-charcoal hover:text-ivory">
                  <X className="size-4" aria-hidden />
                  <span className="sr-only">Fechar lista</span>
                </button>
              </div>
              {categories.map((c) => (
                <div key={c.id} className="mt-3">
                  <p className="mb-1.5 text-xs text-stone">{c.name}</p>
                  <ul className="grid grid-cols-3 gap-1.5">
                    {items.filter((i) => i.category === c.id).map((i) => (
                      <li key={i.slug}>
                        <button
                          type="button"
                          aria-current={i.slug === selected ? "true" : undefined}
                          onClick={() => {
                            onSelect(i.slug);
                            setExpanded(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-xl p-1.5 text-left text-xs transition-colors active:scale-[0.97] ${i.slug === selected ? "bg-charcoal text-ivory" : "text-stone hover:bg-graphite hover:text-ivory"}`}
                        >
                          <span className="relative size-8 shrink-0 overflow-hidden rounded-full">
                            <Portrait data={i.portrait} decorative sizes="32px" className="h-full w-full" />
                          </span>
                          <span className="truncate">{i.shortName}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link href="/personalidades" className="mt-4 inline-flex items-center gap-1.5 text-sm text-bronze hover:text-ivory">
                <LibraryBig className="size-4" aria-hidden /> Abrir a biblioteca completa
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.nav
          aria-label="Escolher personalidade"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex items-center gap-1 rounded-full border border-white/[0.07] bg-ink/75 p-1.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl supports-[backdrop-filter]:bg-ink/60"
        >
          <div
            ref={scrollerRef}
            role="radiogroup"
            aria-label="Personalidades"
            className="flex min-w-0 flex-1 snap-x gap-0.5 overflow-x-auto overscroll-x-contain [mask-image:linear-gradient(90deg,transparent,#000_1.25rem,#000_calc(100%-1.25rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <span aria-hidden className="w-2 shrink-0" />
            {items.map((i, index) => {
              const active = i.slug === selected;
              return (
                <button
                  key={i.slug}
                  ref={(el) => {
                    if (el) buttonRefs.current.set(i.slug, el);
                    else buttonRefs.current.delete(i.slug);
                  }}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={`${i.name} — ${i.categoryName}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => onSelect(i.slug)}
                  onKeyDown={(e) => move(e, index)}
                  className="group relative flex w-[4.25rem] shrink-0 snap-center flex-col items-center gap-1 rounded-[1.4rem] px-1 pb-1 pt-1.5 outline-none transition-transform duration-150 active:scale-[0.94] focus-visible:ring-2 focus-visible:ring-bronze/80"
                >
                  {active && (
                    <motion.span
                      layoutId="dock-active"
                      aria-hidden
                      className="absolute inset-0 rounded-[1.4rem] bg-charcoal"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span
                    className={`relative size-10 overflow-hidden rounded-full ring-1 transition-[box-shadow,transform] duration-300 ${active ? "ring-bronze/80" : "ring-white/10 group-hover:ring-white/25"}`}
                  >
                    <Portrait data={i.portrait} decorative sizes="40px" className={`h-full w-full transition-transform duration-500 ${active ? "scale-105" : "group-hover:scale-105"}`} />
                  </span>
                  <span className={`relative max-w-full truncate text-[0.65rem] leading-tight transition-colors ${active ? "text-ivory" : "text-stone group-hover:text-ivory"}`}>
                    {i.shortName}
                  </span>
                </button>
              );
            })}
            <span aria-hidden className="w-2 shrink-0" />
          </div>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((v) => !v)}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-graphite text-ivory ring-1 ring-white/[0.06] transition-[transform,background-color] duration-150 hover:bg-charcoal active:scale-[0.92]"
          >
            <ChevronUp className={`size-5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} aria-hidden />
            <span className="sr-only">{expanded ? "Recolher lista de personalidades" : "Ver todas as personalidades"}</span>
          </button>
        </motion.nav>
      </div>
    </div>
  );
}
