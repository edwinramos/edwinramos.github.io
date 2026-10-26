# Imágenes e íconos

Todas las imágenes de contenido van en **`public/images/`** y se escriben en los archivos como **`/images/<archivo>`**, con la barra inicial y sin `public`. Lo que subes desde Pages CMS va ahí automáticamente.

Para los nombres de archivo usa minúsculas, guiones y el nombre de la app delante, por ejemplo `entwine-icon.svg` o `plantcare-1.png`. Sin espacios ni acentos.

## Tamaños recomendados

| Imagen | Campo | Formato y tamaño | Ejemplo actual |
| --- | --- | --- | --- |
| Ícono de la app | `logo` | **Cuadrado.** SVG (ideal) o PNG de 512×512. Se muestra con esquinas redondeadas a 56–96 px | `/images/entwine-icon.svg`, `/images/plantcare-icon.svg` |
| Imagen al compartir el enlace de la app | `ogImage` | **PNG o JPG** (las redes sociales no aceptan SVG). El ícono a 512×512 funciona bien | `/images/entwine-icon-512.png`, `/images/plantcare-icon-512.png` |
| Capturas de pantalla | `screenshots` | **Verticales** de teléfono, PNG o JPG, unos 1080×2340 (proporción ~9:19,5). Se recortan a esa proporción. Mejor por debajo de ~500 KB cada una | — |
| Imagen por defecto al compartir el sitio | `SITE.defaultOgImage` | PNG de **1200×630** | `public/og-default.png` |
| Foto de perfil (portada) | (sin campo; nombres fijos, ver [textos-y-perfil.md](./textos-y-perfil.md#foto-de-perfil)) | Cuadrada: WebP 396×396 + WebP 192×192 + JPG 396×396 | `public/images/profile.webp`, `profile-192.webp`, `profile.jpg` |
| Favicon (ícono de la pestaña) | — | SVG | `public/favicon.svg` |

- El logo «ER» de la cabecera es un SVG dentro de `src/components/Logo.astro`. Si lo cambias, cambia también `public/favicon.svg`.
- Si una app no tiene `logo`, se muestra un ícono Material Symbols (campo `icon`) sobre un degradado violeta.
- Comprime las imágenes grandes antes de subirlas (por ejemplo con https://squoosh.app). El sitio no las optimiza solo.
- Los íconos de las apps salen del propio repo de cada app (sus archivos de branding). Usa la versión oficial, no una copia redibujada.

## Íconos Material Symbols

Los iconitos del sitio (y el campo `icon` de las apps) son de **Material Symbols Outlined**. Busca nombres en https://fonts.google.com/icons, por ejemplo `potted_plant`, `favorite` o `phone_android`.

Para que la página cargue rápido, solo se descargan los íconos listados en **`src/lib/icons.ts`** (lista `ICONS`). **Si usas un ícono nuevo, añade su nombre a esa lista**; si no, saldrá como texto. Para comprobarlo en tu computadora:

```bash
npm run build && npm run check:icons   # debe decir: missing from icons.ts: none
```
