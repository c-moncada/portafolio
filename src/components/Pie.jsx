import { fechaLarga } from '../lib/tiempo.js'
import Contacto from './Contacto.jsx'

export default function Pie({ perfil }) {
  return (
    <footer className="pie">
      <div className="marco pie__marco">
        <div>
          <h2 className="pie__titulo">Fin del recorrido</h2>
          <p className="pie__texto">¿Te interesa alguno de estos proyectos? Escríbeme y te cuento cómo está hecho.</p>
        </div>
        <Contacto perfil={perfil} variante="senal" />
      </div>
      <div className="marco pie__nota">
        <p>
          Horario actualizado el {fechaLarga(perfil.actualizado)}. Hecho con Vite, React y Anime.js.{' '}
          <a href="https://github.com/c-moncada/portafolio">Código de este portafolio</a>
        </p>
      </div>
    </footer>
  )
}
