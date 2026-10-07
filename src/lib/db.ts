import { neon } from '@neondatabase/serverless';

const databaseUrl = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;

export const sql = neon(databaseUrl || '');

export interface WebsiteSubmission {
  id?: number;
  url: string;
  name: string;
  description: string;
  category: string;
  user_id?: string | null;
  user_email?: string | null;
  user_name?: string | null;
  status?: 'pending_review' | 'approved' | 'published' | 'rejected' | string;
  created_at?: string;
  updated_at?: string;
  submitted_at?: string;
  reviewed_at?: string | null;
  published_at?: string | null;
  rejection_reason?: string | null;
  thumbnail_url?: string | null;
  preview_info?: any;
}

export async function insertSubmission(submission: WebsiteSubmission) {
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
      submitted_at,
      created_at,
      updated_at,
      preview_info
    ) VALUES (
      ${submission.url},
      ${submission.name},
      ${submission.description},
      ${submission.category},
      ${submission.user_id || null},
      ${submission.user_email || null},
      ${submission.user_name || null},
      ${submission.status || 'pending_review'},
      NOW(),
      NOW(),
      NOW(),
      ${submission.preview_info ? JSON.stringify(submission.preview_info) : null}
    )
    RETURNING
      id,
      url,
      name,
      description,
      category,
      status,
      user_id,
      submitted_at,
      created_at;
  `;

  return result[0];
}

export async function getUserSubmissions(userId: string): Promise<WebsiteSubmission[]> {
  if (!userId) return [];
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
    WHERE user_id = ${userId}
    ORDER BY created_at DESC;
  `;
  return rows as WebsiteSubmission[];
}

export async function getPublishedSubmissions(): Promise<WebsiteSubmission[]> {
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
  return rows as WebsiteSubmission[];
}

export async function updateSubmissionStatus(
  id: number,
  status: 'pending_review' | 'approved' | 'published' | 'rejected',
  details?: { rejection_reason?: string }
) {
  if (status === 'published') {
    return await sql`
      UPDATE website_submissions
      SET
        status = 'published',
        published_at = NOW(),
        reviewed_at = COALESCE(reviewed_at, NOW()),
        rejection_reason = NULL,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;
  }
  if (status === 'approved') {
    return await sql`
      UPDATE website_submissions
      SET
        status = 'approved',
        reviewed_at = NOW(),
        rejection_reason = NULL,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;
  }
  if (status === 'rejected') {
    return await sql`
      UPDATE website_submissions
      SET
        status = 'rejected',
        reviewed_at = NOW(),
        rejection_reason = ${details?.rejection_reason || 'Does not meet guidelines'},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;
  }
  return await sql`
    UPDATE website_submissions
    SET status = 'pending_review', updated_at = NOW()
    WHERE id = ${id}
    RETURNING *;
  `;
}
