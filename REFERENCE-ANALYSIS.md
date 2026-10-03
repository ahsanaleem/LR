# Reference site analysis (demo.zyventra.ai)

Technical teardown used as the blueprint for this project.

## Stack detected
- Next.js (Turbopack build), React
- Lenis smooth scroll (`html.lenis`)
- GSAP + ScrollTrigger (bundled; 17 animated elements, 1 pin-spacer)
- Swiper ×3 (team: 2 slides, speed 400; reviews: 2 linked sliders, loop, speed 1200, 1 and 2 per view, no autoplay)
- Bootstrap 5 grid, Font Awesome, React-Toastify
- Font: Geist (thin 100–300 weights for display type)
- 23 autoplaying `<video>` loops, no WebGL/canvas
- CSS keyframes: `tada`, `img-rotate`, `loader-rotate`, `loader-letter-anim`, `animationFrames`

## Global layers
| Layer | Class | Behaviour |
|---|---|---|
| Loader | `.site_loader` | Full-screen video + rotating logo + letter animation |
| Page transition | `.page_transition` `.trans1…trans10` | 10 vertical strips wiping in sequence |
| Cursor | `.cursor_dot` 8px, `.custom_cursor` 40px ring, `.custom_cursor_blur` 200px glow | Follows mouse at different lags; "VIEW" bubble on cards |
| Menu | `.menu_btn` 3×3 dots (fixed top-right) | Dots fade to 0.2 on hover; white dropdown with orange glow |
| Popup | `.popup_form_wrpr` | Quote / consultation form modal |
| Sticky headings | `.theme_heading` | `position: sticky` in some sections |

## Sections (order, height at 1150×666)
1. `banner` 666 — eye video, "Empowered by AI. Driven by Human Vision.", tagline, vertical ©, faded wordmark, preview thumbnail
2. `aboutus_secc` 1040 — heading + paragraph + desk video (`abt_vid_wrpr` GSAP grow)
3. `our_servies_secc` 2092 — 4 alternating rows, `serv_vid_box` GSAP; hover: link turns orange + arrow `translate(0)`
4. `our_expertise_secc` 1300 — list on the left, logo panel with glow on the right; hover `exrpt_img_box img` translateY(0) opacity 1
5. `featured_secc` 2362 — 5 gradient cards, `featured_box` from y80 opacity 0; hover: `.screen_wrp` fades, `.case_btn` shows
6. `client_centric_secc` 1042 — 3 white→orange cards with people-network diagrams
7. `growai_secc` 880 — heading, paragraph, orange AI card + CTA
8. `why_zyventra_secc` 1036 — 100+ / 80+ / 50+ metallic counters
9. `award_secc` 1140 — 5 award cards (3+2), badge `tada`
10. `backbon_secc` 1744 — **pinned** (spacer 1332px), horizontal team cards
11. `cta_secc` 408 — light card, glow on button hover `0 0 8px 4px accent`
12. `client_reviews_secc` 669 — quote + video thumbnails, arrow buttons
13. `contact_secc` 615 — orange info card + form, submit glow `0 0 20px white`
14. `footer` 579 — 3 columns, giant faded wordmark, back to top, socials

## Design tokens observed
- Background ≈ #0a0a0a, accent `--theme` ≈ rgb(234, 86, 36)
- Card radius 20px, buttons fully rounded
- Hover transitions 0.3s ease-in-out (links 0.5s)

## Content issues on the reference site (not carried over)
"EXPTERISE", "adivce", "Let Get In touch", three different phone numbers, award years that don't match their descriptions, "BYTRIX" mentions, placeholder team member and "XYZ" awards, the same review repeated 6 times.
