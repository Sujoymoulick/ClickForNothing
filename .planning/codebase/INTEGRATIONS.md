---
last_mapped_commit: a859ca728332649010db0fc73e065c412bf32ad7
last_mapped_at: 2026-11-22
---
# External Integrations

**Analysis Date:** 2026-11-22

## Authentication Provider

**Clerk:**
- **Role:** Handles user authentication, registration, sign-in, and OAuth flows (Google, GitHub, email one-time passcode).
- **Client Integration:** `@clerk/astro` integration registered in `astro.config.mjs`. Frontend views render Clerk components across `src/pages/[locale]/sign-in.astro`, `sign-up.astro`, and `login.astro`.
- **Backend Verification:** `functions/api/_auth.ts` validates Clerk JWT session tokens either from the `Authorization: Bearer <token>` header or the `__session` cookie. Validates `authorizedParties` (`clickfornothing.com`) in production environments.
- **Environment Keys:**
  - `PUBLIC_CLERK_PUBLISHABLE_KEY`: Public client key, injected at build time via `astro.config.mjs`.
  - `CLERK_SECRET_KEY`: Server-only edge secret used by `functions/api/_auth.ts` for token verification.

## Database & Data Storage

**Neon PostgreSQL (Lakebase Postgres v18):**
- **Role:** Primary persistent database storing submitted websites, review status, interaction metrics (views and loves), and card designs.
- **Connection Model:** Uses `@neondatabase/serverless` connection pooling (`functions/api/_db.ts`) executing queries over HTTP/WebSockets to prevent connection exhaustion in serverless edge runtimes.
- **Main Tables:**
  - `website_submissions`: Stores submitted links, user references, category, review status (`pending`, `approved`, `rejected`), design theme, preview metadata, and timestamps.
- **Environment Keys:**
  - `DATABASE_URL`: Server-only pooled PostgreSQL connection string with SSL (`sslmode=require&channel_binding=require`).

## Edge Hosting & CDN

**Cloudflare Pages & Workers:**
- **Role:** Global edge network serving static HTML/assets and running serverless API routes.
- **Assets & Worker Integration:** Defined in `wrangler.jsonc` with `"run_worker_first": ["/api", "/api/*"]` routing API calls through `src/worker.ts`, while falling back to static assets (`./dist`) via `env.ASSETS.fetch(request)`.
- **API Endpoints:**
  - `/api/submit`: `POST` endpoint for authenticated users submitting websites for review.
  - `/api/submissions`: `GET`, `PUT`, `PATCH` endpoints for fetching user submissions or performing admin reviews.
  - `/api/published`: `GET` endpoint for querying approved and published websites to display in directories.
  - `/api/interactions`: `GET` and `POST` endpoints tracking user engagement (views, loves).

## Administrative Access

**Admin Secret Header:**
- **Role:** Auxiliary administrator override for moderation endpoints (`functions/api/submissions.ts`).
- **Mechanism:** Accepts `x-admin-key` header matching `ADMIN_SECRET_KEY` environment variable as a fallback to Clerk admin user claims.
