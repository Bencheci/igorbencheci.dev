/** /resume.json in the JSON Resume v1 format (jsonresume.org), readable by ATS and recruiter tools. */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../site';
import { PROFILE } from '../data/profile';

export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).toString();
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: SITE.name, label: PROFILE.headline, image: abs(SITE.photo), email: SITE.email, url: abs('/'),
      summary: SITE.bio.long.join(' '),
      location: { city: SITE.location.city, region: SITE.location.region, countryCode: SITE.location.country },
      profiles: [
        { network: 'LinkedIn', username: 'igorbencheci', url: SITE.linkedin },
        { network: 'X', username: 'IgorBencheci', url: SITE.x },
        ...(SITE.github ? [{ network: 'GitHub', username: SITE.github.split('/').pop(), url: SITE.github }] : []),
      ],
    },
    work: PROFILE.experience.map((e) => ({
      name: e.org, position: e.title, ...(e.start ? { startDate: e.start } : {}), ...(e.end ? { endDate: e.end } : {}),
      summary: e.summary, highlights: e.highlights,
    })),
    skills: PROFILE.skills.map((s) => ({ name: s.name, keywords: s.keywords })),
    languages: PROFILE.languages,
    education: PROFILE.education.map((ed) => ({ institution: ed.institution, studyType: ed.studyType, area: ed.area, ...(ed.start ? { startDate: ed.start, endDate: ed.end } : {}) })),
    projects: projects.map((p) => ({
      name: p.data.title, description: p.data.summary, url: abs(`/projects/${p.id}/`),
      keywords: p.data.stack, roles: [p.data.role], entity: p.data.kind === 'work' ? 'Venture Tech Solutions' : p.data.kind === 'earlier' ? 'Razz Interactive' : 'Personal',
      highlights: p.data.metrics.map((m) => `${m.value} ${m.label}`),
    })),
    meta: { canonical: abs('/resume.json'), lastModified: new Date().toISOString().slice(0, 10), seeking: PROFILE.seeking },
  };
  return new Response(JSON.stringify(resume, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
