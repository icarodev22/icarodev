const STOPWORDS = new Set(
  (
    "a o as os um uma uns umas de do da dos das em no na nos nas por pelo pela pelos pelas para pra com sem " +
    "e ou mas que se como quando onde qual quais quem porque porquê por que é ser foi era sao são esta está estao " +
    "estão isso isto aquilo esse essa este esta seu sua seus suas meu minha voce você voces vocês ele ela eles elas " +
    "me te lhe nos vos ao aos à às sobre entre mais menos muito muita já ja tambem também ainda so só fale diga explique " +
    "conte me sabe saber pode poderia gostaria quero queria"
  ).split(/\s+/),
);

export function normalize(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Extrai termos de busca seguros (somente letras/dígitos), sem stopwords. */
export function searchTerms(text: string, max = 12): string[] {
  const words = normalize(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
  return [...new Set(words)].slice(0, max);
}

/** Radical simplificado (prefixo) para casar flexões em português. */
export function stem(word: string): string {
  return word.length > 6 ? word.slice(0, 6) : word;
}
