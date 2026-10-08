import {
  onRequestGet as getSubmissions,
  onRequestPut as updateSubmissions,
  onRequestPatch as patchSubmissions,
} from '../functions/api/submissions';
import { onRequestPost as createSubmission } from '../functions/api/submit';
import { onRequestGet as getPublishedSites } from '../functions/api/published';

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DATABASE_URL?: string;
  CLERK_SECRET_KEY?: string;
  ADMIN_SECRET_KEY?: string;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = new URL(request.url).pathname.replace(/\/+$/, '') || '/';

    if (pathname === '/api/submissions') {
      if (request.method === 'GET') return getSubmissions({ request, env });
      if (request.method === 'PUT') return updateSubmissions({ request, env });
      if (request.method === 'PATCH') return patchSubmissions({ request, env });
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            Allow: 'GET, PUT, PATCH, OPTIONS',
            'Access-Control-Allow-Methods': 'GET, PUT, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-key',
          },
        });
      }
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, PUT, PATCH, OPTIONS' },
      });
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

    return env.ASSETS.fetch(request);
  },
};
