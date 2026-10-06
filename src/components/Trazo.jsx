import { aMes } from '../lib/tiempo.js'

// El recorrido de un proyecto en el eje de tiempo: una vía negra entre el primer
// y el último mes con commits, una línea punteada hasta hoy si sigue en línea, y
// un punto rojo en "hoy" si hoy está en servicio.
export default function Trazo({ proyecto, eje }) {
  const a = aMes(proyecto.inicio)
  const b = aMes(proyecto.fin)
  const xa = eje.centro(a)
  const xb = eje.centro(b)
  const xHoy = eje.centro(eje.hoy)
  const variosMeses = b > a
  // Dos meses seguidos quedan a pocos píxeles: la vía mide al menos 16px para
  // que las dos paradas no se encimen.
  const largo = variosMeses ? `max(${xb - xa}%, 16px)` : '0px'
  const xFin = `calc(${xa}% + ${largo})`

  return (
    <span className="trazo" aria-hidden="true">
      {eje.anios.slice(1).map((anio) => (
        <span key={anio} className="trazo__anio" style={{ left: `${eje.x(anio * 12)}%` }} />
      ))}
      <span className="trazo__hoy" style={{ left: `${xHoy}%` }} />
      {proyecto.enServicio && b < eje.hoy && (
        <span className="trazo__enlinea" style={{ left: xFin, width: `max(0px, calc(${xHoy}% - ${xFin}))` }} />
      )}
      {variosMeses && <span className="trazo__via" style={{ left: `${xa}%`, width: largo }} />}
      <span className="trazo__parada trazo__parada--inicio" style={{ left: `${xa}%` }} />
      {variosMeses && <span className="trazo__parada trazo__parada--fin" style={{ left: xFin }} />}
      {proyecto.enServicio && (
        <span className="trazo__parada trazo__parada--servicio" style={{ left: `${xHoy}%` }} />
      )}
    </span>
  )
}
