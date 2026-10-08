import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import clerk from '@clerk/astro';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './src/i18n/config';

const mode = process.env.NODE_ENV || 'development';
const env = loadEnv(mode, process.cwd(), '');
const publishableKey = process.env.PUBLIC_CLERK_PUBLISHABLE_KEY || env.PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    'PUBLIC_CLERK_PUBLISHABLE_KEY is required at build time. Configure it in Cloudflare Builds > Variables and secrets.'
  );
}

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
