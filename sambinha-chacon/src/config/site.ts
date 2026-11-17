/**
 * ============================================================
 *  SAMBINHA CHACON — CONTEÚDO E LINKS CENTRALIZADOS
 * ============================================================
 *  Tudo o que muda de uma edição para outra fica neste arquivo:
 *  links de compra, edições, atrações, galeria, FAQ, patrocinadores.
 *  Nenhum componente precisa ser editado para atualizar o site.
 *
 *  REGRA DE OURO: só publique informação CONFIRMADA.
 *  Campos vazios ("" / null / []) simplesmente não aparecem no site.
 * ============================================================
 */

/* ------------------------------------------------------------
 * 1) CANAIS DE COMPRA
 * ------------------------------------------------------------ */

/**
 * >>> WHATSAPP_URL — COLE AQUI O LINK OFICIAL DE VENDA SEM TAXA <<<
 *
 * Exemplo: "https://wa.me/5581900000000?text=Quero%20comprar%20ingresso%20do%20Sambinha%20Chacon"
 *
 * Enquanto estiver vazio:
 *  - os botões de WhatsApp levam para a Central de links com o texto
 *    "Consultar compra sem taxa";
 *  - o botão flutuante do WhatsApp NÃO aparece.
 *
 * Atenção: o telefone impresso nas artes NÃO deve ser usado aqui
 * sem confirmação de que é o canal oficial de venda.
 */
export const WHATSAPP_URL = "";

export const BILHETERIA_URL = "https://www.bilheteriadigital.com/sambinhachacon";
export const CENTRAL_LINKS_URL = "https://linklist.bio/gobu8_xxkv";

export const whatsappConfigurado = WHATSAPP_URL.trim().length > 0;

/** Link e rótulos usados por todos os botões de WhatsApp do site. */
export const canalWhatsApp = whatsappConfigurado
  ? {
      href: WHATSAPP_URL,
      rotuloHero: "Comprar sem taxa pelo WhatsApp",
      rotuloBotao: "Comprar pelo WhatsApp",
      rotuloCurto: "WhatsApp sem taxa",
    }
  : {
      // Fallback temporário → Central de links oficial
      href: CENTRAL_LINKS_URL,
      rotuloHero: "Consultar compra sem taxa",
      rotuloBotao: "Consultar compra sem taxa",
      rotuloCurto: "Consultar sem taxa",
    };

/* ------------------------------------------------------------
 * 2) EDIÇÕES
 * ------------------------------------------------------------
 *  Cada edição tem SUAS informações. Não misture dados entre elas.
 *  - data: exatamente como está na arte (o ano NÃO é deduzido).
 *  - cidade / local / horário: preencha apenas se confirmado.
 *  - aVenda: marque true SOMENTE quando confirmado que a edição
 *    está com ingressos à venda. Só uma edição com aVenda=true
 *    vira o destaque do banner principal (com data/local/horário).
 * ------------------------------------------------------------ */

export type Atracao = {
  nome: string;
  /** Foto ou recorte da arte oficial (opcional). */
  imagem?: string;
  /** Posição do recorte (object-position) para não cortar rostos. */
  foco?: string;
  destaque?: boolean;
};

export type Edicao = {
  id: string;
  nome: string;
  /** Subtítulo da arte (ex.: "Jonas Exclusive"). */
  subtitulo?: string;
  dia: string; // "07"
  mes: string; // "NOV"
  /** Ano: deixe vazio se não confirmado. */
  ano?: string;
  cidade?: string;
  local?: string;
  horario?: string;
  classificacao?: string;
  arte: { src: string; srcSm: string; largura: number; altura: number; alt: string };
  atracoes: Atracao[];
  aVenda: boolean;
  /** Identidade visual especial dessa edição (ex.: Bloco). */
  tema?: "padrao" | "bloco";
  patrocinadores: string[];
};

export const EDICOES: Edicao[] = [
  {
    id: "07-nov",
    nome: "Sambinha Chacon",
    subtitulo: "Save the date",
    dia: "07",
    mes: "NOV",
    classificacao: "Proibida a entrada de menores de 18 anos",
    arte: {
      src: "/img/arte-07-nov.webp",
      srcSm: "/img/arte-07-nov-sm.webp",
      largura: 1200,
      altura: 1500,
      alt: "Arte oficial Sambinha Chacon – Save the date 07 NOV: casal dançando numa rua de casarios coloridos, com cavaquinho, pandeiro e lampiões.",
    },
    atracoes: [],
    aVenda: false,
    tema: "padrao",
    patrocinadores: [],
  },
  {
    id: "21-nov-jonas-exclusive",
    nome: "Sambinha Chacon",
    subtitulo: "Jonas Exclusive",
    dia: "21",
    mes: "NOV",
    cidade: "Recife – PE",
    classificacao: "Proibida a entrada de menores de 18 anos",
    arte: {
      src: "/img/arte-21-nov.webp",
      srcSm: "/img/arte-21-nov-sm.webp",
      largura: 1200,
      altura: 1600,
      alt: "Arte oficial Sambinha Chacon Jonas Exclusive – 21 NOV, Recife-PE, com Jonas Esticado, Kátia & Aduílio, Boa Ousadia e Sambinha Chacon.",
    },
    // Atrações impressas na arte "Jonas Exclusive" — valem SÓ para esta edição.
    atracoes: [
      { nome: "Jonas Esticado", imagem: "/img/atracao-jonas.webp", foco: "50% 18%", destaque: true },
      { nome: "Kátia & Aduílio", imagem: "/img/atracao-katia-aduilio.webp", foco: "50% 30%" },
      { nome: "Boa Ousadia" },
      { nome: "Sambinha Chacon", imagem: "/img/foto-banda-sm.webp", foco: "50% 55%" },
    ],
    aVenda: false,
    tema: "padrao",
    patrocinadores: [],
  },
  {
    id: "30-jan-bloco",
    nome: "Bloco Sambinha Chacon",
    subtitulo: "BSC 27 · Save the date",
    dia: "30",
    mes: "JAN",
    cidade: "Recife – PE",
    local: "Arena Chacon",
    arte: {
      src: "/img/arte-30-jan-bloco.webp",
      srcSm: "/img/arte-30-jan-bloco-sm.webp",
      largura: 1200,
      altura: 1440,
      alt: "Arte bordada oficial do Bloco Sambinha Chacon (BSC 27) – Save the date 30 JAN, Recife-PE, Arena Chacon.",
    },
    atracoes: [],
    aVenda: false,
    tema: "bloco",
    patrocinadores: [],
  },
];

/** Edição em destaque no banner: a primeira marcada como à venda (ou nenhuma). */
export const edicaoDestaque: Edicao | null = EDICOES.find((e) => e.aVenda) ?? null;

/** Edições que têm atrações confirmadas (para a seção Atrações). */
export const edicoesComAtracoes = EDICOES.filter((e) => e.atracoes.length > 0);

/* ------------------------------------------------------------
 * 3) GALERIA E FOTOS
 * ------------------------------------------------------------ */

export type Foto = {
  src: string;
  srcSm: string;
  largura: number;
  altura: number;
  alt: string;
  legenda: string;
};

export const GALERIA: Foto[] = [
  {
    src: "/img/foto-palco-vertical.webp",
    srcSm: "/img/foto-palco-vertical-sm.webp",
    largura: 1800,
    altura: 2400,
    alt: "Letreiro em neon do Sambinha Chacon sobre o palco, com a banda tocando e o público em primeiro plano.",
    legenda: "O letreiro aceso e a roda formada",
  },
  {
    src: "/img/foto-banda.webp",
    srcSm: "/img/foto-banda-sm.webp",
    largura: 1800,
    altura: 1200,
    alt: "Banda do Sambinha Chacon no palco com pandeiro, cavaquinho, violão e guitarra sob luzes azuis.",
    legenda: "Banda no palco",
  },
  {
    src: "/img/foto-galera.webp",
    srcSm: "/img/foto-galera-sm.webp",
    largura: 1088,
    altura: 1440,
    alt: "Grupo de amigas sorrindo juntas em frente ao palco iluminado do Sambinha Chacon.",
    legenda: "A turma reunida",
  },
  {
    src: "/img/foto-palco-publico.webp",
    srcSm: "/img/foto-palco-publico-sm.webp",
    largura: 1800,
    altura: 1200,
    alt: "Vista ampla da festa: público lotando a pista diante do palco com cenografia vermelha e letreiro do Sambinha Chacon.",
    legenda: "Pista cheia",
  },
  {
    src: "/img/foto-palco-neon.webp",
    srcSm: "/img/foto-palco-neon-sm.webp",
    largura: 1620,
    altura: 1080,
    alt: "Cenografia iluminada com arcos em neon e o logotipo do Sambinha Chacon no centro do palco.",
    legenda: "Cenografia iluminada",
  },
];

/* ------------------------------------------------------------
 * 4) PERGUNTAS FREQUENTES
 * ------------------------------------------------------------
 *  Só entram no site as perguntas com resposta preenchida.
 *  Para horário e preços: adicione quando houver confirmação.
 * ------------------------------------------------------------ */

export type Pergunta = { pergunta: string; resposta: string };

export const FAQ: Pergunta[] = [
  {
    pergunta: "Como compro meu ingresso?",
    resposta:
      "Você pode comprar por dois canais oficiais: falando com a equipe pelo WhatsApp, sem taxa, ou finalizando a compra na Bilheteria Digital. Os dois botões estão na seção Ingressos e na barra de compra.",
  },
  {
    pergunta: "Qual a diferença entre o WhatsApp e a Bilheteria Digital?",
    resposta:
      "Pelo WhatsApp você fala direto com a equipe e consulta os ingressos disponíveis sem taxa. Na Bilheteria Digital você consulta os ingressos e conclui a compra on-line, pela plataforma.",
  },
  {
    pergunta: "Qual a classificação etária?",
    resposta:
      "As artes oficiais das edições 07 NOV e 21 NOV informam: proibida a entrada de pessoas menores de 18 anos. Beba com sabedoria.",
  },
  {
    pergunta: "Onde acontece?",
    resposta:
      "A edição 21 NOV (Jonas Exclusive) acontece em Recife – PE. O Bloco Sambinha Chacon (30 JAN) acontece na Arena Chacon, em Recife – PE. Para as demais edições, confira o local nos canais oficiais.",
  },
  {
    pergunta: "Onde encontro todos os canais oficiais?",
    resposta:
      "Na Central de links do Sambinha Chacon, que reúne os canais oficiais de compra e contato.",
  },
  // { pergunta: "Qual o horário?", resposta: "" }, // ← preencha quando confirmado
].filter((p) => p.resposta.trim().length > 0);

/* ------------------------------------------------------------
 * 5) RODAPÉ / CANAIS OFICIAIS
 * ------------------------------------------------------------ */

export const CANAIS_OFICIAIS = [
  { nome: "Central de links", href: CENTRAL_LINKS_URL },
  { nome: "Bilheteria Digital", href: BILHETERIA_URL },
  // { nome: "Instagram", href: "https://instagram.com/..." }, // ← adicione quando confirmado
];

/** Contato confirmado (deixe vazio enquanto não houver). */
export const CONTATO = { email: "", telefone: "" };

/* ------------------------------------------------------------
 * 6) SEO / COMPARTILHAMENTO
 * ------------------------------------------------------------ */

export const SITE = {
  nome: "Sambinha Chacon",
  titulo: "Sambinha Chacon | O nosso encontro tem samba",
  descricao:
    "Site oficial do Sambinha Chacon: samba, alegria e encontro de amigos em Recife. Veja as edições, atrações, galeria e compre seu ingresso pelo WhatsApp sem taxa ou na Bilheteria Digital.",
  // Troque pelo domínio definitivo quando publicar (usado nas imagens de compartilhamento).
  url: "https://sambinhachacon.com.br",
};

export const MENU = [
  { href: "#inicio", rotulo: "Início" },
  { href: "#eventos", rotulo: "Próximos eventos" },
  { href: "#atracoes", rotulo: "Atrações" },
  { href: "#experiencia", rotulo: "A experiência" },
  { href: "#galeria", rotulo: "Galeria" },
  { href: "#ingressos", rotulo: "Ingressos" },
];
