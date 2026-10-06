import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { stagger } from 'animejs/utils'
import { waapi } from 'animejs/waapi'
import { LINEAS } from '../data/lineas.js'
import { EASE_CAJON, EASE_IN_OUT, EASE_OUT, limpiarAlTerminar, reducirMovimiento } from '../lib/movimiento.js'
import { enlacesDe, estadoDe, rutaCaptura, textoEnlaceVivo } from '../lib/proyecto.js'
import { periodo } from '../lib/tiempo.js'
import Estado from './Estado.jsx'
import { IconoCerrar, IconoExterno } from './Iconos.jsx'
import Recorrido from './Recorrido.jsx'

const CODIGO = { publico: 'Público', privado: 'Privado', local: 'Solo local, sin repositorio' }
const esMovil = () => window.matchMedia('(max-width: 40rem)').matches

// Transformación que lleva el panel a la caja del bloque que se tocó.
function hastaOrigen(origen, panel) {
  const o = origen.getBoundingClientRect()
  const f = panel.getBoundingClientRect()
  return `translate(${o.left - f.left}px, ${o.top - f.top}px) scale(${o.width / f.width}, ${o.height / f.height})`
}

// Al abrir, el panel crece desde el bloque que se tocó (en el teléfono sube
// como un cajón) y el contenido entra cuando ya casi tiene su tamaño.
function animarApertura(panel, origen) {
  if (reducirMovimiento()) {
    waapi.animate(panel, { opacity: [0, 1], duration: 180, ease: 'linear', onComplete: limpiarAlTerminar('opacity') })
    return
  }
  const limpiarTransform = limpiarAlTerminar('transform')
  if (esMovil()) {
    waapi.animate(panel, { transform: ['translateY(100%)', 'translateY(0%)'], duration: 520, ease: EASE_CAJON, onComplete: limpiarTransform })
  } else if (origen?.isConnected) {
    waapi.animate(panel, {
      transform: [hastaOrigen(origen, panel), 'translate(0px, 0px) scale(1, 1)'],
      duration: 560,
      ease: EASE_CAJON,
      onComplete: limpiarTransform,
    })
  } else {
    waapi.animate(panel, {
      opacity: [0, 1],
      transform: ['scale(0.96)', 'scale(1)'],
      duration: 320,
      ease: EASE_OUT,
      onComplete: limpiarAlTerminar('opacity', 'transform'),
    })
  }
  waapi.animate(panel.querySelectorAll('[data-entra]'), {
    opacity: [0, 1],
    transform: ['translateY(10px)', 'translateY(0px)'],
    duration: 420,
    delay: stagger(50, { start: 240 }),
    ease: EASE_OUT,
    onComplete: limpiarAlTerminar('opacity', 'transform'),
  })
  waapi.animate(panel.querySelectorAll('.recorrido__parada'), {
    opacity: [0, 1],
    transform: ['translateY(6px)', 'translateY(0px)'],
    duration: 260,
    delay: stagger(70, { start: 420 }),
    ease: EASE_OUT,
    onComplete: limpiarAlTerminar('opacity', 'transform'),
  })
  waapi.animate(panel.querySelectorAll('.recorrido__tramo'), {
    transform: ['scaleY(0)', 'scaleY(1)'],
    duration: 180,
    delay: stagger(70, { start: 490 }),
    ease: EASE_IN_OUT,
    onComplete: limpiarAlTerminar('transform'),
  })
}

// Al cerrar, el mismo camino al revés y más rápido.
function animarCierre(panel, origen) {
  return new Promise((listo) => {
    if (reducirMovimiento()) {
      waapi.animate(panel, { opacity: [1, 0], duration: 140, ease: 'linear', onComplete: () => listo() })
      return
    }
    waapi.animate(panel.querySelectorAll('[data-entra]'), { opacity: [1, 0], duration: 120, ease: 'linear' })
    if (esMovil()) {
      waapi.animate(panel, { transform: ['translateY(0%)', 'translateY(100%)'], duration: 280, ease: EASE_OUT, onComplete: () => listo() })
    } else if (origen?.isConnected) {
      waapi.animate(panel, {
        transform: ['translate(0px, 0px) scale(1, 1)', hastaOrigen(origen, panel)],
        duration: 320,
        ease: EASE_OUT,
        onComplete: () => listo(),
      })
    } else {
      waapi.animate(panel, {
        opacity: [1, 0],
        transform: ['scale(1)', 'scale(0.97)'],
        duration: 200,
        ease: EASE_OUT,
        onComplete: () => listo(),
      })
    }
  })
}

function MiParte({ proyecto }) {
  const { miParte, equipo } = proyecto
  if (Array.isArray(miParte)) {
    return (
      <ul className="dialogo__lista">
        {miParte.map((punto) => (
          <li key={punto}>{punto}</li>
        ))}
      </ul>
    )
  }
  return <p className="dialogo__parrafo">{miParte ?? `Proyecto de curso hecho entre ${equipo} personas.`}</p>
}

export default function DialogoProyecto({ abierto, onCerrar }) {
  const dialogo = useRef(null)
  const panel = useRef(null)
  const cerrando = useRef(false)
  const proyecto = abierto?.proyecto

  useLayoutEffect(() => {
    const d = dialogo.current
    if (!abierto || !panel.current) return undefined
    if (!d.open) d.showModal()
    panel.current.querySelector('.dialogo__cerrar').focus({ preventScroll: true })
    d.classList.remove('cerrando')
    document.documentElement.classList.add('sin-scroll')
    panel.current.scrollTop = 0
    animarApertura(panel.current, abierto.origen)
    return () => document.documentElement.classList.remove('sin-scroll')
  }, [abierto])

  const cerrar = useCallback(async () => {
    const d = dialogo.current
    if (!abierto || cerrando.current || !d.open) return
    cerrando.current = true
    d.classList.add('cerrando')
    await animarCierre(panel.current, abierto.origen)
    d.close()
    cerrando.current = false
    const foco =
      abierto.origen?.querySelector?.('button') ??
      abierto.origen ??
      document.querySelector(`[data-proyecto="${abierto.proyecto.id}"] button`)
    onCerrar()
    foco?.focus?.({ preventScroll: true })
  }, [abierto, onCerrar])

  // Escape: se anima el cierre en vez de cerrar de golpe. Si el navegador
  // cierra el diálogo por su cuenta, el estado se pone al día.
  useEffect(() => {
    const d = dialogo.current
    const alCancelar = (e) => {
      e.preventDefault()
      cerrar()
    }
    const alCerrar = () => {
      if (!cerrando.current && abierto) onCerrar()
    }
    d.addEventListener('cancel', alCancelar)
    d.addEventListener('close', alCerrar)
    return () => {
      d.removeEventListener('cancel', alCancelar)
      d.removeEventListener('close', alCerrar)
    }
  }, [cerrar, abierto, onCerrar])

  const { vivo, codigo } = proyecto ? enlacesDe(proyecto) : {}

  return (
    <dialog
      ref={dialogo}
      className="dialogo"
      aria-labelledby="dialogo-titulo"
      onClick={(e) => {
        if (e.target === e.currentTarget) cerrar()
      }}
    >
      {proyecto && (
        <div className="dialogo__panel" ref={panel}>
          <button type="button" className="dialogo__cerrar" onClick={cerrar} aria-label="Cerrar">
            <IconoCerrar />
          </button>
          <header className="dialogo__cabeza" data-entra>
            <Estado proyecto={proyecto} />
            <h2 id="dialogo-titulo" className="dialogo__titulo">
              {proyecto.nombre}
            </h2>
            <p className="dialogo__variante">{proyecto.variante}</p>
          </header>

          {proyecto.imagen && (
            <figure className="dialogo__imagen" data-entra>
              <img
                src={rutaCaptura(proyecto.imagen.nombre, 1200)}
                srcSet={`${rutaCaptura(proyecto.imagen.nombre, 640)} 640w, ${rutaCaptura(proyecto.imagen.nombre, 1200)} 1200w`}
                sizes="(min-width: 64rem) 56rem, 100vw"
                width="1200"
                height="758"
                alt={proyecto.imagen.alt}
              />
            </figure>
          )}

          <div className="dialogo__cuerpo">
            <div className="dialogo__texto" data-entra>
              <p className="dialogo__resumen">{proyecto.resumen}</p>
              {proyecto.destacados.length > 0 && (
                <ul className="dialogo__lista">
                  {proyecto.destacados.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}

              <h3 className="dialogo__subtitulo">Mi parte</h3>
              <MiParte proyecto={proyecto} />

              <dl className="ficha">
                <dt>Período</dt>
                <dd>{periodo(proyecto.inicio, proyecto.fin)}</dd>
                <dt>Equipo</dt>
                <dd>{proyecto.equipo ? `${proyecto.equipo} personas` : 'Individual'}</dd>
                <dt>Estado</dt>
                <dd>{estadoDe(proyecto).texto}</dd>
                <dt>Líneas</dt>
                <dd>{proyecto.lineas.map((l) => LINEAS[l].nombre).join(', ')}</dd>
                <dt>Código</dt>
                <dd>{CODIGO[proyecto.codigo]}</dd>
                <dt>Stack</dt>
                <dd>{proyecto.stack.join(', ')}</dd>
              </dl>

              {(vivo || codigo) && (
                <div className="dialogo__enlaces">
                  {vivo && (
                    <a className="boton boton--primario" href={vivo.url} target="_blank" rel="noreferrer">
                      {textoEnlaceVivo(vivo)}
                      <IconoExterno />
                      <span className="sr-only"> de {proyecto.nombre} (se abre en otra pestaña)</span>
                    </a>
                  )}
                  {codigo && (
                    <a
                      className={vivo ? 'boton boton--secundario' : 'boton boton--primario'}
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
            <div data-entra>
              <Recorrido paradas={proyecto.recorrido} />
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
