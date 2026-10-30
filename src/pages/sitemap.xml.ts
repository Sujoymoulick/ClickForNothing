import type { APIRoute } from 'astro';
import { websites } from '../data/websites.ts';
import { categories } from '../data/categories.ts';
import { collections } from '../data/collections.ts';
import { articles } from '../data/articles.ts';
import { SUPPORTED_LOCALES } from '../i18n/config.ts';
import { getLocalizedPath } from '../i18n/routing.ts';

const baseUrl = 'https://clickfornothing.com';

// Empty categories render noindex, so keep them out of the sitemap too
const populatedCategories = categories.filter((c) => websites.some((w) => w.categorySlug === c.slug));

export const GET: APIRoute = () => {
  const staticRoutes: { path: string; priority: string; changefreq: string }[] = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/discover/', priority: '0.9', changefreq: 'daily' },
    { path: '/sites/', priority: '0.9', changefreq: 'daily' },
    { path: '/categories/', priority: '0.8', changefreq: 'daily' },
    { path: '/collections/', priority: '0.8', changefreq: 'daily' },
    { path: '/articles/', priority: '0.8', changefreq: 'daily' },
    { path: '/random/', priority: '0.8', changefreq: 'daily' },
    { path: '/about/', priority: '0.7', changefreq: 'weekly' },
    { path: '/submit/', priority: '0.7', changefreq: 'weekly' },
    { path: '/contact/', priority: '0.5', changefreq: 'monthly' },
    { path: '/privacy-policy/', priority: '0.5', changefreq: 'monthly' },
    { path: '/terms-and-conditions/', priority: '0.5', changefreq: 'monthly' },
    { path: '/disclaimer/', priority: '0.5', changefreq: 'monthly' },
    { path: '/cookie-policy/', priority: '0.5', changefreq: 'monthly' },
  ];

  // englishOnly: translations are noindex, so list only the English URL with no hreflang cluster
  const basePaths: { path: string; priority: string; changefreq: string; englishOnly?: boolean }[] = [
    ...staticRoutes,
    ...websites.map((w: any) => ({
      path: `/sites/${w.slug || w.id}/`,
      priority: '0.8',
      changefreq: 'weekly',
      englishOnly: true,
    })),
    ...populatedCategories.map((c) => ({
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
    if (base.englishOnly) {
      return [`  <url>
    <loc>${baseUrl}${base.path}</loc>
  </url>`];
    }

    const alternatesXml = [
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${getLocalizedPath(base.path, 'en')}" />`,
      ...SUPPORTED_LOCALES.map(
        (loc) => `    <xhtml:link rel="alternate" hreflang="${loc}" href="${baseUrl}${getLocalizedPath(base.path, loc)}" />`
      ),
    ].join('\n');

    return SUPPORTED_LOCALES.map((locale) => {
      const locUrl = `${baseUrl}${getLocalizedPath(base.path, locale)}`;
      // changefreq/priority are ignored by Google, so they are not emitted
      return `  <url>
    <loc>${locUrl}</loc>
${alternatesXml}
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
