import Actividad from './Actividad.jsx'
import Contacto from './Contacto.jsx'
import ListaCurso from './ListaCurso.jsx'
import Presentacion from './Presentacion.jsx'
import Reloj from './Reloj.jsx'
import Stack from './Stack.jsx'
import Tarjeta from './Tarjeta.jsx'

// Orden y tamaño de los proyectos en el tablero de cuatro columnas. Con este
// orden la cuadrícula queda llena: grande 2×2, ancho 2×1, el resto 1×1, y la
// lista de proyectos de curso cierra la última fila.
const BLOQUES = [
  ['farmacia-san-karlos-sitio', 'grande'],
  ['sistema-kwr', 'ancho'],
  ['alpr-api'],
  ['placas'],
  ['inteligencia-comercial', 'ancho'],
  ['agente-de-pedidos', 'ancho'],
  ['compilador-rust'],
  ['portapapeles-claude'],
  ['farmacia-san-karlos-recargas'],
]

export default function Tablero({ perfil, proyectos, onAbrir }) {
  const porId = new Map(proyectos.map((p) => [p.id, p]))
  const enBloques = new Set(BLOQUES.map(([id]) => id))
  const deCurso = proyectos.filter((p) => !enBloques.has(p.id))
  const ciudad = perfil.ciudad.split(',')[0]

  return (
    <div className="marco">
      <section className="bento bento--perfil" aria-label="Presentación">
        <Presentacion perfil={perfil} />
        <Reloj zona={perfil.zona} ciudad={ciudad} />
        <Contacto perfil={perfil} />
        <Stack proyectos={proyectos} />
        <Actividad proyectos={proyectos} />
      </section>

      <section id="proyectos" className="proyectos" aria-labelledby="proyectos-titulo">
        <div className="proyectos__encabezado">
          <h2 id="proyectos-titulo" className="proyectos__titulo">
            Proyectos
          </h2>
          <p className="proyectos__nota">
            {proyectos.length} proyectos. Abre cualquiera para ver qué resuelve, cómo funciona y qué parte hice yo.
          </p>
        </div>
        <div className="bento">
          {BLOQUES.map(([id, tamano]) => (
            <Tarjeta key={id} proyecto={porId.get(id)} tamano={tamano} onAbrir={onAbrir} />
          ))}
          <ListaCurso proyectos={deCurso} onAbrir={onAbrir} />
        </div>
      </section>
    </div>
  )
}
