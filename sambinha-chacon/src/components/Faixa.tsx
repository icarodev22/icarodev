import { Sol } from "./Ornamentos";

const ITENS = ["Samba", "Alegria", "Recife", "Encontro", "Pé na rua", "Sorriso no rosto", "Sua turma", "Muita história"];

/** Letreiro corrido entre seções (pausa com movimento reduzido). */
export default function Faixa({ variante = "sol" }: { variante?: "sol" | "navy" }) {
  const cores = variante === "sol" ? "bg-sol text-navy" : "bg-navy text-sol";
  const lista = [...ITENS, ...ITENS];
  return (
    <div className={`relative overflow-hidden border-y-[3px] border-navy ${cores}`} aria-hidden="true">
      <div className="flex w-max animate-faixa items-center gap-6 py-3 motion-reduce:animate-none">
        {[...lista, ...lista].map((t, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap font-display text-xl font-extrabold sm:text-2xl">
            {t}
            <Sol className="h-6 w-6 animate-girar" />
          </span>
        ))}
      </div>
    </div>
  );
}
