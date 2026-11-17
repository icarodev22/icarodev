/** Cabeçalho de seção. Marcador = traço simples (elemento complementar, não oficial). */
export default function Titulo({
  id,
  rotulo,
  children,
  claro = false,
  sobreAmarelo = false,
  centro = false,
  className = "",
}: {
  id: string;
  rotulo: string;
  children: React.ReactNode;
  claro?: boolean;
  /** Em fundo amarelo o rótulo usa azul-marinho (vermelho não atinge contraste AA). */
  sobreAmarelo?: boolean;
  centro?: boolean;
  className?: string;
}) {
  return (
    <div className={`${centro ? "text-center" : ""} ${className}`} data-reveal>
      <p className={`rotulo flex items-center gap-3 ${claro ? "text-amarelo" : sobreAmarelo ? "text-marinho" : "text-vermelho"} ${centro ? "justify-center" : ""}`}>
        <span className={`h-[3px] w-8 rounded-full ${claro ? "bg-amarelo" : sobreAmarelo ? "bg-marinho" : "bg-vermelho"}`} aria-hidden="true" />
        {rotulo}
      </p>
      <h2 id={id} className={`titulo mt-3 text-balance text-[clamp(32px,5.2vw,56px)] ${claro ? "text-white" : "text-marinho"}`}>
        {children}
      </h2>
    </div>
  );
}
