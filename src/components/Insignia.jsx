import { LINEAS } from '../data/lineas.js'

// Insignia de línea, como las de tipo de tren: sólida para proyectos propios o
// de un negocio, con contorno para proyectos de curso.
export default function Insignia({ linea, curso = false }) {
  const { codigo, nombre } = LINEAS[linea]
  return (
    <span className={curso ? 'insignia insignia--curso' : 'insignia'} title={nombre}>
      <span aria-hidden="true">{codigo}</span>
      <span className="sr-only">{nombre}</span>
    </span>
  )
}
