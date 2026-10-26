# Edwin Ramos Madera — Apps («link in bio»)

Hub sencillo y de bajo mantenimiento para las apps de Edwin (el enlace de la bio de Instagram / LinkedIn). Sitio estático bilingüe (ES/EN) construido con **Astro 5** + **Tailwind CSS 4**, siguiendo el diseño de Google Stitch *Obsidian Violet Matrix*. Costo: **$0** (GitHub Pages + servicios con plan gratuito, sin servidores ni base de datos).

- **Manual de usuario (cómo cambiar el contenido): [docs/README.md](./docs/README.md)**
- Configuración del CMS: [`.pages.yml`](./.pages.yml) (Pages CMS)
- **Todos los placeholders** están en [`src/config.ts`](./src/config.ts)

## Comandos

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # astro check (tipos) + build en ./dist
npm run preview      # sirve ./dist
npm run check:icons  # verifica que los íconos usados estén en src/lib/icons.ts
```

Requiere Node 20.3+ (CI usa Node 24).

## Páginas

| Ruta (ES = `/`, EN = `/en/…`) | Contenido |
| --- | --- |
| `/` | Nombre con el texto de presentación debajo, enlaces a LinkedIn / Instagram, grilla de apps (la destacada primero; si no hay apps: «Pronto publicaré mis apps aquí») y **Contacto** (`#contact`, enlace `mailto:` + redes; sin formulario) |
| `/apps/` | Lista de apps |
| `/apps/<app>/` | Ícono, descripción, plataformas, estado, botones Google Play / App Store, capturas, «Novedades» (texto manual), beta (`#beta`, si no está publicada o hay `betaUrl`) y enlace a su política de privacidad |
| `/apps/<app>/privacy/` | Política de privacidad de la app (colección `privacy`, enlazada con `app: <archivo-de-la-app>`). Es la URL que pide Google Play |
| `/<app>/privacy/` | Política oficial estática (`public/<app>/privacy/index.html`, enlazada con `privacyUrl`). Es la que usan las apps actuales |
| `/privacy/` | Índice de políticas (enlazado en el pie de página) |
| `/sitemap-index.xml`, `/robots.txt` | SEO (hreflang ES/EN) |

Redirecciones: las secciones eliminadas (`/blog/…`, `/roadmap/…`, `/services/`, `/about/`, `/feedback/`, `/projects/…`) tienen páginas de redirección a `/` o `/apps/` (ver `redirects` en `astro.config.mjs`); cualquier otra ruta vieja de esas secciones la redirige el script de la página 404.

## Estructura

```
.pages.yml                      # Pages CMS (Apps, Privacidad, Inicio/Sobre mí — por idioma)
.github/workflows/deploy.yml    # Deploy a GitHub Pages en cada push a main (withastro/action)
public/                         # favicon, og-default.png, images/ (subidas del CMS)
src/config.ts                   # ← URL, LinkedIn, Instagram, Formspree, Cloudflare (PLACEHOLDERS)
src/content.config.ts           # Esquemas (zod)
src/content/projects/<es|en>/<app>.md     # apps (la carpeta conserva el nombre "projects")
src/content/privacy/<es|en>/<x>.md        # políticas (plantilla.md = PLANTILLA, no se publica)
src/content/profile/<es|en>.md            # texto de la portada (bajo el nombre)
src/i18n/ui.ts                  # Textos de la interfaz ES/EN
src/views/ · src/pages/ · src/pages/en/ · src/components/
docs/                           # Manual de usuario (no se publica)
src/styles/global.css           # Tokens del design system (@theme de Tailwind 4)
```

Traducciones: usa **el mismo nombre de archivo** en `es/` y `en/`.

Contenido de ejemplo: `example: true` muestra la etiqueta **EJEMPLO**; en las políticas de privacidad muestra el aviso **PLANTILLA — revisar**.

## Placeholders (todos en `src/config.ts`)

| Constante | Qué poner | De dónde sale | ¿Obligatorio? |
| --- | --- | --- | --- |
| `SITE.url` | `https://<usuario>.github.io` | Tu usuario de GitHub | **Sí** (canonical, OG, sitemap) |
| `SITE.base` | `'/'` | — | Solo cámbialo si el repo **no** se llama `<usuario>.github.io` |
| `SITE.github` | `https://github.com/<usuario>` | Tu perfil | Opcional |
| `SITE.instagram` | `https://www.instagram.com/<usuario>` | Tu perfil de Instagram | Opcional (el botón se oculta hasta que se llene) |
| `FORMS.default` (o `beta`) | ID de Formspree (lo que va después de `/f/`) | https://formspree.io | Opcional (sin ID, los formularios abren el correo del visitante con `mailto:`) |
| `ANALYTICS.cloudflareToken` | Token del snippet JS | Cloudflare › Web Analytics | Opcional (el script solo se incluye si hay token) |
| `public/images/profile.webp`, `profile-192.webp`, `profile.jpg`, `profile-64.webp`, `profile-64.jpg` | Tu foto de perfil (portada y cabecera) | — | Ya puesta; para cambiarla ver [docs/textos-y-perfil.md](./docs/textos-y-perfil.md#foto-de-perfil) |

### Si el repo NO se llama `<usuario>.github.io`

Para un repo como `github.com/<usuario>/portfolio` el sitio vive en `https://<usuario>.github.io/portfolio/`:

```ts
// src/config.ts
url: 'https://<usuario>.github.io',
base: '/portfolio',
```

Todos los enlaces internos y assets usan `href()` / `asset()` (`src/lib/paths.ts`), así que respetan `base` automáticamente. Las imágenes subidas por el CMS se guardan como `/images/...` y también reciben el prefijo.

## Puesta en marcha (una sola vez)

1. **Crear el repo** en GitHub con el nombre `<usuario>.github.io` (público) y subir este proyecto a `main`.
2. **Activar Pages**: *Settings › Pages › Build and deployment › Source = GitHub Actions*. El workflow `deploy.yml` publica en cada push.
3. Editar `src/config.ts` → `SITE.url` (y `SITE.github`).
4. **Pages CMS**: entrar a https://app.pagescms.org con GitHub, instalar/autorizar la app de Pages CMS en el repo y abrirlo.
5. **Formspree** (opcional): crear cuenta gratis, crear un formulario y pegar su ID en `FORMS.default`.
6. **Cloudflare Web Analytics** (opcional): cuenta gratis › *Web Analytics › Add a site* (sin cambiar DNS) › copiar el token.

Alternativa de hosting: Cloudflare Pages (build `npm run build`, salida `dist`) — también gratis.

## Diseño

Tokens tomados del `DESIGN.md` y del `tailwind.config` del prototipo Stitch: superficies azul pizarra (`#0b1326` → `#2d3449`), primario violeta `#d0bcff`, secundario cian `#7bd0ff`, tipografías Plus Jakarta Sans (editorial) + JetBrains Mono (telemetría/labels), radios 8–16 px, pills de estado Disponible/En desarrollo/Idea, toggle `ES | EN`, barra de navegación inferior en móvil y barra superior en escritorio. Fuentes autoalojadas vía Fontsource; los íconos Material Symbols se piden a Google Fonts **solo** con los nombres listados en `src/lib/icons.ts` (si usas un ícono nuevo en el CMS, añádelo ahí).
