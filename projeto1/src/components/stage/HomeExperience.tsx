"use client";

import { useCallback, useState } from "react";
import type { PersonalityCardData } from "@/lib/catalog";
import { FeaturedStage } from "./FeaturedStage";
import { PersonalityDock } from "@/components/dock/PersonalityDock";

/** Estado da personalidade em destaque, sincronizado com ?p= sem recarregar a página. */
export function HomeExperience({
  items,
  categories,
  initial,
}: {
  items: PersonalityCardData[];
  categories: { id: string; name: string }[];
  initial: string;
}) {
  const [selected, setSelected] = useState(initial);
  const current = items.find((i) => i.slug === selected) ?? items[0]!;

  const select = useCallback((slug: string) => {
    setSelected(slug);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("p", slug);
      window.history.replaceState(window.history.state, "", url);
    } catch {
      /* navegação continua funcionando sem sincronizar a URL */
    }
  }, []);

  return (
    <>
      <FeaturedStage p={current} />
      <p className="sr-only" aria-live="polite">{`Em destaque: ${current.name}`}</p>
      <PersonalityDock items={items} categories={categories} selected={current.slug} onSelect={select} />
    </>
  );
}
