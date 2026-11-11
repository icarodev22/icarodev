/**
 * Escopo temático de cada personalidade (Conversation Guard).
 * - core: temas diretamente relacionados (nível 1).
 * - adjacent: conexões legítimas e interdisciplinares (nível 2).
 * - redirectTopics: sugestões usadas ao redirecionar perguntas fora do escopo (nível 3).
 */
export interface PersonalityScope {
  core: string[];
  adjacent: string[];
  redirectTopics: string[];
}

export const SCOPES: Record<string, PersonalityScope> = {
  "albert-einstein": {
    core: ["física teórica", "relatividade restrita e geral", "efeito fotoelétrico e quanta de luz", "movimento browniano", "E = mc²", "gravitação e cosmologia", "debates sobre mecânica quântica", "sua vida, exílio e posições públicas"],
    adjacent: ["matemática usada na física", "filosofia da ciência", "história da ciência no século XX", "impacto científico e tecnológico de suas ideias", "pacifismo e controle de armas nucleares", "música como passatempo (violino)"],
    redirectTopics: ["como a relatividade mudou nossa ideia de tempo", "os experimentos mentais que usei", "por que a luz se comporta como partícula no efeito fotoelétrico"],
  },
  "niels-bohr": {
    core: ["modelo atômico", "espectros e níveis de energia", "mecânica quântica", "complementaridade", "debates com Einstein", "física nuclear e fissão", "o Instituto de Copenhague"],
    adjacent: ["filosofia da física", "história da ciência", "cooperação científica internacional", "política nuclear no pós-guerra"],
    redirectTopics: ["por que os átomos emitem cores específicas", "o que é a complementaridade", "meus debates com Einstein"],
  },
  "ernest-rutherford": {
    core: ["radioatividade", "radiações alfa e beta", "meia-vida", "descoberta do núcleo", "transmutação nuclear", "física experimental", "o Laboratório Cavendish"],
    adjacent: ["química das substâncias radioativas", "método experimental", "história da física nuclear", "formação de cientistas"],
    redirectTopics: ["o experimento da folha de ouro", "o que significa meia-vida", "como transformei nitrogênio em oxigênio"],
  },
  "marie-curie": {
    core: ["radioatividade", "descoberta do polônio e do rádio", "química", "física experimental", "seus dois Prêmios Nobel", "radiologia na Primeira Guerra", "o Instituto do Rádio"],
    adjacent: ["mulheres na ciência", "história da ciência", "aplicações médicas da radiação", "segurança em laboratório", "educação científica"],
    redirectTopics: ["como descobrimos o polônio e o rádio", "o que é a radioatividade", "os desafios de pesquisar no fim do século XIX"],
  },
  "antoine-lavoisier": {
    core: ["química", "combustão e oxigênio", "teoria do flogisto", "conservação da massa", "nomenclatura química", "Tratado elementar de química", "Revolução Francesa e sua execução"],
    adjacent: ["método científico e medição", "Iluminismo", "respiração como combustão", "sistema métrico", "Marie-Anne Lavoisier"],
    redirectTopics: ["por que a massa se conserva nas reações", "o fim da teoria do flogisto", "a nova linguagem da química"],
  },
  "dmitri-mendeleev": {
    core: ["tabela periódica", "lei periódica", "previsão de elementos", "propriedades dos elementos", "Princípios de Química"],
    adjacent: ["história da química", "metrologia", "indústria do petróleo no século XIX", "classificação e padrões na ciência"],
    redirectTopics: ["como organizei a tabela periódica", "os elementos que previ", "o que é periodicidade"],
  },
  socrates: {
    core: ["filosofia", "ética e virtude", "justiça", "conhecimento e ignorância", "método socrático e diálogo", "seu julgamento e morte", "Atenas do século V a.C."],
    adjacent: ["pensamento crítico aplicado a questões atuais", "educação e argumentação", "política e democracia atenienses", "fontes sobre Sócrates (Platão, Xenofonte)"],
    redirectTopics: ["o que é a justiça", "como examinar uma crença com perguntas", "o que significa saber que não se sabe"],
  },
  platao: {
    core: ["filosofia", "teoria das Formas", "alegoria da caverna", "A República e a justiça", "a alma", "a Academia", "diálogos platônicos"],
    adjacent: ["educação", "política", "matemática na Academia", "relação com Sócrates e Aristóteles", "influência na filosofia posterior"],
    redirectTopics: ["a alegoria da caverna", "o que são as Formas", "por que os filósofos deveriam governar"],
  },
  aristoteles: {
    core: ["filosofia", "lógica e silogismo", "ética das virtudes", "política", "metafísica e as quatro causas", "biologia antiga", "poética e retórica", "o Liceu"],
    adjacent: ["método de observação e classificação", "história da ciência", "relação com Platão e Alexandre", "argumentação"],
    redirectTopics: ["o que é um silogismo", "a virtude como meio-termo", "como eu classificava os seres vivos"],
  },
  "michael-jackson": {
    core: ["música pop", "composição e produção musical", "dança e coreografia", "carreira com os Jackson 5 e solo", "álbuns como Thriller", "videoclipes", "performance ao vivo"],
    adjacent: ["história da música negra norte-americana", "indústria fonográfica e MTV", "influências como James Brown e Motown", "música beneficente"],
    redirectTopics: ["como Thriller foi criado", "o processo de criar uma coreografia", "a importância dos videoclipes"],
  },
  "freddie-mercury": {
    core: ["rock", "composição", "técnica vocal", "a banda Queen", "Bohemian Rhapsody", "performance ao vivo e Live Aid", "design do brasão do Queen"],
    adjacent: ["ópera e influências musicais", "produção de estúdio nos anos 1970", "história do rock britânico", "conscientização sobre HIV/AIDS em perspectiva histórica"],
    redirectTopics: ["como Bohemian Rhapsody foi composta", "o show do Live Aid", "o processo criativo do Queen"],
  },
  "elvis-presley": {
    core: ["rock and roll", "gospel, blues e country", "Sun Records e RCA", "televisão e cinema nos anos 1950–60", "o especial de 1968 e Las Vegas", "performance de palco"],
    adjacent: ["história da música negra no Sul dos EUA", "segregação e debates sobre apropriação cultural", "indústria musical do pós-guerra"],
    redirectTopics: ["a gravação de That's All Right", "as influências do gospel na minha música", "por que minha forma de dançar causou polêmica"],
  },
  herodoto: {
    core: ["história", "Guerras Médicas", "as Histórias e seu método de investigação", "povos e costumes do mundo antigo", "Egito, Pérsia e Grécia"],
    adjacent: ["como avaliar fontes e versões", "geografia antiga", "historiografia", "comparação com Tucídides"],
    redirectTopics: ["por que gregos e persas entraram em guerra", "como eu reunia relatos", "o que vi no Egito"],
  },
  "ibn-khaldun": {
    core: ["história", "Muqaddimah", "'asabiyya", "ascensão e queda de dinastias", "crítica dos relatos históricos", "Magrebe, Andaluzia e Egito no século XIV", "encontro com Timur"],
    adjacent: ["economia: trabalho e tributação", "sociologia histórica", "direito maliquita", "Peste Negra"],
    redirectTopics: ["o que é 'asabiyya", "por que as dinastias entram em declínio", "como avaliar um relato histórico"],
  },
  "eric-hobsbawm": {
    core: ["história", "Revolução Francesa e Revolução Industrial", "longo século XIX e breve século XX", "imperialismo", "tradições inventadas", "movimentos sociais e banditismo social", "sua trajetória e militância"],
    adjacent: ["historiografia marxista e suas críticas", "nacionalismo", "Guerra Fria", "história do jazz"],
    redirectTopics: ["o que é o breve século XX", "o conceito de tradição inventada", "as consequências da Revolução Industrial"],
  },
  augusto: {
    core: ["Roma antiga", "fim da República e guerras civis", "Segundo Triunvirato", "Áccio", "Principado", "Pax Romana", "administração e propaganda imperial"],
    adjacent: ["política e poder em perspectiva histórica", "literatura augustana", "arquitetura de Roma", "fontes como Suetônio e a Res Gestae"],
    redirectTopics: ["como Roma deixou de ser república", "a batalha de Áccio", "o que foi a Pax Romana"],
  },
  "napoleao-bonaparte": {
    core: ["história", "Revolução Francesa", "estratégia militar em perspectiva histórica", "Consulado e Império", "Código Civil", "guerras napoleônicas", "exílio"],
    adjacent: ["vinda da corte portuguesa ao Brasil", "direito civil e sua influência", "política europeia do século XIX", "restabelecimento da escravidão e o Haiti"],
    redirectTopics: ["o Código Napoleônico", "por que a campanha da Rússia fracassou", "a ligação entre minhas guerras e o Brasil"],
  },
  "dom-pedro-ii": {
    core: ["história do Brasil", "Segundo Reinado", "regências e maioridade", "Guerra do Paraguai", "processo de abolição", "Proclamação da República e exílio"],
    adjacent: ["ciência, fotografia e cultura no século XIX", "Instituto Histórico e Geográfico Brasileiro", "relações internacionais do Império", "escravidão e economia cafeeira"],
    redirectTopics: ["como foi assumir o trono tão jovem", "o processo de abolição", "por que a monarquia caiu em 1889"],
  },
};

export function getScope(slug: string): PersonalityScope | undefined {
  return SCOPES[slug];
}
