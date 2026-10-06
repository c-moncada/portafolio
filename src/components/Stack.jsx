import { useMemo } from 'react'

// Las tecnologías que más se repiten en los proyectos, de la más usada a la menos.
export default function Stack({ proyectos }) {
  const principales = useMemo(() => {
    const conteo = new Map()
    for (const p of proyectos) for (const t of p.stack) conteo.set(t, (conteo.get(t) ?? 0) + 1)
    return [...conteo]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'es'))
      .slice(0, 14)
      .map(([t]) => t)
  }, [proyectos])

  return (
    <article className="bloque bloque--stack" data-revelar>
      <h2 className="bloque__titulo">Stack</h2>
      <p className="bloque__nota">Lo que más uso en estos proyectos</p>
      <ul className="chips">
        {principales.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>
    </article>
  )
}
