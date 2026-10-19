import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { Lang } from '../i18n/ui';

/** Entries live in src/content/<collection>/<lang>/<slug>.md — this returns those for one language. */
export async function byLang<C extends CollectionKey>(collection: C, lang: Lang): Promise<CollectionEntry<C>[]> {
  const all = (await getCollection(collection)) as CollectionEntry<C>[];
  return all.filter((e) => e.id.startsWith(`${lang}/`) && !(e.data as { draft?: boolean }).draft);
}
export const slugOf = (id: string) => id.split('/').slice(1).join('/');

export async function hasTranslation(collection: CollectionKey, lang: Lang, slug: string) {
  const all = await getCollection(collection);
  return all.some((e) => e.id === `${lang}/${slug}`);
}
