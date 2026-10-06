# Product

Portafolio personal de Carlos Moncada: una sola página que lista sus proyectos
de software.

## Platform
web

## Stack
Vite + React, publicado en Vercel. Animación con Anime.js (pedido explícito del
dueño). Los proyectos viven en un solo archivo de datos (`src/data/proyectos.js`);
agregar un proyecto es agregar una entrada ahí.

## Users
Reclutadores y líderes técnicos que evalúan a Carlos para un empleo o una
pasantía. Normalmente están en un escritorio, con varias pestañas de candidatos
abiertas, y le dedican entre 30 y 90 segundos a cada portafolio antes de decidir
si abren un repositorio o un demo.

## Product Purpose
Que en pocos segundos quede claro qué construye Carlos (web, móvil, backend,
visión por computadora, sistemas), con qué stack y cuál fue su rol, y que cada
proyecto lleve directo a su demo en vivo o a su código cuando es público.

## Positioning
Casi todo lo que hay acá corre en un negocio real de Tegucigalpa: la farmacia de
su familia, el sistema de una droguería que se hizo en equipo, una API que lee
placas de las fotos de una cámara. No son ejercicios de tutorial.

## Operating Context
- Español. Los proyectos, sus READMEs y sus commits están en español.
- Lo ven en pantallas de escritorio con luz de oficina, y a veces en el teléfono
  cuando alguien manda el enlace por chat.

## Capabilities and Constraints
- Una sola página: índice de proyectos con detalle expandible por proyecto.
- Se excluyen a pedido del dueño: Koori, los proyectos de árbol B+
  (`ProyectoEstructura2`, `Proyectoestru2_solo`), y todo lo que sea laboratorio
  o examen de clase. `Cooking` (inserción en un árbol B, Java) también quedó
  fuera por cercanía con el pedido; volver a agregarlo es una entrada en
  `src/data/proyectos.js`.
- También se excluyen repos vacíos o de prueba (`Ayuda`, `raptor-q`,
  `Frontend-Stocktracker`, `backendprueba`, `aux`) y carpetas personales
  (`voluntariado`, `Examen redes`, `examen2`, `redes`, `analisis`).
- La mayoría de los repos son privados: no se enlaza un repo privado porque el
  visitante vería un 404. Se enlaza el demo en vivo cuando existe.

## Brand Commitments
- Nombre: Carlos Moncada. GitHub: `c-moncada`.
- Los proyectos en equipo dicen que son en equipo y cuál fue la parte de Carlos.

## Evidence on Hand
- Sitios en vivo (verificados con 200 el 2026-10-05):
  farmacia-san-karlos.vercel.app, inteligencia-comercial-flame.vercel.app,
  frontend-placas.vercel.app, frontend-ai-ruby.vercel.app.
- Historial de commits de cada repo en `C:\dev` y en GitHub.
- El sistema KWR está en producción en la droguería (confirmado por el dueño el
  2026-10-05).
- La app Placas en vivo muestra datos personales del dueño (placa, carro, un
  número); no se publica su captura.
- Sin testimonios, sin métricas de uso, sin clientes nombrados aparte de la
  farmacia. No inventar ninguno.

## Product Principles
1. Cada proyecto dice qué problema resuelve antes de decir con qué se hizo.
2. El rol de Carlos es explícito, sobre todo en los proyectos en equipo.
3. Nada de afirmaciones que el código no respalde.
4. El índice completo se recorre de un vistazo; el detalle se abre a pedido.

## Accessibility & Inclusion
WCAG 2.2 AA: contraste, teclado completo y `prefers-reduced-motion`.
