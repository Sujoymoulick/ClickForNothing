import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from './config';
import enDict from './en.json';

const cache = new Map<string, Record<string, any>>();
cache.set(DEFAULT_LOCALE, enDict);

// Lazy loaders for non-English locales so we only load the active locale during rendering
const loaders: Record<string, () => Promise<{ default: Record<string, any> }>> = {
  bn: () => import('./bn.json'),
  hi: () => import('./hi.json'),
  es: () => import('./es.json'),
  pt: () => import('./pt.json'),
  fr: () => import('./fr.json'),
  de: () => import('./de.json'),
  it: () => import('./it.json'),
  ja: () => import('./ja.json'),
  ko: () => import('./ko.json'),
  zh: () => import('./zh.json'),
  ar: () => import('./ar.json'),
  ru: () => import('./ru.json'),
  tr: () => import('./tr.json'),
  id: () => import('./id.json'),
};

function getNestedValue(obj: Record<string, any>, path: string): string | undefined {
  if (path in obj && typeof obj[path] === 'string') {
    return obj[path];
  }
  const parts = path.split('.');
  let current: any = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

export async function loadLocaleDictionary(locale: string): Promise<Record<string, any>> {
  if (!isSupportedLocale(locale)) {
    return enDict;
  }
  if (cache.has(locale)) {
    return cache.get(locale)!;
  }
  const loader = loaders[locale];
  if (!loader) {
    return enDict;
  }
  try {
    const mod = await loader();
    cache.set(locale, mod.default);
    return mod.default;
  } catch (err) {
    console.warn(`[i18n] Failed to load locale dictionary for "${locale}":`, err);
    return enDict;
  }
}

export type TranslateFn = (key: string, vars?: Record<string, string | number>) => string;

export async function useTranslations(locale: string = DEFAULT_LOCALE): Promise<{
  t: TranslateFn;
  locale: SupportedLocale;
  dict: Record<string, any>;
}> {
  const currentLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const dict = currentLocale === DEFAULT_LOCALE ? enDict : await loadLocaleDictionary(currentLocale);

  const t: TranslateFn = (key: string, vars?: Record<string, string | number>): string => {
    let text = getNestedValue(dict, key) ?? getNestedValue(enDict, key) ?? key;
    if (vars) {
      for (const [vKey, vVal] of Object.entries(vars)) {
        text = text.replace(new RegExp(`\\{${vKey}\\}`, 'g'), String(vVal));
      }
    }
    return text;
  };

  return { t, locale: currentLocale, dict };
}
