// Compatibility export for any existing imports; canonical collection lives in websites.ts.
import { websites } from './websites.ts';

export const uselessSites = websites.map(({ url }) => url);
