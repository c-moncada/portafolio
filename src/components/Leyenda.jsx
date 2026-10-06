import { LINEAS } from '../data/lineas.js'

// Filtros por línea y la clave del horario: cada marca significa una sola cosa.
export default function Leyenda({ filtro, onFiltrar, conteos, total }) {
  return (
    <div className="leyenda">
      <div className="leyenda__filtros" role="group" aria-label="Filtrar proyectos por línea">
        <button
          type="button"
          className="filtro"
          aria-pressed={filtro === 'todas'}
          onClick={() => onFiltrar('todas')}
        >
          Todas <span className="filtro__cuenta">{total}</span>
          <span className="sr-only"> proyectos</span>
        </button>
        {Object.entries(LINEAS).map(([id, linea]) => (
          <button
            key={id}
            type="button"
            className="filtro"
            aria-pressed={filtro === id}
            onClick={() => onFiltrar(id)}
          >
            <span className="filtro__codigo" aria-hidden="true">
              {linea.codigo}
            </span>
            {linea.nombre} <span className="filtro__cuenta">{conteos[id]}</span>
            <span className="sr-only"> proyectos</span>
          </button>
        ))}
      </div>
      <ul className="leyenda__claves" aria-label="Cómo leer el horario">
        <li>
          <span className="clave clave--propio" aria-hidden="true" />
          Propio o para un negocio
        </li>
        <li>
          <span className="clave clave--curso" aria-hidden="true" />
          De curso
        </li>
        <li>
          <span className="clave clave--desarrollo" aria-hidden="true" />
          Meses con commits
        </li>
        <li>
          <span className="clave clave--enlinea" aria-hidden="true" />
          Sigue en línea
        </li>
        <li>
          <span className="clave clave--servicio" aria-hidden="true" />
          En servicio hoy
        </li>
        <li>
          <span className="clave clave--hoy" aria-hidden="true" />
          Hoy
        </li>
      </ul>
    </div>
  )
}
