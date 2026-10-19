import type { Lang } from '../i18n/ui';
import { SITE } from '../config';
import { slugOf } from './content';
import { postsWithApps, hashtags, type Post, type App } from './apps';
import type { ShareInput } from './share-image';

export const sharePath = (lang: Lang, slug: string, format: 'ig' | 'og') => `share/${lang}/${format}/${slug}.png`;

export async function shareEntries(lang: Lang) {
  return (await postsWithApps(lang)).map(({ post, app }) => ({ slug: slugOf(post.id), post, app }));
}

export function shareInput(lang: Lang, post: Post, app?: App): ShareInput {
  const host = new URL(SITE.url).host;
  return {
    eyebrow: app ? (lang === 'es' ? 'Nueva actualización' : 'New update') : 'Devlog',
    appName: app?.data.title,
    version: post.data.version,
    title: post.data.title,
    footer: host,
    tags: post.data.tags,
  };
}

export function instagramCaption(lang: Lang, post: Post, app: App | undefined, url: string): string {
  const d = post.data;
  const head = app ? `🚀 ${app.data.title}${d.version ? ` ${d.version}` : ''} — ${d.title}` : `📝 ${d.title}`;
  const cta = lang === 'es' ? `👉 Lee la actualización completa (link en la bio):` : `👉 Read the full update (link in bio):`;
  return [head, '', d.description, '', cta, url, '', hashtags(d.tags, app?.data.title).join(' ')].join('\n').trim();
}
