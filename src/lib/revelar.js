import { waapi } from 'animejs/waapi'
import { EASE_OUT, limpiarAlTerminar, reducirMovimiento } from './movimiento.js'

const PROPIEDADES = ['opacity', 'transform', 'filter']

function animarEntrada(elementos, retraso) {
  elementos.forEach((el, i) =>
    waapi.animate(el, {
      opacity: [0, 1],
      transform: ['translateY(24px)', 'translateY(0px)'],
      filter: ['blur(6px)', 'blur(0px)'],
      duration: 700,
      delay: retraso + i * 70,
      ease: EASE_OUT,
      onComplete: limpiarAlTerminar(...PROPIEDADES),
    }),
  )
}

// Cada bloque aparece la primera vez que entra en la pantalla. Los que ya se
// ven al cargar entran después de la presentación. Sin JavaScript, o con
// movimiento reducido, todo está visible desde el principio. Devuelve la
// función de limpieza.
export function revelarAlEntrar(elementos, { retrasoInicial = 0 } = {}) {
  if (reducirMovimiento() || !('IntersectionObserver' in window)) return () => {}
  const lista = [...elementos]
  const visibles = lista.filter((el) => el.getBoundingClientRect().top < window.innerHeight)
  const pendientes = lista.filter((el) => !visibles.includes(el))

  animarEntrada(visibles, retrasoInicial)
  for (const el of pendientes) el.style.opacity = '0'

  const observador = new IntersectionObserver(
    (entradas) => {
      const entran = entradas.filter((e) => e.isIntersecting).map((e) => e.target)
      for (const el of entran) observador.unobserve(el)
      animarEntrada(entran, 0)
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  pendientes.forEach((el) => observador.observe(el))

  return () => {
    observador.disconnect()
    for (const el of lista) for (const p of PROPIEDADES) el.style.removeProperty(p)
  }
}
