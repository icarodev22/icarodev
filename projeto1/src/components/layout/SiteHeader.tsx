import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-ink/85 backdrop-blur supports-[backdrop-filter]:bg-ink/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Projeto 1 — página inicial">
          <span className="grid size-7 place-items-center rounded-full border border-bronze/70 font-serif text-sm text-ivory">1</span>
          <span className="whitespace-nowrap font-serif text-lg tracking-tight text-ivory group-hover:text-bronze transition-colors">Projeto 1</span>
        </Link>
        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-0.5 text-sm text-stone sm:gap-1">
            <li>
              <Link href="/personalidades" className="rounded-md px-2 py-2 hover:text-ivory hover:bg-charcoal/60 transition-colors sm:px-3">
                Personalidades
              </Link>
            </li>
            <li>
              <Link href="/transparencia" className="rounded-md px-2 py-2 hover:text-ivory hover:bg-charcoal/60 transition-colors sm:px-3">
                <span className="sm:hidden">Sobre</span>
                <span className="hidden sm:inline">Como funciona</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
