type Props = { className?: string }

export function ArrowUpRight({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  )
}

export function ArrowDown({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 4v16M6 14l6 6 6-6" />
    </svg>
  )
}

export function ArrowLeft({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  )
}

export function ArrowRight({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function PlayIcon({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  )
}

export function InstagramIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function WhatsAppIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3.6 20.4l1.25-4.1A8.6 8.6 0 1 1 8 19.4z" strokeLinejoin="round" />
      <path
        d="M9.1 8.2c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c.6 1.1 1.5 2 2.7 2.6l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.6v.5c0 .4-.1.7-.5.9-.6.4-1.5.6-2.6.2-2.1-.8-3.9-2.6-4.7-4.6-.4-1.1-.3-2.2.1-2.7z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}
