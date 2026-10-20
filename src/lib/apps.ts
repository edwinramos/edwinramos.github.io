import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { byLang, slugOf } from './content';

export type App = CollectionEntry<'projects'>;
export type Policy = CollectionEntry<'privacy'>;

/** Published apps for a language: featured first, then by `order`. */
export async function getApps(lang: Lang): Promise<App[]> {
  return (await byLang('projects', lang)).sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.order - b.data.order);
}

/** The (published) privacy policy linked to an app, if any. */
export async function policyFor(lang: Lang, appSlug: string): Promise<Policy | undefined> {
  return (await byLang('privacy', lang)).find((p) => p.data.app === appSlug);
}

export async function hasPolicy(lang: Lang, appSlug: string) {
  return !!(await policyFor(lang, appSlug));
}

export const platformName: Record<string, string> = { android: 'Android', ios: 'iOS', web: 'Web', windows: 'Windows', macos: 'macOS' };
export { slugOf, getCollection };
