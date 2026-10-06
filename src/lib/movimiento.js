import { cubicBezier } from 'animejs/easings/cubic-bezier'

// Curvas de la skill de Emil Kowalski: las curvas de CSS se quedan cortas.
// Las cadenas van a waapi.animate (corre fuera del hilo principal); las
// funciones, al motor JS de Anime.js.
export const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
export const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)'
export const EASE_CAJON = 'cubic-bezier(0.32, 0.72, 0, 1)'
export const easeOut = cubicBezier(0.23, 1, 0.32, 1)

// Para createScope de Anime.js: self.matches.reducir
export const CONSULTAS = { reducir: '(prefers-reduced-motion: reduce)' }

export const reducirMovimiento = () => window.matchMedia(CONSULTAS.reducir).matches

// Al terminar, WAAPI deja los valores finales escritos en el estilo del
// elemento. Esto los borra para que el CSS (hover, :active) vuelva a mandar.
export const limpiarAlTerminar =
  (...propiedades) =>
  (animacion) => {
    for (const el of animacion.targets) for (const p of propiedades) el.style.removeProperty(p)
  }
