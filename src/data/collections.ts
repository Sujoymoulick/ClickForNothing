export type WebsiteCollection = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  siteIds: string[];
  featured?: boolean;
};

export const collections: WebsiteCollection[] = [
  {
    slug: '100-useless-websites',
    title: '100 Most Useless Websites on the Internet',
    subtitle: 'The ultimate hall of fame for completely unnecessary, hilarious, and bizarre web creations.',
    description: 'A hand-curated master list of the top useless websites ever built. From cat bounce physics to wrong calculators, explore the web’s finest time-wasters.',
    seoTitle: '100 Most Useless Websites on the Internet (2026 List) — ClickForNothing',
    seoDescription: 'Discover 100 hilarious, bizarre, and useless websites to waste time when bored. Hand-curated directory of pointless web destinations.',
    siteIds: [
      'cat-bounce', 'pointer-pointer', 'eel-slap', 'koalas-to-the-max', 'long-doge-challenge',
      'windows-93', 'weave-silk', 'patatap', 'hackertyper', 'invisible-cow',
      'heeeeeeeey', 'paper-toilet', 'falling-falling', 'omfgdogs', 'bored-button',
      'make-everything-ok', 'this-is-sand', 'neal-fun', 'instant-rimshot', 'nyan-cat',
      'rainy-mood', 'blank', 'movenowthinklater', 'random-colour', 'sometimes-red-sometimes-blue',
      'ducks-are-the-best', 'zoomquilt', 'scream-into-the-void', 'the-zen-zone', 'click-click-click',
      'draw-a-stickman', 'camerons-world', 'people-in-space', 'passive-aggressive-passwords', 'wrongulator',
      'dvd-screensaver-maker', 'pug-in-a-rug', 'bury-me-with-my-money', 'bouncing-dvd-logo', 'qwop',
      'map-crunch', 'drive-and-listen', 'slow-drop', 'quick-draw', 'line-rider',
      'sand-spiel', 'corndog-io', 'user-inyerface', 'incredibox-demo', 'space-is-cool',
      'deep-sea-scroll'
    ],
    featured: true,
  },
  {
    slug: 'websites-to-visit-when-bored',
    title: '50 Websites to Visit When You Are Extremely Bored',
    subtitle: 'Immediate cure for study break fatigue, slow workdays, and afternoon boredom.',
    description: 'Stuck in a boredom loop? Jump into interactive art toys, random street view journeys, city radio drives, and funny games designed for quick relief.',
    seoTitle: '50 Websites to Visit When Bored (Kill Boredom Online) — ClickForNothing',
    seoDescription: 'Bored online? Explore 50 amazing, funny, and entertaining websites to visit when you have free time.',
    siteIds: [
      'bored-button', 'map-crunch', 'drive-and-listen', 'pointer-pointer', 'invisible-cow',
      'quick-draw', 'neal-fun', 'deep-sea-scroll', 'space-is-cool', 'user-inyerface',
      'hackertyper', 'patatap', 'weave-silk', 'cat-bounce', 'line-rider'
    ],
    featured: true,
  },
  {
    slug: 'weird-websites-that-should-not-exist',
    title: 'Weird Websites That Should Honestly Not Exist',
    subtitle: 'Bizarre, surreal, and unsettling corners of cyberspace.',
    description: 'These pages make you scratch your head and ask "Who built this, and why?". Featuring eel slaps, screaming voids, and infinite zoom nightmares.',
    seoTitle: 'Weird Websites That Should Not Exist — ClickForNothing',
    seoDescription: 'Check out the weirdest, most inexplicable websites on the internet. Bizarre digital art and surreal experiments.',
    siteIds: [
      'eel-slap', 'staggering-beauty', 'scream-into-the-void', 'click-click-click', 'rrr-ggg-bbb',
      'corndog-io', 'potato-or-tomato', 'hooooooooo', 'sometimes-red-sometimes-blue', 'wrongulator'
    ],
    featured: true,
  },
  {
    slug: 'websites-to-waste-time',
    title: 'Best Websites to Waste 5 Minutes of Your Life',
    subtitle: 'Quick micro-breaks that don’t require commitments or signups.',
    description: 'Looking for a fast 5-minute break? Unroll digital paper, bounce cats, draw silk waves, or solve one-square Minesweeper games.',
    seoTitle: 'Best Websites to Waste Time Online (5 Minute Time-Wasters)',
    seoDescription: 'Top websites to waste time online during school or work breaks. Fun, fast, single-click web toys.',
    siteIds: [
      'one-square-minesweeper', 'paper-toilet', 'instant-rimshot', 'passive-aggressive-passwords', 'checkbox-race',
      'ducks-are-the-best', 'please-like', 'make-everything-ok', 'random-colour'
    ],
    featured: true,
  },
  {
    slug: 'best-funny-websites',
    title: 'Funniest Useless Websites on the Web',
    subtitle: 'Sarcastic UI, comedy soundboards, and hilarious web jokes.',
    description: 'The funniest web experiments created by internet pranksters. Perfect for sharing with friends and co-workers.',
    seoTitle: 'Funniest Useless Websites & Web Comedy — ClickForNothing',
    seoDescription: 'Laugh out loud with the funniest useless websites. Comedic web apps, passive-aggressive forms, and humor soundboards.',
    siteIds: [
      'passive-aggressive-passwords', 'wrongulator', 'user-inyerface', 'hackertyper', 'instant-rimshot',
      'bury-me-with-my-money', 'potato-or-tomato', 'eel-slap'
    ],
    featured: true,
  }
];
