# Políticas de privacidad de las apps

## Cómo funciona hoy

Las apps actuales publican su política como un **archivo HTML estático**:

| App | Archivo en el repo | URL pública |
| --- | --- | --- |
| PlantCare Journal | `public/plantcare/privacy/index.html` | https://edwinramos.github.io/plantcare/privacy/ |
| Entwine | `public/entwine/privacy/index.html` | https://edwinramos.github.io/entwine/privacy/ |
| Ticky | `public/ticky/privacy/index.html` | https://edwinramos.github.io/ticky/privacy/ |

- Todo lo que está en `public/` se publica **byte por byte**, sin cambios.
- Cada archivo es **una sola página con los tres idiomas** (EN, ES y FR) y su propio estilo, logo y fecha.
- La app enlaza a su política con el campo `privacyUrl` (ver [apps.md](./apps.md)):

```yaml
privacyUrl: /plantcare/privacy/#es   # en src/content/projects/es/plantcare-journal.md
privacyUrl: /plantcare/privacy/#en   # en src/content/projects/en/plantcare-journal.md
```

Con eso aparece la tarjeta «Política de privacidad» en la página de la app, y la app se lista en `/privacy/` y `/en/privacy/` (el enlace «Privacidad» del pie de página).

## Regla de oro: el texto legal se copia exacto

- La política oficial es la misma versión que se usa para Play Console. **Se publica tal cual**: se copia el archivo completo, sin corregir redacción, fechas, nombres de paquete ni enlaces.
- Si ves un error en la política, **no lo arregles en el sitio**. Pide una nueva versión oficial y reemplaza el archivo completo.
- Si alguna vez se aprueba un cambio puntual, hazlo **igual en los tres idiomas** y en la fuente oficial, para que no se desincronicen.
- Comprueba que lo que dice la política coincide con lo que hace la app y con lo que declaras en la sección *Seguridad de los datos* de Play Console.

## Publicar o actualizar una política

1. Consigue el HTML oficial (un solo archivo, con los anclajes de abajo).
2. Cópialo **exacto** a `public/<app>/privacy/index.html`. Ej.: `public/plantcare/privacy/index.html`.
   - **GitHub web:** abre el archivo › ✏️ › selecciona todo, pega el nuevo contenido › *Commit changes*. Para una app nueva: *Add file › Create new file* y escribe la ruta `public/<app>/privacy/index.html`.
   - **En tu computadora:** `cp ruta/a/privacy.html public/<app>/privacy/index.html`. Luego, para confirmar que es idéntico: `cmp ruta/a/privacy.html public/<app>/privacy/index.html` (no debe imprimir nada).
3. Si es una app nueva, pon `privacyUrl: /<app>/privacy/#es` en `es/<app>.md` y `/<app>/privacy/#en` en `en/<app>.md`.
4. Publica (ver [publicar.md](./publicar.md)) y abre la URL para revisar que carga y que los anclajes funcionan.

## Anclajes estables (no los cambies)

Los enlaces de la app, del sitio y de Play Console apuntan a secciones concretas. Cada archivo oficial trae estos `id`:

- `#top`: el inicio.
- **Idiomas:** `#en`, `#es`, `#fr`.
- **Secciones numeradas por idioma:** `#en-1`, `#en-2`… `#es-1`… `#fr-1`… El número es el de la sección en el documento.

Secciones de borrado de datos, útiles para el formulario de *Eliminación de datos* de Play Console:

| App | Sección | Anclajes |
| --- | --- | --- |
| PlantCare Journal (secciones 1–12) | 8. Retention and deletion | `#en-8`, `#es-8`, `#fr-8` |
| Entwine (secciones 1–11) | 6. Retention and deletion | `#en-6`, `#es-6`, `#fr-6` |

Ejemplo: `https://edwinramos.github.io/plantcare/privacy/#en-8`.

Al recibir una versión nueva, comprueba que **siguen existiendo los mismos anclajes**. Si una sección cambió de número, hay que actualizar los enlaces que apuntaban a ella, en Play Console o en la app.

## La URL para Google Play

En Play Console (*Política de la app › Política de privacidad*) usa la URL **sin anclaje** o con el idioma principal. Ej.:
- `https://edwinramos.github.io/plantcare/privacy/`
- `https://edwinramos.github.io/entwine/privacy/`
- `https://edwinramos.github.io/ticky/privacy/`

**No borres ni muevas estos archivos** mientras la app esté (o haya estado) en Google Play.

## La otra opción: políticas desde Pages CMS (plantilla)

El sitio también puede generar políticas desde Markdown, en la colección `privacy` (`src/content/privacy/<es|en>/*.md`, sección **🔒 Privacidad** del CMS). Esas páginas salen en `/apps/<app>/privacy/`.

- Campos: `app` (nombre del archivo de la app), `effectiveDate` (AAAA-MM-DD), `contactEmail` (vacío = `SITE.email`), `example` (`true` = aviso amarillo «PLANTILLA — revisar» y la página no se indexa) y `draft`.
- `plantilla.md` (ES y EN) es solo la plantilla, con `draft: true`. `es/app-de-muestra.md` apunta a una app que no existe, así que no se publica.
- **Si una app tiene `privacyUrl`, ese enlace tiene prioridad** y no se genera la página `/apps/<app>/privacy/`. Las apps actuales usan `privacyUrl`, así que esta opción **no se usa hoy**. Para las políticas oficiales, usa siempre el HTML estático de arriba.
