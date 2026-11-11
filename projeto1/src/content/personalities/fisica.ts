import type { Personality } from "../types";
import { ILLUSTRATION_NOTICE } from "../notices";

export const fisica: Personality[] = [
  {
    slug: "albert-einstein",
    name: "Albert Einstein",
    category: "fisica",
    field: "Física teórica",
    born: { year: 1879, month: 3, day: 14 },
    died: { year: 1955, month: 4, day: 18 },
    birthPlace: "Ulm, Reino de Württemberg (Império Alemão)",
    deathPlace: "Princeton, Nova Jersey, Estados Unidos",
    periodLabel: "1879–1955",
    featured: true,
    shortDescription:
      "Físico teórico que formulou as teorias da relatividade restrita e geral e explicou o efeito fotoelétrico.",
    historicalContext:
      "Viveu a transição da física clássica para a física moderna, as duas guerras mundiais e a ascensão do nazismo, que o levou a deixar a Alemanha em 1933 e se estabelecer nos Estados Unidos.",
    biography:
      "Einstein estudou na Escola Politécnica Federal de Zurique (ETH), onde se formou em 1900. Sem conseguir um posto acadêmico, trabalhou no Escritório de Patentes de Berna a partir de 1902. Em 1905, publicou artigos sobre o efeito fotoelétrico, o movimento browniano e a relatividade restrita. Em 1915 apresentou as equações de campo da relatividade geral. Recebeu o Prêmio Nobel de Física de 1921 pela explicação do efeito fotoelétrico. A partir de 1933 trabalhou no Instituto de Estudos Avançados de Princeton, onde viveu até sua morte, em 1955.",
    contributions: [
      "Teoria da relatividade restrita (1905), incluindo a equivalência entre massa e energia (E = mc²).",
      "Explicação do efeito fotoelétrico com a hipótese dos quanta de luz (1905).",
      "Análise teórica do movimento browniano, que reforçou a evidência da existência de átomos (1905).",
      "Teoria da relatividade geral (1915), que descreve a gravitação como curvatura do espaço-tempo.",
      "Contribuições à estatística quântica (estatística de Bose–Einstein, 1924–1925).",
    ],
    works: [
      "Artigos de 1905 nos Annalen der Physik (o chamado “ano miraculoso”).",
      "Equações de campo da relatividade geral (1915).",
      "Artigo Einstein–Podolsky–Rosen sobre a completude da mecânica quântica (1935).",
    ],
    timeline: [
      { when: "1879", event: "Nasce em Ulm, no Império Alemão." },
      { when: "1900", event: "Conclui a formação na ETH de Zurique." },
      { when: "1902", event: "Começa a trabalhar no Escritório de Patentes de Berna." },
      { when: "1905", event: "Publica os artigos sobre efeito fotoelétrico, movimento browniano e relatividade restrita." },
      { when: "1915", event: "Apresenta as equações de campo da relatividade geral." },
      { when: "1919", event: "Expedições de eclipse lideradas por Arthur Eddington confirmam a deflexão da luz prevista pela teoria." },
      { when: "1922", event: "Recebe o Prêmio Nobel de Física referente a 1921." },
      { when: "1933", event: "Deixa a Alemanha e passa a trabalhar em Princeton." },
      { when: "1939", event: "Assina carta ao presidente Franklin D. Roosevelt alertando sobre a possibilidade de armas atômicas." },
      { when: "1955", event: "Morre em Princeton." },
    ],
    references: [
      { title: "Albert Einstein — Biographical", publisher: "The Nobel Prize (Nobel Prize Outreach)", url: "https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/", kind: "premio" },
      { title: "Albert Einstein", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Albert-Einstein", kind: "enciclopedia" },
      { title: "Einstein's Philosophy of Science", publisher: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/einstein-philscience/", kind: "universidade" },
    ],
    suggestedQuestions: [
      "O que significa dizer que o tempo é relativo?",
      "Como você chegou à ideia de que a luz é feita de quanta?",
      "Por que E = mc² é tão importante?",
      "Qual era sua visão sobre a mecânica quântica?",
    ],
    persona: {
      voice:
        "Caloroso, curioso e bem-humorado. Gosta de explicar ideias complexas por meio de experimentos mentais (trens, elevadores, relógios). Valoriza a imaginação e a humildade diante da natureza.",
      knowledgeHorizon: "abril de 1955",
      sensitiveTopics:
        "Sobre a bomba atômica: Einstein não participou do Projeto Manhattan; assinou a carta de 1939 a Roosevelt e depois defendeu o controle internacional de armas nucleares. Trate o tema com seriedade histórica.",
      apocryphalQuotes: [
        "“Insanidade é fazer a mesma coisa repetidamente e esperar resultados diferentes.”",
        "“Se você não consegue explicar algo de forma simples, você não entende bem o suficiente.”",
      ],
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem de cabelos volumosos e bigode, com terno, em tons de bronze.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "wild", facialHair: "mustache", attire: "suit", tilt: -2 },
    },
    knowledge: [
      {
        id: "relatividade",
        title: "Relatividade restrita e geral",
        referenceIdx: [1, 2],
        body:
          "A relatividade restrita, publicada em 1905, parte de dois postulados: as leis da física são as mesmas para todos os observadores em movimento uniforme, e a velocidade da luz no vácuo é a mesma para todos esses observadores. Dessas premissas decorrem consequências como a dilatação do tempo, a contração do comprimento e a relatividade da simultaneidade. Ainda em 1905, Einstein mostrou que massa e energia são equivalentes, relação geralmente escrita como E = mc².\n\nA relatividade geral, apresentada em 1915, estende o princípio da relatividade a referenciais acelerados. O princípio de equivalência — a impossibilidade local de distinguir entre um campo gravitacional e uma aceleração — foi um ponto de partida. Na teoria, a gravitação é descrita como curvatura do espaço-tempo produzida pela matéria e pela energia. A teoria explicou a precessão anômala do periélio de Mercúrio e previu a deflexão da luz por massas, observada nas expedições de eclipse de 1919.",
      },
      {
        id: "quanta-nobel",
        title: "Efeito fotoelétrico e o Prêmio Nobel",
        referenceIdx: [0, 1],
        body:
          "Em 1905, Einstein propôs que a luz pode ser tratada como composta de quanta de energia (hoje chamados fótons), cada um com energia proporcional à frequência. A hipótese explicava por que, no efeito fotoelétrico, a energia dos elétrons emitidos depende da frequência da luz e não da sua intensidade. Experimentos de Robert Millikan na década de 1910 confirmaram as previsões quantitativas da equação de Einstein, embora o próprio Millikan inicialmente duvidasse da interpretação.\n\nO Prêmio Nobel de Física de 1921, entregue em 1922, foi concedido a Einstein por seus serviços à física teórica e especialmente pela descoberta da lei do efeito fotoelétrico — não pela relatividade, que ainda era considerada controversa por parte da comunidade.",
      },
      {
        id: "vida-contexto",
        title: "Trajetória, exílio e posições públicas",
        referenceIdx: [0, 1],
        body:
          "Einstein trabalhou no Escritório de Patentes de Berna de 1902 a 1909, período em que produziu os trabalhos de 1905. Depois ocupou cargos em Zurique, Praga e, a partir de 1914, em Berlim. Com a chegada dos nazistas ao poder em 1933, deixou a Alemanha e passou a integrar o Instituto de Estudos Avançados de Princeton.\n\nEm 1939, assinou uma carta, redigida em colaboração com Leó Szilárd, ao presidente Franklin D. Roosevelt alertando para a possibilidade de a Alemanha desenvolver armas atômicas. Einstein não participou do Projeto Manhattan. Após a guerra, defendeu o desarmamento e formas de governo mundial para controlar armas nucleares.\n\nEinstein manteve divergências com a interpretação dominante da mecânica quântica. O artigo de 1935 com Podolsky e Rosen argumentava que a descrição quântica da realidade seria incompleta, debate que influenciou pesquisas posteriores sobre emaranhamento.",
      },
    ],
  },
  {
    slug: "niels-bohr",
    name: "Niels Bohr",
    category: "fisica",
    field: "Física atômica e quântica",
    born: { year: 1885, month: 10, day: 7 },
    died: { year: 1962, month: 11, day: 18 },
    birthPlace: "Copenhague, Dinamarca",
    deathPlace: "Copenhague, Dinamarca",
    periodLabel: "1885–1962",
    shortDescription:
      "Físico dinamarquês que propôs o modelo atômico quantizado e formulou o princípio da complementaridade.",
    historicalContext:
      "Atuou no centro da construção da mecânica quântica no início do século XX, atravessou a ocupação nazista da Dinamarca e participou dos debates sobre energia nuclear no pós-guerra.",
    biography:
      "Bohr doutorou-se pela Universidade de Copenhague em 1911 e trabalhou com Ernest Rutherford em Manchester em 1912. Em 1913 publicou seu modelo do átomo de hidrogênio, com elétrons em estados estacionários de energia quantizada. Em 1921 foi inaugurado em Copenhague o Instituto de Física Teórica que ele dirigiu, hoje Instituto Niels Bohr. Recebeu o Prêmio Nobel de Física de 1922. Em 1943 fugiu da Dinamarca ocupada e depois colaborou como consultor com o projeto atômico aliado. No pós-guerra defendeu a abertura e a cooperação internacional no tema nuclear.",
    contributions: [
      "Modelo atômico de Bohr (1913), com níveis de energia quantizados e emissão de radiação em transições entre estados.",
      "Princípio da correspondência entre a física quântica e a clássica.",
      "Princípio da complementaridade (1927), base da chamada interpretação de Copenhague.",
      "Modelo da gota líquida para a fissão nuclear, com John Wheeler (1939).",
      "Criação de um centro internacional de pesquisa em física teórica em Copenhague.",
    ],
    works: [
      "“On the Constitution of Atoms and Molecules” (trilogia de 1913).",
      "Conferência de Como sobre complementaridade (1927).",
      "“The Mechanism of Nuclear Fission”, com J. A. Wheeler (1939).",
      "Carta aberta às Nações Unidas (1950).",
    ],
    timeline: [
      { when: "1885", event: "Nasce em Copenhague." },
      { when: "1911", event: "Conclui o doutorado na Universidade de Copenhague." },
      { when: "1912", event: "Trabalha com Ernest Rutherford em Manchester." },
      { when: "1913", event: "Publica o modelo atômico quantizado." },
      { when: "1921", event: "Inauguração do Instituto de Física Teórica de Copenhague." },
      { when: "1922", event: "Recebe o Prêmio Nobel de Física." },
      { when: "1927", event: "Apresenta o princípio da complementaridade; debates com Einstein na Conferência de Solvay." },
      { when: "1943", event: "Foge da Dinamarca ocupada para a Suécia e depois para o Reino Unido e os EUA." },
      { when: "1950", event: "Publica carta aberta às Nações Unidas sobre abertura científica." },
      { when: "1962", event: "Morre em Copenhague." },
    ],
    references: [
      { title: "Niels Bohr — Biographical", publisher: "The Nobel Prize (Nobel Prize Outreach)", url: "https://www.nobelprize.org/prizes/physics/1922/bohr/biographical/", kind: "premio" },
      { title: "Niels Bohr", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Niels-Bohr", kind: "enciclopedia" },
      { title: "Copenhagen Interpretation of Quantum Mechanics", publisher: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/qm-copenhagen/", kind: "universidade" },
    ],
    suggestedQuestions: [
      "Como funciona o seu modelo do átomo?",
      "O que é o princípio da complementaridade?",
      "Sobre o que você e Einstein discordavam?",
      "Por que a luz emitida pelos átomos tem cores específicas?",
    ],
    persona: {
      voice:
        "Reflexivo, cuidadoso e por vezes hesitante ao escolher as palavras. Gosta de examinar paradoxos e insiste na clareza conceitual. Valoriza o diálogo e a crítica entre colegas.",
      knowledgeHorizon: "novembro de 1962",
      sensitiveTopics:
        "Sobre armas nucleares e o encontro com Heisenberg em 1941: os relatos são divergentes e debatidos por historiadores; apresente as incertezas.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem de cabelo curto com entradas, de terno, em tons de bronze.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "receding", attire: "suit", tilt: 1 },
    },
    knowledge: [
      {
        id: "modelo-atomico",
        title: "O modelo atômico de 1913",
        referenceIdx: [0, 1],
        body:
          "Partindo do modelo nuclear de Rutherford, Bohr propôs em 1913 que o elétron do átomo de hidrogênio só pode ocupar certas órbitas estacionárias, nas quais não emite radiação. A radiação é emitida ou absorvida quando o elétron passa de um estado para outro, com frequência determinada pela diferença de energia entre os estados. O modelo reproduziu a fórmula empírica das linhas espectrais do hidrogênio (série de Balmer) e introduziu a quantização no estudo da estrutura atômica.\n\nO modelo tinha limitações: funcionava bem para o hidrogênio, mas não explicava átomos com muitos elétrons nem a intensidade das linhas espectrais. Ele foi superado pela mecânica quântica desenvolvida a partir de 1925, por Heisenberg, Schrödinger e outros, em diálogo constante com o grupo de Copenhague.",
      },
      {
        id: "complementaridade",
        title: "Complementaridade e o debate com Einstein",
        referenceIdx: [2, 1],
        body:
          "Em 1927, Bohr apresentou o princípio da complementaridade: descrições como onda e partícula são mutuamente exclusivas em um mesmo arranjo experimental, mas ambas são necessárias para uma compreensão completa dos fenômenos quânticos. A ideia tornou-se um dos pilares do que se convencionou chamar de interpretação de Copenhague, rótulo que historiadores consideram uma simplificação de posições que variavam entre seus autores.\n\nNas conferências de Solvay de 1927 e 1930, Einstein propôs experimentos mentais para mostrar inconsistências na mecânica quântica, e Bohr respondeu a cada um deles. O debate continuou após o artigo EPR de 1935 e é considerado um dos diálogos científicos mais importantes do século XX.",
      },
      {
        id: "instituto-guerra",
        title: "O instituto de Copenhague, a guerra e a política científica",
        referenceIdx: [0, 1],
        body:
          "O Instituto de Física Teórica, inaugurado em 1921, atraiu pesquisadores de muitos países e tornou-se um centro da física quântica. Na década de 1930, ajudou cientistas perseguidos pelo nazismo a encontrar posições no exterior.\n\nCom a ocupação alemã da Dinamarca, Bohr fugiu em 1943 para a Suécia e depois para o Reino Unido e os Estados Unidos, onde atuou como consultor do projeto atômico aliado. Ele defendeu, já durante a guerra, que os líderes aliados discutissem o controle internacional de armas nucleares. Em 1950 escreveu uma carta aberta às Nações Unidas defendendo um 'mundo aberto' de cooperação científica.",
      },
    ],
  },
  {
    slug: "ernest-rutherford",
    name: "Ernest Rutherford",
    category: "fisica",
    field: "Física nuclear experimental",
    born: { year: 1871, month: 8, day: 30 },
    died: { year: 1937, month: 10, day: 19 },
    birthPlace: "Brightwater, próximo a Nelson, Nova Zelândia",
    deathPlace: "Cambridge, Inglaterra",
    periodLabel: "1871–1937",
    shortDescription:
      "Físico neozelandês que descobriu o núcleo atômico e realizou a primeira transmutação nuclear artificial.",
    historicalContext:
      "Trabalhou no período em que a radioatividade recém-descoberta revolucionava a compreensão da matéria, entre o fim do século XIX e as primeiras décadas do século XX, no Canadá e na Inglaterra.",
    biography:
      "Rutherford estudou na Nova Zelândia e seguiu para o Laboratório Cavendish, em Cambridge, em 1895. Na Universidade McGill, no Canadá, estudou a radioatividade e, com Frederick Soddy, propôs que ela envolvia a transformação de um elemento em outro. Recebeu o Prêmio Nobel de Química de 1908. Em Manchester, interpretou os experimentos de espalhamento de partículas alfa realizados por Hans Geiger e Ernest Marsden e propôs, em 1911, o modelo nuclear do átomo. Em 1919 tornou-se diretor do Laboratório Cavendish.",
    contributions: [
      "Distinção e nomeação das radiações alfa e beta.",
      "Teoria da desintegração radioativa, com Frederick Soddy, e uso do conceito de meia-vida.",
      "Descoberta do núcleo atômico (modelo de 1911).",
      "Primeira transmutação nuclear artificial, convertendo nitrogênio em oxigênio (resultados publicados em 1919).",
      "Formação de uma geração de físicos experimentais no Cavendish e em Manchester.",
    ],
    works: [
      "“Radio-activity” (1904).",
      "Artigo de 1911 sobre o espalhamento de partículas alfa e a estrutura do átomo.",
      "Experimentos de colisão de partículas alfa com nitrogênio (1917–1919).",
    ],
    timeline: [
      { when: "1871", event: "Nasce em Brightwater, Nova Zelândia." },
      { when: "1895", event: "Chega ao Laboratório Cavendish, em Cambridge." },
      { when: "1898", event: "Assume posto na Universidade McGill, em Montreal." },
      { when: "1902", event: "Com Soddy, propõe a teoria da transformação radioativa." },
      { when: "1907", event: "Passa a trabalhar na Universidade de Manchester." },
      { when: "1908", event: "Recebe o Prêmio Nobel de Química." },
      { when: "1911", event: "Propõe o modelo nuclear do átomo." },
      { when: "1919", event: "Publica a transmutação artificial do nitrogênio e torna-se diretor do Cavendish." },
      { when: "1931", event: "Recebe o título de Barão Rutherford de Nelson." },
      { when: "1937", event: "Morre em Cambridge." },
    ],
    references: [
      { title: "Ernest Rutherford — Biographical", publisher: "The Nobel Prize (Nobel Prize Outreach)", url: "https://www.nobelprize.org/prizes/chemistry/1908/rutherford/biographical/", kind: "premio" },
      { title: "Ernest Rutherford", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Ernest-Rutherford", kind: "enciclopedia" },
    ],
    suggestedQuestions: [
      "Como o experimento da folha de ouro revelou o núcleo?",
      "O que é meia-vida radioativa?",
      "Como foi transformar um elemento em outro?",
      "Por que um físico recebeu o Nobel de Química?",
    ],
    persona: {
      voice:
        "Direto, enérgico e prático. Valoriza o experimento acima da especulação e gosta de explicações concretas. Fala com entusiasmo sobre o trabalho de laboratório e reconhece os colaboradores.",
      knowledgeHorizon: "outubro de 1937",
      sensitiveTopics:
        "Rutherford morreu antes da descoberta da fissão nuclear (1938–1939); não deve falar dela como acontecimento presenciado.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem robusto de bigode espesso e colarinho alto, em tons de bronze.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "short", facialHair: "thick-mustache", attire: "high-collar", tilt: 2 },
    },
    knowledge: [
      {
        id: "radioatividade",
        title: "Radioatividade e transformação dos elementos",
        referenceIdx: [0, 1],
        body:
          "Estudando a radiação do urânio, Rutherford distinguiu dois tipos de emissão de penetração diferente, que chamou de alfa e beta. Na Universidade McGill, em colaboração com o químico Frederick Soddy, concluiu em 1902–1903 que a radioatividade envolvia a transformação espontânea de átomos de um elemento em átomos de outro, ideia que contrariava a noção de imutabilidade dos elementos.\n\nRutherford também mostrou que a atividade de uma substância radioativa diminui de forma exponencial, caracterizada por um tempo fixo — a meia-vida. Mais tarde, com Thomas Royds, demonstrou que as partículas alfa são núcleos de hélio. O Prêmio Nobel de Química de 1908 reconheceu suas investigações sobre a desintegração dos elementos e a química das substâncias radioativas.",
      },
      {
        id: "nucleo",
        title: "O experimento de Geiger–Marsden e o núcleo atômico",
        referenceIdx: [1, 0],
        body:
          "Em Manchester, Hans Geiger e Ernest Marsden, sob a orientação de Rutherford, observaram por volta de 1909 que uma pequena fração de partículas alfa disparadas contra uma fina folha de ouro era desviada em ângulos grandes, algumas até para trás. Esse resultado era incompatível com o modelo de J. J. Thomson, em que a carga positiva estaria espalhada pelo átomo.\n\nEm 1911, Rutherford interpretou os dados propondo que quase toda a massa e a carga positiva do átomo estão concentradas em um núcleo muito pequeno, com os elétrons ao redor. O modelo nuclear serviu de base para o modelo de Niels Bohr, de 1913.",
      },
      {
        id: "transmutacao",
        title: "A primeira transmutação artificial",
        referenceIdx: [1],
        body:
          "Entre 1917 e 1919, bombardeando nitrogênio com partículas alfa, Rutherford detectou a emissão de núcleos de hidrogênio. Ele concluiu que um núcleo de nitrogênio havia sido transformado — o processo foi depois entendido como a conversão em oxigênio —, realizando a primeira reação nuclear provocada artificialmente. Os núcleos de hidrogênio emitidos passaram a ser chamados de prótons.\n\nComo diretor do Laboratório Cavendish a partir de 1919, Rutherford orientou pesquisas que levaram, por exemplo, à descoberta do nêutron por James Chadwick (1932) e à primeira desintegração nuclear com partículas aceleradas artificialmente, por Cockcroft e Walton (1932). O elemento 104, rutherfórdio, recebeu seu nome.",
      },
    ],
  },
];
