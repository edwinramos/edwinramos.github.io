import type { Lang } from '../i18n/ui';

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Localized internal link. href('en','projects/foo#x') → '/en/projects/foo/#x' (respects `base`). */
export function href(lang: Lang, path = ''): string {
  const [p, hash] = path.replace(/^\/+/, '').split('#');
  const clean = p.replace(/\/+$/, '');
  const prefix = lang === 'en' ? '/en' : '';
  const out = `${BASE}${prefix}/${clean}${clean ? '/' : ''}`;
  return hash ? `${out}#${hash}` : out;
}

/** Public asset URL (files in /public), respects `base`. External URLs pass through. */
export function asset(p: string): string {
  if (/^(https?:)?\/\//.test(p) || p.startsWith('data:')) return p;
  return `${BASE}/${p.replace(/^\/+/, '')}`;
}

export function formatDate(d: Date, lang: Lang, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }) {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-DO' : 'en-US', { ...opts, timeZone: 'UTC' }).format(d);
}

export function readingMinutes(body = ''): number {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
