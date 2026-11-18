/**
 * CONTEÚDO INSTITUCIONAL CENTRALIZADO — GRUPO V+
 * ------------------------------------------------------------------
 * Regra do projeto: nada aqui pode ser inventado.
 * Cada texto publicado traz a fonte em `fonte`. Itens sem confirmação ficam
 * em `pendente` (nunca renderizados) — ver docs/INVENTARIO.md.
 *
 * Seções com listas vazias (producoes, momentos, depoimentos) NÃO são
 * publicadas. Basta preencher o array para a seção aparecer no site.
 */

const WHATSAPP_NUMERO = '5581999687850'; // Fonte: Linktree @grupovmais + vmaistickets.com.br

export const links = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    'Olá! Vim pelo site do Grupo V+ e quero falar sobre uma oportunidade comercial.'
  )}`,
  whatsappExibicao: '+55 81 99968-7850',
  tickets: 'https://vmaistickets.com.br',
  ticketsAgenda: 'https://vmaistickets.com.br/agenda',
  ticketsProdutores: 'https://vmaistickets.com.br/produtores',
  linktree: 'https://linktr.ee/grupovmais',
  instagram: {
    grupo: { handle: '@grupovmais', url: 'https://www.instagram.com/grupovmais/' },
    tickets: { handle: '@vmaistickets', url: 'https://www.instagram.com/vmaistickets/' },
    sports: { handle: '@sportsvmais', url: 'https://www.instagram.com/sportsvmais/' },
  },
};

export const grupo = {
  nome: 'Grupo V+',
  // Fonte: bio do Linktree @grupovmais e página /grupo de vmaistickets.com.br
  assinatura: 'Tudo que faz uma experiência acontecer.',
  // Fonte: bio do Linktree @grupovmais
  frentes: ['Eventos universitários', 'Esportes', 'Ingressos'],
  // Fonte: vmaistickets.com.br (hero) e página /grupo (V+ Sports)
  encerramento: 'O que vem a + já chegou.',
  pendente: [
    'Fundadores e equipe (nomes, cargos e fotos autorizadas)',
    'Cidade/sede oficial do grupo',
    'Marcos da trajetória após 2023',
    'Slogan "Momentos que fazem história" — proposta não aprovada, não publicada',
  ],
};

/** História — narrativa por blocos. Cada bloco: título, texto e imagem associada. */
export const historia = [
  {
    marcador: '2023',
    titulo: 'Nascida em 2023.',
    texto:
      'A V+ vem transformando momentos em experiências inesquecíveis.',
    fonte: 'vmaistickets.com.br — seção "Grupo V+"',
  },
  {
    marcador: '+',
    titulo: 'O mais (+) que você procura.',
    texto:
      'Atuação direta em produção de eventos sociais e esportivos, além de venda de eventos sociais.',
    fonte: 'vmaistickets.com.br — seção "Grupo V+"',
  },
  {
    marcador: '→',
    titulo: 'Do começo até o último minuto.',
    texto:
      'Aqui na V+, a gente cuida de tudo, do começo até o último minuto do evento. Porque o básico nunca foi o suficiente.',
    fonte: 'Vídeo oficial V+ Produções (VMAIS-VIDEO-02)',
  },
];

/**
 * GALERIA “CONHEÇA O GRUPO V+” — fotografias reais de eventos enviadas pela V+
 * (originais em source-assets/fotos-grupo/). Somente apresentação: não clicáveis.
 * Cada arquivo só é publicado se existir em public/ (verificado no build).
 * `src` = versão 1400px; `srcSm` = 720px.
 */
const foto = (nome, w, h, alt, papel) => ({
  arquivo: `media/fotos/grupo/${nome}-1400.webp`,
  arquivoSm: `media/fotos/grupo/${nome}-720.webp`,
  w, h, alt, papel,
});
export const galeriaGrupo = [
  foto('grupo-tardezinha-27', 1400, 1867, 'Grupo de amigos posando juntos na pista durante a festa “Tardezinha da 27”.', 'principal'),
  foto('grupo-med27', 1400, 1867, 'Três amigas sorrindo para a câmera em evento Med27 & V+.', 'lateral'),
  foto('grupo-colagem-laranja', 1400, 1867, 'Colagem de quatro fotos do público: amigas, grupo reunido e casal diante de painel laranja.', 'lateral'),
  foto('grupo-colagem-copos', 1400, 1750, 'Colagem de quatro fotos do público na pista, com copos personalizados do evento.', 'baixo'),
  foto('grupo-colagem-producoes', 1080, 1353, 'Colagem de quatro fotos do público em festa da V+ Produções.', 'baixo'),
];

/** Ecossistema — as três empresas */
export const empresas = [
  {
    id: 'producoes',
    nome: 'V+ Produções',
    tema: 'producoes',
    logo: {
      src: 'brand/vmais-producoes-wordmark.png',
      alt: 'V+ Produções',
      w: 543,
      h: 150,
      // Logo extraída da peça oficial (baixa resolução) — solicitar arquivo vetorial.
      baixaResolucao: true,
    },
    // Fonte: vmaistickets.com.br (home e /grupo)
    resumo: 'Produção e assessoria de eventos sociais e privados.',
    frase: 'Dos palcos às arquibancadas: a V+ transforma experiências em momentos memoráveis.',
    // Fonte: peça oficial "Do esporte ao entretenimento"
    destaques: ['Campeonatos', 'Festas', 'Experiência de marca'],
    // Fonte: vídeo oficial VMAIS-VIDEO-02 (legendas)
    publico: 'Para atléticas, comissões e turmas universitárias: banda, estrutura e som — do começo até o último minuto do evento.',
    links: [{ rotulo: 'Instagram @grupovmais', url: links.instagram.grupo.url }],
    // Banner horizontal + arte vertical (materiais enviados pela V+)
    banner: { src: 'media/banners/banner-producoes-1086.webp', srcLg: 'media/banners/banner-producoes-1920.webp', srcSm: 'media/banners/banner-producoes-720.webp', alt: 'Banner V+ Produções: “Produção que entrega — estrutura, organização e experiência do início ao fim.”', w: 1920, h: 640 },
    midia: [
      { src: 'media/artes/producoes-02-640.webp', srcLg: 'media/artes/producoes-02-1086.webp', alt: 'Arte V+ Produções: “Produção de eventos — estrutura, organização e execução para grandes experiências.”', w: 1086, h: 1448, arte: true },
    ],
  },
  {
    id: 'tickets',
    nome: 'V+ Tickets',
    tema: 'tickets',
    logo: {
      src: 'brand/vmais-tickets-horizontal.png',
      alt: 'V+ Tickets',
      w: 1920,
      h: 401,
    },
    // Fonte: vmaistickets.com.br
    resumo: 'O portal que reúne os melhores eventos da região. Do ingresso à entrada, junto com você.',
    frase: 'O primeiro passo para viver +.',
    // Fonte: vmaistickets.com.br/produtores e home
    destaques: [
      'Agenda de eventos do Nordeste',
      'Link de compra, cupons de desconto e venda sem taxa via WhatsApp',
      'Divulgação no portal, nas redes e nos grupos da V+',
    ],
    cupom: { codigo: 'VMAIS', texto: 'Aplique o cupom VMAIS no checkout.' },
    links: [
      { rotulo: 'Acessar vmaistickets.com.br', url: links.tickets, principal: true },
      { rotulo: 'Para produtores', url: links.ticketsProdutores },
      { rotulo: 'Instagram @vmaistickets', url: links.instagram.tickets.url },
    ],
    banner: { src: 'media/banners/banner-tickets-1086.webp', srcLg: 'media/banners/banner-tickets-1920.webp', srcSm: 'media/banners/banner-tickets-720.webp', alt: 'Banner V+ Tickets: “O mesmo cuidado da V+, agora também na hora de garantir seu ingresso.”', w: 1920, h: 640 },
    midia: [
      { src: 'media/artes/tickets-02-640.webp', srcLg: 'media/artes/tickets-02-1086.webp', alt: 'Arte V+ Tickets: “Seu acesso à próxima experiência.”', w: 1086, h: 1448, arte: true },
    ],
  },
  {
    id: 'sports',
    nome: 'V+ Sports',
    tema: 'sports',
    logo: {
      src: 'brand/vmais-sports.png',
      alt: 'V+ Sports',
      w: 734,
      h: 730,
    },
    // Fonte: vmaistickets.com.br (home e /grupo)
    resumo: 'Campeonatos e produção esportiva.',
    frase: 'O que vem a + já chegou.',
    destaques: [],
    links: [{ rotulo: 'Instagram @sportsvmais', url: links.instagram.sports.url }],
    banner: { src: 'media/banners/banner-sports-1086.webp', srcLg: 'media/banners/banner-sports-1920.webp', srcSm: 'media/banners/banner-sports-720.webp', alt: 'Banner V+ Sports: “Esporte é experiência — competições, energia e grandes momentos.”', w: 1920, h: 640 },
    midia: [
      { src: 'media/artes/sports-02-640.webp', srcLg: 'media/artes/sports-02-1086.webp', alt: 'Arte V+ Sports: “Esporte que conecta — eventos esportivos que movimentam pessoas, atletas e torcidas.”', w: 1086, h: 1448, arte: true },
    ],
    pendente: ['Modalidades, campeonatos realizados e fotos reais de eventos esportivos'],
  },
];

/**
 * PRODUÇÕES — portfólio. Vazio até a V+ confirmar eventos (nome, ano, local,
 * participação da V+) e enviar fotos. Formato:
 * { titulo, ano, local, empresa: 'producoes'|'sports', capa: {src, alt, w, h}, fotos: [] }
 */
export const producoes = [];

/**
 * MOMENTOS V+ — fotografias reais do público. Vazio: o pacote recebido não
 * trouxe fotos avulsas do público (somente peças publicitárias). Formato:
 * { src, alt, w, h }
 */
export const momentos = [];

/**
 * FEEDBACKS — somente depoimentos reais e autorizados. Formato:
 * { texto, autor, fonte, evento }
 */
export const depoimentos = [];

/** VÍDEOS */
export const videos = [
  {
    id: 'cuida-de-tudo',
    titulo: 'A gente cuida de tudo',
    empresa: 'V+ Produções',
    descricao: 'Para atléticas, comissões e turmas: do começo até o último minuto do evento.',
    src: 'media/video/vmais-cuida-de-tudo.mp4',
    poster: 'media/img/poster-cuida-de-tudo.webp',
    duracao: '0:22',
    w: 540,
    h: 960,
  },
  {
    id: 'bastidores',
    titulo: 'Bastidores da preparação',
    empresa: 'Grupo V+',
    descricao: 'O espaço, a luz, os materiais e a equipe antes do evento.',
    src: 'media/video/bastidores-preparacao.mp4',
    poster: 'media/img/poster-bastidores.webp',
    duracao: '2:45',
    w: 406,
    h: 720,
  },
];

/**
 * HERO — arte oficial de destaque. Aguardando o arquivo da V+:
 * salve em public/media/hero/hero-arte.webp (vertical ou quadrada, ≥1200px)
 * e preencha `alt`. Sem o arquivo, o Hero mostra só o símbolo oficial.
 */
export const heroArte = {
  arquivo: 'media/hero/hero-arte.webp',
  w: 1200,
  h: 1500,
  alt: '',
};
