import { useLayoutEffect, useRef } from 'react'
import { createScope } from 'animejs/scope'
import { splitText } from 'animejs/text'
import { stagger } from 'animejs/utils'
import { waapi } from 'animejs/waapi'
import { CONSULTAS, EASE_OUT, limpiarAlTerminar } from '../lib/movimiento.js'
import CampoPuntos from './CampoPuntos.jsx'
import { IconoFlecha } from './Iconos.jsx'

export default function Presentacion({ perfil }) {
  const raiz = useRef(null)

  // El nombre se arma palabra por palabra y el resto entra detrás. Es el
  // momento coreografiado de la página.
  useLayoutEffect(() => {
    const scope = createScope({ root: raiz, mediaQueries: CONSULTAS }).add((self) => {
      if (self.matches.reducir) return undefined
      const nombre = splitText(raiz.current.querySelector('.presentacion__nombre'), {
        words: { wrap: 'clip' },
        accessible: true,
      })
      waapi.animate(nombre.words, {
        transform: ['translateY(110%)', 'translateY(0%)'],
        duration: 1000,
        delay: stagger(110, { start: 60 }),
        ease: EASE_OUT,
      })
      waapi.animate(raiz.current.querySelectorAll('[data-entrada]'), {
        opacity: [0, 1],
        transform: ['translateY(12px)', 'translateY(0px)'],
        filter: ['blur(4px)', 'blur(0px)'],
        duration: 800,
        delay: stagger(90, { start: 420 }),
        ease: EASE_OUT,
        onComplete: limpiarAlTerminar('opacity', 'transform', 'filter'),
      })
      return () => nombre.revert()
    })
    return () => scope.revert()
  }, [])

  return (
    <article className="bloque presentacion" ref={raiz}>
      <CampoPuntos />
      <div className="presentacion__contenido">
        <h1 className="presentacion__nombre">{perfil.nombre}</h1>
        <p className="presentacion__rol" data-entrada>
          {perfil.oficio} en {perfil.ciudad}
        </p>
        <p className="presentacion__lead" data-entrada>
          Construyo software que usan negocios reales: el sitio de la farmacia de mi familia, el punto de venta en
          producción de una droguería y una API que lee placas de vehículos.
        </p>
        <div className="presentacion__acciones" data-entrada>
          <a className="boton boton--primario" href="#proyectos">
            Ver proyectos
            <IconoFlecha />
          </a>
          <a className="boton boton--secundario" href={`mailto:${perfil.correo}`}>
            Escríbeme
          </a>
        </div>
      </div>
    </article>
  )
}
