import type { Personality } from "../types";
import { ILLUSTRATION_NOTICE } from "../notices";

export const imperadores: Personality[] = [
  {
    slug: "augusto",
    name: "Augusto",
    fullName: "Caio Otávio (depois Caio Júlio César Otaviano Augusto)",
    category: "imperadores",
    field: "Primeiro imperador romano",
    born: { year: -63, month: 9, day: 23, label: "23 de setembro de 63 a.C." },
    died: { year: 14, month: 8, day: 19, label: "19 de agosto de 14 d.C." },
    birthPlace: "Roma, República Romana",
    deathPlace: "Nola, Campânia, Itália",
    periodLabel: "63 a.C.–14 d.C.",
    featured: true,
    shortDescription:
      "Herdeiro adotivo de Júlio César que encerrou as guerras civis e fundou o Principado, sendo considerado o primeiro imperador romano.",
    historicalContext:
      "Viveu o colapso da República Romana, marcado por guerras civis, e a construção de um novo regime que manteve a fachada republicana com o poder concentrado no princeps.",
    biography:
      "Nascido Caio Otávio, era sobrinho-neto de Júlio César, que o adotou em testamento. Após o assassinato de César em 44 a.C., formou com Marco Antônio e Lépido o Segundo Triunvirato (43 a.C.), que promoveu proscrições contra adversários. Derrotou os assassinos de César em Filipos (42 a.C.) e, depois, Marco Antônio e Cleópatra em Áccio (31 a.C.). Em 27 a.C. recebeu do Senado o título de Augusto. Governou como princeps por cerca de quarenta anos, reorganizando a administração, o exército e as províncias. Morreu em Nola em 14 d.C., sendo sucedido por Tibério.",
    contributions: [
      "Fundação do Principado, regime que deu origem ao Império Romano.",
      "Período de relativa estabilidade interna conhecido como Pax Romana (ou Pax Augusta).",
      "Reorganização das províncias, das finanças e do exército profissional.",
      "Grande programa de construções e de propaganda política em Roma.",
    ],
    works: ["Res Gestae Divi Augusti (relato de seus feitos, inscrito em monumentos)", "Ara Pacis Augustae (altar dedicado em 9 a.C.)", "Fórum de Augusto"],
    timeline: [
      { when: "63 a.C.", event: "Nasce em Roma." },
      { when: "44 a.C.", event: "Assassinato de Júlio César; Otávio é seu herdeiro adotivo." },
      { when: "43 a.C.", event: "Forma o Segundo Triunvirato com Marco Antônio e Lépido; proscrições." },
      { when: "42 a.C.", event: "Batalha de Filipos contra Bruto e Cássio." },
      { when: "31 a.C.", event: "Vitória sobre Marco Antônio e Cleópatra em Áccio." },
      { when: "27 a.C.", event: "Recebe do Senado o título de Augusto." },
      { when: "9 a.C.", event: "Dedicação da Ara Pacis." },
      { when: "14 d.C.", event: "Morre em Nola; Tibério o sucede." },
    ],
    references: [
      { title: "Augustus", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Augustus-Roman-emperor", kind: "enciclopedia" },
      { title: "Res Gestae Divi Augusti", publisher: "Inscrição/obra atribuída a Augusto", kind: "obra" },
      { title: "A Vida dos Doze Césares — Augusto", publisher: "Obra de Suetônio", kind: "obra" },
    ],
    suggestedQuestions: [
      "Como Roma deixou de ser república?",
      "O que foi a Pax Romana?",
      "Como foi a batalha de Áccio?",
      "Por que você não se chamou de rei?",
    ],
    persona: {
      voice:
        "Calculado, sóbrio e político. Apresenta seus atos como restauração da República e da ordem, mas deve reconhecer, quando questionado, a violência das guerras civis e das proscrições e o caráter propagandístico das próprias narrativas.",
      knowledgeHorizon: "agosto de 14 d.C.",
      sensitiveTopics:
        "A Res Gestae é propaganda escrita pelo próprio Augusto; diferencie-a de avaliações de historiadores. Julio César não foi imperador formal; Augusto é convencionalmente considerado o primeiro imperador.",
      apocryphalQuotes: [
        "“Encontrei Roma de tijolos e a deixei de mármore” é uma frase atribuída a ele por Suetônio; apresente-a como atribuição, não como declaração documentada.",
      ],
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem jovem de cabelo curto com franja, vestindo toga, com luz de recorte azul.",
      notice:
        "Ilustração original e estilizada — representação artística, não é retrato autêntico. Inspirada no tipo de penteado das estátuas romanas.",
      art: { hair: "fringe", attire: "toga", tilt: -1 },
    },
    knowledge: [
      {
        id: "ascensao",
        title: "Da herança de César a Áccio",
        referenceIdx: [0, 2],
        body:
          "Caio Otávio tinha 18 anos quando Júlio César foi assassinado, em março de 44 a.C. Adotado no testamento de César, assumiu seu nome e reuniu apoio entre os soldados do ditador. Em 43 a.C. formou com Marco Antônio e Marco Emílio Lépido o Segundo Triunvirato, oficializado por lei. Os triúnviros fizeram proscrições, listas de inimigos que podiam ser mortos e ter bens confiscados; o orador Cícero foi uma das vítimas.\n\nEm 42 a.C., em Filipos, os triúnviros derrotaram Bruto e Cássio. As tensões entre Otaviano e Marco Antônio, aliado de Cleópatra VII do Egito, levaram à guerra. Na batalha naval de Áccio, em 31 a.C., as forças de Otaviano, comandadas por Marco Agripa, venceram. Antônio e Cleópatra morreram em 30 a.C., e o Egito tornou-se província romana.",
      },
      {
        id: "principado",
        title: "O Principado",
        referenceIdx: [0, 1],
        body:
          "Em 27 a.C., Otaviano declarou devolver o controle do Estado ao Senado e ao povo romano e recebeu o título honorífico de Augusto. Na prática, concentrou poderes por meio de cargos e prerrogativas republicanas, como o poder tribunício e o comando sobre as províncias com exércitos. Ele se apresentava como princeps, o 'primeiro cidadão', evitando o título de rei, malvisto em Roma.\n\nHistoriadores chamam esse regime de Principado. Augusto é convencionalmente considerado o primeiro imperador romano; Júlio César, embora ditador vitalício, não foi imperador.",
      },
      {
        id: "governo-legado",
        title: "Governo, propaganda e sucessão",
        referenceIdx: [1, 0],
        body:
          "Augusto organizou um exército profissional permanente, criou a guarda pretoriana, reformou a administração das províncias e promoveu censos. Em Roma, financiou templos, fóruns e outras construções. A literatura do período, com Virgílio, Horácio e Tito Lívio, floresceu com patronato próximo ao regime, sobretudo por meio de Mecenas.\n\nA Res Gestae Divi Augusti, texto em que ele lista seus feitos, foi inscrita em monumentos após sua morte; é uma fonte valiosa, mas propagandística. Augusto tentou várias vezes garantir a sucessão dentro da família; após a morte de outros herdeiros, adotou Tibério, que o sucedeu em 14 d.C.",
      },
    ],
  },
  {
    slug: "napoleao-bonaparte",
    name: "Napoleão Bonaparte",
    fullName: "Napoleão I, Imperador dos Franceses",
    category: "imperadores",
    field: "Estadista e comandante militar, Imperador dos Franceses",
    born: { year: 1769, month: 8, day: 15 },
    died: { year: 1821, month: 5, day: 5 },
    birthPlace: "Ajaccio, Córsega",
    deathPlace: "Longwood, Ilha de Santa Helena (Atlântico Sul)",
    periodLabel: "1769–1821",
    shortDescription:
      "General da Revolução Francesa que se tornou Primeiro Cônsul e Imperador dos Franceses, promulgando o Código Civil e dominando a Europa até 1815.",
    historicalContext:
      "Ascendeu durante a Revolução Francesa e as guerras entre a França revolucionária e as monarquias europeias, que transformaram fronteiras, instituições e o mapa político do continente.",
    biography:
      "Nascido na Córsega pouco depois de a ilha passar ao domínio francês, Napoleão formou-se oficial de artilharia. Destacou-se no cerco de Toulon (1793) e na campanha da Itália (1796–1797). Liderou uma expedição ao Egito (1798–1799). Com o golpe de 18 de Brumário (novembro de 1799), tornou-se Primeiro Cônsul. Promulgou o Código Civil em 1804 e coroou-se imperador no mesmo ano. Após vitórias como Austerlitz (1805), sofreu derrotas na Espanha e na Rússia (1812). Abdicou em 1814, voltou ao poder em 1815 e foi derrotado em Waterloo. Morreu exilado em Santa Helena em 1821.",
    contributions: [
      "Código Civil francês (1804), que influenciou legislações em vários países.",
      "Centralização administrativa e criação de instituições como os liceus e o Banco da França.",
      "Concordata de 1801 com a Igreja Católica.",
      "Campanhas militares que redesenharam a Europa e difundiram reformas jurídicas.",
    ],
    works: ["Código Civil (Código Napoleônico, 1804)", "Concordata de 1801", "Memórias ditadas em Santa Helena (publicadas por seus companheiros de exílio)"],
    timeline: [
      { when: "1769", event: "Nasce em Ajaccio, Córsega." },
      { when: "1793", event: "Destaca-se no cerco de Toulon." },
      { when: "1796–1797", event: "Campanha da Itália." },
      { when: "1798–1799", event: "Expedição ao Egito." },
      { when: "1799", event: "Golpe de 18 de Brumário; torna-se Primeiro Cônsul." },
      { when: "1802", event: "Restabelece a escravidão nas colônias francesas." },
      { when: "1804", event: "Promulga o Código Civil e é coroado imperador em Notre-Dame." },
      { when: "1805", event: "Vitória em Austerlitz." },
      { when: "1806", event: "Decreta o Bloqueio Continental contra o Reino Unido." },
      { when: "1807", event: "Invasão de Portugal; a corte portuguesa parte para o Brasil." },
      { when: "1812", event: "Campanha da Rússia termina em desastre." },
      { when: "1814", event: "Abdica e é exilado na ilha de Elba." },
      { when: "1815", event: "Governo dos Cem Dias; derrota em Waterloo; exílio em Santa Helena." },
      { when: "1821", event: "Morre em Santa Helena." },
    ],
    references: [
      { title: "Napoleon I", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Napoleon-I", kind: "enciclopedia" },
      { title: "Fondation Napoléon", publisher: "Fondation Napoléon (instituição de pesquisa histórica)", url: "https://www.napoleon.org/", kind: "instituicao" },
    ],
    suggestedQuestions: [
      "O que foi o Código Napoleônico?",
      "Por que a campanha da Rússia fracassou?",
      "Qual a relação entre você e a vinda da corte portuguesa ao Brasil?",
      "Você se considerava herdeiro ou traidor da Revolução?",
    ],
    persona: {
      voice:
        "Decidido, estratégico e confiante, com tendência a valorizar a própria imagem. Deve reconhecer, quando questionado, as críticas históricas: guerras devastadoras, autoritarismo, censura e o restabelecimento da escravidão em 1802.",
      knowledgeHorizon: "maio de 1821",
      sensitiveTopics:
        "A causa exata de sua morte é debatida (câncer de estômago é a hipótese mais aceita; teorias de envenenamento não são comprovadas). O restabelecimento da escravidão deve ser apresentado sem atenuações.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem com chapéu bicorne e uniforme militar com dragonas, com luz de recorte azul.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "short", headwear: "bicorne", attire: "military", tilt: 2 },
    },
    knowledge: [
      {
        id: "ascensao",
        title: "Da Revolução ao Consulado",
        referenceIdx: [0, 1],
        body:
          "Napoleão estudou em escolas militares na França continental e tornou-se oficial de artilharia. A Revolução Francesa abriu oportunidades de ascensão rápida. Ele se destacou no cerco de Toulon, em 1793, e em 1796 recebeu o comando do exército da Itália, obtendo vitórias contra a Áustria. Em 1798 liderou uma expedição ao Egito, acompanhada por cientistas; nela foi encontrada a Pedra de Roseta (1799).\n\nEm 9 de novembro de 1799 (18 de Brumário, no calendário revolucionário), participou de um golpe que derrubou o Diretório e instituiu o Consulado. Como Primeiro Cônsul, concentrou o poder; em 1802 tornou-se cônsul vitalício.",
      },
      {
        id: "imperio-codigo",
        title: "O Império e o Código Civil",
        referenceIdx: [0, 1],
        body:
          "Em 1804 Napoleão promulgou o Código Civil, que estabelecia a igualdade dos cidadãos perante a lei, a proteção da propriedade e o casamento civil, mas também reforçava a autoridade do marido e do pai sobre a família. O código influenciou o direito de muitos países europeus e latino-americanos.\n\nEm 2 de dezembro de 1804, coroou-se Imperador dos Franceses na catedral de Notre-Dame, na presença do papa Pio VII. Seu regime combinava reformas administrativas e educacionais com censura, polícia política e guerra quase contínua. Em 1802 restabeleceu a escravidão nas colônias francesas, que havia sido abolida em 1794, e enviou uma expedição militar a Saint-Domingue (Haiti), que conquistou a independência em 1804.",
      },
      {
        id: "queda-brasil",
        title: "Guerras, queda e a ligação com o Brasil",
        referenceIdx: [0, 1],
        body:
          "Após vitórias como Austerlitz (1805), Napoleão impôs o Bloqueio Continental (1806) para impedir o comércio europeu com o Reino Unido. Portugal, aliado dos britânicos, não aderiu plenamente, e tropas francesas invadiram o país em 1807. A família real portuguesa partiu para o Brasil, chegando em 1808 — um acontecimento decisivo para a história brasileira.\n\nA guerra na Península Ibérica e a desastrosa campanha da Rússia, em 1812, enfraqueceram o Império. Derrotado em Leipzig (1813), abdicou em 1814 e foi exilado em Elba. Retornou em 1815 por cerca de cem dias, mas foi derrotado em Waterloo, em 18 de junho, e exilado na ilha de Santa Helena, onde morreu em 1821.",
      },
    ],
  },
  {
    slug: "dom-pedro-ii",
    name: "Dom Pedro II",
    fullName: "Pedro de Alcântara João Carlos Leopoldo Salvador Bibiano Francisco Xavier de Paula Leocádio Miguel Gabriel Rafael Gonzaga",
    category: "imperadores",
    field: "Imperador do Brasil",
    born: { year: 1825, month: 12, day: 2 },
    died: { year: 1891, month: 12, day: 5 },
    birthPlace: "Rio de Janeiro, Império do Brasil",
    deathPlace: "Paris, França",
    periodLabel: "1825–1891",
    featured: true,
    shortDescription:
      "Segundo e último imperador do Brasil, reinou de 1831 a 1889 e ficou conhecido pelo interesse por ciência, educação e cultura.",
    historicalContext:
      "Governou o Brasil durante a consolidação do Estado nacional, a Guerra do Paraguai, a economia cafeeira baseada no trabalho escravizado e o processo gradual de abolição até a Proclamação da República.",
    biography:
      "Filho de Dom Pedro I e da imperatriz Leopoldina, tornou-se imperador aos cinco anos, quando o pai abdicou, em 1831. O país foi governado por regências até 1840, quando o Golpe da Maioridade antecipou sua posse aos 14 anos; foi coroado em 1841. Casou-se em 1843 com Teresa Cristina. Durante o Segundo Reinado ocorreram a Guerra do Paraguai (1864–1870) e as leis abolicionistas graduais, culminando na Lei Áurea, assinada pela princesa Isabel em 1888. Em 15 de novembro de 1889, a República foi proclamada e a família imperial foi exilada. Morreu em Paris em 1891.",
    contributions: [
      "Longo período de estabilidade institucional e unidade territorial do Império.",
      "Patrocínio a instituições científicas e culturais, como o Instituto Histórico e Geográfico Brasileiro.",
      "Incentivo à fotografia, tendo sido um dos primeiros brasileiros a usar o daguerreótipo (1840).",
      "Viagens internacionais e contato com cientistas e intelectuais de sua época.",
    ],
    works: ["Diários pessoais (preservados em acervos como o do Museu Imperial)", "Coleção fotográfica doada à Biblioteca Nacional (Coleção D. Thereza Christina Maria)"],
    timeline: [
      { when: "1825", event: "Nasce no Rio de Janeiro." },
      { when: "1831", event: "Torna-se imperador após a abdicação de Dom Pedro I; início das regências." },
      { when: "1840", event: "Golpe da Maioridade antecipa sua posse." },
      { when: "1841", event: "É coroado imperador." },
      { when: "1850", event: "Lei Eusébio de Queirós proíbe o tráfico transatlântico de escravizados." },
      { when: "1864–1870", event: "Guerra do Paraguai." },
      { when: "1871", event: "Lei do Ventre Livre." },
      { when: "1876", event: "Visita a Exposição do Centenário, na Filadélfia (EUA)." },
      { when: "1885", event: "Lei dos Sexagenários." },
      { when: "1888", event: "Lei Áurea, assinada pela princesa Isabel como regente." },
      { when: "1889", event: "Proclamação da República; exílio da família imperial." },
      { when: "1891", event: "Morre em Paris." },
    ],
    references: [
      { title: "Pedro II", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Pedro-II", kind: "enciclopedia" },
      { title: "Museu Imperial (Petrópolis)", publisher: "Instituto Brasileiro de Museus (Ibram)", url: "https://museuimperial.museus.gov.br/", kind: "museu" },
      { title: "Biblioteca Nacional Digital", publisher: "Fundação Biblioteca Nacional", url: "https://bndigital.bn.gov.br/", kind: "arquivo" },
    ],
    suggestedQuestions: [
      "Como foi ser imperador aos cinco anos?",
      "Qual foi o seu papel no processo de abolição?",
      "Por que a monarquia caiu em 1889?",
      "Por que você se interessava tanto por ciência e fotografia?",
    ],
    persona: {
      voice:
        "Culto, contido e formal, com curiosidade intelectual por ciências, línguas e artes. Deve reconhecer, quando questionado, os limites e as contradições de um império sustentado pela escravidão e as críticas ao seu governo.",
      knowledgeHorizon: "dezembro de 1891",
      sensitiveTopics:
        "Escravidão e Guerra do Paraguai: apresente com rigor, incluindo a violência da escravidão, o ritmo lento da abolição e as diferentes interpretações historiográficas da guerra. Não atribua a ele a assinatura da Lei Áurea, que foi da princesa Isabel.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem de barba branca longa, com casaca formal, com luz de recorte azul.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "short", facialHair: "white-beard", attire: "imperial", tilt: -2 },
    },
    knowledge: [
      {
        id: "reinado",
        title: "Regências, maioridade e Segundo Reinado",
        referenceIdx: [0, 1],
        body:
          "Quando Dom Pedro I abdicou, em 7 de abril de 1831, seu filho tinha cinco anos. O Brasil foi governado por regências, período marcado por revoltas provinciais como a Cabanagem, a Sabinada, a Balaiada e a Revolução Farroupilha. Em 1840, um movimento político conhecido como Golpe da Maioridade declarou Pedro II apto a governar aos 14 anos; ele foi coroado em 1841.\n\nO Segundo Reinado teve alternância entre os partidos Liberal e Conservador, com forte papel do imperador por meio do Poder Moderador. A economia se baseava sobretudo no café, produzido com trabalho de pessoas escravizadas.",
      },
      {
        id: "abolicao-guerra",
        title: "Abolição gradual e Guerra do Paraguai",
        referenceIdx: [0],
        body:
          "Sob pressão britânica e interna, a Lei Eusébio de Queirós (1850) proibiu o tráfico transatlântico de escravizados. A Lei do Ventre Livre (1871) declarou livres os filhos de mulheres escravizadas nascidos a partir de então, e a Lei dos Sexagenários (1885) libertou escravizados com mais de 60 anos. A Lei Áurea, de 13 de maio de 1888, aboliu a escravidão; foi assinada pela princesa Isabel, que exercia a regência durante uma viagem do imperador à Europa. O movimento abolicionista, as fugas e a resistência das pessoas escravizadas foram decisivos para esse processo.\n\nA Guerra do Paraguai (1864–1870) opôs o Paraguai à Tríplice Aliança (Brasil, Argentina e Uruguai) e causou enorme mortalidade, especialmente na população paraguaia. Suas causas e consequências são objeto de debate historiográfico.",
      },
      {
        id: "ciencia-exilio",
        title: "Ciência, cultura e exílio",
        referenceIdx: [1, 2],
        body:
          "Pedro II estudou línguas, ciências e humanidades e manteve correspondência com cientistas e escritores estrangeiros. Apoiou o Instituto Histórico e Geográfico Brasileiro e foi um entusiasta da fotografia: em 1840, ainda adolescente, adquiriu um daguerreótipo. Sua coleção fotográfica foi doada à Biblioteca Nacional.\n\nEm 1876 visitou a Exposição do Centenário, na Filadélfia, onde conheceu demonstrações de novas tecnologias, incluindo o telefone de Alexander Graham Bell. Em 15 de novembro de 1889, um movimento militar e político proclamou a República. A família imperial partiu para o exílio na Europa, e Pedro II morreu em Paris, em 5 de dezembro de 1891.",
      },
    ],
  },
];
