---
title: "Headless re-platform on the edge"
summary: "Re-architected a high-traffic bilingual fintech site as a headless, edge-delivered platform with perfect Lighthouse scores and green Core Web Vitals."
period: 2025 – 2026
order: 4
featured: true
role: Lead developer
industry: Fintech
stack: [Strapi v5, Astro v5, PostgreSQL, Redis, Google Cloud Run, Cloud SQL, Cloudflare, Turnstile]
category: [Headless CMS, Performance, SEO, AI]
metrics:
  - { value: '100 / 100 / 100', label: 'Lighthouse performance, accessibility and SEO across 99% of pages' }
  - { value: 'Edge-first', label: 'HTML cached at Cloudflare and purged on publish' }
  - { value: 'EN + ES', label: 'bilingual, with the Canada site in EN / FR / ES' }
links:
  - { label: 'consolidatedcredit.org', href: 'https://www.consolidatedcredit.org/' }
---

## The challenge

A high-traffic, bilingual financial-education site had outgrown its legacy CMS: years of plugins and
page-builder layouts made it slow on mobile, risky to change, and hard for the content team to manage.

## What I built

- **Headless architecture.** A structured content model in Strapi v5 and a re-runnable import pipeline, so
  content moved over clean and stays portable.
- **Server-rendered templates at the same URLs.** Astro v5 on Google Cloud Run, keeping every URL, redirect
  and piece of metadata so search rankings carried over.
- **Edge delivery.** Cloudflare caches the HTML at the edge and the CMS purges it on publish: fast and fresh.
- **Search and AI visibility.** Structured data, clean semantic markup and Core Web Vitals in the green, so
  pages are easy for both search engines and AI assistants to understand and cite.
- **Agentic QA.** An AI agent harness that compares the old and new site page by page (content, SEO head,
  links, forms, tracking) and runs a Lighthouse lab, with a human approving every release.

## Result

Perfect Lighthouse scores for performance, accessibility and SEO across 99% of pages, a faster site on every
device, and a platform the team can extend safely. The same approach now powers the Canadian site in
English, French and Spanish.
