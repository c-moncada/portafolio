# Brief: portafolio (página única), rediseño

Modo: Persuade (el reclutador decide si sigue con Carlos). Audiencia:
reclutadores y líderes técnicos, escritorio y teléfono, 30 a 90 segundos.
Acción: abrir un proyecto, su sitio o demo, o escribirle.

Historia: el 2026-10-05 el dueño rechazó la primera dirección (horario de trenes
suizo: banda roja, tabla con eje de tiempo) por poco profesional y pidió más
animación. Ese look queda como antirreferencia; se conservan el contenido
verificado, los roles y los enlaces.

## Contrato de dirección

**THESIS.** Un tablero bento con el trabajo real: cada bloque muestra un
proyecto funcionando (captura del sitio en vivo, flujo de datos o código), con
un tamaño según su peso. El reclutador recorre todo de un vistazo y abre
cualquier bloque para ver el caso completo. Rechaza la cuadrícula pareja de
icono, título y texto, y el horario descartado.

**OWN-WORLD.** Superficie neutra y profesional, clara u oscura según el sistema.
Claro: campo #f4f5f7, bloques blancos, filetes #e4e7ec, tinta #0e1116. Oscuro:
campo #0a0b0d, bloques #121418, filetes #23272e, tinta #eceef2. Un solo acento
azul (#2f6bff claro, #84a9ff oscuro) para enlaces, foco y la acción principal, y
un verde de estado solo para "en producción / en vivo". Mona Sans variable para
todo el texto; JetBrains Mono solo dentro de los bloques de código. Bloques con
radio de 18px y filete de 1px, sin sombras.

**STORY.** Primera pantalla: quién es (nombre, rol, hora de Tegucigalpa), qué
hace (una línea) y cómo escribirle; después, el tablero de proyectos. Cada
bloque se abre en un caso: qué resuelve, qué parte hizo, cómo funciona, stack y
enlaces.

**FIRST VIEWPORT.** Escritorio a cuatro columnas: bloque de presentación de 2×2
(el nombre se arma palabra por palabra sobre un campo de puntos que ondula muy
suave, rol, una línea, botones "Ver proyectos" y "Escríbeme"), reloj, contacto,
stack y actividad (mapa de calor con los meses reales con commits). Los
proyectos empiezan justo debajo.

**FORM.** Bento grid: lo eligió el dueño entre tres registros convencionales
(portafolio tech, casos de estudio, bento) después de rechazar el horario. Es el
canon de la categoría hecho con oficio; la vara son las páginas bento de Apple,
Linear y Vercel. Animaciones pedidas: hero animado, aparición al hacer scroll,
hover en proyectos y transición al abrir.

**FINISH.** unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md

## Abiertos
- Teléfono de contacto: el usuario lo pidió, falta el número.
- La app Placas en vivo muestra datos personales (placa, carro, un número); no
  se usa su captura. Avisar al dueño.
