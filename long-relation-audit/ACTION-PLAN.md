# Long Relation — SEO Action Plan

Score today: **37/100**. Doing Critical + High should bring it to roughly 70 before launch.

## Critical (before launch)
| # | Action | Where | Effort |
|---|---|---|---|
| 1 | Replace or remove **all placeholder content**: phone, address, awards, team, reviews, stats. Hide the Awards/Team/Reviews sections until the data is real. | `content/site.js`, `app/page.js` | 1–2 days (content) |
| 2 | Add `app/robots.js` (allow all, point to the sitemap) and `app/sitemap.js`. | new files | 15 min |
| 3 | Set `metadataBase`, `alternates.canonical`, `openGraph`, `twitter` and an OG image (1200×630). | `app/layout.js`, `app/opengraph-image.(png\|js)` | 1 h |

## High (week 1)
| # | Action | Where | Effort |
|---|---|---|---|
| 4 | Fix mobile horizontal overflow: add `html { overflow-x: clip; }` (or clip `.serv_row`), then re-test that the menu button is visible at 390px. | `app/globals.css` | 15 min |
| 5 | Lazy-load videos: `preload="none"` plus IntersectionObserver play/pause in `Media.js` (copy the pattern from `Hero.js`). Add smaller mobile encodes. | `components/ui/Media.js` | 2–3 h |
| 6 | Add Organization / WebSite / ProfessionalService JSON-LD (draft in `findings/schema.md`). | `app/layout.js` | 1 h |
| 7 | Create real pages for Privacy Policy and Terms, and point social links at real profiles (or remove them). Remove "Blog" until it exists. | `app/privacy`, `app/terms`, `content/site.js` | 0.5 day |
| 8 | Rewrite the title and meta description with service and geo terms; merge the split H2s. | `app/layout.js`, `SplitHeading` usage | 1 h |

## Medium (month 1)
| # | Action | Effort |
|---|---|---|
| 9 | Build `/services/[slug]` pages (Mobile Apps, Game Development, AI Engineering, Growth) with 800+ words each, FAQs, and related case studies. | 1–2 weeks |
| 10 | Build `/work/[slug]` case-study pages (Manani, Menna, Menna Web) with problem → approach → result and metrics. | 1 week |
| 11 | Move portfolio images to `next/image` (WebP/AVIF, width/height); write descriptive alt text. | 2 h |
| 12 | Replace TTF fonts with `next/font/google` (Montserrat 400/700, Inter 300) or subset WOFF2; drop Geist if it is unused. | 1 h |
| 13 | Remove the below-fold `rel=preload` images (expertise logos, wordmark): add `loading="lazy"` / `fetchPriority="low"`. | 30 min |
| 14 | Shorten the intro loader and skip it on repeat visits (sessionStorage flag). | 1 h |
| 15 | Add `poweredByHeader: false` and security headers in `next.config.mjs`. | 30 min |
| 16 | Plan an Arabic version (`/ar`, RTL, hreflang `en`/`ar`/`x-default`). | multi-week |

## Low (backlog)
- Add `llms.txt` with a company summary, services and case-study links.
- Start a blog (2 posts/month) on AI product development and app development in KSA.
- After launch: verify in Google Search Console and Bing Webmaster Tools, submit the sitemap, and set up IndexNow.
- Re-run this audit against the live URL to get CrUX field data and real headers.
