import { useEffect, useMemo, useRef } from 'react'
import { stagger } from 'animejs/utils'
import { waapi } from 'animejs/waapi'
import { EASE_OUT, limpiarAlTerminar, reducirMovimiento } from '../lib/movimiento.js'
import { aMes, etiquetaMes, mesActual, mesesConActividad } from '../lib/tiempo.js'

const plural = (n) => (n === 1 ? '1 proyecto' : `${n} proyectos`)

// Mapa de calor con los meses reales en que hubo commits, de enero del primer
// año hasta hoy. Más oscuro = más proyectos ese mes.
export default function Actividad({ proyectos }) {
  const raiz = useRef(null)
  const { anios, meses, hoy } = useMemo(() => {
    const hoy = mesActual()
    const primero = Math.min(...proyectos.map((p) => aMes(p.inicio)))
    const anios = []
    for (let a = Math.floor(primero / 12); a <= Math.floor(hoy / 12); a++) anios.push(a)
    return { anios, meses: mesesConActividad(proyectos), hoy }
  }, [proyectos])

  // Las celdas con commits se encienden en orden la primera vez que el bloque se ve.
  useEffect(() => {
    if (reducirMovimiento()) return
    const celdas = raiz.current.querySelectorAll('.calor__celda[data-nivel]:not([data-nivel="0"])')
    celdas.forEach((c) => (c.style.opacity = '0'))
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        observador.disconnect()
        waapi.animate(celdas, {
          opacity: [0, 1],
          transform: ['scale(0.4)', 'scale(1)'],
          duration: 420,
          delay: stagger(30, { start: 300 }),
          ease: EASE_OUT,
          onComplete: limpiarAlTerminar('opacity', 'transform'),
        })
      },
      { threshold: 0.5 },
    )
    observador.observe(raiz.current)
    return () => {
      observador.disconnect()
      celdas.forEach((c) => c.style.removeProperty('opacity'))
    }
  }, [])

  return (
    <article className="bloque bloque--actividad" data-revelar ref={raiz}>
      <h2 className="bloque__titulo">Actividad</h2>
      <p className="bloque__nota">
        Meses con commits, {anios[0]} a {anios.at(-1)}
      </p>
      <div
        className="calor"
        role="img"
        aria-label={`${meses.size} meses con commits entre ${anios[0]} y ${anios.at(-1)}`}
      >
        {anios.map((anio) => (
          <div className="calor__fila" key={anio}>
            <span className="calor__anio">{anio}</span>
            {Array.from({ length: 12 }, (_, i) => {
              const mes = anio * 12 + i
              const n = meses.get(mes) ?? 0
              const futuro = mes > hoy
              return (
                <span
                  key={i}
                  className="calor__celda"
                  data-nivel={futuro ? undefined : Math.min(n, 3)}
                  title={futuro ? undefined : `${etiquetaMes(mes)}: ${plural(n)}`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </article>
  )
}
