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
  // "Proyectos" became "Apps": keep old /projects/ links working (static meta-refresh pages + canonical).
  redirects: {
    '/projects': '/apps',
    '/projects/[slug]': '/apps/[slug]',
    '/en/projects': '/en/apps',
    '/en/projects/[slug]': '/en/apps/[slug]',
  },
  markdown: { shikiConfig: { theme: 'tokyo-night' } },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page) && !/\/projects(\/|$)/.test(page),
      i18n: { defaultLocale: 'es', locales: { es: 'es-DO', en: 'en-US' } },
    }),
  ],
  // cast: @tailwindcss/vite ships newer Vite types than Astro 5 (runtime is fine)
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
});
