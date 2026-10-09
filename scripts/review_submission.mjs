import { neon } from '@neondatabase/serverless';
import fs from 'fs';

if (fs.existsSync('.env')) {
  process.loadEnvFile('.env');
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function main() {
  const [,, action, targetId, extraArg] = process.argv;

  if (!action || action === 'list') {
    const rows = await sql`
      SELECT id, name, url, category, design_id, status, submitted_at, published_at, user_id, user_email
      FROM website_submissions
      ORDER BY created_at DESC;
    `;
    console.log(`\nFound ${rows.length} submissions in Neon:\n`);
    console.table(rows);
    return;
  }

  const id = parseInt(targetId, 10);
  if (isNaN(id)) {
    console.error('Usage: node scripts/review_submission.mjs [list | approve <id> | publish <id> | reject <id> <reason>]');
    process.exit(1);
  }

  if (action === 'approve') {
    // Step 5: Automatic publication after approval
    const updated = await sql`
      UPDATE website_submissions
      SET
        status = 'published',
        reviewed_at = COALESCE(reviewed_at, NOW()),
        published_at = COALESCE(published_at, NOW()),
        rejection_reason = NULL,
        reviewed_by = 'cli-admin@clickfornothing.com',
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;
    if (!updated || updated.length === 0) {
      console.error(`Submission #${id} not found.`);
      return;
    }
    console.log('✅ Approved & Automatically Published submission:', updated[0]);
  } else if (action === 'publish') {
    const updated = await sql`
      UPDATE website_submissions
      SET
        status = 'published',
        published_at = COALESCE(published_at, NOW()),
        reviewed_at = COALESCE(reviewed_at, NOW()),
        rejection_reason = NULL,
        reviewed_by = 'cli-admin@clickfornothing.com',
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;
    if (!updated || updated.length === 0) {
      console.error(`Submission #${id} not found.`);
      return;
    }
    console.log('🚀 Published submission:', updated[0]);
  } else if (action === 'reject') {
    const reason = extraArg || 'Does not meet submission guidelines';
    const updated = await sql`
      UPDATE website_submissions
      SET
        status = 'rejected',
        reviewed_at = NOW(),
        rejection_reason = ${reason},
        reviewed_by = 'cli-admin@clickfornothing.com',
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;
    if (!updated || updated.length === 0) {
      console.error(`Submission #${id} not found.`);
      return;
    }
    console.log('❌ Rejected submission:', updated[0]);
  } else {
    console.error(`Unknown action: ${action}`);
  }
}

main().catch((err) => {
  console.error('Error running review_submission:', err);
  process.exit(1);
});
