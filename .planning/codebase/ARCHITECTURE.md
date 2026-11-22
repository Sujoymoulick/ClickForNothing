---
last_mapped_commit: a859ca728332649010db0fc73e065c412bf32ad7
last_mapped_at: 2026-11-22
---
# System Architecture

**Analysis Date:** 2026-11-22

## Architectural Pattern

**Hybrid Jamstack (SSG + Edge API):**
- **Static Generation (Astro):** Content-heavy marketing and directory pages (websites list, category overviews, collections, articles, legal pages) are pre-rendered statically to static HTML (`output: 'static'`) across 16 languages at build time.
- **Serverless Edge Functions (Cloudflare):** Dynamic interactive workflows (user authentication checks, website submissions, admin review, live interaction tracking) are processed through Cloudflare Pages Functions and `src/worker.ts`.
- **Serverless PostgreSQL (Neon):** Managed cloud database accessed directly from edge workers using connection-pooled HTTP queries via `@neondatabase/serverless`.

## Architectural Layers

```
┌────────────────────────────────────────────────────────┐
│                   Client Browser                       │
│    (HTML + CSS Neo-Brutalism + Three.js + Clerk UI)    │
└───────────┬────────────────────────────────┬───────────┘
            │ Static Assets / Pages          │ Dynamic API Calls
            ▼                                ▼
┌───────────────────────┐        ┌───────────────────────┐
│ Cloudflare CDN Edge   │        │ Cloudflare Worker API │
│ (dist/ Assets & HTML) │        │   (src/worker.ts)     │
└───────────────────────┘        └───────────┬───────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
            ┌─────────────────────┐                     ┌─────────────────────┐
            │   Clerk Auth API    │                     │  Neon PostgreSQL    │
            │ (Session Validation)│                     │ (Submissions & Data)│
            └─────────────────────┘                     └─────────────────────┘
```

### 1. Presentation & Templating Layer
- **Layouts (`src/layouts/`):** `SiteLayout.astro` wraps all pages, injecting global metadata, favicon links, Google/schema tags, the Neo-brutalist stylesheet (`src/styles/site.css`), header (`src/components/SiteHeader.astro`), footer (`src/components/SiteFooter.astro`), and decorative layers (`src/components/MemeDecoLayer.astro`).
- **Views (`src/views/`):** Decouples view logic from Astro page routes. Page files in `src/pages/` delegate directly to corresponding views (e.g., `HomeView.astro`, `DiscoverView.astro`, `SubmitView.astro`, `DashboardView.astro`).
- **Styling (`src/styles/site.css`):** Neo-brutalist design system featuring high-contrast borders (`3px solid #000`), bold drop shadows (`box-shadow: 4px 4px 0 #000`), vibrant background gradients, badge decals, and responsive typography.

### 2. Internationalization & Routing Layer
- **Locale Routing (`src/i18n/`):** Configured in `astro.config.mjs` and `src/i18n/config.ts`. Supports 16 languages: `en` (default, no prefix), `ar`, `bn`, `de`, `es`, `fr`, `hi`, `id`, `it`, `ja`, `ko`, `pt`, `ru`, `tr`, `zh`.
- **Route Delegation:** `src/pages/[locale]/` routes mirror top-level routes (`src/pages/`), passing active locale parameters into views and dictionary lookups.

### 3. API & Edge Functions Layer
- **Worker Hub (`src/worker.ts`):** Central entry point configured in `wrangler.jsonc` intercepting `/api/*` routes and dispatching them to respective handlers with CORS and method restrictions.
- **Handlers (`functions/api/`):**
  - `submit.ts`: Handles website submission creation with authentication requirement, sanitization, and URL normalization.
  - `submissions.ts`: Allows user retrieval of their submitted websites or administrative moderation (updating status to `approved` or `rejected`).
  - `published.ts`: Returns approved submissions for dynamic inclusion in the public directory.
  - `interactions.ts`: Records views and upvotes/loves for individual websites.

### 4. Data Access & Security Layer
- **Database Connection (`functions/api/_db.ts`):** Instantiates `@neondatabase/serverless` client. Exports `logServerError` to safely sanitize logs, `sanitizeText` for stored XSS prevention, and `validateUrl` for strict protocol validation (`http:`/`https:` only, blocking `javascript:` and `data:` schemes).
- **Authentication Service (`functions/api/_auth.ts`):** Encapsulates JWT verification using `@clerk/backend`, supporting bearer tokens and cookie extraction.

## Key Entry Points

- `astro.config.mjs`: Astro build definition, Clerk plugin registration, i18n configuration.
- `src/worker.ts`: Cloudflare worker routing entry point for `/api` requests and asset fallbacks.
- `src/pages/index.astro`: Main application homepage entry point for default locale.
- `src/pages/[locale]/index.astro`: Localized homepage entry point.
- `scripts/init_db.mjs`: Database schema migration and index initialization script.
