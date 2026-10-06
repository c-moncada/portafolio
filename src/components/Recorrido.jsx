// Cómo funciona un proyecto, parada por parada, como el diagrama de paradas de
// un tren. Las terminales van rellenas.
export default function Recorrido({ paradas }) {
  const ultima = paradas.length - 1
  return (
    <div className="recorrido">
      <h4 className="detalle__subtitulo">Cómo funciona</h4>
      <ol className="recorrido__lista">
        {paradas.map((parada, i) => (
          <li
            key={parada.parada}
            className="recorrido__parada"
            data-terminal={i === 0 || i === ultima ? '' : undefined}
          >
            {i < ultima && <span className="recorrido__tramo" aria-hidden="true" />}
            <span className="recorrido__punto" aria-hidden="true" />
            <span className="recorrido__nombre">{parada.parada}</span>
            {parada.nota && <span className="recorrido__nota">{parada.nota}</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}
