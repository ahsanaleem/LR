# Technical SEO — 45/100

## Evidence (local `next start`, port 3123)
| Path | Status |
|---|---|
| `/` | 200, prerendered, 67 KB HTML |
| `/robots.txt` | 404 |
| `/sitemap.xml` | 404 |
| `/llms.txt` | 404 |
| `/favicon.ico` | 404 (`/icon.svg` is linked, which is fine) |
| `/does-not-exist` | 404 (correct) |

Response headers: no CSP, X-Frame-Options, Referrer-Policy or Permissions-Policy; `X-Powered-By: Next.js` is present.

## Mobile overflow (High)
Measured at a 390×844 mobile viewport: `innerWidth` = `scrollWidth` = **501**.
Cause: `.serv_vid_box` starts at `x: ±120` (`components/sections/Services.js:21`) until its ScrollTrigger fires. `body { overflow-x: hidden }` alone doesn't stop mobile Chrome from expanding the layout viewport. Result: the fixed header's menu button sits at x=451–485, outside the visible 390px (`screenshots/mobile-above-fold.png`).
Fix:
```css
html { overflow-x: clip; }   /* clip doesn't create a scroll container, so position: sticky still works */
```

## Suggested files
```js
// app/robots.js
export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: 'https://lr.com.sa/sitemap.xml' };
}
// app/sitemap.js
export default function sitemap() {
  return [{ url: 'https://lr.com.sa/', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
```
```js
// app/layout.js metadata additions
metadataBase: new URL('https://lr.com.sa'),
alternates: { canonical: '/' },
openGraph: { type: 'website', siteName: 'Long Relation', url: '/', images: ['/og.png'] },
twitter: { card: 'summary_large_image' },
```
```js
// next.config.mjs
const nextConfig = { reactStrictMode: true, poweredByHeader: false, async headers() { return [{ source: '/(.*)', headers: [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]}]; } };
```

## Architecture
All 50 anchors are on-page `#` targets, `tel:` or `mailto:`, so the site has 0 crawlable internal URLs. Nine links point to a bare `#`: Blog ×2, Terms, Privacy, 4 socials, plus team LinkedIn links. A single URL caps how many queries the site can rank for (see the Medium items in `ACTION-PLAN.md`).
