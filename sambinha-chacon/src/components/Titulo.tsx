import { Sol } from "./Ornamentos";

export default function Titulo({
  id,
  kicker,
  children,
  claro = false,
  centro = false,
  className = "",
}: {
  id: string;
  kicker: string;
  children: React.ReactNode;
  claro?: boolean;
  centro?: boolean;
  className?: string;
}) {
  return (
    <div className={`${centro ? "text-center" : ""} ${className}`} data-reveal>
      <p className={`kicker ${claro ? "text-sol" : "text-vermelho"} ${centro ? "justify-center" : ""}`}>
        <Sol className="h-5 w-5" />
        {kicker}
      </p>
      <h2 id={id} className={`titulo mt-2 text-balance text-[clamp(34px,6vw,64px)] ${claro ? "text-white" : "text-navy"}`}>
        {children}
      </h2>
    </div>
  );
}
