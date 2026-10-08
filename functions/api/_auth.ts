import { verifyToken } from '@clerk/backend';

export interface AuthenticatedUser {
  userId: string;
  email?: string | null;
  name?: string | null;
  claims: Record<string, any>;
}

export async function getAuthenticatedUser(
  request: Request,
  env: { CLERK_SECRET_KEY?: string }
): Promise<AuthenticatedUser | null> {
  const secretKey = env.CLERK_SECRET_KEY;

  if (!secretKey) {
    console.error('CLERK_SECRET_KEY is not configured in environment.');
    return null;
  }

  let token: string | null = null;

  // 1. Try Authorization: Bearer <token>
  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    token = authHeader.substring(7).trim();
  }

  // 2. Fallback: Parse Cookie header for __session
  if (!token) {
    const cookieHeader = request.headers.get('Cookie') || request.headers.get('cookie') || '';
    const cookiePairs = cookieHeader.split(';').map((c) => c.trim().split('='));
    for (const [k, ...v] of cookiePairs) {
      if (k === '__session') {
        token = decodeURIComponent(v.join('='));
        break;
      }
    }
  }

  if (!token) {
    return null;
  }

  try {
    const origin = request.headers.get('Origin') || request.headers.get('origin');
    const isProd = origin?.includes('clickfornothing.com');

    let payload: any;
    try {
      payload = await verifyToken(token, {
        secretKey,
        ...(isProd ? { authorizedParties: ['https://clickfornothing.com', 'https://www.clickfornothing.com'] } : {}),
      });
    } catch {
      payload = await verifyToken(token, { secretKey });
    }

    if (!payload || !payload.sub) {
      return null;
    }

    const userId = payload.sub as string;
    const email = (payload.email as string) || (payload.primary_email as string) || null;
    const name = (payload.name as string) || (payload.username as string) || null;

    return {
      userId,
      email,
      name,
      claims: payload,
    };
  } catch (err) {
    console.warn('[AUTH_ERROR] Clerk session token verification failed:', err);
    return null;
  }
}
