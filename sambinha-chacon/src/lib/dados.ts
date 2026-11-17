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

const MES_CURTO = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const SEMANA = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

/** Partes da data para o destaque do card: 21 · NOV 2026 · Sábado · 22h */
export function dataDestaque(e: Evento) {
  const [a, m, d] = e.data.split("-").map(Number);
  const hora = horaValida(e.horario) ? `${Number(e.horario!.split(":")[0])}h${e.horario!.split(":")[1] !== "00" ? e.horario!.split(":")[1] : ""}` : "";
  return { dia: String(d).padStart(2, "0"), mes: MES_CURTO[m - 1], ano: String(a), semana: SEMANA[new Date(Date.UTC(a, m - 1, d)).getUTCDay()], hora };
}

/* ============================================================
 * MOMENTOS (somente celular) — fotos/vídeos reais em src/data/momentos.json
 * ============================================================ */
export type Momento = {
  tipo: "foto" | "video";
  src: string;
  miniatura: string;
  poster?: string;
  largura: number;
  altura: number;
  foco?: string;
  /** Enquadramento quando a foto é a grande do mosaico (opcional). */
  focoDestaque?: string;
  alt: string;
};
export const MOMENTOS = momentosJson as Momento[];
