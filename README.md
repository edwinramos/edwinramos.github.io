# Edwin Ramos Madera — Portafolio + Devlog

Sitio estático bilingüe (ES/EN) construido con **Astro 5** + **Tailwind CSS 4**, siguiendo el diseño de Google Stitch *Obsidian Violet Matrix*. Costo: **$0** (GitHub Pages + servicios con plan gratuito, sin servidores ni base de datos).

- Guía para editar contenido (sin código): **[GUIA-CONTENIDO.md](./GUIA-CONTENIDO.md)**
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
| `/` | Hero, cifras, últimas actualizaciones del devlog, **«En qué estoy trabajando»**, proyectos destacados, servicios, CTA *Contrátame* |
| `/projects/` | Spotlight del proyecto actual, catálogo con filtros por categoría, bitácora |
| `/projects/<slug>/` | Caso de estudio: estado (Live / En desarrollo / Idea), progreso, stack, enlaces (GitHub, Google Play, App Store, beta, demo) |
| `/blog/` y `/blog/<slug>/` | Devlog con artículo destacado, tabla de contenido y comentarios (Giscus) |
| `/roadmap/` y `/roadmap/<slug>/` | Roadmap público por estado; votos = reacciones 👍 en GitHub Discussions (Giscus) |
| `/about/` | Perfil: bio, cifras, «Qué hago», «Cómo trabajo», stack, formación, idiomas, canales (sin historial laboral, a propósito) |
| `/services/` | Servicios freelance, proceso, testimonios, formulario **Contrátame** (`#contact`) |
| `/feedback/` | Formulario de feedback + registro de **beta testers** (`#beta`) |
| `/rss.xml`, `/en/rss.xml` | RSS del devlog por idioma |
| `/sitemap-index.xml`, `/robots.txt` | SEO (incluye hreflang ES/EN) |

## Estructura

```
.pages.yml                      # Pages CMS (colecciones agrupadas por idioma)
.github/workflows/deploy.yml    # Deploy a GitHub Pages en cada push a main (withastro/action)
public/                         # favicon, og-default.png, images/ (subidas del CMS)
src/config.ts                   # ← URL, base, Giscus, Formspree, Cloudflare (PLACEHOLDERS)
src/content.config.ts           # Esquemas de las colecciones (zod)
src/content/<colección>/<es|en>/<slug>.md
   projects · posts · roadmap · services · testimonials · profile/<es|en>.md
src/i18n/ui.ts                  # Textos de la interfaz ES/EN
src/views/                      # Páginas (compartidas entre idiomas)
src/pages/  y  src/pages/en/    # Rutas (envoltorios finos que pasan `lang`)
src/components/                 # Header, BottomNav, LangSwitch, Giscus, Form, tarjetas…
src/styles/global.css           # Tokens del design system (@theme de Tailwind 4)
```

Traducciones: usa **el mismo nombre de archivo** en `es/` y `en/`; el selector de idioma enlaza ambas versiones (si falta la traducción, lleva al listado).

Contenido de ejemplo: todo lo marcado con `example: true` muestra una etiqueta **EJEMPLO / EXAMPLE** visible. Los testimonios y la mayoría de proyectos/artículos son ejemplos: reemplázalos con datos reales (o bórralos) desde el CMS.

## Placeholders (todos en `src/config.ts`)

| Constante | Qué poner | De dónde sale | ¿Obligatorio? |
| --- | --- | --- | --- |
| `SITE.url` | `https://<usuario>.github.io` | Tu usuario de GitHub | **Sí** (canonical, OG, sitemap, RSS) |
| `SITE.base` | `'/'` | — | Solo cámbialo si el repo **no** se llama `<usuario>.github.io` |
| `SITE.github` | `https://github.com/<usuario>` | Tu perfil | Opcional (oculto hasta que se llene) |
| `SITE.cvUrl` | `'/cv-edwin-ramos.pdf'` (archivo en `public/`) | Tu CV en PDF | Opcional (botón oculto si está vacío) |
| `GISCUS.repo`, `repoId`, `categoryId`, `roadmapCategoryId` | Valores que genera https://giscus.app | Tras crear el repo y activar Discussions | Opcional (se muestra «Comentarios muy pronto») |
| `FORMS.default` (o `hire`, `feedback`, `beta`, `newsletter`) | ID de Formspree (lo que va después de `/f/`) | https://formspree.io | Opcional (sin ID, los formularios abren el correo del visitante con `mailto:`) |
| `ANALYTICS.cloudflareToken` | Token del snippet JS | Cloudflare › Web Analytics | Opcional (el script solo se incluye si hay token) |
| `public/images/avatar.svg` | Tu foto | — | Opcional (ahora es un monograma «ER») |

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
5. **Giscus** (opcional): *Settings › General › Features › Discussions* ✔; crear las categorías `Comments` y `Roadmap` (tipo *Announcement* recomendado, así solo tú/giscus crean hilos); instalar la app https://github.com/apps/giscus en el repo; copiar `repoId` y `categoryId` desde https://giscus.app a `src/config.ts`.
6. **Formspree** (opcional): crear cuenta gratis, crear un formulario y pegar su ID en `FORMS.default`.
7. **Cloudflare Web Analytics** (opcional): cuenta gratis › *Web Analytics › Add a site* (sin cambiar DNS) › copiar el token.

Alternativa de hosting: Cloudflare Pages (build `npm run build`, salida `dist`) — también gratis.

## Diseño

Tokens tomados del `DESIGN.md` y del `tailwind.config` del prototipo Stitch: superficies azul pizarra (`#0b1326` → `#2d3449`), primario violeta `#d0bcff`, secundario cian `#7bd0ff`, tipografías Plus Jakarta Sans (editorial) + JetBrains Mono (telemetría/labels), radios 8–16 px, pills de estado Live/In dev/Idea, toggle `ES | EN`, barra de navegación inferior en móvil y barra superior en escritorio. Fuentes autoalojadas vía Fontsource; los íconos Material Symbols se piden a Google Fonts **solo** con los nombres listados en `src/lib/icons.ts` (si usas un ícono nuevo en el CMS, añádelo ahí).
