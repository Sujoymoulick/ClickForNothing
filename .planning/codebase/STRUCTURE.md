---
last_mapped_commit: a859ca728332649010db0fc73e065c412bf32ad7
last_mapped_at: 2026-11-22
---
# Codebase Directory Structure

**Analysis Date:** 2026-11-22

## Top-Level Layout

```
.
├── .env.example                # Example environment variable template
├── .git/                       # Git repository version control
├── .gitignore                  # Git ignore rules
├── .node-version               # Targeted Node.js engine version (22)
├── astro.config.mjs            # Astro SSG & Clerk & i18n build configuration
├── functions/                  # Cloudflare Pages Functions API implementation
├── neon.ts                     # Database connection helper module
├── package.json                # Project dependencies and script definitions
├── package-lock.json           # Exact dependency lockfile
├── public/                     # Static client-facing assets (images, fonts, sounds)
├── README.md                   # Repository overview
├── scripts/                    # Database migrations and translation utilities
├── skills-lock.json            # Installed skills lockfile
├── src/                        # Astro application source code
├── TECHSTACK_AND_CONNECTIONS.md # Comprehensive production architecture manual
└── wrangler.jsonc              # Cloudflare Workers & Pages deployment configuration
```

## Directory Details

### `src/` (Core Application)
- `components/`: UI building blocks.
  - `SiteHeader.astro`: Top navigation with branding, language switcher, auth buttons.
  - `SiteFooter.astro`: Footer links, copyright, disclaimer.
  - `LocaleSwitcher.astro`: Dropdown/modal for switching among the 16 supported languages.
  - `CookieBanner.astro`: Privacy and cookie consent notice.
  - `PepeMascot.astro`: Interactive 3D mascot rendered via Three.js.
  - `MemeArt.astro`: Dynamic meme styling graphics.
  - `MemeDecoLayer.astro`: Background floating decorative stickers.
  - `FaqSection.astro`: Frequently Asked Questions accordion.
  - `EditorialHeader.astro`: Section banner styling for curation pages.
- `data/`: In-memory static datasets.
  - `websites.ts`: Core curated list of useless/funny websites.
  - `categories.ts`: Directory taxonomy categories with metadata and icons.
  - `collections.ts`: Thematic grouping of sites.
  - `articles.ts`: Editorial review posts and articles.
  - `articleThumbnails.ts`: Image mapping for articles.
  - `cardDesigns.ts`: Theme palette and visual card configurations.
  - `siteMeta.ts`: SEO defaults, OpenGraph tags, title suffixes.
  - `legalPages.js`: Content for Terms of Service, Privacy Policy, and Cookies.
  - `uselessSites.js`: Supplementary website records.
- `i18n/`: Internationalization infrastructure.
  - `config.ts`: Supported locales list and default locale definition.
  - `routing.ts`: Path resolution and URL localization utilities.
  - `index.ts`: Dictionary loader and translation lookup functions.
  - `{locale}.json`: 16 individual translation dictionaries (`en.json`, `es.json`, etc.).
- `layouts/`:
  - `SiteLayout.astro`: Base HTML envelope, head metadata, fonts, styles, body structure.
- `pages/`:
  - `index.astro`, `about.astro`, `dashboard.astro`, `discover.astro`, `search.astro`, `submit.astro`, `login.astro`, `sign-in.astro`, `sign-up.astro`: Default locale routes.
  - `[locale]/`: Localized route variants for all pages and nested sub-paths.
  - `articles/`, `categories/`, `collections/`, `random/`, `sites/`: Sub-directory routing for resource types.
  - `sitemap.xml.ts`: Dynamic sitemap generator covering all locales and static routes.
- `scripts/`: Client-side JavaScript.
  - `memeMovement.ts`: Interactive mouse-tracking physics for stickers and decals.
  - `socialShare.ts`: Web share API and social sharing buttons.
- `styles/`:
  - `site.css`: Complete CSS design system, typography, Neo-brutalist variables.
- `views/`: Reusable page view templates consumed by both root and `[locale]/` page routes.
- `worker.ts`: Cloudflare Worker entry point routing `/api` requests and serving static assets.

### `functions/` (Edge Serverless API)
- `api/`: Cloudflare Pages Functions handlers.
  - `submit.ts`: Handles website submission (`POST /api/submit`).
  - `submissions.ts`: Handles user and admin submission queries/modifications (`GET`, `PUT`, `PATCH /api/submissions`).
  - `published.ts`: Public API for approved websites (`GET /api/published`).
  - `interactions.ts`: Views and loves tracking (`GET`, `POST /api/interactions`).
  - `_auth.ts`: Clerk JWT session verification helper.
  - `_db.ts`: Neon PostgreSQL database connection, error logging, sanitization, and URL validation.
  - `_cardDesigns.ts`: Card theme definitions for submitted sites.

### `scripts/` (Maintenance & Operations)
- `init_db.mjs`: Database schema migration and index creation script.
- `test_db.mjs`: Database connectivity and health check verification script.
- `review_submission.mjs`: CLI utility for approving or rejecting submissions.
- `build_dictionaries.mjs`: Automated dictionary compilation from locale files.
- `generate_locales.py` / `build_all_locales.py`: Python scripts for bulk translation processing.
- `locales/`: Standalone `.mjs` locale definitions.
