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

export async function onRequestPut(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const authUser = await getAuthenticatedUser(request, env);
    if (!authUser?.userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const body = await request.json() as {
      id?: number;
      name?: string;
      url?: string;
      description?: string;
      category?: string;
      theme?: string;
      thumbnail_url?: string | null;
      editThemeOnly?: boolean;
    };

    if (!Number.isSafeInteger(body.id)) {
      return new Response(JSON.stringify({ error: 'Submission ID is required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const sql = getDb(env);

    // Fetch existing submission to check ownership and approval status
    const existingRows = await sql`
      SELECT id, url, name, description, category, status, preview_info, thumbnail_url, submitted_at, created_at
      FROM website_submissions
      WHERE id = ${body.id} AND user_id = ${authUser.userId}
      LIMIT 1;
    `;

    if (!existingRows.length) {
      return new Response(JSON.stringify({ error: 'Submission not found.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const existing = existingRows[0];
    const isLocked = existing.status === 'approved' || existing.status === 'published';

    const allowedThemes = ['cream', 'pink', 'cyan', 'purple'];
    const chosenTheme = body.theme && allowedThemes.includes(body.theme) ? body.theme : (existing.preview_info?.theme || 'cream');

    let updatedThumbnail = existing.thumbnail_url;
    if (body.thumbnail_url !== undefined) {
      const trimmed = body.thumbnail_url?.trim() || null;
      if (trimmed && (!validateUrl(trimmed).valid || trimmed.length > 2048)) {
        return new Response(JSON.stringify({ error: 'Preview image must be a valid http(s) URL.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
      updatedThumbnail = trimmed;
    }

    if (isLocked) {
      // REQUIREMENT 8: CRITICAL APPROVAL LOCK
      // Once status is approved or published, project name and URL can NEVER be changed!
      // Must be enforced server-side with HTTP 403.
      if (body.name !== undefined && body.name.trim() !== existing.name) {
        return new Response(
          JSON.stringify({ error: 'Project name and URL cannot be changed after approval. Only presentation fields can be updated.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (body.url !== undefined) {
        const checked = validateUrl(body.url);
        if (checked.valid && checked.normalized && checked.normalized !== existing.url) {
          return new Response(
            JSON.stringify({ error: 'Project name and URL cannot be changed after approval. Only presentation fields can be updated.' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }

      // REQUIREMENT 9: POST-APPROVAL EDITING (presentation fields: theme, description, category, thumbnail_url)
      const newDesc = body.description ? sanitizeText(body.description.trim().slice(0, 500)) : existing.description;
      const newCat = body.category ? sanitizeText(body.category.trim().slice(0, 50)) : existing.category;

      const rows = await sql`
        UPDATE website_submissions
        SET
          description = ${newDesc},
          category = ${newCat},
          thumbnail_url = ${updatedThumbnail},
          preview_info = COALESCE(preview_info, '{}'::jsonb) || ${JSON.stringify({ theme: chosenTheme })}::jsonb,
          updated_at = NOW()
        WHERE id = ${body.id} AND user_id = ${authUser.userId}
        RETURNING id, url, name, description, category, status, submitted_at, reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info, created_at, updated_at;
      `;
      return new Response(JSON.stringify({ success: true, submission: rows[0] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Pre-approval editing: can edit name, url, description, category, theme, thumbnail_url
    if (!body.name || !body.url || !body.description || !body.category) {
      return new Response(JSON.stringify({ error: 'Complete all required fields.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const checkedUrl = validateUrl(body.url);
    if (!checkedUrl.valid || !checkedUrl.normalized) {
      return new Response(JSON.stringify({ error: checkedUrl.error || 'Invalid URL.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const rows = await sql`
      UPDATE website_submissions
      SET
        name = ${sanitizeText(body.name.trim().slice(0, 100))},
        url = ${checkedUrl.normalized},
        description = ${sanitizeText(body.description.trim().slice(0, 500))},
        category = ${sanitizeText(body.category.trim().slice(0, 50))},
        thumbnail_url = ${updatedThumbnail},
        preview_info = COALESCE(preview_info, '{}'::jsonb) || ${JSON.stringify({ theme: chosenTheme })}::jsonb,
        updated_at = NOW()
      WHERE id = ${body.id} AND user_id = ${authUser.userId} AND status NOT IN ('approved', 'published')
      RETURNING id, url, name, description, category, status, submitted_at, reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info, created_at, updated_at;
    `;

    if (!rows.length) {
      return new Response(JSON.stringify({ error: 'Submission not found or locked.' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

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
        RETURNING id, url, name, description, category, status, submitted_at, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info;
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
        RETURNING id, url, name, description, category, status, submitted_at, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info;
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
        RETURNING id, url, name, description, category, status, submitted_at, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info;
      `;
    } else {
      result = await sql`
        UPDATE website_submissions
        SET
          status = 'pending_review',
          updated_at = NOW()
        WHERE id = ${id} AND status NOT IN ('approved', 'published')
        RETURNING id, url, name, description, category, status, submitted_at, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info;
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
