# Apps: añadir, editar, lanzar o quitar

Cada app son **dos archivos Markdown**, uno por idioma, **con el mismo nombre**:

```
src/content/projects/es/<app>.md   → https://edwinramos.github.io/apps/<app>/
src/content/projects/en/<app>.md   → https://edwinramos.github.io/en/apps/<app>/
```

- El **nombre del archivo es la URL**. Hoy existen `plantcare-journal.md` (`/apps/plantcare-journal/`), `entwine.md` (`/apps/entwine/`) y `ticky.md` (`/apps/ticky/`). Usa minúsculas y guiones, sin espacios ni acentos.
- La carpeta se llama `projects` por razones históricas, pero son las apps.
- Los campos se validan en `src/content.config.ts` (colección `projects`). Si un campo tiene un formato incorrecto, el build falla y el sitio anterior sigue en línea (ver [publicar.md](./publicar.md#si-falla-un-deploy)).
- En el sitio, las apps se ordenan así: primero las **destacadas** (`featured: true`) y luego por `order`, de menor a mayor. Salen en la portada (sección «Mis apps»), en `/apps/` y en `/privacy/`.

## Ejemplo real (Entwine, ES)

```markdown
---
title: Entwine
summary: "Una app para parejas en dos teléfonos: …"
status: in-development
statusLabel: En desarrollo
platforms: [android]
logo: /images/entwine-icon.svg
ogImage: /images/entwine-icon-512.png
icon: favorite
tags: [Expo, React Native, Firebase]
privacyUrl: /entwine/privacy/#es
featured: true
order: 2
date: 2026-10-20
example: false
---
**Entwine** es una app para parejas adultas que se juega en **dos teléfonos**.
…texto de la página de la app (Markdown)…
```

La versión EN (`src/content/projects/en/entwine.md`) tiene los mismos campos con los textos en inglés, `statusLabel: In development` y `privacyUrl: /entwine/privacy/#en`.

## Todos los campos

| Campo | ¿Obligatorio? | Qué hace |
| --- | --- | --- |
| `title` | **Sí** | Nombre de la app (tarjeta, título de la página y de la pestaña). |
| `summary` | **Sí** | 1–2 frases. Sale en la tarjeta, bajo el título de la página de la app y como descripción al compartir el enlace. |
| `status` | No (por defecto `in-development`) | Uno de **`live`**, **`in-development`** o **`idea`**. Ver [Estados](#estados-status-y-statuslabel). |
| `statusLabel` | No | Texto propio para la etiqueta de estado (ej. `Próximamente en Google Play`). **Reemplaza** el texto por defecto del estado. |
| `platforms` | No | Lista con valores de `android`, `ios`, `web`, `windows` o `macos`. Ej.: `[android]` o `[android, ios]`. |
| `logo` | No | Ícono de la app, cuadrado. Ej.: `/images/entwine-icon.svg`. Ver [imagenes.md](./imagenes.md). |
| `ogImage` | No | Imagen que se ve al **compartir el enlace** de la app (WhatsApp, LinkedIn…). Usa **PNG o JPG**, no SVG (ej. el ícono a 512×512: `/images/entwine-icon-512.png`). Si falta: se usa `logo` si no es SVG; si no, `/og-default.png`. |
| `icon` | No | Nombre de un ícono **Material Symbols** para cuando **no hay `logo`** (ej. `potted_plant`, `favorite`). Debe estar en `src/lib/icons.ts` (ver [imagenes.md](./imagenes.md#íconos-material-symbols)). |
| `screenshots` | No | Lista de capturas **verticales** de teléfono: `[/images/mi-app-1.png, /images/mi-app-2.png]`. La **primera** sale grande dentro de un marco de teléfono en la cabecera; todas salen en la galería «Capturas». |
| `whatsNew` | No | Texto libre para la caja «Novedades» (respeta los saltos de línea). Vacío = no se muestra. |
| `playStoreUrl` | No | Enlace de Google Play (`https://play.google.com/store/apps/details?id=…`). Muestra el botón «Disponible en Google Play» y una marca «Play» en la tarjeta. |
| `appStoreUrl` | No | Enlace de la App Store. Muestra el botón «Descárgala en App Store». |
| `betaUrl` | No | Enlace de la beta (Play Console › *Pruebas* o TestFlight). Si está, la sección «Únete a la beta» muestra un botón **«Abrir la beta»** en vez del formulario. |
| `websiteUrl` | No | Sitio web propio de la app (botón «Sitio web»). |
| `privacyUrl` | No | Dónde está la política de privacidad. Para las apps actuales es la página estática por idioma: `/entwine/privacy/#es` (ES) o `/entwine/privacy/#en` (EN). Enlaza la tarjeta «Política de privacidad» de la app y la lista de `/privacy/`. Ver [privacidad.md](./privacidad.md). |
| `tags` | No | Tecnologías, para la caja «Tecnologías». Ej.: `[Expo, React Native, Firebase]`. |
| `featured` | No (por defecto `false`) | `true` = sale primero (marca «Destacada»). |
| `order` | No (por defecto `100`; el CMS propone `10`) | Número de orden: `1` va antes que `2`. Se aplica después de `featured`. |
| `date` | **Sí** | Fecha `AAAA-MM-DD` (ej. `2026-10-20`). Es obligatoria aunque hoy no se muestra. |
| `example` | No (por defecto `false`) | `true` muestra una etiqueta **EJEMPLO**. Déjalo en `false` en apps reales. |
| `draft` | No (por defecto `false`) | `true` = **no se publica** esa versión (borrador). |
| *(texto después de `---`)* | — | Cuerpo en Markdown de la sección «Sobre la app». En el CMS es el campo «Sobre la app». |

Los enlaces (`playStoreUrl`, `appStoreUrl`, `betaUrl`, `websiteUrl`) deben ser URLs completas con `https://`. Si no, el build falla. Si no los usas, borra la línea o déjala vacía.

### Estados (`status` y `statusLabel`)

| `status` | Etiqueta por defecto (ES / EN) | Color |
| --- | --- | --- |
| `live` | Disponible / Available | verde |
| `in-development` | En desarrollo / In development | ámbar |
| `idea` | Idea / Idea | violeta |

- Si pones `statusLabel`, la etiqueta muestra **ese texto**; el color sigue dependiendo de `status`. Ej.: PlantCare usa `status: in-development` con `statusLabel: Próximamente en Google Play` (EN: `Coming soon to Google Play`).
- Si **no** hay `statusLabel`, no hay enlaces de tienda y la app es Android o iOS, la página muestra la nota «Aún no está en las tiendas.».
- La sección **«Únete a la beta»** sale si la app **no** es `live` **o** si tiene `betaUrl`. Ver [textos-y-perfil.md › Beta](./textos-y-perfil.md#formulario-de-beta-de-las-apps).

## Añadir una app nueva

1. Crea `src/content/projects/es/<app>.md`. En el CMS: **📱 Apps (ES) › Add an entry**; el archivo toma el nombre del título. **Revisa el nombre del archivo**, porque será la URL.
2. Crea `src/content/projects/en/<app>.md` **con el mismo nombre de archivo** (CMS: **📱 Apps (EN)**).
3. Sube el ícono (SVG o PNG cuadrado) y un PNG de 512×512 para `ogImage` a `public/images/`. Ver [imagenes.md](./imagenes.md).
4. Publica su política en `public/<app>/privacy/index.html` y pon `privacyUrl: /<app>/privacy/#es` (ES) y `#en` (EN). Ver [privacidad.md](./privacidad.md).
5. Pon `status: in-development` y, si quieres, `statusLabel` (ej. `Próximamente en Google Play`).
6. Si quieres que salga primero, usa `featured: true` y ajusta `order`.
7. Revisa las [reglas](./README.md#reglas-importantes-contenido-público): nada de empleadores, teléfono ni enlaces a repos privados.

## Editar una app

Cambia el campo en **los dos archivos** (ES y EN) si afecta a ambos idiomas: estado, enlaces, imágenes, orden, etc. Los textos (`title`, `summary`, `statusLabel`, el cuerpo) se traducen en cada archivo.

## Al lanzar la app en Google Play

En **ambos** archivos (`es/<app>.md` y `en/<app>.md`):

```diff
-status: in-development
-statusLabel: Próximamente en Google Play
+status: live
+playStoreUrl: https://play.google.com/store/apps/details?id=<paquete.de.la.app>
```

- **`status: live`:** la etiqueta pasa a verde «Disponible» / «Available».
- **Borra `statusLabel`:** si lo dejas, seguirá diciendo «Próximamente…» aunque la app ya esté publicada.
- **`playStoreUrl`:** aparece el botón «Disponible en Google Play».
- La sección de beta **desaparece** al pasar a `live`. Si quieres mantener una beta pública, deja o añade `betaUrl`.
- Si quieres, añade `whatsNew` con lo nuevo de la versión y `screenshots`.
- Confirma que la URL de la política sigue siendo la misma que pusiste en Play Console (ver [privacidad.md](./privacidad.md#la-url-para-google-play)).

## Quitar u ocultar una app

- **Ocultar sin borrar:** `draft: true` en ambos archivos (CMS: activa «Borrador»). Desaparece de la portada, de `/apps/` y de `/privacy/`.
- **Borrar:** elimina `src/content/projects/es/<app>.md` y `en/<app>.md`. Si ya no se usan, también sus imágenes en `public/images/`.
- **⚠️ Política de privacidad:** si la app sigue (o siguió) en Google Play, **no borres `public/<app>/privacy/index.html`**. Esa URL está declarada en Play Console y debe seguir funcionando. Ocultar la app no afecta a esa página.
