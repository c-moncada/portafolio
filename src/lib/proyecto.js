// Datos derivados de un proyecto que comparten el tablero y el detalle.

export function enlacesDe(proyecto) {
  const vivo = proyecto.enlaces.find((e) => e.tipo === 'sitio' || e.tipo === 'demo')
  const codigo = proyecto.enlaces.find((e) => e.tipo === 'codigo')
  return { vivo, codigo }
}

export function estadoDe(proyecto) {
  const { vivo } = enlacesDe(proyecto)
  if (vivo?.tipo === 'demo') return { texto: 'Demo en vivo', activo: true }
  if (proyecto.enServicio) return { texto: 'En producción', activo: true }
  if (proyecto.origen === 'curso') return { texto: 'Proyecto de curso', activo: false }
  if (proyecto.codigo === 'publico') return { texto: 'Código abierto', activo: false }
  return { texto: 'Proyecto propio', activo: false }
}

export const textoEnlaceVivo = (enlace) => (enlace.tipo === 'sitio' ? 'Abrir el sitio' : 'Abrir el demo')

export const rutaCaptura = (nombre, ancho) => `/capturas/${nombre}-${ancho}.webp`
