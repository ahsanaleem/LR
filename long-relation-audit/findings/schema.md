# Schema / Structured Data

**Detected:** none (0 JSON-LD blocks, no microdata or RDFa).

## Recommended draft (fill the TODOs, then add it to `app/layout.js` inside `<body>`)

```jsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://lr.com.sa/#org', // TODO confirm the production domain
      name: 'Long Relation',
      url: 'https://lr.com.sa/',
      logo: 'https://lr.com.sa/brand/logo-white.png', // prefer a dark-on-light square logo, min 112×112
      email: 'hello@longrelation.com',
      // telephone: '+966…',            // TODO real number, E.164 format
      // foundingDate: '2021',
      // address: { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressCountry: 'SA' },
      sameAs: [ /* TODO real LinkedIn, X, Instagram URLs */ ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://lr.com.sa/#website',
      url: 'https://lr.com.sa/',
      name: 'Long Relation',
      publisher: { '@id': 'https://lr.com.sa/#org' },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://lr.com.sa/#service',
      name: 'Long Relation',
      url: 'https://lr.com.sa/',
      parentOrganization: { '@id': 'https://lr.com.sa/#org' },
      areaServed: ['SA', 'AE', 'Worldwide'],
      knowsAbout: ['Mobile app development', 'React Native', 'Flutter', 'Unity', 'Unreal Engine', 'AR/VR', 'AI engineering', 'LLM integration'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: ['Mobile Apps', 'Game Development', 'Growth & Care', 'Products & Platforms']
          .map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
      },
    },
  ],
};
// <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

## Do not add yet
- `Review` / `AggregateRating`: the testimonials are placeholders. Self-serving review markup on your own organization isn't eligible for review stars anyway.
- `Person` for team members, until real names and photos exist.

## Later
- `CreativeWork` (or `SoftwareApplication` for the apps) on each `/work/[slug]` page.
- `Service` + `FAQPage` content on each `/services/[slug]` page (FAQ rich results are limited to gov/health sites, but the Q&A structure still helps AI citation).
- `BreadcrumbList` once there are nested pages.
