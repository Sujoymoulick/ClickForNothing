# ClickForNothing — Production Architecture, Tech Stack & Connections

This document details the complete production architecture, authentication setup, database schemas, API routes, and operational workflows for **ClickForNothing** (`clickfornothing.com`).

---

## 1. System Architecture Overview

```
                      ┌──────────────────────────────────────────────┐
                      │              USER / CLIENT BROWSER           │
                      └───────┬──────────────────────────────┬───────┘
                              │                              │
                    Session Auth / JWT                 HTTPS Requests
                              │                              │
                              ▼                              ▼
                 ┌─────────────────────────┐    ┌──────────────────────────┐
                 │     Clerk Production    │    │  Cloudflare Pages / Edge │
                 │ (pk_live_... / sk_live) │    │      Astro Static +      │
                 └─────────────────────────┘    │  Cloudflare Edge Functs  │
                                                └────────────┬─────────────┘
                                                             │
                                                   Direct SQL Connection
                                                   (Serverless Pooled)
                                                             │
                                                             ▼
                                                ┌──────────────────────────┐
                                                │      Neon PostgreSQL     │
                                                │   Project: clickfornothing│
                                                │ (rough-glitter-85555328) │
                                                └──────────────────────────┘
```

---

## 2. Tech Stack Details

| Component | Technology | Version / Spec | Role |
| :--- | :--- | :--- | :--- |
| **Framework** | [Astro](https://astro.build/) | `^5.7.0` | High-performance static site generator + multi-locale routing |
| **Authentication** | [Clerk](https://clerk.com/) | `@clerk/astro ^4.1.10`, `@clerk/backend` | Production user authentication (Google, GitHub, Email OTP) |
| **Database** | [Neon](https://neon.tech/) | Lakebase Postgres v18 | Serverless PostgreSQL with autoscaling and branching |
| **Database Driver** | `@neondatabase/serverless` | `^1.2.0` | Ultra-fast HTTP/WebSocket connection to Neon |
| **API Runtime** | Cloudflare Pages Functions | Node / V8 Edge compatible | Handles `/api/submit`, `/api/submissions`, `/api/published` |
| **Styling** | Custom Neo-Brutalist CSS | Responsive, CSS variables | Retro stickers, vibrant gradients, pixel decals |
| **Deployment** | Cloudflare Pages | `wrangler pages deploy` | Global CDN edge hosting |

---

## 3. Neon Database Configuration

* **Project Name**: `clickfornothing`
* **Project ID**: `rough-glitter-85555328`
* **Organization ID**: `org-weathered-glade-47403569`
* **Default Branch**: `main` (Branch ID: `br-damp-pine-b4xhigpu`)
* **Region**: AWS `us-east-2` (Ohio)
* **PostgreSQL Version**: 18
* **Compute Scaling**: 0.25 CU min — 0.25 CU max (auto-suspend enabled)

### Database Table Schema: `website_submissions`

```sql
CREATE TABLE IF NOT EXISTS website_submissions (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  user_id VARCHAR(255),
  user_email VARCHAR(255),
  user_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending_review',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  rejection_reason TEXT,
  thumbnail_url TEXT,
  preview_info JSONB
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_submissions_status ON website_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON website_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON website_submissions(created_at DESC);
```

---

## 4. Review Status System & Lifecycle

Every submitted website progresses through a strict, transparent lifecycle:

```text
User Submits Website
         │
         ▼
   pending_review  (Saved in Neon immediately; status: "Under Review")
         │
         ├───────────────────────────────┐
         ▼                               ▼
      approved                        rejected
  (Admin approves)             (Rejection reason saved)
         │
         ▼
     published
(Appears publicly in directory)
```

### Status Descriptions & UI Displays:
* `pending_review`:
  * **Badge**: Under Review (Amber retro badge with pulsing dot)
  * **Subtitle**: `Submitted <Date>`
* `approved`:
  * **Badge**: Approved (Cyan / Blue badge)
  * **Subtitle**: `Publishing soon`
* `published`:
  * **Badge**: Published (Green badge)
  * **Action**: `View Site →`
* `rejected`:
  * **Badge**: Rejected (Red badge)
  * **Action**: `View reason` (Opens dialog with reviewer feedback)

---

## 5. Security & Authentication Model

1. **Client Never Dictates Ownership**:
   * The client request body never determines `user_id`.
   * Cloudflare Pages Functions extract the session token from `Authorization: Bearer <token>` or `Cookie: __session`.
   * Server validates the token against Clerk using `@clerk/backend` `verifyToken(token, { secretKey })`.
   * The verified `sub` claim is used as `user_id`.
2. **User Submissions Scoping**:
   * `/api/submissions` queries `WHERE user_id = ${authUser.userId}` exclusively.
   * Users cannot query or view other users' submissions.
3. **Admin Actions Guarded**:
   * Status modifications (`approved`, `published`, `rejected`) require either:
     - Header `x-admin-key: <ADMIN_SECRET_KEY>`, OR
     - Clerk user session claim `role === 'admin'`.
4. **Input Sanitization & XSS Protection**:
   * All user text (`name`, `description`, `category`) is escaped and sanitized on the server before storage.
   * URLs are strictly validated to require `http:` or `https:`. Malicious schemes like `javascript:` or `data:` are rejected.
5. **Sandboxed Website Previews**:
   * Iframes are isolated with strict HTML sandboxing (`sandbox=""`) and `pointer-events: none` to prevent clickjacking, script execution, or style bleeding into the dashboard.
   * Fallback cards with retro browser headers and domain badges are displayed when embedding is blocked or unsafe.

---

## 6. API Endpoints

### `POST /api/submit`
* **Auth**: Required (Clerk session token)
* **Payload**:
  ```json
  {
    "url": "https://example.com",
    "name": "My Useless Site",
    "description": "Explains why it exists in 10-300 characters",
    "category": "silly-animals"
  }
  ```
* **Response** (HTTP 201):
  ```json
  {
    "success": true,
    "message": "Submission received and queued for review.",
    "submission": {
      "id": 1,
      "url": "https://example.com",
      "name": "My Useless Site",
      "category": "silly-animals",
      "status": "pending_review",
      "submitted_at": "2026-10-07T16:30:00Z"
    }
  }
  ```

### `GET /api/submissions`
* **Auth**: Required (Clerk session token)
* **Returns**: Submissions belonging strictly to the authenticated user.
* **Response** (HTTP 200):
  ```json
  {
    "success": true,
    "userId": "user_2...",
    "submissions": [...]
  }
  ```

### `PATCH /api/submissions`
* **Auth**: Admin only (`x-admin-key` or Clerk admin role)
* **Payload**:
  ```json
  {
    "id": 1,
    "status": "published",
    "rejection_reason": null
  }
  ```

### `GET /api/published`
* **Auth**: Public
* **Returns**: All published community submissions to display in the website directory.

---

## 7. Submission Workflow & Confirmation Popup

When a user submits via `/submit/`:
1. Submission is stored in Neon with `status: 'pending_review'`.
2. A confirmation modal appears immediately:

```text
Submission received

Your website has been submitted for review.
We review every submission to make sure it follows our guidelines.

Maximum review time: 24 hours.

If your website follows our guidelines, it will be published within 24 hours.
```

3. Buttons provide direct access to:
   * **View in My Submissions →** (Navigates to `/dashboard/`)
   * **Close** (Closes modal, persists submission)

---

## 8. User Dashboard (`/dashboard/`)

* **Protected**: Requires Clerk sign-in. Shows empty state if signed out.
* **My Submissions Grid**:
  * Realtime status polling every 12 seconds when the tab is visible.
  * Instant revalidation on window focus and tab visibility change.
  * Filter pills: `All`, `Under Review`, `Approved`, `Published`, `Rejected`.
* **Empty State** (Requirement 13):
  ```text
  No submissions yet

  Submit your first website and track its review
  and publishing status here.
  ```
  Includes CTA button to submit a website.

---

## 9. Environment Variables & Wrangler Configuration

Store these variables in `.env` for local development, and in `wrangler.json` (and Cloudflare Pages Settings) for production deployments:

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "clickfornothing",
  "pages_build_output_dir": "dist",
  "compatibility_date": "2024-09-23",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "vars": {
    "DATABASE_URL": "postgresql://neondb_owner:YOUR_PASSWORD@ep-YOUR-ENDPOINT-pooler.c-6.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
    "DATABASE_URL_UNPOOLED": "postgresql://neondb_owner:YOUR_PASSWORD@ep-YOUR-ENDPOINT.c-6.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
    "NEON_BRANCH": "main",
    "PUBLIC_CLERK_PUBLISHABLE_KEY": "pk_live_YOUR_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY": "sk_live_YOUR_CLERK_SECRET_KEY"
  }
}
```

### Required Cloudflare Pages Environment Variables:
Ensure the following variables are present in Cloudflare Pages Dashboard under **Settings → Environment variables** (for **both Production and Preview**):

| Variable Name | Type | Value / Purpose |
| :--- | :--- | :--- |
| `PUBLIC_CLERK_PUBLISHABLE_KEY` | Plain text | `pk_live_...` (Clerk Frontend API Key) |
| `CLERK_SECRET_KEY` | Secret / Encrypted | `sk_live_...` (Backend verification token for `/api/*`) |
| `DATABASE_URL` | Secret / Encrypted | Neon pooled PostgreSQL connection string |
| `DATABASE_URL_UNPOOLED` | Secret / Encrypted | Neon unpooled connection string |
| `NEON_BRANCH` | Plain text | `main` |
| `NODE_VERSION` | Plain text | `20` or higher |

### Client-Side Variable Security:
* `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, and `CLERK_SECRET_KEY` are server-only credentials used exclusively by Cloudflare Pages Functions (`functions/api/*`).
* They are strictly guarded and never exposed to client-side bundles, HTML, or DevTools inspection.
* Only `PUBLIC_CLERK_PUBLISHABLE_KEY` is public by design for browser client Clerk authentication.
* Cloudflare Pages Functions sanitize all error messages returned to the client to prevent leaking internal database schemas or connection strings.


---

## 10. CLI Management Scripts

### Review and Publish Submissions via Terminal
Run the included review tool:
```bash
# List all submissions
node scripts/review_submission.mjs list

# Approve a submission
node scripts/review_submission.mjs approve <id>

# Publish a submission
node scripts/review_submission.mjs publish <id>

# Reject a submission with reason
node scripts/review_submission.mjs reject <id> "Does not meet site standards"
```

### Build & Deploy
```bash
# Build static pages
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```
