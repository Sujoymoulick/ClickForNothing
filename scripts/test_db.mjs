import { neon } from '@neondatabase/serverless';
import fs from 'fs';

if (fs.existsSync('.env')) {
  process.loadEnvFile('.env');
}

const databaseUrl = process.env.DATABASE_URL;
const sql = neon(databaseUrl);

async function testDatabase() {
  console.log('Testing insert into Neon Lakebase Postgres...');

  const result = await sql`
    INSERT INTO website_submissions (
      url, name, description, category, user_id, user_email, user_name, status
    ) VALUES (
      'https://example.com/test-useless-site',
      'Test Useless Site',
      'A test submission to verify that Neon database insertion is working properly.',
      'useless-websites',
      'user_test123',
      'test@example.com',
      'Tester',
      'pending'
    )
    RETURNING id, url, name, description, category, status, created_at;
  `;

  console.log('✅ Inserted submission:', result[0]);

  const rows = await sql`SELECT * FROM website_submissions ORDER BY id DESC LIMIT 5`;
  console.log(`✅ Total rows fetched: ${rows.length}`);
  console.log('Rows in website_submissions:', rows);

  // Clean up the test row
  await sql`DELETE FROM website_submissions WHERE url = 'https://example.com/test-useless-site'`;
  console.log('✅ Test record cleaned up successfully.');
}

testDatabase().catch((err) => {
  console.error('Database test failed:', err);
  process.exit(1);
});
