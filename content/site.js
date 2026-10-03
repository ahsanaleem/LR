// ─────────────────────────────────────────────────────────────
//  LONG RELATION — all site copy, links and media in one place.
//  Edit this file to rebrand / update content. Every `media`
//  field accepts { video: '/media/x.mp4', poster: '/media/x.jpg' }
//  or { image: '/media/x.jpg' }. Leave empty for the built-in
//  animated placeholder artwork.
//  Items marked  // PLACEHOLDER  must be replaced with real data.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: 'LONG RELATION',
  short: 'Long Relation',
  since: '2026',
  phone: '+1 (000) 000-0000', // PLACEHOLDER
  email: 'hello@longrelation.com', // PLACEHOLDER
  supportEmail: 'support@longrelation.com', // PLACEHOLDER
  address: 'Your street address, City, State ZIP, Country', // PLACEHOLDER
  socials: [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'X', href: '#', icon: 'x' },
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
  ],
};

export const nav = [
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'Blog', href: '#' },
  { label: 'Contact Us', href: '#contact' },
];

export const hero = {
  lines: [
    [{ t: 'Engineered by ' }, { t: 'AI.', accent: true }],
    [{ t: 'Shaped by ' }, { t: 'Human Craft.', bold: true }],
  ],
  tagline: 'Product strategy, design and engineering\nfor software that grows with you.',
  media: {}, // e.g. { video: '/media/hero.mp4' }
  thumb: { video: '/media/about/team-planning.mp4', poster: '/media/about/team-planning.jpg' }, // small looping preview, bottom-right — same clip as About, so the tile flows into it
};

export const about = {
  eyebrow: ['ABOUT', 'US'],
  title: 'we build the intelligence behind the interface',
  body:
    'Long Relation is a product studio that designs and engineers software across web, mobile, 3D, XR and AI automation. We start with how your business makes money — not with screens. We trace the revenue path, find where people drop off, and plan an architecture that holds up under real traffic. The result is software that pulls its weight in the market, not a concept that lives in a pitch deck.',
  media: { video: '/media/about/team-planning.mp4', poster: '/media/about/team-planning.jpg' },
};

export const services = {
  title: ['OUR', 'SERVICES'],
  subtitle: 'One team from first idea to global scale.',
  items: [
    {
      icon: 'mobile',
      title: 'Mobile Apps',
      text: 'Native and cross-platform apps tuned for speed, retention and store visibility from the first release.',
      list: ['AI-Accelerated Builds', 'iOS Development', 'Android Development', 'React Native', 'Flutter'],
      media: { video: '/media/services/mobile-apps.mp4', poster: '/media/services/mobile-apps.jpg' },
      hue: 188,
    },
    {
      icon: 'game',
      title: 'Game Development',
      text: 'Polished games and interactive worlds for PC, console, mobile and headsets.',
      list: ['Unity Development', 'Unreal Development', 'AR / VR Experiences', 'Character & World Art'],
      media: { video: '/media/services/game-dev.mp4', poster: '/media/services/game-dev.jpg' },
      hue: 200,
    },
    {
      icon: 'megaphone',
      title: 'Growth & Care',
      text: 'Launch, visibility and long-term maintenance so your product keeps compounding after day one.',
      list: ['Performance Marketing', 'App Store Optimisation', 'Support & Upgrades'],
      media: { video: '/media/services/growth.mp4', poster: '/media/services/growth.jpg' },
      hue: 178,
    },
    {
      icon: 'cube',
      title: 'Products & Platforms',
      text: 'Ready-to-launch commerce and immersive tech foundations for teams that cannot afford to start from scratch.',
      list: ['Commerce Platforms', 'Immersive Technology'],
      media: { video: '/media/services/platforms.mp4', poster: '/media/services/platforms.jpg' },
      hue: 194,
    },
  ],
};

export const expertise = {
  title: ['OUR', 'EXPERTISE'],
  intro:
    'The tools we pick, and the reasons behind them. We are flexible on stack but firm on quality.\nEverything listed here is something we ship to production — not a logo wall.',
  items: [
    { cat: 'Games', title: 'Unity', text: 'Cross-platform 3D for mobile, console and XR, tuned for frame rate and battery life.', logo: '/tech/unity.svg' },
    { cat: 'Games', title: 'Unreal Engine', text: 'Cinematic worlds and photoreal rendering for high-end interactive products.', logo: '/tech/unreal-engine.svg' },
    { cat: 'Apps', title: 'Flutter', text: 'A single codebase for iOS, Android and web with native-grade performance.', logo: '/tech/flutter.svg' },
    { cat: 'Apps', title: 'React Native', text: 'Production cross-platform apps with web speed and native polish.', logo: '/tech/react.svg' },
    { cat: 'AI', title: 'AI Engineering', text: 'Custom models, agents and AI-native features aimed at a real business problem.', logo: '/tech/ai.svg' },
  ],
};

export const featured = {
  title: ['FEATURED', 'PROJECTS'],
  intro: 'Real products we designed and engineered end to end — from first sketch to the app store.',
  // Case studies from lr.com.sa. `kind` picks the frame: 'mobile' = phone screens, 'web' = browser windows.
  items: [
    {
      name: 'Manani',
      category: 'Dream Journal',
      year: '2025',
      kind: 'mobile',
      tagline: 'Dreams, Interpreted and Shared',
      summary: 'A social dream journal that turns each night’s dreams into AI-interpreted stories you can keep private or share.',
      description: [
        'Manani lets people record a dream the moment they wake up — by video, voice or text — and get an AI interpretation of its themes and mood within seconds.',
        'We designed and built the full iOS and Android apps: multi-modal capture, the interpretation engine, and a Memories archive with mood tags and layered privacy, including a locked "My Eyes Only" vault.',
        'A social layer lets users follow friends, tag them in dreams and post interpreted stories to a community feed.',
      ],
      tags: ['React Native', 'OpenAI', 'Node.js'],
      from: '#0b1640',
      to: '#2c3a96',
      screens: [
        { src: '/media/portfolio/manani-capture.png', label: 'Capture' },
        { src: '/media/portfolio/manani-voice.png', label: 'Voice' },
        { src: '/media/portfolio/manani-memories.png', label: 'Memories' },
      ],
    },
    {
      name: 'Menna',
      category: 'Luxury Fashion',
      year: '2025',
      kind: 'mobile',
      tagline: 'Saudi Designers, One Marketplace',
      summary: 'A bilingual luxury fashion marketplace that puts Saudi Arabia’s own designers alongside international labels.',
      description: [
        'Menna connects shoppers with leading local and international fashion designers in one curated marketplace.',
        'We designed and built the iOS and Android apps: an editorial Discover feed with seasonal lookbooks and curated category rails, plus a detailed product flow with size selection and styling advice from editors.',
        'The whole experience is fully localized in Arabic and English, with complete right-to-left support.',
      ],
      tags: ['React Native', 'Node.js', 'Stripe'],
      from: '#1c1510',
      to: '#7a5a32',
      screens: [
        { src: '/media/portfolio/menna-welcome.png', label: 'Welcome' },
        { src: '/media/portfolio/menna-discover.png', label: 'Discover' },
        { src: '/media/portfolio/menna-product.png', label: 'Product' },
      ],
    },
    {
      name: 'Menna Web',
      category: 'Luxury Fashion — Web',
      year: '2025',
      kind: 'web',
      tagline: 'The Storefront, On Every Screen',
      summary: 'Menna’s marketplace brought to the web as a full bilingual luxury storefront with instalment checkout.',
      description: [
        'We extended Menna from mobile to a full-featured web storefront in Arabic and English.',
        'It includes an editorial homepage, filtered browsing across Women, Men, Beauty and Fragrance, and product pages with colour and size selection.',
        'Checkout supports Tabby instalments, with express delivery across Riyadh, Jeddah and Dammam.',
      ],
      tags: ['Next.js', 'Node.js', 'Tabby'],
      from: '#071a24',
      to: '#0a6b80',
      screens: [
        { src: '/media/portfolio/menna-web-home.png', label: 'Home' },
        { src: '/media/portfolio/menna-web-women.png', label: 'Women' },
        { src: '/media/portfolio/menna-web-product.png', label: 'Product' },
      ],
    },
  ],
};

export const engagement = {
  title: [['CLIENT', false], ['FIRST', false], ['ENGAGEMENT', false], ['MODELS', true]],
  intro:
    'No two companies arrive with the same need. A founder wants a full build. An operator needs senior hands inside a live product. A CTO needs ten engineers next week. We have a model for each.',
  items: [
    {
      title: 'Project-Based\nDelivery',
      center: 'YOU',
      text: 'A clear scope, budget and launch date. A dedicated project lead and an engineering pod own the build from concept to release — fixed scope, fixed timeline, predictable result.',
    },
    {
      title: 'Dedicated\nTeam',
      center: 'logo',
      text: 'For bigger or longer programmes we field a complete squad — strategy, design and engineering — working as one unit. Fewer hand-offs, faster calls, better output.',
    },
    {
      title: 'Staff\nAugmentation',
      center: 'TEAM',
      text: 'Already have a team? We add vetted senior engineers, designers and product people straight into your workflow, for a sprint or for years.',
    },
  ],
};

export const growAI = {
  title: ['GROW WITH', 'AI'],
  subtitle: 'Turning Companies Into AI-Native Operators',
  body:
    'We build the AI inside your product and the automations that run quietly behind your operation — fine-tuned language models, decision engines that act, and agent workflows tied to real revenue. AI is never the goal on its own; a capability your team keeps using is.',
  cardTitle: 'Automate, Optimise\nand Scale With AI',
  cardText:
    'Strategy, engineering and data under one roof, so your organisation can run AI in production. Custom LLM, automated decisioning or an in-product agent — we turn it into measurable, revenue-linked capability.',
  cta: 'Book a Consultation',
  media: {},
};

export const why = {
  title: [
    ['WHY', false],
    ['LONG RELATION', true],
    ['Is A Modern', false],
    ['AI-First', false],
    ['Product Studio', false],
  ],
  // PLACEHOLDER numbers — update with real figures
  stats: [
    { value: 100, suffix: '+', label: 'Projects Delivered' },
    { value: 80, suffix: '+', label: 'Team Members' },
    { value: 50, suffix: '+', label: 'Five-Star Reviews' },
  ],
};

export const awards = {
  title: ['AWARDS &', 'RECOGNITION'],
  // PLACEHOLDER — replace with genuine awards only
  items: [
    { badge: 'TOP\nAPP DEV', title: 'Award Title\nGoes Here', text: 'Short description of the award, who issued it and why you received it.' },
    { badge: 'TOP\nMOBILE', title: 'Award Title\nGoes Here', text: 'Short description of the award, who issued it and why you received it.' },
    { badge: 'TOP\nREACT', title: 'Award Title\nGoes Here', text: 'Short description of the award, who issued it and why you received it.' },
    { badge: 'BEST\nAGENCY', title: 'Award Title\nGoes Here', text: 'Short description of the award, who issued it and why you received it.' },
    { badge: 'TOP\nQUALITY', title: 'Award Title\nGoes Here', text: 'Short description of the award, who issued it and why you received it.' },
  ],
};

export const team = {
  title: ['THE MINDS BEHIND', 'LONG RELATION'],
  intro: 'The people who write the code, design the systems and own the outcome. Senior people on every project — always.',
  // PLACEHOLDER people
  members: [
    {
      name: 'Founder\nName',
      role: 'Founder & CEO',
      points: ['X years building digital products', 'Previously at Company', 'Focus: product & strategy'],
      bio: 'A one-paragraph bio describing this person’s background, what they lead at Long Relation and the results they are proud of.',
      photo: '',
      linkedin: '#',
    },
    {
      name: 'Partner\nName',
      role: 'Chief Technology Officer',
      points: ['X years in engineering', 'Led platform teams at Company', 'Focus: AI infrastructure'],
      bio: 'A one-paragraph bio describing this person’s background, what they lead at Long Relation and the results they are proud of.',
      photo: '',
      linkedin: '#',
    },
    {
      name: 'Lead\nName',
      role: 'Head of Design',
      points: ['X years in product design', 'Design systems & motion', 'Focus: user experience'],
      bio: 'A one-paragraph bio describing this person’s background, what they lead at Long Relation and the results they are proud of.',
      photo: '',
      linkedin: '#',
    },
  ],
};

export const cta = {
  title: 'READY TO SCALE YOUR\nPRODUCT?',
  text: 'Book a free consultation and leave with clarity, direction and expert advice you can act on straight away.',
  button: 'Book a Consultation',
};

export const reviews = {
  title: ['CLIENT', 'REVIEWS'],
  // PLACEHOLDER — replace with real, attributable testimonials
  items: [
    { quote: 'Replace this with a real client quote about working with Long Relation — what changed for their business.', name: 'Client Name', role: 'Role, Company', media: {} },
    { quote: 'Replace this with a real client quote about speed, quality or the way the team communicated.', name: 'Client Name', role: 'Role, Company', media: {} },
    { quote: 'Replace this with a real client quote about the results after launch.', name: 'Client Name', role: 'Role, Company', media: {} },
    { quote: 'Replace this with a real client quote about the partnership over time.', name: 'Client Name', role: 'Role, Company', media: {} },
  ],
};

export const contact = {
  title: 'Ready to bring the right technology into your business?',
  text: 'Long Relation pairs modern tools with deep experience and real curiosity — our team turns your idea into a working product.',
  sub: 'Sign up for a free consultation.',
  callLabel: 'Give us a call',
  formTitle: "Let's Get In Touch",
  formSub: 'We reply within 24 hours — usually sooner.',
  submit: 'Submit Request',
};

export const footer = {
  services: [
    'AI-Accelerated Builds',
    'iOS Development',
    'React Native',
    'Flutter',
    'Unity Development',
    'Unreal Development',
    'AR / VR Experiences',
    'Character & World Art',
  ],
  links: [
    { label: 'About Us', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Blog', href: '#' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Our Work', href: '#work' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Privacy Policy', href: '#' },
  ],
};
