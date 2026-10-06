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

// Cuántos proyectos tuvieron commits en cada mes: Map(mes entero -> cantidad).
export function mesesConActividad(proyectos) {
  const meses = new Map()
  for (const p of proyectos) {
    for (let mes = aMes(p.inicio); mes <= aMes(p.fin); mes++) meses.set(mes, (meses.get(mes) ?? 0) + 1)
  }
  return meses
}

// "sep 2026"
export function etiquetaMes(mes) {
  return `${nombreMes(mes)} ${anioDe(mes)}`
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
