import { CANAIS_OFICIAIS, CONTATO, MENU, edicaoDestaque } from "@/config/site";
import { IconArrow } from "./Icons";
import FaixaOficial from "./FaixaOficial";

export default function Rodape() {
  const patrocinadores = edicaoDestaque?.patrocinadores ?? [];
  return (
    <footer className="relative bg-marinho-escuro text-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img src="/img/logo-badge-256.png" alt="Sambinha Chacon" width={112} height={112} loading="lazy" className="h-28 w-28" />
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="rotulo text-amarelo">Navegue</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 text-[15px] font-semibold md:grid-cols-1">
              {MENU.map((m) => (
                <li key={m.href}>
                  <a href={m.href} className="inline-flex min-h-[44px] items-center text-white/90 hover:text-amarelo">
                    {m.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="rotulo text-amarelo">Canais oficiais</p>
            <ul className="mt-4 text-[15px] font-semibold">
              {CANAIS_OFICIAIS.map((c) => (
                <li key={c.href}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 text-white/90 hover:text-amarelo">
                    {c.nome} <IconArrow className="h-3.5 w-3.5" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                </li>
              ))}
              {CONTATO.email && (
                <li>
                  <a href={`mailto:${CONTATO.email}`} className="py-1 text-white/90 hover:text-amarelo">
                    {CONTATO.email}
                  </a>
                </li>
              )}
              {CONTATO.telefone && <li className="py-1 text-white/90">{CONTATO.telefone}</li>}
            </ul>
          </div>
        </div>

        {patrocinadores.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="rotulo text-amarelo">Patrocínio e apoio</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold uppercase tracking-wider text-white/80">
              {patrocinadores.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 h-px bg-white/15" aria-hidden="true" />
        <div className="mt-6 flex flex-col gap-2 text-[13px] font-medium text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© Sambinha Chacon. Todos os direitos reservados.</p>
          <p>Proibida a venda de bebidas alcoólicas para menores de 18 anos. Beba com sabedoria.</p>
        </div>
      </div>
    </footer>
  );
}
