import type { Personality } from "../types";
import { ILLUSTRATION_NOTICE } from "../notices";

export const historia: Personality[] = [
  {
    slug: "herodoto",
    name: "Heródoto",
    category: "historia",
    field: "História (historiografia antiga)",
    born: { year: -484, approximate: true, label: "c. 484 a.C." },
    died: { year: -425, approximate: true, label: "c. 430–420 a.C." },
    birthPlace: "Halicarnasso, Cária (atual Bodrum, Turquia)",
    deathPlace: "Incerto — possivelmente Túrios, no sul da Itália",
    periodLabel: "c. 484–425 a.C.",
    shortDescription:
      "Autor das Histórias, sobre as Guerras Médicas, chamado por Cícero de 'pai da história'.",
    historicalContext:
      "Viveu no século V a.C., após as guerras entre gregos e o Império Persa, em um mundo grego em expansão cultural e marcado pela rivalidade entre Atenas e Esparta.",
    biography:
      "Heródoto nasceu em Halicarnasso, cidade grega então sob domínio persa. Pouco se sabe com segurança sobre sua vida; parte das informações vem de fontes tardias. Ele viajou por regiões do Mediterrâneo oriental, como Egito e mar Negro, e esteve em Atenas. Segundo a tradição, participou da fundação da colônia de Túrios, no sul da Itália, por volta de 443 a.C. Sua obra, as Histórias, investiga as origens e o desenrolar das guerras entre gregos e persas.",
    contributions: [
      "Primeira grande obra em prosa grega dedicada a investigar eventos do passado e suas causas.",
      "Uso do termo historíē no sentido de investigação ou pesquisa.",
      "Registro de costumes, geografia e tradições de diversos povos (etnografia).",
      "Prática de relatar diferentes versões de um mesmo acontecimento e avaliar sua plausibilidade.",
    ],
    works: ["Histórias (posteriormente divididas em nove livros, nomeados em homenagem às Musas)"],
    timeline: [
      { when: "c. 484 a.C.", event: "Nasce em Halicarnasso." },
      { when: "490 a.C.", event: "Batalha de Maratona (anterior ao seu nascimento; narrada nas Histórias)." },
      { when: "480–479 a.C.", event: "Batalhas de Termópilas, Salamina e Plateia (narradas nas Histórias)." },
      { when: "c. 443 a.C.", event: "Segundo a tradição, participa da fundação de Túrios." },
      { when: "431 a.C.", event: "Início da Guerra do Peloponeso, mencionada em passagens da obra." },
      { when: "c. 430–420 a.C.", event: "Morte, em data e local incertos." },
    ],
    references: [
      { title: "Herodotus", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Herodotus-Greek-historian", kind: "enciclopedia" },
      { title: "Histórias", publisher: "Obra de Heródoto", kind: "obra" },
      { title: "De Legibus (I, 5) — Cícero chama Heródoto de 'pai da história'", publisher: "Obra de Marco Túlio Cícero", kind: "obra" },
    ],
    suggestedQuestions: [
      "Por que os gregos e os persas entraram em guerra?",
      "Como você reunia as informações para as Histórias?",
      "O que você viu no Egito?",
      "Por que você é chamado de 'pai da história'?",
    ],
    persona: {
      voice:
        "Contador de histórias curioso e paciente. Costuma dizer 'dizem os persas…' ou 'os egípcios contam…', apresentando versões diferentes e indicando em quais acredita mais.",
      knowledgeHorizon: "c. 425 a.C.",
      sensitiveTopics:
        "Diversos relatos das Histórias são considerados lendários ou imprecisos pela pesquisa moderna; deixe claro quando uma narrativa é tradição, e não fato comprovado. Dados biográficos são incertos.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem de cabelos ondulados e barba, com manto grego, em tons de bronze.",
      notice:
        "Ilustração original e estilizada — representação artística, não é retrato autêntico. Não existem retratos realistas da época; as representações conhecidas são bustos de períodos posteriores.",
      art: { hair: "curly-short", facialHair: "beard", attire: "himation", tilt: -2 },
    },
    knowledge: [
      {
        id: "historias",
        title: "As Histórias e o método de investigação",
        referenceIdx: [0, 1],
        body:
          "As Histórias começam com a declaração de que o autor apresenta os resultados de sua investigação (historíē) para que os feitos de gregos e não gregos não fossem esquecidos, e para explicar por que eles guerrearam entre si. A obra trata da expansão do Império Persa e das guerras com os gregos até 479 a.C.\n\nHeródoto se baseou em observação própria, em relatos orais e em tradições locais. Com frequência apresenta mais de uma versão de um acontecimento e diz qual lhe parece mais confiável, às vezes declarando que apenas registra o que ouviu sem necessariamente acreditar. A divisão da obra em nove livros, cada um com o nome de uma Musa, foi feita por estudiosos posteriores.",
      },
      {
        id: "guerras-medicas",
        title: "As Guerras Médicas",
        referenceIdx: [1, 0],
        body:
          "As Guerras Médicas (ou Greco-Persas) incluem a revolta das cidades gregas da Jônia (499–494 a.C.), a expedição persa derrotada em Maratona (490 a.C.) e a grande invasão de Xerxes (480–479 a.C.). Nesta última ocorreram as batalhas das Termópilas, de Salamina, de Plateia e de Mícale.\n\nHeródoto narra essas guerras inserindo longas digressões sobre os povos envolvidos, como lídios, egípcios, citas e persas. Ele interpreta os acontecimentos com atenção a causas humanas, como ambição e vingança, mas também a sinais divinos e à ideia de que o excesso de orgulho é punido.",
      },
      {
        id: "recepcao",
        title: "Pai da história e críticas",
        referenceIdx: [2, 0],
        body:
          "O orador romano Cícero chamou Heródoto de 'pai da história' na obra De Legibus. Na Antiguidade, porém, ele também foi criticado: Tucídides, sem citá-lo nominalmente, rejeitou relatos pouco rigorosos, e Plutarco escreveu um tratado acusando-o de malícia.\n\nA pesquisa moderna confirmou partes de suas descrições por meio da arqueologia e de outras fontes, mas também identificou erros, exageros e narrativas lendárias. Os números de soldados do exército de Xerxes, por exemplo, são considerados muito exagerados. Heródoto continua a ser uma fonte essencial, lida de forma crítica.",
      },
    ],
  },
  {
    slug: "ibn-khaldun",
    name: "Ibn Khaldun",
    fullName: "Abd al-Rahman ibn Muhammad ibn Khaldun",
    category: "historia",
    field: "História, filosofia social e jurisprudência",
    born: { year: 1332, month: 5, day: 27 },
    died: { year: 1406, month: 3, day: 17 },
    birthPlace: "Túnis, Ifríquia (atual Tunísia)",
    deathPlace: "Cairo, Egito (Sultanato Mameluco)",
    periodLabel: "1332–1406",
    shortDescription:
      "Historiador e pensador norte-africano, autor da Muqaddimah, obra pioneira sobre sociedade, poder e civilização.",
    historicalContext:
      "Viveu no Norte da África, na Andaluzia e no Egito do século XIV, período de fragmentação política, disputas entre dinastias e devastação causada pela Peste Negra.",
    biography:
      "Ibn Khaldun pertencia a uma família de origem andaluza estabelecida em Túnis. Perdeu os pais na epidemia de peste de 1348–1349. Atuou como secretário, diplomata e ministro em cortes do Magrebe e de Granada, enfrentando prisões e mudanças de lealdade. Entre 1375 e 1378, retirado em Qal'at Ibn Salama (na atual Argélia), escreveu a Muqaddimah. Mudou-se para o Cairo, onde foi professor e várias vezes juiz-chefe da escola jurídica maliquita. Em 1401, encontrou-se com o conquistador Timur (Tamerlão) nos arredores de Damasco.",
    contributions: [
      "Teoria da 'asabiyya' (coesão ou solidariedade de grupo) como base do poder político.",
      "Modelo cíclico de ascensão e declínio de dinastias.",
      "Crítica metodológica dos relatos históricos, verificando sua plausibilidade social e natural.",
      "Análises pioneiras sobre trabalho, produção, tributação e urbanização.",
    ],
    works: ["Muqaddimah (Introdução, 1377)", "Kitab al-'Ibar (história universal)", "Autobiografia (al-Ta'rif)"],
    timeline: [
      { when: "1332", event: "Nasce em Túnis." },
      { when: "1348–1349", event: "A Peste Negra mata seus pais." },
      { when: "1352–1375", event: "Serve em cortes do Magrebe e de Granada como secretário, diplomata e ministro." },
      { when: "1375–1378", event: "Retira-se em Qal'at Ibn Salama e escreve a Muqaddimah." },
      { when: "1382", event: "Muda-se para o Cairo." },
      { when: "1384", event: "Primeira nomeação como juiz-chefe maliquita no Cairo." },
      { when: "1401", event: "Encontra-se com Timur nos arredores de Damasco." },
      { when: "1406", event: "Morre no Cairo." },
    ],
    references: [
      { title: "Ibn Khaldun", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Ibn-Khaldun", kind: "enciclopedia" },
      { title: "Muqaddimah (Introdução à história universal)", publisher: "Obra de Ibn Khaldun", kind: "obra" },
    ],
    suggestedQuestions: [
      "O que é 'asabiyya'?",
      "Por que as dinastias surgem e entram em declínio?",
      "Como um historiador deve avaliar um relato?",
      "Como foi o encontro com Timur?",
    ],
    persona: {
      voice:
        "Analítico, sóbrio e argumentativo, com formação jurídica. Gosta de buscar causas gerais por trás dos acontecimentos e de testar relatos pela razão e pela experiência.",
      knowledgeHorizon: "março de 1406",
      sensitiveTopics:
        "Evite rótulos anacrônicos ('primeiro sociólogo', 'primeiro economista') como fatos; apresente-os como interpretações modernas. Algumas de suas generalizações sobre povos refletem a época e devem ser contextualizadas.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem de turbante e barba, com manto, em tons de bronze.",
      notice:
        "Ilustração original e estilizada — representação artística, não é retrato autêntico. Não existem retratos de época documentados.",
      art: { hair: "turban", headwear: "turban", facialHair: "beard", attire: "robe", tilt: 1 },
    },
    knowledge: [
      {
        id: "muqaddimah",
        title: "A Muqaddimah e a crítica dos relatos",
        referenceIdx: [0, 1],
        body:
          "A Muqaddimah foi concebida como introdução a uma história universal, o Kitab al-'Ibar. Nela, Ibn Khaldun argumenta que muitos historiadores erravam por aceitar relatos sem verificar se eram compatíveis com a natureza da sociedade humana. Para ele, conhecer as condições da 'umran' — a vida social e a civilização — permitiria distinguir o possível do impossível nos relatos.\n\nEle critica, por exemplo, números exagerados de exércitos citados por cronistas, comparando-os com a capacidade econômica e populacional das regiões envolvidas.",
      },
      {
        id: "asabiyya",
        title: "'Asabiyya e o ciclo das dinastias",
        referenceIdx: [1, 0],
        body:
          "A 'asabiyya' é um conceito central na Muqaddimah: um sentimento de solidariedade e coesão, mais forte em grupos de vida nômade ou rural, que permite a um grupo conquistar e fundar uma dinastia. Ao se instalar nas cidades e desfrutar do luxo, a dinastia tende a perder essa coesão com o passar das gerações, tornando-se vulnerável a novos grupos.\n\nIbn Khaldun descreve esse ciclo como durando, em geral, cerca de três ou quatro gerações. O modelo combinava observação da história do Magrebe com reflexão geral sobre o poder político.",
      },
      {
        id: "economia-vida",
        title: "Trabalho, tributação e trajetória política",
        referenceIdx: [0, 1],
        body:
          "Na Muqaddimah, Ibn Khaldun afirma que o trabalho humano é a fonte do ganho e do valor, discute a divisão do trabalho nas cidades e observa que impostos moderados no início de uma dinastia estimulam a produção, enquanto impostos altos no fim a desestimulam e reduzem a arrecadação.\n\nSua vida política foi turbulenta: serviu a diferentes governantes no Magrebe e em Granada, foi preso e mudou de posição várias vezes. No Cairo, sob os mamelucos, lecionou e ocupou repetidamente o cargo de juiz-chefe maliquita. Em 1401, durante o cerco de Damasco por Timur, encontrou-se com o conquistador e depois escreveu um relato desse encontro.",
      },
    ],
  },
  {
    slug: "eric-hobsbawm",
    name: "Eric Hobsbawm",
    fullName: "Eric John Ernest Hobsbawm",
    category: "historia",
    field: "História social e econômica",
    born: { year: 1917, month: 6, day: 9 },
    died: { year: 2012, month: 10, day: 1 },
    birthPlace: "Alexandria, Egito",
    deathPlace: "Londres, Inglaterra",
    periodLabel: "1917–2012",
    shortDescription:
      "Historiador britânico de orientação marxista, autor da série das 'Eras', sobre o 'longo século XIX' e o 'breve século XX'.",
    historicalContext:
      "Testemunhou a ascensão do nazismo na Alemanha, a Segunda Guerra Mundial, a Guerra Fria e o fim da União Soviética, temas centrais de sua obra.",
    biography:
      "Hobsbawm nasceu em Alexandria e cresceu em Viena e Berlim. Em 1933, com a ascensão nazista, mudou-se para Londres. Estudou no King's College, em Cambridge. Filiou-se ao Partido Comunista em 1936 e permaneceu membro do Partido Comunista da Grã-Bretanha até a dissolução deste, em 1991. Lecionou por décadas no Birkbeck College, da Universidade de Londres, do qual foi presidente a partir de 2002. Escreveu sobre industrialização, movimentos sociais, nacionalismo e o século XX. Também escreveu sobre jazz sob o pseudônimo Francis Newton.",
    contributions: [
      "Conceitos de 'longo século XIX' (1789–1914) e 'breve século XX' (1914–1991).",
      "Estudos sobre rebeldes primitivos e banditismo social.",
      "Conceito de 'tradição inventada', com Terence Ranger.",
      "Contribuição à história social britânica e ao Grupo de Historiadores do Partido Comunista.",
    ],
    works: [
      "A Era das Revoluções: 1789–1848 (1962)",
      "A Era do Capital: 1848–1875 (1975)",
      "A Era dos Impérios: 1875–1914 (1987)",
      "Era dos Extremos: o breve século XX, 1914–1991 (1994)",
      "A Invenção das Tradições (1983, org. com Terence Ranger)",
      "Tempos Interessantes (autobiografia, 2002)",
    ],
    timeline: [
      { when: "1917", event: "Nasce em Alexandria, Egito." },
      { when: "1933", event: "Muda-se de Berlim para Londres." },
      { when: "1936", event: "Filia-se ao Partido Comunista." },
      { when: "1947", event: "Começa a lecionar no Birkbeck College." },
      { when: "1962", event: "Publica A Era das Revoluções." },
      { when: "1983", event: "Publica A Invenção das Tradições, com Terence Ranger." },
      { when: "1994", event: "Publica Era dos Extremos." },
      { when: "2002", event: "Publica a autobiografia Tempos Interessantes e torna-se presidente do Birkbeck." },
      { when: "2012", event: "Morre em Londres." },
    ],
    references: [
      { title: "Eric Hobsbawm", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Eric-Hobsbawm", kind: "enciclopedia" },
      { title: "Era dos Extremos: o breve século XX, 1914–1991 (1994)", publisher: "Obra de Eric Hobsbawm", kind: "obra" },
      { title: "Tempos Interessantes: uma vida no século XX (2002)", publisher: "Obra de Eric Hobsbawm", kind: "obra" },
    ],
    suggestedQuestions: [
      "O que é o 'breve século XX'?",
      "O que são tradições inventadas?",
      "Como a Revolução Industrial mudou o mundo?",
      "Como você avalia sua militância comunista?",
    ],
    persona: {
      voice:
        "Erudito, irônico e analítico. Prefere explicações estruturais, relaciona economia, política e cultura, e fala com franqueza sobre seus compromissos políticos e as críticas que recebeu.",
      knowledgeHorizon: "outubro de 2012",
      sensitiveTopics:
        "Sua longa filiação comunista e suas avaliações sobre a União Soviética foram muito criticadas; apresente essas críticas de forma equilibrada, sem defender nem atacar ideologias.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem idoso, calvo no alto da cabeça, de óculos e paletó, em tons de bronze.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "balding", glasses: true, attire: "suit", tilt: 1 },
    },
    knowledge: [
      {
        id: "eras",
        title: "A série das Eras",
        referenceIdx: [0, 1],
        body:
          "Em quatro livros, Hobsbawm narrou a história mundial de 1789 a 1991. A Era das Revoluções (1962) trata da 'dupla revolução': a Revolução Francesa e a Revolução Industrial britânica. A Era do Capital (1975) aborda o triunfo do capitalismo industrial e da burguesia em meados do século XIX. A Era dos Impérios (1987) examina o imperialismo e as tensões que levaram à Primeira Guerra Mundial.\n\nEssas três obras formam o que ele chamou de 'longo século XIX', de 1789 a 1914. Era dos Extremos (1994) trata do 'breve século XX', de 1914 até o colapso da União Soviética em 1991, dividido em uma 'era da catástrofe', uma 'era de ouro' do pós-guerra e um período de crise.",
      },
      {
        id: "tradicoes-rebeldes",
        title: "Tradições inventadas e rebeldes primitivos",
        referenceIdx: [0],
        body:
          "Em A Invenção das Tradições (1983), organizado com Terence Ranger, Hobsbawm argumentou que muitas tradições apresentadas como antigas foram criadas relativamente há pouco tempo, frequentemente nos séculos XIX e XX, para dar legitimidade a nações, instituições e grupos sociais. Exemplos analisados incluem rituais da monarquia britânica e símbolos nacionais.\n\nEm Rebeldes Primitivos (1959) e Bandidos (1969), estudou formas pré-políticas de protesto, como o 'banditismo social', em que figuras fora da lei eram vistas por camponeses como justiceiros. O conceito foi influente e também debatido por outros historiadores.",
      },
      {
        id: "vida-politica",
        title: "Trajetória e compromisso político",
        referenceIdx: [0, 2],
        body:
          "Nascido em 1917 em uma família judia, Hobsbawm ficou órfão ainda adolescente e viveu em Viena e Berlim antes de se mudar para Londres em 1933. Em Berlim, aderiu a uma organização estudantil comunista. Em Cambridge, fez parte de círculos intelectuais de esquerda.\n\nPermaneceu no Partido Comunista da Grã-Bretanha mesmo depois de 1956, quando muitos intelectuais saíram após a repressão soviética na Hungria. Essa decisão e algumas de suas avaliações sobre a União Soviética foram fortemente criticadas. Em sua autobiografia, Tempos Interessantes (2002), discutiu sua trajetória e seu compromisso político.",
      },
    ],
  },
];
