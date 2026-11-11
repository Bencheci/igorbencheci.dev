/**
 * Content collections. Both read local Markdown today; to move to Strapi, replace a
 * `glob()` loader with a loader that fetches from the Strapi REST API at build time
 * and keep the same schema, so no page has to change.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** Search-result overrides when `title` (+ " · Igor Bencheci") runs past ~60 chars or `summary` past 160. */
    seoTitle: z.string().optional(),
    seoDescription: z.string().max(160).optional(),
    period: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    kind: z.enum(['work', 'personal', 'earlier']).default('work'),
    /** Earlier agency work: award line, YouTube video id, and design screens. */
    award: z.string().optional(),
    /** Short title and one line for the compact Earlier work card. */
    cardTitle: z.string().optional(),
    cardLine: z.string().optional(),
    video: z.string().optional(),
    videoLabel: z.string().optional(),
    images: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    role: z.string(),
    industry: z.string(),
    stack: z.array(z.string()),
    category: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    /** `group` names the product when one project has several listings (e.g. an app in two stores). */
    links: z.array(z.object({ label: z.string(), href: z.string().url(), group: z.string().optional() })).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
