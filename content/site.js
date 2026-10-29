// ─────────────────────────────────────────────────────────────
//  LONG RELATION — all site copy, links and media in one place.
//  Edit this file to rebrand / update content. Every `media`
//  field accepts { video: '/media/x.mp4', poster: '/media/x.jpg' }
//  or { image: '/media/x.jpg' }. Leave empty for the built-in
//  animated placeholder artwork.
//  Items marked  // PLACEHOLDER  must be replaced with real data.
//  Sections still waiting for real data have `show: false` — they
//  are not rendered (or indexed) until you fill them in and flip it.
// ─────────────────────────────────────────────────────────────

// Production origin — used for canonical URLs, sitemap, Open Graph and schema.
export const site = {
  url: 'https://lr.com.sa', // TODO confirm the production domain before launch
  title: 'Long Relation | AI App & Software Studio, Saudi Arabia',
  description:
    'AI-first product studio building mobile apps, games, web platforms and AI automation for companies in Saudi Arabia, from first strategy through launch and long-term support.',
  ogImageAlt: 'Long Relation, AI-first product studio',
};

export const brand = {
  name: 'LONG RELATION',
  short: 'Long Relation',
  phone: '', // PLACEHOLDER — real number in international format, e.g. '+966 5X XXX XXXX'. Hidden while empty.
  email: 'hello@longrelation.com', // PLACEHOLDER
  supportEmail: 'support@longrelation.com', // PLACEHOLDER
  address: '', // PLACEHOLDER — e.g. 'King Fahd Rd, Riyadh, Saudi Arabia'. Hidden while empty.
  // PLACEHOLDER — add each real profile URL; icons with an empty href are not rendered
  socials: [
    { label: 'LinkedIn', href: '', icon: 'linkedin' },
    { label: 'X', href: '', icon: 'x' },
    { label: 'Facebook', href: '', icon: 'facebook' },
    { label: 'Instagram', href: '', icon: 'instagram' },
  ],
};

// `/#id` links scroll in place on the homepage and navigate home from inner pages
export const nav = [
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/services' },
  { label: 'Our Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/#contact' },
];

export const hero = {
  lines: [
    [{ t: 'Empowered by ' }, { t: 'AI.', accent: true }],
    [{ t: 'Driven by ' }, { t: 'Human Vision.', bold: true }],
  ],
  srLead: 'Long Relation is an AI-first product studio building mobile apps, games and AI software.', // H1 continuation, visually hidden
  tagline: 'Intelligence-first design,\nstrategy, and engineering\nfor products that scale.',
  since: '2021-2026',
  wordmark: 'long relation', // giant ghost word along the bottom
  // background iris loop — recoloured to the brand cyan in CSS; the logo mark sits in a soft hole cut at the pupil
  media: { video: '/media/hero/banner-vid.mp4', poster: '/media/hero/banner-poster.webp' },
  mark: '/brand/mark.svg', // brand-cyan vector mark
  thumb: { video: '/media/about/saudi-team.mp4', poster: '/media/about/saudi-team.jpg' }, // small looping preview, bottom-right — same clip as About, so the tile flows into it
};

export const about = {
  eyebrow: ['ABOUT', 'US'],
  title: 'we build the intelligence behind the interface',
  body:
    'Long Relation is a product studio that designs and engineers software across web, mobile, 3D, XR and AI automation. Every project starts with how your business makes money. We trace the revenue path, find where people drop off, and plan an architecture that holds up under real traffic. Then we design and build software that earns its place in the market.',
  media: { video: '/media/about/saudi-team.mp4', poster: '/media/about/saudi-team.jpg' },
};

export const services = {
  title: ['OUR', 'SERVICES'],
  subtitle: 'One team from first idea to global scale.',
  items: [
    {
      icon: 'mobile',
      title: 'Mobile Apps',
      slug: 'mobile-app-development', // /services/mobile-app-development
      text: 'Native and cross-platform apps tuned for speed, retention and store visibility from the first release.',
      list: ['AI-Accelerated Builds', 'iOS Development', 'Android Development', 'React Native', 'Flutter'],
      media: { video: '/media/services/mobile-apps.mp4', poster: '/media/services/mobile-apps.jpg' },
      hue: 188,
    },
    {
      icon: 'game',
      title: 'Game Development',
      slug: 'game-development', // /services/game-development
      text: 'Polished games and interactive worlds for PC, console, mobile and headsets.',
      list: ['Unity Development', 'Unreal Development', 'AR / VR Experiences', 'Character & World Art'],
      media: { video: '/media/services/game-dev.mp4', poster: '/media/services/game-dev.jpg' },
      hue: 200,
    },
    {
      icon: 'megaphone',
      title: 'Growth & Care',
      slug: 'growth-and-care', // /services/growth-and-care
      text: 'Launch, visibility and long-term maintenance so your product keeps improving long after launch.',
      list: ['Performance Marketing', 'App Store Optimisation', 'Support & Upgrades'],
      media: { video: '/media/services/growth.mp4', poster: '/media/services/growth.jpg' },
      hue: 178,
    },
    {
      icon: 'cube',
      title: 'Products & Platforms',
      slug: 'products-and-platforms', // /services/products-and-platforms
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
    'The tools we pick, and the reasons behind them. We are flexible on stack and strict on quality.\nWe ship every one of these to production.',
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
  intro: 'Real products we designed and engineered end to end, from the first sketch to the app store.',
  // Case studies from lr.com.sa. `kind` picks the frame: 'mobile' = phone screens, 'web' = browser windows.
  items: [
    {
      name: 'Manami',
      slug: 'manami', // /work/manami
      category: 'Dream Journal',
      year: '2025',
      kind: 'mobile',
      tagline: 'Dreams, Interpreted and Shared',
      summary: 'A social dream journal that turns each night’s dreams into AI-interpreted stories you can keep private or share.',
      description: [
        'Manami lets people record a dream the moment they wake up, by video, voice or text, and get an AI interpretation of its themes and mood within seconds.',
        'We designed and built the full iOS and Android apps: multi-modal capture, the interpretation engine, and a Memories archive with mood tags and layered privacy, including a locked "My Eyes Only" vault.',
        'A social layer lets users follow friends, tag them in dreams and post interpreted stories to a community feed.',
      ],
      tags: ['React Native', 'OpenAI', 'Node.js'],
      platforms: 'iOS & Android',
      services: ['mobile-app-development', 'ai-engineering'],
      built: ['Video, voice and text dream capture', 'AI interpretation of themes and mood', 'Memories archive with mood tags', 'Layered privacy with a locked “My Eyes Only” vault', 'Social feed, following and tagging'],
      from: '#0b1640',
      to: '#2c3a96',
      screens: [
        { src: '/media/portfolio/manami-capture.webp', label: 'Capture', alt: 'Manami app dream capture screen with video, voice and text options' },
        { src: '/media/portfolio/manami-voice.webp', label: 'Voice', alt: 'Manami app recording a dream by voice' },
        { src: '/media/portfolio/manami-memories.webp', label: 'Memories', alt: 'Manami app Memories archive with mood-tagged dreams' },
      ],
    },
    {
      name: 'Menna',
      slug: 'menna', // /work/menna
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
      platforms: 'iOS & Android',
      services: ['mobile-app-development', 'products-and-platforms'],
      built: ['Editorial Discover feed with seasonal lookbooks', 'Curated category rails', 'Product flow with size selection and editor styling advice', 'Full Arabic / English localisation with right-to-left support'],
      from: '#1c1510',
      to: '#7a5a32',
      screens: [
        { src: '/media/portfolio/menna-welcome.webp', label: 'Welcome', alt: 'Menna luxury fashion app welcome screen' },
        { src: '/media/portfolio/menna-discover.webp', label: 'Discover', alt: 'Menna app Discover feed with seasonal lookbooks and designer rails' },
        { src: '/media/portfolio/menna-product.webp', label: 'Product', alt: 'Menna app product page with size selection and styling advice' },
      ],
    },
    {
      name: 'Menna Web',
      slug: 'menna-web', // /work/menna-web
      category: 'Luxury Fashion, Web',
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
      platforms: 'Web',
      services: ['products-and-platforms'],
      built: ['Bilingual editorial homepage', 'Filtered browsing across Women, Men, Beauty and Fragrance', 'Product pages with colour and size selection', 'Tabby instalment checkout', 'Express delivery across Riyadh, Jeddah and Dammam'],
      from: '#071a24',
      to: '#0a6b80',
      screens: [
        { src: '/media/portfolio/menna-web-home.webp', label: 'Home', alt: 'Menna web storefront homepage in Arabic and English' },
        { src: '/media/portfolio/menna-web-women.webp', label: 'Women', alt: 'Menna web Women category page with filtered product grid' },
        { src: '/media/portfolio/menna-web-product.webp', label: 'Product', alt: 'Menna web product page with colour and size selection and Tabby instalments' },
      ],
    },
    {
      name: 'LetsLink',
      slug: 'letslink', // /work/letslink
      category: 'Digital Identity, Web',
      year: '2026',
      kind: 'web',
      url: 'https://letslink.com.sa/',
      tagline: 'One Link for Every Business',
      summary: 'An Arabic-first platform that gives Saudi small businesses and freelancers one page to be found, trusted and contacted.',
      description: [
        'LetsLink gives cafés, salons, clinics, shops and freelancers a single page and a single link they can put in their bio, on a QR code, in an email signature or on WhatsApp.',
        'We designed and built the platform: a page editor with live preview that publishes in minutes, WhatsApp, call and order buttons, service menus with prices, opening hours and locations, plus ready-made templates by industry.',
        'Pages are built Arabic-first and mirror fully into English, and owners get analytics on visits, taps and top cities, with free and Plus plans priced in SAR.',
      ],
      tags: ['Next.js', 'Node.js', 'Cloudflare'],
      platforms: 'Web',
      services: ['products-and-platforms'],
      built: ['Page editor with live preview', 'WhatsApp, call and order buttons', 'Service menus with prices, hours and location', 'Industry templates for cafés, salons, clinics and creators', 'Visitor analytics with top cities', 'Arabic-first pages that mirror fully into English'],
      from: '#061226',
      to: '#0d6f6a',
      screens: [
        { src: '/media/portfolio/letslink-home.webp', label: 'Home', alt: 'LetsLink homepage with a creator profile page on a phone and a claim-your-link field' },
        { src: '/media/portfolio/letslink-share.webp', label: 'Share', alt: 'LetsLink sharing options: in your bio, on a QR code, in an email signature and on WhatsApp' },
        { src: '/media/portfolio/letslink-connect.webp', label: 'Connect', alt: 'LetsLink WhatsApp, call and order buttons above a café menu with prices' },
      ],
    },
    {
      name: 'Global Image Award',
      slug: 'global-image-award', // /work/global-image-award
      category: 'Business Awards, Web',
      year: '2025',
      kind: 'web',
      url: 'https://www.globalimageawards.com/',
      tagline: 'Celebrating Leadership Across the Middle East',
      summary: 'The website for Global Image Award Middle East, which recognises CEOs, industrialists and business leaders across 15 industries.',
      description: [
        'Global Image Award Middle East honours business leaders for their contribution to their industries and economies, with an awards night in Dubai each year.',
        'We designed and built the website: nominations with key dates, the 15 recognised industries and award categories, ambassadors, board members and partners, and the participant countries.',
        'A searchable winners archive organised by year, a media gallery and partnership pages keep the programme visible between ceremonies.',
      ],
      tags: ['HTML / CSS', 'JavaScript', 'Responsive web'],
      platforms: 'Web',
      services: ['products-and-platforms'],
      built: ['Online nomination flow with key dates', '15 industries and award categories', 'Ambassadors, board members and partner showcases', 'Participant countries map', 'Searchable winners archive by year', 'Media and gallery section'],
      from: '#120d05',
      to: '#8a5a0c',
      screens: [
        { src: '/media/portfolio/gia-home.webp', label: 'Home', alt: 'Global Image Award Middle East homepage with Dubai skyline and nominate now button' },
        { src: '/media/portfolio/gia-industries.webp', label: 'Industries', alt: 'Global Image Award industries grid covering 15 recognised sectors' },
        { src: '/media/portfolio/gia-winners.webp', label: 'Winners', alt: 'Global Image Award winners archive with search and award year filters' },
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
      text: 'A clear scope, budget and launch date. A dedicated project lead and an engineering pod own the build from concept to release, with a fixed scope and timeline.',
    },
    {
      title: 'Dedicated\nTeam',
      center: 'logo',
      text: 'For bigger or longer programmes we field a complete squad of strategists, designers and engineers working as one unit, with fewer hand-offs and faster decisions.',
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
    'We build AI features into your product and automate the work behind your operations: fine-tuned language models, decision engines and agent workflows tied to measurable business results. We measure success by whether your team keeps using what we build.',
  cardTitle: 'Automate, Optimise\nand Scale With AI',
  cardText:
    'Strategy, engineering and data under one roof, so your organisation can run AI in production. Whether you need a custom LLM, automated decisions or an in-product agent, we build it and measure its impact on revenue.',
  cta: 'Book a Consultation',
  media: { video: '/media/ai/saudi-planning.mp4', poster: '/media/ai/saudi-planning.jpg' },
};

export const why = {
  title: [
    ['WHY', false],
    ['LONG RELATION', true],
    ['Is A Modern', false],
    ['AI-First', false],
    ['Product Studio', false],
  ],
  // PLACEHOLDER numbers — update with real figures, then set showStats: true
  showStats: false,
  stats: [
    { value: 100, suffix: '+', label: 'Projects Delivered' },
    { value: 80, suffix: '+', label: 'Team Members' },
    { value: 50, suffix: '+', label: 'Five-Star Reviews' },
  ],
};

export const awards = {
  show: false, // PLACEHOLDER — set true once the items below are genuine awards
  title: ['AWARDS &', 'RECOGNITION'],
  items: [
    { badge: 'TOP\nAPP DEV', title: 'Award Title\nGoes Here', text: 'Short description of the award, who issued it and why you received it.' },
    { badge: 'TOP\nMOBILE', title: 'Award Title\nGoes Here', text: 'Short description of the award, who issued it and why you received it.' },
    { badge: 'TOP\nREACT', title: 'Award Title\nGoes Here', text: 'Short description of the award, who issued it and why you received it.' },
    { badge: 'BEST\nAGENCY', title: 'Award Title\nGoes Here', text: 'Short description of the award, who issued it and why you received it.' },
    { badge: 'TOP\nQUALITY', title: 'Award Title\nGoes Here', text: 'Short description of the award, who issued it and why you received it.' },
  ],
};

export const team = {
  show: true,
  title: ['THE MINDS BEHIND', 'LONG RELATION'],
  intro: '', // optional line beside the heading; hidden while empty
  // `\n` sets where the big name breaks. Optional per person (hidden while empty):
  // photo (portrait, at least 600×760, e.g. '/media/team/amer.jpg'), points (2–3 short facts), bio (one paragraph), linkedin (profile URL).
  members: [
    { name: 'Amer Ahmad\nAlashi', role: 'Chief Executive Officer', points: [], bio: '', photo: '/media/team/amer-alashi.webp', linkedin: '' },
    { name: 'Faisal\nAlyami', role: 'Chief Marketing Officer', points: [], bio: '', photo: '/media/team/faisal-alyami.webp', linkedin: '' },
    { name: 'Muhammad Omer\nKhan', role: 'Chief Technology Officer', points: [], bio: '', photo: '/media/team/omer-khan.webp', linkedin: '' },
  ],
};

export const cta = {
  title: 'READY TO SCALE YOUR\nPRODUCT?',
  text: 'Book a free consultation and leave with clarity, direction and expert advice you can act on straight away.',
  button: 'Book a Consultation',
};

export const reviews = {
  show: false, // PLACEHOLDER — set true once the quotes below are real, attributable testimonials
  title: ['CLIENT', 'REVIEWS'],
  items: [
    { quote: 'Replace this with a real client quote about working with Long Relation — what changed for their business.', name: 'Client Name', role: 'Role, Company', media: {} },
    { quote: 'Replace this with a real client quote about speed, quality or the way the team communicated.', name: 'Client Name', role: 'Role, Company', media: {} },
    { quote: 'Replace this with a real client quote about the results after launch.', name: 'Client Name', role: 'Role, Company', media: {} },
    { quote: 'Replace this with a real client quote about the partnership over time.', name: 'Client Name', role: 'Role, Company', media: {} },
  ],
};

export const contact = {
  title: 'Ready to bring the right technology into your business?',
  text: 'Long Relation pairs modern tools with deep experience. Our team turns your idea into a working product.',
  sub: 'Sign up for a free consultation.',
  callLabel: 'Give us a call',
  formTitle: "Let's Get In Touch",
  formSub: 'We reply within 24 hours, usually sooner.',
  submit: 'Submit Request',
};

export const footer = {
  services: [
    { label: 'Mobile App Development', href: '/services/mobile-app-development' },
    { label: 'Game Development', href: '/services/game-development' },
    { label: 'AI Engineering', href: '/services/ai-engineering' },
    { label: 'Commerce & Platforms', href: '/services/products-and-platforms' },
    { label: 'Growth & Care', href: '/services/growth-and-care' },
    { label: 'Case Studies', href: '/work' },
  ],
  links: [
    { label: 'About Us', href: '/#about' },
    { label: 'Services', href: '/services' },
    { label: 'Our Work', href: '/work' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/#contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};
