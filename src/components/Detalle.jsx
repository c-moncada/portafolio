import { useLayoutEffect, useRef } from 'react'
import { createScope } from 'animejs/scope'
import { stagger } from 'animejs/utils'
import { waapi } from 'animejs/waapi'
import { CONSULTAS, EASE_IN_OUT, EASE_OUT } from '../lib/movimiento.js'
import { periodo } from '../lib/tiempo.js'
import { IconoExterno } from './Iconos.jsx'
import Recorrido from './Recorrido.jsx'

const CODIGO = { publico: 'Público', privado: 'Privado', local: 'Solo local, sin repositorio' }

function MiParte({ proyecto }) {
  const { miParte, equipo } = proyecto
  if (Array.isArray(miParte)) {
    return (
      <ul className="detalle__lista">
        {miParte.map((punto) => (
          <li key={punto}>{punto}</li>
        ))}
      </ul>
    )
  }
  if (miParte) return <p className="detalle__parrafo">{miParte}</p>
  return <p className="detalle__parrafo">Proyecto de curso hecho entre {equipo} personas.</p>
}

export default function Detalle({ proyecto }) {
  const raiz = useRef(null)
  const demo = proyecto.enlaces.find((e) => e.tipo === 'demo')
  const codigo = proyecto.enlaces.find((e) => e.tipo === 'codigo')

  // Al abrir, el texto aparece y el recorrido se dibuja de parada en parada.
  useLayoutEffect(() => {
    const scope = createScope({ root: raiz, mediaQueries: CONSULTAS }).add((self) => {
      if (self.matches.reducir) return
      waapi.animate('.detalle__texto', {
        opacity: [0, 1],
        transform: ['translateY(4px)', 'translateY(0)'],
        duration: 220,
        ease: EASE_OUT,
      })
      waapi.animate('.recorrido__parada', {
        opacity: [0, 1],
        transform: ['translateY(6px)', 'translateY(0)'],
        duration: 220,
        delay: stagger(70, { start: 40 }),
        ease: EASE_OUT,
      })
      waapi.animate('.recorrido__tramo', {
        transform: ['scaleY(0)', 'scaleY(1)'],
        duration: 160,
        delay: stagger(70, { start: 110 }),
        ease: EASE_IN_OUT,
      })
    })
    return () => scope.revert()
  }, [])

  return (
    <div className="detalle" ref={raiz}>
      <div className="detalle__texto">
        <p className="detalle__resumen">{proyecto.resumen}</p>
        {proyecto.destacados.length > 0 && (
          <ul className="detalle__lista">
            {proyecto.destacados.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}

        <h4 className="detalle__subtitulo">Mi parte</h4>
        <MiParte proyecto={proyecto} />

        <dl className="detalle__ficha">
          <dt>Período</dt>
          <dd>{periodo(proyecto.inicio, proyecto.fin)}</dd>
          <dt>Equipo</dt>
          <dd>{proyecto.equipo ? `${proyecto.equipo} personas` : 'Individual'}</dd>
          <dt>Origen</dt>
          <dd>{proyecto.origen === 'curso' ? 'Proyecto de curso' : 'Proyecto propio o para un negocio'}</dd>
          <dt>Código</dt>
          <dd>{CODIGO[proyecto.codigo]}</dd>
          <dt>Stack</dt>
          <dd>{proyecto.stack.join(', ')}</dd>
        </dl>

        {(demo || codigo) && (
          <div className="detalle__enlaces">
            {demo && (
              <a className="boton" href={demo.url} target="_blank" rel="noreferrer">
                Abrir el demo
                <IconoExterno />
                <span className="sr-only"> de {proyecto.nombre} (se abre en otra pestaña)</span>
              </a>
            )}
            {codigo && (
              <a
                className={demo ? 'boton boton--secundario' : 'boton'}
                href={codigo.url}
                target="_blank"
                rel="noreferrer"
              >
                Ver el código
                <IconoExterno />
                <span className="sr-only"> de {proyecto.nombre} en GitHub (se abre en otra pestaña)</span>
              </a>
            )}
          </div>
        )}
      </div>
      <Recorrido paradas={proyecto.recorrido} />
    </div>
  )
}
