import { enlacesDe, textoEnlaceVivo } from '../lib/proyecto.js'
import Estado from './Estado.jsx'
import { IconoExterno } from './Iconos.jsx'
import Visual from './Visual.jsx'

// Un proyecto en el tablero. Todo el bloque abre el detalle; el botón redondo
// lleva directo al sitio, al demo o al código.
export default function Tarjeta({ proyecto, tamano = 'normal', onAbrir }) {
  const { vivo, codigo } = enlacesDe(proyecto)
  const enlace = vivo ?? codigo
  const textoEnlace = vivo ? textoEnlaceVivo(vivo) : 'Ver el código'

  return (
    <article className={`bloque tarjeta tarjeta--${tamano}`} data-revelar data-proyecto={proyecto.id}>
      <div className="tarjeta__cabeza">
        <Estado proyecto={proyecto} />
        {enlace && (
          <a className="tarjeta__enlace" href={enlace.url} target="_blank" rel="noreferrer">
            <IconoExterno />
            <span className="sr-only">
              {textoEnlace} de {proyecto.nombre} (se abre en otra pestaña)
            </span>
          </a>
        )}
      </div>
      <h3 className="tarjeta__titulo">
        <button
          type="button"
          className="tarjeta__abrir"
          onClick={(e) => onAbrir(proyecto, e.currentTarget.closest('.tarjeta'))}
        >
          {proyecto.nombre}
          <span className="sr-only">: ver el detalle</span>
        </button>
      </h3>
      <p className="tarjeta__variante">{proyecto.variante}</p>
      <p className="tarjeta__stack">{proyecto.stack.slice(0, 5).join(' · ')}</p>
      <Visual proyecto={proyecto} />
    </article>
  )
}
