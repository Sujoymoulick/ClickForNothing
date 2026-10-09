// Category normalization mapping
export function normalizeCategorySlug(categoryName: string | null | undefined): string {
  if (!categoryName) return 'useless-websites';
  const clean = categoryName.trim().toLowerCase();
  
  const validSlugs = new Set([
    'useless-websites', 'weird-websites', 'silly-animals', 'interactive',
    'mini-games', 'creative', 'visual-oddities', 'music-sounds',
    'internet-nostalgia', 'funny-websites', 'time-wasters', 'internet-experiments',
    'food-for-thought'
  ]);
  if (validSlugs.has(clean)) return clean;

  const map: Record<string, string> = {
    'silly animals': 'silly-animals',
    'silly-animals': 'silly-animals',
    'animals': 'silly-animals',
    'internet nostalgia': 'internet-nostalgia',
    'internet-nostalgia': 'internet-nostalgia',
    'nostalgia': 'internet-nostalgia',
    'creative & art toys': 'creative',
    'creative-&-art-toys': 'creative',
    'creative': 'creative',
    'art': 'creative',
    'food for thought': 'food-for-thought',
    'food-for-thought': 'food-for-thought',
    'food': 'food-for-thought',
    'music & sound buttons': 'music-sounds',
    'music & sounds': 'music-sounds',
    'music-sounds': 'music-sounds',
    'music': 'music-sounds',
    'sounds': 'music-sounds',
    'visual oddities': 'visual-oddities',
    'visual-oddities': 'visual-oddities',
    'interactive web experiments': 'interactive',
    'interactive': 'interactive',
    'useless websites': 'useless-websites',
    'useless-websites': 'useless-websites',
    'useless': 'useless-websites',
    'ultimate time wasters': 'time-wasters',
    'time wasters': 'time-wasters',
    'time-wasters': 'time-wasters',
    'pointless mini games': 'mini-games',
    'mini games': 'mini-games',
    'mini-games': 'mini-games',
    'games': 'mini-games',
    'internet experiments': 'internet-experiments',
    'internet-experiments': 'internet-experiments',
    'experiments': 'internet-experiments',
    'meme': 'internet-nostalgia',
    'funny & humor websites': 'funny-websites',
    'funny': 'funny-websites',
    'funny-websites': 'funny-websites',
    'humor': 'funny-websites',
    'weird websites': 'weird-websites',
    'weird': 'weird-websites',
    'weird-websites': 'weird-websites',
  };
  return map[clean] || map[clean.replace(/\s+/g, '-')] || 'useless-websites';
}

// Deterministic likes generator matching reference screenshot
export function getLikesForSite(id: string): { raw: number; formatted: string } {
  const topLikes: Record<string, number> = {
    'cat-bounce': 2410,
    'long-doge-challenge': 3120,
    'mondrian-and-me': 1890,
    'potato-or-tomato': 4680,
    'heeeeeeeey': 6210,
    'rrr-ggg-bbb': 1140,
    'pointer-pointer': 3840,
    'nyan-cat': 8920,
    'rainy-mood': 2580,
    'falling-falling': 5130,
  };

  if (topLikes[id]) {
    const raw = topLikes[id];
    return { raw, formatted: (raw / 1000).toFixed(1) + 'K' };
  }

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const raw = 850 + (hash % 6200);
  return {
    raw,
    formatted: (raw / 1000).toFixed(1) + 'K',
  };
}

// Category SVG Icons
export const categoryIcons: Record<string, string> = {
  all: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  'useless-websites': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>`,
  'weird-websites': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  'silly-animals': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 4.5-2.26 4.5-2.26s.26 2.72-1.74 4.5c.78.88 1.24 2.03 1.24 3.5 0 4.42-3.58 8-8 8s-8-3.58-8-8c0-1.47.46-2.62 1.24-3.5-2-1.78-1.74-4.5-1.74-4.5s2.72.26 4.5 2.26c.65-.17 1.33-.26 2-.26z"></path><circle cx="9" cy="11" r="1"></circle><circle cx="15" cy="11" r="1"></circle><path d="M10 15c.5.5 1.5 1 2 1s1.5-.5 2-1"></path></svg>`,
  'interactive': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="m13 13 6 6"></path></svg>`,
  'mini-games': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="4"></rect></svg>`,
  'creative': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"></path></svg>`,
  'visual-oddities': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10"></path><circle cx="12" cy="12" r="4"></circle></svg>`,
  'music-sounds': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
  'internet-nostalgia': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><circle cx="8" cy="12" r="2"></circle><circle cx="16" cy="12" r="2"></circle><path d="M8 14h8"></path></svg>`,
  'funny-websites': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
  'time-wasters': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  'internet-experiments': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31L4.54 18.4A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.66-3.1L14 9.31V2"></path><line x1="8.5" y1="2" x2="15.5" y2="2"></line><line x1="7" y1="15" x2="17" y2="15"></line></svg>`,
  'food-for-thought': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 11-1 9"></path><path d="m19 11-4-7-4 7"></path><path d="M2 11h20"></path><path d="m5 11 1 9"></path><path d="M9 11v9"></path></svg>`,
};

// Generates lightweight, high-fidelity SVG thumbnail preview artwork
export function getSiteThumbnailSvg(id: string, name: string, categorySlug: string): string {
  // 1. Featured items matching the screenshot
  if (id === 'cat-bounce') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#fce7f3"/>
      <path d="M30 110 Q 70 30 120 75 T 210 50" fill="none" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="4,4"/>
      <!-- Bouncing Cat -->
      <g transform="translate(100, 45)">
        <polygon points="12,10 2,0 8,18" fill="#fda4af"/>
        <polygon points="28,10 38,0 32,18" fill="#fda4af"/>
        <circle cx="20" cy="22" r="18" fill="#ffffff" stroke="#fb7185" stroke-width="2"/>
        <circle cx="14" cy="19" r="2.5" fill="#18181b"/>
        <circle cx="26" cy="19" r="2.5" fill="#18181b"/>
        <polygon points="18,24 22,24 20,26" fill="#f43f5e"/>
        <line x1="6" y1="21" x2="12" y2="23" stroke="#18181b" stroke-width="1.5"/>
        <line x1="6" y1="26" x2="12" y2="26" stroke="#18181b" stroke-width="1.5"/>
        <line x1="28" y1="23" x2="34" y2="21" stroke="#18181b" stroke-width="1.5"/>
        <line x1="28" y1="26" x2="34" y2="26" stroke="#18181b" stroke-width="1.5"/>
      </g>
      <!-- Tiny baby cats bouncing -->
      <circle cx="45" cy="95" r="9" fill="#ffffff" stroke="#f472b6" stroke-width="1.5"/>
      <circle cx="185" cy="55" r="9" fill="#ffffff" stroke="#f472b6" stroke-width="1.5"/>
    </svg>`;
  }

  if (id === 'long-doge-challenge') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#fef3c7"/>
      <!-- Long Doge Body -->
      <path d="M20 75 Q 80 40 150 75 T 220 75" fill="none" stroke="#d97706" stroke-width="18" stroke-linecap="round"/>
      <!-- Doge Face -->
      <g transform="translate(145, 45)">
        <polygon points="10,8 5,-2 18,5" fill="#b45309"/>
        <polygon points="35,8 40,-2 27,5" fill="#b45309"/>
        <ellipse cx="22" cy="22" rx="20" ry="17" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="22" cy="26" rx="9" ry="8" fill="#fef08a"/>
        <circle cx="14" cy="18" r="2.5" fill="#18181b"/>
        <circle cx="30" cy="18" r="2.5" fill="#18181b"/>
        <ellipse cx="22" cy="24" rx="4" ry="2.5" fill="#18181b"/>
      </g>
      <text x="35" y="45" font-family="'Comic Sans MS', sans-serif" font-size="12" font-weight="bold" fill="#d97706">much wow</text>
      <text x="50" y="125" font-family="'Comic Sans MS', sans-serif" font-size="11" font-weight="bold" fill="#b45309">so long</text>
    </svg>`;
  }

  if (id === 'mondrian-and-me') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#f8fafc"/>
      <!-- Color blocks -->
      <rect x="0" y="0" width="80" height="90" fill="#ef4444"/>
      <rect x="180" y="70" width="60" height="80" fill="#3b82f6"/>
      <rect x="0" y="115" width="45" height="35" fill="#eab308"/>
      <!-- Black grid bars -->
      <line x1="80" y1="0" x2="80" y2="150" stroke="#09090b" stroke-width="6"/>
      <line x1="180" y1="0" x2="180" y2="150" stroke="#09090b" stroke-width="6"/>
      <line x1="0" y1="90" x2="240" y2="90" stroke="#09090b" stroke-width="6"/>
      <line x1="0" y1="115" x2="80" y2="115" stroke="#09090b" stroke-width="5"/>
      <line x1="80" y1="35" x2="180" y2="35" stroke="#09090b" stroke-width="5"/>
    </svg>`;
  }

  if (id === 'potato-or-tomato') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="120" height="150" fill="#ffedd5"/>
      <rect x="120" y="0" width="120" height="150" fill="#fee2e2"/>
      <line x1="120" y1="0" x2="120" y2="150" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4"/>
      <!-- Potato -->
      <g transform="translate(38, 48)">
        <ellipse cx="25" cy="28" rx="26" ry="22" fill="#d97706" transform="rotate(-10 25 28)"/>
        <circle cx="18" cy="24" r="2" fill="#78350f"/>
        <circle cx="28" cy="24" r="2" fill="#78350f"/>
        <path d="M20 32 Q 23 35 26 32" stroke="#78350f" stroke-width="1.5" fill="none"/>
      </g>
      <!-- VS / ? -->
      <circle cx="120" cy="75" r="16" fill="#ffffff" stroke="#18181b" stroke-width="2"/>
      <text x="120" y="81" font-family="'Lilita One', sans-serif" font-size="16" font-weight="900" fill="#18181b" text-anchor="middle">?</text>
      <!-- Tomato -->
      <g transform="translate(150, 48)">
        <circle cx="25" cy="28" r="24" fill="#ef4444"/>
        <!-- Stem -->
        <polygon points="25,5 21,12 29,12" fill="#15803d"/>
        <circle cx="19" cy="25" r="2" fill="#ffffff"/>
        <circle cx="31" cy="25" r="2" fill="#ffffff"/>
        <path d="M21 34 Q 25 38 29 34" stroke="#ffffff" stroke-width="1.5" fill="none"/>
      </g>
    </svg>`;
  }

  if (id === 'heeeeeeeey') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hey-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e"/>
          <stop offset="50%" stop-color="#ec4899"/>
          <stop offset="100%" stop-color="#8b5cf6"/>
        </linearGradient>
      </defs>
      <rect width="240" height="150" fill="url(#hey-grad)"/>
      <!-- Retro stripe lines -->
      <path d="M0 120 C 60 100, 120 140, 240 110 L 240 150 L 0 150 Z" fill="rgba(255,255,255,0.15)"/>
      <path d="M0 40 C 90 20, 150 60, 240 30 L 240 0 L 0 0 Z" fill="rgba(255,255,255,0.1)"/>
      <text x="120" y="88" font-family="'Lilita One', impact, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">HEEEEY!</text>
      <text x="122" y="90" font-family="'Lilita One', impact, sans-serif" font-size="34" font-weight="900" fill="#09080c" opacity="0.3" text-anchor="middle" letter-spacing="1" z-index="-1">HEEEEY!</text>
    </svg>`;
  }

  if (id === 'rrr-ggg-bbb') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#09090b"/>
      <g style="mix-blend-mode: screen;">
        <!-- Red circle -->
        <circle cx="100" cy="65" r="38" fill="#ef4444" opacity="0.9"/>
        <!-- Green circle -->
        <circle cx="140" cy="65" r="38" fill="#22c55e" opacity="0.9"/>
        <!-- Blue circle -->
        <circle cx="120" cy="98" r="38" fill="#3b82f6" opacity="0.9"/>
      </g>
      <text x="120" y="140" font-family="monospace" font-size="11" font-weight="bold" fill="#71717a" text-anchor="middle">RGB COLOR SPACE</text>
    </svg>`;
  }

  if (id === 'pointer-pointer') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#18181b"/>
      <!-- Grid -->
      <line x1="0" y1="75" x2="240" y2="75" stroke="#27272a" stroke-width="1.5"/>
      <line x1="120" y1="0" x2="120" y2="150" stroke="#27272a" stroke-width="1.5"/>
      <circle cx="120" cy="75" r="35" fill="none" stroke="#3f3f46" stroke-width="1.5" stroke-dasharray="3,3"/>
      <circle cx="120" cy="75" r="58" fill="none" stroke="#27272a" stroke-width="1"/>
      <circle cx="120" cy="75" r="4" fill="#f43f5e"/>
      <!-- Pointing Finger Icon -->
      <g transform="translate(65, 45)">
        <path d="M10 20 L 40 30 L 32 38 L 48 54 L 40 62 L 24 46 L 16 54 Z" fill="#ffffff" stroke="#18181b" stroke-width="2"/>
      </g>
      <text x="180" y="130" font-family="monospace" font-size="10" fill="#a1a1aa">(X:120, Y:75)</text>
    </svg>`;
  }

  if (id === 'nyan-cat') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#0b132b"/>
      <!-- Rainbow Trail -->
      <rect x="0" y="55" width="130" height="6" fill="#ef4444"/>
      <rect x="0" y="61" width="130" height="6" fill="#f97316"/>
      <rect x="0" y="67" width="130" height="6" fill="#eab308"/>
      <rect x="0" y="73" width="130" height="6" fill="#22c55e"/>
      <rect x="0" y="79" width="130" height="6" fill="#3b82f6"/>
      <rect x="0" y="85" width="130" height="6" fill="#8b5cf6"/>
      <!-- Pop-Tart -->
      <g transform="translate(125, 48)">
        <rect x="0" y="5" width="48" height="40" rx="6" fill="#fed7aa" stroke="#18181b" stroke-width="2"/>
        <rect x="4" y="9" width="40" height="32" rx="4" fill="#f472b6"/>
        <circle cx="12" cy="18" r="1.5" fill="#f43f5e"/>
        <circle cx="28" cy="25" r="1.5" fill="#f43f5e"/>
        <circle cx="34" cy="16" r="1.5" fill="#f43f5e"/>
        <!-- Cat Face -->
        <circle cx="48" cy="25" r="14" fill="#94a3b8" stroke="#18181b" stroke-width="2"/>
        <polygon points="40,12 43,4 49,11" fill="#94a3b8"/>
        <polygon points="52,11 58,4 60,12" fill="#94a3b8"/>
        <circle cx="44" cy="23" r="2" fill="#18181b"/>
        <circle cx="53" cy="23" r="2" fill="#18181b"/>
      </g>
      <!-- Twinkling stars -->
      <text x="40" y="35" font-size="14" fill="#ffffff">✦</text>
      <text x="200" y="35" font-size="12" fill="#facc15">★</text>
      <text x="195" y="125" font-size="14" fill="#ffffff">✦</text>
      <text x="30" y="125" font-size="11" fill="#facc15">★</text>
    </svg>`;
  }

  if (id === 'rainy-mood') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rain-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="240" height="150" fill="url(#rain-grad)"/>
      <!-- Cloud -->
      <g transform="translate(90, 32)">
        <path d="M15 35 A15 15 0 0 1 35 15 A22 22 0 0 1 65 20 A15 15 0 0 1 75 35 Z" fill="#64748b" opacity="0.75"/>
      </g>
      <!-- Raindrops -->
      <line x1="85" y1="85" x2="75" y2="115" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="115" y1="80" x2="105" y2="120" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="145" y1="85" x2="135" y2="115" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="170" y1="75" x2="160" y2="105" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="75" x2="50" y2="105" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      <line x1="195" y1="85" x2="185" y2="115" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    </svg>`;
  }

  if (id === 'falling-falling') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#a855f7"/>
      <rect x="25" y="15" width="190" height="120" fill="#ec4899"/>
      <rect x="50" y="30" width="140" height="90" fill="#facc15"/>
      <rect x="75" y="45" width="90" height="60" fill="#06b6d4"/>
      <rect x="100" y="60" width="40" height="30" fill="#3b82f6"/>
      <rect x="112" y="69" width="16" height="12" fill="#18181b"/>
    </svg>`;
  }

  // 2. Category-thematic fallbacks for the rest of the 86 websites
  if (categorySlug === 'mini-games') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#fdf2f8"/>
      <rect x="50" y="35" width="140" height="80" rx="16" fill="#18181b"/>
      <!-- D-Pad -->
      <rect x="75" y="65" width="30" height="10" fill="#71717a" rx="2"/>
      <rect x="85" y="55" width="10" height="30" fill="#71717a" rx="2"/>
      <!-- Action buttons -->
      <circle cx="155" cy="65" r="7" fill="#f43f5e"/>
      <circle cx="170" cy="78" r="7" fill="#eab308"/>
      <text x="120" y="138" font-family="'Lilita One', sans-serif" font-size="12" fill="#db2777" text-anchor="middle">MINI GAME</text>
    </svg>`;
  }

  if (categorySlug === 'silly-animals') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#ecfdf5"/>
      <circle cx="120" cy="70" r="36" fill="#34d399"/>
      <circle cx="110" cy="62" r="4" fill="#064e3b"/>
      <circle cx="130" cy="62" r="4" fill="#064e3b"/>
      <path d="M112 78 Q 120 86 128 78" stroke="#064e3b" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="90" cy="40" rx="10" ry="16" fill="#10b981" transform="rotate(-20 90 40)"/>
      <ellipse cx="150" cy="40" rx="10" ry="16" fill="#10b981" transform="rotate(20 150 40)"/>
      <text x="120" y="135" font-family="'Lilita One', sans-serif" font-size="12" fill="#059669" text-anchor="middle">SILLY ANIMAL</text>
    </svg>`;
  }

  if (categorySlug === 'music-sounds') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#f5f3ff"/>
      <g transform="translate(60, 40)">
        <rect x="0" y="25" width="12" height="40" rx="4" fill="#8b5cf6"/>
        <rect x="20" y="10" width="12" height="55" rx="4" fill="#a855f7"/>
        <rect x="40" y="0" width="12" height="65" rx="4" fill="#c084fc"/>
        <rect x="60" y="15" width="12" height="50" rx="4" fill="#a855f7"/>
        <rect x="80" y="30" width="12" height="35" rx="4" fill="#8b5cf6"/>
        <rect x="100" y="40" width="12" height="25" rx="4" fill="#7c3aed"/>
      </g>
      <text x="120" y="135" font-family="'Lilita One', sans-serif" font-size="12" fill="#7c3aed" text-anchor="middle">SOUND & BEAT</text>
    </svg>`;
  }

  if (categorySlug === 'creative') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#fff7ed"/>
      <path d="M30 110 C 60 20, 180 140, 210 40" fill="none" stroke="#f97316" stroke-width="12" stroke-linecap="round"/>
      <path d="M40 50 C 90 140, 160 30, 200 110" fill="none" stroke="#fbbf24" stroke-width="8" stroke-linecap="round" opacity="0.8"/>
      <circle cx="120" cy="75" r="14" fill="#ef4444"/>
      <text x="120" y="138" font-family="'Lilita One', sans-serif" font-size="12" fill="#ea580c" text-anchor="middle">CREATIVE ART</text>
    </svg>`;
  }

  if (categorySlug === 'internet-nostalgia') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#008080"/>
      <!-- Retro Window -->
      <rect x="45" y="25" width="150" height="95" fill="#c0c0c0" stroke="#ffffff" stroke-width="2"/>
      <rect x="47" y="27" width="146" height="18" fill="#000080"/>
      <text x="54" y="40" font-family="monospace" font-size="10" font-weight="bold" fill="#ffffff">C:\\USENET\\90s.EXE</text>
      <rect x="175" y="29" width="14" height="14" fill="#c0c0c0" stroke="#000000" stroke-width="1"/>
      <text x="180" y="40" font-family="monospace" font-size="11" font-weight="bold" fill="#000000">X</text>
      <text x="120" y="80" font-family="monospace" font-size="12" font-weight="bold" fill="#000000" text-anchor="middle">UNDER CONSTRUCTION</text>
      <text x="120" y="100" font-family="monospace" font-size="14" text-anchor="middle">🚧 💾 📼</text>
    </svg>`;
  }

  if (categorySlug === 'visual-oddities') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#18181b"/>
      <circle cx="120" cy="75" r="50" fill="none" stroke="#ffffff" stroke-width="6"/>
      <circle cx="120" cy="75" r="35" fill="none" stroke="#a1a1aa" stroke-width="5"/>
      <circle cx="120" cy="75" r="22" fill="none" stroke="#ffffff" stroke-width="4"/>
      <circle cx="120" cy="75" r="10" fill="none" stroke="#71717a" stroke-width="3"/>
      <text x="120" y="140" font-family="'Lilita One', sans-serif" font-size="12" fill="#a1a1aa" text-anchor="middle">VISUAL ODDITY</text>
    </svg>`;
  }

  if (categorySlug === 'interactive') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#f0fdf4"/>
      <circle cx="120" cy="75" r="45" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,4"/>
      <circle cx="120" cy="75" r="28" fill="none" stroke="#16a34a" stroke-width="2"/>
      <circle cx="120" cy="75" r="12" fill="#86efac"/>
      <path d="M120 75 L 145 105 L 135 110 L 150 125 L 140 130 L 125 115 L 118 122 Z" fill="#15803d" stroke="#ffffff" stroke-width="2"/>
      <text x="120" y="28" font-family="'Lilita One', sans-serif" font-size="12" fill="#16a34a" text-anchor="middle">CLICK / INTERACT</text>
    </svg>`;
  }

  if (categorySlug === 'internet-experiments') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#0f172a"/>
      <!-- Lab Flask -->
      <g transform="translate(100, 30)">
        <path d="M15 0 L 25 0 L 25 25 L 42 60 A 6 6 0 0 1 36 68 L 4 68 A 6 6 0 0 1 -2 60 L 15 25 Z" fill="none" stroke="#38bdf8" stroke-width="3"/>
        <path d="M5 45 L 35 45 L 36 65 L 4 65 Z" fill="#0284c7" opacity="0.7"/>
        <circle cx="16" cy="52" r="3" fill="#ffffff" opacity="0.8"/>
        <circle cx="26" cy="58" r="2" fill="#ffffff" opacity="0.8"/>
      </g>
      <text x="120" y="132" font-family="monospace" font-size="11" fill="#38bdf8" text-anchor="middle">EXPERIMENT #42</text>
    </svg>`;
  }

  if (categorySlug === 'funny-websites') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#fef9c3"/>
      <circle cx="120" cy="70" r="36" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
      <!-- Winking / funny face -->
      <circle cx="106" cy="62" r="4" fill="#18181b"/>
      <path d="M126 62 Q 134 58 136 64" stroke="#18181b" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M106 78 Q 120 95 134 78" fill="#ef4444" stroke="#18181b" stroke-width="2"/>
      <text x="120" y="135" font-family="'Lilita One', sans-serif" font-size="12" fill="#a16207" text-anchor="middle">FUNNY & WEIRD</text>
    </svg>`;
  }

  if (categorySlug === 'food-for-thought') {
    return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill="#ffedd5"/>
      <!-- Pizza Slice -->
      <polygon points="120,30 80,105 160,105" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
      <path d="M78 105 Q 120 115 162 105" stroke="#78350f" stroke-width="8" stroke-linecap="round" fill="none"/>
      <circle cx="112" cy="75" r="6" fill="#ef4444"/>
      <circle cx="130" cy="88" r="5" fill="#ef4444"/>
      <circle cx="118" cy="55" r="4" fill="#ef4444"/>
      <text x="120" y="138" font-family="'Lilita One', sans-serif" font-size="12" fill="#c2410c" text-anchor="middle">FOOD FOR THOUGHT</text>
    </svg>`;
  }

  // Default fallback for useless websites / time wasters
  return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="150" fill="#f4f4f5"/>
    <circle cx="120" cy="65" r="32" fill="#e4e4e7" stroke="#a1a1aa" stroke-width="2"/>
    <path d="M120 45 C 130 45 136 52 132 60 C 128 66 120 68 120 75" fill="none" stroke="#71717a" stroke-width="4" stroke-linecap="round"/>
    <circle cx="120" cy="84" r="3" fill="#71717a"/>
    <text x="120" y="128" font-family="'Lilita One', sans-serif" font-size="13" fill="#52525b" text-anchor="middle">${name.slice(0, 16)}</text>
  </svg>`;
}
