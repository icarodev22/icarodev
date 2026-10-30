import { useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, InstagramIcon, WhatsAppIcon } from '../components/icons'
import { contacts } from '../content'
import { contratacao } from '../media'
import {
  EVENT_TYPES,
  LIMITS,
  buildMessage,
  validate,
  whatsappUrl,
  type BookingErrors,
  type BookingInput,
} from '../lib/booking'
import './contato.css'

/** Ordem dos campos na tela (e do foco quando há erro). */
const FIELD_ORDER = ['local', 'tipo', 'tipoOutro'] as const

/**
 * Contratação: formulário compacto (composição do Contact 7 do React Bits Pro)
 * ao lado de uma fotografia. Monta a mensagem e abre o WhatsApp oficial; o
 * envio só acontece quando o visitante confirma no próprio WhatsApp.
 */
export function Contato() {
  const [form, setForm] = useState<BookingInput>({ tipo: '', tipoOutro: '', local: '', info: '' })
  const [errors, setErrors] = useState<BookingErrors>({})
  const [status, setStatus] = useState('')
  const refs = {
    local: useRef<HTMLInputElement>(null),
    tipo: useRef<HTMLSelectElement>(null),
    tipoOutro: useRef<HTMLInputElement>(null),
  }

  const set = (key: keyof BookingInput) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
    setStatus('')
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    const first = FIELD_ORDER.find((k) => found[k])
    if (first) {
      setStatus('')
      refs[first].current?.focus()
      return
    }
    const url = whatsappUrl(buildMessage(form))
    // Nova aba no computador; no celular o link abre o aplicativo.
    const win = window.open(url, '_blank')
    if (win) win.opener = null
    else window.location.href = url
    setStatus('A mensagem abriu no WhatsApp. Ela só é enviada quando você confirmar lá.')
  }

  const err = (k: keyof BookingErrors) =>
    errors[k] ? (
      <p id={`err-${k}`} className="field__error">
        {errors[k]}
      </p>
    ) : null

  return (
    <section id="contato" className="contato" aria-labelledby="contato-title">
      <div className="contato__inner">
        <div className="contato__body">
          <h2 id="contato-title" className="title contato__title" data-reveal>
            Vamos fazer acontecer?
          </h2>
          <p className="contato__lead" data-reveal style={{ ['--d' as string]: 80 }}>
            A solicitação abre pronta no WhatsApp.
          </p>

          <form className="contato__form" noValidate onSubmit={onSubmit} data-reveal style={{ ['--d' as string]: 160 }}>
            <div className="field">
              <label htmlFor="f-local">LOCAL</label>
              <input
                id="f-local"
                ref={refs.local}
                type="text"
                value={form.local}
                onChange={set('local')}
                placeholder="Cidade, espaço ou endereço do evento"
                maxLength={LIMITS.local}
                required
                autoComplete="off"
                aria-invalid={!!errors.local}
                aria-describedby={errors.local ? 'err-local' : undefined}
              />
              {err('local')}
            </div>

            <div className="field">
              <label htmlFor="f-tipo">TIPO DO EVENTO</label>
              <select
                id="f-tipo"
                ref={refs.tipo}
                value={form.tipo}
                onChange={set('tipo')}
                required
                aria-invalid={!!errors.tipo}
                aria-describedby={errors.tipo ? 'err-tipo' : undefined}
              >
                <option value="" disabled>
                  Selecione
                </option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {err('tipo')}
            </div>

            {form.tipo === 'Outro' && (
              <div className="field">
                <label htmlFor="f-tipo-outro">QUAL TIPO DE EVENTO?</label>
                <input
                  id="f-tipo-outro"
                  ref={refs.tipoOutro}
                  type="text"
                  value={form.tipoOutro}
                  onChange={set('tipoOutro')}
                  maxLength={LIMITS.tipo}
                  required
                  autoComplete="off"
                  aria-invalid={!!errors.tipoOutro}
                  aria-describedby={errors.tipoOutro ? 'err-tipoOutro' : undefined}
                />
                {err('tipoOutro')}
              </div>
            )}

            <div className="field">
              <label htmlFor="f-info">MAIS INFORMAÇÕES</label>
              <textarea
                id="f-info"
                value={form.info}
                onChange={set('info')}
                placeholder="Conte um pouco sobre o evento..."
                maxLength={LIMITS.info}
                rows={3}
              />
            </div>

            <button type="submit" className="btn btn--light btn--caps contato__submit">
              SOLICITAR CONTRATAÇÃO
              <ArrowUpRight />
            </button>
            <p className="contato__status" role="status">
              {status}
            </p>
          </form>

          <div className="contato__direct">
            <a href={contacts.whatsapp.href} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {contacts.whatsapp.display}
            </a>
            <a href={contacts.instagram.href} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              {contacts.instagram.display.toUpperCase()}
            </a>
          </div>
        </div>

        <figure className="contato__photo" data-reveal="image" style={{ ['--d' as string]: 120 }}>
          <img
            src={contratacao.src}
            srcSet={contratacao.srcSet}
            sizes="(max-width: 719px) 100vw, 50vw"
            width={contratacao.width}
            height={contratacao.height}
            alt={contratacao.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: contratacao.position }}
          />
        </figure>
      </div>
    </section>
  )
}
