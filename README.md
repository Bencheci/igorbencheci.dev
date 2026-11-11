# igorbencheci.dev

Source for **[www.igorbencheci.dev](https://www.igorbencheci.dev)**, the portfolio and blog of Igor Bencheci,
a lead software engineer working across mobile apps, AI agents and fast, search-friendly websites.

A plain, fully static [Astro 5](https://astro.build) site. Content lives in Markdown and MDX, there's no
client-side framework, and every page ships as static HTML from a CDN.

## What's inside

- **Typed content collections.** Projects and posts are Markdown/MDX files validated by a Zod schema
  (`src/content.config.ts`). The loader is the only thing that knows where content comes from, so moving
  to a headless CMS such as Strapi later means swapping one loader, not rewriting pages.
- **Built for search and AI assistants.**
  - One shared schema.org `Person` graph (JSON-LD) on every page (`src/lib/schema.ts`).
  - [`/llms.txt`](https://www.igorbencheci.dev/llms.txt), a plain-text profile for AI crawlers.
  - [`/resume.json`](https://www.igorbencheci.dev/resume.json), a machine-readable résumé.
  - Sitemap, RSS feed and canonical URLs.
  - A post-build step that gives every link a descriptive `title` (`src/integrations/link-titles.mjs`).
- **Generated share images.** Every page gets its own 1200×630 Open Graph card at build time, rendered
  with Satori and Sharp (`src/pages/og/[...slug].png.ts`).
- **Performance first.** Inlined CSS, self-hosted fonts, responsive AVIF/WebP images, immutable caching
  for hashed assets, and motion that is progressive enhancement and respects `prefers-reduced-motion`.
- **Dark and light themes** with a View Transitions theme switch.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + static build into dist/
npm run preview   # serve dist/ on http://localhost:4322
```

## Project layout

```
src/
  content/          projects/*.md and blog/*.md(x)
  content.config.ts collection schemas
  data/             profile (experience, skills) and AI section data
  pages/            routes, plus llms.txt, resume.json, rss.xml and OG images
  lib/schema.ts     JSON-LD builders
  integrations/     build-time link titles
  site.ts           site-wide facts (name, links, contact)
deploy/             Firebase Hosting scripts
```

Projects use `featured: true` to show on the home page and `order` to sort. Blog posts use `draft: true`
to stay hidden.

## Deploy

Firebase Hosting on Google Cloud, behind Cloudflare DNS:

```bash
deploy/deploy.sh          # build and deploy to a 7-day preview URL
deploy/deploy.sh --prod   # deploy to www.igorbencheci.dev
deploy/rollback.sh        # put the previous release back
```

The scripts pin every `gcloud` and `firebase` call to one account and project and refuse to run against
anything else. Security and caching headers live in `firebase.json`. Full setup is in
[`deploy/README.md`](deploy/README.md).

## License

The code is shared for reference and learning. The writing, photos and other content are © Igor Bencheci,
all rights reserved.
