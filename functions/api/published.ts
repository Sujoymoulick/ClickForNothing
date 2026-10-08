import { getDb, logServerError } from './_db';

interface Env {
  DATABASE_URL?: string;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const { env } = context;
    const sql = getDb(env);

    const rows = await sql`
      SELECT
        id,
        url,
        name,
        description,
        category,
        thumbnail_url,
        published_at,
        created_at
      FROM website_submissions
      WHERE status = 'published'
      ORDER BY published_at DESC NULLS LAST, created_at DESC;
    `;

    return new Response(
      JSON.stringify({
        success: true,
        sites: rows,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60, s-maxage=600, stale-while-revalidate=60',
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
