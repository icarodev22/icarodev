import type { Metadata } from "next";
import { CATEGORIES } from "@/content";
import type { CategoryId } from "@/content/types";
import { allCards } from "@/lib/catalog";
import { LibraryView } from "@/components/library/LibraryView";

export const metadata: Metadata = { title: "Personalidades" };

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { categoria } = await searchParams;
  const initial = CATEGORIES.some((c) => c.id === categoria) ? (categoria as CategoryId) : "todas";
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Biblioteca</p>
      <h1 className="mt-2 font-serif text-3xl text-ivory sm:text-4xl">Personalidades</h1>
      <p className="mt-2 max-w-2xl text-stone">
        Seis áreas, dezoito conversas possíveis. Escolha alguém e comece a perguntar.
      </p>
      <LibraryView cards={allCards()} categories={CATEGORIES.map((c) => ({ id: c.id, name: c.name, description: c.description }))} initial={initial} />
    </div>
  );
}
