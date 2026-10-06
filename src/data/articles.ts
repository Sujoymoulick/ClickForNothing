export type EditorialArticle = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  publishDate: string;
  author: string;
  readTime: string;
  featuredSiteIds: string[];
  sections: {
    heading: string;
    content: string[];
    highlightSiteId?: string;
  }[];
};

export const articles: EditorialArticle[] = [
  {
    slug: 'top-useless-websites-of-all-time',
    title: 'The History and Evolution of Useless Websites: From 1995 to Today',
    subtitle: 'How web pioneers turned pure absurdity into viral internet culture.',
    description: 'Explore the history of pointless websites, from early GeoCities personal homepages to modern WebGL interactive art installations.',
    seoTitle: 'The History of Useless Websites — ClickForNothing Editorial',
    seoDescription: 'Discover the fascinating history of useless websites. How developers built viral, pointless web destinations that captivated millions.',
    publishDate: '2026-10-06',
    author: 'ClickForNothing Editorial Team',
    readTime: '6 min read',
    featuredSiteIds: ['cat-bounce', 'pointer-pointer', 'camerons-world', 'windows-93'],
    sections: [
      {
        heading: 'The Early Web: Freedom to Build Nothing',
        content: [
          'In the mid-1990s, the World Wide Web was an unchartered frontier. Before social media algorithms dominated online traffic, individuals registered domains simply because they had a fun or silly idea.',
          'Early creators built single-button pages, guestbook counters, and GIF animations that existed purely to make visitors chuckle.',
        ],
        highlightSiteId: 'camerons-world',
      },
      {
        heading: 'The Era of Simple Physics & WebGL',
        content: [
          'As browser standards evolved and JavaScript engines accelerated, developers began experimenting with interactive physics and dynamic canvas graphics in real time.',
          'Sites like Cat Bounce and Pointer Pointer demonstrated how simple interactions could generate massive viral momentum across blogs, forums, and news outlets.',
        ],
        highlightSiteId: 'cat-bounce',
      },
      {
        heading: 'Why Useless Websites Matter More Than Ever',
        content: [
          'In an internet increasingly filled with algorithmic feeds, ads, and engagement traps, useless websites stand out as rare beacons of uncommercialized joy.',
          'They demand nothing from you: no credit card, no sign-up form, and no notification subscriptions. You click, enjoy a quick smile, and move on.',
        ],
        highlightSiteId: 'pointer-pointer',
      },
    ],
  },
  {
    slug: 'internet-time-wasters-guide',
    title: 'The Ultimate Guide to Productive Boredom: 10 Web Experiments Worth Your Time',
    subtitle: 'Why taking 5-minute digital micro-breaks actually refreshes your cognitive focus.',
    description: 'Discover how brief, engaging web detours help reset your mental energy during long study or work sessions.',
    seoTitle: 'Guide to Productive Web Micro-Breaks — ClickForNothing',
    seoDescription: 'Learn why quick interactive web experiments and time-wasters can help reduce burnout and restore mental clarity.',
    publishDate: '2026-10-06',
    author: 'ClickForNothing Editorial Team',
    readTime: '5 min read',
    featuredSiteIds: ['the-zen-zone', 'weave-silk', 'drive-and-listen', 'rainy-mood'],
    sections: [
      {
        heading: 'The Science of Micro-Breaks',
        content: [
          'Cognitive studies show that continuous focus on single tasks leads to mental fatigue and declining attention span over time.',
          'Taking 2 to 5 minutes to engage with a novel visual or acoustic stimulus helps quiet background mental noise and resets task engagement.',
        ],
        highlightSiteId: 'the-zen-zone',
      },
      {
        heading: 'Visual and Auditory Calming Tools',
        content: [
          'Sites like Rainy Mood and Silk engage creative neural pathways without overstimulating your brain with social media outrage or notifications.',
        ],
        highlightSiteId: 'weave-silk',
      },
    ],
  },
  {
    slug: 'funniest-useless-websites-for-boredom',
    title: '10 Hilarious Web Pranks and Sarcastic Tools That Will Make You Laugh',
    subtitle: 'From wrong calculators to password roast engines, web humor at its finest.',
    description: 'A deep dive into comedic web design, subverting user interface expectations for pure entertainment.',
    seoTitle: '10 Funniest Comedic Websites & Web Pranks — ClickForNothing',
    seoDescription: 'Explore funniest web apps, sarcastic password judges, wrong calculators, and hilarious internet pranks.',
    publishDate: '2026-10-06',
    author: 'ClickForNothing Editorial Team',
    readTime: '4 min read',
    featuredSiteIds: ['passive-aggressive-passwords', 'wrongulator', 'user-inyerface', 'hackertyper'],
    sections: [
      {
        heading: 'Subverting UI Expectations',
        content: [
          'Good design makes interfaces intuitive. Great comedy web design intentionally subverts every rule to highlight how dependent we have become on standard UI patterns.',
        ],
        highlightSiteId: 'user-inyerface',
      },
      {
        heading: 'Sarcastic Technology',
        content: [
          'Tools like Passive Aggressive Passwords give brutal roast feedback, proving that web forms don’t always have to take themselves seriously.',
        ],
        highlightSiteId: 'passive-aggressive-passwords',
      },
    ],
  }
];
