import { useLayoutEffect, useRef, useState } from 'react'
import { animate } from 'animejs/animation'
import { createScope } from 'animejs/scope'
import { createTimer } from 'animejs/timer'
import { set } from 'animejs/utils'
import { CONSULTAS, easeOut } from '../lib/movimiento.js'
import { desfaseZona, etiquetaUtc } from '../lib/tiempo.js'

const MARCAS = Array.from({ length: 60 }, (_, i) => i)

function dos(n) {
  return String(n).padStart(2, '0')
}

// La hora de la zona, leída con los métodos UTC de un Date desplazado.
function ahoraEn(desfase) {
  return new Date(Date.now() + desfase)
}

// Reloj de estación con la hora de Tegucigalpa. Le dice al reclutador en qué
// zona horaria trabajo.
export default function Reloj({ zona, ciudad }) {
  const raiz = useRef(null)
  const horario = useRef(null)
  const minutero = useRef(null)
  const segundero = useRef(null)
  const [desfase] = useState(() => desfaseZona(zona))
  const [hora, setHora] = useState(() => {
    const t = ahoraEn(desfase)
    return `${dos(t.getUTCHours())}:${dos(t.getUTCMinutes())}`
  })

  useLayoutEffect(() => {
    const scope = createScope({ root: raiz, mediaQueries: CONSULTAS }).add((self) => {
      const reducir = self.matches.reducir
      let minutoPintado = null

      const pintar = () => {
        const t = ahoraEn(desfase)
        const h = t.getUTCHours()
        const m = t.getUTCMinutes()
        const s = t.getUTCSeconds()

        // Como el reloj de las estaciones suizas: el segundero da la vuelta en
        // 58,5 s y espera en las 12 hasta que salta el minuto.
        const enElMinuto = s * 1000 + t.getUTCMilliseconds()
        const giro = reducir ? s * 6 : Math.min(enElMinuto / 58_500, 1) * 360
        set(segundero.current, { rotate: giro })

        const minutoDelDia = h * 60 + m
        if (minutoDelDia === minutoPintado) return
        const manecillas = [
          [minutero.current, minutoDelDia * 6],
          [horario.current, minutoDelDia * 0.5],
        ]
        const saltar = minutoPintado !== null && !reducir && minutoDelDia > minutoPintado
        for (const [manecilla, angulo] of manecillas) {
          if (saltar) animate(manecilla, { rotate: angulo, duration: 160, ease: easeOut })
          else set(manecilla, { rotate: angulo })
        }
        minutoPintado = minutoDelDia
        setHora(`${dos(h)}:${dos(m)}`)
      }

      pintar()
      const reloj = createTimer({ frameRate: reducir ? 4 : 60, onUpdate: pintar })
      return () => reloj.cancel()
    })
    return () => scope.revert()
  }, [desfase])

  return (
    <div className="reloj" ref={raiz}>
      <div className="reloj__caja">
        <svg className="reloj__esfera" viewBox="-50 -50 100 100" role="img" aria-label={`Hora en ${ciudad}: ${hora}`}>
          <circle className="reloj__fondo" r="48.5" />
          <g className="reloj__marcas">
            {MARCAS.map((i) =>
              i % 5 === 0 ? (
                <rect key={i} x="-1.8" y="-45" width="3.6" height="11" transform={`rotate(${i * 6})`} />
              ) : (
                <rect key={i} x="-0.7" y="-45" width="1.4" height="3.8" transform={`rotate(${i * 6})`} />
              ),
            )}
          </g>
          <g ref={horario} className="reloj__manecilla">
            <rect x="-3.3" y="-27" width="6.6" height="35" />
          </g>
          <g ref={minutero} className="reloj__manecilla">
            <rect x="-2.5" y="-42" width="5" height="50" />
          </g>
          <g ref={segundero} className="reloj__segundero">
            <rect x="-0.8" y="-31" width="1.6" height="45" />
            <circle cy="-31" r="5.2" />
          </g>
        </svg>
      </div>
      <p className="reloj__hora">
        <time>{hora}</time> {ciudad} · <span className="reloj__utc">{etiquetaUtc(desfase)}</span>
      </p>
    </div>
  )
}
