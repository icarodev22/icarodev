import Link from "next/link";
import { SIMULATION_DISCLAIMER } from "@/content";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-stone sm:px-6 md:flex-row md:items-start md:justify-between">
        <p className="max-w-xl leading-relaxed">{SIMULATION_DISCLAIMER}</p>
        <nav aria-label="Links institucionais">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link className="hover:text-ivory" href="/transparencia">Transparência</Link></li>
            <li><Link className="hover:text-ivory" href="/privacidade">Privacidade</Link></li>
            <li><Link className="hover:text-ivory" href="/termos">Termos de uso</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
