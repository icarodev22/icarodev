"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { House, Settings, UsersRound, type LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (path: string) => boolean;
}

/** Exatamente três destinos. As personalidades ficam reunidas na biblioteca, por categoria. */
const ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: House, match: (p) => p === "/" },
  {
    href: "/personalidades",
    label: "Personalidades",
    icon: UsersRound,
    match: (p) => p.startsWith("/personalidades") || p.startsWith("/conversar"),
  },
  { href: "/configuracoes", label: "Configurações", icon: Settings, match: (p) => p.startsWith("/configuracoes") },
];

/** Em telas de toque, a barra recolhe enquanto um campo de texto está em foco (teclado aberto). */
function useTypingOnTouch(): boolean {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && (el.tagName === "TEXTAREA" || (el.tagName === "INPUT" && !["checkbox", "radio", "button"].includes((el as HTMLInputElement).type)) || el.isContentEditable);
    const onIn = (e: FocusEvent) => coarse.matches && isField(e.target) && setTyping(true);
    const onOut = () => setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);
  return typing;
}

export function BottomNav() {
  const pathname = usePathname() ?? "/";
  const hidden = useTypingOnTouch();

  return (
    <div
      data-bottom-nav
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
        hidden ? "translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        aria-hidden={hidden || undefined}
        className="pointer-events-auto rounded-full border border-line bg-canvas/70 p-1.5 shadow-[0_14px_40px_-14px_rgba(11,13,18,0.55)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-canvas/55"
      >
        <ul className="flex items-center gap-1">
          {ITEMS.map(({ href, label, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  tabIndex={hidden ? -1 : undefined}
                  className={`group relative flex min-h-12 min-w-[4.75rem] flex-col items-center justify-center gap-0.5 rounded-full px-3 py-1.5 outline-none transition-[color,transform] duration-[140ms] ease-[cubic-bezier(.2,.7,.2,1)] active:scale-[0.94] focus-visible:ring-2 focus-visible:ring-accent/80 sm:min-w-0 sm:flex-row sm:gap-2 sm:px-4 ${
                    active ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="bottom-nav-active"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-accent/[0.14] ring-1 ring-inset ring-accent/45"
                      transition={{ type: "spring", stiffness: 480, damping: 38 }}
                    />
                  )}
                  <Icon
                    aria-hidden
                    strokeWidth={active ? 2.1 : 1.75}
                    className={`relative size-5 transition-colors duration-[140ms] ${active ? "text-accent" : ""}`}
                  />
                  <span className="relative text-[0.66rem] font-medium leading-none tracking-wide sm:text-[0.8rem]">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
