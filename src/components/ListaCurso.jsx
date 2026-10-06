import { aMes } from '../lib/tiempo.js'

// Los proyectos de curso sin captura ni código para mostrar, en una lista
// compacta. Cada uno abre su detalle igual que un bloque.
export default function ListaCurso({ proyectos, onAbrir }) {
  const anios = proyectos.map((p) => Math.floor(aMes(p.inicio) / 12))
  return (
    <article className="bloque lista-curso" data-revelar>
      <h3 className="tarjeta__titulo">Proyectos de curso</h3>
      <p className="tarjeta__variante">
        {proyectos.length} proyectos de clase, {Math.min(...anios)} a {Math.max(...anios)}
      </p>
      <ul className="lista-curso__lista">
        {proyectos.map((p) => (
          <li key={p.id} data-proyecto={p.id}>
            <button type="button" className="lista-curso__item" onClick={(e) => onAbrir(p, e.currentTarget)}>
              <span>{p.nombre}</span>
              <span className="lista-curso__stack">{p.stack[0]}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
