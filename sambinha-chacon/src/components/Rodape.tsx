import { CANAIS_OFICIAIS, CONTATO, MENU, edicaoDestaque } from "@/config/site";
import { IconArrow } from "./Icons";
import { Bandeirinhas } from "./Ornamentos";

export default function Rodape() {
  const patrocinadores = edicaoDestaque?.patrocinadores ?? [];
  return (
    <footer className="relative bg-navy-deep text-white">
      <div className="listras h-3" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img src="/img/logo-badge-256.png" alt="Sambinha Chacon" width={112} height={112} loading="lazy" className="h-28 w-28" />
            <p className="mt-4 max-w-xs font-display text-2xl font-extrabold leading-tight">
              Pé na rua. <span className="text-sol">Sorriso no rosto.</span>
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="kicker text-sol">Navegue</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] font-semibold md:grid-cols-1">
              {MENU.map((m) => (
                <li key={m.href}>
                  <a href={m.href} className="inline-block py-1 text-white/85 hover:text-sol">
                    {m.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="kicker text-sol">Canais oficiais</p>
            <ul className="mt-4 space-y-2 text-[15px] font-semibold">
              {CANAIS_OFICIAIS.map((c) => (
                <li key={c.href}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-1 text-white/85 hover:text-sol">
                    {c.nome} <IconArrow className="h-3.5 w-3.5" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                </li>
              ))}
              {CONTATO.email && (
                <li>
                  <a href={`mailto:${CONTATO.email}`} className="py-1 text-white/85 hover:text-sol">
                    {CONTATO.email}
                  </a>
                </li>
              )}
              {CONTATO.telefone && <li className="py-1 text-white/85">{CONTATO.telefone}</li>}
            </ul>
          </div>
        </div>

        {patrocinadores.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="kicker text-sol">Patrocínio e apoio</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold uppercase tracking-wider text-white/80">
              {patrocinadores.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        <Bandeirinhas className="mt-12 h-7 w-full opacity-80" />
        <div className="mt-6 flex flex-col gap-2 text-[13px] font-medium text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© Sambinha Chacon. Todos os direitos reservados.</p>
          <p>Proibida a venda de bebidas alcoólicas para menores de 18 anos. Beba com sabedoria.</p>
        </div>
      </div>
    </footer>
  );
}
