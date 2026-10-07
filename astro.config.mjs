import { defineConfig } from 'astro/config';
import clerk from '@clerk/astro';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './src/i18n/config';

export default defineConfig({
  integrations: [clerk()],
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
