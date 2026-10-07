import { neon } from '@neondatabase/serverless';

export function getDb(env: { DATABASE_URL?: string; [key: string]: any }) {
  const databaseUrl = env.DATABASE_URL || process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured.');
  }
  return neon(databaseUrl);
}

/**
 * Basic HTML escaping to prevent stored XSS attacks
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validate and normalize URL
 */
export function validateUrl(rawUrl: string): { valid: boolean; normalized?: string; error?: string } {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { valid: false, error: 'URL is required' };
  }

  const trimmed = rawUrl.trim();
  if (trimmed.length > 2048) {
    return { valid: false, error: 'URL is too long (max 2048 characters)' };
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { valid: false, error: 'URL must start with http:// or https://' };
    }
    // Prevent javascript: or data: inside URL
    if (parsed.href.toLowerCase().startsWith('javascript:') || parsed.href.toLowerCase().startsWith('data:')) {
      return { valid: false, error: 'Invalid URL protocol' };
    }
    return { valid: true, normalized: parsed.href };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}
