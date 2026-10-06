import { defineConfig } from 'astro/config';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './src/i18n/config';

export default defineConfig({
  site: 'https://clickfornothing.com',
  output: 'static',
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...SUPPORTED_LOCALES],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
