export interface CardDesign {
  id: string;
  name: string;
  themeSlug: string;
  tag: string;
  emoji: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  description: string;
}

export const CARD_DESIGNS: CardDesign[] = [
  {
    id: 'gift-box',
    name: 'Virtual Gift Box',
    themeSlug: 'pink',
    tag: 'Digital Surprise',
    emoji: '🎁',
    bgColor: '#ffe2f5',
    textColor: '#09080c',
    accentColor: '#f20caf',
    borderColor: '#09080c',
    badgeBg: '#fce7f3',
    badgeText: '#be185d',
    description: 'Delightful 3D isometric gift box with floating hearts, ribbons, and digital surprise styling.',
  },
  {
    id: 'cat-bounce',
    name: 'Cat Bounce',
    themeSlug: 'pink',
    tag: 'Bouncing Kitty',
    emoji: '🐱',
    bgColor: '#fce7f3',
    textColor: '#09080c',
    accentColor: '#f472b6',
    borderColor: '#09080c',
    badgeBg: '#fdf2f8',
    badgeText: '#db2777',
    description: 'Playful bouncy kitty with dashed trajectory arcs and cute physics doodle.',
  },
  {
    id: 'long-doge',
    name: 'Long Doge Challenge',
    themeSlug: 'amber',
    tag: 'Much Wow',
    emoji: '🐕',
    bgColor: '#fef3c7',
    textColor: '#09080c',
    accentColor: '#d97706',
    borderColor: '#09080c',
    badgeBg: '#ffedd5',
    badgeText: '#b45309',
    description: 'Endless golden wavy doge challenge with classic meme flair and "much wow".',
  },
  {
    id: 'mondrian',
    name: 'Mondrian & Me',
    themeSlug: 'cream',
    tag: 'Modern Art',
    emoji: '🎨',
    bgColor: '#f8fafc',
    textColor: '#09080c',
    accentColor: '#ef4444',
    borderColor: '#09080c',
    badgeBg: '#e2e8f0',
    badgeText: '#0f172a',
    description: 'Piet Mondrian geometric grid with primary red, blue, and yellow neo-plasticism blocks.',
  },
  {
    id: 'versus',
    name: 'Potato or Tomato',
    themeSlug: 'amber',
    tag: 'Versus Duel',
    emoji: '🥔',
    bgColor: '#ffedd5',
    textColor: '#09080c',
    accentColor: '#ea580c',
    borderColor: '#09080c',
    badgeBg: '#fed7aa',
    badgeText: '#c2410c',
    description: 'Split pastel duel showdown with cute character faces and center question badge.',
  },
  {
    id: 'heeeey',
    name: 'HEEEEEEEY!',
    themeSlug: 'pink',
    tag: 'Retro Poster',
    emoji: '🎉',
    bgColor: '#fdf4ff',
    textColor: '#09080c',
    accentColor: '#d946ef',
    borderColor: '#09080c',
    badgeBg: '#fae8ff',
    badgeText: '#a21caf',
    description: 'Electric vibrant neon gradient poster with bold isometric 3D typography.',
  },
  {
    id: 'rgb',
    name: 'RGB Color Space',
    themeSlug: 'cyber',
    tag: 'Additive Screen',
    emoji: '🔴',
    bgColor: '#09090b',
    textColor: '#f4f4f5',
    accentColor: '#22c55e',
    borderColor: '#27272a',
    badgeBg: '#18181b',
    badgeText: '#a1a1aa',
    description: 'Dark night canvas with glowing red, green, and blue additive screen blend circles.',
  },
  {
    id: 'pointer',
    name: 'Pointer Pointer',
    themeSlug: 'cyber',
    tag: 'Target Radar',
    emoji: '🎯',
    bgColor: '#18181b',
    textColor: '#f4f4f5',
    accentColor: '#f43f5e',
    borderColor: '#3f3f46',
    badgeBg: '#27272a',
    badgeText: '#e4e4e7',
    description: 'Cybernetic crosshair radar grid with retro pointing hand cursor.',
  },
  {
    id: 'windows-93',
    name: 'Windows 93',
    themeSlug: 'cyan',
    tag: '90s Desktop',
    emoji: '💾',
    bgColor: '#008080',
    textColor: '#ffffff',
    accentColor: '#000080',
    borderColor: '#09080c',
    badgeBg: '#c0c0c0',
    badgeText: '#000080',
    description: 'Retro 1993 teal desktop with classic 90s window and vintage computer icons.',
  },
  {
    id: 'falling-falling',
    name: 'Falling Falling',
    themeSlug: 'purple',
    tag: 'Hypnotic Tunnel',
    emoji: '🌀',
    bgColor: '#a855f7',
    textColor: '#ffffff',
    accentColor: '#facc15',
    borderColor: '#09080c',
    badgeBg: '#f3e8ff',
    badgeText: '#7e22ce',
    description: 'Nested psychedelic colorful cascading rectangular tunnel.',
  },
  {
    id: 'interactive',
    name: 'Interactive Target',
    themeSlug: 'cyan',
    tag: 'Radar Rings',
    emoji: '👆',
    bgColor: '#f0fdf4',
    textColor: '#09080c',
    accentColor: '#16a34a',
    borderColor: '#09080c',
    badgeBg: '#dcfce7',
    badgeText: '#15803d',
    description: 'Mint radar circle target rings with click pointer cursor.',
  },
  {
    id: 'silly-animal',
    name: 'Silly Mascot',
    themeSlug: 'cyan',
    tag: 'Cute Creature',
    emoji: '🐻',
    bgColor: '#ecfdf5',
    textColor: '#09080c',
    accentColor: '#10b981',
    borderColor: '#09080c',
    badgeBg: '#d1fae5',
    badgeText: '#047857',
    description: 'Charming creature mascot face with friendly ears and neo-brutalist badge.',
  },
];

const ALIAS_MAP: Record<string, string> = {
  // Direct IDs
  'gift-box': 'gift-box',
  'cat-bounce': 'cat-bounce',
  'long-doge': 'long-doge',
  'long-doge-challenge': 'long-doge',
  'mondrian': 'mondrian',
  'mondrian-and-me': 'mondrian',
  'versus': 'versus',
  'potato-or-tomato': 'versus',
  'heeeey': 'heeeey',
  'heeeeeeeey': 'heeeey',
  'rgb': 'rgb',
  'rrr-ggg-bbb': 'rgb',
  'pointer': 'pointer',
  'pointer-pointer': 'pointer',
  'windows-93': 'windows-93',
  'falling-falling': 'falling-falling',
  'interactive': 'interactive',
  'koalas-to-the-max': 'interactive',
  'silly-animal': 'silly-animal',
  'silly-animals': 'silly-animal',
  'eel-slap': 'silly-animal',

  // Legacy theme numbers mapped to iconic templates
  'theme-01': 'mondrian',
  'theme-1': 'mondrian',
  'cream': 'mondrian',

  'theme-02': 'cat-bounce',
  'theme-2': 'cat-bounce',
  'pink': 'cat-bounce',

  'theme-03': 'interactive',
  'theme-3': 'interactive',
  'cyan': 'interactive',

  'theme-04': 'gift-box',
  'theme-4': 'gift-box',
  'purple': 'gift-box',

  'theme-05': 'long-doge',
  'theme-5': 'long-doge',
  'amber': 'long-doge',

  'theme-06': 'windows-93',
  'theme-6': 'windows-93',
  'cyber': 'windows-93',
  'matrix': 'windows-93',
};

export const VALID_DESIGN_IDS = [
  ...CARD_DESIGNS.map((d) => d.id),
  'theme-01', 'theme-02', 'theme-03', 'theme-04', 'theme-05', 'theme-06',
  'theme-1', 'theme-2', 'theme-3', 'theme-4', 'theme-5', 'theme-6',
  'cream', 'pink', 'cyan', 'purple', 'amber', 'cyber',
];

export function normalizeDesignId(rawId: string | null | undefined): string {
  if (!rawId || typeof rawId !== 'string') return 'gift-box';
  const clean = rawId.toLowerCase().trim();
  return ALIAS_MAP[clean] || 'gift-box';
}

export function isValidDesignId(rawId: string | null | undefined): boolean {
  if (!rawId || typeof rawId !== 'string') return false;
  const clean = rawId.toLowerCase().trim();
  return Boolean(ALIAS_MAP[clean]);
}

export function getCardDesign(rawId: string | null | undefined): CardDesign {
  const normalized = normalizeDesignId(rawId);
  return CARD_DESIGNS.find((d) => d.id === normalized) || CARD_DESIGNS[0];
}

export function getThemeSlug(rawId: string | null | undefined): string {
  return getCardDesign(rawId).themeSlug;
}

function escapeXml(unsafe: string): string {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateTemplateSvg(rawDesignId: string | null | undefined, siteName: string, category?: string): string {
  const designId = normalizeDesignId(rawDesignId);
  const cleanName = escapeXml((siteName || 'WEBSITE').toUpperCase().slice(0, 20));

  switch (designId) {
    case 'gift-box': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffe4f2"/>
            <stop offset="100%" stop-color="#fce7f3"/>
          </linearGradient>
        </defs>
        <rect width="240" height="150" fill="url(#gb-grad)"/>
        <!-- Floating hearts & sparkles -->
        <text x="35" y="40" font-size="14" fill="#f43f5e" opacity="0.85">❤️</text>
        <text x="195" y="45" font-size="12" fill="#ec4899" opacity="0.85">💖</text>
        <text x="45" y="125" font-size="13" fill="#ec4899">✨</text>
        <text x="185" y="120" font-size="13" fill="#f43f5e">❤️</text>
        <!-- 3D Gift Box -->
        <g transform="translate(100, 32)">
          <rect x="0" y="20" width="40" height="34" rx="4" fill="#f43f5e" stroke="#18181b" stroke-width="2"/>
          <rect x="-4" y="14" width="48" height="9" rx="3" fill="#fb7185" stroke="#18181b" stroke-width="2"/>
          <rect x="16" y="14" width="8" height="40" fill="#fde047" stroke="#18181b" stroke-width="1.5"/>
          <line x1="0" y1="36" x2="40" y2="36" stroke="#fde047" stroke-width="5"/>
          <line x1="0" y1="36" x2="40" y2="36" stroke="#18181b" stroke-width="1.5" stroke-dasharray="2,2"/>
          <ellipse cx="14" cy="10" rx="7" ry="5" fill="#fde047" stroke="#18181b" stroke-width="2" transform="rotate(-25 14 10)"/>
          <ellipse cx="26" cy="10" rx="7" ry="5" fill="#fde047" stroke="#18181b" stroke-width="2" transform="rotate(25 26 10)"/>
          <circle cx="20" cy="12" r="3" fill="#ca8a04"/>
        </g>
        <text x="120" y="105" font-family="'Lilita One', Impact, system-ui, sans-serif" font-size="13" font-weight="900" fill="#9d174d" text-anchor="middle" letter-spacing="0.5">${cleanName}</text>
        <text x="120" y="122" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#be185d" text-anchor="middle" opacity="0.9">VIRTUAL GIFT EXPERIENCE</text>
      </svg>`;
    }

    case 'cat-bounce': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#fce7f3"/>
        <path d="M30 110 Q 70 30 120 75 T 210 50" fill="none" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="4,4"/>
        <!-- Bouncing Cat -->
        <g transform="translate(100, 38)">
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
        <circle cx="45" cy="95" r="9" fill="#ffffff" stroke="#f472b6" stroke-width="1.5"/>
        <circle cx="185" cy="55" r="9" fill="#ffffff" stroke="#f472b6" stroke-width="1.5"/>
        <text x="120" y="128" font-family="'Lilita One', Impact, sans-serif" font-size="12" font-weight="900" fill="#be185d" text-anchor="middle" letter-spacing="0.5">${cleanName}</text>
      </svg>`;
    }

    case 'long-doge': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#fef3c7"/>
        <path d="M20 72 Q 80 38 145 72 T 220 72" fill="none" stroke="#d97706" stroke-width="18" stroke-linecap="round"/>
        <g transform="translate(142, 42)">
          <polygon points="10,8 5,-2 18,5" fill="#b45309"/>
          <polygon points="35,8 40,-2 27,5" fill="#b45309"/>
          <ellipse cx="22" cy="22" rx="20" ry="17" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
          <ellipse cx="22" cy="26" rx="9" ry="8" fill="#fef08a"/>
          <circle cx="14" cy="18" r="2.5" fill="#18181b"/>
          <circle cx="30" cy="18" r="2.5" fill="#18181b"/>
          <ellipse cx="22" cy="24" rx="4" ry="2.5" fill="#18181b"/>
        </g>
        <text x="35" y="42" font-family="'Comic Sans MS', sans-serif" font-size="11" font-weight="bold" fill="#d97706">much wow</text>
        <text x="35" y="115" font-family="'Comic Sans MS', sans-serif" font-size="10" font-weight="bold" fill="#b45309">so long</text>
        <text x="120" y="136" font-family="'Lilita One', Impact, sans-serif" font-size="12" font-weight="900" fill="#92400e" text-anchor="middle" letter-spacing="0.5">${cleanName}</text>
      </svg>`;
    }

    case 'mondrian': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#f8fafc"/>
        <rect x="0" y="0" width="75" height="85" fill="#ef4444"/>
        <rect x="175" y="65" width="65" height="85" fill="#3b82f6"/>
        <rect x="0" y="110" width="45" height="40" fill="#eab308"/>
        <line x1="75" y1="0" x2="75" y2="150" stroke="#09090b" stroke-width="5"/>
        <line x1="175" y1="0" x2="175" y2="150" stroke="#09090b" stroke-width="5"/>
        <line x1="0" y1="85" x2="240" y2="85" stroke="#09090b" stroke-width="5"/>
        <line x1="0" y1="110" x2="75" y2="110" stroke="#09090b" stroke-width="4"/>
        <line x1="75" y1="35" x2="175" y2="35" stroke="#09090b" stroke-width="4"/>
        <rect x="78" y="38" width="94" height="44" fill="#ffffff" opacity="0.95"/>
        <text x="125" y="65" font-family="'Lilita One', Impact, sans-serif" font-size="11" font-weight="900" fill="#09090b" text-anchor="middle">${cleanName.slice(0, 14)}</text>
      </svg>`;
    }

    case 'versus': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="120" height="150" fill="#ffedd5"/>
        <rect x="120" y="0" width="120" height="150" fill="#fee2e2"/>
        <line x1="120" y1="0" x2="120" y2="150" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4,4"/>
        <g transform="translate(38, 42)">
          <ellipse cx="25" cy="28" rx="26" ry="22" fill="#d97706" transform="rotate(-10 25 28)"/>
          <circle cx="18" cy="24" r="2" fill="#78350f"/>
          <circle cx="28" cy="24" r="2" fill="#78350f"/>
          <path d="M20 32 Q 23 35 26 32" stroke="#78350f" stroke-width="1.5" fill="none"/>
        </g>
        <circle cx="120" cy="70" r="16" fill="#ffffff" stroke="#18181b" stroke-width="2"/>
        <text x="120" y="76" font-family="'Lilita One', sans-serif" font-size="15" font-weight="900" fill="#18181b" text-anchor="middle">?</text>
        <g transform="translate(150, 42)">
          <circle cx="25" cy="28" r="24" fill="#ef4444"/>
          <polygon points="25,5 21,12 29,12" fill="#15803d"/>
          <circle cx="19" cy="25" r="2" fill="#ffffff"/>
          <circle cx="31" cy="25" r="2" fill="#ffffff"/>
          <path d="M21 34 Q 25 38 29 34" stroke="#ffffff" stroke-width="1.5" fill="none"/>
        </g>
        <text x="120" y="130" font-family="'Lilita One', Impact, sans-serif" font-size="12" font-weight="900" fill="#9a3412" text-anchor="middle" letter-spacing="0.5">${cleanName}</text>
      </svg>`;
    }

    case 'heeeey': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hey-t-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f43f5e"/>
            <stop offset="50%" stop-color="#ec4899"/>
            <stop offset="100%" stop-color="#8b5cf6"/>
          </linearGradient>
        </defs>
        <rect width="240" height="150" fill="url(#hey-t-grad)"/>
        <path d="M0 120 C 60 100, 120 140, 240 110 L 240 150 L 0 150 Z" fill="rgba(255,255,255,0.18)"/>
        <path d="M0 40 C 90 20, 150 60, 240 30 L 240 0 L 0 0 Z" fill="rgba(255,255,255,0.12)"/>
        <text x="122" y="86" font-family="'Lilita One', Impact, sans-serif" font-size="20" font-weight="900" fill="#09080c" opacity="0.35" text-anchor="middle" letter-spacing="1">${cleanName}</text>
        <text x="120" y="84" font-family="'Lilita One', Impact, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">${cleanName}</text>
      </svg>`;
    }

    case 'rgb': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#09090b"/>
        <g style="mix-blend-mode: screen;">
          <circle cx="100" cy="62" r="36" fill="#ef4444" opacity="0.9"/>
          <circle cx="140" cy="62" r="36" fill="#22c55e" opacity="0.9"/>
          <circle cx="120" cy="94" r="36" fill="#3b82f6" opacity="0.9"/>
        </g>
        <text x="120" y="136" font-family="monospace, sans-serif" font-size="11" font-weight="bold" fill="#a1a1aa" text-anchor="middle" letter-spacing="1">${cleanName}</text>
      </svg>`;
    }

    case 'pointer': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#18181b"/>
        <line x1="0" y1="70" x2="240" y2="70" stroke="#27272a" stroke-width="1.5"/>
        <line x1="120" y1="0" x2="120" y2="150" stroke="#27272a" stroke-width="1.5"/>
        <circle cx="120" cy="70" r="35" fill="none" stroke="#3f3f46" stroke-width="1.5" stroke-dasharray="3,3"/>
        <circle cx="120" cy="70" r="56" fill="none" stroke="#27272a" stroke-width="1"/>
        <circle cx="120" cy="70" r="4" fill="#f43f5e"/>
        <g transform="translate(68, 42)">
          <path d="M10 20 L 40 30 L 32 38 L 48 54 L 40 62 L 24 46 L 16 54 Z" fill="#ffffff" stroke="#18181b" stroke-width="2"/>
        </g>
        <text x="120" y="134" font-family="monospace, sans-serif" font-size="11" fill="#f43f5e" text-anchor="middle" font-weight="bold">${cleanName}</text>
      </svg>`;
    }

    case 'windows-93': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#008080"/>
        <rect x="35" y="20" width="170" height="105" fill="#c0c0c0" stroke="#ffffff" stroke-width="2"/>
        <rect x="37" y="22" width="166" height="18" fill="#000080"/>
        <text x="44" y="35" font-family="monospace" font-size="9" font-weight="bold" fill="#ffffff">C:\\${cleanName.slice(0, 10)}.EXE</text>
        <rect x="187" y="24" width="14" height="14" fill="#c0c0c0" stroke="#000000" stroke-width="1"/>
        <text x="192" y="35" font-family="monospace" font-size="10" font-weight="bold" fill="#000000">X</text>
        <text x="120" y="70" font-family="monospace" font-size="11" font-weight="bold" fill="#000000" text-anchor="middle">UNDER CONSTRUCTION</text>
        <text x="120" y="90" font-family="monospace" font-size="14" text-anchor="middle">🚧 💾 📼</text>
        <text x="120" y="112" font-family="monospace" font-size="10" font-weight="bold" fill="#000080" text-anchor="middle">${cleanName}</text>
      </svg>`;
    }

    case 'falling-falling': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#a855f7"/>
        <rect x="22" y="14" width="196" height="122" fill="#ec4899"/>
        <rect x="46" y="28" width="148" height="94" fill="#facc15"/>
        <rect x="70" y="42" width="100" height="66" fill="#06b6d4"/>
        <rect x="94" y="56" width="52" height="38" fill="#3b82f6"/>
        <rect x="108" y="66" width="24" height="18" fill="#18181b"/>
        <text x="120" y="130" font-family="'Lilita One', Impact, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">${cleanName}</text>
      </svg>`;
    }

    case 'interactive': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#f0fdf4"/>
        <circle cx="120" cy="70" r="45" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,4"/>
        <circle cx="120" cy="70" r="28" fill="none" stroke="#16a34a" stroke-width="2"/>
        <circle cx="120" cy="70" r="12" fill="#86efac"/>
        <path d="M120 70 L 145 100 L 135 105 L 150 120 L 140 125 L 125 110 L 118 117 Z" fill="#15803d" stroke="#ffffff" stroke-width="2"/>
        <text x="120" y="25" font-family="'Lilita One', sans-serif" font-size="11" fill="#16a34a" text-anchor="middle">CLICK / INTERACT</text>
        <text x="120" y="136" font-family="'Lilita One', Impact, sans-serif" font-size="12" font-weight="900" fill="#15803d" text-anchor="middle" letter-spacing="0.5">${cleanName}</text>
      </svg>`;
    }

    case 'silly-animal': {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#ecfdf5"/>
        <circle cx="120" cy="65" r="36" fill="#34d399"/>
        <circle cx="110" cy="57" r="4" fill="#064e3b"/>
        <circle cx="130" cy="57" r="4" fill="#064e3b"/>
        <path d="M112 73 Q 120 81 128 73" stroke="#064e3b" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="90" cy="35" rx="10" ry="16" fill="#10b981" transform="rotate(-20 90 35)"/>
        <ellipse cx="150" cy="35" rx="10" ry="16" fill="#10b981" transform="rotate(20 150 35)"/>
        <text x="120" y="126" font-family="'Lilita One', Impact, sans-serif" font-size="12" font-weight="900" fill="#065f46" text-anchor="middle" letter-spacing="0.5">${cleanName}</text>
        <text x="120" y="140" font-family="'Lilita One', sans-serif" font-size="10" fill="#059669" text-anchor="middle">SILLY ANIMAL</text>
      </svg>`;
    }

    default: {
      return `<svg viewBox="0 0 240 150" class="card-thumb-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#fdf2f8"/>
        <circle cx="120" cy="65" r="34" fill="#f43f5e" opacity="0.2"/>
        <circle cx="120" cy="65" r="14" fill="#f43f5e"/>
        <text x="120" y="70" font-size="14" fill="#ffffff" text-anchor="middle">✦</text>
        <text x="120" y="125" font-family="'Lilita One', Impact, sans-serif" font-size="13" font-weight="900" fill="#be185d" text-anchor="middle">${cleanName}</text>
      </svg>`;
    }
  }
}

