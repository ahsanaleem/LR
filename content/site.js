/**
 * LONG RELATION — all copy, links, numbers and media paths live here.
 * Rebrand the site by editing this file only.
 *
 * Media slots accept { video: '/media/x.mp4', poster: '/media/x.jpg' } or { image: '/media/x.jpg' }.
 * Leave them empty ({}) to show the animated brand placeholder.
 *
 * Heading `parts`: [[text, isAccent], ...]. Use ['\n'] to force a line break.
 */

export const brand = {
  name: 'Long Relation',
  wordmark: ['LONG', 'RELATION'],
  logoDark: '/brand/logo-dark.png',
  logoLight: '/brand/logo-light.png',
  logoWidth: 1679,
  logoHeight: 461,
  established: 2026,
};

export const meta = {
  title: 'Long Relation — Software partners for the long run',
  description:
    'Long Relation is an AI-first product studio for web, mobile, games, 3D/XR and AI automation. We design, build and grow digital products — and we stay for every release after launch.',
  url: 'https://longrelation.com', // PLACEHOLDER
};

// PLACEHOLDER — replace with real contact details
export const contact = {
  phone: '+1 (555) 010-2026',
  phoneHref: 'tel:+15550102026',
  emails: [
    { label: 'New projects', value: 'hello@longrelation.com' },
    { label: 'Careers', value: 'careers@longrelation.com' },
  ],
  address: '100 Harbour Street, Suite 400, London, UK',
};

// PLACEHOLDER — replace with real profiles
export const socials = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { id: 'x', label: 'X', href: 'https://x.com/' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
];

export const nav = {
  links: [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ],
  menuLinks: [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'work', label: 'Work' },
    { id: 'ai', label: 'AI' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ],
  cta: 'Start a project',
};

export const loader = {
  label: 'LONG RELATION',
};

export const hero = {
  parts: [['Software partners'], ['\n'], ['for the '], ['long run.', true]],
  sub: 'We design, build and grow digital products — and we stay for every release after launch.',
  primary: 'Start a project',
  secondary: 'See our work',
  side: 'Est. 2026 — Scroll',
  // PLACEHOLDER — replace with real figures
  chips: [
    { value: 100, suffix: '+', label: 'products shipped' },
    { value: 6, suffix: ' yrs', label: 'avg. client relationship' },
    { value: 24, suffix: 'h', label: 'reply time' },
  ],
};

export const about = {
  index: '01',
  label: 'About',
  parts: [['We build the '], ['relationship', true], [' behind the product']],
  text: 'Long Relation is a product studio for teams that want a partner, not a vendor. We design and engineer software across web, mobile, games, 3D, XR and AI — and we start with how your business grows, not with screens. We map the revenue path, find where users drop off, and plan an architecture that holds up under real traffic. Then we keep improving it with you, release after release.',
  media: {}, // { image: '/media/about.jpg' }
  mediaCaption: 'Studio — working session',
  // PLACEHOLDER — replace with real figure
  stat: { value: 4, suffix: '+', label: 'Average partnership', unit: 'years' },
  team: {
    title: 'One team',
    items: ['Strategy', 'Design', 'Engineering', 'Growth'],
  },
  markCaption: 'Two parts. One product.',
};

export const services = {
  index: '02',
  label: 'Services',
  parts: [['One team, from first idea to '], ['global scale', true]],
  items: [
    {
      id: 'mobile',
      icon: 'mobile',
      title: 'Mobile Apps',
      text: 'Native and cross-platform apps built for speed, retention and store visibility from day one.',
      list: ['AI-accelerated builds', 'iOS', 'Android', 'React Native', 'Flutter'],
      media: {},
    },
    {
      id: 'games',
      icon: 'game',
      title: 'Game Development',
      text: 'Polished games and interactive worlds for PC, console, mobile and headsets.',
      list: ['Unity', 'Unreal', 'AR / VR', 'Character & world art'],
      media: {},
    },
    {
      id: 'growth',
      icon: 'growth',
      title: 'Growth & Care',
      text: 'Launch, visibility and ongoing maintenance, so your product keeps getting better long after release.',
      list: ['Performance marketing', 'App store optimisation', 'Support & upgrades'],
      media: {},
    },
    {
      id: 'platforms',
      icon: 'platform',
      title: 'Products & Platforms',
      text: "Ready-made commerce and immersive foundations for teams that can't afford to start from zero.",
      list: ['Commerce platforms', 'Immersive technology'],
      media: {},
    },
  ],
};

export const expertise = {
  index: '03',
  label: 'Expertise',
  parts: [['Our stack, and '], ['why', true], [' we chose it']],
  intro:
    'We are flexible on tools and strict on quality. Everything here is something we run in production — not a logo wall.',
  filters: [
    { id: 'all', label: 'All' },
    { id: 'games', label: 'Games' },
    { id: 'apps', label: 'Apps' },
    { id: 'ai', label: 'AI' },
  ],
  // icon: animated logo (unity | unreal | flutter | react | next | ai). Add gif: '/media/stack/x.gif' to use a GIF instead.
  cards: [
    { id: 'unity', cat: 'games', catLabel: 'Games', icon: 'unity', size: 'wide', title: 'Unity', text: 'Cross-platform 3D for mobile, console and XR, tuned for frame rate and battery life.' },
    { id: 'unreal', cat: 'games', catLabel: 'Games', icon: 'unreal', size: 'tall', title: 'Unreal Engine', text: 'Cinematic worlds and photoreal rendering for high-end interactive products.' },
    { id: 'flutter', cat: 'apps', catLabel: 'Apps', icon: 'flutter', size: 'normal', title: 'Flutter', text: 'One codebase for iOS, Android and web with native-grade performance.' },
    { id: 'rn', cat: 'apps', catLabel: 'Apps', icon: 'react', size: 'normal', title: 'React Native', text: 'Cross-platform apps with the speed of web and the polish of native.' },
    { id: 'next', cat: 'apps', catLabel: 'Apps', icon: 'next', size: 'normal', title: 'Next.js', text: 'Fast, SEO-ready web platforms and dashboards.' },
    { id: 'ai', cat: 'ai', catLabel: 'AI', icon: 'ai', size: 'wide', title: 'AI Engineering', text: 'Custom models, agents and AI-native features aimed at a real business problem.' },
  ],
  marquee: [
    ['TypeScript', 'Swift', 'Kotlin', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS', 'Vercel', 'Firebase', 'Three.js'],
    ['Python', 'PyTorch', 'LangGraph', 'OpenXR', 'Blender', 'Figma', 'Stripe', 'Shopify', 'Docker', 'Kubernetes'],
  ],
};

// Case studies from lr.com.sa. `device`: 'phone' (portrait screenshot) or 'browser' (wide screenshot).
export const work = {
  index: '04',
  label: 'Work',
  parts: [['Selected '], ['work', true]],
  intro: 'Recent products we designed and engineered end to end — and keep improving with our clients.',
  cta: 'Start a similar project',
  projects: [
    {
      id: 'manani',
      name: 'Manani',
      year: 2025,
      category: 'Dream Journal',
      tagline: 'A social dream journal that turns nightly dreams into shareable, AI-interpreted stories.',
      text: "Multi-modal capture across video, voice and text, an AI interpretation engine that surfaces themes and moods within seconds, and a Memories archive with mood tagging and a protected 'My Eyes Only' vault.",
      tags: ['React Native', 'OpenAI', 'Node.js'],
      tint: '#6366f1',
      device: 'phone',
      media: { image: '/media/work/manani-capture.png', width: 403, height: 875 },
    },
    {
      id: 'menna',
      name: 'Menna',
      year: 2025,
      category: 'Luxury Fashion',
      tagline: "A bilingual luxury fashion marketplace showcasing Saudi Arabia's finest local and international designers.",
      text: "An editorial Discover feed with seasonal lookbooks, a rich product flow with sizing and editor's styling advice, and a fully localized Arabic/English UI with RTL support.",
      tags: ['React Native', 'Node.js', 'Stripe'],
      tint: '#0ac4e0',
      device: 'phone',
      media: { image: '/media/work/menna-welcome.png', width: 394, height: 853 },
    },
    {
      id: 'menna-web',
      name: 'Menna Web',
      year: 2025,
      category: 'Luxury Fashion — Web',
      tagline: 'Menna extended onto the web — a full-featured, bilingual luxury storefront.',
      text: 'Editorial homepage merchandising, faceted browsing across Women, Men, Beauty and Fragrance, Tabby installment checkout and express delivery across Riyadh, Jeddah and Dammam.',
      tags: ['Next.js', 'Node.js', 'Tabby'],
      tint: '#14b8a6',
      device: 'browser',
      media: { image: '/media/work/menna-web-home.png', width: 1488, height: 730 },
    },
  ],
};

export const engagement = {
  index: '05',
  label: 'How we work',
  parts: [['Ways to work '], ['together', true]],
  intro:
    'Every company arrives with a different need. A founder wants a full build. An operator needs senior hands inside a live product. A CTO needs ten engineers next week. We have a model for each.',
  models: [
    {
      id: 'project',
      diagram: 'cluster',
      title: 'Project-Based Delivery',
      text: 'A clear scope, budget and launch date. A dedicated project lead and an engineering pod own the build from concept to release.',
    },
    {
      id: 'team',
      diagram: 'ring',
      title: 'Dedicated Team',
      text: 'For bigger or longer programmes we field a complete squad — strategy, design and engineering — working as one unit.',
    },
    {
      id: 'augment',
      diagram: 'plug',
      title: 'Staff Augmentation',
      text: 'Already have a team? We add vetted senior engineers, designers and product people straight into your workflow.',
    },
  ],
  compareLabel: 'Compare models',
  compare: {
    rows: ['Timeline', 'Team size', 'Best for'],
    cols: [
      ['8–24 weeks', '3–6 people', 'A defined product with a launch date'],
      ['6 months +', '6–15 people', 'Long programmes and new business lines'],
      ['Flexible, from 1 month', '1–10 people', 'Adding senior capacity to your team'],
    ],
  },
};

export const ai = {
  index: '06',
  label: 'AI',
  parts: [['Grow with '], ['AI', true]],
  sub: 'Turning companies into AI-native operators',
  text: 'We build the AI inside your product and the automations that run quietly behind your operation — fine-tuned language models, decision engines and agent workflows tied to real revenue. AI is never the goal on its own; a capability your team keeps using is.',
  cardTitle: 'Automate, optimise and scale with AI',
  cardText:
    'Strategy, engineering and data under one roof, so you can run AI in production — a custom LLM, automated decisioning or an in-product agent, turned into measurable capability.',
  cta: 'Book a consultation',
  chips: ['LLM fine-tuning', 'Agent workflows', 'Decision engines'],
  // Fake demo content
  demo: {
    title: 'agent.run',
    prompt: 'Qualify new leads and book calls',
    steps: ['Read CRM', 'Score lead', 'Draft reply', 'Book meeting'],
    done: '3 calls booked · 41s',
  },
};

// PLACEHOLDER — replace with real figures
export const why = {
  index: '07',
  label: 'Why us',
  parts: [['Why teams '], ['stay', true], [' with us']],
  stats: [
    { value: 100, decimals: 0, suffix: '+', label: 'Products delivered', bar: 0.82 },
    { value: 80, decimals: 0, suffix: '+', label: 'Team members', bar: 0.66 },
    { value: 4.9, decimals: 1, suffix: '/5', label: 'Average client rating', bar: 0.98 },
    { value: 85, decimals: 0, suffix: '%', label: 'Clients who come back for the next project', bar: 0.85 },
  ],
  promisesTitle: 'Three promises we keep',
  promises: ['Senior people on every project', 'Weekly demos, no surprises', 'We stay after launch'],
};

export const awards = {
  index: '08',
  label: 'Recognition',
  parts: [['Awards & '], ['recognition', true]],
  items: [
    // PLACEHOLDER — replace with a real award
    { badge: 'TOP APP DEV', title: ['Top App', 'Developer 2026'], text: 'Recognised for mobile delivery quality and client retention.' },
    // PLACEHOLDER — replace with a real award
    { badge: 'BEST UX', title: ['Best Product', 'Experience'], text: 'Shortlisted for a health app used daily by patients and clinicians.' },
    // PLACEHOLDER — replace with a real award
    { badge: 'GAME DEV', title: ['Indie Game', 'of the Year'], text: 'Nominated for an XR title built with a long-term publishing partner.' },
    // PLACEHOLDER — replace with a real award
    { badge: 'AI 50', title: ['Applied AI', 'Studio'], text: 'Listed for agent workflows running in production at client companies.' },
    // PLACEHOLDER — replace with a real award
    { badge: '5★ RATED', title: ['Client Choice', 'Award'], text: 'Rated by verified clients on independent review platforms.' },
  ],
};

// PLACEHOLDER — replace with real team members
export const team = {
  index: '09',
  label: 'Team',
  parts: [['The people behind'], ['\n'], ['Long Relation', true]],
  intro:
    'The people who write the code, design the systems and own the outcome. Senior people on every project — always.',
  members: [
    {
      name: 'Alex Morgan',
      initials: 'AM',
      role: 'Founder & CEO',
      points: ['15 years shipping products', 'Ex-agency, ex-startup', 'Owns every partnership'],
      bio: 'Started Long Relation to build the studio they always wanted to hire: senior, honest and still around a year after launch.',
      linkedin: 'https://www.linkedin.com/',
      media: {},
    },
    {
      name: 'Sam Rivera',
      initials: 'SR',
      role: 'CTO',
      points: ['Architecture & scale', 'Mobile and real-time systems', 'AI in production'],
      bio: 'Designs systems that survive real traffic and keeps the engineering bar high on every project we take.',
      linkedin: 'https://www.linkedin.com/',
      media: {},
    },
    {
      name: 'Jordan Lee',
      initials: 'JL',
      role: 'Head of Design',
      points: ['Product & interaction design', 'Design systems', 'Games and XR'],
      bio: 'Turns business goals into products people come back to, from first sketch to the hundredth release.',
      linkedin: 'https://www.linkedin.com/',
      media: {},
    },
  ],
};

export const cta = {
  parts: [['Ready to build something that '], ['lasts?', true]],
  text: 'Book a free consultation and leave with clarity, direction and advice you can act on straight away.',
  button: 'Book a consultation',
};

export const reviews = {
  index: '10',
  label: 'Reviews',
  parts: [['What our clients '], ['say', true]],
  quotes: [
    // PLACEHOLDER — Replace with a real client quote
    { quote: 'They behaved like co-founders, not contractors. Two years on, they still run our releases.', name: 'Client name', role: 'CEO, Company', stars: 5 },
    // PLACEHOLDER — Replace with a real client quote
    { quote: 'Weekly demos meant we never had a surprise. The app launched on the day they promised.', name: 'Client name', role: 'Product Lead, Company', stars: 5 },
    // PLACEHOLDER — Replace with a real client quote
    { quote: 'Senior engineers from day one. They found problems in our architecture we did not know we had.', name: 'Client name', role: 'CTO, Company', stars: 5 },
    // PLACEHOLDER — Replace with a real client quote
    { quote: 'Our retention doubled after their redesign, and they kept iterating long after the contract ended.', name: 'Client name', role: 'Founder, Company', stars: 5 },
    // PLACEHOLDER — Replace with a real client quote
    { quote: 'The AI agent they built now handles most of our lead qualification. It simply works.', name: 'Client name', role: 'COO, Company', stars: 5 },
    // PLACEHOLDER — Replace with a real client quote
    { quote: 'Clear plans, honest timing and a team that cares about the outcome as much as we do.', name: 'Client name', role: 'Head of Digital, Company', stars: 5 },
  ],
  // PLACEHOLDER — add { video, poster } to each item
  videos: [
    { name: 'Client name', role: 'Founder, Company', media: {} },
    { name: 'Client name', role: 'CTO, Company', media: {} },
    { name: 'Client name', role: 'Product Lead, Company', media: {} },
    { name: 'Client name', role: 'CEO, Company', media: {} },
    { name: 'Client name', role: 'COO, Company', media: {} },
  ],
};

export const contactSection = {
  titleParts: [["Let's start a "], ['long relation.', true]],
  text: "Tell us where you are and where you want to be. We'll come back with a clear plan, honest timing and the right team.",
  talkLabel: 'Prefer to talk?',
  formTitle: 'Get in touch',
  formSub: 'We reply within 24 hours — usually sooner.',
  needsLabel: 'What do you need?',
  needs: ['Mobile app', 'Web platform', 'Game', 'AI', 'Team extension'],
  budgetLabel: 'Budget',
  budgets: ['< $10k', '$10–30k', '$30–80k', '$80k+'],
  fields: { name: 'Name', email: 'Email', phone: 'Phone (optional)', message: 'Message' },
  submit: 'Send request',
  success: "Thanks — your request is in. We'll reply within 24 hours.",
  error: 'Something went wrong. Please try again or email us directly.',
};

export const footer = {
  line: 'Built to last. Built together.',
  cta: 'Start a project',
  servicesTitle: 'Services',
  services: [
    'Mobile Apps',
    'Web Platforms',
    'Game Development',
    'AR / VR',
    'AI Automation',
    'Growth Marketing',
    'App Store Optimisation',
    'Support & Care',
  ],
  companyTitle: 'Company',
  company: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Blog', href: '#' }, // PLACEHOLDER
    { label: 'Contact', href: '#contact' },
    { label: 'Careers', href: '#' }, // PLACEHOLDER
    { label: 'Terms & Conditions', href: '#' }, // PLACEHOLDER
    { label: 'Privacy Policy', href: '#' }, // PLACEHOLDER
  ],
  contactTitle: 'Contact',
  backToTop: 'Back to top',
  copyright: '© 2026 Long Relation. All rights reserved.',
};
