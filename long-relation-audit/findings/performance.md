# Performance — 40/100 (lab, Playwright + Chromium, one run each; raw data in `../perf-lab.json`)

| Metric | Desktop 1440×900 | Mobile 390×844, 4× CPU, 1.6 Mbps, 150 ms |
|---|---|---|
| FCP | 984 ms | 3,784 ms |
| LCP | 984 ms (`VIDEO` poster `saudi-team.jpg`) | 3,784 ms (`P.hero_tag`) |
| CLS | 0.00003 | 0.001 |
| Long tasks over 50 ms (TBT proxy) | 786 ms | 4,655 ms |
| Load event | 1.9 s | 8.7 s |
| Transferred in about 10 s | **26.4 MB** | 3.9 MB, with video still streaming |

## Video (biggest issue)
Desktop downloaded every clip without any scrolling: banner-vid 5.3 MB, game-dev 3.9 MB, mobile-apps 3.8 MB, growth 3.4 MB, platforms 2.4 MB, saudi-planning 1.7 MB, saudi-team 1.6 MB (×3 requests). `Media.js` renders `autoPlay … preload="metadata"`, but `autoPlay` overrides preload and the browser buffers the whole file.

Fix in `components/ui/Media.js`: render without `autoPlay`, use `preload="none"`, and play/pause with an IntersectionObserver (`rootMargin: '200px'`), as `Hero.js` already does. Re-encode clips at about 720p / CRF 28 and keep them under about 1.5 MB each. Consider an AV1/WebM source first, with MP4 as the fallback.

## Other items
- Intro loader holds the page for about 2.5 s on every visit (`Loader.js`).
- Self-hosted TTF fonts total 327 KB plus Geist WOFF2 68 KB. Use `next/font` or subset WOFF2.
- `<head>` preloads below-fold images: 5 expertise SVGs and the wordmark PNG.
- First-load JS is 198 KB (GSAP, ScrollTrigger, Lenis, Swiper), and main-thread work is heavy on mid-range phones.

Field data (CrUX) is unavailable until the site is live and has traffic. Re-check with PageSpeed Insights after launch.
