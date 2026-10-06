// Los meses se manejan como enteros (año * 12 + mes) para poder ubicarlos en el eje.

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export function aMes(iso) {
  const [anio, mes] = iso.split('-').map(Number)
  return anio * 12 + (mes - 1)
}

export function mesActual(fecha = new Date()) {
  return fecha.getFullYear() * 12 + fecha.getMonth()
}

function nombreMes(mes) {
  return MESES[mes % 12]
}

function anioDe(mes) {
  return Math.floor(mes / 12)
}

// "jun 2023", "sep – oct 2026", "dic 2025 – ago 2026"
export function periodo(inicio, fin) {
  const a = aMes(inicio)
  const b = aMes(fin)
  if (a === b) return `${nombreMes(a)} ${anioDe(a)}`
  if (anioDe(a) === anioDe(b)) return `${nombreMes(a)} – ${nombreMes(b)} ${anioDe(b)}`
  return `${nombreMes(a)} ${anioDe(a)} – ${nombreMes(b)} ${anioDe(b)}`
}

// El eje va de enero del primer año a diciembre del último, y siempre incluye hoy.
// Cada año ocupa un ancho que crece con sus meses de actividad: así el año con
// más proyectos se puede leer sin que los años tranquilos se coman el espacio.
// Dentro de un año, el tiempo es lineal.
export function crearEje(proyectos, hoy) {
  const primero = Math.min(...proyectos.map((p) => aMes(p.inicio)))
  const ultimo = Math.max(hoy, ...proyectos.map((p) => aMes(p.fin)))
  const anios = []
  for (let anio = anioDe(primero); anio <= anioDe(ultimo); anio++) anios.push(anio)

  const activos = new Set()
  for (const p of proyectos) {
    for (let mes = aMes(p.inicio); mes <= aMes(p.fin); mes++) activos.add(mes)
  }
  const pesos = anios.map((anio) => {
    let meses = 0
    for (let i = 0; i < 12; i++) if (activos.has(anio * 12 + i)) meses++
    return 0.5 + meses / 2
  })
  const total = pesos.reduce((a, b) => a + b, 0)
  const inicios = pesos.map((_, i) => pesos.slice(0, i).reduce((a, b) => a + b, 0))

  // Posición en porcentaje; acepta meses fraccionarios.
  const x = (mes) => {
    const i = anioDe(mes) - anios[0]
    if (i < 0) return 0
    if (i >= anios.length) return 100
    const dentroDelAnio = (mes - anioDe(mes) * 12) / 12
    return ((inicios[i] + pesos[i] * dentroDelAnio) / total) * 100
  }

  return {
    anios,
    hoy,
    // Borde izquierdo de un mes.
    x,
    // Centro de un mes.
    centro: (mes) => x(mes + 0.5),
  }
}

// Milisegundos que hay que sumarle a la hora UTC para obtener la hora en `zona`.
export function desfaseZona(zona, fecha = new Date()) {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: zona,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .formatToParts(fecha)
      .map((p) => [p.type, p.value]),
  )
  const comoUtc = Date.UTC(
    Number(partes.year),
    Number(partes.month) - 1,
    Number(partes.day),
    Number(partes.hour),
    Number(partes.minute),
    Number(partes.second),
  )
  return comoUtc - Math.floor(fecha.getTime() / 1000) * 1000
}

// "UTC−6" con el signo menos tipográfico.
export function etiquetaUtc(desfase) {
  const horas = desfase / 3_600_000
  if (horas === 0) return 'UTC'
  const signo = horas < 0 ? '−' : '+'
  return `UTC${signo}${Math.abs(horas)}`
}

export function fechaLarga(iso) {
  const [anio, mes, dia] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('es-HN', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(anio, mes - 1, dia),
  )
}
