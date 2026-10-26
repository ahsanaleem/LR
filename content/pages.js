// ─────────────────────────────────────────────────────────────
//  Inner pages — /services/[slug] and the copy around /work/[slug].
//  Case-study facts live with the cards in content/site.js (`featured`).
//  Keep claims verifiable: no invented numbers, clients or awards.
// ─────────────────────────────────────────────────────────────

export const servicesIndex = {
  metaTitle: 'Services | Apps, Games & AI Software — Long Relation',
  metaDescription:
    'Mobile app development, game development, AI engineering, commerce platforms and post-launch growth — one senior team from first idea to scale in Saudi Arabia.',
  title: 'Services',
  lead: 'One senior team for the whole life of your product: strategy, design, engineering, launch and the long run after it.',
};

export const workIndex = {
  metaTitle: 'Our Work | Case Studies — Long Relation',
  metaDescription:
    'Case studies of apps and platforms Long Relation designed and engineered end to end, including Manani and the bilingual Menna luxury fashion marketplace.',
  title: 'Our Work',
  lead: 'Real products we designed and engineered end to end — from first sketch to the app store.',
};

export const servicePages = [
  {
    slug: 'mobile-app-development',
    name: 'Mobile Apps',
    metaTitle: 'Mobile App Development in Saudi Arabia | Long Relation',
    metaDescription:
      'iOS, Android, React Native and Flutter app development for Saudi businesses — bilingual Arabic/English, built for speed, retention and app store visibility.',
    h1: 'Mobile App Development',
    lead: 'Native and cross-platform iOS and Android apps, designed for speed, retention and store visibility from the first release — and fully at home in Arabic and English.',
    media: { video: '/media/services/mobile-apps.mp4', poster: '/media/services/mobile-apps.jpg' },
    overview: [
      'A mobile app is usually the most direct line between a business and its customers, which is exactly why a slow, confusing or unstable one is so expensive. We build apps that open fast, stay responsive on mid-range phones, and make the core action — booking, buying, recording, paying — obvious within the first few seconds.',
      'We start with how the app makes or saves money, not with screens. That means mapping the journey from install to the first meaningful action, finding where people are likely to drop off, and designing the architecture around the moments that matter. Only then do we pick the stack: fully native Swift and Kotlin when the product needs deep platform features or maximum performance, React Native or Flutter when one codebase for iOS and Android is the smarter investment.',
      'For products serving Saudi Arabia and the Gulf, bilingual is the default, not an add-on. Our apps support Arabic and English with complete right-to-left layouts — mirrored navigation, correctly shaped Arabic typography, bidirectional text in forms — and integrate the payment and delivery options local customers expect.',
    ],
    offerings: [
      { title: 'iOS development', text: 'Swift and SwiftUI apps that follow Apple’s platform conventions, use native capabilities such as Apple Pay, widgets and push notifications, and pass App Store review cleanly.' },
      { title: 'Android development', text: 'Kotlin apps tuned for the wide range of Android devices in the region, from flagship phones to budget handsets, with Google Play–ready builds.' },
      { title: 'React Native', text: 'One TypeScript codebase for iOS and Android with native modules where they matter — a strong fit when your team already works in React or ships a web product alongside the app.' },
      { title: 'Flutter', text: 'Pixel-consistent interfaces across iOS, Android and web from a single Dart codebase, ideal for highly branded, animation-rich products.' },
      { title: 'AI-accelerated builds', text: 'We use AI tooling across design, code generation and testing to shorten delivery, while senior engineers own the architecture and review every line that ships.' },
    ],
    process: [
      { title: 'Discovery', text: 'Business goals, users, competitors and the revenue path. We leave this stage with a prioritised feature map and a release plan.' },
      { title: 'Design', text: 'User flows, wireframes and a high-fidelity interface in Arabic and English, tested with clickable prototypes before any code is written.' },
      { title: 'Engineering', text: 'Two-week sprints with a working build at the end of each one, automated tests and a staging app you can install on your own phone.' },
      { title: 'Launch', text: 'App Store and Google Play submission, store listings, analytics, crash reporting and a staged rollout.' },
      { title: 'Growth & care', text: 'Updates for new OS versions, performance monitoring and a roadmap of improvements driven by real usage data.' },
    ],
    stack: ['Swift / SwiftUI', 'Kotlin', 'React Native', 'Flutter', 'TypeScript', 'Node.js', 'Firebase', 'Stripe / Tabby / Apple Pay'],
    faqs: [
      { q: 'Should we build native or cross-platform?', a: 'Cross-platform (React Native or Flutter) is usually the faster, more economical choice for content, commerce and social apps. Native is worth it when the product depends on heavy graphics, advanced camera or sensor work, or very deep platform integration. We recommend one after discovery, with the trade-offs written down.' },
      { q: 'Can the app support Arabic and English?', a: 'Yes. Bilingual Arabic/English with full right-to-left support is standard in our builds, including mirrored layouts, Arabic typography and localised store listings.' },
      { q: 'Do you handle App Store and Google Play publishing?', a: 'Yes. We prepare the builds, store listings, screenshots and privacy declarations, submit the app, and respond to any review feedback until it is live.' },
      { q: 'What happens after launch?', a: 'Most clients keep us on for updates, OS compatibility, monitoring and new features. See our Growth & Care service for how that works.' },
    ],
    work: ['manani', 'menna'],
  },
  {
    slug: 'game-development',
    name: 'Game Development',
    metaTitle: 'Game Development Studio — Unity & Unreal | Long Relation',
    metaDescription:
      'Unity and Unreal Engine game development for PC, console, mobile and AR/VR headsets — gameplay, world building, character art and performance tuning.',
    h1: 'Game Development',
    lead: 'Polished games and interactive worlds for PC, console, mobile and headsets — built in Unity and Unreal Engine, and tuned to run smoothly on the hardware your players actually own.',
    media: { video: '/media/services/game-dev.mp4', poster: '/media/services/game-dev.jpg' },
    overview: [
      'A game lives or dies on feel: how the controls respond, how quickly a new player understands the goal, and whether the frame rate holds when the screen gets busy. We treat those as engineering requirements from day one rather than polish to add at the end.',
      'We work across the full production: game design and prototyping, gameplay programming, level and world building, character and environment art, UI, audio integration, and performance optimisation for each target platform. Whether you are an independent studio with a concept, a brand that wants an interactive experience, or an enterprise that needs a training simulation, we scope the work around a playable vertical slice so you can judge the experience early.',
      'Saudi Arabia’s games and esports sector is growing quickly, and Arabic-first content is still underserved. We can build fully localised games — Arabic UI, right-to-left menus and culturally relevant art direction — for players in the region and beyond.',
    ],
    offerings: [
      { title: 'Unity development', text: 'Cross-platform 3D and 2D games for mobile, PC, console and XR, profiled for frame rate and battery life on real devices.' },
      { title: 'Unreal Engine development', text: 'High-fidelity worlds and photoreal rendering for PC, console and cinematic interactive experiences.' },
      { title: 'AR / VR experiences', text: 'Immersive experiences for Meta Quest, Apple Vision Pro and mobile AR — from training and product showcases to full games.' },
      { title: 'Character & world art', text: 'Concept art, 3D characters, environments, rigging and animation in a consistent art direction.' },
    ],
    process: [
      { title: 'Concept', text: 'Core loop, audience, platforms and monetisation model, captured in a short game design document.' },
      { title: 'Prototype', text: 'A rough playable build that proves the core mechanic is fun before we invest in art.' },
      { title: 'Vertical slice', text: 'One level or scene at final quality — the benchmark for the rest of production.' },
      { title: 'Production', text: 'Content, systems and art built in milestones, with regular playable builds and playtests.' },
      { title: 'Launch & live ops', text: 'Store submission, platform certification support, patches and post-launch content.' },
    ],
    stack: ['Unity', 'Unreal Engine', 'C#', 'C++', 'Blender', 'Maya', 'Substance', 'Meta Quest / visionOS / ARKit / ARCore'],
    faqs: [
      { q: 'Unity or Unreal — which should we use?', a: 'Unity is usually the better fit for mobile, stylised and cross-platform games and for most AR/VR. Unreal shines for high-end PC and console titles and photoreal visuals. We recommend an engine after the concept stage, based on platforms, art style and team.' },
      { q: 'Can you build a game in Arabic?', a: 'Yes. We localise UI, text rendering and menus for Arabic with right-to-left layouts, and can adapt art direction for regional audiences.' },
      { q: 'Do you build VR and AR experiences?', a: 'Yes — for standalone headsets such as Meta Quest, for Apple Vision Pro, and for phone-based AR using ARKit and ARCore.' },
      { q: 'Can you join a game that is already in development?', a: 'Yes. We regularly add senior programmers or artists to existing teams through our staff augmentation model.' },
    ],
    work: [],
  },
  {
    slug: 'ai-engineering',
    name: 'AI Engineering',
    metaTitle: 'AI Engineering & Automation in Saudi Arabia | Long Relation',
    metaDescription:
      'Custom LLM features, AI agents, decision engines and workflow automation built into your product and operations — engineered for production, not demos.',
    h1: 'AI Engineering & Automation',
    lead: 'We build the AI inside your product and the automations that run quietly behind your operation — fine-tuned language models, decision engines that act, and agent workflows tied to real revenue.',
    media: { video: '/media/ai/saudi-planning.mp4', poster: '/media/ai/saudi-planning.jpg' },
    overview: [
      'Most AI projects stall between a promising demo and a dependable feature. The gap is engineering: clean data pipelines, evaluation, guardrails, cost control, latency, and a way for people to correct the system when it is wrong. That gap is where we work.',
      'We start from a business problem — a support queue that is too long, a manual review step that slows sales, a product that would be more useful if it understood natural language — and design the smallest AI capability that measurably moves it. Sometimes that is a carefully prompted foundation model with retrieval over your documents; sometimes a fine-tuned model; sometimes a classic machine-learning model or a rules engine is the better answer. AI is never the goal on its own; a capability your team keeps using is.',
      'For organisations in Saudi Arabia, we design with Arabic in mind from the start — Arabic and mixed Arabic/English input, dialect-aware evaluation — and with data protection requirements such as the Personal Data Protection Law (PDPL) shaping where data is stored and which models can see it.',
    ],
    offerings: [
      { title: 'In-product AI features', text: 'Assistants, smart search, summarisation, content generation and interpretation built into web and mobile apps — like the dream interpretation engine we built for Manani.' },
      { title: 'LLM integration & fine-tuning', text: 'Retrieval-augmented generation over your own data, prompt and model evaluation, and fine-tuning when an off-the-shelf model is not enough.' },
      { title: 'AI agents & workflow automation', text: 'Agents that read, decide and act across your tools — CRM, email, ticketing, ERP — with human approval where it matters.' },
      { title: 'Decision engines', text: 'Scoring, routing and recommendation systems that make or support operational decisions automatically.' },
    ],
    process: [
      { title: 'Opportunity mapping', text: 'We identify the processes and product moments where AI can measurably save time or create revenue, and rank them by value and feasibility.' },
      { title: 'Proof of value', text: 'A focused prototype on your real data, with an evaluation set that defines what “good enough” means before we scale.' },
      { title: 'Production engineering', text: 'APIs, data pipelines, guardrails, monitoring, cost controls and fallbacks so the feature is dependable at real traffic.' },
      { title: 'Adoption & iteration', text: 'Training, feedback loops and regular evaluation runs as models, prompts and your data change.' },
    ],
    stack: ['OpenAI', 'Anthropic Claude', 'Open-weight models', 'Python', 'Node.js', 'Vector databases', 'LangGraph / custom agents', 'AWS / Azure / GCP'],
    faqs: [
      { q: 'Do we need our own model?', a: 'Usually not at first. Most products get the best return from a strong foundation model plus retrieval over your own data. We fine-tune or train custom models only when evaluation shows it is worth the cost.' },
      { q: 'Can AI features work in Arabic?', a: 'Yes. We test with Arabic and mixed-language input and choose models and evaluation sets that handle it well.' },
      { q: 'How do you keep our data safe?', a: 'We design data flows around your security and compliance requirements, including where data is processed and stored, which providers can access it, and how long it is retained.' },
      { q: 'How do we know it is working?', a: 'Every AI feature ships with an evaluation set and production monitoring, so quality, cost and latency are measured continuously rather than judged by impression.' },
    ],
    work: ['manani'],
  },
  {
    slug: 'products-and-platforms',
    name: 'Products & Platforms',
    metaTitle: 'E-commerce & Platform Development | Long Relation',
    metaDescription:
      'Bilingual e-commerce storefronts, marketplaces and immersive-tech platforms with local payments like Tabby — launch on a proven foundation, not from scratch.',
    h1: 'Commerce & Platform Development',
    lead: 'Ready-to-launch commerce and immersive-technology foundations for teams that cannot afford to start from scratch — bilingual, fast and integrated with the payment and delivery options your customers expect.',
    media: { video: '/media/services/platforms.mp4', poster: '/media/services/platforms.jpg' },
    overview: [
      'Selling online in Saudi Arabia means meeting customers in two languages, offering the payment methods they trust — cards, Apple Pay and buy-now-pay-later options such as Tabby — and delivering quickly across cities. A generic template rarely handles all three well.',
      'We build storefronts, multi-vendor marketplaces and platform back-ends on proven foundations, then shape them around your catalogue, brand and operations. The Menna marketplace is a good example: a bilingual luxury fashion storefront on mobile and web, with editorial browsing, filtered categories, size and colour selection, and instalment checkout.',
      'Beyond commerce, we build immersive-technology platforms — 3D product viewers, virtual showrooms and AR try-on — that turn browsing into an experience and give customers more confidence before they buy.',
    ],
    offerings: [
      { title: 'Commerce platforms', text: 'Custom storefronts and headless commerce on modern stacks, with bilingual catalogues, search, promotions and local payments.' },
      { title: 'Marketplaces', text: 'Multi-vendor platforms with seller onboarding, catalogue management, commissions and order routing.' },
      { title: 'Immersive technology', text: '3D product viewers, AR try-on and virtual showrooms that work in the browser and in native apps.' },
      { title: 'Integrations', text: 'Payment gateways, BNPL, shipping carriers, ERP and CRM connected so orders flow without manual work.' },
    ],
    process: [
      { title: 'Commerce audit', text: 'Catalogue, operations, payment and delivery requirements, and the KPIs the platform must move.' },
      { title: 'Foundation & design', text: 'We choose the right foundation and design a bilingual storefront around your brand and buying journey.' },
      { title: 'Build & integrate', text: 'Storefront, admin, payments, shipping and analytics, tested end to end with real orders in staging.' },
      { title: 'Launch & optimise', text: 'Go-live, conversion tracking and continuous improvements to speed, search and checkout.' },
    ],
    stack: ['Next.js', 'React Native', 'Node.js', 'Headless commerce', 'Stripe', 'Tabby', 'Three.js / WebXR', 'PostgreSQL'],
    faqs: [
      { q: 'Can you integrate Tabby and other local payment methods?', a: 'Yes. We have shipped Tabby instalment checkout and integrate card payments, Apple Pay and other gateways as your business requires.' },
      { q: 'Will the store work in Arabic and English?', a: 'Yes — bilingual catalogues and full right-to-left layouts on web and mobile are standard in our commerce builds.' },
      { q: 'Should we use Shopify or build a custom platform?', a: 'Hosted platforms are a great start for simple catalogues. Custom or headless builds make sense for marketplaces, complex catalogues, unusual checkout flows or when performance and brand control matter most. We will recommend the option with the best long-term cost.' },
    ],
    work: ['menna-web', 'menna'],
  },
  {
    slug: 'growth-and-care',
    name: 'Growth & Care',
    metaTitle: 'App Growth, ASO & Maintenance | Long Relation',
    metaDescription:
      'Launch, performance marketing, app store optimisation and long-term support so your product keeps improving after day one — from the team that built it.',
    h1: 'Growth & Care',
    lead: 'Launch, visibility and long-term maintenance so your product keeps compounding after day one — run by the same team that understands how it was built.',
    media: { video: '/media/services/growth.mp4', poster: '/media/services/growth.jpg' },
    overview: [
      'Launch day is the start of a product’s life, not the end of the project. Operating systems change every year, libraries age, competitors ship new features, and real users reveal what the roadmap should have been. Products that keep improving win; products that are left alone slowly decay.',
      'Growth & Care is how we stay with a product for the long run — the reason we are called Long Relation. We combine visibility work that brings the right users in with engineering care that keeps the product fast, secure and compatible, and a data-driven roadmap that decides what to build next.',
      'Because we usually built the product ourselves, there is no hand-over gap: the people improving it already know its architecture, its trade-offs and its history. We also take over products built by other teams, starting with a technical health check.',
    ],
    offerings: [
      { title: 'Performance marketing', text: 'Paid acquisition across search, social and app install campaigns, measured against cost per acquisition and retention rather than clicks.' },
      { title: 'App store optimisation', text: 'Keyword research, bilingual store listings, screenshots and ratings strategy to improve visibility on the App Store and Google Play.' },
      { title: 'Support & upgrades', text: 'OS and dependency updates, security patches, crash and performance monitoring, and agreed response times.' },
      { title: 'Product iteration', text: 'Analytics, user feedback and experiments turned into a prioritised roadmap of improvements.' },
    ],
    process: [
      { title: 'Health check', text: 'Performance, crash rates, security, store presence and analytics coverage reviewed and scored.' },
      { title: 'Plan', text: 'A quarterly plan balancing growth work, maintenance and new features.' },
      { title: 'Operate', text: 'Monthly releases, monitoring and campaign management with clear reporting.' },
      { title: 'Review', text: 'Regular reviews of results against goals, and a reset of priorities for the next cycle.' },
    ],
    stack: ['App Store Connect', 'Google Play Console', 'Firebase / Crashlytics', 'Google Analytics', 'Sentry', 'Meta & Google Ads', 'CI/CD pipelines'],
    faqs: [
      { q: 'Can you maintain an app another agency built?', a: 'Yes. We start with a technical health check of the codebase and infrastructure, fix the urgent issues, then take over regular maintenance.' },
      { q: 'What does app store optimisation involve?', a: 'Researching the terms your customers search for, writing bilingual titles and descriptions, designing screenshots and preview videos, and improving ratings — then measuring the change in visibility and installs.' },
      { q: 'How is Growth & Care billed?', a: 'Usually as a monthly retainer sized to the product and the level of support you need, so the work is planned rather than reactive.' },
    ],
    work: [],
  },
];

export const legal = {
  updated: '25 October 2026',
  // NOTE: drafted as a starting point for a marketing site with a contact form.
  // Have it reviewed by a lawyer and add the company's legal name and CR number before launch.
  privacy: {
    metaTitle: 'Privacy Policy | Long Relation',
    metaDescription: 'How Long Relation collects, uses and protects personal data submitted through this website, and the rights you have over it.',
    title: 'Privacy Policy',
    sections: [
      { h: 'Who we are', p: ['Long Relation (“we”, “us”) is a software product studio. This policy explains how we handle personal data collected through this website. If you have any questions, contact us at the email address at the end of this page.'] },
      { h: 'What we collect', p: ['When you submit the contact or quote form, we collect the details you provide: your name, email address, phone number and the content of your message.', 'Our hosting provider automatically records standard technical information, such as IP address, browser type and the pages requested, in server logs used for security and reliability.', 'This website does not use advertising or analytics cookies. Your browser stores one session flag so the intro animation is not replayed during the same visit; it contains no personal data and is deleted when you close the browser.'] },
      { h: 'How we use it', p: ['We use the details you submit only to respond to your enquiry, prepare proposals you request and, if we work together, to manage that relationship. We do not sell your personal data or use it for unrelated marketing without your consent.'] },
      { h: 'Legal basis', p: ['We process your data because you asked us to contact you, or because it is necessary to take steps before entering into a contract with you, in line with the Saudi Personal Data Protection Law (PDPL) and other applicable laws.'] },
      { h: 'Sharing', p: ['We share personal data only with service providers that help us run the website and our business — such as hosting, email and customer-relationship tools — under agreements that require them to protect it, or when the law requires us to.'] },
      { h: 'Retention', p: ['We keep enquiry data for as long as needed to respond and follow up, and for client relationships for the duration of the engagement plus any period required by law. After that we delete or anonymise it.'] },
      { h: 'Your rights', p: ['You may ask to access, correct or delete the personal data we hold about you, to receive a copy of it, or to withdraw your consent where processing is based on consent. Contact us and we will respond within the time limits set by applicable law.'] },
      { h: 'Security', p: ['We use appropriate technical and organisational measures, including encrypted connections (HTTPS) and access controls, to protect personal data against loss and unauthorised access.'] },
      { h: 'Changes', p: ['We may update this policy from time to time. The date at the top shows when it last changed.'] },
    ],
  },
  terms: {
    metaTitle: 'Terms & Conditions | Long Relation',
    metaDescription: 'The terms that apply to your use of the Long Relation website, including intellectual property, acceptable use and limitation of liability.',
    title: 'Terms & Conditions',
    sections: [
      { h: 'About these terms', p: ['These terms govern your use of this website, operated by Long Relation. By using the site you agree to them. Work we carry out for clients is governed by a separate written agreement.'] },
      { h: 'Use of the website', p: ['You may browse the website and share links to it for lawful purposes. You must not attempt to disrupt the site, access it in unauthorised ways, or use it to send unlawful, misleading or harmful content.'] },
      { h: 'Intellectual property', p: ['The website’s design, text, graphics, logos and code belong to Long Relation or its licensors. Case-study materials are shown with the permission of the respective clients and remain their property. You may not copy or reuse this content without written permission.'] },
      { h: 'Information on this site', p: ['We describe our services and past work as accurately as we can, but the content is general information, not a binding offer. Scope, price and timelines for any project are agreed in writing before work begins.'] },
      { h: 'Third-party links', p: ['Links to other websites are provided for convenience. We are not responsible for their content or practices.'] },
      { h: 'Liability', p: ['The website is provided “as is”. To the extent permitted by law, we are not liable for any loss arising from your use of it or reliance on its content.'] },
      { h: 'Governing law', p: ['These terms are governed by the laws of the Kingdom of Saudi Arabia, and disputes are subject to the jurisdiction of its competent courts.'] },
      { h: 'Changes', p: ['We may update these terms from time to time. The date at the top shows when they last changed.'] },
    ],
  },
};
