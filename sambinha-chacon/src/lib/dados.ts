import eventosJson from "@/data/eventos.json";
import momentosJson from "@/data/momentos.json";

/* ============================================================
 * EVENTOS — cadastro em src/data/eventos.json (ver EVENTOS.md)
 * ============================================================ */
export type Evento = {
  id: string;
  status: "rascunho" | "publicado";
  titulo: string;
  /** AAAA-MM-DD (obrigatório para publicar) */
  data: string;
  /** HH:MM, opcional */
  horario?: string;
  local?: string;
  imagem: string;
  imagemLargura?: number;
  imagemAltura?: number;
  imagemAlt: string;
  linkCompra: string;
};

export const EVENTOS = eventosJson as Evento[];

const FUSO = "America/Sao_Paulo";

/** Agora no fuso de São Paulo, como "AAAA-MM-DDTHH:MM". */
export function agoraEmSaoPaulo(agora = new Date()): string {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: FUSO, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(agora)
      .map((x) => [x.type, x.value])
  );
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

const dataValida = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d));
const horaValida = (h?: string) => !!h && /^([01]\d|2[0-3]):[0-5]\d$/.test(h);

/**
 * Só eventos PUBLICADOS, com data completa, que ainda não passaram (fuso de São Paulo).
 * Com horário: some a partir do horário de início. Sem horário: fica até o fim do dia.
 * Ordenados do mais próximo ao mais distante. O cadastro nunca é apagado.
 */
export function proximasDatas(agora = agoraEmSaoPaulo()): Evento[] {
  return EVENTOS.filter((e) => e.status === "publicado" && dataValida(e.data) && e.linkCompra)
    .map((e) => ({ e, fim: horaValida(e.horario) ? `${e.data}T${e.horario}` : `${e.data}T23:59` }))
    .filter(({ fim }) => fim >= agora)
    .sort((a, b) => a.fim.localeCompare(b.fim))
    .map(({ e }) => e);
}

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

/** "sáb, 21 de novembro de 2026 · 22h" */
export function dataPorExtenso(e: Evento): string {
  const [a, m, d] = e.data.split("-").map(Number);
  const dia = DIAS[new Date(Date.UTC(a, m - 1, d)).getUTCDay()];
  let s = `${dia}, ${d} de ${MESES[m - 1]} de ${a}`;
  if (horaValida(e.horario)) {
    const [h, min] = e.horario!.split(":");
    s += ` · ${Number(h)}h${min !== "00" ? min : ""}`;
  }
  return s;
}

/* ============================================================
 * MOMENTOS — fotos/vídeos reais em src/data/momentos.json
 * ============================================================ */
export type Momento = {
  tipo: "foto" | "video";
  src: string;
  miniatura: string;
  poster?: string;
  largura: number;
  altura: number;
  foco?: string;
  /** Enquadramento quando a foto é a grande do mosaico do celular (opcional). */
  focoDestaque?: string;
  alt: string;
};
export const MOMENTOS = momentosJson as Momento[];
