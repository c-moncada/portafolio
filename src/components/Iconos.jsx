// Iconos dibujados a mano con el mismo trazo (1.75) para que formen una familia.

export function IconoExterno({ className = 'icono-externo' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  )
}

export function IconoChevron({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  )
}
