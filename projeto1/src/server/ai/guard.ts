/**
 * Heurísticas de detecção de tentativas de prompt injection.
 * NÃO são a principal defesa (a principal é a separação estrutural de
 * instruções e dados no prompt e a ausência de ferramentas privilegiadas);
 * servem para reforçar o comportamento e registrar métricas.
 */
const PATTERNS: { id: string; re: RegExp }[] = [
  { id: "ignore_instructions", re: /\b(ignore|ignora|ignorar|desconsidere|esque[cç]a)\b.{0,40}\b(instru[cç][oõ]es|regras|prompt|orienta[cç][oõ]es|instructions|rules)\b/i },
  { id: "reveal_prompt", re: /\b(revele|mostre|repita|imprima|exiba|copie|reveal|print|show|repeat)\b.{0,50}\b(prompt|instru[cç][oõ]es (do sistema|internas|iniciais)|system message|mensagem do sistema|configura[cç][aã]o interna)\b/i },
  { id: "role_override", re: /\b(a partir de agora|from now on|voc[eê] agora [eé]|you are now|finja ser|pretend to be|atue como|act as)\b/i },
  { id: "developer_mode", re: /\b(modo desenvolvedor|developer mode|jailbreak|DAN\b|sudo|modo administrador|admin mode)/i },
  { id: "secrets", re: /\b(api[_ -]?key|chave (da )?api|token|senha|password|secret|segredo|vari[aá]veis de ambiente|env(ironment)? var)/i },
  { id: "other_users", re: /\b(conversas? de outr[oa]s?|outros usu[aá]rios|other users'? (chats|conversations)|banco de dados|database|sql)\b/i },
  { id: "fake_tags", re: /<\/?\s*(system|sistema|instru[cç][oõ]es|documentos_de_referencia|mensagem_do_estudante|assistant|developer)[^>]*>/i },
];

export interface InjectionAssessment {
  flagged: boolean;
  reasons: string[];
}

export function assessInjection(text: string): InjectionAssessment {
  const reasons = PATTERNS.filter((p) => p.re.test(text)).map((p) => p.id);
  return { flagged: reasons.length > 0, reasons };
}

/**
 * Neutraliza delimitadores em conteúdo não confiável para impedir que o texto
 * "feche" as tags estruturais do prompt. Substitui < e > por equivalentes
 * visuais (legíveis pelo modelo, mas sem valor sintático).
 */
export function neutralizeDelimiters(text: string): string {
  return text.replace(/</g, "‹").replace(/>/g, "›");
}
