---
last_mapped_commit: a859ca728332649010db0fc73e065c412bf32ad7
last_mapped_at: 2026-11-22
---
# Technology Stack

**Analysis Date:** 2026-11-22

## Languages

**Primary:**
- TypeScript (`^5.0.0`) - Used across API functions (`functions/api/`), edge worker (`src/worker.ts`), i18n configurations (`src/i18n/config.ts`), and static datasets (`src/data/`).
- Astro (`.astro`) - Used for UI components (`src/components/`), layout templates (`src/layouts/`), views (`src/views/`), and page routes (`src/pages/`).

**Secondary:**
- JavaScript / ESM (`.mjs`, `.js`) - Build tools, migration scripts (`scripts/init_db.mjs`, `scripts/build_dictionaries.mjs`), and configuration files (`astro.config.mjs`).
- Python 3 - Locale generation automation scripts (`scripts/generate_locales.py`, `scripts/build_all_locales.py`).
- CSS3 - Neo-brutalist custom styling with CSS variables (`src/styles/site.css`).

## Runtime

**Environment:**
- Node.js 22.x+ (`.node-version` specifies `22`) - Local development, build process, and script execution.
- Cloudflare Workers / Pages Functions (`compatibility_date: "2026-10-06"`, flags: `nodejs_compat`, `global_fetch_strictly_public`) - Production edge serverless runtime.

**Package Manager:**
- npm - Dependency management (`package-lock.json` present).

## Frameworks

**Core:**
- Astro (`^5.7.0`) - High-performance static site generator with multi-locale routing and custom static output (`output: 'static'`).
- Clerk Astro Integration (`@clerk/astro` `^4.1.10`, `@clerk/backend` `^3.23.0`) - User authentication, session management, and server-side JWT verification.

**Database & Driver:**
- Neon Serverless Postgres v18 (`@neondatabase/serverless` `^1.2.0`, `@neon/config` `^1.8.4`) - HTTP/WebSocket connection pooling to Neon Lakebase Postgres.

**Graphics & Rendering:**
- Three.js (`three` `^0.186.1`) - Procedural 3D animations and meme mascot renderings.

**Build/Dev Tooling:**
- Wrangler (`^4.148.0`) - Cloudflare edge deployment and local preview CLI.
- Vite (`loadEnv` in `astro.config.mjs`) - Bundling and development server engine underlying Astro.

## Key Dependencies

- `astro` (`^5.7.0`): Static generation, multi-lingual routing, template rendering.
- `@clerk/astro` (`^4.1.10`) & `@clerk/backend` (`^3.23.0`): User authentication, OAuth identity handling, JWT verification.
- `@neondatabase/serverless` (`^1.2.0`): Serverless SQL client designed for Cloudflare Workers / V8 edge environments.
- `three` (`^0.186.1`): 3D graphics rendering library for interactive mascot components.
- `wrangler` (`^4.148.0`): Build and deployment pipeline for Cloudflare Pages and Workers.

## Configuration Files

- `astro.config.mjs`: Astro build configuration, Clerk integration, site URL, and i18n routing (16 locales).
- `wrangler.jsonc`: Cloudflare Workers & Pages assets binding, edge compatibility date, and API route prioritization.
- `package.json`: Project manifest, scripts (`dev`, `build`, `preview`, `deploy`), dependency versions.
- `.node-version`: Node version lock (v22).
- `.env.example`: Template for environment variables (`PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `DATABASE_URL`, `ADMIN_SECRET_KEY`).
