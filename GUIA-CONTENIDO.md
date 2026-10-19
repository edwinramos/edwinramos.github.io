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
| Proyectos | Tus casos de estudio (estado Live / En desarrollo / Idea, enlaces a GitHub, Google Play, App Store…) |
| Devlog | Artículos del blog |
| Roadmap | Funcionalidades futuras que la gente puede votar |
| Servicios | Lo que ofreces como freelance |
| Testimonios | Citas de clientes |
| Experiencia | Tu trayectoria laboral |
| Perfil / Sobre mí | Bio, cifras, habilidades, idiomas, formación |

#### Editar algo que ya existe

1. Entra a la sección (por ejemplo **Proyectos (ES)**).
2. Haz clic en el elemento que quieres cambiar.
3. Cambia los campos (título, resumen, estado, enlaces…). El campo grande del final es el texto largo (el caso de estudio o el artículo); tiene botones para negritas, listas, enlaces e imágenes.
4. Pulsa **Save** (Guardar). ¡Listo! Eso crea el commit y dispara la publicación.

#### Crear algo nuevo (proyecto, artículo o ítem del roadmap)

1. Entra a la sección y pulsa **Add an entry** (Añadir).
2. Rellena los campos. Los obligatorios están marcados.
3. **Nombre de archivo**: al crear, Pages CMS te muestra el nombre del archivo (por ejemplo `mi-app.md`). Usa minúsculas y guiones, sin espacios ni tildes. 👉 **Usa el mismo nombre en Español y en English** para que el botón ES/EN enlace las dos versiones.
4. Pulsa **Save**.
5. Repite en la sección del otro idioma (por ejemplo **Projects (EN)**) con el mismo nombre de archivo.

#### Campos útiles que debes conocer

- **Estado** (proyectos): *Live / En producción*, *En desarrollo* o *Idea*. Cambia el color de la etiqueta.
- **Mostrar en «En qué estoy trabajando»**: actívalo en el proyecto actual. Rellena también **Progreso %**, **Tarea actual** y **Entrega estimada**; aparecen en la portada.
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
   - Proyectos: `src/content/projects/es/` y `src/content/projects/en/`
   - Artículos: `src/content/posts/es/` y `.../en/`
   - Roadmap: `src/content/roadmap/es/` y `.../en/`
   - Servicios, testimonios, experiencia: `src/content/services/`, `testimonials/`, `experience/`
   - Perfil: `src/content/profile/es.md` y `en.md`
3. Abre el archivo y pulsa el **lápiz ✏️ (Edit this file)**.
4. Cada archivo tiene dos partes:
   - Arriba, entre las líneas `---`, los datos (título, estado, fecha…). Respeta el formato `campo: valor`.
   - Debajo, el texto largo en Markdown (`## Título`, `**negrita**`, `- lista`).
5. Pulsa **Commit changes…** › escribe una descripción corta › **Commit changes** (directo a `main`).

Para **crear** un archivo nuevo: en la carpeta, **Add file › Create new file**. Lo más fácil es copiar el contenido de un archivo existente y cambiarlo.

Ejemplo de proyecto:

```markdown
---
title: Mi App
summary: Una frase que describe la app.
status: live            # live | in-development | idea
category: mobile        # mobile | backend | ai | web | oss
tags: [.NET MAUI, C#]
playStoreUrl: https://play.google.com/store/apps/details?id=com.ejemplo.app
repoUrl: https://github.com/tu-usuario/mi-app
date: 2026-10-19
example: false
---
## El problema
...
```

### En la app móvil de GitHub

La app de GitHub permite ver archivos, pero la edición es limitada. Lo más práctico en el teléfono es abrir **github.com** en el navegador (o **app.pagescms.org**, que funciona bien en móvil) y seguir los mismos pasos.

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
