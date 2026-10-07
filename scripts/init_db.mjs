import { neon } from '@neondatabase/serverless';
import fs from 'fs';

// Load .env file
if (fs.existsSync('.env')) {
  process.loadEnvFile('.env');
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function initDb() {
  console.log('Creating website_submissions table in Lakebase Postgres (Neon)...');
  
  await sql`
    CREATE TABLE IF NOT EXISTS website_submissions (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      user_id VARCHAR(255),
      user_email VARCHAR(255),
      user_name VARCHAR(255),
      status VARCHAR(50) DEFAULT 'pending_review',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      submitted_at TIMESTAMPTZ DEFAULT NOW(),
      reviewed_at TIMESTAMPTZ,
      published_at TIMESTAMPTZ,
      rejection_reason TEXT,
      thumbnail_url TEXT,
      preview_info JSONB
    );

    ALTER TABLE website_submissions ALTER COLUMN status SET DEFAULT 'pending_review';
    ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ DEFAULT NOW();
    ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;
    ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
    ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
    ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
    ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS preview_info JSONB;
  `;

  // Create indexes for fast queries
  await sql`
    CREATE INDEX IF NOT EXISTS idx_submissions_status ON website_submissions(status);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON website_submissions(user_id);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON website_submissions(created_at DESC);
  `;

  console.log('✅ Table website_submissions updated and indexed successfully in Lakebase Postgres!');
}

initDb().catch((err) => {
  console.error('Error initializing database:', err);
  process.exit(1);
});
