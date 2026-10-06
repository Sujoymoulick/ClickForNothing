export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_LOCALES = [
  'en',
  'bn',
  'hi',
  'es',
  'pt',
  'fr',
  'de',
  'it',
  'ja',
  'ko',
  'zh',
  'ar',
  'ru',
  'tr',
  'id',
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const NON_DEFAULT_LOCALES = SUPPORTED_LOCALES.filter(
  (locale): locale is Exclude<SupportedLocale, typeof DEFAULT_LOCALE> => locale !== DEFAULT_LOCALE
);

export interface LocaleMeta {
  code: SupportedLocale;
  name: string;        // Native display name
  englishName: string; // English name
  dir: 'ltr' | 'rtl';
  flag: string;
}

export const LOCALES_META: Record<SupportedLocale, LocaleMeta> = {
  en: {
    code: 'en',
    name: 'English',
    englishName: 'English',
    dir: 'ltr',
    flag: '🌐',
  },
  bn: {
    code: 'bn',
    name: 'বাংলা',
    englishName: 'Bengali',
    dir: 'ltr',
    flag: '🇧🇩',
  },
  hi: {
    code: 'hi',
    name: 'हिन्दी',
    englishName: 'Hindi',
    dir: 'ltr',
    flag: '🇮🇳',
  },
  es: {
    code: 'es',
    name: 'Español',
    englishName: 'Spanish',
    dir: 'ltr',
    flag: '🇪🇸',
  },
  pt: {
    code: 'pt',
    name: 'Português',
    englishName: 'Portuguese',
    dir: 'ltr',
    flag: '🇵🇹',
  },
  fr: {
    code: 'fr',
    name: 'Français',
    englishName: 'French',
    dir: 'ltr',
    flag: '🇫🇷',
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    englishName: 'German',
    dir: 'ltr',
    flag: '🇩🇪',
  },
  it: {
    code: 'it',
    name: 'Italiano',
    englishName: 'Italian',
    dir: 'ltr',
    flag: '🇮🇹',
  },
  ja: {
    code: 'ja',
    name: '日本語',
    englishName: 'Japanese',
    dir: 'ltr',
    flag: '🇯🇵',
  },
  ko: {
    code: 'ko',
    name: '한국어',
    englishName: 'Korean',
    dir: 'ltr',
    flag: '🇰🇷',
  },
  zh: {
    code: 'zh',
    name: '中文',
    englishName: 'Chinese',
    dir: 'ltr',
    flag: '🇨🇳',
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    englishName: 'Arabic',
    dir: 'rtl',
    flag: '🇸🇦',
  },
  ru: {
    code: 'ru',
    name: 'Русский',
    englishName: 'Russian',
    dir: 'ltr',
    flag: '🇷🇺',
  },
  tr: {
    code: 'tr',
    name: 'Türkçe',
    englishName: 'Turkish',
    dir: 'ltr',
    flag: '🇹🇷',
  },
  id: {
    code: 'id',
    name: 'Bahasa Indonesia',
    englishName: 'Indonesian',
    dir: 'ltr',
    flag: '🇮🇩',
  },
};

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function getLocaleDirection(locale: string): 'ltr' | 'rtl' {
  if (isSupportedLocale(locale)) {
    return LOCALES_META[locale].dir;
  }
  return 'ltr';
}
