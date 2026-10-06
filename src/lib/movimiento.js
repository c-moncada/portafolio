import { cubicBezier } from 'animejs/easings/cubic-bezier'

// Curvas de la skill de Emil Kowalski: las curvas de CSS se quedan cortas.
// Las cadenas van a waapi.animate (corre fuera del hilo principal); las
// funciones, al motor JS de Anime.js.
export const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
export const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)'
export const easeOut = cubicBezier(0.23, 1, 0.32, 1)

// Para createScope de Anime.js: self.matches.reducir
export const CONSULTAS = { reducir: '(prefers-reduced-motion: reduce)' }
