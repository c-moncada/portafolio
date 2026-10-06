// Iconos dibujados a mano, todos con el mismo trazo, para que formen una familia.
const TRAZO = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Icono({ className = 'icono', children }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      {children}
    </svg>
  )
}

export function IconoExterno({ className }) {
  return (
    <Icono className={className}>
      <path {...TRAZO} d="M5.5 10.5 10.5 5.5M6.5 5.5h4v4" />
    </Icono>
  )
}

export function IconoFlecha({ className }) {
  return (
    <Icono className={className}>
      <path {...TRAZO} d="M8 3.5v9M4.5 9 8 12.5 11.5 9" />
    </Icono>
  )
}

export function IconoCopiar({ className }) {
  return (
    <Icono className={className}>
      <rect {...TRAZO} x="5.5" y="5.5" width="7.5" height="7.5" rx="1.75" />
      <path {...TRAZO} d="M10.5 3.5h-6a1 1 0 0 0-1 1v6" />
    </Icono>
  )
}

export function IconoCheck({ className }) {
  return (
    <Icono className={className}>
      <path {...TRAZO} d="m3.5 8.5 3 3 6-7" />
    </Icono>
  )
}

export function IconoCerrar({ className }) {
  return (
    <Icono className={className}>
      <path {...TRAZO} d="m4.5 4.5 7 7m0-7-7 7" />
    </Icono>
  )
}
