/**
 * Formulário de contratação → mensagem de WhatsApp.
 * A mesma lógica existe em JavaScript puro em BAYMA-HTML/js/script.js; se mudar
 * uma, mude a outra.
 */

export const WHATSAPP_NUMBER = '5581989575353'

export const EVENT_TYPES = ['Festa particular', 'Aniversário', 'Evento universitário', 'Evento corporativo', 'Outro']

export const LIMITS = { tipo: 80, local: 160, info: 1200 }

export type BookingInput = { tipo: string; tipoOutro: string; local: string; info: string }
export type BookingErrors = Partial<Record<'tipo' | 'tipoOutro' | 'local', string>>

/** Campos de uma linha: qualquer quebra vira espaço, para não desmontar a mensagem. */
const oneLine = (s: string, max: number) => s.replace(/\s+/g, ' ').trim().slice(0, max)

/**
 * Texto livre: mantém as quebras de linha do visitante, mas sem linhas em branco,
 * que se confundiriam com o separador entre os campos da mensagem.
 */
const multiLine = (s: string, max: number) =>
  s
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{2,}/g, '\n')
    .trim()
    .slice(0, max)

export function validate(input: BookingInput): BookingErrors {
  const errors: BookingErrors = {}
  if (!input.tipo) errors.tipo = 'Escolha o tipo do evento.'
  else if (input.tipo === 'Outro' && !oneLine(input.tipoOutro, LIMITS.tipo))
    errors.tipoOutro = 'Escreva qual é o tipo do evento.'
  if (!oneLine(input.local, LIMITS.local)) errors.local = 'Informe o local do evento.'
  return errors
}

/** Mensagem na ordem obrigatória: LOCAL, TIPO DO EVENTO, MAIS INFORMAÇÕES. */
export function buildMessage(input: BookingInput) {
  const tipo = input.tipo === 'Outro' ? oneLine(input.tipoOutro, LIMITS.tipo) : oneLine(input.tipo, LIMITS.tipo)
  const info = multiLine(input.info, LIMITS.info) || 'Não informado.'
  return [
    'Olá, BAYMA! Gostaria de solicitar uma contratação.',
    '',
    'LOCAL:',
    oneLine(input.local, LIMITS.local),
    '',
    'TIPO DO EVENTO:',
    tipo,
    '',
    'MAIS INFORMAÇÕES:',
    info,
  ].join('\n')
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
