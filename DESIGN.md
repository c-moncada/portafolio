---
name: Tablero de proyectos
description: Portafolio de Carlos Moncada como tablero bento. Superficie neutra clara u oscura según el sistema, capturas reales de los proyectos y movimiento con Anime.js.
colors:
  campo: '#f4f5f7'
  bloque: '#ffffff'
  bloque-2: '#f6f7f9'
  filete: '#e4e7ec'
  filete-fuerte: '#ccd1d9'
  tinta: '#0e1116'
  tinta-2: '#454c58'
  tinta-3: '#5f6672'
  acento: '#2560f0'
  sobre-acento: '#ffffff'
  vivo: '#11875a'
  campo-oscuro: '#0a0b0d'
  bloque-oscuro: '#121418'
  bloque-2-oscuro: '#181b20'
  filete-oscuro: '#23272e'
  tinta-oscuro: '#eceef2'
  tinta-2-oscuro: '#b9bfca'
  tinta-3-oscuro: '#9199a6'
  acento-oscuro: '#84a9ff'
  vivo-oscuro: '#3dd68c'
typography:
  display:
    fontFamily: Mona Sans Variable
    fontSize: clamp(2.75rem, 1.5rem + 4vw, 5rem)
    fontWeight: 680
    lineHeight: 1.04
    letterSpacing: -0.035em
  headline:
    fontFamily: Mona Sans Variable
    fontSize: clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem)
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: -0.025em
  title:
    fontFamily: Mona Sans Variable
    fontSize: 1.25rem
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: -0.015em
  body:
    fontFamily: Mona Sans Variable
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Mona Sans Variable
    fontSize: 0.78125rem
    fontWeight: 550
    lineHeight: 1.3
  code:
    fontFamily: JetBrains Mono Variable
    fontSize: 0.6875rem
    fontWeight: 400
    lineHeight: 1.65
rounded:
  bloque: 18px
  panel: 22px
  captura: 12px
  pastilla: 999px
  boton: 999px
spacing:
  hueco: 14px
  relleno: 22px
  gutter: clamp(16px, 4vw, 40px)
components:
  boton-primario:
    backgroundColor: '{colors.acento}'
    textColor: '{colors.sobre-acento}'
    rounded: '{rounded.boton}'
    padding: 0 20px
    height: 44px
  boton-secundario:
    backgroundColor: '{colors.bloque}'
    textColor: '{colors.tinta}'
    rounded: '{rounded.boton}'
    padding: 0 20px
    height: 44px
  bloque:
    backgroundColor: '{colors.bloque}'
    rounded: '{rounded.bloque}'
    padding: 22px
  pastilla:
    backgroundColor: '{colors.bloque-2}'
    textColor: '{colors.tinta-2}'
    typography: '{typography.label}'
    rounded: '{rounded.pastilla}'
    padding: 3px 10px
---

## Overview

**"Todo el trabajo en un vistazo"**

La página es un tablero bento: cada bloque es un proyecto mostrándose a sí
mismo (la captura real de su sitio en vivo, un fragmento de código o el flujo de
cómo funciona) y su tamaño dice cuánto pesa. Un reclutador recorre todo en una
pantalla y abre cualquier bloque para ver el caso completo. La superficie es
neutra para que el color lo pongan las capturas.

Reemplaza a una primera dirección (horario de trenes suizo) que el dueño
rechazó por poco profesional.

**Key Characteristics**

- Tablero de cuatro columnas que pasa a dos y a una.
- Claro u oscuro según el sistema, con los mismos roles en los dos temas.
- Un solo acento y un solo verde, cada uno con un trabajo.
- Movimiento en cuatro momentos: presentación, aparición al hacer scroll, hover
  de los proyectos y la apertura del detalle.

## Colors

Estrategia **Restrained**: neutros más un acento.

- **Campo** (#f4f5f7 / #0a0b0d) y **bloque** (#ffffff / #121418): fondo de la
  página y de cada bloque. Sin crema.
- **Bloque 2** (#f6f7f9 / #181b20): código, pastillas, celdas vacías del mapa.
- **Filete** (#e4e7ec / #23272e) y **filete fuerte** (#ccd1d9 / #363b44): bordes
  de 1px y conectores de los flujos.
- **Tinta** (#0e1116 / #eceef2), **tinta 2** (#454c58 / #b9bfca) y **tinta 3**
  (#5f6672 / #9199a6): texto en tres niveles; tinta 3 da al menos 5.3:1.
- **Acento** (#2560f0 / #84a9ff): botón principal, foco, enlaces de la lista de
  curso al pasar el mouse. Se oscureció del #2f6bff del contrato porque el
  blanco encima solo daba 4.50:1; con #2560f0 da 5.24:1.
- **Vivo** (#11875a / #3dd68c): solo el punto de "En producción" y "Demo en vivo".

**The One Job Rule.** El azul es para lo que se toca y el verde para lo que está
en línea. El campo de puntos, el mapa de calor y el reloj son tinta.

## Typography

**Mona Sans Variable** (pesos 200–900, ancho 75–125%) para todo el texto;
**JetBrains Mono Variable** solo dentro de los bloques de código.

- **Display** (680, ancho 110%, hasta 5rem): el nombre.
- **Headline** (650, hasta 2.5rem): "Proyectos", el cierre y el título del detalle.
- **Title** (650, 1.25rem; 1.875rem en el bloque grande): títulos de proyecto.
- **Body** (400, 1rem a 1.0625rem, interlineado 1.5–1.6, máximo 62ch).
- **Label** (550, 0.78rem): pastillas y notas de bloque.
- **Code** (11px, interlineado 1.65).

Hora, años y conteos con `tabular-nums`.

## Layout

- Contenedor de hasta 76rem con margen lateral de clamp(16px, 4vw, 40px).
- Cuadrícula de 4 columnas con `grid-auto-flow: dense`, hueco de 14px y filas de
  al menos 15.5rem (13.5rem en la presentación). Tamaños: grande 2×2, ancho 2×1
  y normal 1×1. El orden está en `Tablero.jsx` para que la cuadrícula quede llena.
- Hasta 68rem son 2 columnas; hasta 40rem, 1 columna, y el detalle pasa a ser un
  cajón que sube desde abajo.
- Las capturas se ven a su escala real, ancladas arriba a la izquierda y
  asomando por la esquina inferior derecha del bloque. El bloque solo recorta la
  parte de abajo; nunca se amplían ni se cortan por los lados. El bloque grande
  usa una captura alta que llena el espacio que queda.

## Elevation & Depth

Plano: filetes de 1px y cambios de superficie (campo, bloque, bloque 2). Sin
sombras. El detalle se separa con un velo (#0e1116 al 42% / negro al 62%).

## Shapes

Bloques con radio de 18px, el panel del detalle con 22px, las capturas con 12px
en la esquina que asoma, y pastillas y botones redondos.

## Components

- **Presentación**: nombre, rol, una línea, "Ver proyectos" y "Escríbeme" sobre
  un campo de puntos en tinta 3 que ondula muy suave a la derecha.
- **Reloj**: analógico plano con la hora de Tegucigalpa y su UTC.
- **Contacto**: correo con botón para copiarlo (el icono cambia con un fundido
  con desenfoque), teléfono cuando exista y GitHub.
- **Stack**: las 14 tecnologías más repetidas en los proyectos.
- **Actividad**: mapa de calor de los meses con proyectos activos, en tinta.
- **Proyecto**: pastillas de estado y equipo, título (todo el bloque abre el
  detalle), variante, stack y el visual. El botón redondo lleva al sitio, al
  demo o al código.
- **Proyectos de curso**: lista compacta donde cada fila abre su detalle.
- **Detalle**: `<dialog>` con estado, título, captura, resumen, destacados, "Mi
  parte", ficha (período, áreas, código, stack), enlaces y "Cómo funciona"
  parada por parada.

**Movimiento** (skill de Emil Kowalski, con Anime.js):

- Curvas: `cubic-bezier(0.23, 1, 0.32, 1)` para entrar,
  `cubic-bezier(0.77, 0, 0.175, 1)` para lo que se mueve en pantalla y
  `cubic-bezier(0.32, 0.72, 0, 1)` para el cajón.
- Presentación: el nombre sube palabra por palabra (`splitText`, 1s con 110ms
  entre palabras) y el resto entra detrás.
- Scroll: cada bloque aparece una vez con fundido, 24px de subida y desenfoque
  (700ms, 70ms entre bloques), por WAAPI.
- Hover, solo con puntero fino: la captura sube 14px, el borde se oscurece y
  aparece el botón del enlace.
- Detalle: el panel crece desde el bloque que se tocó (560ms) y el contenido
  entra después; al cerrar hace el camino inverso en 320ms.
- Presionar: `scale(0.97)` en botones y `scale(0.99)` en bloques.
- Con `prefers-reduced-motion`: sin desplazamientos ni trazados; solo fundidos.

## Do's and Don'ts

- **Do** agregar proyectos en `src/data/proyectos.js` y su lugar en `Tablero.jsx`.
- **Do** guardar las capturas como WebP de 1200 y 640 de ancho en
  `public/capturas/`, con su `alto` en los datos.
- **Do** marcar como de ejemplo cualquier dato de demostración.
- **Don't** usar `object-fit: cover` en las capturas de los bloques: las amplía y
  corta los lados.
- **Don't** publicar capturas que muestren datos personales (la app Placas).
- **Don't** usar el azul para decorar ni agregar sombras o degradados.
- **Don't** animar ancho, alto, márgenes o padding.
