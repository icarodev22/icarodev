"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Portrait, type PortraitData } from "./Portrait";

/**
 * Movimento sutil de câmera (aproximação lenta e deriva lateral) e variação
 * discreta de luz. Desativado quando o usuário prefere movimento reduzido.
 * Não há sincronização labial: o retrato não "fala".
 */
export function AnimatedPortrait({ data, className, priority }: { data: PortraitData; className?: string; priority?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.02, x: 0, y: 0 }}
        animate={reduce ? undefined : { scale: [1.02, 1.07, 1.02], x: [0, -6, 0], y: [0, -4, 0] }}
        transition={reduce ? undefined : { duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <Portrait data={data} className="h-full w-full" priority={priority} />
      </motion.div>
      {/* Mesma estrutura de DOM com ou sem movimento reduzido (evita erro de hidratação). */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(232,224,212,0.10),transparent_55%)]"
        initial={{ opacity: 0.6 }}
        animate={reduce ? undefined : { opacity: [0.4, 0.9, 0.4] }}
        transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
    </div>
  );
}
