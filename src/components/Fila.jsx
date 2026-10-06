import { periodo } from '../lib/tiempo.js'
import Detalle from './Detalle.jsx'
import { IconoChevron, IconoExterno } from './Iconos.jsx'
import Insignia from './Insignia.jsx'
import Trazo from './Trazo.jsx'

function Estado({ proyecto }) {
  const demo = proyecto.enlaces.find((e) => e.tipo === 'demo')
  const codigo = proyecto.enlaces.find((e) => e.tipo === 'codigo')

  let principal
  if (demo) {
    principal = (
      <a className="estado" href={demo.url} target="_blank" rel="noreferrer">
        <span className="estado__punto" aria-hidden="true" />
        Demo en vivo
        <IconoExterno />
        <span className="sr-only"> de {proyecto.nombre} (se abre en otra pestaña)</span>
      </a>
    )
  } else if (codigo) {
    principal = (
      <a className="estado" href={codigo.url} target="_blank" rel="noreferrer">
        Código
        <IconoExterno />
        <span className="sr-only"> de {proyecto.nombre} en GitHub (se abre en otra pestaña)</span>
      </a>
    )
  } else if (proyecto.enServicio) {
    // En producción pero sin demo público: no hay nada que enlazar.
    principal = (
      <span className="estado estado--produccion">
        <span className="estado__punto" aria-hidden="true" />
        En producción
      </span>
    )
  } else {
    principal = (
      <span className="estado estado--mudo">{proyecto.codigo === 'local' ? 'Solo local' : 'Repo privado'}</span>
    )
  }

  return (
    <div className="fila__estado">
      {principal}
      <span className="estado__equipo">{proyecto.equipo ? `Equipo de ${proyecto.equipo}` : 'Individual'}</span>
    </div>
  )
}

export default function Fila({ proyecto, eje, abierto, onAlternar }) {
  const idBoton = `${proyecto.id}-boton`
  const idDetalle = `${proyecto.id}-detalle`
  const curso = proyecto.origen === 'curso'

  return (
    <li className="fila" id={proyecto.id} data-abierto={abierto ? '' : undefined}>
      <h3 className="fila__titulo">
        <button
          id={idBoton}
          type="button"
          className="fila__boton"
          aria-expanded={abierto}
          aria-controls={idDetalle}
          onClick={onAlternar}
        >
          <span className="fila__lineas">
            <IconoChevron className="fila__chevron" />
            {proyecto.lineas.map((linea) => (
              <Insignia key={linea} linea={linea} curso={curso} />
            ))}
          </span>
          <span className="fila__proyecto">
            <span className="fila__nombre">
              {proyecto.nombre} <span className="fila__variante">{proyecto.variante}</span>
            </span>
            <span className="fila__stack">{proyecto.stack.join(' · ')}</span>
          </span>
          <Trazo proyecto={proyecto} eje={eje} />
          <span className="sr-only">
            , {periodo(proyecto.inicio, proyecto.fin)}
            {curso ? ', proyecto de curso' : ''}
            {proyecto.enServicio ? ', en servicio' : ''}
          </span>
        </button>
      </h3>
      <Estado proyecto={proyecto} />
      <div id={idDetalle} className="fila__detalle" role="region" aria-labelledby={idBoton} hidden={!abierto}>
        {abierto && <Detalle proyecto={proyecto} />}
      </div>
    </li>
  )
}
