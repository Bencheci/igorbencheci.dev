/**
 * Schema.org builders (JSON-LD). Shared by the layout and pages so every page describes the
 * same Person node (`#igor`) and search engines / AI agents can join facts across pages.
 */
import { SITE } from '../site';
import { PROFILE } from '../data/profile';

export const id = (site: URL | undefined, frag: string) => `${site}#${frag}`;

export function personSchema(site: URL | undefined) {
  const abs = (p: string) => new URL(p, site).toString();
  const orgs = [...new Set(PROFILE.experience.map((e) => e.org))];
  const orgNode = (name: string) => ({ '@type': 'Organization', '@id': id(site, `org-${name.toLowerCase().replace(/\W+/g, '-')}`), name });
  const current = PROFILE.experience.find((e) => !e.end)!;
  return [
    {
      '@type': 'Person',
      '@id': id(site, 'igor'),
      name: SITE.name, givenName: 'Igor', familyName: 'Bencheci',
      jobTitle: SITE.role,
      description: SITE.bio.short,
      disambiguatingDescription: `Software engineer and ${current.title} at ${current.org}, ${SITE.location.label}.`,
      url: site?.toString(),
      mainEntityOfPage: abs('/about/'),
      email: `mailto:${SITE.email}`,
      image: { '@type': 'ImageObject', url: abs(SITE.photo), width: 800, height: 800, caption: `${SITE.name}, ${SITE.role}` },
      address: { '@type': 'PostalAddress', addressLocality: SITE.location.city, addressRegion: SITE.location.region, addressCountry: SITE.location.country },
      homeLocation: { '@type': 'Place', name: SITE.location.label },
      sameAs: [SITE.linkedin, SITE.x, SITE.github].filter(Boolean),
      knowsAbout: PROFILE.skills.flatMap((s) => s.keywords),
      knowsLanguage: PROFILE.languages.map((l) => l.language),
      // Career history via the schema.org Role pattern: each EmployeeRole wraps the employer
      // with its own title and dates, so tools read a timeline, not just a current title.
      worksFor: PROFILE.experience.map((e) => ({
        '@type': 'EmployeeRole',
        roleName: e.title,
        ...(e.start ? { startDate: e.start } : {}),
        ...(e.end ? { endDate: e.end } : {}),
        description: e.summary,
        worksFor: { '@id': orgNode(e.org)['@id'] },
      })),
      hasOccupation: {
        '@type': 'Occupation',
        name: current.title,
        description: PROFILE.headline,
        occupationalCategory: '15-1252.00 Software Developers',
        skills: PROFILE.skills.flatMap((s) => s.keywords).join(', '),
        occupationLocation: { '@type': 'City', name: SITE.location.label },
        experienceRequirements: `${PROFILE.yearsExperience}+ years of professional experience`,
      },
      seeks: {
        '@type': 'Demand',
        name: PROFILE.seeking.roles.join(' / '),
        description: `${PROFILE.seeking.summary} ${PROFILE.seeking.workplace}.`,
      },
      subjectOf: [
        { '@type': 'WebPage', url: abs('/resume/'), name: `${SITE.name} – Resume` },
        { '@type': 'DigitalDocument', url: abs('/resume.json'), name: `${SITE.name} – JSON Resume`, encodingFormat: 'application/json' },
      ],
    },
    ...orgs.map(orgNode),
  ];
}
