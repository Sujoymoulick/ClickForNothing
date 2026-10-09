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
    id: 'theme-01',
    name: 'Theme 01 · Cream',
    themeSlug: 'cream',
    tag: 'Classic Retro',
    emoji: '🎁',
    bgColor: '#fff9df',
    textColor: '#09080c',
    accentColor: '#f59e0b',
    borderColor: '#09080c',
    badgeBg: '#fef3c7',
    badgeText: '#b45309',
    description: 'Classic warm retro cream layout with bold neo-brutalist borders.',
  },
  {
    id: 'theme-02',
    name: 'Theme 02 · Pink',
    themeSlug: 'pink',
    tag: 'Cyber Pink',
    emoji: '💖',
    bgColor: '#ffe2f5',
    textColor: '#09080c',
    accentColor: '#f20caf',
    borderColor: '#09080c',
    badgeBg: '#fce7f3',
    badgeText: '#be185d',
    description: 'Vibrant bubblegum cyberpunk pink with glowing magenta details.',
  },
  {
    id: 'theme-03',
    name: 'Theme 03 · Cyan',
    themeSlug: 'cyan',
    tag: 'Neo Mint',
    emoji: '🚀',
    bgColor: '#dffaff',
    textColor: '#09080c',
    accentColor: '#0d9488',
    borderColor: '#09080c',
    badgeBg: '#ccfbf1',
    badgeText: '#0f766e',
    description: 'Electric neo mint turquoise with crisp retro arcade styling.',
  },
  {
    id: 'theme-04',
    name: 'Theme 04 · Purple',
    themeSlug: 'purple',
    tag: 'Velvet Purple',
    emoji: '✨',
    bgColor: '#eee3ff',
    textColor: '#09080c',
    accentColor: '#7025ed',
    borderColor: '#09080c',
    badgeBg: '#ede9fe',
    badgeText: '#6d28d9',
    description: 'Deep electric royal purple with digital gift aesthetics.',
  },
  {
    id: 'theme-05',
    name: 'Theme 05 · Amber',
    themeSlug: 'amber',
    tag: 'Solar Gold',
    emoji: '⚡',
    bgColor: '#fef3c7',
    textColor: '#09080c',
    accentColor: '#d97706',
    borderColor: '#09080c',
    badgeBg: '#ffedd5',
    badgeText: '#c2410c',
    description: 'Warm arcade amber theme with solar highlights.',
  },
  {
    id: 'theme-06',
    name: 'Theme 06 · Dark Matrix',
    themeSlug: 'cyber',
    tag: 'Dark Cyber',
    emoji: '👾',
    bgColor: '#18181b',
    textColor: '#f4f4f5',
    accentColor: '#f7fa27',
    borderColor: '#f7fa27',
    badgeBg: '#27272a',
    badgeText: '#facc15',
    description: 'High-contrast dark terminal theme with electric lime accents.',
  },
];

const ALIAS_MAP: Record<string, string> = {
  'cream': 'theme-01',
  'theme-01': 'theme-01',
  'theme-1': 'theme-01',
  'pink': 'theme-02',
  'theme-02': 'theme-02',
  'theme-2': 'theme-02',
  'cyan': 'theme-03',
  'theme-03': 'theme-03',
  'theme-3': 'theme-03',
  'purple': 'theme-04',
  'theme-04': 'theme-04',
  'theme-4': 'theme-04',
  'amber': 'theme-05',
  'theme-05': 'theme-05',
  'theme-5': 'theme-05',
  'cyber': 'theme-06',
  'matrix': 'theme-06',
  'theme-06': 'theme-06',
  'theme-6': 'theme-06',
};

export const VALID_DESIGN_IDS = CARD_DESIGNS.map((d) => d.id);

export function normalizeDesignId(rawId: string | null | undefined): string {
  if (!rawId || typeof rawId !== 'string') return 'theme-01';
  const clean = rawId.toLowerCase().trim();
  return ALIAS_MAP[clean] || 'theme-01';
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
