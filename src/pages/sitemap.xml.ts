import type { APIRoute } from 'astro';
import { websites } from '../data/websites.ts';
import { categories } from '../data/categories.ts';
import { collections } from '../data/collections.ts';
import { articles } from '../data/articles.ts';
import { SUPPORTED_LOCALES } from '../i18n/config.ts';
import { getLocalizedPath } from '../i18n/routing.ts';

const baseUrl = 'https://clickfornothing.com';
const lastmod = new Date().toISOString().split('T')[0];

export const GET: APIRoute = () => {
  const staticRoutes = [
    '/',
    '/discover/',
    '/sites/',
    '/categories/',
    '/collections/',
    '/articles/',
    '/random/',
    '/submit/',
    '/search/',
    '/about/',
    '/contact/',
    '/privacy-policy/',
    '/terms-and-conditions/',
    '/disclaimer/',
    '/cookie-policy/',
  ];

  const basePaths: { path: string; priority: string; changefreq: string }[] = [
    ...staticRoutes.map((r) => ({
      path: r,
      priority: r === '/' ? '1.0' : '0.8',
      changefreq: 'daily',
    })),
    ...websites.map((w) => ({
      path: `/sites/${w.slug}/`,
      priority: '0.8',
      changefreq: 'weekly',
    })),
    ...categories.map((c) => ({
      path: `/categories/${c.slug}/`,
      priority: '0.8',
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
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
