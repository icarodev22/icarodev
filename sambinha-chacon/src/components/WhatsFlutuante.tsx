import { WHATSAPP_URL, whatsappConfigurado } from "@/config/site";
import { IconWhats } from "./Icons";

/** Só aparece quando WHATSAPP_URL estiver configurado em src/config/site.ts */
export default function WhatsFlutuante() {
  if (!whatsappConfigurado) return null;
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Comprar sem taxa pelo WhatsApp (abre em nova aba)"
      className="fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full border-[3px] border-navy bg-verde text-white shadow-bloco-sm transition hover:scale-105 bottom-[calc(var(--buybar-h)+16px)] lg:bottom-6 lg:right-6 lg:h-16 lg:w-16"
    >
      <IconWhats className="h-7 w-7 lg:h-8 lg:w-8" />
    </a>
  );
}
