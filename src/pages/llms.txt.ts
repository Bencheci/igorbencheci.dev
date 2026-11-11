/** /llms.txt: a plain-text profile for AI assistants and crawlers (llmstxt.org convention). */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../site';
import { PROFILE } from '../data/profile';

export const GET: APIRoute = async ({ site }) => {
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
  const posts = (await getCollection('blog', (p) => !p.data.draft));
  const u = (p: string) => new URL(p, site).toString();
  const body = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.bio.short}`,
    '',
    ...SITE.bio.long.flatMap((p) => [p, '']),
    '',
    `- Role: ${SITE.role}, ${SITE.employer.name} (since 2019; Lead Developer since 2022)`,
    `- Location: ${SITE.location.label}`,
    `- Email: ${SITE.email}`,
    `- LinkedIn: ${SITE.linkedin}`,
    `- X: ${SITE.x}`,
    ...(SITE.github ? [`- GitHub: ${SITE.github}`] : []),
    '',
    '## Looking for',
    `${PROFILE.seeking.roles.join(', ')}. ${PROFILE.seeking.workplace}.`,
    '',
    '## Experience',
    ...PROFILE.experience.map((e) => `- ${e.title}, ${e.org} (${e.start} – ${e.end ?? 'present'}): ${e.summary}`),
    '',
    '## Skills',
    ...PROFILE.skills.map((s) => `- ${s.name}: ${s.keywords.join(', ')}`),
    '',
    '## Projects',
    ...projects.map((p) => `- [${p.data.title}](${u(`/projects/${p.id}/`)}): ${p.data.summary}`),
    '',
    '## Pages',
    `- [About](${u('/about/')}): background, experience and FAQ`,
    `- [Resume](${u('/resume/')}) and machine-readable [resume.json](${u('/resume.json')}) (JSON Resume format)`,
    `- [Contact](${u('/contact/')})`,
    ...posts.map((p) => `- [${p.data.title}](${u(`/blog/${p.id}/`)}): ${p.data.description}`),
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
