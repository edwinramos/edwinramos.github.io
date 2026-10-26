# Imágenes e íconos

Todas las imágenes de contenido van en **`public/images/`** y se escriben en los archivos como **`/images/<archivo>`**, con la barra inicial y sin `public`. Lo que subes desde Pages CMS va ahí automáticamente.

Para los nombres de archivo usa minúsculas, guiones y el nombre de la app delante, por ejemplo `entwine-icon.svg` o `plantcare-1.png`. Sin espacios ni acentos.

## Tamaños recomendados

| Imagen | Campo | Formato y tamaño | Ejemplo actual |
| --- | --- | --- | --- |
| Ícono de la app | `logo` | **Cuadrado.** SVG (ideal) o PNG de 512×512. Se muestra con esquinas redondeadas a 56–96 px | `/images/entwine-icon.svg`, `/images/plantcare-icon.svg` |
| Imagen al compartir el enlace de la app | `ogImage` | **PNG o JPG** (las redes sociales no aceptan SVG). El ícono a 512×512 funciona bien | `/images/entwine-icon-512.png`, `/images/plantcare-icon-512.png` |
| Capturas de pantalla | `screenshots` | **Verticales** de teléfono, PNG o JPG, unos 1080×2340 (proporción ~9:19,5). Se recortan a esa proporción. Mejor por debajo de ~500 KB cada una | — |
| Imagen por defecto al compartir el sitio | `SITE.defaultOgImage` (ES) y `SITE.defaultOgImageEn` (EN) | PNG de **1200×630**, menos de ~300 KB | `public/og-default.png` (ES) y `public/og-default-en.png` (EN) |
| Foto de perfil (portada y cabecera) | (sin campo; nombres fijos, ver [textos-y-perfil.md](./textos-y-perfil.md#foto-de-perfil)) | Cuadrada: WebP 396×396 + WebP 192×192 + JPG 396×396 (portada); WebP 64×64 + JPG 64×64 (cabecera) | `public/images/profile.webp`, `profile-192.webp`, `profile.jpg`, `profile-64.webp`, `profile-64.jpg` |
| Favicon (ícono de la pestaña) | — | ICO con 16/32/48 px + PNG 32×32, tu foto en círculo con fondo transparente | `public/favicon.ico`, `public/favicon-32.png` |
| Ícono al guardar el sitio en la pantalla de inicio (iPhone/iPad) | — | PNG cuadrado de **180×180**, sin transparencia | `public/apple-touch-icon.png` |

- El logo de la cabecera (arriba a la izquierda, en todas las páginas) es tu foto en un círculo de 32 px: `src/components/Logo.astro` usa `public/images/profile-64.webp` y `profile-64.jpg`. El ícono de la pestaña del navegador es aparte (ver abajo).

### Favicon

El ícono de la pestaña es tu foto, recortada un poco más cerca de la cara para que se reconozca a 16–32 px, en un círculo con fondo transparente. Lo declara `src/layouts/Base.astro` (`<link rel="icon">` y `<link rel="apple-touch-icon">`). Para cambiarlo, reemplaza estos archivos **con los mismos nombres**:
- `public/favicon.ico`: un ICO que incluya 16×16, 32×32 y 48×48 (por ejemplo, con https://realfavicongenerator.net).
- `public/favicon-32.png`: PNG de 32×32 con fondo transparente.
- `public/apple-touch-icon.png`: PNG cuadrado de 180×180, sin transparencia; iOS le pone las esquinas redondeadas.

Los navegadores guardan el favicon en caché mucho tiempo. Si no ves el cambio, abre el sitio en una ventana privada.

### Imagen para compartir (Open Graph)

Es la tarjeta que sale al pegar el enlace del sitio en WhatsApp, LinkedIn, X, etc. Hay una por idioma: `public/og-default.png` (ES) y `public/og-default-en.png` (EN). Las dos son PNG de 1200×630 con el estilo del sitio (fondo `#0b1326` con brillo violeta, letra Plus Jakarta Sans y JetBrains Mono). Llevan tu foto, tu nombre, una frase sobre tus apps, los íconos de PlantCare Journal y Entwine, y el dominio.

Cada app usa su propia imagen (`ogImage` en su ficha; ver [apps.md](./apps.md)). La imagen por defecto se usa en el resto de páginas.

Para cambiarla, diseña un PNG de **1200×630** (Canva, Figma…), de menos de ~300 KB, y súbelo con el mismo nombre. Si agregas una app nueva, actualiza también estas imágenes si quieres que salga en ellas. WhatsApp y LinkedIn guardan la vista previa en caché. Para refrescarla en LinkedIn, usa https://www.linkedin.com/post-inspector/.
- Si una app no tiene `logo`, se muestra un ícono Material Symbols (campo `icon`) sobre un degradado violeta.
- Comprime las imágenes grandes antes de subirlas (por ejemplo con https://squoosh.app). El sitio no las optimiza solo.
- Los íconos de las apps salen del propio repo de cada app (sus archivos de branding). Usa la versión oficial, no una copia redibujada.

## Íconos Material Symbols

Los iconitos del sitio (y el campo `icon` de las apps) son de **Material Symbols Outlined**. Busca nombres en https://fonts.google.com/icons, por ejemplo `potted_plant`, `favorite` o `phone_android`.

Para que la página cargue rápido, solo se descargan los íconos listados en **`src/lib/icons.ts`** (lista `ICONS`). **Si usas un ícono nuevo, añade su nombre a esa lista**; si no, saldrá como texto. Para comprobarlo en tu computadora:

```bash
npm run build && npm run check:icons   # debe decir: missing from icons.ts: none
```
