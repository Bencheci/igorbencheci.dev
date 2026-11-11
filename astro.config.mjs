// Static build for igorbencheci.dev. Content lives in src/content (Markdown/MDX);
// src/content.config.ts is the one place to swap in a Strapi loader later.
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from './src/integrations/sitemap.mjs';
import linkTitles from './src/integrations/link-titles.mjs';

export default defineConfig({
  site: 'https://www.igorbencheci.dev',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap(), linkTitles()],
  build: { inlineStylesheets: 'always' },
});
