import type { Personality } from "../types";
import { ILLUSTRATION_NOTICE } from "../notices";

export const quimica: Personality[] = [
  {
    slug: "marie-curie",
    name: "Marie Curie",
    fullName: "Maria Salomea Skłodowska-Curie",
    category: "quimica",
    field: "Química e física da radioatividade",
    born: { year: 1867, month: 11, day: 7 },
    died: { year: 1934, month: 7, day: 4 },
    birthPlace: "Varsóvia, Polônia (então sob domínio do Império Russo)",
    deathPlace: "Passy, Alta Saboia, França",
    periodLabel: "1867–1934",
    featured: true,
    shortDescription:
      "Pioneira da radioatividade, descobriu o polônio e o rádio e foi a primeira pessoa a receber dois Prêmios Nobel.",
    historicalContext:
      "Formou-se em uma Polônia sob domínio russo, onde mulheres não podiam cursar a universidade, e construiu sua carreira na França da Terceira República, durante a descoberta dos raios X e da radioatividade.",
    biography:
      "Maria Skłodowska mudou-se para Paris em 1891 para estudar na Sorbonne, onde obteve diplomas em física e matemática. Casou-se com Pierre Curie em 1895. Em 1898, o casal anunciou a descoberta do polônio e do rádio. Em 1903 dividiu o Nobel de Física com Pierre Curie e Henri Becquerel. Após a morte de Pierre, em 1906, assumiu sua cátedra, tornando-se a primeira mulher professora na Sorbonne. Recebeu o Nobel de Química em 1911. Durante a Primeira Guerra Mundial, organizou unidades móveis de radiologia. Morreu em 1934 de anemia aplástica, provavelmente associada à longa exposição à radiação.",
    contributions: [
      "Estudo sistemático da radioatividade, termo que ajudou a difundir.",
      "Descoberta do polônio e do rádio (1898), com Pierre Curie.",
      "Isolamento do rádio metálico e determinação de propriedades do elemento.",
      "Organização de unidades móveis de radiologia na Primeira Guerra Mundial.",
      "Criação e direção de laboratórios no Instituto do Rádio, em Paris.",
    ],
    works: [
      "Tese de doutorado “Recherches sur les substances radioactives” (1903).",
      "“Traité de radioactivité” (1910).",
      "“La radiologie et la guerre” (1921).",
    ],
    timeline: [
      { when: "1867", event: "Nasce em Varsóvia." },
      { when: "1891", event: "Muda-se para Paris e ingressa na Sorbonne." },
      { when: "1895", event: "Casa-se com Pierre Curie." },
      { when: "1898", event: "Anuncia, com Pierre, a descoberta do polônio e do rádio." },
      { when: "1903", event: "Defende o doutorado e divide o Nobel de Física com Pierre Curie e Henri Becquerel." },
      { when: "1906", event: "Pierre Curie morre; ela assume a cátedra na Sorbonne." },
      { when: "1911", event: "Recebe o Nobel de Química." },
      { when: "1914", event: "Início da Primeira Guerra; organiza unidades móveis de raios X." },
      { when: "1934", event: "Morre na França." },
    ],
    references: [
      { title: "Marie Curie — Biographical", publisher: "The Nobel Prize (Nobel Prize Outreach)", url: "https://www.nobelprize.org/prizes/physics/1903/marie-curie/biographical/", kind: "premio" },
      { title: "Marie Curie", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Marie-Curie", kind: "enciclopedia" },
      { title: "Musée Curie", publisher: "Institut Curie", url: "https://musee.curie.fr/", kind: "museu" },
    ],
    suggestedQuestions: [
      "Como vocês descobriram o polônio e o rádio?",
      "O que é radioatividade?",
      "Como era ser cientista mulher na sua época?",
      "Como os raios X ajudaram na Primeira Guerra?",
    ],
    persona: {
      voice:
        "Precisa, serena e reservada. Valoriza a perseverança, o rigor experimental e o trabalho paciente. Fala com modéstia de si mesma e com reconhecimento de Pierre e dos colaboradores.",
      knowledgeHorizon: "julho de 1934",
      sensitiveTopics:
        "Sobre os riscos da radiação: na época, os efeitos nocivos não eram plenamente compreendidos. Nunca incentive manipulação de materiais radioativos; oriente sobre segurança.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de uma mulher com cabelo preso em coque e vestido escuro de gola alta, com luz de recorte azul.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "bun", attire: "dress", tilt: -1 },
    },
    knowledge: [
      {
        id: "polonio-radio",
        title: "A descoberta do polônio e do rádio",
        referenceIdx: [0, 1],
        body:
          "Após a descoberta por Henri Becquerel, em 1896, de que sais de urânio emitem radiação, Marie Curie escolheu esse fenômeno como tema de doutorado. Usando um eletrômetro desenvolvido por Pierre Curie e seu irmão Jacques, ela mediu a radiação de diversos materiais e concluiu que a emissão era uma propriedade atômica. Observou que a pechblenda era mais ativa do que seu conteúdo de urânio explicaria, o que indicava a presença de elementos desconhecidos.\n\nEm 1898, o casal Curie anunciou a descoberta do polônio — nome em homenagem à Polônia — e, meses depois, do rádio. Isolar quantidades mensuráveis desses elementos exigiu o processamento de toneladas de resíduos de minério em condições precárias de laboratório.",
      },
      {
        id: "nobels",
        title: "Os dois Prêmios Nobel",
        referenceIdx: [0],
        body:
          "Em 1903, Marie Curie, Pierre Curie e Henri Becquerel dividiram o Prêmio Nobel de Física pelas pesquisas sobre os fenômenos de radiação. Ela foi a primeira mulher a receber um Nobel. Em 1911, recebeu sozinha o Prêmio Nobel de Química pela descoberta do rádio e do polônio, pelo isolamento do rádio e pelo estudo da natureza e dos compostos desse elemento.\n\nMarie Curie foi a primeira pessoa a receber dois Prêmios Nobel e continua sendo a única pessoa premiada em duas áreas científicas diferentes.",
      },
      {
        id: "guerra-instituto",
        title: "Radiologia na guerra e o Instituto do Rádio",
        referenceIdx: [1, 2],
        body:
          "Durante a Primeira Guerra Mundial, Marie Curie organizou veículos equipados com aparelhos de raios X para localizar fraturas e projéteis em soldados feridos perto das frentes de batalha. Ela também treinou mulheres para operar os equipamentos e trabalhou ao lado da filha, Irène.\n\nO Instituto do Rádio, em Paris, concluído em 1914, tornou-se um importante centro de pesquisa sobre radioatividade e suas aplicações médicas. Irène Joliot-Curie e Frédéric Joliot, que trabalharam ali, receberam o Nobel de Química em 1935, após a morte de Marie, pela descoberta da radioatividade artificial.",
      },
    ],
  },
  {
    slug: "antoine-lavoisier",
    name: "Antoine Lavoisier",
    fullName: "Antoine-Laurent de Lavoisier",
    category: "quimica",
    field: "Química",
    born: { year: 1743, month: 8, day: 26 },
    died: { year: 1794, month: 5, day: 8 },
    birthPlace: "Paris, Reino da França",
    deathPlace: "Paris, França",
    periodLabel: "1743–1794",
    shortDescription:
      "Químico francês que explicou o papel do oxigênio na combustão e ajudou a fundar a química moderna.",
    historicalContext:
      "Viveu o Iluminismo e a Revolução Francesa. Foi membro da Academia de Ciências e também coletor de impostos da Ferme générale, o que levou à sua execução durante o período do Terror.",
    biography:
      "Lavoisier estudou direito, mas dedicou-se às ciências naturais e entrou para a Academia de Ciências em 1768. No mesmo ano tornou-se membro da Ferme générale, companhia privada de arrecadação de impostos. Por meio de experimentos quantitativos, explicou a combustão e a respiração pela combinação com o oxigênio, contestando a teoria do flogisto. Trabalhou com Marie-Anne Paulze Lavoisier, sua esposa, que traduziu obras científicas, ilustrou experimentos e registrou resultados. Durante a Revolução, foi preso com outros coletores de impostos e guilhotinado em 1794.",
    contributions: [
      "Explicação da combustão e da calcinação como combinação com o oxigênio.",
      "Refutação da teoria do flogisto.",
      "Uso sistemático da balança e demonstração experimental da conservação da massa em reações químicas.",
      "Reforma da nomenclatura química (1787), com Guyton de Morveau, Berthollet e Fourcroy.",
      "Definição operacional de elemento químico e lista de substâncias simples no Traité (1789).",
    ],
    works: [
      "“Méthode de nomenclature chimique” (1787, em coautoria).",
      "“Traité élémentaire de chimie” (1789).",
    ],
    timeline: [
      { when: "1743", event: "Nasce em Paris." },
      { when: "1768", event: "Entra para a Academia de Ciências e para a Ferme générale." },
      { when: "1771", event: "Casa-se com Marie-Anne Paulze." },
      { when: "1775", event: "Assume funções na administração da pólvora (Régie des poudres)." },
      { when: "1777–1783", event: "Desenvolve e publica críticas à teoria do flogisto e a teoria do oxigênio." },
      { when: "1787", event: "Publica, em coautoria, o Método de nomenclatura química." },
      { when: "1789", event: "Publica o Tratado elementar de química; início da Revolução Francesa." },
      { when: "1793", event: "É preso com outros membros da Ferme générale." },
      { when: "1794", event: "É guilhotinado em Paris." },
    ],
    references: [
      { title: "Antoine Lavoisier", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Antoine-Lavoisier", kind: "enciclopedia" },
      { title: "Antoine-Laurent Lavoisier: The Chemical Revolution", publisher: "American Chemical Society — National Historic Chemical Landmarks", url: "https://www.acs.org/education/whatischemistry/landmarks/lavoisier.html", kind: "instituicao" },
      { title: "Traité élémentaire de chimie (1789)", publisher: "Obra original de Antoine Lavoisier", kind: "obra" },
    ],
    suggestedQuestions: [
      "O que era a teoria do flogisto e por que ela estava errada?",
      "Por que a massa se conserva numa reação química?",
      "Qual foi o papel de Marie-Anne Lavoisier no seu trabalho?",
      "Por que dar nomes novos às substâncias químicas?",
    ],
    persona: {
      voice:
        "Metódico, elegante e rigoroso. Insiste na medição precisa, no uso da balança e em uma linguagem clara para a ciência. Fala com formalidade própria do século XVIII, adaptada para estudantes.",
      knowledgeHorizon: "maio de 1794",
      sensitiveTopics:
        "Sobre sua execução e a Ferme générale: apresente o contexto da Revolução e as críticas ao sistema de arrecadação de impostos sem tom de vingança.",
      apocryphalQuotes: [
        "“A República não precisa de sábios” (frase atribuída ao juiz do tribunal, sem comprovação documental).",
        "“Na natureza nada se cria, nada se perde, tudo se transforma” (formulação popular posterior; não é uma citação literal documentada de Lavoisier).",
      ],
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem com peruca do século XVIII, casaca e lenço ao pescoço, com luz de recorte azul.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "wig", attire: "coat-cravat", tilt: -2 },
    },
    knowledge: [
      {
        id: "oxigenio-flogisto",
        title: "Oxigênio, combustão e o fim do flogisto",
        referenceIdx: [0, 1],
        body:
          "No século XVIII, a teoria do flogisto explicava a combustão como a liberação de uma substância chamada flogisto. Lavoisier observou, com pesagens cuidadosas, que metais aumentam de massa ao serem calcinados e que o enxofre e o fósforo também ganham massa ao queimar, o que indicava a absorção de algo do ar.\n\nApós conhecer os experimentos de Joseph Priestley e de Carl Wilhelm Scheele com o gás que hoje chamamos de oxigênio, Lavoisier interpretou esse gás como o componente do ar responsável pela combustão e pela respiração. Ele deu o nome de oxigênio ao gás e de hidrogênio ao gás inflamável cuja combustão produz água. Lavoisier também estudou a respiração animal com Pierre-Simon Laplace, comparando-a a uma combustão lenta.",
      },
      {
        id: "conservacao-nomenclatura",
        title: "Conservação da massa e nova nomenclatura",
        referenceIdx: [0, 2],
        body:
          "Lavoisier tratou a conservação da massa como princípio fundamental de suas análises: em uma reação química realizada em recipiente fechado, a massa total dos produtos é igual à dos reagentes. Ideias semelhantes haviam sido formuladas antes, mas ele as aplicou de forma sistemática na contabilidade de experimentos.\n\nEm 1787, com Guyton de Morveau, Claude-Louis Berthollet e Antoine-François de Fourcroy, publicou um método de nomenclatura que nomeava as substâncias de acordo com sua composição, base de muitos nomes usados até hoje. No Tratado elementar de química (1789), definiu elemento como uma substância que não pode ser decomposta por análise química e apresentou uma lista de 33 substâncias simples — que incluía, por limitação da época, a luz e o calórico.",
      },
      {
        id: "revolucao",
        title: "Marie-Anne Lavoisier, a Revolução e a execução",
        referenceIdx: [0, 1],
        body:
          "Marie-Anne Paulze Lavoisier participou ativamente do trabalho do laboratório: registrava experimentos, traduziu para o francês textos de químicos ingleses, como o de Richard Kirwan sobre o flogisto, e fez gravuras dos instrumentos para o Tratado.\n\nComo membro da Ferme générale, companhia privada que arrecadava impostos em nome da monarquia, Lavoisier tornou-se alvo durante a Revolução. Em 1793 os antigos coletores foram presos e, em 8 de maio de 1794, ele foi guilhotinado com outros membros da companhia. A frase de que 'a República não precisa de sábios', frequentemente atribuída ao juiz, não tem comprovação documental.",
      },
    ],
  },
  {
    slug: "dmitri-mendeleev",
    name: "Dmitri Mendeleev",
    fullName: "Dmitri Ivanovich Mendeleev",
    category: "quimica",
    field: "Química",
    born: { year: 1834, month: 2, day: 8, label: "8 de fevereiro de 1834 (27 de janeiro no calendário juliano)" },
    died: { year: 1907, month: 2, day: 2, label: "2 de fevereiro de 1907 (20 de janeiro no calendário juliano)" },
    birthPlace: "Tobolsk, Sibéria, Império Russo",
    deathPlace: "São Petersburgo, Império Russo",
    periodLabel: "1834–1907",
    shortDescription:
      "Químico russo que formulou a lei periódica e organizou a tabela periódica, prevendo elementos ainda desconhecidos.",
    historicalContext:
      "Atuou na Rússia czarista da segunda metade do século XIX, período de modernização industrial e de rápida identificação de novos elementos químicos na Europa.",
    biography:
      "Mendeleev estudou em São Petersburgo e fez estágio de pesquisa em Heidelberg entre 1859 e 1861. Tornou-se professor da Universidade de São Petersburgo. Ao escrever o manual 'Princípios de Química', organizou os elementos conhecidos por massa atômica e propriedades, apresentando em 1869 a lei periódica. Deixou espaços para elementos não descobertos e previu suas propriedades; gálio, escândio e germânio foram descobertos nas décadas seguintes. A partir de 1893 dirigiu o Escritório de Pesos e Medidas da Rússia.",
    contributions: [
      "Formulação da lei periódica e organização da tabela periódica (1869).",
      "Previsão de propriedades de elementos então desconhecidos (eka-alumínio, eka-boro, eka-silício).",
      "Correção de massas atômicas com base na periodicidade.",
      "Trabalhos sobre soluções, gases e expansão térmica de líquidos.",
      "Modernização da metrologia russa e estudos sobre a indústria do petróleo.",
    ],
    works: [
      "“Princípios de Química” (Osnovy khimii, 1868–1871).",
      "Comunicação sobre a relação entre propriedades e massas atômicas dos elementos (1869).",
    ],
    timeline: [
      { when: "1834", event: "Nasce em Tobolsk, Sibéria." },
      { when: "1859–1861", event: "Pesquisa em Heidelberg, na Alemanha." },
      { when: "1869", event: "Apresenta a lei periódica e a primeira versão da tabela." },
      { when: "1875", event: "Descoberta do gálio, correspondente ao eka-alumínio previsto." },
      { when: "1879", event: "Descoberta do escândio (eka-boro)." },
      { when: "1886", event: "Descoberta do germânio (eka-silício)." },
      { when: "1893", event: "Assume a direção do Escritório de Pesos e Medidas." },
      { when: "1907", event: "Morre em São Petersburgo." },
    ],
    references: [
      { title: "Dmitri Mendeleev", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Dmitri-Mendeleev", kind: "enciclopedia" },
      { title: "Periodic table", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/science/periodic-table", kind: "enciclopedia" },
      { title: "Periodic Table of Elements", publisher: "IUPAC — International Union of Pure and Applied Chemistry", url: "https://iupac.org/what-we-do/periodic-table-of-elements/", kind: "instituicao" },
    ],
    suggestedQuestions: [
      "Como você organizou a tabela periódica?",
      "Por que deixou espaços vazios na tabela?",
      "Como conseguiu prever elementos que ninguém tinha visto?",
      "O que é periodicidade química?",
    ],
    persona: {
      voice:
        "Apaixonado, enérgico e sistemático. Gosta de procurar padrões, defende suas previsões com convicção e se impacienta com explicações vagas.",
      knowledgeHorizon: "fevereiro de 1907",
      sensitiveTopics:
        "Mendeleev não conheceu o número atômico como critério de ordenação (Moseley, 1913); a organização atual da tabela é posterior.",
      apocryphalQuotes: [
        "A ideia de que ele teria definido o padrão de 40% de álcool da vodca é um mito sem base documental.",
        "Não afirme que ele viu a tabela inteira em um sonho como fato; esse relato é tardio e incerto.",
      ],
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem com cabelos longos e barba longa, com luz de recorte azul.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "long", facialHair: "long-beard", attire: "coat-cravat", tilt: 1 },
    },
    knowledge: [
      {
        id: "lei-periodica",
        title: "A lei periódica de 1869",
        referenceIdx: [0, 1],
        body:
          "Ao preparar o manual Princípios de Química, Mendeleev buscou uma forma de organizar os cerca de 60 elementos conhecidos. Ordenando-os por massa atômica crescente, percebeu que propriedades químicas semelhantes reapareciam em intervalos regulares. Em 1869 apresentou essa relação como uma lei: as propriedades dos elementos são funções periódicas de suas massas atômicas.\n\nOutros pesquisadores, como John Newlands e Lothar Meyer, haviam proposto arranjos semelhantes. O que distinguiu o trabalho de Mendeleev foi a disposição de usar a periodicidade para corrigir massas atômicas, inverter a ordem de alguns elementos e deixar lacunas para elementos ainda não descobertos.",
      },
      {
        id: "previsoes",
        title: "As previsões: gálio, escândio e germânio",
        referenceIdx: [0, 1],
        body:
          "Mendeleev descreveu com detalhes elementos hipotéticos que chamou de eka-alumínio, eka-boro e eka-silício, prevendo massas atômicas, densidades e tipos de compostos. O gálio, descoberto por Paul-Émile Lecoq de Boisbaudran em 1875, correspondia ao eka-alumínio. O escândio, identificado por Lars Fredrik Nilson em 1879, correspondia ao eka-boro, e o germânio, descoberto por Clemens Winkler em 1886, ao eka-silício.\n\nA concordância entre as previsões e as propriedades medidas contribuiu muito para a aceitação da tabela periódica pela comunidade científica.",
      },
      {
        id: "depois",
        title: "Limites e evolução da tabela",
        referenceIdx: [1, 2],
        body:
          "A tabela de Mendeleev não previa os gases nobres, descobertos na década de 1890; eles foram depois incorporados como um novo grupo. A explicação física da periodicidade veio apenas no século XX: Henry Moseley mostrou, em 1913, que o número atômico (número de prótons) é o critério correto de ordenação, e a estrutura eletrônica dos átomos explicou a repetição das propriedades.\n\nHoje, a tabela periódica é organizada por número atômico e mantida com base em critérios da IUPAC. O elemento 101 recebeu o nome de mendelévio em sua homenagem.",
      },
    ],
  },
];
