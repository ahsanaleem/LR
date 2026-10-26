# Long Relation — Full SEO Audit

**Audited:** 2026-10-25 · **Target:** local production build (`next build && next start`, commit `a5da8f9`) — the site is not deployed yet
**Scope:** 1 indexable URL (`/`). The site is a single page; every nav item is an on-page anchor or `#`.
**Business type:** B2B software / product studio (agency). Saudi market signals (lr.com.sa case studies, Riyadh/Jeddah/Dammam, Saudi imagery) but no address or phone yet.

---

## Executive Summary

### SEO Health Score: **37 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 45 | 9.9 |
| Content Quality | 23% | 35 | 8.1 |
| On-Page SEO | 20% | 45 | 9.0 |
| Schema / Structured Data | 10% | 10 | 1.0 |
| Performance (CWV, lab) | 10% | 40 | 4.0 |
| AI Search Readiness | 10% | 30 | 3.0 |
| Images | 5% | 50 | 2.5 |
| **Total** | | | **37** |

The foundation is sound: the page is statically prerendered, so all copy (about 1,125 words) is in the initial HTML and needs no JavaScript to crawl. It has one H1 and a clean title. The low score comes from launch-readiness gaps rather than architecture: placeholder content, no crawl or discovery files, no structured data, a single URL that has to rank for every service, and very heavy video loading.

### Top 5 critical / high issues
1. **Placeholder content is live in the build.** It includes phone `+1 (000) 000-0000`, the address "Your street address…", 5 "Award Title Goes Here" cards, 3 "Founder Name" team cards, 4 "Replace this with a real client quote" reviews, and unverified stats (100+ projects, 80+ team members, 50+ five-star reviews). Publishing invented awards, reviews or stats risks a quality or spam assessment and destroys E-E-A-T.
2. **One URL for everything.** Mobile apps, game development, AR/VR, AI engineering and the three case studies all live on `/`. There are no service, case-study, blog, privacy or terms pages to rank or link to. Blog, Privacy Policy, Terms and 7 social/LinkedIn links all point to `#`.
3. **No robots.txt, sitemap.xml, canonical, Open Graph or Twitter tags** (all return 404 or are absent).
4. **Every video downloads on load: about 22 MB on desktop.** All 9 `<video autoPlay>` elements fetch their full files within 9 seconds without any scrolling (26.4 MB page weight on desktop in total). Only the hero pauses offscreen, and it still downloads.
5. **Mobile horizontal overflow hides the menu button.** Services cards start at `x: ±120px` (`components/sections/Services.js:21`). Only `body` has `overflow-x: hidden`, so mobile Chrome widens the layout viewport to **501px on a 390px phone**. The header menu button renders at x=451–485, off-screen in the first view (see `screenshots/mobile-above-fold.png`).

### Top 5 quick wins
1. Add `app/robots.js` and `app/sitemap.js` (Next.js metadata routes): about 10 minutes.
2. Extend `metadata` in `app/layout.js` with `metadataBase`, `alternates.canonical`, `openGraph`, `twitter`, and an OG image.
3. Add `Organization` + `WebSite` + `ProfessionalService` JSON-LD (draft in `findings/schema.md`).
4. Add `html { overflow-x: clip; }` (or `overflow-x: clip` on `.serv_row`) to fix the 501px mobile viewport.
5. Change non-hero videos to `preload="none"` and play/load them through an IntersectionObserver, as the hero already does.

---

## Technical SEO — 45/100
**Works:** static prerender (`○ /`), full SSR HTML (67 KB), `lang="en"`, viewport meta, `theme-color`, SVG favicon via `app/icon.svg`, a real 404 for unknown paths, clean `next build` with no errors.

| Severity | Finding |
|---|---|
| Critical | No `robots.txt` (404) and no `sitemap.xml` (404). |
| High | No `<link rel="canonical">`. Once on Vercel, `*.vercel.app` preview hosts and `www`/apex variants can be indexed as duplicates. |
| High | Mobile layout viewport is 501px wide on a 390px device (horizontal overflow from off-screen GSAP start positions). Header menu button is pushed off-screen. |
| High | Single-URL architecture: no crawlable internal links (0 internal page links; 50 `<a>` are all `#anchor`, `#`, `tel:` or `mailto:`). |
| Medium | `tel:+1 (000) 000-0000` links contain spaces and parentheses and a fake number. |
| Medium | No security headers configured (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy). `X-Powered-By: Next.js` is exposed; set `poweredByHeader: false`. Vercel adds HSTS automatically. |
| Low | `Cache-Control: s-maxage=31536000` on HTML. That is fine on Vercel (it revalidates on deploy), but on other hosts confirm the CDN purges on release. |

## Content Quality — 35/100
**Works:** distinctive, specific copy (the About and Grow AI sections are good). Three real case studies with concrete detail: Arabic/English RTL, Tabby instalments, multi-modal dream capture.

| Severity | Finding |
|---|---|
| Critical | Placeholder awards, team, reviews, phone, address and stats render in production HTML (see `content/site.js` `// PLACEHOLDER` lines). Remove the sections or fill them with real, verifiable data before launch. |
| High | E-E-A-T: no named people, no credentials, no company registration or CR number, no physical location, no client logos or attributable testimonials. Social profile links are `#`. |
| High | Thin topical depth per service: each service has about 20 words plus a list. One page cannot rank for "mobile app development Saudi Arabia", "Unity game studio", "AI automation agency" and similar queries. |
| Medium | No blog or insights content, even though "Blog" is in the nav. |
| Medium | English only, but the target market is Saudi. An Arabic version (`/ar`, with hreflang) would serve the primary audience and is a large ranking opportunity. |

## On-Page SEO — 45/100
- **Title:** "Long Relation | AI-First Product Studio" (39 chars). Brand-led with no service or geo keyword. Suggestion: `Long Relation | AI-First App, Game & Software Studio in Saudi Arabia` (trim to about 60 chars).
- **Meta description:** 83 chars, below the useful 140–160 range; add a proof point and a CTA.
- **H1:** "Empowered by AI. Driven by Human Vision." A slogan with no service terms. Add a keyword-bearing sub-heading or a visually-hidden lead (for example "AI-first product studio building mobile apps, games and AI software").
- **H2s:** 14. "FEATURED" + "PROJECTS" and "THE MINDS BEHIND" + "LONG RELATION" are each split into two separate H2s, so each heading is a fragment. Render each title as one heading with styled spans.
- **Internal linking:** service list items link to `#contact`. There are no destination pages yet.

## Schema / Structured Data — 10/100
No JSON-LD, microdata or RDFa. Recommended: `Organization`, `WebSite`, and `ProfessionalService` (with `areaServed` and `knowsAbout`), plus `CreativeWork` entries for each case study. Do **not** add `Review` or `AggregateRating` until the testimonials are real. A ready-to-paste draft is in `findings/schema.md`.

## Performance — 40/100 (lab only; no CrUX data, because the site is not live)
| Metric | Desktop (no throttle) | Mobile (4× CPU, ~1.6 Mbps, 150 ms RTT) |
|---|---|---|
| FCP | 0.98 s | 3.78 s |
| LCP (observed) | 0.98 s | 3.78 s |
| CLS | 0.00 | 0.001 |
| Long-task blocking (TBT proxy) | 786 ms | 4,655 ms |
| Bytes in first ~10 s | 26.4 MB (21.9 MB video) | 3.9 MB, with videos still streaming |

- The **intro loader** (`Loader.js`) covers the page for about 2.5–3 s on every visit. The real content paints underneath (so LCP is recorded), but users and Google's rendering see a splash first, and the hero text then animates in from `yPercent: 120`. Consider skipping the loader for repeat visits (sessionStorage) and shortening it.
- **Videos:** 9 autoplay `<video>` elements (the about clip appears 3 times). Use `preload="none"`, add `src` only when near the viewport, serve smaller mobile encodes (720p, under 1 MB), and keep posters as the LCP candidate.
- **Fonts:** 3 self-hosted **TTF** files (395 KB in total) loaded on top of Geist. Convert them to subset WOFF2 (about 70% smaller), or load Montserrat and Inter through `next/font`, which self-hosts, subsets and preloads them.
- **Preloads:** the 5 expertise logo SVGs and the wordmark are `rel=preload` in `<head>` even though they are far below the fold, so they compete with hero resources.
- **JS:** 198 KB first-load JS (GSAP, ScrollTrigger, Lenis, Swiper). Main-thread work is heavy on mid-range phones (4.6 s of long tasks under 4× throttle).

## Images — 50/100
- Portfolio screenshots are PNGs up to **704 KB** (`menna-web-home.png`) with no `width`/`height`. Convert them to WebP/AVIF through `next/image` (automatic `srcset`, sizes and dimensions).
- Alt text "Home", "Product", "Welcome" is generic; use e.g. "Menna web storefront homepage in Arabic and English".
- Expertise logos have no dimensions. The empty-alt wordmark in the footer is fine (decorative).
- No OG/social image exists (needs a 1200×630 image).

## AI Search Readiness — 30/100
- Good: the text is server-rendered, so AI crawlers (GPTBot, ClaudeBot, PerplexityBot) can read it without JS.
- Missing: robots.txt (no explicit AI-crawler policy), `llms.txt`, entity data (Organization schema, `sameAs` profiles), and quotable fact passages (founded year, HQ city, team size, client names).
- Citability is low because the claims are placeholders and the page has no question-shaped content (FAQ on engagement models, pricing approach, timelines).

---

## Limitations
- The site is not deployed, so there is no CrUX/GSC/GA4 data, no backlink data, and no live SERP checks. Security headers and caching will differ on Vercel.
- The plugin's `render_page.py` refuses `localhost` (SSRF guard), so rendering and measurement used Playwright directly. Lab numbers come from one run each; treat them as directional.
- The crawl found 1 page; there are no other internal URLs.

See `ACTION-PLAN.md` for the prioritized fix list and `findings/` for per-category details.
