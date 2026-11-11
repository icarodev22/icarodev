"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { useMotionPreference, useThemePreference } from "@/lib/preferences";

/**
 * Aplica as preferências de Aparência e Acessibilidade:
 * - tema (escuro padrão da marca, claro ou seguir o sistema) via data-theme;
 * - "Reduzir animações" no Framer Motion e nas animações CSS (data-motion),
 *   além de respeitar prefers-reduced-motion do sistema.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const motion = useMotionPreference();
  const theme = useThemePreference();

  useEffect(() => {
    document.documentElement.dataset.motion = motion === "reduzidas" ? "reduce" : "system";
  }, [motion]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme !== "sistema") {
      root.dataset.theme = theme === "claro" ? "light" : "dark";
      return;
    }
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const apply = () => (root.dataset.theme = mq.matches ? "light" : "dark");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  return <MotionConfig reducedMotion={motion === "reduzidas" ? "always" : "user"}>{children}</MotionConfig>;
}
