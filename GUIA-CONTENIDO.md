# Guía: cómo actualizar el contenido de tu sitio

Tu sitio se actualiza solo: **cada vez que guardas un cambio, GitHub lo publica automáticamente** en unos minutos. No necesitas instalar nada ni tocar código. Tienes dos formas de editar:

1. **Pages CMS** (recomendado): un editor visual con formularios.
2. **GitHub** (web o app móvil): editando directamente los archivos de texto (Markdown).

Ambas hacen lo mismo por debajo: guardan un *commit* en el repositorio → GitHub Actions construye el sitio → se publica.

---

## 1. Editar con Pages CMS (recomendado)

### Primera vez (solo una vez)

1. Entra a **https://app.pagescms.org**.
2. Pulsa **Sign in with GitHub** e inicia sesión con tu cuenta de GitHub.
3. GitHub te pedirá **instalar/autorizar la app «Pages CMS»**. Elige *Only select repositories* y marca el repositorio del sitio (por ejemplo `tu-usuario.github.io`). Acepta.
4. De vuelta en Pages CMS, elige tu repositorio y la rama **main**.

### Uso diario

En el menú de la izquierda verás dos grupos: **🇪🇸 Español** y **🇺🇸 English**. Dentro de cada uno:

| Sección | Qué es |
| --- | --- |
| 📱 Apps | Tus apps: ícono, capturas, plataformas, estado, enlaces a Google Play / App Store / beta |
| 📝 Devlog | Actualizaciones de tus apps (y artículos generales) |
| Roadmap | Funcionalidades futuras que la gente puede votar |
| Servicios | Lo que ofreces como freelance |
| Testimonios | Citas de clientes |
| Perfil / Sobre mí | Bio, cifras, «Qué hago», «Cómo trabajo», habilidades, idiomas, formación |

#### Editar algo que ya existe

1. Entra a la sección (por ejemplo **📱 Apps (ES)**).
2. Haz clic en el elemento que quieres cambiar.
3. Cambia los campos (título, resumen, estado, enlaces…). El campo grande del final es el texto largo (el caso de estudio o el artículo); tiene botones para negritas, listas, enlaces e imágenes.
4. Pulsa **Save** (Guardar). ¡Listo! Eso crea el commit y dispara la publicación.

#### Crear algo nuevo (app, actualización/artículo o ítem del roadmap)

1. Entra a la sección y pulsa **Add an entry** (Añadir).
2. Rellena los campos. Los obligatorios están marcados.
3. **Nombre de archivo**: al crear, Pages CMS te muestra el nombre del archivo (por ejemplo `mi-app.md`). Usa minúsculas y guiones, sin espacios ni tildes. 👉 **Usa el mismo nombre en Español y en English** para que el botón ES/EN enlace las dos versiones.
4. Pulsa **Save**.
5. Repite en la sección del otro idioma (por ejemplo **📱 Apps (EN)**) con el mismo nombre de archivo.

#### Campos útiles que debes conocer

- **Estado** (apps): *Live / En producción*, *En desarrollo* o *Idea*. Cambia el color de la etiqueta.
- **Mostrar en «En qué estoy trabajando»**: actívalo en la app en la que estás trabajando (sale destacada arriba en la portada). Rellena también **Progreso %**, **Tarea actual** y **Entrega estimada**; aparecen en la portada.
- **¿Es contenido de ejemplo?**: el sitio trae contenido de muestra con una etiqueta amarilla **EJEMPLO**. Cuando reemplaces algo con información real, **desactiva** esta casilla para quitar la etiqueta. Lo que no te sirva, bórralo (menú **⋯ › Delete**).
- **Testimonios**: deja «¿Es un testimonio de EJEMPLO?» activado hasta que tengas una cita **real** de un cliente y su permiso para publicarla.
- **Borrador**: si lo activas, el elemento no se publica (útil para artículos a medias).
- **Orden**: número para ordenar (1 aparece primero).
- **Imágenes**: los campos de imagen permiten subir fotos; se guardan en `public/images/`.
- **Ícono**: nombre de un ícono de [Material Symbols](https://fonts.google.com/icons) (por ejemplo `smartphone`, `cloud`, `smart_toy`). Si usas uno nuevo que no se ve, avísame: hay que añadirlo a la lista `src/lib/icons.ts`.

---

## 2. Editar desde GitHub (web o app móvil)

Útil para cambios rápidos o si estás en el teléfono.

### En la web (github.com)

1. Abre tu repositorio en github.com.
2. Navega a la carpeta del contenido:
   - Apps: `src/content/projects/es/` y `src/content/projects/en/`
   - Artículos: `src/content/posts/es/` y `.../en/`
   - Roadmap: `src/content/roadmap/es/` y `.../en/`
   - Servicios y testimonios: `src/content/services/`, `testimonials/`
   - Perfil: `src/content/profile/es.md` y `en.md`
3. Abre el archivo y pulsa el **lápiz ✏️ (Edit this file)**.
4. Cada archivo tiene dos partes:
   - Arriba, entre las líneas `---`, los datos (título, estado, fecha…). Respeta el formato `campo: valor`.
   - Debajo, el texto largo en Markdown (`## Título`, `**negrita**`, `- lista`).
5. Pulsa **Commit changes…** › escribe una descripción corta › **Commit changes** (directo a `main`).

Para **crear** un archivo nuevo: en la carpeta, **Add file › Create new file**. Lo más fácil es copiar el contenido de un archivo existente y cambiarlo.

Ejemplo de app (`src/content/projects/es/mi-app.md`):

```markdown
---
title: Mi App
summary: Una frase que describe la app.
status: live            # live | in-development | idea
category: mobile        # mobile | backend | ai | web | oss
platforms: [android, ios]
logo: /images/mi-app-icono.png
screenshots: [/images/mi-app-1.png, /images/mi-app-2.png]
tags: [.NET MAUI, C#]
playStoreUrl: https://play.google.com/store/apps/details?id=com.ejemplo.app
date: 2026-10-19
example: false
---
## Qué hace
...
```

Ejemplo de actualización de esa app (`src/content/posts/es/mi-app-v1-3.md`):

```markdown
---
title: "Modo oscuro y sincronización más rápida"
description: Una o dos frases sobre lo nuevo.
date: 2026-11-02
tags: [.NET MAUI, Android]
app: mi-app             # = nombre del archivo de la app, sin .md
version: v1.3.0
---
Detalle de la actualización...
```

### En la app móvil de GitHub

La app de GitHub permite ver archivos, pero la edición es limitada. Lo más práctico en el teléfono es abrir **github.com** en el navegador (o **app.pagescms.org**, que funciona bien en móvil) y seguir los mismos pasos.

---

## 3. Cómo publicar una actualización de una app y llevarla a Instagram

Tu flujo: **mejoras una app → publicas la actualización aquí → la compartes en Instagram**. El sitio hace el resto: añade la actualización al historial de la app, a la portada, al RSS de la app y **genera automáticamente la imagen para Instagram**.

### A. Añadir una app nueva (solo la primera vez)

1. En Pages CMS abre **📱 Apps (ES) — añadir o editar una app** → **Add an entry**.
2. Rellena:
   - **Título** (nombre de la app) y **Resumen corto**.
   - **Estado**: *En desarrollo* mientras no esté en las tiendas; *Live* cuando ya esté publicada.
   - **Categoría**: *Móvil* para apps de teléfono.
   - **Plataformas**: Android, iOS…
   - **Ícono de la app**: sube una imagen cuadrada (ej. 512×512). Si no tienes, escribe un nombre de ícono en «Ícono si no subes imagen».
   - **Capturas de pantalla**: sube varias capturas verticales del teléfono; salen en una galería en la página de la app.
   - **Enlace Google Play / App Store**: cuando la app esté publicada, pega los enlaces y aparecerán los botones de descarga.
   - **Enlace beta**: el enlace de *Play Console → Pruebas* o de *TestFlight*. Si lo dejas vacío, el botón «Únete a la beta» lleva al formulario de beta testers del sitio.
   - **Sobre la app**: el texto largo (qué hace, para quién, cómo está hecha).
3. **Save**. Fíjate en el **nombre de archivo** (ej. `mi-app.md`): crea la versión en inglés en **📱 Apps (EN)** con **el mismo nombre de archivo**.
4. En unos minutos la app aparece en `/apps/` y en la portada.

### B. Publicar una actualización de la app

1. Abre **📝 Devlog (ES) — publicar una actualización de app** → **Add an entry**.
2. Rellena:
   - **Título**: qué cambió, corto y claro (ej. «Modo oscuro y sincronización más rápida»). Es el texto grande de la imagen de Instagram.
   - **Descripción**: 1–2 frases; se usa en la tarjeta, en Google y en el texto de Instagram.
   - **📱 App de esta actualización**: elige la app de la lista. *(Déjalo vacío solo si es un artículo general.)*
   - **🏷️ Versión de la app**: ej. `v1.3.0`.
   - **Etiquetas**: se convierten en los hashtags de Instagram (ej. `.NET MAUI` → `#NETMAUI`). Usa 3–5.
   - **Artículo**: el detalle de la actualización (qué mejoró, por qué, capturas si quieres).
3. **Save**. Repite en **📝 Devlog (EN)** con el mismo nombre de archivo si quieres la versión en inglés.
4. Espera a que la publicación termine (ver «¿Cómo veo si se publicó bien?» arriba). La actualización aparece:
   - en la portada («Últimas actualizaciones»),
   - en la página de la app, en **Novedades** y en el historial **Actualizaciones** (con su propio RSS: `/apps/<tu-app>/rss.xml`),
   - en el Devlog.

### C. Llevarla a Instagram

1. Abre la actualización publicada en el sitio (desde el teléfono o la computadora).
2. Baja hasta **Kit para Instagram** y ábrelo.
3. Pulsa **Descargar imagen para Instagram**: es una imagen cuadrada de 1080×1080 con el nombre de la app, la versión y el título, en el estilo del sitio. *(También hay una de 1200×630 para compartir en otras redes.)*
4. Pulsa **Copiar texto**: copia un texto listo con el título, la descripción, el enlace a la actualización y los hashtags.
5. En Instagram: **+ → Publicación**, elige la imagen, pega el texto y publica.
6. **Enlace en la bio**: Instagram no permite enlaces en los posts. Pon en tu bio el enlace al sitio (`https://edwinramos.github.io/apps/`) o el de la app, para que la gente llegue a descargarla o a unirse a la beta.

**Consejos**
- Para una *Story*, usa la misma imagen cuadrada y añade el sticker de **Enlace** con la URL de la actualización.
- La imagen se crea con el **título**, la **versión** y las **etiquetas**: si cambias alguno, guarda y espera la publicación para que la imagen se regenere.
- Las imágenes se generan gratis durante la publicación (en GitHub Actions); no necesitas Canva ni ninguna otra herramienta.

---

## ¿Cuánto tarda en verse el cambio?

Normalmente **entre 1 y 3 minutos** después de guardar. Si no lo ves:

- Recarga la página forzando (Ctrl/Cmd + Shift + R) o abre en una ventana privada; a veces el navegador muestra la versión anterior durante unos minutos.
- Revisa el estado del despliegue (siguiente sección).

## ¿Cómo veo si se publicó bien? (pestaña Actions)

1. En tu repositorio de GitHub, abre la pestaña **Actions**.
2. Verás una fila por cada cambio, llamada **Deploy to GitHub Pages**:
   - 🟡 círculo amarillo = publicando;
   - ✅ verde = publicado;
   - ❌ rojo = falló (el sitio sigue mostrando la versión anterior, no se rompe nada).
3. Si hay un ❌, haz clic en la fila › **build** para ver el error. Casi siempre es un dato con formato incorrecto (por ejemplo, un estado que no existe, una fecha mal escrita o un `:` sin comillas en un título). Corrige el archivo y guarda otra vez.
4. También puedes relanzar manualmente: **Actions › Deploy to GitHub Pages › Run workflow**.

---

## Comentarios, votos y formularios

- **Comentarios del devlog y votos del roadmap** usan GitHub Discussions (Giscus). Los visitantes necesitan una cuenta de GitHub para comentar o votar con 👍. Tú los moderas desde la pestaña **Discussions** del repositorio.
- **Formularios** (Contrátame, Feedback, Beta testers): los mensajes llegan a tu correo a través de Formspree (plan gratuito: 50 envíos/mes). Mientras no esté configurado, el formulario abre el programa de correo del visitante para escribirte a edwinramos.93@gmail.com.
