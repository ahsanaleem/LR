import * as enSite from '@/content/site';
import * as enPages from '@/content/pages';
import * as arSite from '@/content/ar/site';
import * as arPages from '@/content/ar/pages';
import { ui } from '@/content/ui';
import { posts, blogIndex } from '@/content/blog';

// English lives at /…, Arabic at /ar/… (see middleware.js).
export const langs = ['en', 'ar'];
export const defaultLang = 'en';
export const dirOf = (lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const ogLocale = { en: 'en_US', ar: 'ar_SA' };

const blogFor = (lang) => ({
  index: blogIndex[lang],
  posts: posts.map(({ en, ar, ...meta }) => ({ ...meta, ...(lang === 'ar' ? ar : en) })),
});

const bundles = {
  en: { lang: 'en', ...enSite, ...enPages, ui: ui.en, blog: blogFor('en') },
  ar: { lang: 'ar', ...arSite, ...arPages, ui: ui.ar, blog: blogFor('ar') },
};

// Everything a page needs to render in one language
export const getContent = (lang) => bundles[lang] || bundles[defaultLang];

// Localise an internal path: lp('ar', '/services') → '/ar/services', lp('ar', '/#about') → '/ar#about'
export function lp(lang, path) {
  if (lang === defaultLang || !path.startsWith('/') || path.startsWith('/ar')) return path;
  if (path === '/') return '/ar';
  if (path.startsWith('/#')) return `/ar${path.slice(1)}`;
  return `/ar${path}`;
}

// Public pathname: during server rendering usePathname() reports the internal /en/… path
// that middleware rewrote to, so strip it back to the URL the visitor actually sees.
export const publicPath = (pathname = '/') => (pathname === '/en' ? '/' : pathname.startsWith('/en/') ? pathname.slice(3) : pathname);

// The same page in the other language, from a browser pathname
export function swapLang(pathname, to) {
  const p = publicPath(pathname);
  const base = p === '/ar' ? '/' : p.startsWith('/ar/') ? p.slice(3) : p;
  return lp(to, base);
}

export const formatDate = (iso, lang) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
