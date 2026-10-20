// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE } from './src/config.ts';

// `site` and `base` come from src/config.ts (single source of truth).
export default defineConfig({
  site: SITE.url,
  base: SITE.base,
  trailingSlash: 'ignore',
  // Old URLs keep working (static meta-refresh pages). Sections removed in the "link in bio" simplification
  // point to home or /apps/; any other old deep link is caught by the 404 page script.
  redirects: Object.fromEntries(
    ['', '/en'].flatMap((l) => [
      [`${l}/projects`, `${l}/apps`],
      [`${l}/projects/[slug]`, `${l}/apps/[slug]`],
      [`${l}/projects/portafolio-devlog`, `${l}/apps`],
      [`${l}/apps/portafolio-devlog`, `${l}/apps`],
      [`${l}/blog`, `${l}/`],
      ...['hola-mundo', 'apps-primero-v0-2', 'migrar-xamarin-a-maui', 'llm-en-apis-aspnet'].map((s) => [`${l}/blog/${s}`, `${l}/`]),
      [`${l}/roadmap`, `${l}/apps`],
      ...['modo-offline', 'widgets-android', 'newsletter-devlog', 'asistente-ia', 'sitio-bilingue'].map((s) => [`${l}/roadmap/${s}`, `${l}/apps`]),
      [`${l}/services`, `${l}/`],
      [`${l}/about`, `${l}/`],
      [`${l}/feedback`, `${l}/apps`],
    ]),
  ),
  markdown: { shikiConfig: { theme: 'tokyo-night' } },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page),
      i18n: { defaultLocale: 'es', locales: { es: 'es-DO', en: 'en-US' } },
    }),
  ],
  // cast: @tailwindcss/vite ships newer Vite types than Astro 5 (runtime is fine)
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
});
