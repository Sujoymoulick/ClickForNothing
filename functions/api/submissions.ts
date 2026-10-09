import { getAuthenticatedUser } from './_auth';
import { getDb, logServerError, sanitizeText, validateUrl } from './_db';
import { isValidDesignId, normalizeDesignId, getThemeSlug } from './_cardDesigns';

interface Env {
  DATABASE_URL?: string;
  CLERK_SECRET_KEY?: string;
  ADMIN_SECRET_KEY?: string;
}

/** Check whether the request carries verified admin authorization */
async function checkIsAdmin(request: Request, env: Env): Promise<{ isAdmin: boolean; adminEmail: string }> {
  const adminKey = request.headers.get('x-admin-key');
  const expectedAdminKey = env.ADMIN_SECRET_KEY;

  if (expectedAdminKey && adminKey === expectedAdminKey) {
    return { isAdmin: true, adminEmail: 'admin-key@clickfornothing.com' };
  }

  const authUser = await getAuthenticatedUser(request, env);
  const role =
    authUser?.claims?.role ||
    authUser?.claims?.org_role ||
    authUser?.claims?.public_metadata?.role;

  if (role === 'admin') {
    return { isAdmin: true, adminEmail: authUser?.email || 'admin-clerk@clickfornothing.com' };
  }

  return { isAdmin: false, adminEmail: '' };
}

/**
 * GET /api/submissions
 * Returns user submissions, or all submissions if called by an authorized admin.
 */
export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const scopeAll = url.searchParams.get('all') === 'true' || url.searchParams.get('scope') === 'admin';

    const sql = getDb(env);
    const adminCheck = await checkIsAdmin(request, env);

    if (scopeAll) {
      if (!adminCheck.isAdmin) {
        return new Response(
          JSON.stringify({ error: 'Forbidden. Admin privileges required to view all submissions.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Return all submissions for InstaFlow admin review
      const filterStatus = url.searchParams.get('status');
      let rows;
      if (filterStatus) {
        rows = await sql`
          SELECT
            id, url, name, description, category, status, design_id,
            user_id, user_email, user_name, submitted_at, reviewed_at,
            published_at, rejection_reason, thumbnail_url, preview_info,
            COALESCE(views_count, 0) AS views_count,
            COALESCE(likes_count, 0) AS likes_count,
            created_at, updated_at
          FROM website_submissions
          WHERE status = ${filterStatus}
          ORDER BY created_at DESC;
        `;
      } else {
        rows = await sql`
          SELECT
            id, url, name, description, category, status, design_id,
            user_id, user_email, user_name, submitted_at, reviewed_at,
            published_at, rejection_reason, thumbnail_url, preview_info,
            COALESCE(views_count, 0) AS views_count,
            COALESCE(likes_count, 0) AS likes_count,
            created_at, updated_at
          FROM website_submissions
          ORDER BY created_at DESC;
        `;
      }

      return new Response(
        JSON.stringify({ success: true, isAdmin: true, submissions: rows }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Authenticate user server-side using Clerk session
    const authUser = await getAuthenticatedUser(request, env);
    if (!authUser || !authUser.userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Please sign in to view your submissions.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch submissions strictly belonging to the authenticated Clerk userId
    const rows = await sql`
      SELECT
        id,
        url,
        name,
        description,
        category,
        status,
        design_id,
        submitted_at,
        reviewed_at,
        published_at,
        rejection_reason,
        thumbnail_url,
        preview_info,
        COALESCE(views_count, 0) AS views_count,
        COALESCE(likes_count, 0) AS likes_count,
        created_at,
        updated_at
      FROM website_submissions
      WHERE user_id = ${authUser.userId}
      ORDER BY created_at DESC;
    `;

    return new Response(
      JSON.stringify({
        success: true,
        userId: authUser.userId,
        submissions: rows,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    logServerError('Error fetching submissions from Neon.', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve submissions. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * PUT /api/submissions
 * User update handler with strict server-side field allowlist.
 * Website URL and Name are permanently locked after initial submission.
 * Users may only update description, designId, and optional presentation thumbnail.
 */
export async function onRequestPut(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;

    // 1. Verify Clerk user session
    const authUser = await getAuthenticatedUser(request, env);
    if (!authUser?.userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Please sign in to edit your submission.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON request body.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!body || typeof body !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid request payload.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const subId = Number(body.id);
    if (!Number.isSafeInteger(subId) || subId <= 0) {
      return new Response(
        JSON.stringify({ error: 'Valid submission ID is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sql = getDb(env);

    // 2. Fetch existing submission and verify ownership
    const existingRows = await sql`
      SELECT id, url, name, description, category, status, design_id, preview_info, thumbnail_url, user_id
      FROM website_submissions
      WHERE id = ${subId} AND user_id = ${authUser.userId}
      LIMIT 1;
    `;

    if (!existingRows || existingRows.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Submission not found or access denied.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existing = existingRows[0];

    // 3. Security: Reject attempts to tamper with protected/immutable fields
    // Website URL, Website Name, Moderation Status, User ID are strictly locked.
    if ('userId' in body || 'user_id' in body) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: Owner ID cannot be modified.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if ('status' in body && body.status !== existing.status) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: Moderation status is read-only for users.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if ('published' in body || 'published_at' in body || 'publishedAt' in body) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: Publication status is read-only for users.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if ('name' in body && typeof body.name === 'string') {
      if (body.name.trim() !== existing.name) {
        return new Response(
          JSON.stringify({ error: 'Website name is permanently locked after submission and cannot be modified.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    if ('url' in body && typeof body.url === 'string') {
      const parsedCheck = validateUrl(body.url);
      if (parsedCheck.valid && parsedCheck.normalized !== existing.url) {
        return new Response(
          JSON.stringify({ error: 'Website URL is permanently locked after submission and cannot be modified.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // 4. Server-Side Field Allowlist
    // Permit only: description, designId (or theme/design_id), and optional thumbnail_url.
    let validatedDescription = existing.description;
    if (body.description !== undefined) {
      if (typeof body.description !== 'string' || body.description.trim().length < 10) {
        return new Response(
          JSON.stringify({ error: 'Description must be at least 10 characters.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      validatedDescription = sanitizeText(body.description.trim().slice(0, 500));
    }

    let validatedDesignId = existing.design_id || 'theme-01';
    const rawDesign = body.designId || body.design_id || body.theme;
    if (rawDesign !== undefined) {
      if (!isValidDesignId(rawDesign)) {
        return new Response(
          JSON.stringify({ error: 'Invalid card design ID provided.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      validatedDesignId = normalizeDesignId(rawDesign);
    }

    let validatedThumbnail = existing.thumbnail_url;
    if (body.thumbnail_url !== undefined) {
      const trimmed = body.thumbnail_url?.trim() || null;
      if (trimmed) {
        const thumbCheck = validateUrl(trimmed);
        if (!thumbCheck.valid) {
          return new Response(
            JSON.stringify({ error: 'Thumbnail must be a valid http(s) URL.' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
        validatedThumbnail = thumbCheck.normalized;
      } else {
        validatedThumbnail = null;
      }
    }

    const themeSlug = getThemeSlug(validatedDesignId);

    // 5. Update only explicitly permitted columns in Neon
    // Note: status, name, url, and user_id are NOT touched!
    const rows = await sql`
      UPDATE website_submissions
      SET
        description = ${validatedDescription},
        design_id = ${validatedDesignId},
        thumbnail_url = ${validatedThumbnail},
        preview_info = COALESCE(preview_info, '{}'::jsonb) || ${JSON.stringify({ design_id: validatedDesignId, theme: themeSlug })}::jsonb,
        updated_at = NOW()
      WHERE id = ${existing.id} AND user_id = ${authUser.userId}
      RETURNING id, url, name, description, category, status, design_id, preview_info, thumbnail_url,
                COALESCE(views_count, 0) AS views_count, COALESCE(likes_count, 0) AS likes_count,
                submitted_at, reviewed_at, published_at, rejection_reason, created_at, updated_at;
    `;

    return new Response(
      JSON.stringify({
        success: true,
        submission: rows[0],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    logServerError('Error updating submission in Neon.', error);
    return new Response(
      JSON.stringify({ error: 'Failed to save submission changes.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * PATCH /api/submissions
 * Admin moderation review endpoint (integrated with InstaFlow).
 * Authorizes admin key or Clerk admin role.
 * Approval AUTOMATICALLY publishes the card to ClickForNothing directory.
 */
export async function onRequestPatch(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;

    // 1. Authorize Admin
    const adminCheck = await checkIsAdmin(request, env);
    if (!adminCheck.isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Forbidden. Admin privileges required.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON request body.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { id, status, rejection_reason } = body;
    const subId = Number(id);

    if (!Number.isSafeInteger(subId) || subId <= 0 || !status) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid submission ID or status.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const validStatuses = ['approved', 'published', 'rejected', 'pending', 'pending_review'];
    if (!validStatuses.includes(status)) {
      return new Response(
        JSON.stringify({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sql = getDb(env);

    // Fetch existing submission
    const existingRows = await sql`
      SELECT id, name, url, status, user_id, user_email
      FROM website_submissions
      WHERE id = ${subId}
      LIMIT 1;
    `;

    if (!existingRows || existingRows.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Submission not found.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existing = existingRows[0];
    const prevStatus = existing.status || 'pending';

    let result;
    let auditAction = 'Updated Status';
    let newStatusLabel = status;

    if (status === 'approved' || status === 'published') {
      // Step 5: Automatic Publication After Approval!
      // Atomically approve and publish the submission in a single operation
      result = await sql`
        UPDATE website_submissions
        SET
          status = 'published',
          reviewed_at = COALESCE(reviewed_at, NOW()),
          published_at = COALESCE(published_at, NOW()),
          rejection_reason = NULL,
          reviewed_by = ${adminCheck.adminEmail},
          updated_at = NOW()
        WHERE id = ${subId}
        RETURNING id, url, name, description, category, status, design_id, submitted_at, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info, reviewed_by;
      `;
      auditAction = 'Approved & Published Submission';
      newStatusLabel = 'Published';
    } else if (status === 'rejected') {
      const cleanReason = sanitizeText(rejection_reason || 'Does not meet submission guidelines');
      result = await sql`
        UPDATE website_submissions
        SET
          status = 'rejected',
          reviewed_at = NOW(),
          rejection_reason = ${cleanReason},
          reviewed_by = ${adminCheck.adminEmail},
          updated_at = NOW()
        WHERE id = ${subId}
        RETURNING id, url, name, description, category, status, design_id, submitted_at, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info, reviewed_by;
      `;
      auditAction = 'Rejected Submission';
      newStatusLabel = 'Rejected';
    } else {
      // Revert to pending
      result = await sql`
        UPDATE website_submissions
        SET
          status = 'pending',
          rejection_reason = NULL,
          updated_at = NOW()
        WHERE id = ${subId}
        RETURNING id, url, name, description, category, status, design_id, submitted_at, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason, thumbnail_url, preview_info, reviewed_by;
      `;
      auditAction = 'Reset Submission to Pending';
      newStatusLabel = 'Pending';
    }

    // Try logging to submission_audit_logs if available
    try {
      const auditId = `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const details = `${auditAction}: "${existing.name}" (${existing.url})`;
      await sql`
        INSERT INTO submission_audit_logs (
          id, submission_id, admin_email, action, previous_status, new_status, details, created_at
        ) VALUES (
          ${auditId},
          ${String(subId)},
          ${adminCheck.adminEmail},
          ${auditAction},
          ${prevStatus},
          ${newStatusLabel},
          ${details},
          NOW()
        );
      `;
    } catch (auditErr) {
      console.warn('Could not record to submission_audit_logs (non-fatal):', auditErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        submission: result[0],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    logServerError('Error modifying submission status.', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update submission status.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
