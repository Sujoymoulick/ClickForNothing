import { getDb, logServerError } from './_db';

interface Env {
  DATABASE_URL?: string;
}

/**
 * GET /api/site-of-the-day
 * Public. Returns only name, url and description of the admin's latest pick.
 */
export async function onRequestGet(context: { request: Request; env: Env }) {
  const json = (body: unknown, cache: string) =>
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': cache },
    });

  try {
    const sql = getDb(context.env);
    const rows = await sql`
      SELECT name, url, description
      FROM website_submissions
      WHERE status = 'published' AND preview_info ? 'featured_at'
      ORDER BY (preview_info->>'featured_at')::timestamptz DESC
      LIMIT 1;
    `;
    return json({ site: rows[0] || null }, 'public, max-age=30, s-maxage=60');
  } catch (error: any) {
    logServerError('Error loading site of the day.', error);
    return json({ site: null }, 'no-store');
  }
}
