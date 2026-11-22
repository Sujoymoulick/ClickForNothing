import { createClerkClient } from '@clerk/backend';
import { getAuthenticatedUser } from './_auth';
import { checkIsAdmin } from './_admin';
import { getDb, logServerError } from './_db';

interface Env {
  DATABASE_URL?: string;
  CLERK_SECRET_KEY?: string;
  ADMIN_SECRET_KEY?: string;
  ADMIN_EMAIL?: string;
}

const MAX_LEN = 2000;
const AUTO_REPLY =
  'Thanks for contacting ClickForNothing! We have received your message and will get back to you as soon as possible to help resolve it.';
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

function cleanBody(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const text = raw.replace(/\r\n/g, '\n').trim();
  if (!text || text.length > MAX_LEN) return null;
  return text;
}

function afterId(request: Request): number {
  const n = Number(new URL(request.url).searchParams.get('after') || 0);
  return Number.isSafeInteger(n) && n > 0 ? n : 0;
}

/* ---------- User side: /api/messages ---------- */

/** GET /api/messages?after=<id> — the signed-in user's own thread. */
export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const user = await getAuthenticatedUser(request, env);
    if (!user?.userId) return json({ error: 'Please sign in.' }, 401);

    const sql = getDb(env);
    const rows = await sql`
      SELECT id, sender, body, created_at
      FROM support_messages
      WHERE user_id = ${user.userId} AND id > ${afterId(request)}
      ORDER BY id ASC
      LIMIT 500;
    `;
    await sql`
      UPDATE support_messages SET read_by_user = TRUE
      WHERE user_id = ${user.userId} AND sender = 'admin' AND read_by_user = FALSE;
    `;
    return json({ success: true, messages: rows });
  } catch (error) {
    logServerError('Error loading messages.', error);
    return json({ error: 'Could not load messages.' }, 500);
  }
}

/** POST /api/messages { body } — user sends a message to the admin. */
export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const user = await getAuthenticatedUser(request, env);
    if (!user?.userId) return json({ error: 'Please sign in.' }, 401);

    const payload: any = await request.json().catch(() => null);
    const body = cleanBody(payload?.body);
    if (!body) return json({ error: `Message must be 1–${MAX_LEN} characters.` }, 400);

    const sql = getDb(env);
    const [{ recent }] = await sql`
      SELECT COUNT(*)::int AS recent FROM support_messages
      WHERE user_id = ${user.userId} AND sender = 'user' AND created_at > NOW() - INTERVAL '1 hour';
    `;
    if (recent >= 30) return json({ error: 'Too many messages. Try again later.' }, 429);

    let email: string | null = null;
    let name: string | null = null;
    try {
      const clerk = createClerkClient({ secretKey: env.CLERK_SECRET_KEY! });
      const u = await clerk.users.getUser(user.userId);
      email = u.emailAddresses.find((e) => e.id === u.primaryEmailAddressId)?.emailAddress || null;
      name = [u.firstName, u.lastName].filter(Boolean).join(' ') || u.username || null;
    } catch {}

    const rows = await sql`
      INSERT INTO support_messages (user_id, user_email, user_name, sender, body, read_by_user)
      VALUES (${user.userId}, ${email}, ${name}, 'user', ${body}, TRUE)
      RETURNING id, sender, body, created_at;
    `;

    // First message from this user: send an automatic thank-you from the admin side
    let auto = null;
    const [{ n }] = await sql`SELECT COUNT(*)::int AS n FROM support_messages WHERE user_id = ${user.userId};`;
    if (n === 1) {
      const autoRows = await sql`
        INSERT INTO support_messages (user_id, user_email, user_name, sender, body, read_by_user, read_by_admin)
        VALUES (${user.userId}, ${email}, ${name}, 'admin', ${AUTO_REPLY}, TRUE, TRUE)
        RETURNING id, sender, body, created_at;
      `;
      auto = autoRows[0];
    }
    return json({ success: true, message: rows[0], auto });
  } catch (error) {
    logServerError('Error sending message.', error);
    return json({ error: 'Could not send message.' }, 500);
  }
}

/* ---------- Admin side: /api/admin/messages ---------- */

/**
 * GET /api/admin/messages            — list of user threads
 * GET /api/admin/messages?user=<id>  — one thread (marks user messages read)
 */
export async function onAdminGet(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const admin = await checkIsAdmin(request, env);
    if (!admin.isAdmin) return json({ error: 'Forbidden.' }, 403);

    const sql = getDb(env);
    const userId = new URL(request.url).searchParams.get('user');

    if (userId) {
      const rows = await sql`
        SELECT id, sender, body, created_at
        FROM support_messages
        WHERE user_id = ${userId} AND id > ${afterId(request)}
        ORDER BY id ASC
        LIMIT 500;
      `;
      await sql`
        UPDATE support_messages SET read_by_admin = TRUE
        WHERE user_id = ${userId} AND sender = 'user' AND read_by_admin = FALSE;
      `;
      return json({ success: true, messages: rows });
    }

    const threads = await sql`
      SELECT
        user_id,
        MAX(user_email) AS user_email,
        MAX(user_name) AS user_name,
        MAX(id) AS last_id,
        MAX(created_at) AS last_at,
        COUNT(*) FILTER (WHERE sender = 'user' AND read_by_admin = FALSE)::int AS unread,
        (ARRAY_AGG(body ORDER BY id DESC))[1] AS last_body
      FROM support_messages
      GROUP BY user_id
      ORDER BY MAX(id) DESC
      LIMIT 200;
    `;
    return json({ success: true, threads });
  } catch (error) {
    logServerError('Error loading admin messages.', error);
    return json({ error: 'Could not load messages.' }, 500);
  }
}

/** POST /api/admin/messages { userId, body } — admin reply. */
export async function onAdminPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const admin = await checkIsAdmin(request, env);
    if (!admin.isAdmin) return json({ error: 'Forbidden.' }, 403);

    const payload: any = await request.json().catch(() => null);
    const userId = typeof payload?.userId === 'string' ? payload.userId : '';
    const body = cleanBody(payload?.body);
    if (!userId || !body) return json({ error: 'User and message are required.' }, 400);

    const sql = getDb(env);
    const exists = await sql`SELECT 1 FROM support_messages WHERE user_id = ${userId} LIMIT 1;`;
    if (!exists.length) return json({ error: 'No conversation with this user.' }, 404);

    const rows = await sql`
      INSERT INTO support_messages (user_id, sender, body, read_by_admin)
      VALUES (${userId}, 'admin', ${body}, TRUE)
      RETURNING id, sender, body, created_at;
    `;
    return json({ success: true, message: rows[0] });
  } catch (error) {
    logServerError('Error sending admin reply.', error);
    return json({ error: 'Could not send reply.' }, 500);
  }
}
