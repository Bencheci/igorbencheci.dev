/**
 * Build step: write one /sitemap.xml that lists every indexable page in the build.
 *
 * It reads the built HTML, so every page, project and blog post is included without a
 * hand-kept list. A page is left out when it has `noindex` (the 404) or no canonical link.
 * `<loc>` is the page's own canonical URL, and `<lastmod>` comes from the page's
 * structured data (`dateModified`), so it is only set where the date is real (blog posts).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function htmlFiles(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export default function sitemap() {
  return {
    name: 'sitemap',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const entries = [];
        for (const f of await htmlFiles(root)) {
          const html = await fs.readFile(f, 'utf8');
          if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
          const loc = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
          if (!loc) continue;
          const lastmod = (html.match(/"dateModified":"([^"]+)"/) || [])[1];
          entries.push({ loc, lastmod: lastmod?.slice(0, 10) });
        }
        entries.sort((a, b) => a.loc.length - b.loc.length || a.loc.localeCompare(b.loc));
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...entries.map((e) => `  <url><loc>${esc(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`),
          '</urlset>',
          '',
        ].join('\n');
        await fs.writeFile(path.join(root, 'sitemap.xml'), xml);
        logger.info(`sitemap.xml: ${entries.length} URLs`);
      },
    },
  };
}
