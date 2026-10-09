import { getDb, logServerError, sanitizeText, validateUrl } from './_db';
import { getAuthenticatedUser } from './_auth';
import { isValidDesignId, normalizeDesignId, getThemeSlug } from './_cardDesigns';

interface Env {
  DATABASE_URL?: string;
  CLERK_SECRET_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;

    // 1. Authenticate user server-side via Clerk session
    const authUser = await getAuthenticatedUser(request, env);
    if (!authUser || !authUser.userId) {
      return new Response(
        JSON.stringify({ error: 'Authentication required. Please sign in to submit a website.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let body: {
      url?: string;
      name?: string;
      description?: string;
      category?: string;
      designId?: string;
      design_id?: string;
      theme?: string;
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
    const rawDesignId = body.designId || body.design_id || body.theme || 'theme-01';

    // 2. Validate required fields
    if (!url || typeof url !== 'string' || !url.trim()) {
      return new Response(
        JSON.stringify({ error: 'Website URL is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: 'Website name is required (minimum 2 characters).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: 'Description is required (minimum 10 characters).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!category || typeof category !== 'string' || !category.trim()) {
      return new Response(
        JSON.stringify({ error: 'Category is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Validate and normalize URL
    const urlValidation = validateUrl(url);
    if (!urlValidation.valid || !urlValidation.normalized) {
      return new Response(
        JSON.stringify({ error: urlValidation.error || 'Invalid website URL format.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Validate card design against catalog
    if (!isValidDesignId(rawDesignId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid card design selected. Please choose a valid design.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const validDesignId = normalizeDesignId(rawDesignId);
    const themeSlug = getThemeSlug(validDesignId);

    // 5. Sanitize text inputs
    const cleanName = sanitizeText(name.trim().slice(0, 100));
    const cleanDescription = sanitizeText(description.trim().slice(0, 500));
    const cleanCategory = sanitizeText(category.trim().slice(0, 50));
    const cleanUrl = urlValidation.normalized;

    // 6. Security: Always use verified server-derived identity
    const userId = authUser.userId;
    const userEmail = authUser.email || null;
    const userName = authUser.name || null;

    const sql = getDb(env);

    // 7. Prevent duplicate submissions caused by rapid clicks or network retries
    const existingDuplicates = await sql`
      SELECT id, status, created_at
      FROM website_submissions
      WHERE user_id = ${userId}
        AND url = ${cleanUrl}
        AND created_at > NOW() - INTERVAL '10 minutes'
      LIMIT 1;
    `;

    if (existingDuplicates && existingDuplicates.length > 0) {
      return new Response(
        JSON.stringify({
          error: 'This website was recently submitted and is already pending review.',
          duplicate: true,
          submissionId: existingDuplicates[0].id,
        }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 8. Insert new submission into Neon
    const previewInfo = {
      design_id: validDesignId,
      theme: themeSlug,
    };

    const result = await sql`
      INSERT INTO website_submissions (
        url,
        name,
        description,
        category,
        user_id,
        user_email,
        user_name,
        status,
        design_id,
        preview_info,
        submitted_at,
        created_at,
        updated_at
      ) VALUES (
        ${cleanUrl},
        ${cleanName},
        ${cleanDescription},
        ${cleanCategory},
        ${userId},
        ${userEmail},
        ${userName},
        'pending',
        ${validDesignId},
        ${JSON.stringify(previewInfo)}::jsonb,
        NOW(),
        NOW(),
        NOW()
      )
      RETURNING id, url, name, description, category, status, design_id, preview_info, created_at, submitted_at;
    `;

    return new Response(
      JSON.stringify({
        success: true,
        submission: result[0],
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    logServerError('Error saving submission to Neon database.', error);
    return new Response(
      JSON.stringify({
        error: 'An internal server error occurred while processing the submission.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
