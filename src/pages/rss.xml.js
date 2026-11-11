import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../site';

export async function GET(context) {
  const posts = await getCollection('blog', (p) => !p.data.draft);
  return rss({
    title: `${SITE.name} · Blog`,
    description: SITE.description,
    site: context.site,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.pubDate, link: `/blog/${p.id}/` })),
  });
}
