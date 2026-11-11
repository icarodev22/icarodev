import Link from "next/link";
import { SIMULATION_DISCLAIMER } from "@/content";
import { EpochLogo } from "@/components/brand/EpochLogo";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-canvas">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl space-y-3">
          <EpochLogo className="text-base" />
          <p className="font-display text-fg">Conhecimento além do tempo.</p>
          <p className="leading-relaxed">{SIMULATION_DISCLAIMER}</p>
        </div>
        <nav aria-label="Links institucionais">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link className="hover:text-fg" href="/transparencia">Transparência</Link></li>
            <li><Link className="hover:text-fg" href="/privacidade">Privacidade</Link></li>
            <li><Link className="hover:text-fg" href="/termos">Termos de uso</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
