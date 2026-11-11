import type { Personality } from "@/content/types";
import { getScope } from "@/content/scopes";

/**
 * Mensagens de redirecionamento (nível 3) e de recusa por segurança.
 * Geradas no servidor, sem chamar o modelo, para garantir que o assunto
 * paralelo NÃO seja desenvolvido. A variação vem da combinação de aberturas,
 * campos e sugestões específicas de cada personalidade.
 */
const OPENINGS = [
  "Essa é uma questão interessante, mas está distante dos assuntos que fazem parte do meu campo de conhecimento.",
  "Esse tema foge do que eu estudei e vivi, então não seria honesto da minha parte opinar sobre ele.",
  "Confesso que esse assunto não pertence ao meu universo de trabalho.",
  "Prefiro não me aventurar por esse caminho: ele está fora da minha área e da minha época.",
  "Aqui eu não seria um bom guia — esse assunto está longe daquilo que conheço.",
];

const BRIDGES = [
  "Podemos, no entanto, explorar temas como",
  "Que tal voltarmos a assuntos como",
  "Se quiser, posso ajudar você a compreender",
  "Posso conversar com prazer sobre",
];

const UNSAFE = [
  "Não posso ajudar com esse tipo de conteúdo, pois ele pode causar danos ou não é adequado a este espaço educacional.",
  "Esse pedido ultrapassa os limites desta conversa educacional, então não vou fornecer esse tipo de orientação.",
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]!;
}

export function buildRedirect(p: Personality, message: string, turn: number): string {
  const scope = getScope(p.slug);
  const seed = hash(`${p.slug}|${turn}|${message}`);
  const topics = scope?.redirectTopics ?? p.suggestedQuestions;
  const t1 = pick(topics, seed >>> 3);
  const t2 = pick(topics.filter((t) => t !== t1), seed >>> 7) ?? t1;
  return `${pick(OPENINGS, seed)} ${pick(BRIDGES, seed >>> 11)} ${t1} ou ${t2}. O que acha?`;
}

export function buildUnsafeDecline(p: Personality, message: string, turn: number): string {
  const seed = hash(`unsafe|${p.slug}|${turn}|${message}`);
  const topic = pick(getScope(p.slug)?.redirectTopics ?? p.suggestedQuestions, seed >>> 5);
  return `(Fora do personagem) ${pick(UNSAFE, seed)} Se precisar de ajuda com algo difícil, procure um adulto de confiança${
    /\b(machucar|me matar|suic|automutil|me ferir)/i.test(message) ? " ou ligue para o CVV (188), que atende 24 horas" : ""
  }. Quando quiser, podemos continuar com ${topic}.`;
}
