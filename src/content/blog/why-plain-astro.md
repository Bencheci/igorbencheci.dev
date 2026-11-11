---
title: Why I built this site with plain Astro
description: A static Astro site, Markdown content, no client framework and a perfect Lighthouse score, with room to plug in Strapi later.
pubDate: 2026-11-07
tags: [Astro, Meta]
---

This site is a plain Astro build: Markdown files for projects and posts, one inlined stylesheet, system
fonts and almost no JavaScript. Every page is static HTML served from a CDN.

Content goes through Astro's content collections with a typed schema. Today the loader reads Markdown from
the repo; if I ever want an admin UI, I can swap that one loader for one that reads from Strapi, and none of
the pages change.

The full source is public on GitHub at [Bencheci/igorbencheci.dev](https://github.com/Bencheci/igorbencheci.dev):
the content schema, the generated share images, the structured data and the Firebase deploy scripts.

Next up: case studies for each project, and a write-up of the WordPress → Strapi + Astro migration.
