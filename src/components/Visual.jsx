import { rutaCaptura } from '../lib/proyecto.js'
import Codigo from './Codigo.jsx'

// Lo que muestra cada bloque: la captura del sitio en vivo, un fragmento de
// código o, si no hay ninguno de los dos, el flujo de cómo funciona.
export default function Visual({ proyecto }) {
  if (proyecto.imagen) {
    const { nombre, alt, alto } = proyecto.imagen
    return (
      <div className="visual-imagen">
        <img
          src={rutaCaptura(nombre, 1200)}
          srcSet={`${rutaCaptura(nombre, 640)} 640w, ${rutaCaptura(nombre, 1200)} 1200w`}
          sizes="(min-width: 68rem) 40rem, 100vw"
          width="1200"
          height={alto}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  if (proyecto.muestra) return <Codigo {...proyecto.muestra} />

  return (
    <ol className="flujo" aria-label="Cómo funciona">
      {proyecto.recorrido.map((parada) => (
        <li key={parada.parada} className="flujo__parada">
          <span className="flujo__punto" aria-hidden="true" />
          {parada.parada}
        </li>
      ))}
    </ol>
  )
}
