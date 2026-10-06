import { fechaLarga } from '../lib/tiempo.js'
import { IconoExterno } from './Iconos.jsx'

export default function Pie({ perfil }) {
  return (
    <footer className="marco pie">
      <section className="bloque cierre" data-revelar aria-labelledby="cierre-titulo">
        <h2 id="cierre-titulo" className="cierre__titulo">
          ¿Te interesa alguno de estos proyectos?
        </h2>
        <p className="cierre__texto">Escríbeme y te cuento cómo está hecho.</p>
        <div className="cierre__acciones">
          <a className="boton boton--primario" href={`mailto:${perfil.correo}`}>
            {perfil.correo}
          </a>
          <a className="boton boton--secundario" href={perfil.github.url} target="_blank" rel="noreferrer">
            GitHub
            <IconoExterno />
            <span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
        </div>
      </section>
      <p className="pie__nota">
        Actualizado el {fechaLarga(perfil.actualizado)} · Hecho con Vite, React y Anime.js ·{' '}
        <a href="https://github.com/c-moncada/portafolio">Código de este portafolio</a>
      </p>
    </footer>
  )
}
