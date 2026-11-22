---
last_mapped_commit: a859ca728332649010db0fc73e065c412bf32ad7
last_mapped_at: 2026-11-22
---
# Codebase Concerns & Technical Debt

**Analysis Date:** 2026-11-22

## Technical Debt & Architecture Risks

### 1. Absence of Automated Test Suite
- **Severity:** High
- **Issue:** No CI or local test suite (`npm test`) exists. Changes to critical endpoints (`/api/submit`, `/api/submissions`), routing logic, or data structures must be manually verified or rely solely on `astro build` compilation.
- **Remediation:** Introduce Vitest for unit and integration testing of validation and API handlers.

### 2. Dual Routing Layer Maintenance
- **Severity:** Medium
- **Issue:** Cloudflare Pages Functions are implemented under `functions/api/`, but `src/worker.ts` also re-implements route dispatching and method checking for the same endpoints for Wrangler deployments.
- **Risk:** Adding or changing an endpoint in `functions/api/` without updating `src/worker.ts` can cause discrepancies between Pages preview and Worker deployments.
- **Remediation:** Consolidate routing definitions or establish a single source of truth router.

### 3. Build-Time Authentication Dependency
- **Severity:** Medium
- **Issue:** `astro.config.mjs` explicitly checks for `PUBLIC_CLERK_PUBLISHABLE_KEY` and throws an error during production builds if it is missing:
  ```javascript
  if (isProductionBuild && !publishableKey) {
    throw new Error('PUBLIC_CLERK_PUBLISHABLE_KEY is required at build time...');
  }
  ```
- **Risk:** CI builds or preview environments without explicit production env flags configured will fail to build.

### 4. Internationalization Key Parity & Maintenance
- **Severity:** Medium
- **Issue:** 16 separate language dictionaries exist (`src/i18n/*.json`). Adding or modifying UI strings in English requires corresponding updates in 15 other files.
- **Risk:** Missing translation keys cause UI fallbacks or missing text.
- **Remediation:** Add an automated validation test ensuring all dictionaries mirror `en.json` keys.

### 5. Serverless Database Connection Scaling
- **Severity:** Low / Operational
- **Issue:** Edge functions connect to Neon PostgreSQL. While `@neondatabase/serverless` uses HTTP pooling, high concurrency spikes could exhaust connection pools if direct unpooled connection strings are mistakenly configured instead of the `-pooler` endpoint.
- **Guidance:** Maintain `-pooler` connection strings as indicated in `.env.example`.
