import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import DialogoProyecto from './components/DialogoProyecto.jsx'
import Pie from './components/Pie.jsx'
import Tablero from './components/Tablero.jsx'
import { PERFIL } from './data/perfil.js'
import { PROYECTOS } from './data/proyectos.js'
import { revelarAlEntrar } from './lib/revelar.js'

export default function App() {
  // { proyecto, origen }: origen es el elemento que se tocó, para que el
  // detalle crezca desde ahí.
  const [abierto, setAbierto] = useState(null)

  useLayoutEffect(() => revelarAlEntrar(document.querySelectorAll('[data-revelar]'), { retrasoInicial: 450 }), [])

  // Un enlace con #id abre ese proyecto, al cargar y cuando cambia el hash
  // sin recargar (un enlace pegado, el botón Atrás).
  useEffect(() => {
    const abrirDesdeHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const proyecto = PROYECTOS.find((p) => p.id === id)
      if (proyecto) setAbierto((actual) => (actual?.proyecto.id === id ? actual : { proyecto, origen: null }))
    }
    abrirDesdeHash()
    window.addEventListener('hashchange', abrirDesdeHash)
    return () => window.removeEventListener('hashchange', abrirDesdeHash)
  }, [])

  const abrir = useCallback((proyecto, origen) => {
    setAbierto({ proyecto, origen })
    window.history.replaceState(null, '', `#${proyecto.id}`)
  }, [])

  const cerrar = useCallback(() => {
    setAbierto(null)
    const { pathname, search, hash } = window.location
    if (hash) window.history.replaceState(null, '', pathname + search)
  }, [])

  return (
    <>
      <a className="saltar" href="#proyectos">
        Saltar a los proyectos
      </a>
      <main>
        <Tablero perfil={PERFIL} proyectos={PROYECTOS} onAbrir={abrir} />
      </main>
      <Pie perfil={PERFIL} />
      <DialogoProyecto abierto={abierto} onCerrar={cerrar} />
    </>
  )
}
