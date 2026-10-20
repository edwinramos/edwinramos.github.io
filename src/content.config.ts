import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each collection: src/content/<name>/<es|en>/<slug>.md  (same slug in both languages = translations)
const md = (name: string) => glob({ pattern: '**/*.md', base: `./src/content/${name}` });
/** Pages CMS may write empty strings / null for blank fields — normalize them to undefined. */
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const opt = <T extends z.ZodTypeAny>(s: T) => z.preprocess(blank, s.optional());
const url = opt(z.string().url());
const strList = z.preprocess((v) => (Array.isArray(v) ? v.filter((x) => x !== null && x !== '') : blank(v)), z.array(z.string()).default([]));
const bool = (d: boolean) => z.preprocess(blank, z.boolean().default(d));
/** "mi-app", "mi-app.md" or "src/content/projects/es/mi-app.md" → "mi-app" */
const slugRef = z.string().transform((v) => v.split('/').pop()!.replace(/\.mdx?$/, '').trim());

/** Apps (the folder keeps its historic name "projects"). File name = URL: /apps/<file-name>/ */
const projects = defineCollection({
  loader: md('projects'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['live', 'in-development', 'idea']).default('in-development'),
    statusLabel: opt(z.string()), // optional custom status text, e.g. "Próximamente en Google Play"
    platforms: z.preprocess(blank, z.array(z.enum(['android', 'ios', 'web', 'windows', 'macos'])).default([])),
    logo: opt(z.string()), // app icon image (square)
    icon: opt(z.string()), // Material Symbols name used when there is no logo
    screenshots: strList,
    whatsNew: opt(z.string()), // manual "Novedades" text (optional)
    tags: strList, // technologies (optional)
    playStoreUrl: url,
    appStoreUrl: url,
    betaUrl: url, // Play testing / TestFlight link
    websiteUrl: url,
    privacyUrl: opt(z.string()), // external/static privacy policy (URL or site path like /plantcare/privacy/#es); overrides the privacy collection
    featured: bool(false), // shown first on the home page
    order: z.coerce.number().default(100),
    date: z.coerce.date(),
    example: bool(false),
    draft: bool(false),
  }),
});

/** One privacy policy per app: src/content/privacy/<lang>/<any-name>.md with `app: <app file name>` → /apps/<app>/privacy/ */
const privacy = defineCollection({
  loader: md('privacy'),
  schema: z.object({
    app: opt(slugRef),
    effectiveDate: z.coerce.date(),
    contactEmail: opt(z.string().email()),
    example: bool(true), // true = TEMPLATE banner ("PLANTILLA — revisar")
    draft: bool(false),
  }),
});

const profile = defineCollection({
  loader: md('profile'),
  schema: z.object({
    role: z.string(),
    intro: z.string(), // 1–2 lines on the home page
    location: z.string(),
  }),
});

export const collections = { projects, privacy, profile };
