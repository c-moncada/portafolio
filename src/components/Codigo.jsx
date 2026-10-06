import { useMemo } from 'react'

// Resaltado mínimo para los fragmentos de los bloques: no hace falta una
// librería para dos lenguajes y una docena de líneas.
const REGLAS = {
  json: [
    [/"(?:[^"\\]|\\.)*"(?=\s*:)/y, 'clave'],
    [/"(?:[^"\\]|\\.)*"/y, 'cadena'],
    [/(?<![\w.])-?\d+(?:\.\d+)?/y, 'numero'],
    [/\b(?:true|false|null)\b/y, 'palabra'],
  ],
  rust: [
    [/\/\/.*/y, 'comentario'],
    [/"(?:[^"\\]|\\.)*"/y, 'cadena'],
    [/\b(?:fn|let|mut|while|return|if|else|for|in)\b/y, 'palabra'],
    [/\b(?:i32|i64|f64|bool|str|String)\b/y, 'tipo'],
    [/(?<![\w.])\d+(?:\.\d+)?/y, 'numero'],
  ],
}

function resaltar(codigo, lenguaje) {
  const reglas = REGLAS[lenguaje] ?? []
  const piezas = []
  let texto = ''
  let i = 0
  while (i < codigo.length) {
    let encontrada = null
    for (const [patron, clase] of reglas) {
      patron.lastIndex = i
      const m = patron.exec(codigo)
      if (m && m[0].length) {
        encontrada = [m[0], clase]
        break
      }
    }
    if (encontrada) {
      if (texto) piezas.push(texto)
      texto = ''
      piezas.push(
        <span key={i} className={`tok-${encontrada[1]}`}>
          {encontrada[0]}
        </span>,
      )
      i += encontrada[0].length
    } else {
      texto += codigo[i]
      i++
    }
  }
  if (texto) piezas.push(texto)
  return piezas
}

export default function Codigo({ lenguaje, etiqueta, codigo }) {
  const piezas = useMemo(() => resaltar(codigo, lenguaje), [codigo, lenguaje])
  return (
    <figure className="codigo">
      <figcaption className="codigo__etiqueta">{etiqueta}</figcaption>
      <pre className="codigo__pre">
        <code>{piezas}</code>
      </pre>
    </figure>
  )
}
