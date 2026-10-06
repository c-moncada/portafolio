import { useEffect, useRef } from 'react'
import { createTimer } from 'animejs/timer'
import { waapi } from 'animejs/waapi'
import { reducirMovimiento } from '../lib/movimiento.js'

const PASO = 18
const LADO = 1.6

// Campo de puntos que ondula muy despacio detrás de la presentación. Se pausa
// fuera de la pantalla (y Anime.js lo pausa en pestañas ocultas); con
// movimiento reducido queda quieto.
export default function CampoPuntos() {
  const lienzo = useRef(null)

  useEffect(() => {
    const canvas = lienzo.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined
    let ancho = 0
    let alto = 0
    let color = '#000'

    const pintar = (t) => {
      ctx.clearRect(0, 0, ancho, alto)
      ctx.fillStyle = color
      for (let y = PASO / 2; y < alto; y += PASO) {
        for (let x = PASO / 2; x < ancho; x += PASO) {
          const onda = Math.sin(x * 0.011 + y * 0.007 - t * 0.0005) + Math.sin(y * 0.013 - x * 0.004 - t * 0.0003)
          ctx.globalAlpha = 0.16 + Math.max(0, onda) * 0.42
          ctx.fillRect(x - LADO / 2, y - LADO / 2, LADO, LADO)
        }
      }
    }

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const caja = canvas.getBoundingClientRect()
      ancho = caja.width
      alto = caja.height
      canvas.width = Math.round(ancho * dpr)
      canvas.height = Math.round(alto * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      color = getComputedStyle(canvas).color
    }

    const quieto = reducirMovimiento()
    const reloj = quieto ? null : createTimer({ frameRate: 30, onUpdate: (self) => pintar(self.currentTime) })
    const repintar = () => pintar(reloj ? reloj.currentTime : 0)

    medir()
    repintar()
    if (!quieto) waapi.animate(canvas, { opacity: [0, 1], duration: 1600, ease: 'linear' })

    const tamano = new ResizeObserver(() => {
      medir()
      repintar()
    })
    tamano.observe(canvas)

    const visible = new IntersectionObserver(([entrada]) => {
      if (!reloj) return
      if (entrada.isIntersecting) reloj.resume()
      else reloj.pause()
    })
    visible.observe(canvas)

    const tema = window.matchMedia('(prefers-color-scheme: dark)')
    const alCambiarTema = () => {
      color = getComputedStyle(canvas).color
      repintar()
    }
    tema.addEventListener('change', alCambiarTema)

    return () => {
      reloj?.cancel()
      tamano.disconnect()
      visible.disconnect()
      tema.removeEventListener('change', alCambiarTema)
    }
  }, [])

  return <canvas ref={lienzo} className="campo-puntos" aria-hidden="true" />
}
