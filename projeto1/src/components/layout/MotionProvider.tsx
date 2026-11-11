"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { useMotionPreference } from "@/lib/preferences";

/**
 * Respeita prefers-reduced-motion do sistema e a preferência "Reduzir animações"
 * escolhida em Configurações (aplicada também às animações CSS via data-motion).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pref = useMotionPreference();
  useEffect(() => {
    document.documentElement.dataset.motion = pref === "reduzidas" ? "reduce" : "system";
  }, [pref]);
  return <MotionConfig reducedMotion={pref === "reduzidas" ? "always" : "user"}>{children}</MotionConfig>;
}
