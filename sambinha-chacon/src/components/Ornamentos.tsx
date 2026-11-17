/** Elementos gráficos da marca, desenhados a partir das artes oficiais. Todos decorativos (aria-hidden). */
type P = { className?: string };

/** Sol do logotipo: raios vermelhos, anel claro e miolo amarelo. */
export const Sol = ({ className = "h-16 w-16" }: P) => {
  const raios = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {raios.map((r) => (
        <path key={r} d="M50 3 L56 22 L44 22 Z" fill="#D7261E" transform={`rotate(${r} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="29" fill="#D7261E" />
      <circle cx="50" cy="50" r="19" fill="#FFF4DC" />
      <circle cx="50" cy="50" r="12.5" fill="#FFB800" />
    </svg>
  );
};

/** Sol nascente em leque (topo do arco da arte). */
export const SolLeque = ({ className = "h-16 w-32" }: P) => {
  const n = 11;
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const a0 = Math.PI + (i * Math.PI) / n;
        const a1 = Math.PI + ((i + 1) * Math.PI) / n;
        const p = (a: number, r: number) => `${100 + r * Math.cos(a)} ${100 + r * Math.sin(a)}`;
        return (
          <path key={i} d={`M100 100 L${p(a0, 98)} A98 98 0 0 1 ${p(a1, 98)} Z`} fill={i % 2 ? "#FFF4DC" : "#D7261E"} />
        );
      })}
      <circle cx="100" cy="100" r="42" fill="#FFF4DC" />
      <path d="M62 100a38 38 0 0 1 76 0Z" fill="#FFB800" />
      <path d="M74 100a26 26 0 0 1 52 0" fill="none" stroke="#FFF4DC" strokeWidth="3" />
    </svg>
  );
};

/** Folha de coqueiro estilizada. */
export const Folha = ({ className = "h-24 w-24", cor = "#1F8A4C", nervura = "#4DBE74" }: P & { cor?: string; nervura?: string }) => (
  <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
    <path d="M2 54C20 14 70 0 118 10 84 22 46 40 2 54Z" fill={cor} />
    <path d="M6 51C40 34 76 18 114 11" stroke={nervura} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    {Array.from({ length: 9 }, (_, i) => {
      const x = 18 + i * 10.5;
      const y = 45 - i * 3.9;
      return <path key={i} d={`M${x} ${y} l${6 + i * 0.4} ${-12 + i * 0.6}`} stroke={nervura} strokeWidth="1.6" strokeLinecap="round" />;
    })}
  </svg>
);

/** Coqueiro (silhueta azul como nas artes). */
export const Coqueiro = ({ className = "h-40 w-28", cor = "#1F4FD1" }: P & { cor?: string }) => (
  <svg viewBox="0 0 120 170" className={className} aria-hidden="true" fill={cor}>
    <path d="M58 52c4 40 2 80-6 118h10c7-38 8-78 4-118Z" />
    {[-150, -115, -70, -30, 10].map((r, i) => (
      <path key={i} d="M62 50c14-14 36-20 56-14-22 2-40 8-56 14Z" transform={`rotate(${r + 90} 62 50)`} />
    ))}
    <path d="M62 50c-14-14-36-20-56-14 22 2 40 8 56 14Z" />
    <path d="M62 50c-10-20-30-34-50-34 18 8 36 20 50 34Z" />
    <path d="M62 50c10-20 30-34 50-34-18 8-36 20-50 34Z" />
  </svg>
);

/** Pandeiro com as iniciais SC, como na arte. */
export const Pandeiro = ({ className = "h-20 w-20" }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    {Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2;
      return <ellipse key={i} cx={50 + 44 * Math.cos(a)} cy={50 + 44 * Math.sin(a)} rx="7" ry="5" fill="#FFB800" transform={`rotate(${(a * 180) / Math.PI + 90} ${50 + 44 * Math.cos(a)} ${50 + 44 * Math.sin(a)})`} />;
    })}
    <circle cx="50" cy="50" r="42" fill="#A9190F" />
    <circle cx="50" cy="50" r="36" fill="#D7261E" />
    <path d="M24 30c16-8 36-8 52 2" stroke="#F2661B" strokeWidth="4" fill="none" strokeLinecap="round" />
    <text x="50" y="62" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="30" fill="#FFB800">SC</text>
  </svg>
);

/** Cavaquinho estilizado. */
export const Cavaquinho = ({ className = "h-28 w-16" }: P) => (
  <svg viewBox="0 0 60 140" className={className} aria-hidden="true">
    <rect x="25" y="4" width="10" height="20" rx="3" fill="#FFB800" />
    <rect x="27" y="22" width="6" height="58" fill="#8A3B12" />
    <path d="M30 70c-14 0-20 10-16 22-12 8-10 40 16 42 26-2 28-34 16-42 4-12-2-22-16-22Z" fill="#C2410C" />
    <path d="M14 112c8 14 24 16 32 0" stroke="#FFB800" strokeWidth="3" fill="none" />
    <circle cx="30" cy="100" r="7" fill="#13256B" />
    <path d="M28 24v84M30 24v84M32 24v84" stroke="#FFF4DC" strokeWidth="0.6" />
    <rect x="22" y="116" width="16" height="4" rx="1.5" fill="#13256B" />
  </svg>
);

/** Lampião colonial. */
export const Lampiao = ({ className = "h-20 w-14" }: P) => (
  <svg viewBox="0 0 60 90" className={className} aria-hidden="true">
    <path d="M30 2v8" stroke="#13256B" strokeWidth="3" />
    <path d="M14 18h32l-4-8H18Z" fill="#1F4FD1" />
    <path d="M17 18h26l-4 40H21Z" fill="#FFF4DC" stroke="#1F4FD1" strokeWidth="3" />
    <path d="M24 26h12l-2 24h-8Z" fill="#FFD45C" />
    <path d="M18 58h24l-6 8H24Z" fill="#1F4FD1" />
    <circle cx="30" cy="72" r="3.5" fill="#1F4FD1" />
  </svg>
);

/** Faixa ondulada / flâmula (bandeirinhas). */
export const Bandeirinhas = ({ className = "h-8 w-full" }: P) => {
  const cores = ["#D7261E", "#FFB800", "#1F4FD1", "#F49AC9", "#1F8A4C", "#F2661B"];
  return (
    <svg viewBox="0 0 600 40" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M0 4 Q300 22 600 4" stroke="#13256B" strokeWidth="2" fill="none" />
      {Array.from({ length: 20 }, (_, i) => {
        const x = 8 + i * 30;
        const t = x / 600;
        const y = 4 + 18 * 4 * t * (1 - t) * 0.98;
        return <path key={i} d={`M${x} ${y} h20 l-10 ${16} Z`} fill={cores[i % cores.length]} />;
      })}
    </svg>
  );
};

/** Flor vermelha (detalhe da arte de referência). */
export const Flor = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse key={r} cx="20" cy="10" rx="7" ry="9" fill="#D7261E" transform={`rotate(${r} 20 20)`} />
    ))}
    <circle cx="20" cy="20" r="5" fill="#FFB800" />
  </svg>
);
