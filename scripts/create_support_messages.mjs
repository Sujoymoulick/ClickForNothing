import { neon } from '@neondatabase/serverless';
import fs from 'fs';

// Creates the support_messages table used by the contact form and user/admin chat.
// Safe to run more than once. Run: node scripts/create_support_messages.mjs
if (fs.existsSync('.env')) process.loadEnvFile('.env');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL.replace(/\s+/g, ''));

await sql`
  CREATE TABLE IF NOT EXISTS support_messages (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_email TEXT,
    user_name TEXT,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'admin')),
    body TEXT NOT NULL,
    read_by_user BOOLEAN NOT NULL DEFAULT FALSE,
    read_by_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
await sql`CREATE INDEX IF NOT EXISTS support_messages_user_idx ON support_messages (user_id, id)`;

const [{ n }] = await sql`SELECT COUNT(*)::int AS n FROM support_messages`;
console.log(`support_messages ready (${n} rows).`);
