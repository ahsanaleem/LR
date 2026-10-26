import { brand, site } from '@/content/site';
import { lp, ogLocale } from '@/lib/i18n';

// Absolute URL for a language-neutral path in a given language
export const abs = (path, lang = 'en') => {
  const p = lp(lang, path);
  return `${site.url}${p === '/' ? '/' : p}`;
};
export const orgRef = { '@id': `${site.url}/#org` };

// Per-page metadata: canonical + hreflang pair (en / ar / x-default) + social tags.
// `path` is language-neutral ('/services'); the Arabic URL is derived from it.
export function pageMeta(lang, { path, title, description }) {
  const url = lp(lang, path);
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: path, ar: lp('ar', path), 'x-default': path } },
    openGraph: {
      type: 'website', siteName: brand.short, url, title, description,
      locale: ogLocale[lang], alternateLocale: ogLocale[lang === 'ar' ? 'en' : 'ar'],
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: site.ogImageAlt }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  };
}

// [['Home', '/'], ['Services', '/services'], …] with language-neutral paths
export const breadcrumbLd = (trail, lang = 'en') => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path, lang) })),
});

export function JsonLd({ graph }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }} />;
}
