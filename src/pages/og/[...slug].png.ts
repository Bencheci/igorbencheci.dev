/**
 * Open Graph images, rendered at build time with Satori (JSX-like tree → SVG) and Sharp (SVG → PNG).
 * One 1200×630 card per page: /og/home.png, /og/projects/<id>.png, /og/blog/<id>.png, ...
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from "node:fs";
import { join } from "node:path";

const font = (f: string) => readFileSync(join(process.cwd(), "src/og-fonts", f));
const fonts = [
  { name: 'Space Grotesk', data: font('space-grotesk-latin-700-normal.woff'), weight: 700 as const },
  { name: 'Space Grotesk', data: font('space-grotesk-latin-400-normal.woff'), weight: 400 as const },
  { name: 'JetBrains Mono', data: font('jetbrains-mono-latin-400-normal.woff'), weight: 400 as const },
];

/** The site mark (gradient slashes), the same artwork as public/favicon.svg. */
const MARK = 'data:image/svg+xml;base64,' + Buffer.from(readFileSync(join(process.cwd(), 'public/favicon.svg'))).toString('base64');

type Card = { eyebrow: string; title: string; sub?: string };

export const getStaticPaths = (async () => {
  const projects = await getCollection('projects');
  const posts = await getCollection('blog', (p) => !p.data.draft);
  const pages: { slug: string; card: Card }[] = [
    { slug: 'home', card: { eyebrow: 'Lead Software Engineer', title: 'Full-stack engineer who ships mobile apps, AI agents and fast, findable web.' } },
    { slug: 'projects', card: { eyebrow: 'Work', title: "Things I've built", sub: 'Mobile, AI agents, payments and high-performance web' } },
    { slug: 'blog', card: { eyebrow: 'Blog', title: 'Notes from the work', sub: 'Migrations, page speed, mobile and AI agents' } },
    { slug: 'about', card: { eyebrow: 'About', title: 'I build products people use every day.' } },
    { slug: 'contact', card: { eyebrow: 'Contact', title: "Let's talk.", sub: 'Open to lead & senior engineering roles' } },
    ...projects.map((p) => ({ slug: `projects/${p.id}`, card: { eyebrow: `${p.data.period} · ${p.data.industry}`, title: p.data.title, sub: p.data.metrics[0] ? `${p.data.metrics[0].value} ${p.data.metrics[0].label}` : p.data.stack.slice(0, 4).join(' · ') } })),
    ...posts.map((p) => ({ slug: `blog/${p.id}`, card: { eyebrow: 'Blog', title: p.data.title, sub: p.data.tags.join(' · ') } })),
  ];
  return pages.map(({ slug, card }) => ({ params: { slug }, props: card }));
}) satisfies GetStaticPaths;

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { eyebrow, sub } = props as Card;
  const title = (props as Card).title.replace(/ → /g, ' to ');
  const tree = h('div', {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px',
    background: '#07080c', color: '#eef0f6', fontFamily: 'Space Grotesk',
    backgroundImage: 'radial-gradient(circle at 85% 15%, rgba(155,107,255,.45), transparent 45%), radial-gradient(circle at 10% 95%, rgba(61,232,255,.25), transparent 45%)',
  }, [
    h('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
      { type: 'img', props: { src: MARK, width: 56, height: 56 } },
      h('div', { fontSize: 28, fontWeight: 700 }, 'Igor Bencheci'),
    ]),
    h('div', { display: 'flex', flexDirection: 'column', gap: 22 }, [
      h('div', { fontFamily: 'JetBrains Mono', fontSize: 24, color: '#c8ff3d', letterSpacing: 3, textTransform: 'uppercase' }, eyebrow),
      h('div', { fontSize: title.length > 70 ? 50 : title.length > 50 ? 58 : 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }, title),
      ...(sub ? [h('div', { fontSize: 28, color: '#949aab', maxWidth: 1000 }, sub)] : []),
    ]),
    h('div', { display: 'flex', width: '100%', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 22, color: '#949aab' }, [
      h('div', { display: 'flex' }, 'igorbencheci.dev'),
      h('div', { display: 'flex', color: '#c8ff3d' }, 'Lighthouse 100 / 100 / 100 / 100'),
    ]),
  ]);
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
