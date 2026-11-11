import Link from "next/link";
import { EpochLogo } from "@/components/brand/EpochLogo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-canvas/80 backdrop-blur supports-[backdrop-filter]:bg-canvas/65">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="EPOCH.ia — página inicial" className="rounded-md text-[1.05rem] transition-opacity duration-[140ms] hover:opacity-85">
          <EpochLogo animated />
        </Link>
        <Link
          href="/transparencia"
          className="rounded-md px-2 py-2 text-sm text-muted transition-colors duration-[140ms] hover:text-fg"
        >
          Como funciona
        </Link>
      </div>
    </header>
  );
}
