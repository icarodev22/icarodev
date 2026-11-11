"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { PersonalityCardData } from "@/lib/catalog";
import { AnimatedPortrait } from "@/components/portrait/AnimatedPortrait";

/** Easing da marca: cubic-bezier(.2,.7,.2,1). */
const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Personalidade em destaque: retrato principal, identificação e acesso direto à conversa. */
export function FeaturedStage({ p }: { p: PersonalityCardData }) {
  // Valores iniciais idênticos no servidor e no cliente; o MotionConfig
  // (reducedMotion="user") remove deslocamentos para quem prefere menos movimento.
  const fade = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.32, ease: EASE },
  };

  return (
    <section aria-labelledby="destaque-nome" className="relative mx-auto grid max-w-6xl items-center gap-5 px-4 pt-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-10 md:pt-10 lg:gap-16">
      {/* Retrato principal */}
      <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[22rem] md:order-2 md:max-w-[30rem]">
        <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(130,155,255,0.16),transparent)] blur-2xl" />
        <div className="relative aspect-[4/5] max-h-[42dvh] w-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(11,13,18,0.55)] md:max-h-[64dvh]">
          <AnimatePresence initial={false}>
            <motion.div
              key={p.slug}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <AnimatedPortrait data={p.portrait} priority className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Ação central: abrir a conversa (função real, sem simulação de voz) */}
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
          <Link
            href={`/conversar/${p.slug}`}
            aria-label={`Conversar com ${p.name}`}
            className="group relative grid size-16 place-items-center rounded-full bg-fg text-canvas shadow-[0_10px_30px_-10px_rgba(11,13,18,0.55)] ring-4 ring-canvas transition-[transform,background-color] duration-200 hover:bg-accent active:scale-[0.93] focus-visible:outline-offset-4"
          >
            <span aria-hidden className="absolute inset-0 rounded-full bg-fg/25 motion-safe:animate-ping motion-safe:[animation-duration:2.6s] motion-reduce:hidden" />
            <MessageCircle className="relative size-6 transition-transform duration-300 group-hover:scale-110" aria-hidden />
          </Link>
        </div>
      </div>

      {/* Identificação e contexto */}
      <div className="relative pt-5 text-center md:order-1 md:pt-0 md:text-left">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={p.slug} {...fade}>
            <p className="eyebrow">
              {p.categoryName} · {p.periodLabel}
            </p>
            <h2 id="destaque-nome" className="mt-2 font-display text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl">
              {p.name}
            </h2>
            <p className="mt-2 text-sm text-accent">{p.field}</p>
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted md:mx-0">{p.shortDescription}</p>

            <div className="mt-5 flex flex-col items-center gap-3 md:items-start">
              <Link
                href={`/conversar/${p.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-canvas transition-[transform,background-color] duration-200 hover:bg-accent active:scale-[0.97]"
              >
                Iniciar conversa <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <ul aria-label="Perguntas para começar" className="flex max-w-md flex-wrap justify-center gap-2 md:justify-start">
                {p.suggestedQuestions.slice(0, 2).map((q) => (
                  <li key={q}>
                    <Link
                      href={`/conversar/${p.slug}?pergunta=${encodeURIComponent(q)}`}
                      className="inline-flex rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg"
                    >
                      {q}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/personalidades" className="inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-fg">
                Escolher outra personalidade <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-5 text-[0.7rem] leading-snug text-muted/60">{p.portraitNotice}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
