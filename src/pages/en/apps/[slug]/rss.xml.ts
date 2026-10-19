import type { APIContext } from 'astro';
import { appFeed } from '../../../../lib/rss';
import { getApps } from '../../../../lib/apps';
import { slugOf } from '../../../../lib/content';
export async function getStaticPaths() {
  return (await getApps('en')).map((app) => ({ params: { slug: slugOf(app.id) }, props: { app } }));
}
export const GET = (context: APIContext) => appFeed(context, 'en', context.props.app);
