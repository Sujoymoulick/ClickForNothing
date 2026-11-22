import { createClerkClient } from '@clerk/backend';
import { getAuthenticatedUser } from './_auth';

export interface AdminEnv {
  CLERK_SECRET_KEY?: string;
  ADMIN_SECRET_KEY?: string;
  ADMIN_EMAIL?: string;
}

/**
 * Admin access is granted to exactly one Clerk account, identified by the
 * ADMIN_EMAIL secret (compared to the account's verified primary email,
 * looked up server-side). The x-admin-key header remains for the external panel.
 */
export async function checkIsAdmin(
  request: Request,
  env: AdminEnv
): Promise<{ isAdmin: boolean; adminEmail: string }> {
  const adminKey = request.headers.get('x-admin-key');
  if (env.ADMIN_SECRET_KEY && adminKey === env.ADMIN_SECRET_KEY) {
    return { isAdmin: true, adminEmail: 'admin-key@clickfornothing.com' };
  }

  const allowed = env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!allowed || !env.CLERK_SECRET_KEY) return { isAdmin: false, adminEmail: '' };

  const authUser = await getAuthenticatedUser(request, env);
  if (!authUser?.userId) return { isAdmin: false, adminEmail: '' };

  try {
    const clerk = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });
    const user = await clerk.users.getUser(authUser.userId);
    const primary = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId);
    const email = primary?.emailAddress?.toLowerCase();
    const verified = primary?.verification?.status === 'verified';
    if (email && verified && email === allowed) return { isAdmin: true, adminEmail: email };
  } catch (err) {
    console.warn('[ADMIN_CHECK] Clerk user lookup failed:', err);
  }
  return { isAdmin: false, adminEmail: '' };
}
