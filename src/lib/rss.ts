import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { ui, type Lang } from '../i18n/ui';
import { byLang, slugOf } from './content';
import { href } from './paths';

export async function devlogFeed(context: APIContext, lang: Lang) {
  const posts = (await byLang('posts', lang)).sort((a, b) => +b.data.date - +a.data.date);
  return rss({
    title: `${SITE.shortName} · Devlog`,
    description: ui[lang]['blog.lead'],
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      categories: p.data.tags,
      link: href(lang, `blog/${slugOf(p.id)}`),
    })),
    customData: `<language>${lang === 'es' ? 'es-DO' : 'en-us'}</language>`,
  });
}
