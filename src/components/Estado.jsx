import { estadoDe } from '../lib/proyecto.js'

// Pastillas de estado: en producción o en vivo (con punto verde), de curso,
// código abierto, y el tamaño del equipo cuando lo hubo.
export default function Estado({ proyecto }) {
  const { texto, activo } = estadoDe(proyecto)
  return (
    <span className="pastillas">
      <span className={activo ? 'pastilla pastilla--activa' : 'pastilla'}>
        {activo && <span className="pastilla__punto" aria-hidden="true" />}
        {texto}
      </span>
      {proyecto.equipo && <span className="pastilla">Equipo de {proyecto.equipo}</span>}
    </span>
  )
}
