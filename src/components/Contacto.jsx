export default function Contacto({ perfil, variante }) {
  const { correo, telefono, github } = perfil
  return (
    <ul className={variante ? `contacto contacto--${variante}` : 'contacto'}>
      <li>
        <span className="contacto__etiqueta">Correo</span>
        <a className="contacto__valor" href={`mailto:${correo}`}>
          {correo}
        </a>
      </li>
      {telefono ? (
        <li>
          <span className="contacto__etiqueta">Teléfono</span>
          <a className="contacto__valor" href={`tel:${telefono.enlace}`}>
            {telefono.visible}
          </a>
        </li>
      ) : (
        import.meta.env.DEV && (
          <li>
            <span className="contacto__etiqueta">Teléfono</span>
            <span className="contacto__pendiente">[falta el número en src/data/perfil.js]</span>
          </li>
        )
      )}
      <li>
        <span className="contacto__etiqueta">GitHub</span>
        <a className="contacto__valor" href={github.url}>
          github.com/{github.usuario}
        </a>
      </li>
    </ul>
  )
}
