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
The hero shows a procedural canvas "iris" until you set `hero.media.video`.

Team photos: set `photo: '/media/team/name.jpg'` (portrait, at least 600×760).

### Brand colour
Change `--accent` and `--accent-rgb` at the top of `app/globals.css`. Everything (cursor, glows, buttons, headings) follows it.

## File map

```
app/
  layout.js            fonts, metadata, Lenis CSS
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
    HeroCanvas.js      procedural iris background
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
