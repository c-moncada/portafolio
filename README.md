# portafolio

Mis proyectos de software en una sola página, leídos como un horario de trenes.
Vite + React, con Anime.js para el movimiento. Se publica en Vercel.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # compila a dist/
npm run preview   # sirve dist/ para revisarlo
```

## Agregar o cambiar un proyecto

Todo vive en [`src/data/proyectos.js`](src/data/proyectos.js): agrega un objeto
a la lista y la tabla, los filtros y el eje de tiempo se actualizan solos. El
comentario al inicio del archivo explica cada campo.

Los datos de contacto están en [`src/data/perfil.js`](src/data/perfil.js).

## Publicar en Vercel

Importa el repositorio en Vercel; `vercel.json` ya trae el comando de
compilación y la carpeta de salida. Cada `git push` a `main` publica.
