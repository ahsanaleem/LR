import { getContent, lp } from '@/lib/i18n';

// Every page in English and Arabic, each entry listing its language alternates (hreflang).
export default function sitemap() {
  const { site, featured, servicePages, blog } = getContent('en');
  const now = new Date();
  const url = (lang, path) => `${site.url}${lp(lang, path)}`;
  const entry = (path, priority, changeFrequency = 'monthly', lastModified = now) =>
    ['en', 'ar'].map((lang) => ({
      url: url(lang, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { en: url('en', path), ar: url('ar', path), 'x-default': url('en', path) } },
    }));
  return [
    ...entry('/', 1),
    ...entry('/services', 0.9),
    ...servicePages.flatMap((s) => entry(`/services/${s.slug}`, 0.8)),
    ...entry('/work', 0.8),
    ...featured.items.flatMap((p) => entry(`/work/${p.slug}`, 0.7)),
    ...entry('/blog', 0.7, 'weekly'),
    ...blog.posts.flatMap((p) => entry(`/blog/${p.slug}`, 0.6, 'yearly', new Date(p.date))),
    ...entry('/privacy', 0.2, 'yearly'),
    ...entry('/terms', 0.2, 'yearly'),
  ];
}
