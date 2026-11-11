import type { Personality } from "../types";

const ANCIENT_NOTICE =
  "Ilustração original e estilizada — representação artística, não é retrato autêntico. Não existem retratos realistas da época; as representações conhecidas são esculturas, muitas delas cópias romanas posteriores.";

export const filosofia: Personality[] = [
  {
    slug: "socrates",
    name: "Sócrates",
    category: "filosofia",
    field: "Filosofia (ética e método dialético)",
    born: { year: -470, approximate: true, label: "c. 470/469 a.C." },
    died: { year: -399, label: "399 a.C." },
    birthPlace: "Atenas (demo de Alopece), Grécia",
    deathPlace: "Atenas, Grécia",
    periodLabel: "c. 470–399 a.C.",
    featured: true,
    shortDescription:
      "Filósofo ateniense que não deixou textos escritos e ficou conhecido por examinar ideias por meio de perguntas.",
    historicalContext:
      "Viveu na Atenas democrática do século V a.C., durante o auge cultural da cidade e a Guerra do Peloponeso contra Esparta.",
    biography:
      "Sócrates não escreveu obras; o que se sabe dele vem principalmente de Platão, Xenofonte e da comédia As Nuvens, de Aristófanes. Serviu como hoplita em campanhas militares atenienses. Dedicou-se a conversar em espaços públicos, examinando o que as pessoas afirmavam saber sobre justiça, coragem e virtude. Em 399 a.C. foi julgado por impiedade e por corromper a juventude, condenado à morte e executado com cicuta.",
    contributions: [
      "Método de exame por perguntas e refutação (élenchos).",
      "Centralidade da ética e da pergunta sobre como se deve viver.",
      "Ideia, atribuída a ele por Platão, de que a vida sem exame não vale a pena ser vivida.",
      "Influência decisiva sobre Platão e sobre diversas escolas filosóficas posteriores.",
    ],
    works: [
      "Não deixou escritos. Fontes principais: diálogos de Platão (Apologia, Críton, Fédon), obras de Xenofonte (Memoráveis) e a comédia As Nuvens, de Aristófanes (423 a.C.).",
    ],
    timeline: [
      { when: "c. 470/469 a.C.", event: "Nasce em Atenas." },
      { when: "431 a.C.", event: "Início da Guerra do Peloponeso." },
      { when: "c. 432–422 a.C.", event: "Serve como hoplita em Potideia, Délio e Anfípolis." },
      { when: "423 a.C.", event: "Aristófanes o satiriza na comédia As Nuvens." },
      { when: "404 a.C.", event: "Atenas é derrotada; governo dos Trinta Tiranos." },
      { when: "399 a.C.", event: "É julgado, condenado e executado com cicuta." },
    ],
    references: [
      { title: "Socrates", publisher: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/socrates/", kind: "universidade" },
      { title: "Socrates", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Socrates", kind: "enciclopedia" },
      { title: "Apologia de Sócrates", publisher: "Obra de Platão", kind: "obra" },
    ],
    suggestedQuestions: [
      "O que é a justiça?",
      "Por que você fazia tantas perguntas às pessoas?",
      "O que significa dizer que só sei que nada sei?",
      "Por que você não fugiu antes da execução?",
    ],
    persona: {
      voice:
        "Irônico, paciente e provocador. Responde frequentemente com perguntas, pede definições e conduz o estudante a examinar as próprias crenças. Deve equilibrar perguntas com explicações, para não frustrar o aprendizado.",
      knowledgeHorizon: "399 a.C.",
      sensitiveTopics:
        "O 'problema socrático': não há como separar com certeza o Sócrates histórico do personagem dos diálogos de Platão. Diga isso quando relevante.",
      apocryphalQuotes: [
        "“Só sei que nada sei” é uma formulação posterior que resume uma ideia da Apologia de Platão; não é uma frase literal documentada.",
      ],
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem calvo de barba espessa, com manto grego, com luz de recorte azul.",
      notice: ANCIENT_NOTICE,
      art: { hair: "bald-sides", facialHair: "beard", attire: "himation", tilt: -1 },
    },
    knowledge: [
      {
        id: "metodo",
        title: "O método socrático",
        referenceIdx: [0, 1],
        body:
          "Nos diálogos de Platão, Sócrates pergunta a seus interlocutores o que é uma virtude — por exemplo, coragem ou piedade. Quando o interlocutor propõe uma definição, Sócrates faz novas perguntas que revelam contradições com outras crenças da própria pessoa. Esse procedimento de exame e refutação é chamado de élenchos.\n\nO objetivo não era vencer um debate, mas expor a falsa certeza e estimular a busca pelo conhecimento. Sócrates se apresentava como alguém que não possuía sabedoria, e muitos diálogos terminam sem uma definição final (são chamados aporéticos). Platão também o descreve comparando sua atividade à de uma parteira, que ajuda outros a 'dar à luz' ideias.",
      },
      {
        id: "julgamento",
        title: "O julgamento e a morte",
        referenceIdx: [0, 2],
        body:
          "Em 399 a.C., Sócrates foi acusado por Meleto, Ânito e Lícon de não reconhecer os deuses da cidade, de introduzir novas divindades e de corromper os jovens. O contexto incluía as tensões que se seguiram à derrota de Atenas na Guerra do Peloponeso e ao governo dos Trinta Tiranos, entre cujos líderes estavam pessoas que haviam convivido com ele.\n\nNa Apologia de Platão, Sócrates relata que o oráculo de Delfos teria dito a seu amigo Querefonte que ninguém era mais sábio do que ele, e interpreta isso como reconhecimento de que ao menos sabia não saber. Condenado por um júri de cidadãos, recusou a proposta de fuga apresentada por amigos, segundo o diálogo Críton, e bebeu cicuta, como descrito no Fédon.",
      },
      {
        id: "fontes",
        title: "As fontes e o problema socrático",
        referenceIdx: [0, 1],
        body:
          "Como Sócrates não escreveu nada, o conhecimento sobre ele depende de autores com perspectivas diferentes. Platão o transformou no principal personagem de seus diálogos, mas, com o tempo, atribuiu a ele teorias que provavelmente eram do próprio Platão, como a teoria das Formas. Xenofonte apresenta um Sócrates mais prático e moralista. Aristófanes, em As Nuvens, o retrata de modo satírico como um sofista excêntrico.\n\nA dificuldade de distinguir o Sócrates histórico das representações literárias é conhecida como 'problema socrático'. Qualquer simulação de Sócrates é necessariamente uma interpretação dessas fontes.",
      },
    ],
  },
  {
    slug: "platao",
    name: "Platão",
    category: "filosofia",
    field: "Filosofia (metafísica, ética e política)",
    born: { year: -428, approximate: true, label: "c. 428/427 a.C." },
    died: { year: -348, approximate: true, label: "348/347 a.C." },
    birthPlace: "Atenas, Grécia",
    deathPlace: "Atenas, Grécia",
    periodLabel: "c. 428–348 a.C.",
    shortDescription:
      "Filósofo ateniense, discípulo de Sócrates, fundador da Academia e autor de diálogos como A República.",
    historicalContext:
      "Viveu a crise de Atenas após a Guerra do Peloponeso e a execução de Sócrates, em um período de instabilidade política entre as cidades gregas.",
    biography:
      "Nascido em uma família aristocrática ateniense, Platão foi discípulo de Sócrates. Após a execução do mestre, viajou e, por volta de 387 a.C., fundou a Academia em Atenas, que funcionou por séculos. Fez viagens a Siracusa, na Sicília, envolvendo-se com os governantes Dionísio I e Dionísio II. Escreveu seus textos em forma de diálogo, a maioria com Sócrates como personagem central. Aristóteles estudou na Academia por cerca de vinte anos.",
    contributions: [
      "Teoria das Formas (ou Ideias).",
      "Alegoria da caverna, na República.",
      "Teoria da alma tripartite e reflexões sobre justiça na pessoa e na cidade.",
      "Proposta de governo de filósofos na República.",
      "Fundação da Academia, uma das primeiras instituições de ensino superior do Ocidente.",
    ],
    works: [
      "Apologia de Sócrates",
      "Fédon",
      "O Banquete",
      "A República",
      "Timeu",
      "As Leis",
    ],
    timeline: [
      { when: "c. 428/427 a.C.", event: "Nasce em Atenas." },
      { when: "399 a.C.", event: "Execução de Sócrates." },
      { when: "c. 387 a.C.", event: "Funda a Academia." },
      { when: "c. 367 a.C.", event: "Aristóteles ingressa na Academia; nova viagem a Siracusa." },
      { when: "348/347 a.C.", event: "Morre em Atenas." },
    ],
    references: [
      { title: "Plato", publisher: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/plato/", kind: "universidade" },
      { title: "Plato", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Plato", kind: "enciclopedia" },
      { title: "A República", publisher: "Obra de Platão", kind: "obra" },
    ],
    suggestedQuestions: [
      "O que é a alegoria da caverna?",
      "O que são as Formas?",
      "Por que os filósofos deveriam governar?",
      "Como foi aprender com Sócrates?",
    ],
    persona: {
      voice:
        "Elegante, reflexivo e afeito a imagens e mitos para ilustrar argumentos. Gosta de conduzir o raciocínio em etapas e de retomar as lições de Sócrates.",
      knowledgeHorizon: "347 a.C.",
      sensitiveTopics:
        "Diferencie as posições dos personagens dos diálogos das opiniões de Platão, que são objeto de interpretação. As datas de composição dos diálogos são estimativas.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem de cabelo curto ondulado e barba cheia, com manto grego, com luz de recorte azul.",
      notice: ANCIENT_NOTICE,
      art: { hair: "curly-short", facialHair: "beard", attire: "himation", tilt: 1 },
    },
    knowledge: [
      {
        id: "formas",
        title: "A teoria das Formas",
        referenceIdx: [0, 1],
        body:
          "Em diálogos como o Fédon e a República, Platão apresenta a ideia de que, além das coisas sensíveis e mutáveis, existem Formas (ou Ideias) eternas e imutáveis, como o Belo em si ou o Justo em si. As coisas sensíveis seriam belas ou justas por participarem dessas Formas. O conhecimento verdadeiro diria respeito às Formas, enquanto os sentidos ofereceriam apenas opinião.\n\nA teoria é apresentada por meio do personagem Sócrates, e o próprio Platão a submete a críticas no diálogo Parmênides. Intérpretes discutem até que ponto ela foi uma doutrina sistemática ou um conjunto de hipóteses em desenvolvimento.",
      },
      {
        id: "caverna-republica",
        title: "A República e a alegoria da caverna",
        referenceIdx: [2, 0],
        body:
          "A República investiga o que é a justiça, comparando a alma individual a uma cidade. Platão descreve a alma em três partes — razão, ânimo e apetite — e a cidade ideal em três classes, sendo justa quando cada parte cumpre sua função. Ele propõe que filósofos deveriam governar, pois teriam conhecimento do Bem.\n\nNo livro VII, a alegoria da caverna descreve prisioneiros que só veem sombras projetadas na parede e as tomam pela realidade. Um deles é libertado, sobe até a luz do sol e, ao voltar para contar o que viu, é rejeitado pelos demais. A imagem representa a educação como uma transformação do olhar, do mundo das aparências para o conhecimento.",
      },
      {
        id: "academia",
        title: "A Academia e a obra",
        referenceIdx: [1, 0],
        body:
          "Por volta de 387 a.C., Platão fundou a Academia, em um terreno dedicado ao herói Academo, nos arredores de Atenas. Ali se estudavam matemática, astronomia, dialética e política. Aristóteles foi o aluno mais conhecido.\n\nOs diálogos de Platão costumam ser divididos, com cautela, em fases: os primeiros, centrados no exame socrático de virtudes; os intermediários, como a República; e os tardios, como Timeu e Leis. Essa cronologia é baseada em análise de estilo e conteúdo, não em datas documentadas.",
      },
    ],
  },
  {
    slug: "aristoteles",
    name: "Aristóteles",
    category: "filosofia",
    field: "Filosofia, lógica e ciências naturais",
    born: { year: -384, label: "384 a.C." },
    died: { year: -322, label: "322 a.C." },
    birthPlace: "Estagira, Calcídica, Grécia",
    deathPlace: "Cálcis, Eubeia, Grécia",
    periodLabel: "384–322 a.C.",
    shortDescription:
      "Filósofo grego que sistematizou a lógica e escreveu sobre ética, política, biologia, física e poética.",
    historicalContext:
      "Viveu durante a ascensão da Macedônia de Filipe II e as conquistas de Alexandre, o Grande, que transformaram o mundo grego.",
    biography:
      "Filho de um médico da corte macedônia, Aristóteles estudou na Academia de Platão por cerca de vinte anos. Após a morte de Platão, viveu na Ásia Menor e em Lesbos, onde fez pesquisas biológicas. Por volta de 343 a.C. tornou-se tutor do jovem Alexandre. Em 335 a.C. fundou em Atenas sua própria escola, o Liceu. Após a morte de Alexandre, em 323 a.C., deixou Atenas por causa do sentimento antimacedônio e morreu em Cálcis no ano seguinte.",
    contributions: [
      "Sistematização da lógica formal (teoria do silogismo).",
      "Ética das virtudes e a noção de virtude como meio-termo.",
      "Análise comparativa de constituições na Política.",
      "Observação e classificação de animais, base da biologia antiga.",
      "Teoria das quatro causas e conceitos de ato e potência.",
    ],
    works: ["Órganon (conjunto de obras de lógica)", "Física", "Metafísica", "Ética a Nicômaco", "Política", "Poética", "História dos Animais"],
    timeline: [
      { when: "384 a.C.", event: "Nasce em Estagira." },
      { when: "c. 367 a.C.", event: "Ingressa na Academia de Platão." },
      { when: "347 a.C.", event: "Morte de Platão; deixa Atenas." },
      { when: "c. 343 a.C.", event: "Torna-se tutor de Alexandre na Macedônia." },
      { when: "335 a.C.", event: "Funda o Liceu em Atenas." },
      { when: "323 a.C.", event: "Morte de Alexandre; deixa Atenas." },
      { when: "322 a.C.", event: "Morre em Cálcis." },
    ],
    references: [
      { title: "Aristotle", publisher: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/aristotle/", kind: "universidade" },
      { title: "Aristotle", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Aristotle", kind: "enciclopedia" },
      { title: "Ética a Nicômaco", publisher: "Obra de Aristóteles", kind: "obra" },
    ],
    suggestedQuestions: [
      "O que é um silogismo?",
      "O que significa virtude como meio-termo?",
      "Em que você discordava de Platão?",
      "Como você estudava os animais?",
    ],
    persona: {
      voice:
        "Sistemático, didático e observador. Gosta de definir termos, classificar e partir de exemplos concretos. Reconhece a dívida com Platão, mas expõe suas divergências com clareza.",
      knowledgeHorizon: "322 a.C.",
      sensitiveTopics:
        "Algumas posições de Aristóteles, como a defesa da escravidão 'natural' e a visão sobre a inferioridade das mulheres, devem ser apresentadas historicamente e criticamente, deixando claro que são rejeitadas hoje.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem de cabelo curto e barba aparada, com manto grego, com luz de recorte azul.",
      notice: ANCIENT_NOTICE,
      art: { hair: "short", facialHair: "beard", attire: "himation", tilt: 2 },
    },
    knowledge: [
      {
        id: "logica",
        title: "Lógica e silogismo",
        referenceIdx: [0, 1],
        body:
          "Nas obras reunidas posteriormente sob o nome de Órganon ('instrumento'), Aristóteles desenvolveu a primeira teoria sistemática da inferência válida. O silogismo é um argumento em que, dadas duas premissas, uma conclusão se segue necessariamente — por exemplo: todo homem é mortal; Sócrates é homem; logo, Sócrates é mortal.\n\nAristóteles classificou formas de silogismo e mostrou quais são válidas. Sua lógica foi a base do estudo da lógica no Ocidente e no mundo islâmico por cerca de dois mil anos, até o desenvolvimento da lógica matemática no século XIX.",
      },
      {
        id: "etica-politica",
        title: "Ética e política",
        referenceIdx: [2, 0],
        body:
          "Na Ética a Nicômaco, Aristóteles sustenta que o fim último da vida humana é a eudaimonia, frequentemente traduzida como felicidade ou florescimento, alcançada pela atividade conforme a virtude. As virtudes de caráter são disposições adquiridas pelo hábito e situam-se em um meio-termo entre excesso e falta: a coragem, por exemplo, está entre a temeridade e a covardia.\n\nNa Política, afirma que o ser humano é por natureza um animal político e analisa diversas constituições gregas, distinguindo formas de governo de um, de poucos e de muitos, e suas versões corrompidas. Algumas de suas teses, como a justificação da escravidão, são historicamente importantes e hoje amplamente rejeitadas.",
      },
      {
        id: "natureza",
        title: "Física, biologia e as quatro causas",
        referenceIdx: [0, 1],
        body:
          "Aristóteles explicava as coisas naturais por meio de quatro tipos de causa: material (de que é feito), formal (o que é), eficiente (o que o produziu) e final (para que existe). Distinguiu também ato e potência para explicar a mudança.\n\nEm Lesbos e em outros lugares, observou e descreveu centenas de espécies animais, especialmente marinhas, em obras como a História dos Animais. Parte de suas descrições foi confirmada muito tempo depois; outras afirmações, como algumas sobre a física do movimento, foram superadas pela ciência moderna a partir de Galileu e Newton.",
      },
    ],
  },
];

