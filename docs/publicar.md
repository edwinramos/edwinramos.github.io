# Publicar: deploy, vista previa local y problemas

## Cómo se publica

- **Cada commit en la rama `main` publica el sitio solo.** Da igual si viene de Pages CMS, de GitHub web o de un `git push`.
- Lo hace el workflow **`.github/workflows/deploy.yml`** («Deploy to GitHub Pages»), con dos pasos:
  1. **build:** instala, ejecuta `npm run build` (comprobación de tipos + construcción) y sube la carpeta `dist`.
  2. **deploy:** la publica en GitHub Pages.
- Tarda **1–3 minutos**. Después recarga la página con **Ctrl/Cmd + Shift + R** para saltarte la caché.
- Si quieres volver a publicar sin cambiar nada: pestaña **Actions** › *Deploy to GitHub Pages* › **Run workflow**.
- Configuración única, ya hecha: *Settings › Pages › Build and deployment › Source = GitHub Actions*.

## Ver si salió bien (pestaña Actions)

1. Abre https://github.com/edwinramos/edwinramos.github.io/actions
2. La ejecución más reciente de **Deploy to GitHub Pages** debe tener un ✅ verde.
3. 🟡 = todavía en curso. ❌ = falló (ver abajo). **Mientras tanto, el sitio anterior sigue en línea.**

## Probar en tu computadora antes de publicar

```bash
npm ci            # instala dependencias exactas (primera vez, o si falta node_modules)
npm run dev       # vista previa en vivo: http://localhost:4321  (/en/ para inglés)
npm run build     # lo mismo que hace GitHub: astro check + build en ./dist. Debe terminar con "0 errors"
npm run preview   # sirve la versión construida (./dist) para revisarla
npm run check:icons   # (tras el build) verifica que los íconos usados estén en src/lib/icons.ts
```

Requiere Node.js **20.3+**. Si `npm run build` funciona en tu computadora, casi seguro funcionará en GitHub.

Cuando esté bien: `git add <archivos>`, `git commit -m "…"`, `git pull --ff-only` y `git push`. **Nunca uses `git push --force`**, porque borrarías cambios guardados desde el CMS o GitHub web.

## Si falla un deploy

1. En **Actions**, abre la ejecución con ❌ › job **build** › despliega el paso que falló y lee el mensaje rojo. Casi siempre dice el archivo y el campo.
2. Errores típicos:

| Mensaje (aprox.) | Causa | Solución |
| --- | --- | --- |
| `… does not match collection schema` / `Invalid url` | Un enlace (`playStoreUrl`, `betaUrl`…) sin `https://` o mal escrito | Corrige el enlace o deja el campo vacío |
| `date: Required` / `Invalid date` | Falta `date` en una app o tiene otro formato | Usa `date: 2026-10-20` |
| `status: Invalid enum value` | `status` con otro valor | Solo `live`, `in-development` o `idea` |
| `platforms: Invalid enum value` | Plataforma mal escrita | Solo `android`, `ios`, `web`, `windows`, `macos` |
| `title: Required` / `summary: Required` | Falta un campo obligatorio | Añádelo |
| `YAMLException` / `bad indentation` | El bloque `---` tiene un error de formato (`:` sin comillas, falta un espacio, comillas sin cerrar) | Pon el texto entre comillas dobles y revisa los espacios |
| Errores de `astro check` en `.ts` / `.astro` | Un error en `src/config.ts`, `src/i18n/ui.ts` o el código (coma o comilla de más o de menos) | Revisa el último cambio en ese archivo; en `ui.ts`, la clave debe existir en `es` y en `en` |

3. Corrige y guarda (nuevo commit). Se vuelve a publicar solo.
4. Si no encuentras el error, deshaz el último cambio: en GitHub, abre el commit y usa **Revert**, o en tu computadora `git revert <commit>` y `git push`. **No reescribas el historial.**
5. Si el build pasa (✅) pero no ves el cambio, recarga con Ctrl/Cmd + Shift + R o prueba en una ventana privada. Revisa también que no hayas dejado `draft: true`.
