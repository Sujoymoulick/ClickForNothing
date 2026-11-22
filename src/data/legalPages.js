// Content for the info pages linked from the ⋯ menu.
// Each page: title/description (SEO), heading, intro, sections [{ h, p: [] }].

const UPDATED = 'November 22, 2026';

export const aboutPage = {
  title: 'About Us | ClickForNothing',
  description: 'ClickForNothing is a quiet home for useless websites. Submit one, watch it fall, click it if you must.',
  heading: 'About ClickForNothing',
  intro: 'A small corner of the internet for websites that do nothing useful, and do it beautifully.',
  sections: [
    {
      h: 'What this is',
      p: [
        'ClickForNothing collects pointless, weird and delightful websites. The home page drops them as balls you can poke, throw and open. The Explore page lets them drift past slowly so you can browse without effort.',
      ],
    },
    {
      h: 'How submissions work',
      p: [
        'Anyone with an account can submit a website for free. Every submission is reviewed by a human. Once approved, you publish it yourself from your dashboard, and you can edit its description or remove it at any time.',
        'Submissions that are spam, unsafe, illegal or simply not useless enough may be rejected.',
      ],
    },
    {
      h: 'Who runs it',
      p: [
        'ClickForNothing is an independent project. Questions, ideas or problems? Use the contact page and we will reply in your dashboard.',
      ],
    },
  ],
};

export const legalPages = {
  contact: {
    title: 'Contact Us | ClickForNothing',
    description: 'Send a question, a support request or feedback to the ClickForNothing team. Replies arrive in your dashboard.',
    heading: 'Contact us',
    intro: 'Questions, help with a submission, or feedback. Send a message and we will reply in your dashboard.',
    sections: [],
  },
  'privacy-policy': {
    title: 'Privacy Policy | ClickForNothing',
    description: 'How ClickForNothing collects, uses and protects your information.',
    heading: 'Privacy policy',
    intro: `Last updated ${UPDATED}.`,
    sections: [
      {
        h: 'What we collect',
        p: [
          'Account details: when you sign in, our sign-in provider shares your user ID, name and email address with us.',
          'Submissions: the website URL, name, description and category you submit, plus its review status.',
          'Messages: anything you send through the contact form, and our replies.',
          'Usage data: basic, aggregated analytics and the technical information any web server receives (such as IP address and browser type) to deliver the site securely.',
        ],
      },
      {
        h: 'How we use it',
        p: [
          'To run your account, review and publish submissions, answer your messages, keep the site safe from spam and abuse, and understand how the site is used.',
          'We do not sell your personal information. Published submissions (site name, URL, description) are public by design. Your email is never shown publicly.',
        ],
      },
      {
        h: 'Who processes it',
        p: [
          'We use trusted providers for sign-in, hosting, database storage and analytics. They process data only to provide those services to us.',
        ],
      },
      {
        h: 'Your choices',
        p: [
          'You can edit or delete your submissions from your dashboard. To delete your account data or messages, contact us and we will remove it.',
          'You can decline non-essential cookies in the cookie banner.',
        ],
      },
    ],
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions | ClickForNothing',
    description: 'The rules for using ClickForNothing and submitting websites.',
    heading: 'Terms & conditions',
    intro: `Last updated ${UPDATED}.`,
    sections: [
      {
        h: 'Using the site',
        p: [
          'ClickForNothing is provided for entertainment, as is, without warranties. We may change or remove any part of it at any time.',
        ],
      },
      {
        h: 'Your account',
        p: [
          'You are responsible for activity on your account. Do not use the site to send spam, harass others or break the law.',
        ],
      },
      {
        h: 'Submissions',
        p: [
          'You may only submit websites you are allowed to share. Do not submit malware, phishing, adult, hateful or illegal content.',
          'By submitting, you allow us to display the site name, URL and description on ClickForNothing. We may approve, reject, unpublish or remove any submission at our discretion.',
        ],
      },
      {
        h: 'External websites',
        p: [
          'Listed websites are run by third parties. We are not responsible for their content, availability or privacy practices. Visit them at your own risk.',
        ],
      },
    ],
  },
  'cookie-policy': {
    title: 'Cookie Policy | ClickForNothing',
    description: 'Which cookies ClickForNothing uses and why.',
    heading: 'Cookie policy',
    intro: `Last updated ${UPDATED}.`,
    sections: [
      {
        h: 'Essential cookies',
        p: [
          'Sign-in cookies keep you logged in and protect your session. Without them, submitting, the dashboard and messages do not work.',
          'We also remember your cookie banner choice.',
        ],
      },
      {
        h: 'Analytics cookies',
        p: [
          'If you accept, we use analytics cookies to count visits and see which pages are used. Decline them in the cookie banner and they are not set.',
        ],
      },
      {
        h: 'Managing cookies',
        p: [
          'You can clear or block cookies in your browser settings. Blocking essential cookies will sign you out.',
        ],
      },
    ],
  },
  disclaimer: {
    title: 'Disclaimer | ClickForNothing',
    description: 'Disclaimer for ClickForNothing and the websites listed on it.',
    heading: 'Disclaimer',
    intro: `Last updated ${UPDATED}.`,
    sections: [
      {
        h: 'Third-party websites',
        p: [
          'Websites on ClickForNothing are submitted by users and owned by others. Listing a site is not an endorsement. Their content can change after we review it.',
          'If a listed site looks unsafe or broken, tell us through the contact page and we will check it.',
        ],
      },
      {
        h: 'No warranty',
        p: [
          'Everything here is for fun. We make no promises about accuracy, availability or fitness for any purpose, and we are not liable for any loss from using this site or the sites it links to.',
        ],
      },
    ],
  },
};
