import { getDb, logServerError } from './_db';

interface Env {
  DATABASE_URL?: string;
}

/**
 * GET /api/stats
 * Public, count-only. Returns the total number of submissions and nothing else:
 * no rows, ids, users, emails or statuses.
 */
export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const sql = getDb(context.env);
    const rows = await sql`SELECT COUNT(*)::int AS count FROM website_submissions;`;
    const count = Number(rows?.[0]?.count) || 0;

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, s-maxage=60',
      },
    });
  } catch (error: any) {
    logServerError('Error counting submissions.', error);
    return new Response(JSON.stringify({ count: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
}
