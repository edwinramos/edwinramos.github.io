# Portada, perfil, contacto y textos del sitio

## Portada (inicio)

De arriba abajo, la portada (`src/views/HomePage.astro`) muestra:

| Qué ves | Dónde se cambia |
| --- | --- |
| Tu foto en un círculo y la palabrita «APPS» al lado | Foto: `public/images/profile.*` (ver [Foto de perfil](#foto-de-perfil)). Texto: `home.eyebrow` en `src/i18n/ui.ts` |
| **«Hola, soy Edwin Ramos»** / «Hi, I'm Edwin Ramos» | `home.hello` en `src/i18n/ui.ts` (ES y EN) |
| Párrafo bajo tu nombre («Senior Software Engineer con más de 10 años…») | **Cuerpo** (texto después del `---`) de `src/content/profile/es.md` y `en.md`. En el CMS: **👤 Inicio / Sobre mí** › campo «Sobre mí» |
| Línea siguiente («Desde República Dominicana construyo apps móviles…») | Campo **`intro`** de `src/content/profile/es.md` y `en.md` (CMS: «Presentación en la portada») |
| Botón «Ver mis apps» y botón de LinkedIn | Texto: `home.cta.apps` en `ui.ts`. Enlace: `SITE.linkedin` en `src/config.ts` |
| «Mis apps» (tarjetas) | Las apps (ver [apps.md](./apps.md)). Título: `home.apps` |
| Recuadro **Contacto** (`#contact`) | Título y frase: `contact.title` y `contact.lead` en `ui.ts`. El botón con el correo usa `SITE.email`; al lado van LinkedIn e Instagram (si está configurado) |

El párrafo bajo tu nombre y la línea `intro` van **juntos**. Escríbelos para que no repitan lo mismo. Hoy el párrafo lleva el título profesional y la experiencia, y la línea `intro` dice que construyes apps.

Los campos `role` y `location` del perfil son obligatorios en el archivo, pero hoy **no se muestran** en ninguna parte.

Ejemplo (`src/content/profile/es.md`):

```markdown
---
role: Senior Software Engineer
intro: "Desde República Dominicana construyo apps móviles, y aquí las encuentras todas."
location: República Dominicana
---
Senior Software Engineer con **más de 10 años** de experiencia…
```

Recuerda: **sin nombres de empleadores** (ver [reglas](./README.md#reglas-importantes-contenido-público)).

## Correo, LinkedIn, Instagram y otros datos: `SITE` en `src/config.ts`

| Campo | Valor actual | Dónde se usa |
| --- | --- | --- |
| `SITE.email` | `edwinramos.93@gmail.com` | Botón del correo en Contacto, pie de página, formulario de beta (sin Formspree) y datos para buscadores |
| `SITE.linkedin` | tu URL de LinkedIn | Botón LinkedIn en la portada, Contacto y pie de página |
| `SITE.instagram` | `''` (vacío) | Botón Instagram. **Mientras esté vacío, el botón no aparece.** Pon la URL completa, ej. `'https://www.instagram.com/tu_usuario'` |
| `SITE.github` | `https://github.com/edwinramos` | Solo en los datos para buscadores (no hay botón visible) |
| `SITE.name` / `SITE.shortName` | `Edwin Ramos Madera` / `Edwin Ramos` | Pie de página (© año + nombre), título de las pestañas y cabecera |
| `SITE.available` | `true` | Indicador de la cabecera: `true` = punto verde «Disponible para proyectos»; `false` = punto ámbar «Agenda llena» |
| `SITE.defaultOgImage` | `/og-default.png` | Imagen por defecto al compartir enlaces (1200×630) |
| `SITE.url` / `SITE.base` | `https://edwinramos.github.io` / `/` | **No los cambies** salvo que muevas el sitio a otro repo o dominio |
| `SITE.cvUrl` | `''` | Hoy no se usa en ninguna página |

Para cambiarlos, edita `src/config.ts` en GitHub web (✏️) o en tu computadora. **El CMS no edita este archivo.**

> No publiques tu número de teléfono: no existe (ni debe existir) un campo de teléfono.

## Textos fijos de la interfaz: `src/i18n/ui.ts`

Botones, títulos y frases cortas en **dos bloques: `es: { … }` y `en: { … }`**. Cambia el texto **entre comillas** y deja igual la clave de la izquierda. Si añades una clave, añádela en los dos idiomas. Los más útiles:

| Clave | ES actual |
| --- | --- |
| `site.title` / `site.description` | «Edwin Ramos · Apps» / descripción para Google y al compartir |
| `home.hello` | «Hola, soy Edwin Ramos» |
| `home.cta.apps`, `home.apps` | «Ver mis apps», «Mis apps» |
| `contact.title`, `contact.lead` | «Contacto», «¿Preguntas sobre una app, un error o una idea? Escríbeme al correo.» |
| `header.available` / `header.unavailable` | «Disponible para proyectos» / «Agenda llena» |
| `status.live` / `status.in-development` / `status.idea` | Etiquetas de estado por defecto |
| `apps.lead` | Frase de la página `/apps/` |
| `apps.beta`, `apps.beta.lead`, `apps.beta.open` | Textos de la sección de beta |
| `soon.title`, `soon.text` | Lo que se ve si no hay ninguna app publicada |

Si el texto lleva un apóstrofo (`'`), usa comillas dobles, como en `"Hi, I'm Edwin Ramos"`.

En los datos para buscadores (JSON-LD de `src/layouts/Base.astro`, `personLd`) están escritos a mano el título profesional (`jobTitle`) y una lista de tecnologías (`knowsAbout`). No se ven en la página, pero son públicos en el código fuente.

## Foto de perfil

Tu foto sale en dos sitios (ES y EN): en la **portada**, en un círculo a la izquierda de la palabrita «APPS» (56 px en el teléfono, 64 px en la computadora), y en la **cabecera** de todas las páginas, arriba a la izquierda (32 px). No es un campo del CMS: son **cinco archivos con nombre fijo** en `public/images/`:

| Archivo | Tamaño | Para qué |
| --- | --- | --- |
| `profile.webp` | 396×396 | Versión principal (pantallas de alta densidad) |
| `profile-192.webp` | 192×192 | Versión ligera para la mayoría de los teléfonos |
| `profile.jpg` | 396×396 | Respaldo para navegadores sin WebP |
| `profile-64.webp` | 64×64 | Cabecera |
| `profile-64.jpg` | 64×64 | Cabecera, respaldo sin WebP |

El código está en `src/views/HomePage.astro` (portada) y `src/components/Logo.astro` (cabecera). En la portada es un `<picture>` con `alt="Edwin Ramos"`, `width="64" height="64"` y la clase `rounded-full object-cover`, que recorta la imagen en círculo.

**Para cambiar la foto:**
1. Prepara una imagen **cuadrada**, idealmente de 400×400 o más, con la cara centrada. Lo que quede fuera del círculo no se ve.
2. Crea las cinco versiones con **los mismos nombres**. Por ejemplo, en https://squoosh.app: redimensiona a 396 px y exporta como WebP (`profile.webp`) y como JPG (`profile.jpg`); luego redimensiona a 192 px y exporta como WebP (`profile-192.webp`), y a 64 px como WebP y JPG (`profile-64.webp`, `profile-64.jpg`). No agrandes una imagen más pequeña que esos tamaños.
3. Sube los cinco a `public/images/`, reemplazando los anteriores. En GitHub web: *Add file › Upload files*. No hay que tocar código.
4. Tras el deploy, recarga con Ctrl/Cmd + Shift + R. El navegador puede tener la foto vieja en caché.

Si usas otros nombres de archivo, cambia también las rutas en `src/views/HomePage.astro` y `src/components/Logo.astro`. La imagen que sale al compartir el sitio en redes es otra: `public/og-default.png` (ver [imagenes.md](./imagenes.md)).

## Formulario de beta de las apps

Es **el único formulario del sitio**. El formulario de contacto se quitó y ahora solo está el botón del correo. Está en `src/components/BetaSignup.astro` y `src/components/Form.astro`, y sale al final de la página de una app (`#beta`):
- cuando la app **no** está en estado `live`, o
- cuando la app tiene `betaUrl`.

Cómo se comporta:
1. **Si la app tiene `betaUrl`:** muestra solo un botón **«Abrir la beta»** que lleva a ese enlace (Play testing / TestFlight). Es lo recomendado cuando exista la beta.
2. **Si no hay `betaUrl`:** muestra un campo de **correo** y el botón «Únete a la beta». Si la app tiene más de una plataforma móvil, también un selector de plataforma.
   - **Sin Formspree (así está hoy):** al enviar, se abre la app de correo del visitante con un mensaje para `SITE.email`, con el asunto `Beta: <nombre de la app>`. Se ve un aviso «Formulario aún no conectado…».
   - **Con Formspree:** se envía sin salir de la página. Muestra «¡Gracias!…» o un error, y te llega por correo desde Formspree. Desaparece el aviso.

### Formspree (opcional, gratis hasta 50 envíos al mes)

1. Crea una cuenta en https://formspree.io y un formulario nuevo.
2. Copia el ID (lo que va después de `/f/` en `https://formspree.io/f/xxxxxxx`).
3. Pégalo en `src/config.ts`:

```ts
export const FORMS = {
  default: 'xxxxxxx', // usado por todos los formularios
  beta: '',           // opcional: un formulario distinto solo para la beta
};
```

Cada envío trae campos ocultos (`form: beta`, `app`, `lang`) para saber de qué app viene. Incluye además un campo trampa anti-spam (`_gotcha`).

## Analítica con Cloudflare Web Analytics (opcional, gratis, sin cookies)

1. En Cloudflare: *Web Analytics › Add a site*. Escribe `edwinramos.github.io`; no hace falta cambiar DNS.
2. Copia el **token** del fragmento JS que te da.
3. Pégalo en `src/config.ts`:

```ts
export const ANALYTICS = {
  cloudflareToken: 'tu-token',
};
```

Con el token vacío (como hoy), no se carga ningún script. Las políticas en `public/<app>/privacy/` son HTML estático y **no** llevan este script.
