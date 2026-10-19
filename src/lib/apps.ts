import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { byLang, slugOf } from './content';

export type App = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'posts'>;

export async function getApps(lang: Lang): Promise<App[]> {
  return (await byLang('projects', lang)).sort((a, b) => a.data.order - b.data.order);
}

export async function appIndex(lang: Lang): Promise<Map<string, App>> {
  return new Map((await getApps(lang)).map((a) => [slugOf(a.id), a]));
}

/** Posts sorted newest first, each paired with its (published) app, if any. Unknown/draft app refs → general post. */
export async function postsWithApps(lang: Lang): Promise<{ post: Post; app?: App }[]> {
  const apps = await appIndex(lang);
  const posts = (await byLang('posts', lang)).sort((a, b) => +b.data.date - +a.data.date);
  return posts.map((post) => {
    const app = post.data.app ? apps.get(post.data.app) : undefined;
    if (post.data.app && !app) console.warn(`[apps] post "${post.id}" references unknown or hidden app "${post.data.app}" — shown as a general devlog post.`);
    return { post, app };
  });
}

export async function updatesFor(lang: Lang, appSlug: string): Promise<Post[]> {
  return (await postsWithApps(lang)).filter((x) => x.app && slugOf(x.app.id) === appSlug).map((x) => x.post);
}

/** "#Hashtags" from post tags + app name, Instagram-friendly (letters/numbers only). */
export function hashtags(tags: string[], appTitle?: string): string[] {
  const seen = new Set<string>();
  return [appTitle, ...tags]
    .filter(Boolean)
    .map((t) => (t as string).replace(/[^\p{L}\p{N}]+/gu, ''))
    .filter((t) => t.length > 1 && !seen.has(t.toLowerCase()) && (seen.add(t.toLowerCase()), true))
    .map((t) => `#${t}`);
}
