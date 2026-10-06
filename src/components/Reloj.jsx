import { useLayoutEffect, useRef, useState } from 'react'
import { animate } from 'animejs/animation'
import { createScope } from 'animejs/scope'
import { createTimer } from 'animejs/timer'
import { set } from 'animejs/utils'
import { CONSULTAS, easeOut } from '../lib/movimiento.js'
import { desfaseZona, etiquetaUtc } from '../lib/tiempo.js'

const HORAS = Array.from({ length: 12 }, (_, i) => i)

function dos(n) {
  return String(n).padStart(2, '0')
}

// La hora de la zona, leída con los métodos UTC de un Date desplazado.
function ahoraEn(desfase) {
  return new Date(Date.now() + desfase)
}

// Reloj con la hora de Tegucigalpa: le dice al reclutador en qué zona horaria
// trabajo. El segundero, como el de las estaciones suizas, da la vuelta en
// 58,5 s y espera en las 12 a que salte el minuto.
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
        const enElMinuto = s * 1000 + t.getUTCMilliseconds()
        set(segundero.current, { rotate: reducir ? s * 6 : Math.min(enElMinuto / 58_500, 1) * 360 })

        const minutoDelDia = h * 60 + m
        if (minutoDelDia === minutoPintado) return
        const saltar = minutoPintado !== null && !reducir && minutoDelDia > minutoPintado
        for (const [manecilla, angulo] of [
          [minutero.current, minutoDelDia * 6],
          [horario.current, minutoDelDia * 0.5],
        ]) {
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
    <article className="bloque bloque--reloj" data-revelar ref={raiz}>
      <h2 className="bloque__titulo">Hora en {ciudad}</h2>
      <svg className="reloj" viewBox="-50 -50 100 100" aria-hidden="true">
        <circle className="reloj__esfera" r="47" />
        {HORAS.map((i) => (
          <line
            key={i}
            className="reloj__marca"
            x1="0"
            y1="-41"
            x2="0"
            y2={i % 3 === 0 ? -33 : -37}
            transform={`rotate(${i * 30})`}
          />
        ))}
        <g ref={horario}>
          <line className="reloj__horario" x1="0" y1="6" x2="0" y2="-22" />
        </g>
        <g ref={minutero}>
          <line className="reloj__minutero" x1="0" y1="8" x2="0" y2="-34" />
        </g>
        <g ref={segundero} className="reloj__segundero">
          <line x1="0" y1="10" x2="0" y2="-36" />
          <circle r="2.4" />
        </g>
      </svg>
      <p className="reloj__digital">
        <time>{hora}</time>
        <span className="reloj__utc">{etiquetaUtc(desfase)}</span>
      </p>
    </article>
  )
}
