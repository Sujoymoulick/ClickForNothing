import {
  onRequestGet as getSubmissions,
  onRequestPut as updateSubmissions,
  onRequestPatch as patchSubmissions,
  onRequestDelete as deleteSubmission,
} from '../functions/api/submissions';
import { onRequestGet as getStats } from '../functions/api/stats';
import { onRequestGet as getAdminUsers } from '../functions/api/admin-users';
import { onRequestGet as getSiteOfTheDay } from '../functions/api/site-of-the-day';
import { onRequestPost as createSubmission } from '../functions/api/submit';
import { onRequestGet as getPublishedSites } from '../functions/api/published';
import {
  onRequestGet as getInteractions,
  onRequestPost as recordInteraction,
} from '../functions/api/interactions';

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DATABASE_URL?: string;
  CLERK_SECRET_KEY?: string;
  ADMIN_SECRET_KEY?: string;
  ADMIN_EMAIL?: string;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = new URL(request.url).pathname.replace(/\/+$/, '') || '/';

    if (pathname === '/api/submissions') {
      if (request.method === 'GET') return getSubmissions({ request, env });
      if (request.method === 'PUT') return updateSubmissions({ request, env });
      if (request.method === 'PATCH') return patchSubmissions({ request, env });
      if (request.method === 'DELETE') return deleteSubmission({ request, env });
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            Allow: 'GET, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Methods': 'GET, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-key',
          },
        });
      }
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, PUT, PATCH, DELETE, OPTIONS' },
      });
    }

    if (pathname === '/api/admin/users') {
      if (request.method === 'GET') return getAdminUsers({ request, env });
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET' } });
    }

    if (pathname === '/api/site-of-the-day') {
      if (request.method === 'GET') return getSiteOfTheDay({ request, env });
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET' } });
    }

    if (pathname === '/api/stats') {
      if (request.method === 'GET') return getStats({ request, env });
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET' } });
    }

    if (pathname === '/api/submit') {
      if (request.method === 'POST') return createSubmission({ request, env });
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            Allow: 'POST, OPTIONS',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        });
      }
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'POST, OPTIONS' },
      });
    }

    if (pathname === '/api/published') {
      if (request.method === 'GET') return getPublishedSites({ request, env });
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            Allow: 'GET, OPTIONS',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
          },
        });
      }
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, OPTIONS' },
      });
    }

    if (pathname === '/api/interactions') {
      if (request.method === 'GET') return getInteractions({ request, env });
      if (request.method === 'POST') return recordInteraction({ request, env });
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            Allow: 'GET, POST, OPTIONS',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, POST, OPTIONS' },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
