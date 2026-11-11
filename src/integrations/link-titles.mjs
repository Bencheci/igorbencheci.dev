/**
 * Build step: give every <a> in the built HTML a `title`, so each link says where it goes
 * (on hover, and for crawlers and AI agents reading the markup). Runs after the build, so it
 * covers layouts, components and Markdown/MDX alike, including content added later.
 *
 * A title written by hand in the source always wins. Otherwise:
 *  - internal page links get the target page's own <title> (read from the build output);
 *  - in-page anchors, mailto, feeds and files get a fixed, descriptive label;
 *  - external links use their aria-label, or the link text plus the site's name.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OWNER = 'Igor Bencheci';
const HOSTS = { 'linkedin.com': 'LinkedIn', 'x.com': 'X', 'twitter.com': 'X', 'github.com': 'GitHub' };
const FIXED = {
  '/rss.xml': `${OWNER} · Blog RSS feed`,
  '/resume.json': `${OWNER} · Resume in JSON Resume format`,
  '/llms.txt': `${OWNER} · Profile for AI assistants (llms.txt)`,
  '/sitemap-index.xml': `${OWNER} · Sitemap`,
};

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");
const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const attr = (tag, name) => decode((tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1] ?? '');
const text = (inner) => decode(inner.replace(/<[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/[a-z]+>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').replace(/[→←↗]/g, '').trim();

async function htmlFiles(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function titleFor(href, inner, tag, pages, site) {
  const label = attr(tag, 'aria-label');
  const words = text(inner);
  if (href.startsWith('mailto:')) return `Email ${OWNER} at ${href.slice(7).split('?')[0]}`;
  if (href.startsWith('tel:')) return `Call ${href.slice(4)}`;
  if (href.startsWith('#')) return words || label || 'Jump to section';
  let url;
  try { url = new URL(href, site); } catch { return label || words; }
  if (url.host === site.host) {
    if (FIXED[url.pathname]) return FIXED[url.pathname];
    const page = pages.get(url.pathname);
    if (page) return url.hash ? `${words || label} · ${page}` : page;
    return label || words;
  }
  if (label) return label;
  const host = url.hostname.replace(/^www\./, '');
  const known = Object.entries(HOSTS).find(([h]) => host === h || host.endsWith(`.${h}`));
  if (known && /\bme\b/.test(attr(tag, 'rel'))) return `${OWNER} on ${known[1]}`;
  return words && words.toLowerCase() !== host ? `${words} (${host})` : `Visit ${host}`;
}

export default function linkTitles() {
  let site = new URL('https://www.igorbencheci.dev/');
  return {
    name: 'link-titles',
    hooks: {
      'astro:config:done': ({ config }) => { if (config.site) site = new URL(config.site); },
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = await htmlFiles(root);
        const pages = new Map();
        for (const f of files) {
          const rel = path.relative(root, f).split(path.sep).join('/');
          const route = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
          const t = ((await fs.readFile(f, 'utf8')).match(/<title>([^<]*)<\/title>/) || [])[1];
          if (t && route !== '/404/') pages.set(route, decode(t));
        }
        let added = 0;
        for (const f of files) {
          const html = await fs.readFile(f, 'utf8');
          const out = html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/g, (m, attrs, inner) => {
            if (/\stitle="/.test(attrs) || !/\shref="/.test(attrs)) return m;
            const title = titleFor(attr(attrs, 'href'), inner, attrs, pages, site);
            if (!title) return m;
            added++;
            return `<a${attrs} title="${escape(title)}">${inner}</a>`;
          });
          if (out !== html) await fs.writeFile(f, out);
        }
        logger.info(`added a title to ${added} links in ${files.length} pages`);
      },
    },
  };
}
