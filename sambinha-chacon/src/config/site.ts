/**
 * ============================================================
 *  SAMBINHA CHACON — CAPA DE VENDAS
 *  Links e textos centralizados. Edite só este arquivo.
 * ============================================================
 */

/**
 * >>> WHATSAPP_URL — COLE AQUI O LINK OFICIAL DO WHATSAPP DE VENDAS <<<
 * Ex.: "https://wa.me/55819XXXXXXXX?text=Quero%20comprar%20ingresso"
 *
 * Enquanto estiver vazio, o botão "Vendas sem taxa" usa o destino oficial
 * já existente (Central de links). O telefone impresso nas artes está
 * marcado como "INFO" e por isso NÃO foi usado aqui.
 */
export const WHATSAPP_URL = "";

export const BILHETERIA_URL = "https://www.bilheteriadigital.com/sambinhachacon";
export const CENTRAL_LINKS_URL = "https://linklist.bio/gobu8_xxkv";

export const BOTOES = {
  semTaxa: {
    rotulo: "Vendas sem taxa",
    href: WHATSAPP_URL.trim() || CENTRAL_LINKS_URL,
    destino: WHATSAPP_URL.trim() ? "WhatsApp" : "canais oficiais",
  },
  digitais: {
    rotulo: "Vendas digitais",
    href: BILHETERIA_URL,
    destino: "Bilheteria Digital",
  },
};

export const SITE = {
  nome: "Sambinha Chacon",
  titulo: "Sambinha Chacon | Ingressos",
  descricao:
    "Ingressos do Sambinha Chacon: Vendas sem taxa pelo WhatsApp ou Vendas digitais na Bilheteria Digital.",
  // Troque pelo domínio definitivo (usado na imagem de compartilhamento).
  url: "https://sambinhachacon.com.br",
};

/* ------------------------------------------------------------
 * MOMENTOS — somente fotos/vídeos reais do evento
 * ------------------------------------------------------------
 * Arquivos em public/img (fotos) ou public/video (vídeos).
 * Para vídeo: { tipo: "video", src: "/video/arquivo.mp4", poster: "/img/capa.webp", ... }
 * Vídeos abrem com controles, sem autoplay e sem som automático.
 * `foco` = object-position da miniatura (mantém as pessoas no quadro).
 */
export type Momento = {
  tipo: "foto" | "video";
  src: string;
  miniatura: string;
  poster?: string;
  largura: number;
  altura: number;
  alt: string;
  legenda: string;
  foco?: string;
};

export const MOMENTOS: Momento[] = [
  {
    tipo: "foto",
    src: "/img/foto-galera.webp",
    miniatura: "/img/foto-galera-sm.webp",
    largura: 1088,
    altura: 1440,
    alt: "Grupo de amigas sorrindo juntas em frente ao palco iluminado do Sambinha Chacon.",
    legenda: "A turma reunida",
    foco: "50% 62%",
  },
  {
    tipo: "foto",
    src: "/img/foto-banda.webp",
    miniatura: "/img/foto-banda-sm.webp",
    largura: 1800,
    altura: 1200,
    alt: "Banda do Sambinha Chacon no palco com pandeiro, cavaquinho, violão e guitarra sob luzes azuis.",
    legenda: "Banda no palco",
    foco: "50% 60%",
  },
  {
    tipo: "foto",
    src: "/img/foto-palco-vertical.webp",
    miniatura: "/img/foto-palco-vertical-sm.webp",
    largura: 1800,
    altura: 2400,
    alt: "Letreiro em neon do Sambinha Chacon sobre o palco, com a banda tocando e o público em primeiro plano.",
    legenda: "O letreiro aceso e a roda formada",
    foco: "50% 55%",
  },
  {
    tipo: "foto",
    src: "/img/foto-palco-publico.webp",
    miniatura: "/img/foto-palco-publico-sm.webp",
    largura: 1800,
    altura: 1200,
    alt: "Público lotando a pista diante do palco com cenografia vermelha e letreiro do Sambinha Chacon.",
    legenda: "Pista cheia",
    foco: "40% 60%",
  },
  {
    tipo: "foto",
    src: "/img/foto-palco-neon.webp",
    miniatura: "/img/foto-palco-neon-sm.webp",
    largura: 1620,
    altura: 1080,
    alt: "Cenografia iluminada com arcos em neon e o logotipo do Sambinha Chacon no palco.",
    legenda: "Cenografia iluminada",
    foco: "50% 50%",
  },
];

/* ------------------------------------------------------------
 * PRÓXIMOS EVENTOS
 * ------------------------------------------------------------
 * Um evento só aparece se `data` estiver preenchida (AAAA-MM-DD, data
 * CONFIRMADA com ano) e ainda não tiver passado no fuso de São Paulo.
 * O ano NUNCA é deduzido da arte: enquanto ele não for confirmado,
 * deixe `data: null` — o evento fica fora da lista.
 */
export type Evento = {
  id: string;
  nome: string;
  /** Data confirmada no formato AAAA-MM-DD, ou null se o ano não foi confirmado. */
  data: string | null;
  /** Texto da data como impresso na arte (referência interna). */
  dataNaArte: string;
  local?: string;
  arte: { src: string; largura: number; altura: number; alt: string };
  /** Link de compra desta edição. */
  ingressos: string;
};

export const EVENTOS: Evento[] = [
  {
    id: "07-nov",
    nome: "Sambinha Chacon",
    data: null, // arte informa só "07 NOV" — ano não confirmado
    dataNaArte: "07 NOV",
    arte: { src: "/img/arte-07-nov-sm.webp", largura: 640, altura: 800, alt: "Arte oficial Sambinha Chacon – Save the date 07 NOV." },
    ingressos: BILHETERIA_URL,
  },
  {
    id: "21-nov-jonas-exclusive",
    nome: "Sambinha Chacon · Jonas Exclusive",
    data: null, // arte informa "21 NOV · Recife – PE" — ano não confirmado
    dataNaArte: "21 NOV",
    local: "Recife – PE",
    arte: { src: "/img/arte-21-nov-sm.webp", largura: 640, altura: 853, alt: "Arte oficial Sambinha Chacon Jonas Exclusive – 21 NOV, Recife-PE." },
    ingressos: BILHETERIA_URL,
  },
  {
    id: "30-jan-bloco",
    nome: "Bloco Sambinha Chacon",
    data: null, // arte informa "30 JAN · Arena Chacon, Recife – PE" — ano não confirmado
    dataNaArte: "30 JAN",
    local: "Arena Chacon · Recife – PE",
    arte: { src: "/img/arte-30-jan-bloco-sm.webp", largura: 640, altura: 768, alt: "Arte oficial do Bloco Sambinha Chacon – 30 JAN, Arena Chacon, Recife-PE." },
    ingressos: BILHETERIA_URL,
  },
];

/** Data de hoje (AAAA-MM-DD) no fuso de São Paulo. */
export function hojeEmSaoPaulo(agora = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(agora);
}

/** Eventos com data confirmada, de hoje em diante, do mais próximo ao mais distante. */
export function eventosFuturos(hoje = hojeEmSaoPaulo()): Evento[] {
  return EVENTOS.filter((e): e is Evento & { data: string } => !!e.data && /^\d{4}-\d{2}-\d{2}$/.test(e.data) && e.data >= hoje).sort((a, b) =>
    a.data!.localeCompare(b.data!)
  );
}
