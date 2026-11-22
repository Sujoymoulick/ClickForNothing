import { createClerkClient } from '@clerk/backend';
import { checkIsAdmin, type AdminEnv } from './_admin';
import { logServerError } from './_db';

/**
 * GET /api/admin/users
 * Admin only. Lists Clerk users (most recent first).
 */
export async function onRequestGet(context: { request: Request; env: AdminEnv }) {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });

  try {
    const { request, env } = context;
    const admin = await checkIsAdmin(request, env);
    if (!admin.isAdmin) return json({ error: 'Forbidden.' }, 403);

    const clerk = createClerkClient({ secretKey: env.CLERK_SECRET_KEY! });
    const res: any = await clerk.users.getUserList({ limit: 200, orderBy: '-created_at' });
    const list: any[] = Array.isArray(res) ? res : res.data || [];

    const users = list.map((u) => ({
      id: u.id,
      name: [u.firstName, u.lastName].filter(Boolean).join(' ') || u.username || '',
      email: u.emailAddresses?.find((e: any) => e.id === u.primaryEmailAddressId)?.emailAddress || '',
      createdAt: u.createdAt,
      lastSignInAt: u.lastSignInAt,
    }));

    return json({ success: true, total: res.totalCount ?? users.length, users });
  } catch (error: any) {
    logServerError('Error listing Clerk users.', error);
    return json({ error: 'Failed to load users.' }, 500);
  }
}
