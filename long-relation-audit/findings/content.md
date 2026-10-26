# Content, On-Page, Images & AI Readiness

## Content Quality — 35/100
- About 1,125 words in the server-rendered HTML; the copy is original and specific.
- **Placeholder content that ships in the HTML today** (`content/site.js`):
  - `brand.phone` `+1 (000) 000-0000`, `brand.address` "Your street address…"
  - `awards.items`: 5 × "Award Title Goes Here"
  - `team.members`: "Founder Name", "X years…", "Previously at Company"
  - `reviews.items`: 4 × "Replace this with a real client quote…" / "Client Name"
  - `why.stats`: 100+ / 80+ / 50+, marked as placeholder numbers
  - Socials, team LinkedIn, Blog, Terms, Privacy → `#`
- E-E-A-T gaps: no named leadership, no location, no verifiable clients, no third-party proof (Clutch, GoodFirms, App Store links for Manani/Menna).
- Suggestion: link the case studies to the live App Store / Google Play listings and the Menna website. That is the cheapest strong trust signal available.

## On-Page — 45/100
| Element | Current | Recommendation |
|---|---|---|
| Title | Long Relation \| AI-First Product Studio (39) | Add service and geo terms, about 55–60 chars |
| Description | 83 chars | 140–160 chars with a proof point and CTA |
| H1 | Empowered by AI. Driven by Human Vision. | Keep the slogan visually; add service terms (sub-heading or sr-only text) |
| H2 | 14, two titles split into fragments ("FEATURED" / "PROJECTS", "THE MINDS BEHIND" / "LONG RELATION") | One heading per title |
| Canonical / OG / Twitter | none | add (see technical.md) |

## Images — 50/100
| Image | Size | Issue |
|---|---|---|
| menna-web-home.png | 704 KB | PNG; use WebP/AVIF through next/image |
| menna-web-women.png | 572 KB | same |
| menna-discover.png | 352 KB | same |
| portfolio `<img>` ×9 | — | no width/height; generic alt ("Home", "Product") |
| tech logos ×5 | ~1 KB | no width/height; preloaded unnecessarily |
| OG image | missing | create 1200×630 |

## AI Search Readiness — 30/100
- Crawlable: yes (SSR text, no JS dependence for content).
- No robots.txt, so there is no explicit policy for GPTBot, ClaudeBot, PerplexityBot or Google-Extended. Decide on a policy and state it.
- No `llms.txt`; no Organization entity or `sameAs`.
- Few self-contained, quotable facts. Add a short "Long Relation at a glance" passage: founded year, HQ city, team size, platforms, notable clients. Add an FAQ on engagement models, timelines and pricing approach.
