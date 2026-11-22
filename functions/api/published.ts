import { getDb, logServerError } from './_db';

interface Env {
  DATABASE_URL?: string;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const { env } = context;
    const sql = getDb(env);

    const url = new URL(context.request.url);
    const limitParam = parseInt(url.searchParams.get('limit') || '100', 10);
    const offsetParam = parseInt(url.searchParams.get('offset') || '0', 10);
    const limit = Math.min(Math.max(1, isNaN(limitParam) ? 100 : limitParam), 200);
    const offset = Math.max(0, isNaN(offsetParam) ? 0 : offsetParam);

    // Return strictly approved & published submissions. Never expose private/privileged columns.
    const rows = await sql`
      SELECT
        id,
        url,
        name,
        description,
        category,
        design_id,
        thumbnail_url,
        preview_info,
        COALESCE(views_count, 0) AS views_count,
        COALESCE(likes_count, 0) AS likes_count,
        published_at,
        created_at
      FROM website_submissions
      WHERE status = 'published'
      ORDER BY published_at DESC NULLS LAST, created_at DESC
      LIMIT ${limit} OFFSET ${offset};
    `;

    return new Response(
      JSON.stringify({
        success: true,
        sites: rows,
        limit,
        offset,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=0, s-maxage=2, must-revalidate',
        },
      }
    );
  } catch (error: any) {
    logServerError('Error fetching published websites.', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve published websites.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
