import type { APIRoute } from 'astro';
import { SUPPORTED_LOCALES } from '../i18n/config.ts';
import { getLocalizedPath } from '../i18n/routing.ts';

const baseUrl = 'https://clickfornothing.com';

// The site is a single-screen experience: home (submit + falling sites) and explore.
// These get one URL per locale with a full hreflang cluster.
const localizedPaths = ['/', '/explore/'];

// Legal pages are listed in English only.
const englishOnlyPaths = [
  '/contact/',
  '/privacy-policy/',
  '/terms-and-conditions/',
  '/disclaimer/',
  '/cookie-policy/',
];

export const GET: APIRoute = () => {
  const localized = localizedPaths.flatMap((path) => {
    const alternates = [
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${getLocalizedPath(path, 'en')}" />`,
      ...SUPPORTED_LOCALES.map(
        (loc) => `    <xhtml:link rel="alternate" hreflang="${loc}" href="${baseUrl}${getLocalizedPath(path, loc)}" />`
      ),
    ].join('\n');

    return SUPPORTED_LOCALES.map(
      (locale) => `  <url>
    <loc>${baseUrl}${getLocalizedPath(path, locale)}</loc>
${alternates}
  </url>`
    );
  });

  const english = englishOnlyPaths.map(
    (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...localized, ...english].join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
