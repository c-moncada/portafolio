import Cabecera from './components/Cabecera.jsx'
import Contacto from './components/Contacto.jsx'
import Horario from './components/Horario.jsx'
import Pie from './components/Pie.jsx'
import { PERFIL } from './data/perfil.js'
import { PROYECTOS } from './data/proyectos.js'

export default function App() {
  return (
    <>
      <a className="saltar" href="#horario">
        Saltar al horario de proyectos
      </a>
      <Cabecera perfil={PERFIL} />
      <main>
        <section className="presentacion marco" aria-label="Presentación">
          <p className="presentacion__lead">
            Hago software que se usa en negocios de verdad: el sitio y el catálogo de la farmacia de mi familia,
            el punto de venta de una droguería que construimos en equipo y una API que lee placas de vehículos en
            las fotos de una cámara.
          </p>
          <Contacto perfil={PERFIL} />
        </section>
        <Horario proyectos={PROYECTOS} />
      </main>
      <Pie perfil={PERFIL} />
    </>
  )
}
