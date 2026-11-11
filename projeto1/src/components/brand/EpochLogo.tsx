/**
 * Logotipo EPOCH.ia — símbolo "Estratos em diálogo" (três faixas temporais que
 * formam um E) + nome. No produto o nome é texto real (acessível e nítido) com a
 * fonte Space Grotesk carregada pela página; para uso como imagem, ver
 * public/brand/*.svg (texto convertido em contornos).
 */
export function EpochSymbol({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="14 19 51 57" aria-hidden className={className} focusable="false">
      <g fill="currentColor" className={animated ? "epoch-strata" : undefined}>
        <path d="M18 23 L51 23 L42 32 L18 32 Z" />
        <path d="M18 43 L61 43 L52 52 L18 52 Z" />
        <path d="M18 63 L51 63 L42 72 L18 72 Z" />
      </g>
    </svg>
  );
}

export function EpochLogo({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <EpochSymbol animated={animated} className="h-[1.15em] w-auto text-accent" />
      <span className="font-display text-[1.18em] font-semibold leading-none tracking-[-0.035em] text-fg">
        EPOCH<span className="text-accent">.ia</span>
      </span>
    </span>
  );
}
