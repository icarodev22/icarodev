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
    imagem: {
      src: 'media/img/campanha-momentos-1080.webp',
      srcSm: 'media/img/campanha-momentos-640.webp',
      alt: 'Peça oficial da V+ Produções com o texto “Mais que eventos, criamos momentos”.',
      legenda: 'Campanha oficial — V+ Produções',
    },
  },
  {
    marcador: '+',
    titulo: 'O mais (+) que você procura.',
    texto:
      'Atuação direta em produção de eventos sociais e esportivos, além de venda de eventos sociais.',
    fonte: 'vmaistickets.com.br — seção "Grupo V+"',
    imagem: {
      src: 'media/img/campanha-esporte-entretenimento-1080.webp',
      srcSm: 'media/img/campanha-esporte-entretenimento-640.webp',
      alt: 'Peça oficial da V+ Produções: “Do esporte ao entretenimento” — campeonatos, festas e experiência de marca.',
      legenda: 'Campanha oficial — V+ Produções',
    },
  },
  {
    marcador: '→',
    titulo: 'Do começo até o último minuto.',
    texto:
      'Aqui na V+, a gente cuida de tudo, do começo até o último minuto do evento. Porque o básico nunca foi o suficiente.',
    fonte: 'Vídeo oficial V+ Produções (VMAIS-VIDEO-02)',
    imagem: {
      src: 'media/img/campanha-detalhes-1080.webp',
      srcSm: 'media/img/campanha-detalhes-640.webp',
      alt: 'Peça oficial da V+ Produções: “Grandes eventos começam nos detalhes”.',
      legenda: 'Campanha oficial — V+ Produções',
    },
  },
];

/**
 * GALERIA “CONHEÇA O GRUPO V+” — FOTOGRAFIAS REAIS de pessoas em eventos.
 * Os espaços abaixo só aparecem no site quando o arquivo existir em
 * public/media/fotos/grupo/ (verificado no build). Não usar prints de vídeo,
 * cartazes ou imagens geradas. Formato recomendado: WebP, ≥1600px no lado maior.
 */
export const galeriaGrupo = [
  { arquivo: 'media/fotos/grupo/grupo-01-principal.webp', papel: 'principal', w: 1600, h: 1067, alt: '', pede: 'Foto principal horizontal: público em evento V+ (palco/pista), com emoção.' },
  { arquivo: 'media/fotos/grupo/grupo-02-publico.webp', papel: 'vertical', w: 1067, h: 1600, alt: '', pede: 'Vertical: pessoas do público (rostos, celebração).' },
  { arquivo: 'media/fotos/grupo/grupo-03-esporte.webp', papel: 'vertical', w: 1067, h: 1600, alt: '', pede: 'Vertical: atletas em competição V+ Sports.' },
  { arquivo: 'media/fotos/grupo/grupo-04-equipe.webp', papel: 'horizontal', w: 1600, h: 1067, alt: '', pede: 'Horizontal: equipe V+ trabalhando no evento.' },
  { arquivo: 'media/fotos/grupo/grupo-05-palco.webp', papel: 'quadrada', w: 1400, h: 1400, alt: '', pede: 'Quadrada: atração/DJ no palco.' },
  { arquivo: 'media/fotos/grupo/grupo-06-entrada.webp', papel: 'horizontal', w: 1600, h: 1067, alt: '', pede: 'Horizontal: entrada/acesso do público (V+ Tickets).' },
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
    // Artes de campanha aprovadas provisoriamente (docs/PROMPT_ARTES_VPLUS.txt)
    midia: [
      { src: 'media/artes/producoes-01-640.webp', srcLg: 'media/artes/producoes-01-1086.webp', alt: 'Arte V+ Produções: “Produção que entrega — estrutura, organização e experiência do início ao fim.”', w: 1086, h: 1448, arte: true },
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
    midia: [
      { src: 'media/artes/tickets-01-640.webp', srcLg: 'media/artes/tickets-01-1086.webp', alt: 'Arte V+ Tickets: “Do primeiro ingresso ao último beat.”', w: 1086, h: 1448, arte: true },
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
    midia: [
      { src: 'media/artes/sports-01-640.webp', srcLg: 'media/artes/sports-01-1086.webp', alt: 'Arte V+ Sports: “Esporte é experiência — competições, energia e grandes momentos.”', w: 1086, h: 1448, arte: true },
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

/** BASTIDORES — quadros reais extraídos do vídeo VMAIS-VIDEO-01 */
export const bastidores = {
  fonte: 'Quadros do vídeo oficial VMAIS-VIDEO-01',
  fotos: [
    { src: 'media/img/bastidores-21.webp', alt: 'Integrante da equipe apresenta o espaço com a iluminação montada.', legenda: 'Luz e estrutura' },
    { src: 'media/img/bastidores-38.webp', alt: 'Integrante da equipe carrega uma caixa de materiais.', legenda: 'Materiais' },
    { src: 'media/img/bastidores-128.webp', alt: 'Entrada do espaço com painel iluminado ao fundo.', legenda: 'O espaço' },
    { src: 'media/img/bastidores-52.webp', alt: 'Integrante da equipe mostra copos que serão usados no evento.', legenda: 'Detalhes' },
    { src: 'media/img/bastidores-84.webp', alt: 'Dois integrantes da equipe durante a preparação.', legenda: 'Equipe' },
    { src: 'media/img/bastidores-56.webp', alt: 'Salão vazio durante a preparação.', legenda: 'Antes de abrir' },
    { src: 'media/img/bastidores-158.webp', alt: 'Integrante da equipe sentado ao fim da preparação.', legenda: 'Pronto' },
  ],
};

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

export const heroVideo = {
  src: 'media/video/hero-loop.mp4',
  poster: 'media/img/poster-hero.webp',
  alt: 'Espaço de evento com iluminação montada — registro dos bastidores V+.',
};
