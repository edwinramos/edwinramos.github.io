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

const projects = defineCollection({
  loader: md('projects'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['live', 'in-development', 'idea']),
    category: z.enum(['mobile', 'backend', 'ai', 'web', 'oss']).default('mobile'),
    kind: opt(z.string()), // e.g. "App móvil · Salud digital"
    tags: strList,
    version: opt(z.string()),
    metric: opt(z.string()), // e.g. "99.9% uptime"
    cover: opt(z.string()),
    icon: opt(z.string()), // Material Symbols name used when no cover
    repoUrl: url,
    playStoreUrl: url,
    appStoreUrl: url,
    demoUrl: url,
    betaUrl: url,
    current: bool(false), // show in "Currently building"
    progress: opt(z.coerce.number().min(0).max(100)),
    currentTask: opt(z.string()),
    eta: opt(z.string()),
    order: z.coerce.number().default(100),
    date: z.coerce.date(),
    example: bool(false),
    draft: bool(false),
  }),
});

const posts = defineCollection({
  loader: md('posts'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: opt(z.coerce.date()),
    tags: strList,
    project: opt(z.string()), // project name shown on the card
    version: opt(z.string()),
    cover: opt(z.string()),
    example: bool(false),
    draft: bool(false),
  }),
});

const roadmap = defineCollection({
  loader: md('roadmap'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['idea', 'planned', 'in-progress', 'done']).default('planned'),
    project: opt(z.string()),
    tags: strList,
    order: z.coerce.number().default(100),
    date: z.coerce.date(),
    example: bool(false),
    draft: bool(false),
  }),
});

const services = defineCollection({
  loader: md('services'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.string().default('code'),
    features: strList,
    tags: strList,
    priceNote: opt(z.string()),
    order: z.coerce.number().default(100),
    draft: bool(false),
  }),
});

const testimonials = defineCollection({
  loader: md('testimonials'),
  schema: z.object({
    name: z.string(),
    role: opt(z.string()),
    company: opt(z.string()),
    quote: z.string(),
    url: url,
    order: z.coerce.number().default(100),
    example: bool(true),
    draft: bool(false),
  }),
});

const profile = defineCollection({
  loader: md('profile'),
  schema: z.object({
    role: z.string(),
    specialty: z.string(),
    location: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    skills: z
      .array(z.object({ title: z.string(), icon: z.string().default('code'), description: z.string(), items: strList }))
      .default([]),
    education: z
      .array(z.object({ title: z.string(), subtitle: opt(z.string()), icon: z.string().default('school'), example: bool(false) }))
      .default([]),
    languages: z.array(z.object({ name: z.string(), level: z.string() })).default([]),
    /** "Qué hago / What I do" cards */
    focus: z
      .array(z.object({ title: z.string(), icon: z.string().default('code'), description: z.string(), points: strList }))
      .default([]),
    /** "Cómo trabajo / How I work" items */
    approach: z
      .array(z.object({ title: z.string(), icon: z.string().default('check_circle'), description: z.string(), example: bool(false) }))
      .default([]),
  }),
});

export const collections = { projects, posts, roadmap, services, testimonials, profile };
