# Long Relation — studio website

Single-page marketing site for **Long Relation**, an AI-first software product studio.
Next.js 15 (App Router) · React 19 · plain JavaScript · GSAP 3 (ScrollTrigger, Flip, `@gsap/react`) · Lenis · Swiper 11.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Deploys to Vercel as-is: import the repo, keep the defaults, no environment variables needed.

## Project structure

```
app/
  layout.js            fonts (Unbounded + Manrope via next/font), metadata, .no-js → .js swap
  page.js              section order
  globals.css          tokens → base → utilities → global layers → sections → responsive
  icon.svg             favicon (the LR mark)
components/
  global/              SiteProvider (Lenis, context, hover FX), Loader, Cursor, Header, Menu,
                       QuoteModal, Toasts, ScrollProgress
  sections/            Hero (+ ConnectionField canvas), About, Services, Expertise, Work,
                       Engagement, AI, Why, Awards, Team, CTA, Reviews, Contact, Footer
  ui/                  SplitHeading, SectionIndex, Reveal, ChamferCard, Media, Marquee,
                       Button, MagneticButton, LogoMark, ContactForm, Icons
content/site.js        ALL copy, links, numbers and media paths
lib/                   gsap.js (plugin registration), anim.js (shared reveals), placeholder.js
                       (media placeholder renderer), focusTrap.js
public/brand/          logo-dark/-light .svg + .png
public/media/          put your images and videos here
```

## Rebranding

Everything editable lives in **`content/site.js`**: copy, headings, stats, projects, team, awards,
reviews, contact details, social links and media paths. Every placeholder value is marked
`// PLACEHOLDER` — search for it before launch.

**Headings** use `parts`: `[['We build the '], ['relationship', true], [' behind the product']]`.
`true` marks the cyan accent word (with the drawn underline); `['\n']` forces a line break.

### Swapping media

Every media slot takes one of these:

```js
media: { image: '/media/about.jpg' }
media: { video: '/media/reel.mp4', poster: '/media/reel.jpg' }
media: {}   // animated brand placeholder (navy gradient, drifting nodes, hatch, light sweep)
```

Put the files in `public/media/`. Slots: `about.media`, each `services.items[].media`,
each `team.members[].media` (portrait; initials are shown when empty)
and each `reviews.videos[].media` (`video` plays inline when the play button is pressed).

### Portfolio (Work section)

The three case studies (Manani, Menna, Menna Web) come from lr.com.sa; their screenshots are in
`public/media/work/`. Each project in `work.projects` sets `device: 'phone'` (portrait screenshot) or
`'browser'` (wide screenshot), plus `media: { image, width, height }` with the image's real pixel size.
Add or remove projects freely — the accordion adapts to any count.

### Colours

Edit the tokens at the top of `app/globals.css` (`--brand`, `--brand-rgb`, `--ink`, `--bg`, `--paper`, …).
If you change `--brand`, also update `--brand-rgb` (used for glows) and the hard-coded RGB values in
`components/sections/ConnectionField.js` and `lib/placeholder.js` (canvas drawing can't read CSS variables).

### Logos

- `public/brand/logo-light.png` (white wordmark, dark backgrounds) is used in the footer and the menu.
- `public/brand/logo-dark.png` (navy wordmark) is there for light backgrounds.
- The SVG lockups reference the font "nebulax" as live text, which is not embedded, so the site uses
  the PNGs for the full lockup and draws the mark as inline SVG (`components/ui/LogoMark.js`, shapes
  in `components/ui/Icons.js`). Update `brand.logoWidth/logoHeight` in `site.js` if you replace the PNGs.

### Contact form

`components/ui/ContactForm.js` validates on the client and simulates a request. Replace the block marked
`// TODO: POST to real API` with your endpoint (for example a Next.js route handler, Formspree or a CRM webhook).

## Animation inventory

| Section | Effect | Trigger | Library |
|---|---|---|---|
| Global | Smooth inertia scroll (duration 1.1, expo-style easing), stopped during loader/menu/modal | always | Lenis + gsap.ticker |
| Global | Scroll progress line (`scaleX`) | scroll, scrubbed | ScrollTrigger |
| Global | Custom cursor: dot + lagging ring, grows on links, VIEW/DRAG disc, squash on press | pointer (fine pointers only) | GSAP quickTo / matchMedia |
| Global | Hover transforms (`data-hover`): slide, lift, icon rotate | pointer hover | GSAP (SiteProvider HoverFx) |
| Global | Button diagonal fill sweep | hover | CSS clip-path |
| Global | Section top-edge diagonal wipe (About, Services, Why, Awards, Contact, Footer) | scroll, scrubbed | ScrollTrigger |
| Loader | Mark pieces slide together along 45° and lock, glow pulse, letters un-blur, 00→100 counter, 45° exit wipe; shortened on repeat visits | page load | GSAP timeline |
| Header | Drop in, hide on scroll down / show on scroll up, compact after 80px, active-link indicator | loader end / Lenis scroll | GSAP, Flip |
| Header | Burger lines rotate to ±45° X | menu toggle | GSAP |
| Menu | Diagonal wipe from top-right, staggered links, node + 16px slide on hover | open/close | GSAP |
| Modal | Backdrop fade, card rises (expo.out), focus trap | open/close | GSAP |
| Toasts | Slide up, 4s shrinking progress line | toast() | GSAP |
| Hero | Canvas nodes gather into the LR mark, hold, loosen into a breathing mark; pointer pushes/links nodes | after loader | Canvas 2D + rAF |
| Hero | Canvas fade/scale, words rise from masks, underline draws, sub/buttons fade, chips pop + count up | after loader | GSAP timeline |
| Hero | Content lifts/fades; mark rotates 8° and drifts down | scroll, scrubbed | ScrollTrigger |
| All headings | Words rise from yPercent 110 (stagger .05), accent underline draws | heading at 85% of viewport | ScrollTrigger |
| About | Line-by-line cyan highlight bar + text 30%→100% | scroll, scrubbed | ScrollTrigger |
| About | Bento tiles rise, media scales 1.15→1, mark assembles, count-up, mouse-following border glow | scroll / hover | ScrollTrigger, CSS vars |
| Services | Sticky list with progress line and active item; panels open from the cut corner, icon strokes draw, checklist staggers, media parallax, ±6° tilt | scroll / pointer | ScrollTrigger, GSAP quickTo |
| Expertise | Filter re-layout (leavers scale to .9 and fade), sliding tab pill, border beam on hover, glyph rotate | click / hover | Flip, CSS @property |
| Expertise | Two opposing marquees, scroll-velocity boost, pause on hover | always / scroll | GSAP + ScrollTrigger |
| Work | Accordion flex 1↔4, media fade + scale 1.1→1, content stagger, diagonal entrance (stacked cards on tablet/mobile) | hover / focus / scroll | GSAP, ScrollTrigger |
| Engagement | Cards rise, relation threads draw, nodes pop (back.out(2)), looping pulses that speed up on hover | scroll / hover | ScrollTrigger, GSAP |
| Engagement | Compare table height animation | click | Flip |
| AI | Scrubbed diagonal clip reveal, mouse-following glow, floating chips, looping agent workflow demo (paused off-screen) | scroll / pointer | ScrollTrigger, GSAP |
| Why | Count-ups, value-based bars, labels; promise checks draw in | scroll | ScrollTrigger |
| Awards | Award ribbon marquee (velocity boost), spinning conic badge rings (faster on hover), spotlight | always / hover | GSAP, CSS |
| Team | Cards rise, portrait parallax, portrait 1.06→1 on hover, diagonal bio panel, LinkedIn tile | scroll / hover | ScrollTrigger, CSS clip-path |
| CTA | Card scales .92→1 and its cut corner grows; travelling light pulses; magnetic button (elastic.out(1, .4)) | scroll / pointer | ScrollTrigger, GSAP |
| Reviews | Two opposing quote marquees (pause on hover); creative video slider | always / drag | CSS animation, Swiper |
| Contact | Diagonal reveal of the navy card, staggered form; mark drifts apart/together (10s loop); phone tile rings | scroll / hover | ScrollTrigger, GSAP |
| Footer | Giant wordmark words slide in from opposite sides; mark pieces lock together | scroll, scrubbed | ScrollTrigger |

## Reliability and accessibility notes

- All GSAP code runs in `useGSAP` scoped to the section ref; desktop-only effects use `gsap.matchMedia()`.
- Hidden starting states are set by GSAP, not CSS. Without JavaScript (`.no-js`) every section stays visible.
- CSS transitions only touch `clip-path`, `color`, `background` and `box-shadow`; GSAP owns transforms.
- Canvas loops stop when off-screen or when the tab is hidden, and devicePixelRatio is capped at 2.
- `prefers-reduced-motion`: no smooth wheel, the hero draws one static frame of the mark, marquees stop,
  scrubbed effects become simple fades, and CSS animations are cut.
- Escape closes the menu and modal; focus is trapped in both and returned on close. Visible `:focus-visible` rings.
