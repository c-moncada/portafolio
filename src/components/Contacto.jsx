import { useEffect, useRef, useState } from 'react'
import { IconoCheck, IconoCopiar, IconoExterno } from './Iconos.jsx'

export default function Contacto({ perfil }) {
  const { correo, telefono, github } = perfil
  const [copiado, setCopiado] = useState(false)
  const temporizador = useRef(0)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  async function copiar() {
    try {
      await navigator.clipboard.writeText(correo)
      setCopiado(true)
      clearTimeout(temporizador.current)
      temporizador.current = setTimeout(() => setCopiado(false), 1800)
    } catch {
      window.location.href = `mailto:${correo}`
    }
  }

  return (
    <article className="bloque bloque--contacto" data-revelar>
      <h2 className="bloque__titulo">Contacto</h2>
      <p className="bloque__nota">Respondo por correo</p>
      <ul className="contacto">
        <li className="contacto__fila">
          <a className="contacto__enlace" href={`mailto:${correo}`}>
            {correo}
          </a>
          <button type="button" className="contacto__copiar" onClick={copiar} aria-label="Copiar el correo">
            <span className="contacto__icono" data-visible={!copiado}>
              <IconoCopiar />
            </span>
            <span className="contacto__icono" data-visible={copiado}>
              <IconoCheck />
            </span>
          </button>
        </li>
        {telefono ? (
          <li className="contacto__fila">
            <a className="contacto__enlace" href={`tel:${telefono.enlace}`}>
              {telefono.visible}
            </a>
          </li>
        ) : (
          import.meta.env.DEV && (
            <li className="contacto__fila contacto__pendiente">[falta el teléfono en src/data/perfil.js]</li>
          )
        )}
        <li className="contacto__fila">
          <a className="contacto__enlace" href={github.url} target="_blank" rel="noreferrer">
            github.com/{github.usuario}
            <IconoExterno />
            <span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
        </li>
      </ul>
      <p className="sr-only" aria-live="polite">
        {copiado ? 'Correo copiado' : ''}
      </p>
    </article>
  )
}
