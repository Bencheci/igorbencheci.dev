# igorbencheci.dev

Personal portfolio and blog. Plain Astro 5, static output, Markdown / MDX content.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + static build into dist/
npm run preview   # serve dist/ on http://localhost:4322
```

- Site facts (email, LinkedIn, GitHub): `src/site.ts`
- Projects: `src/content/projects/*.md` (`featured: true` shows on the home page, `order` sorts, `kind: personal` for own projects)
- Blog: `src/content/blog/*.mdx` (`draft: true` hides a post)
- Schemas: `src/content.config.ts`. To move content to Strapi later, swap the `glob()` loader for one that fetches from Strapi; pages stay the same.

Hosting: Firebase Hosting in the personal GCP project `wp-habit`, domain at Porkbun. See `deploy/README.md`.
