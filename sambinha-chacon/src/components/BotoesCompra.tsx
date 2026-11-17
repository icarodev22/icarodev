import { canalBilheteria, canalWhatsApp } from "@/config/site";
import { IconTicket, IconWhats } from "./Icons";

/** "Vendas sem taxa" (WhatsApp) — a indicação "sem taxa" aparece somente neste canal. */
export function BotaoWhats({ className = "" }: { className?: string }) {
  return (
    <a href={canalWhatsApp.href} target="_blank" rel="noopener noreferrer" className={`btn btn-whats ${className}`}>
      <IconWhats className="h-5 w-5 shrink-0" />
      <span>{canalWhatsApp.rotulo}</span>
      <span className="sr-only">({canalWhatsApp.destino}, abre em nova aba)</span>
    </a>
  );
}

/** "Vendas digitais" (Bilheteria Digital). */
export function BotaoBilheteria({ className = "" }: { className?: string }) {
  return (
    <a href={canalBilheteria.href} target="_blank" rel="noopener noreferrer" className={`btn btn-bilheteria ${className}`}>
      <IconTicket className="h-5 w-5 shrink-0" />
      <span>{canalBilheteria.rotulo}</span>
      <span className="sr-only">({canalBilheteria.destino}, abre em nova aba)</span>
    </a>
  );
}
