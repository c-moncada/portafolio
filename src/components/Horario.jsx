import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createScope } from 'animejs/scope'
import { stagger } from 'animejs/utils'
import { waapi } from 'animejs/waapi'
import { LINEAS } from '../data/lineas.js'
import { CONSULTAS, EASE_OUT } from '../lib/movimiento.js'
import { aMes, crearEje, mesActual, periodo } from '../lib/tiempo.js'
import Fila from './Fila.jsx'
import Leyenda from './Leyenda.jsx'

const animar = (el, params) => el && waapi.animate(el, { ease: EASE_OUT, ...params })
const aparecer = { opacity: [0, 1], transform: ['scale(0.6)', 'scale(1)'] }

// Al cargar, cada fila traza su recorrido de izquierda a derecha, como un tren
// que sale de su primera estación. Es el único momento coreografiado de la página.
function trazarRecorridos(tabla) {
  tabla.querySelectorAll('.fila').forEach((fila, i) => {
    const t = 120 + i * 30
    const fin = fila.querySelector('.trazo__parada--fin')
    animar(fila.querySelector('.trazo__parada--inicio'), { ...aparecer, duration: 220, delay: t })
    animar(fila.querySelector('.trazo__via'), {
      transform: ['scaleX(0)', 'scaleX(1)'],
      duration: 560,
      delay: t + 60,
    })
    animar(fin, { ...aparecer, duration: 220, delay: t + 420 })
    const salida = fin ? t + 520 : t + 160
    animar(fila.querySelector('.trazo__enlinea'), {
      transform: ['scaleX(0)', 'scaleX(1)'],
      duration: 420,
      delay: salida,
    })
    animar(fila.querySelector('.trazo__parada--servicio'), { ...aparecer, duration: 240, delay: salida + 340 })
  })
}

export default function Horario({ proyectos }) {
  const tabla = useRef(null)
  const filtroAnterior = useRef('todas')
  const [filtro, setFiltro] = useState('todas')
  const [abiertos, setAbiertos] = useState(() => new Set())

  const ordenados = useMemo(() => [...proyectos].sort((a, b) => aMes(b.fin) - aMes(a.fin)), [proyectos])
  const eje = useMemo(() => crearEje(proyectos, mesActual()), [proyectos])
  const conteos = useMemo(
    () =>
      Object.fromEntries(Object.keys(LINEAS).map((id) => [id, proyectos.filter((p) => p.lineas.includes(id)).length])),
    [proyectos],
  )
  const primero = ordenados[ordenados.length - 1]
  const enServicio = proyectos.filter((p) => p.enServicio).length
  const visibles = filtro === 'todas' ? ordenados : ordenados.filter((p) => p.lineas.includes(filtro))

  // Un enlace con #id abre ese proyecto.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!proyectos.some((p) => p.id === id)) return
    setAbiertos(new Set([id]))
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
  }, [proyectos])

  useLayoutEffect(() => {
    const scope = createScope({ root: tabla, mediaQueries: CONSULTAS }).add((self) => {
      if (!self.matches.reducir) trazarRecorridos(tabla.current)
    })
    return () => scope.revert()
  }, [])

  // Al filtrar, las filas que quedan entran con un fundido corto.
  useLayoutEffect(() => {
    if (filtroAnterior.current === filtro) return
    filtroAnterior.current = filtro
    if (window.matchMedia(CONSULTAS.reducir).matches) return
    const animacion = waapi.animate(tabla.current.querySelectorAll('.fila'), {
      opacity: [0, 1],
      transform: ['translateY(4px)', 'translateY(0)'],
      duration: 200,
      delay: stagger(18),
      ease: EASE_OUT,
    })
    return () => animacion.cancel()
  }, [filtro])

  function alternar(id) {
    const estabaAbierto = abiertos.has(id)
    setAbiertos((previos) => {
      const siguientes = new Set(previos)
      if (estabaAbierto) siguientes.delete(id)
      else siguientes.add(id)
      return siguientes
    })
    const { pathname, search, hash } = window.location
    if (!estabaAbierto) window.history.replaceState(null, '', `#${id}`)
    else if (hash === `#${id}`) window.history.replaceState(null, '', pathname + search)
  }

  const mensaje =
    filtro === 'todas'
      ? `Mostrando los ${proyectos.length} proyectos`
      : `Mostrando ${visibles.length} de ${proyectos.length} proyectos: ${LINEAS[filtro].nombre}`

  return (
    <section className="horario" id="horario" aria-labelledby="horario-titulo" tabIndex={-1}>
      <div className="marco">
        <div className="horario__encabezado">
          <div>
            <h2 id="horario-titulo" className="horario__titulo">
              Proyectos
            </h2>
            <p className="horario__nota">
              Del más reciente al primero. Abre uno para ver cómo funciona y qué parte hice yo.
            </p>
          </div>
          <p className="horario__resumen">
            {proyectos.length} proyectos · {enServicio} en servicio · desde {periodo(primero.inicio, primero.inicio)}
          </p>
        </div>
        <Leyenda filtro={filtro} onFiltrar={setFiltro} conteos={conteos} total={proyectos.length} />
      </div>

      <div className="marco">
        <div className="tabla" ref={tabla}>
          <div className="tabla__cabecera" aria-hidden="true">
            <span className="tabla__columna">Líneas</span>
            <span className="tabla__columna">Proyecto</span>
            <span className="eje">
              {eje.anios.map((anio) => (
                <span key={anio} className="eje__anio" style={{ left: `${eje.x(anio * 12)}%` }}>
                  {anio}
                </span>
              ))}
              <span className="eje__hoy" style={{ left: `${eje.centro(eje.hoy)}%` }}>
                hoy
              </span>
            </span>
            <span className="tabla__columna">Estado</span>
          </div>
          <ol className="tabla__filas">
            {visibles.map((proyecto) => (
              <Fila
                key={proyecto.id}
                proyecto={proyecto}
                eje={eje}
                abierto={abiertos.has(proyecto.id)}
                onAlternar={() => alternar(proyecto.id)}
              />
            ))}
          </ol>
        </div>
        <p className="sr-only" aria-live="polite">
          {mensaje}
        </p>
      </div>
    </section>
  )
}
