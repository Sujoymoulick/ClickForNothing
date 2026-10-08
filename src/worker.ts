import { onRequestGet as getSubmissions, onRequestPatch as patchSubmissions } from '../functions/api/submissions';
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
      if (request.method === 'PATCH') return patchSubmissions({ request, env });
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, PATCH' },
      });
    }

    if (pathname === '/api/submit') {
      if (request.method === 'POST') return createSubmission({ request, env });
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'POST' },
      });
    }

    if (pathname === '/api/published') {
      if (request.method === 'GET') return getPublishedSites({ request, env });
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET' },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
