import { getDb, logServerError } from './_db';

interface Env {
  DATABASE_URL?: string;
}

/**
 * POST /api/interactions
 * Atomically records views and likes (loves) for websites in Neon PostgreSQL.
 * Supports public visitors liking and viewing cards in real time.
 */
export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON request body.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    if (!body || (!body.id && !body.siteId)) {
      return new Response(JSON.stringify({ error: 'Submission ID is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const rawId = body.id || body.siteId;
    const cleanId = String(rawId).replace(/^submission-/, '').trim();
    const subId = parseInt(cleanId, 10);

    if (isNaN(subId) || subId <= 0) {
      return new Response(JSON.stringify({ error: 'Valid numeric submission ID is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const sql = getDb(env);
    const type = body.type === 'view' ? 'view' : 'like';
    const action = body.action || 'increment';
    const clientId =
      (typeof body.clientId === 'string' && body.clientId.slice(0, 100)) ||
      request.headers.get('cf-connecting-ip') ||
      'anon';

    let updatedRows: any[] = [];

    if (type === 'like') {
      if (action === 'decrement') {
        updatedRows = await sql`
          UPDATE website_submissions
          SET likes_count = GREATEST(0, COALESCE(likes_count, 0) - 1)
          WHERE id = ${subId}
          RETURNING id, COALESCE(likes_count, 0) AS likes_count, COALESCE(views_count, 0) AS views_count;
        `;
      } else {
        updatedRows = await sql`
          UPDATE website_submissions
          SET likes_count = COALESCE(likes_count, 0) + 1
          WHERE id = ${subId}
          RETURNING id, COALESCE(likes_count, 0) AS likes_count, COALESCE(views_count, 0) AS views_count;
        `;
      }
    } else {
      // type === 'view'
      updatedRows = await sql`
        UPDATE website_submissions
        SET views_count = COALESCE(views_count, 0) + 1
        WHERE id = ${subId}
        RETURNING id, COALESCE(likes_count, 0) AS likes_count, COALESCE(views_count, 0) AS views_count;
      `;
    }

    // Safely record interaction event to audit/interaction log
    try {
      await sql`
        INSERT INTO submission_interactions (submission_id, action_type, identifier)
        VALUES (${subId}, ${type}, ${clientId});
      `;
    } catch {
      // Non-fatal if logging table write fails
    }

    if (!updatedRows || updatedRows.length === 0) {
      return new Response(JSON.stringify({ error: 'Submission not found in Neon.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const row = updatedRows[0];
    return new Response(
      JSON.stringify({
        success: true,
        id: row.id,
        likes_count: Number(row.likes_count),
        views_count: Number(row.views_count),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    logServerError('Error updating website interaction in Neon.', error);
    return new Response(
      JSON.stringify({ error: 'Failed to record interaction. Please try again.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    );
  }
}

/**
 * GET /api/interactions?id=7
 * Returns current view and love metrics from Neon PostgreSQL.
 */
export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const rawId = url.searchParams.get('id') || url.searchParams.get('siteId');
    const sql = getDb(env);

    if (rawId) {
      const subId = parseInt(String(rawId).replace(/^submission-/, '').trim(), 10);
      if (!isNaN(subId)) {
        const rows = await sql`
          SELECT id, COALESCE(views_count, 0) AS views_count, COALESCE(likes_count, 0) AS likes_count
          FROM website_submissions
          WHERE id = ${subId}
          LIMIT 1;
        `;
        if (rows.length > 0) {
          return new Response(
            JSON.stringify({
              success: true,
              submission: {
                id: rows[0].id,
                views_count: Number(rows[0].views_count),
                likes_count: Number(rows[0].likes_count),
              },
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-store',
              },
            }
          );
        }
      }
    }

    // Return interactions map for all approved & published submissions
    const rows = await sql`
      SELECT id, COALESCE(views_count, 0) AS views_count, COALESCE(likes_count, 0) AS likes_count
      FROM website_submissions
      WHERE status IN ('published', 'approved');
    `;

    const interactions: Record<string, { views: number; likes: number }> = {};
    for (const r of rows) {
      interactions[String(r.id)] = {
        views: Number(r.views_count),
        likes: Number(r.likes_count),
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        interactions,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    logServerError('Error fetching website interactions from Neon.', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve interactions.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400',
    },
  });
}
