/**
 * Site-wide facts. Edit here; every page, the structured data and /llms.txt read from this file.
 * The `bio` lines are written to be quotable on their own: search engines and AI answers
 * ("Who is Igor Bencheci?") lift sentences like these, so keep them factual and self-contained.
 */
export const SITE = {
  name: 'Igor Bencheci',
  title: 'Igor Bencheci · Lead Software Engineer',
  description:
    // Kept under 160 characters so Google shows it whole in results.
    'Igor Bencheci is a lead software engineer in Miami building mobile apps, AI agents and fast, search-ready web platforms for fintech.',
  role: 'Lead Software Engineer',
  employer: { name: 'Venture Tech Solutions', since: '2019-06' },
  // TODO(Igor): confirm. Public profiles (AeroLeads, Google's AI overview) say Miami, Florida.
  location: { city: 'Miami', region: 'Florida', country: 'US', label: 'Miami, Florida' },
  // TODO(Igor): set up hello@igorbencheci.dev forwarding (Cloudflare Email Routing) before launch.
  email: 'hello@igorbencheci.dev',
  linkedin: 'https://www.linkedin.com/in/igorbencheci/',
  x: 'https://x.com/IgorBencheci',
  github: 'https://github.com/Bencheci',
  /**
   * Google "preferred sources": readers who pick this site see its pages more often in Top Stories
   * (and badged in AI Mode / AI Overviews). Plain deeplink on purpose: Google's button script would add
   * a third-party JS bundle to every page. Docs: developers.google.com/search/docs/appearance/preferred-sources
   */
  googlePreferredSource: 'https://www.google.com/preferences/source?q=www.igorbencheci.dev',
  /** Square headshot for structured data; the About page uses the responsive set in public/img/. */
  photo: '/igor-bencheci.jpg',
  bio: {
    short:
      'Igor Bencheci is a lead software engineer at Venture Tech Solutions in Miami, Florida, building mobile apps, AI products and high-performance web platforms.',
    long: [
      'Igor Bencheci is a full-stack software engineer and the Lead Developer at Venture Tech Solutions, where he leads product engineering for fintech and financial-education brands including Consolidated Credit, Debt.com and Debt.ca.',
      'He led the Consolidated Credit mobile app for iOS and Android, ships LLM-powered agents for customer support and engineering, and builds secure, multilingual payment experiences across web and mobile.',
      'On the web he focuses on speed and discoverability: headless, edge-delivered platforms with perfect Lighthouse scores, healthy Core Web Vitals, structured data, and visibility in both classic and AI-powered search.',
    ],
  },
  knowsAbout: ['Mobile app development', 'Flutter', 'AI agents', 'Agentic workflows', 'LLM integration', 'Retrieval-augmented generation', 'Full-stack development', 'TypeScript', 'React', 'Next.js', 'Astro', 'Node.js', 'Headless CMS', 'Google Cloud', 'Cloudflare', 'Web performance', 'Core Web Vitals', 'Technical SEO', 'Generative engine optimization', 'Payment integrations'],
};
