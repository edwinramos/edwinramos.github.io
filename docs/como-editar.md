# Cómo editar: Pages CMS, GitHub web o en tu computadora

Las tres formas terminan igual: un **commit en la rama `main`**, que publica el sitio de forma automática en 1–3 minutos (ver [publicar.md](./publicar.md)).

| Forma | Cuándo usarla |
| --- | --- |
| **Pages CMS** | Lo más cómodo para textos de apps, imágenes y el texto de la portada. Son formularios, sin código. |
| **GitHub web** | Cambios rápidos en cualquier archivo, incluidos `src/config.ts`, `src/i18n/ui.ts` y las políticas en `public/`. |
| **En tu computadora** | Cambios grandes o de diseño, cuando quieres ver el resultado antes de publicar (`npm run dev`). |

---

## 1. Pages CMS (recomendado para contenido)

**Primera vez:**
1. Entra a **https://app.pagescms.org** y elige *Sign in with GitHub*.
2. Autoriza la app «Pages CMS» solo para el repositorio `edwinramos.github.io`.
3. Elige el repositorio y la rama **main**.

La configuración del editor está en **`.pages.yml`**, en la raíz del repo. En el menú verás **🇪🇸 Español** y **🇺🇸 English**, cada uno con:

| Sección del CMS | Archivos que edita | Qué es |
| --- | --- | --- |
| 📱 Apps (ES / EN) | `src/content/projects/es/*.md` / `en/*.md` | Tus apps. Campos explicados en [apps.md](./apps.md) |
| 🔒 Privacidad (ES / EN) | `src/content/privacy/es/*.md` / `en/*.md` | Políticas hechas desde una plantilla. Las apps actuales **no** usan esto; ver [privacidad.md](./privacidad.md) |
| 👤 Inicio / Sobre mí (ES / EN) | `src/content/profile/es.md` / `en.md` | El texto que sale bajo tu nombre en la portada |

- **Imágenes:** lo que subes en un campo de imagen se guarda en `public/images/` y se enlaza como `/images/<archivo>` (`media` en `.pages.yml`).
- **Cada *Save* es un commit en `main`,** así que se publica enseguida. Si no quieres que algo salga todavía, activa **Borrador** (`draft: true`) antes de guardar.
- **Traducciones:** usa **el mismo nombre de archivo** en ES y en EN. Así el botón `ES | EN` lleva de una versión a la otra.
- El CMS **no** edita `src/config.ts`, `src/i18n/ui.ts` ni las políticas en `public/`. Esas se cambian en GitHub web o en tu computadora.

> Nota: en el CMS, el campo `body` del perfil todavía se llama «Sobre mí (párrafo corto en la portada)». Hoy ese texto se muestra **justo debajo de tu nombre**; ya no hay una sección «Sobre mí» aparte.

## 2. GitHub web

1. Abre **https://github.com/edwinramos/edwinramos.github.io**.
2. Navega al archivo, por ejemplo `src/content/projects/es/entwine.md`.
3. Haz clic en el lápiz **✏️ (Edit this file)**, cambia el texto y pulsa **Commit changes…**. Deja *Commit directly to the main branch*.
4. **Crear un archivo nuevo:** en la carpeta, *Add file › Create new file*. Lo más fácil es copiar el contenido de otro archivo parecido y cambiarlo.
5. **Subir imágenes:** abre `public/images/` y usa *Add file › Upload files*.
6. **Borrar un archivo:** ábrelo, menú **⋯** › *Delete file* › *Commit changes*.

Ojo con el formato del bloque entre `---` al inicio de cada `.md` (el *frontmatter*):
- Dos puntos y un espacio después de cada campo (`title: Mi App`).
- Si el texto lleva `:` o comillas, envuélvelo entre comillas dobles (`summary: "Una app: muy útil"`).
- Las listas van entre corchetes (`platforms: [android, ios]`).

## 3. En tu computadora

Requisitos: **Git** y **Node.js 20.3 o más nuevo**. En GitHub Actions se usa Node 24.

```bash
git clone https://github.com/edwinramos/edwinramos.github.io.git
cd edwinramos.github.io
npm ci              # instala dependencias (la primera vez, o si falta node_modules)
npm run dev         # vista previa en http://localhost:4321 (se recarga al guardar)
```

Cuando termines:

```bash
npm run build       # comprueba tipos (astro check) y construye en ./dist; debe decir "0 errors"
git add <archivos que cambiaste>
git commit -m "Describe el cambio"
git pull --ff-only  # trae lo que se haya guardado desde el CMS o GitHub web
git push            # push normal a main; nunca uses --force
```

Más detalles y solución de problemas en [publicar.md](./publicar.md).
