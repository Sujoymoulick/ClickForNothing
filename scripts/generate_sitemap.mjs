import fs from 'node:fs';
import path from 'node:path';
import { websites } from '../src/data/websites.ts';
import { categories } from '../src/data/categories.ts';
import { collections } from '../src/data/collections.ts';
import { articles } from '../src/data/articles.ts';
import { SUPPORTED_LOCALES } from '../src/i18n/config.ts';
import { getLocalizedPath } from '../src/i18n/routing.ts';

const baseUrl = 'https://clickfornothing.com';
const lastmod = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/discover/', priority: '0.9', changefreq: 'daily' },
  { path: '/sites/', priority: '0.9', changefreq: 'daily' },
  { path: '/categories/', priority: '0.8', changefreq: 'daily' },
  { path: '/collections/', priority: '0.8', changefreq: 'daily' },
  { path: '/articles/', priority: '0.8', changefreq: 'daily' },
  { path: '/random/', priority: '0.8', changefreq: 'daily' },
  { path: '/about/', priority: '0.7', changefreq: 'weekly' },
  { path: '/search/', priority: '0.7', changefreq: 'weekly' },
  { path: '/submit/', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact/', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy-policy/', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms-and-conditions/', priority: '0.5', changefreq: 'monthly' },
  { path: '/disclaimer/', priority: '0.5', changefreq: 'monthly' },
  { path: '/cookie-policy/', priority: '0.5', changefreq: 'monthly' },
];

const basePaths = [
  ...staticRoutes,
  ...websites.map((w) => ({
    path: `/sites/${w.slug || w.id}/`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
  ...categories.map((c) => ({
    path: `/categories/${c.slug}/`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
  ...categories.map((c) => ({
    path: `/random/${c.slug}/`,
    priority: '0.7',
    changefreq: 'weekly',
  })),
  ...collections.map((col) => ({
    path: `/collections/${col.slug}/`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
  ...articles.map((art) => ({
    path: `/articles/${art.slug}/`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
];

const xmlEntries = basePaths.flatMap((base) => {
  const alternatesXml = [
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${getLocalizedPath(base.path, 'en')}" />`,
    ...SUPPORTED_LOCALES.map(
      (loc) => `    <xhtml:link rel="alternate" hreflang="${loc}" href="${baseUrl}${getLocalizedPath(base.path, loc)}" />`
    ),
  ].join('\n');

  return SUPPORTED_LOCALES.map((locale) => {
    const locUrl = `${baseUrl}${getLocalizedPath(base.path, locale)}`;
    const priority = locale === 'en' ? base.priority : (parseFloat(base.priority) * 0.9).toFixed(1);
    return `  <url>
    <loc>${locUrl}</loc>
${alternatesXml}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${base.changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries.join('\n')}
</urlset>
`;

const outputPath = path.resolve(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`Generated sitemap at ${outputPath} with ${xmlEntries.length} URLs for ${basePaths.length} base routes across ${SUPPORTED_LOCALES.length} locales.`);
