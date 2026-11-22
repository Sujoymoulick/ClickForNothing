---
last_mapped_commit: a859ca728332649010db0fc73e065c412bf32ad7
last_mapped_at: 2026-11-22
---
# Coding Conventions & Patterns

**Analysis Date:** 2026-11-22

## Language & Module Standards

- **TypeScript Strictness:** Strict typing across API functions, data definitions, and worker files. Shared interfaces define request bodies, database rows, and authenticated user contexts.
- **ES Modules:** Complete ESM standard (`"type": "module"` in `package.json`). All file imports use explicit extensions or standardized module names.
- **Astro Component Pattern:**
  - Frontmatter component scripts (`---`) handle parameter extraction, translation resolution, and static data imports.
  - Template markup follows semantic HTML standards.
  - Component props are strictly typed via TypeScript `interface Props { ... }`.

## Naming Conventions

- **Components & Views:** PascalCase (e.g., `SiteHeader.astro`, `DashboardView.astro`, `LocaleSwitcher.astro`).
- **Utility & Script Files:** camelCase (e.g., `_auth.ts`, `_db.ts`, `memeMovement.ts`, `socialShare.ts`).
- **Constants:** UPPER_SNAKE_CASE (e.g., `DEFAULT_LOCALE`, `SUPPORTED_LOCALES`).
- **Database Tables & Columns:** snake_case (e.g., `website_submissions`, `user_id`, `created_at`, `reviewed_at`).
- **URL Routes & Slugs:** kebab-case (e.g., `/api/submissions`, `random-category`, `terms-of-service`).

## Data Validation & Security Practices

- **Strict URL Validation (`functions/api/_db.ts`):**
  - Requires `http:` or `https:` protocol.
  - Rejects URLs longer than 2048 characters.
  - Specifically prevents `javascript:` or `data:` pseudo-protocols.
- **XSS Sanitization:** `sanitizeText` helper escapes raw user strings (`&`, `<`, `>`, `"`, `'`) before storage.
- **Credential Protection in Logs:** `logServerError(context, error)` logs only `error.name` or generic type names, strictly avoiding output of full error objects which might leak database connection strings or secrets.
- **Session Verification:** `getAuthenticatedUser` parses both `Authorization: Bearer <token>` and `Cookie: __session`, verifying against Clerk's backend with authorized party checks in production.

## Git Commit Style

- Follows the **Conventional Commits** specification:
  - `feat: ...` for new functional capabilities.
  - `fix: ...` or `fix(scope): ...` for bug fixes (e.g., `fix(seo): ...`, `fix(directory): ...`).
  - `perf: ...` for performance and payload optimizations.
