/**
 * Igor's career profile as data. One source for the /resume page, /resume.json (JSON Resume),
 * the Person JSON-LD on every page and /llms.txt, so search engines, AI assistants and
 * recruiter tools all read the same facts.
 */
export const PROFILE = {
  headline: 'Lead Software Engineer · Mobile apps, AI agents & high-performance web · Fintech',
  yearsExperience: 13,
  seeking: {
    roles: ['Lead Software Engineer', 'Senior Full-Stack Engineer', 'Staff Front-End Engineer', 'Engineering Lead'],
    workplace: 'Remote or hybrid (US)',
    summary: 'Open to lead or senior engineering roles building mobile, AI and high-performance web products.',
  },
  experience: [
    {
      title: 'Lead Developer', org: 'Venture Tech Solutions', start: '2022-01', end: null as string | null,
      summary: 'Leads product engineering across mobile, AI and web for Consolidated Credit (US and Canada), Debt.com, Debt.ca, KOFE and New Leaf, and a small team of developers.',
      highlights: [
        'Led the Consolidated Credit fintech app for iOS and Android (Flutter): secure in-app payments, token-based auth, co-applicant accounts, App Store and Google Play releases.',
        'Shipped LLM products: a support agent in the contact-center chat, retrieval (RAG) over the brands\' content library, and a Gemini-based generative image pipeline.',
        'Introduced agentic engineering: an AI agent harness of skills and rules that runs, tests and QAs production platforms, with human review on every release.',
        'Integrated payments across the member portal, the mobile app, the Solutions portal and an agent-facing portal, in English, French and Spanish.',
        'Re-architected consolidatedcredit.org as a headless, edge-delivered platform (Strapi v5, Astro v5, Google Cloud Run, Cloudflare) with perfect Lighthouse scores for performance, accessibility and SEO across 99% of pages.',
        'Built a 17-step React 19 intake wizard ending in a soft credit pull and a debt-relief quote.',
        'Led the redesigns of Debt.ca (2022), KOFE (2022–23) and Debt.com (2023).',
        'Grew the Expense portal into a cross-brand ad-spend platform feeding Google BigQuery.',
      ],
    },
    {
      title: 'Senior Web Developer', org: 'Venture Tech Solutions', start: '2019-06', end: '2022-01',
      summary: 'Full-stack web development for the Consolidated Credit family of brands.',
      highlights: [
        'Built Horizon, the web dialer counselors use on every call, from research and wireframes to launch (2020).',
        'Built the Expense / Partner portal: ad-platform spend into BigQuery through Pub/Sub, with partner auto-approval.',
        'Led the 2021 consolidatedcredit.org redesign and rebuilt its financial calculators in React.',
      ],
    },
    {
      title: 'Web Developer', org: 'Razz Interactive', start: '2016-02', end: '2019-06',
      summary: 'Campaign sites, rewards platforms and web tools for national brands at a Miami digital agency: Universal Music Latino (J Balvin, Prince Royce, Victoria La Mala), Mountain Dew, Sprint × Pokémon GO, Lennar and Wood Partners.',
      highlights: [
        'Built MiGente.World for J Balvin\'s "Mi Gente": an interactive globe of 431K+ fan posts from 134 countries and an FFmpeg microservice that framed fans\' selfies. Shorty Awards finalist in three categories.',
        'Built the Mountain Dew DEWnited States promotion site with in-browser label scanning (Amazon Rekognition, Google Cloud Vision, tracking.js), the agency\'s first image-recognition build.',
        'Worked on Sprint Trainer Rewards, a national Pokémon GO rewards platform (Shorty Award winner), and built its 2018 World Cup spin-off with live scores and gift card redemption.',
        'Built "Machika", a web AR experience for J Balvin, floor plan management tools for real estate developers, and the Alta Midtown Phoenix site for Wood Partners (three Communicator Awards of Excellence, 2017).',
      ],
    },
    {
      title: 'Freelance Full-Stack Developer', org: 'Freelance / Contract', start: '2015-12', end: '2025-01',
      summary: 'Side work alongside full-time roles: co-founded Callisto Digital Studio (2022–2025) for client websites, a Shopify theme and SEO audits, and Blue Raven Studios builds (2015–2022).',
      highlights: [] as string[],
    },
    {
      title: 'Web Developer', org: 'TenerLab', start: '2012-07', end: '2014-05',
      summary: 'Front-end development in Chișinău, Moldova: responsive builds from design files, with SEO and social integrations.',
      highlights: [] as string[],
    },
  ],
  skills: [
    { name: 'Mobile', keywords: ['Flutter', 'Dart', 'FlutterFlow', 'iOS', 'Android', 'App Store Connect', 'Google Play'] },
    { name: 'AI & agents', keywords: ['LLM integration', 'AI agents', 'Agentic workflows', 'RAG', 'MCP', 'OpenAI API', 'Gemini', 'Vertex AI', 'Prompt engineering'] },
    { name: 'Front end', keywords: ['TypeScript', 'React', 'Next.js', 'Astro', 'Vite', 'Web animation', 'Accessibility (WCAG)'] },
    { name: 'Back end', keywords: ['Node.js', 'Express', 'REST APIs', 'Headless CMS (Strapi)', 'PostgreSQL', 'Redis', 'MongoDB'] },
    { name: 'Cloud & edge', keywords: ['Google Cloud', 'Cloud Run', 'BigQuery', 'Pub/Sub', 'Cloudflare', 'Firebase', 'Docker', 'CI/CD'] },
    { name: 'Speed & visibility', keywords: ['Core Web Vitals', 'Lighthouse', 'Edge caching', 'Technical SEO', 'Structured data (Schema.org)', 'Generative engine optimization (GEO)', 'AI search visibility'] },
    { name: 'Fintech & payments', keywords: ['Payment gateway integration', 'Secure auth', 'Multilingual (EN / FR / ES)'] },
    { name: 'Leadership', keywords: ['Technical leadership', 'Architecture', 'Code review', 'Mentoring'] },
  ],

  languages: [{ language: 'English', fluency: 'Professional' }],
  education: [
    { institution: 'Technical University of Moldova', studyType: "Master's degree", area: 'Information Technology', start: '2013', end: '2015' },
    { institution: 'Technical University of Moldova', studyType: "Bachelor's degree", area: 'Systems and Computer Engineering' },
  ],
};
