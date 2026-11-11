/**
 * The home page "AI" section: what Igor is building with AI, newest first.
 * Edit freely: add an entry at the top when something new ships; `now` is the current-focus list.
 */
export const AI = {
  intro:
    "I've been shipping with AI since 2023: first GPT features for users, then retrieval over our own content, and now AI agents that do real engineering work alongside me, with guardrails, tests and a human in the loop.",
  now: ['Agentic workflows', 'MCP servers', 'Google ADK agents', 'AI search visibility (GEO)', 'RAG', 'Gemini image pipelines'],
  milestones: [
    {
      year: '2026', tag: 'Agents',
      title: 'Agentic engineering for production platforms',
      text: 'A harness of rules, skills and tools that lets coding agents run the stack, migrate content and verify every page of a large re-platform (content, SEO, links, forms, tracking, Lighthouse). Agents handle the repetitive work; people review and ship.',
      stack: ['Claude Code', 'Agent skills', 'Playwright', 'Lighthouse'],
    },
    {
      year: '2026', tag: 'Generative media',
      title: 'Image Studio: on-brand illustrations with Gemini',
      text: 'A studio where a designer defines a style family, references and boundaries, and Gemini generates, refines and exports web-ready images. Used to replace stock and copyrighted images across several brands.',
      stack: ['Gemini', 'Nano Banana', 'Node.js', 'Sharp'],
    },
    {
      year: '2024 – 26', tag: 'Conversational AI',
      title: 'A GPT agent inside the contact-center chat',
      text: "A Node.js service on Cloud Run that answers website chat with GPT, grounded in the brands' content, and hands existing clients to a human counselor.",
      stack: ['OpenAI API', 'Node.js', 'Cloud Run'],
    },
    {
      year: '2023 – 24', tag: 'RAG',
      title: 'A knowledge base over thousands of articles',
      text: 'Retrieval over Debt.com and Consolidated Credit content with Chroma and Vertex AI, so answers come from the brands\' own vetted articles. Plus Counselor GPT and an article summarizer for WordPress.',
      stack: ['Vertex AI', 'Chroma', 'OpenAI API', 'Embeddings'],
    },
  ],
};
