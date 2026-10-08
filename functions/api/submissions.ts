import { getAuthenticatedUser } from './_auth';
import { getDb, logServerError, sanitizeText } from './_db';

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
        WHERE id = ${id}
        RETURNING id, url, name, description, category, status, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason;
      `;
    } else if (status === 'approved') {
      result = await sql`
        UPDATE website_submissions
        SET
          status = 'approved',
          reviewed_at = NOW(),
          rejection_reason = NULL,
          updated_at = NOW()
        WHERE id = ${id}
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
        WHERE id = ${id}
        RETURNING id, url, name, description, category, status, created_at, updated_at,
                  reviewed_at, published_at, rejection_reason;
      `;
    } else {
      result = await sql`
        UPDATE website_submissions
        SET
          status = 'pending_review',
          updated_at = NOW()
        WHERE id = ${id}
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
