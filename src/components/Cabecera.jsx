import Reloj from './Reloj.jsx'

export default function Cabecera({ perfil }) {
  const ciudad = perfil.ciudad.split(',')[0]
  return (
    <header className="cabecera">
      <div className="marco cabecera__marco">
        <div>
          <h1 className="cabecera__nombre">{perfil.nombre}</h1>
          <p className="cabecera__oficio">
            {perfil.oficio} · {perfil.ciudad}
          </p>
        </div>
        <Reloj zona={perfil.zona} ciudad={ciudad} />
      </div>
    </header>
  )
}
