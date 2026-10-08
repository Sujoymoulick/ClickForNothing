import { getAuthenticatedUser } from './_auth';
import { getDb, logServerError, sanitizeText, validateUrl } from './_db';

interface Env {
  DATABASE_URL?: string;
  CLERK_SECRET_KEY?: string;
  ADMIN_SECRET_KEY?: string;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;

    // 1. Authenticate user server-side using Clerk session
    const authUser = await getAuthenticatedUser(request, env);
    if (!authUser || !authUser.userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Please sign in to view your submissions.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sql = getDb(env);

    // 2. Fetch submissions strictly belonging to the authenticated Clerk userId
    const rows = await sql`
      SELECT
        id,
        url,
        name,
        description,
        category,
        status,
        submitted_at,
        reviewed_at,
        published_at,
        rejection_reason,
        thumbnail_url,
        preview_info,
        created_at,
        updated_at
      FROM website_submissions
      WHERE user_id = ${authUser.userId}
      ORDER BY created_at DESC;
    `;

    return new Response(
      JSON.stringify({
        success: true,
        submissions: rows,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    logServerError('Error fetching user submissions.', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve submissions. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/** Owner-only editing. Identity fields are protected by the status predicate in SQL,
 * so a forged dashboard request cannot change an approved/published project. */
export async function onRequestPut(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const authUser = await getAuthenticatedUser(request, env);
    if (!authUser?.userId) return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const body = await request.json() as { id?: number; name?: string; url?: string; description?: string; category?: string; theme?: string; thumbnail_url?: string | null; editThemeOnly?: boolean };
    if (!Number.isSafeInteger(body.id)) return new Response(JSON.stringify({ error: 'Submission ID is required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const sql = getDb(env);
    const allowedThemes = ['cream', 'pink', 'cyan', 'purple'];
    const theme = allowedThemes.includes(body.theme || '') ? body.theme! : 'cream';
    if (body.editThemeOnly) {
      const rows = await sql`
        UPDATE website_submissions
        SET preview_info = COALESCE(preview_info, '{}'::jsonb) || ${JSON.stringify({ theme })}::jsonb, updated_at = NOW()
        WHERE id = ${body.id} AND user_id = ${authUser.userId} AND status IN ('approved', 'published')
        RETURNING id, url, name, description, category, status, submitted_at, reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info, created_at, updated_at;
      `;
      if (!rows.length) return new Response(JSON.stringify({ error: 'Submission not found.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      return new Response(JSON.stringify({ success: true, submission: rows[0] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    if (!body.name || !body.url || !body.description || !body.category) return new Response(JSON.stringify({ error: 'Complete all required fields.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const checkedUrl = validateUrl(body.url);
    if (!checkedUrl.valid || !checkedUrl.normalized) return new Response(JSON.stringify({ error: checkedUrl.error || 'Invalid URL.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const thumbnail = body.thumbnail_url?.trim() || null;
    if (thumbnail && (!validateUrl(thumbnail).valid || thumbnail.length > 2048)) return new Response(JSON.stringify({ error: 'Preview image must be a valid http(s) URL.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const rows = await sql`
      UPDATE website_submissions
      SET name = ${sanitizeText(body.name.trim().slice(0, 100))},
          url = ${checkedUrl.normalized},
          description = ${sanitizeText(body.description.trim().slice(0, 500))},
          category = ${sanitizeText(body.category.trim().slice(0, 50))},
          thumbnail_url = ${thumbnail},
          preview_info = COALESCE(preview_info, '{}'::jsonb) || ${JSON.stringify({ theme })}::jsonb,
          updated_at = NOW()
      WHERE id = ${body.id} AND user_id = ${authUser.userId} AND status NOT IN ('approved', 'published')
      RETURNING id, url, name, description, category, status, submitted_at, reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info, created_at, updated_at;
    `;
    if (!rows.length) return new Response(JSON.stringify({ error: 'Submission not found, or its approved project identity is locked.' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    return new Response(JSON.stringify({ success: true, submission: rows[0] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    logServerError('Error editing submission.', error);
    return new Response(JSON.stringify({ error: 'Failed to save submission changes.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function onRequestPatch(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;

    // Admin authentication: either admin key header or Clerk admin role
    const adminKey = request.headers.get('x-admin-key');
    const expectedAdminKey = env.ADMIN_SECRET_KEY;

    let isAdmin = Boolean(expectedAdminKey && adminKey === expectedAdminKey);

    if (!isAdmin) {
      const authUser = await getAuthenticatedUser(request, env);
      const role =
        authUser?.claims?.role ||
        authUser?.claims?.org_role ||
        authUser?.claims?.public_metadata?.role;
      if (role === 'admin') {
        isAdmin = true;
      }
    }

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Forbidden. Admin privileges required.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json() as {
      id: number;
      status: 'pending_review' | 'approved' | 'published' | 'rejected';
      rejection_reason?: string;
    };

    const { id, status, rejection_reason } = body;
    if (!Number.isSafeInteger(id) || id <= 0 || !status) {
      return new Response(
        JSON.stringify({ error: 'Missing submission id or status.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const validStatuses = ['pending_review', 'approved', 'published', 'rejected'];
    if (!validStatuses.includes(status)) {
      return new Response(
        JSON.stringify({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sql = getDb(env);

    let result;
    if (status === 'published') {
      result = await sql`
        UPDATE website_submissions
        SET
          status = 'published',
          published_at = NOW(),
          reviewed_at = COALESCE(reviewed_at, NOW()),
          rejection_reason = NULL,
          updated_at = NOW()
        WHERE id = ${id} AND status <> 'rejected'
        RETURNING id, url, name, description, category, status, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason;
      `;
    } else if (status === 'approved') {
      result = await sql`
        UPDATE website_submissions
        SET
          status = 'published',
          reviewed_at = NOW(),
          published_at = COALESCE(published_at, NOW()),
          rejection_reason = NULL,
          updated_at = NOW()
        WHERE id = ${id} AND status NOT IN ('approved', 'published', 'rejected')
        RETURNING id, url, name, description, category, status, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason;
      `;
    } else if (status === 'rejected') {
      const reason = sanitizeText(rejection_reason || 'Does not meet guidelines');
      result = await sql`
        UPDATE website_submissions
        SET
          status = 'rejected',
          reviewed_at = NOW(),
          rejection_reason = ${reason},
          updated_at = NOW()
        WHERE id = ${id} AND status NOT IN ('approved', 'published')
        RETURNING id, url, name, description, category, status, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason;
      `;
    } else {
      result = await sql`
        UPDATE website_submissions
        SET
          status = 'pending_review',
          updated_at = NOW()
        WHERE id = ${id} AND status NOT IN ('approved', 'published')
        RETURNING id, url, name, description, category, status, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason;
      `;
    }

    if (!result || result.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Submission not found.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, submission: result[0] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    logServerError('Error updating submission status.', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update submission status.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
