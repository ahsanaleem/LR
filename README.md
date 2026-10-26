# Long Relation — animated studio website

Next.js 15 (App Router) · GSAP 3 + ScrollTrigger · Lenis smooth scroll · Swiper 11 · Geist font.
It uses the same section layout and motion approach as the reference site, with original Long Relation copy and generated artwork, so there are no copyrighted assets.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Deploys as-is to Vercel (static page, no env vars).

## Editing content

**All copy, links, numbers and media live in `content/site.js`.** Lines marked `// PLACEHOLDER` must be replaced before launch:
phone, email, address, project names, team members, award entries, stats and client reviews.

### Adding real videos and images
Put files in `public/media/` and reference them in `content/site.js`:

```js
media: { video: '/media/about.mp4', poster: '/media/about.jpg' }
// or
media: { image: '/media/project-1.jpg' }
```

When `media` is empty, an animated placeholder (gradient blobs, grid and hexagon) is shown, so the layout always looks finished.
The hero plays `hero.media.video` (an orange iris loop, recoloured to the brand cyan in CSS) with `hero.mark` set into a soft hole cut at the pupil.

Team photos: set `photo: '/media/team/name.jpg'` (portrait, at least 600×760).

### Before launch (SEO audit follow-ups)
`content/site.js` holds everything still waiting on real data:

- `site.url` — production domain (drives canonical, sitemap, robots, Open Graph and JSON-LD). Currently `https://lr.com.sa`; confirm it.
- `brand.phone`, `brand.address`, `brand.socials[].href` — hidden while empty. Use a real phone in international format.
- `awards.show`, `team.show`, `reviews.show`, `why.showStats` — `false` until the content is genuine. Fake awards, people, reviews or stats hurt trust and rankings.
- Add Blog / Privacy Policy / Terms links back to `nav` and `footer.links` once those pages exist, and list new pages in `app/sitemap.js`.

Inner pages: `/services`, `/services/[slug]` (copy in `content/pages.js` → `servicePages`), `/work`, `/work/[slug]` (built from `featured.items` in `content/site.js`), `/privacy` and `/terms` (`content/pages.js` → `legal` — have a lawyer review these and add the company's legal name and CR number). New service or case-study entries get a page, a sitemap entry and structured data automatically.

Languages: English at `/…`, Arabic at `/ar/…` (right-to-left). All pages live in `app/[lang]/`; `middleware.js` rewrites root URLs to `/en/…` internally and redirects any public `/en/…` URL back to the root. Copy: `content/site.js` + `content/pages.js` (English), `content/ar/site.js` + `content/ar/pages.js` (Arabic — text only; structure and media come from the English files), `content/ui.js` (buttons/labels in both languages), `content/blog.js` (posts with `en` and `ar` versions). Components read copy through `useContent()`; server pages through `getContent(lang)` (`lib/i18n.js`). Every page outputs hreflang alternates, and the sitemap lists both languages. RTL styles are in the "ARABIC / RIGHT-TO-LEFT" block at the end of `globals.css`. Have a native Arabic copywriter review `content/ar/*` and the Arabic blog posts before launch.

Blog: add a post object to `content/blog.js` (newest first) — it gets `/blog/<slug>` and `/ar/blog/<slug>` pages, BlogPosting structured data, sitemap entries and a link from its related service page automatically.

SEO plumbing lives in `app/layout.js` (metadata + JSON-LD), `app/robots.js`, `app/sitemap.js`, `public/og.jpg` (share image) and `public/llms.txt`. Security headers are in `next.config.mjs`.

Videos are lazy: `Media.js` only downloads a clip when it nears the viewport. Keep each clip under ~1.5 MB (720p, `-crf 28`, no audio track).

### Brand colour
Change `--accent` and `--accent-rgb` at the top of `app/globals.css`. Everything (cursor, glows, buttons, headings) follows it.

## File map

```
app/
  layout.js            fonts (Geist + next/font Montserrat/Inter), metadata, JSON-LD, Lenis CSS
  page.js              section order
  globals.css          all styles (tokens → global layers → sections → responsive)
components/
  global/
    SiteProvider.js    Lenis + GSAP ticker sync, modal state, toasts, scrollTo()
    Loader.js          intro: hexagon draws itself, letters rise, counter goes 000→100, 10 strips lift away
    Cursor.js          dot + ring + glow; [data-cursor="view"|"drag"] turns the ring into a labelled bubble
    Header.js          logo, Get a Quote, 3×3 dot menu button with a dropdown that unclips from the corner
    QuoteModal.js      popup form (Get a Quote / Book a Consultation)
  sections/            Hero, About, Services, Expertise, Featured, Engagement, GrowAI,
                       Why, Awards, Team, CTA, Reviews, Contact, Footer
  ui/
    SplitHeading.js    big uppercase headings, word-by-word mask reveal
    Reveal.js          generic staggered fade-up
    Media.js           video / image / animated placeholder
    ContactForm.js     floating labels, validation, toast (wire to your API)
    Icons.js           inline SVG icons + hexagon logo
content/site.js        ← edit me
```

## Animation inventory

| Where | Effect | How |
|---|---|---|
| Whole page | Inertia smooth scroll | Lenis (duration 1.2) driven by `gsap.ticker`, synced with ScrollTrigger |
| Load | Hexagon stroke draws itself, letters stagger up, % counter, 10-strip curtain wipe | GSAP timeline in `Loader.js` |
| Cursor | Dot (instant), ring (0.35s lag), glow (0.9s lag); "VIEW"/"DRAG" bubble | `gsap.quickTo` |
| Menu | Panel `clip-path` unclips from the top-right corner, links stagger in; dots cross-fade | Paused timeline played/reversed |
| Hero | Background zooms in from 1.25×, headline words rise, tagline slides in; on scroll the content fades/lifts, background parallax, giant word drifts | Timeline + scrubbed tweens |
| About | Each word brightens as you read (scrub); video card expands from an inset rounded card to full width | `clip-path` scrub |
| Services | Icon pops, title/text/list stagger; media card slides in with 3D rotateY; inner parallax; mouse tilt; list arrow on hover | ScrollTrigger timelines + CSS |
| Expertise | Active row follows scroll position or hover; right panel is sticky with orbiting rings; logo glyph flips in | ScrollTrigger `onToggle` + CSS sticky |
| Featured | Cards fade up 80px; sticky stacked deck (previous card shrinks/dims); hover reveals media + "View Case Study" | Sticky + scrub, CSS hover |
| Engagement | Cards fly up with a slight rotation, network lines draw, nodes pop, pulse ring loops | Stagger + strokeDashoffset |
| Grow AI | Card unclips from rounded inset, background parallax, floating chips | Scrub + yoyo loops |
| Why | Numbers count up, dashed lines draw, glowing orb drifts | Tweened counter |
| Awards | Staggered grid entrance; mouse-follow spotlight; badge "tada" on hover | CSS vars + keyframes |
| Team | **Pinned horizontal scroll** with photo parallax and a progress bar (desktop); fade-ups on mobile | `pin` + `containerAnimation` |
| CTA | Box scales up while corners tighten; blobs float; magnetic button | Scrub + quickTo |
| Reviews | Quote slider (fade) linked to media slider (scale/grayscale for inactive slides) | Swiper Controller |
| Contact | Panels slide in; floating labels; validation + toast | Timeline + CSS |
| Footer | Giant wordmark letters rise in (scrub); back-to-top smooth scroll | Scrub |

Accessibility: honours `prefers-reduced-motion`, the custom cursor is disabled on touch devices, Escape closes the menu and modal, and buttons have labels.

## Hooking up the form
In `components/ui/ContactForm.js` replace the `TODO` line with a POST to your endpoint (for example a Next.js route handler that forwards to Zoho CRM, HubSpot or email).
