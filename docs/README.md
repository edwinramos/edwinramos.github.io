# Manual del sitio — cómo cambiar el contenido

Este manual explica cómo cambiar el contenido de **https://edwinramos.github.io** (repositorio `edwinramos/edwinramos.github.io`). Está basado en el código actual del repo. Si algo del código cambia, actualiza también la página correspondiente de este manual.

> La carpeta `docs/` **no se publica** en el sitio. Astro solo construye `src/` y copia `public/`, así que estos archivos solo se ven en GitHub.

## Índice

| Página | Para qué |
| --- | --- |
| [como-editar.md](./como-editar.md) | Las 3 formas de editar: **Pages CMS**, **GitHub web** o **en tu computadora** |
| [apps.md](./apps.md) | Añadir, editar, lanzar o quitar una app (ES y EN), con todos los campos explicados |
| [privacidad.md](./privacidad.md) | Publicar o actualizar la política de privacidad de una app (`public/<app>/privacy/index.html`) |
| [textos-y-perfil.md](./textos-y-perfil.md) | Portada (nombre, texto bajo el nombre), correo, LinkedIn, Instagram, textos de la interfaz, foto de perfil, formulario de beta, Formspree y analítica |
| [imagenes.md](./imagenes.md) | Íconos de apps, capturas, imagen para compartir, favicon e íconos Material Symbols |
| [publicar.md](./publicar.md) | Cómo se publica (deploy), cómo probar en tu computadora y qué hacer si falla |

## Lo más común, en 30 segundos

- **Cambiar el texto de una app:** `src/content/projects/es/<app>.md` y `src/content/projects/en/<app>.md`, o en Pages CMS, en **📱 Apps (ES)** y **📱 Apps (EN)**. Ver [apps.md](./apps.md).
- **Cambiar el texto bajo tu nombre:** `src/content/profile/es.md` y `en.md`, o en Pages CMS, en **👤 Inicio / Sobre mí**. Ver [textos-y-perfil.md](./textos-y-perfil.md).
- **Cambiar correo, LinkedIn o Instagram:** el objeto `SITE` en `src/config.ts`.
- **Lanzar una app en Google Play:** `status: live`, añadir `playStoreUrl` y **borrar `statusLabel`**. Ver [apps.md › Al lanzar](./apps.md#al-lanzar-la-app-en-google-play).
- **Ver si se publicó:** pestaña **Actions** del repo. El cambio sale en vivo en unos 1–3 minutos. Ver [publicar.md](./publicar.md).

## Reglas importantes (contenido público)

1. **No mencionar empleadores** en ninguna parte del sitio, ni actuales ni anteriores. Tampoco nombres de empresas o clientes, ni correos de trabajo. Habla de experiencia y tecnologías, no de dónde trabajas.
2. **No publicar tu número de teléfono.** El único contacto público es el correo `edwinramos.93@gmail.com` (`SITE.email`).
3. **No enlazar repositorios privados** de las apps, como el código de PlantCare o Entwine.
4. **Las políticas de privacidad se copian tal cual.** No se edita su texto legal en el sitio. Si cambia, se reemplaza el archivo completo por la versión oficial. Ver [privacidad.md](./privacidad.md).
5. **Cada cambio en `main` se publica solo.** Revisa antes de guardar.

Antes de publicar algo nuevo, puedes buscar si se coló un dato que no debe salir. En tu computadora, desde la carpeta del repo:

```bash
grep -rniE "teléfono|phone|\+1 ?8[024]9" src public
```

Revisa también a mano que no aparezca ningún nombre de empresa.

## Estructura (lo que vas a tocar)

```
.pages.yml                          # Configuración de Pages CMS (qué campos ves en el editor)
src/config.ts                       # SITE (correo, LinkedIn, Instagram…), FORMS (Formspree), ANALYTICS (Cloudflare)
src/i18n/ui.ts                      # Textos fijos de la interfaz en ES y EN (botones, títulos, saludo)
src/content/projects/es/<app>.md    # Una app en español (el nombre del archivo es la URL: /apps/<app>/)
src/content/projects/en/<app>.md    # La misma app en inglés (MISMO nombre de archivo)
src/content/profile/es.md, en.md    # Texto de la portada (bajo tu nombre)
src/content/privacy/…               # Políticas hechas en el CMS (hoy solo plantillas; ver privacidad.md)
public/<app>/privacy/index.html     # Políticas oficiales de cada app (se publican tal cual)
public/images/                      # Íconos, capturas e imágenes (lo que subes en el CMS va aquí)
.github/workflows/deploy.yml        # Publica el sitio en cada push a main
docs/                               # Este manual (no se publica)
```
