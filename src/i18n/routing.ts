import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from './config.ts';

/**
 * Strips the locale prefix from a pathname to get the canonical base path.
 * e.g. "/bn/discover/" -> "/discover/"
 *      "/bn/" -> "/"
 *      "/discover/" -> "/discover/"
 */
export function stripLocaleFromPath(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalized.split('/').filter(Boolean);

  if (segments.length > 0 && isSupportedLocale(segments[0])) {
    const remaining = segments.slice(1);
    return remaining.length > 0 ? `/${remaining.join('/')}/` : '/';
  }

  return normalized.endsWith('/') || normalized === '/' ? normalized : `${normalized}/`;
}

/**
 * Extracts the current locale from a URL or pathname.
 */
export function getLocaleFromUrl(url: URL | string): SupportedLocale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && isSupportedLocale(segments[0])) {
    return segments[0];
  }

  return DEFAULT_LOCALE;
}

/**
 * Builds the localized URL path for a given target locale from any existing path.
 */
export function getLocalizedPath(pathname: string, targetLocale: SupportedLocale): string {
  const basePath = stripLocaleFromPath(pathname);

  if (targetLocale === DEFAULT_LOCALE) {
    return basePath;
  }

  const cleanBase = basePath.startsWith('/') ? basePath.slice(1) : basePath;
  return `/${targetLocale}/${cleanBase}`.replace(/\/+/g, '/');
}

export interface AlternateLink {
  locale: string;
  hreflang: string;
  href: string;
}

/**
 * Generates canonical URL and hreflang links for a given path.
 */
export function getAlternateLinks(pathname: string, siteUrl: string = 'https://clickfornothing.com'): {
  canonicalUrl: string;
  currentLocale: SupportedLocale;
  alternates: AlternateLink[];
} {
  const currentLocale = getLocaleFromUrl(pathname);
  const basePath = stripLocaleFromPath(pathname);
  const normalizedSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

  const currentLocalizedPath = getLocalizedPath(basePath, currentLocale);
  const canonicalUrl = `${normalizedSiteUrl}${currentLocalizedPath}`;

  const alternates: AlternateLink[] = [
    {
      locale: 'x-default',
      hreflang: 'x-default',
      href: `${normalizedSiteUrl}${basePath}`,
    },
    ...SUPPORTED_LOCALES.map((locale) => ({
      locale,
      hreflang: locale,
      href: `${normalizedSiteUrl}${getLocalizedPath(basePath, locale)}`,
    })),
  ];

  return {
    canonicalUrl,
    currentLocale,
    alternates,
  };
}
