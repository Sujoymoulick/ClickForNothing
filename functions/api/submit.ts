import { getDb, sanitizeText, validateUrl } from './_db';
import { getAuthenticatedUser } from './_auth';

interface Env {
  DATABASE_URL?: string;
  CLERK_SECRET_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;

    let body: {
      url?: string;
      name?: string;
      description?: string;
      category?: string;
      user_id?: string;
      user_email?: string;
      user_name?: string;
    };

    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON request body.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { url, name, description, category } = body;

    if (!url || !name || !description || !category) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields (url, name, description, category)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL
    const urlValidation = validateUrl(url);
    if (!urlValidation.valid || !urlValidation.normalized) {
      return new Response(
        JSON.stringify({ error: urlValidation.error || 'Invalid URL format.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize text inputs
    const cleanName = sanitizeText(name.trim().slice(0, 100));
    const cleanDescription = sanitizeText(description.trim().slice(0, 500));
    const cleanCategory = sanitizeText(category.trim().slice(0, 50));
    const cleanUrl = urlValidation.normalized;

    if (!cleanName || !cleanDescription || !cleanCategory) {
      return new Response(
        JSON.stringify({ error: 'Submitted fields cannot be empty.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Attempt server-side auth verification if token is present
    const authUser = await getAuthenticatedUser(request, env);
    const userId = authUser?.userId || body.user_id || null;
    const userEmail = authUser?.email || body.user_email || null;
    const userName = authUser?.name || body.user_name || null;

    const sql = getDb(env);

    const result = await sql`
      INSERT INTO website_submissions (
        url, name, description, category, user_id, user_email, user_name, status
      ) VALUES (
        ${cleanUrl},
        ${cleanName},
        ${cleanDescription},
        ${cleanCategory},
        ${userId},
        ${userEmail},
        ${userName},
        'pending'
      )
      RETURNING id, url, name, description, category, status, created_at;
    `;

    return new Response(
      JSON.stringify({
        success: true,
        submission: result[0],
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error saving submission to Neon database:', error);
    return new Response(
      JSON.stringify({
        error: error?.message || 'Internal server error while saving submission.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
