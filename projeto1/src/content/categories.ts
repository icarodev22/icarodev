import type { Category, CategoryId } from "./types";

export const CATEGORIES: readonly Category[] = [
  { id: "fisica", name: "Física", description: "Matéria, energia, espaço e tempo." },
  { id: "quimica", name: "Química", description: "Elementos, reações e a estrutura da matéria." },
  { id: "filosofia", name: "Filosofia", description: "Conhecimento, ética e a arte de perguntar." },
  { id: "musica", name: "Música", description: "Composição, performance e cultura popular." },
  { id: "historia", name: "História", description: "Como investigamos e narramos o passado." },
  { id: "imperadores", name: "Imperadores", description: "Poder, Estado e transformação política." },
] as const;

export function getCategory(id: CategoryId): Category {
  const c = CATEGORIES.find((x) => x.id === id);
  if (!c) throw new Error(`Categoria desconhecida: ${id}`);
  return c;
}
