---
title: "El sitio ahora gira alrededor de mis apps"
description: "Inicio centrado en las apps, sección Apps con historial de versiones y RSS por app, e imágenes listas para Instagram en cada actualización."
date: 2026-10-19T18:00:00-04:00
tags: [Astro, Devlog, Instagram]
app: portafolio-devlog
version: v0.2
example: false
---
Este sitio existe para mostrar las apps que construyo y contar cómo las voy mejorando. En esta versión lo reorganicé alrededor de esa idea.

## Qué cambió

- **Inicio centrado en las apps**: arriba está la app en la que estoy trabajando, luego el catálogo de apps y las últimas actualizaciones.
- **"Proyectos" ahora se llama "Apps"**. Los enlaces viejos a `/projects/` redirigen solos a `/apps/`.
- **Cada app tiene su página** con botones de Google Play / App Store (cuando estén publicadas), acceso a la beta, galería de capturas, "Novedades" y un **historial de actualizaciones** con su propio RSS.
- **Cada actualización del devlog puede enlazarse a una app** y a una versión, como esta (v0.2).
- **Kit para Instagram**: al publicar el sitio se genera automáticamente una imagen cuadrada de 1080×1080 para cada actualización, además de la imagen para enlaces (1200×630), y un texto listo para copiar con el enlace y los hashtags.
- La página **Sobre mí** se rehízo con lo que hago y cómo trabajo.

## El flujo a partir de ahora

1. Mejoro una app.
2. Publico la actualización aquí.
3. Descargo la imagen, copio el texto y lo comparto en Instagram.

Todo sigue costando $0: el sitio se genera con Astro en GitHub Actions y se aloja en GitHub Pages.
