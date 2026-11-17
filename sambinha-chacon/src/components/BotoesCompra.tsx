import { BILHETERIA_URL, canalWhatsApp } from "@/config/site";
import { IconArrow, IconTicket, IconWhats } from "./Icons";

/** Os dois canais oficiais de compra. "Sem taxa" aparece SOMENTE no WhatsApp. */
export function BotaoWhats({ className = "", rotulo }: { className?: string; rotulo?: string }) {
  return (
    <a href={canalWhatsApp.href} target="_blank" rel="noopener noreferrer" className={`btn btn-whats ${className}`}>
      <IconWhats className="h-5 w-5 shrink-0" />
      <span>{rotulo ?? canalWhatsApp.rotuloHero}</span>
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}

export function BotaoBilheteria({ className = "", rotulo = "Comprar na Bilheteria Digital" }: { className?: string; rotulo?: string }) {
  return (
    <a href={BILHETERIA_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-bilheteria ${className}`}>
      <IconTicket className="h-5 w-5 shrink-0" />
      <span>{rotulo}</span>
      <IconArrow className="hidden h-4 w-4 shrink-0 min-[400px]:block" />
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}
