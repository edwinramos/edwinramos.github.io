# Guía: cómo actualizar tu sitio de apps

El sitio es el enlace de tu bio (Instagram / LinkedIn): muestra tus apps, sus políticas de privacidad y cómo contactarte. **Cada vez que guardas un cambio, GitHub lo publica solo** en unos minutos. No necesitas instalar nada.

---

## 1. Pages CMS (recomendado)

**Primera vez:** entra a **https://app.pagescms.org** → *Sign in with GitHub* → autoriza la app «Pages CMS» solo para el repositorio `edwinramos.github.io` → elige el repositorio y la rama **main**.

En el menú verás **🇪🇸 Español** y **🇺🇸 English**, cada uno con:

| Sección | Qué es |
| --- | --- |
| 📱 Apps | Tus apps |
| 🔒 Privacidad | Una política de privacidad por app |
| 👤 Inicio / Sobre mí | Tu presentación de 1–2 líneas y el párrafo «Sobre mí» de la portada |

### Añadir o editar una app

1. **📱 Apps (ES)** → **Add an entry** (o haz clic en una app para editarla).
2. Rellena:
   - **Nombre** y **Descripción corta**.
   - **Estado**: *En desarrollo / beta* hasta que esté en las tiendas; *Disponible* cuando ya esté publicada.
   - **Plataformas** (Android, iOS…).
   - **Ícono de la app**: imagen cuadrada (ej. 512×512).
   - **Capturas de pantalla**: sube varias capturas verticales del teléfono (salen en una galería). Se guardan en `public/images/`.
   - **Novedades** (opcional): texto libre con lo nuevo de la última versión.
   - **Enlace Google Play / App Store**: al pegarlos aparecen los botones de descarga.
   - **Enlace beta**: el de *Play Console → Pruebas* o *TestFlight*. Si lo dejas vacío y la app no está publicada, la página muestra un formulario «Únete a la beta».
   - **Destacada**: actívalo en la app que quieres primero en la portada.
   - **Sobre la app**: el texto largo.
3. **Save**. Fíjate en el **nombre de archivo** (ej. `mi-app.md`): la página será `/apps/mi-app/`. Crea la versión en inglés en **📱 Apps (EN)** con **el mismo nombre de archivo**.
4. Para ocultar una app sin borrarla, activa **Borrador**.

### Política de privacidad de una app

Google Play exige una URL pública con la política de privacidad de cada app.

1. **🔒 Privacidad (ES)** → **Add an entry**.
2. **📱 App**: elige la app. El texto viene precargado con una **PLANTILLA**: cambia cada **[CORCHETE]** por lo que tu app hace realmente (qué datos recopila, servicios de terceros como Firebase o AdMob, dónde se guardan, cómo pedir que se borren).
3. **Vigente desde**: la fecha de hoy. **Correo de contacto**: vacío = el del sitio.
4. Cuando la hayas revisado, **desactiva «PLANTILLA — revisar»** (mientras esté activo, la página muestra un aviso amarillo).
5. **Save**. La política queda en `https://edwinramos.github.io/apps/<tu-app>/privacy/`. **Esa es la URL que pegas en Google Play Console** (*Política de la app → Política de privacidad*). La app muestra el enlace y el pie de página lleva a `/privacy/`.
6. Repite en **🔒 Privacidad (EN)** si quieres la versión en inglés (`/en/apps/<tu-app>/privacy/`).

> ⚠️ **Revisa la política de cada app antes de enviarla a Google Play o App Store.** La plantilla es un punto de partida, no asesoría legal; debe coincidir con lo que declaras en la sección *Seguridad de los datos* de Play Console.

### Presentación y «Sobre mí»

**👤 Inicio / Sobre mí** → cambia la presentación (1–2 líneas) o el párrafo → **Save**.

---

## 2. Alternativa: GitHub web

1. Abre `github.com/edwinramos/edwinramos.github.io`.
2. Carpetas:
   - Apps: `src/content/projects/es/` y `src/content/projects/en/`
   - Privacidad: `src/content/privacy/es/` y `.../en/` (`plantilla.md` es la plantilla, no se publica)
   - Inicio / Sobre mí: `src/content/profile/es.md` y `en.md`
   - Imágenes: `public/images/` (*Add file › Upload files*)
3. Abre un archivo → lápiz **✏️** → edita → **Commit changes** (directo a `main`). Para crear uno nuevo: *Add file › Create new file* (copia otro como base).

Ejemplo de app (`src/content/projects/es/mi-app.md`):

```markdown
---
title: Mi App
summary: Una frase que describe la app.
status: in-development     # live | in-development | idea
platforms: [android, ios]
logo: /images/mi-app-icono.png
screenshots: [/images/mi-app-1.png, /images/mi-app-2.png]
whatsNew: Nuevo modo oscuro.
playStoreUrl: https://play.google.com/store/apps/details?id=com.ejemplo.app
featured: true
date: 2026-10-19
---
Qué hace la app...
```

Ejemplo de política (`src/content/privacy/es/mi-app.md`): copia `plantilla.md`, pon `app: mi-app`, `draft: false`, revisa el texto y, cuando esté revisada, `example: false`.

---

## ¿Cuánto tarda en verse el cambio?

Normalmente **1–3 minutos** después de guardar. Si no lo ves, recarga la página con Ctrl/Cmd + Shift + R.

## ¿Cómo veo si se publicó bien? (pestaña Actions)

1. En el repositorio, abre la pestaña **Actions**.
2. La ejecución más reciente (*Deploy to GitHub Pages*) debe tener un ✅ verde.
3. Si tiene una ❌ roja: ábrela, mira el paso **build** y el mensaje de error (suele ser un campo con formato incorrecto, por ejemplo una fecha o un enlace sin `https://`). Corrige el archivo y guarda de nuevo; el sitio anterior sigue en línea mientras tanto.
