import type { APIRoute, GetStaticPaths } from 'astro';
import { languages, type Lang } from '../../../../i18n/ui';
import { shareEntries, shareInput } from '../../../../lib/share';
import { renderShareImage } from '../../../../lib/share-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const out = [];
  for (const lang of Object.keys(languages) as Lang[]) {
    for (const e of await shareEntries(lang)) {
      for (const format of ['ig', 'og'] as const) out.push({ params: { lang, format, slug: e.slug }, props: { input: shareInput(lang, e.post, e.app), format } });
    }
  }
  return out;
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderShareImage(props.input, props.format);
  return new Response(png as BodyInit, { headers: { 'Content-Type': 'image/png' } });
};
