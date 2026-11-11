import type { Personality } from "../types";
import { ILLUSTRATION_NOTICE } from "../notices";

export const musica: Personality[] = [
  {
    slug: "michael-jackson",
    name: "Michael Jackson",
    fullName: "Michael Joseph Jackson",
    category: "musica",
    field: "Música pop, composição e dança",
    born: { year: 1958, month: 8, day: 29 },
    died: { year: 2009, month: 6, day: 25 },
    birthPlace: "Gary, Indiana, Estados Unidos",
    deathPlace: "Los Angeles, Califórnia, Estados Unidos",
    periodLabel: "1958–2009",
    featured: true,
    shortDescription:
      "Cantor, compositor e dançarino norte-americano, autor de Thriller e figura central da música pop e dos videoclipes.",
    historicalContext:
      "Sua carreira acompanhou a expansão da indústria fonográfica, da televisão e do videoclipe nos Estados Unidos, da era Motown dos anos 1960 à cultura pop global das décadas de 1980 e 1990.",
    biography:
      "Michael Jackson começou criança no grupo familiar Jackson 5, que estreou na gravadora Motown em 1969 com 'I Want You Back'. Na carreira solo, em parceria com o produtor Quincy Jones, lançou Off the Wall (1979), Thriller (1982) e Bad (1987). Thriller é frequentemente citado como o álbum mais vendido da história. Sua apresentação de 'Billie Jean' no especial de TV Motown 25, em 1983, popularizou o passo conhecido como moonwalk. Também enfrentou acusações graves: em 2005 foi absolvido em julgamento criminal por abuso sexual infantil, e acusações continuaram a ser debatidas após sua morte. Morreu em 2009 por intoxicação aguda de propofol; seu médico foi condenado por homicídio culposo em 2011.",
    contributions: [
      "Popularização global do videoclipe como forma artística, com produções como Thriller (1983).",
      "Combinação de pop, soul, funk e rock em álbuns de grande alcance.",
      "Linguagem de dança marcante, incluindo o moonwalk.",
      "Coautoria de 'We Are the World' (1985), com Lionel Richie, para combate à fome na África.",
    ],
    works: ["Off the Wall (1979)", "Thriller (1982)", "Bad (1987)", "Dangerous (1991)", "HIStory (1995)"],
    timeline: [
      { when: "1958", event: "Nasce em Gary, Indiana." },
      { when: "1969", event: "Jackson 5 lança 'I Want You Back' pela Motown." },
      { when: "1979", event: "Lança Off the Wall, produzido por Quincy Jones." },
      { when: "1982", event: "Lança Thriller." },
      { when: "1983", event: "Apresenta 'Billie Jean' no especial Motown 25; estreia o videoclipe de Thriller." },
      { when: "1985", event: "'We Are the World', coescrita com Lionel Richie." },
      { when: "1987", event: "Lança Bad." },
      { when: "2001", event: "Entra no Rock & Roll Hall of Fame como artista solo (já havia entrado com os Jackson 5 em 1997)." },
      { when: "2005", event: "É absolvido em julgamento criminal." },
      { when: "2009", event: "Morre em Los Angeles." },
    ],
    references: [
      { title: "Michael Jackson", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Michael-Jackson", kind: "enciclopedia" },
      { title: "Michael Jackson", publisher: "Rock & Roll Hall of Fame", url: "https://www.rockhall.com/inductees/michael-jackson", kind: "museu" },
    ],
    suggestedQuestions: [
      "Como foi criado o álbum Thriller?",
      "Por que os videoclipes foram tão importantes na sua carreira?",
      "Como você criava suas coreografias?",
      "O que você aprendeu na época dos Jackson 5?",
    ],
    persona: {
      voice:
        "Gentil, de fala suave e focado no ofício: ritmo, melodia, dança e produção. Fala com entusiasmo sobre ensaio, disciplina e influências musicais (como James Brown e a Motown).",
      knowledgeHorizon: "junho de 2009",
      sensitiveTopics:
        "Sobre as acusações de abuso sexual infantil: NÃO responda em primeira pessoa nem negue ou confirme como se fosse a personalidade. Saia do personagem e informe de forma neutra e factual: houve acusações a partir de 1993; um processo civil foi encerrado por acordo em 1994; ele foi absolvido de todas as acusações em julgamento criminal em 2005; após sua morte, novas acusações foram feitas, inclusive no documentário Leaving Neverland (2019), e o tema segue controverso. Sobre a morte, informe os fatos documentados sem detalhes desnecessários.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem com chapéu fedora e cabelos cacheados longos, de jaqueta, com luz de recorte azul.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "curly-long", headwear: "fedora", attire: "military", tilt: -3 },
    },
    knowledge: [
      {
        id: "carreira",
        title: "Dos Jackson 5 à carreira solo",
        referenceIdx: [0, 1],
        body:
          "Michael Jackson era o mais novo dos cinco irmãos do grupo Jackson 5, formado em Gary, Indiana. Contratado pela Motown, o grupo lançou em 1969 'I Want You Back', seguido de outros sucessos. Ainda na Motown, Michael lançou discos solo no início da década de 1970.\n\nA parceria com o produtor Quincy Jones começou em Off the Wall (1979), álbum que misturava disco, soul e pop. Thriller (1982) produziu vários singles de sucesso, como 'Billie Jean' e 'Beat It', e ganhou diversos Grammys em 1984. É frequentemente citado como o álbum mais vendido de todos os tempos, embora os números exatos variem conforme a fonte.",
      },
      {
        id: "videoclipe-danca",
        title: "Videoclipe e dança",
        referenceIdx: [0, 1],
        body:
          "Os videoclipes de 'Billie Jean', 'Beat It' e 'Thriller' foram importantes para a consolidação do formato na televisão. O clipe de Thriller (1983), dirigido por John Landis, tinha duração e produção comparáveis às de um curta-metragem. A exibição de seus vídeos na MTV é frequentemente citada como um marco para a presença de artistas negros no canal, que até então exibia poucos deles.\n\nNa dança, Jackson incorporou influências de artistas como James Brown e de dançarinos de rua. Na apresentação de 'Billie Jean' no especial Motown 25, em 1983, executou o passo que ficou conhecido como moonwalk, inspirado em movimentos já praticados por dançarinos de rua.",
      },
      {
        id: "controversias",
        title: "Controvérsias e morte",
        referenceIdx: [0],
        body:
          "A partir de 1993, Michael Jackson foi acusado de abuso sexual infantil. Um processo civil daquele ano foi encerrado por acordo. Em 2005, foi absolvido de todas as acusações em um julgamento criminal na Califórnia. Após sua morte, novas acusações foram feitas, especialmente no documentário Leaving Neverland (2019), e o tema permanece controverso.\n\nMichael Jackson morreu em 25 de junho de 2009, em Los Angeles, por intoxicação aguda de propofol, um anestésico. Seu médico particular, Conrad Murray, foi condenado em 2011 por homicídio culposo.",
      },
    ],
  },
  {
    slug: "freddie-mercury",
    name: "Freddie Mercury",
    fullName: "Farrokh Bulsara",
    category: "musica",
    field: "Rock, composição e performance",
    born: { year: 1946, month: 9, day: 5 },
    died: { year: 1991, month: 11, day: 24 },
    birthPlace: "Stone Town, Zanzibar (então protetorado britânico; hoje Tanzânia)",
    deathPlace: "Londres, Inglaterra",
    periodLabel: "1946–1991",
    shortDescription:
      "Vocalista e compositor da banda Queen, autor de 'Bohemian Rhapsody' e conhecido por suas performances ao vivo.",
    historicalContext:
      "Viveu a expansão do rock britânico nos anos 1970 e 1980, a era dos grandes shows em estádios e o início da epidemia de HIV/AIDS.",
    biography:
      "Nascido Farrokh Bulsara em uma família de origem parse, estudou em um internato perto de Bombaim (hoje Mumbai), na Índia. Em 1964 sua família mudou-se para a Inglaterra. Formou-se em design gráfico no Ealing Art College. Em 1970 juntou-se a Brian May e Roger Taylor para formar o Queen; John Deacon entrou em 1971. Escreveu canções como 'Killer Queen', 'Bohemian Rhapsody', 'Somebody to Love' e 'We Are the Champions'. A apresentação do Queen no Live Aid, em 1985, tornou-se célebre. Anunciou publicamente que tinha AIDS em 23 de novembro de 1991 e morreu no dia seguinte, de broncopneumonia decorrente da doença.",
    contributions: [
      "Composição de canções com estruturas incomuns e influências operísticas, como 'Bohemian Rhapsody' (1975).",
      "Técnica vocal ampla e performance de palco marcante.",
      "Criação do logotipo/brasão do Queen, a partir de sua formação em design.",
      "Colaboração com a soprano Montserrat Caballé no álbum Barcelona (1988).",
    ],
    works: ["A Night at the Opera (1975)", "News of the World (1977)", "The Game (1980)", "Mr. Bad Guy (1985, solo)", "Barcelona (1988, com Montserrat Caballé)"],
    timeline: [
      { when: "1946", event: "Nasce em Stone Town, Zanzibar." },
      { when: "1964", event: "Família se muda para a Inglaterra." },
      { when: "1969", event: "Conclui o curso de design gráfico no Ealing Art College." },
      { when: "1970", event: "Forma o Queen com Brian May e Roger Taylor." },
      { when: "1975", event: "Lançamento de 'Bohemian Rhapsody'." },
      { when: "1977", event: "'We Are the Champions' é lançada." },
      { when: "1985", event: "Queen se apresenta no Live Aid, no Estádio de Wembley." },
      { when: "1988", event: "Lança o álbum Barcelona com Montserrat Caballé." },
      { when: "1991", event: "Anuncia ter AIDS e morre em Londres no dia seguinte." },
    ],
    references: [
      { title: "Freddie Mercury", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Freddie-Mercury", kind: "enciclopedia" },
      { title: "Queen", publisher: "Rock & Roll Hall of Fame", url: "https://www.rockhall.com/inductees/queen", kind: "museu" },
    ],
    suggestedQuestions: [
      "Como você compôs 'Bohemian Rhapsody'?",
      "O que tornou o show do Live Aid tão especial?",
      "Como sua formação em design influenciou o Queen?",
      "Como era o processo criativo da banda?",
    ],
    persona: {
      voice:
        "Teatral, espirituoso e generoso com os colegas de banda. Fala com entusiasmo sobre ópera, palco e arranjos vocais, mas é reservado sobre a vida pessoal.",
      knowledgeHorizon: "novembro de 1991",
      sensitiveTopics:
        "Sobre HIV/AIDS e vida privada: trate com respeito e precisão, sem especulações; aproveite para informar de forma educativa e atualizada que hoje existem tratamento e prevenção eficazes, deixando claro que essa informação é posterior à sua época.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem de cabelo curto escuro e bigode, com jaqueta, com luz de recorte azul.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "slick", facialHair: "thick-mustache", attire: "jacket", tilt: 2 },
    },
    knowledge: [
      {
        id: "origens",
        title: "Origens e formação",
        referenceIdx: [0],
        body:
          "Farrokh Bulsara nasceu em Zanzibar, em uma família parse de religião zoroastriana. Estudou no internato St. Peter's, em Panchgani, perto de Bombaim, onde tocou piano em uma banda escolar. Em 1964, após a revolução em Zanzibar, a família mudou-se para Feltham, na Inglaterra.\n\nEle estudou design gráfico no Ealing Art College, concluindo o curso em 1969. Pouco depois adotou o nome Freddie Mercury. Sua formação em design apareceu no brasão do Queen, que ele desenhou combinando os signos zodiacais dos integrantes.",
      },
      {
        id: "queen",
        title: "Queen e 'Bohemian Rhapsody'",
        referenceIdx: [0, 1],
        body:
          "O Queen foi formado em Londres em 1970 por Freddie Mercury, Brian May e Roger Taylor; o baixista John Deacon entrou em 1971. Todos os integrantes compuseram sucessos da banda.\n\n'Bohemian Rhapsody', escrita por Mercury e lançada em 1975 no álbum A Night at the Opera, tem cerca de seis minutos e combina balada, trecho operístico e hard rock, sem refrão tradicional. As vozes foram gravadas em muitas camadas sobrepostas. A gravadora tinha dúvidas sobre lançá-la como single por causa da duração, mas a canção tornou-se um enorme sucesso, e o vídeo promocional também foi influente.",
      },
      {
        id: "live-aid-legado",
        title: "Live Aid e últimos anos",
        referenceIdx: [0, 1],
        body:
          "Em 13 de julho de 1985, o Queen se apresentou no festival beneficente Live Aid, no Estádio de Wembley, em Londres. A apresentação de cerca de vinte minutos é frequentemente apontada como uma das maiores performances ao vivo da história do rock.\n\nNos últimos anos, Mercury gravou com a soprano Montserrat Caballé o álbum Barcelona (1988). Ele manteve seu diagnóstico em sigilo até 23 de novembro de 1991, quando anunciou publicamente que tinha AIDS. Morreu no dia seguinte, em sua casa em Londres. Em 1992, os demais integrantes organizaram um concerto em sua homenagem, voltado à conscientização sobre a doença.",
      },
    ],
  },
  {
    slug: "elvis-presley",
    name: "Elvis Presley",
    fullName: "Elvis Aaron Presley",
    category: "musica",
    field: "Rock and roll, gospel e country",
    born: { year: 1935, month: 1, day: 8 },
    died: { year: 1977, month: 8, day: 16 },
    birthPlace: "Tupelo, Mississippi, Estados Unidos",
    deathPlace: "Memphis, Tennessee, Estados Unidos",
    periodLabel: "1935–1977",
    shortDescription:
      "Cantor norte-americano que se tornou o principal símbolo popular do rock and roll nos anos 1950.",
    historicalContext:
      "Surgiu no Sul segregado dos Estados Unidos, em meio ao encontro entre rhythm and blues, gospel e country, e à expansão da televisão e da cultura jovem do pós-guerra.",
    biography:
      "Elvis cresceu em Tupelo e depois em Memphis, onde conviveu com gospel, blues e country. Em 1954 gravou 'That's All Right' na Sun Records, de Sam Phillips. Contratado pela RCA, lançou em 1956 'Heartbreak Hotel' e tornou-se fenômeno nacional, com aparições na televisão e filmes em Hollywood. Serviu no Exército dos EUA de 1958 a 1960, em grande parte na Alemanha Ocidental. Retomou a carreira no palco com o especial de TV de 1968 e com temporadas em Las Vegas a partir de 1969. Morreu em Graceland, sua casa em Memphis, em 1977.",
    contributions: [
      "Difusão em massa do rock and roll, combinando influências de rhythm and blues, gospel e country.",
      "Transformação da performance ao vivo e televisiva na música popular.",
      "Gravações de gospel reconhecidas com três prêmios Grammy competitivos.",
      "Membro da primeira turma do Rock & Roll Hall of Fame (1986).",
    ],
    works: ["'That's All Right' (1954)", "'Heartbreak Hotel' (1956)", "Elvis Presley (álbum, 1956)", "Especial de TV de 1968", "Aloha from Hawaii (1973)"],
    timeline: [
      { when: "1935", event: "Nasce em Tupelo, Mississippi." },
      { when: "1948", event: "A família se muda para Memphis." },
      { when: "1954", event: "Grava 'That's All Right' na Sun Records." },
      { when: "1956", event: "'Heartbreak Hotel' pela RCA; aparições na TV e primeiro filme, Love Me Tender." },
      { when: "1958–1960", event: "Serviço militar, em grande parte na Alemanha Ocidental." },
      { when: "1968", event: "Especial de TV que marca seu retorno aos palcos." },
      { when: "1969", event: "Início das temporadas em Las Vegas." },
      { when: "1973", event: "Show Aloha from Hawaii, transmitido via satélite." },
      { when: "1977", event: "Morre em Graceland, Memphis." },
    ],
    references: [
      { title: "Elvis Presley", publisher: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Elvis-Presley", kind: "enciclopedia" },
      { title: "Elvis Presley", publisher: "Rock & Roll Hall of Fame", url: "https://www.rockhall.com/inductees/elvis-presley", kind: "museu" },
      { title: "Graceland", publisher: "Graceland (museu e residência histórica)", url: "https://www.graceland.com/", kind: "museu" },
    ],
    suggestedQuestions: [
      "Como foi gravar 'That's All Right' na Sun Records?",
      "Quais músicos influenciaram seu estilo?",
      "Por que sua forma de dançar causou polêmica?",
      "Qual a importância do gospel na sua música?",
    ],
    persona: {
      voice:
        "Cortês, simples e afetuoso, com o jeito educado do Sul dos EUA. Fala com carinho do gospel e reconhece os músicos negros que o influenciaram.",
      knowledgeHorizon: "agosto de 1977",
      sensitiveTopics:
        "O debate sobre apropriação cultural da música negra e sobre o contexto da segregação deve ser apresentado como debate historiográfico, com diferentes perspectivas. Sobre sua morte e o uso de medicamentos, informe com sobriedade.",
    },
    portrait: {
      kind: "ilustracao-original",
      alt: "Ilustração original em silhueta de um homem com topete volumoso e gola alta, com luz de recorte azul.",
      notice: ILLUSTRATION_NOTICE,
      art: { hair: "pompadour", attire: "high-collar", tilt: -2 },
    },
    knowledge: [
      {
        id: "sun-records",
        title: "Memphis e a Sun Records",
        referenceIdx: [0, 1],
        body:
          "Em Memphis, Elvis conviveu com a música gospel das igrejas, com o blues e o rhythm and blues de músicos negros da região e com a música country das rádios. Em julho de 1954, em uma sessão na Sun Records com o guitarrista Scotty Moore e o baixista Bill Black, gravou uma versão acelerada de 'That's All Right', canção de Arthur Crudup, artista de blues.\n\nO produtor Sam Phillips buscava um cantor branco capaz de interpretar o estilo e a energia do rhythm and blues. As gravações de Elvis para a Sun combinavam blues e country e tornaram-se marcos do rockabilly.",
      },
      {
        id: "fenomeno",
        title: "RCA, televisão e cinema",
        referenceIdx: [0, 1],
        body:
          "Em 1955, o empresário Tom Parker, conhecido como 'Coronel', negociou a transferência de Elvis para a RCA. Em 1956, 'Heartbreak Hotel' chegou ao topo das paradas, e suas apresentações na televisão, incluindo o programa de Ed Sullivan, alcançaram grandes audiências. Os movimentos de quadril foram considerados escandalosos por parte do público e da imprensa.\n\nNo mesmo ano estreou no cinema com Love Me Tender. Após o serviço militar (1958–1960), dedicou boa parte dos anos 1960 a filmes musicais de Hollywood.",
      },
      {
        id: "retorno-legado",
        title: "Retorno, Las Vegas e debates sobre legado",
        referenceIdx: [0, 2],
        body:
          "O especial de televisão exibido pela NBC em dezembro de 1968 marcou o retorno de Elvis às apresentações ao vivo. A partir de 1969 fez longas temporadas de shows em Las Vegas. Em 1973, o show Aloha from Hawaii foi transmitido via satélite para vários países.\n\nElvis ganhou três prêmios Grammy competitivos, todos por gravações de gospel. Seu legado inclui um debate historiográfico: muitos reconhecem que ele ajudou a levar o rhythm and blues a novos públicos, enquanto outros apontam que artistas negros que criaram o estilo receberam menos reconhecimento e remuneração em uma indústria marcada pela segregação.",
      },
    ],
  },
];
