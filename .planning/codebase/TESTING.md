---
last_mapped_commit: a859ca728332649010db0fc73e065c412bf32ad7
last_mapped_at: 2026-11-22
---
# Testing Standards & Current State

**Analysis Date:** 2026-11-22

## Current State

- **Automated Test Runners:** Currently, there is no automated unit test runner (such as Vitest, Jest, or Mocha) or end-to-end testing suite (such as Playwright or Cypress) configured in `package.json`.
- **Scripts Available:**
  - `npm run dev`: Starts Astro local development server.
  - `npm run build`: Runs `astro build` to compile the static application and validate TypeScript compilation and Astro syntax across all pages and 16 locales.
  - `npm run preview`: Previews the statically compiled output locally.
  - `npm run deploy`: Builds the application and executes `wrangler deploy` to publish to Cloudflare.
- **Operational Verification Scripts:**
  - `scripts/test_db.mjs`: Tests connectivity and performs basic queries against Neon PostgreSQL database using configured credentials in `.env`.
  - `scripts/init_db.mjs`: Validates schema creation and migration execution against the database.
  - `scripts/review_submission.mjs`: Tests programmatic updating of submission review statuses.

## Recommended Testing Architecture for GSD Phases

To establish rigorous spec-driven validation across future phases:

1. **Unit Testing (Vitest):**
   - Install `vitest` for fast ESM unit testing.
   - Target pure functions:
     - `functions/api/_db.ts`: `validateUrl`, `sanitizeText`.
     - `src/i18n/routing.ts`: Path prefixing, locale normalization, route generation.
     - `src/i18n/index.ts`: Verification that all 16 JSON locale files contain complete, matching translation keys.

2. **Integration Testing (Miniflare / Cloudflare Pool):**
   - Use `@cloudflare/vitest-pool-workers` to run integration tests against `functions/api/` handlers and `src/worker.ts` with mocked Neon and Clerk endpoints.

3. **End-to-End Testing (Playwright):**
   - Test critical user journeys:
     - Website submission flow (authenticated vs unauthenticated redirect).
     - Language switching functionality and persistent locale storage.
     - Search and category filtering.
