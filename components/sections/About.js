'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { about, brand } from '@/content/site';
import { useSite } from '../global/SiteProvider';
import Media from '../ui/Media';
import { LRMark } from '../ui/Icons';

// page-relative top of an element, ignoring transforms
const docTop = (el) => { let y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; };
const docLeft = (el) => { let x = 0; while (el) { x += el.offsetLeft; el = el.offsetParent; } return x; };

export default function About() {
  const root = useRef(null);
  const { ready } = useSite();

  useGSAP(() => {
    // Eyebrow letters drift apart as you scroll
    gsap.fromTo('.about_eyebrow .accent', { x: -60 }, { x: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: true } });
    // Body copy: each word brightens from dim to white as it passes (scrubbed "reading" effect)
    gsap.fromTo('.about_body .rw', { opacity: 0.18 }, { opacity: 1, stagger: 0.02, ease: 'none', scrollTrigger: { trigger: '.about_body', start: 'top 80%', end: 'bottom 45%', scrub: true } });
    gsap.from('.about_stamp', { opacity: 0, y: 60, rotate: -6, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.about_media_wrap', start: 'center 70%' } });

    const mm = gsap.matchMedia();
    // Phones: the media card expands from an inset rounded card to full-bleed on its own
    mm.add('(max-width: 899px)', () => {
      gsap.fromTo('.about_media', { clipPath: 'inset(6% 8% 6% 8% round 28px)', scale: 0.96 }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1, ease: 'none', scrollTrigger: { trigger: '.about_media_wrap', start: 'top 85%', end: 'center 55%', scrub: true } });
      gsap.fromTo('.about_media .media', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.about_media_wrap', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }, { scope: root });

  // Desktop: the hero's preview tile becomes this section's media while scrolling.
  // 1) as soon as you scroll, the tile docks in the bottom-right corner (fixed, like a mini-player)
  // 2) when the About media scrolls into view, the tile grows and glides into its exact place
  // 3) the real media takes over; scrolling back up reverses everything
  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const thumb = document.querySelector('.hero_thumb');
      const media = root.current.querySelector('.about_media');
      const fly = root.current.querySelector('.about_fly');
      if (!thumb || !media || !fly) return;

      const dock = () => ({ top: docTop(thumb), left: docLeft(thumb), width: thumb.offsetWidth, height: thumb.offsetHeight });
      const growStart = () => docTop(media) - innerHeight;                          // media top meets screen bottom
      const growEnd = () => docTop(media) - (innerHeight - media.offsetHeight) / 2;  // media centred on screen
      const ease = gsap.parseEase('power2.inOut');
      const lerp = (a, b, t) => a + (b - a) * t;

      // place the copy between the dock and wherever the real media is on screen *right now*,
      // so it grows into the media area instead of sweeping over the text above it
      const place = (p) => {
        const d = dock(), m = media.getBoundingClientRect(), t = ease(p);
        gsap.set(fly, { top: lerp(d.top, m.top, t), left: lerp(d.left, m.left, t), width: lerp(d.width, m.width, t), height: lerp(d.height, m.height, t), borderRadius: lerp(12, 0, t) });
      };

      const show = (state) => {
        // state: 'hero' (tile in hero) | 'fly' (travelling copy) | 'about' (real media)
        gsap.set(thumb, { autoAlpha: state === 'hero' ? 1 : 0 });
        gsap.set(fly, { autoAlpha: state === 'fly' ? 1 : 0 });
        gsap.set(media, { autoAlpha: state === 'about' || state === 'hero' ? 1 : 0 });
      };

      place(0);
      const grow = ScrollTrigger.create({
        start: growStart, end: growEnd, invalidateOnRefresh: true,
        onUpdate: (self) => place(self.progress),
        onRefresh: (self) => place(self.progress),
        onLeaveBack: () => place(0),
      });
      const st = ScrollTrigger.create({
        start: 2,
        end: growEnd,
        onToggle: (self) => self.isActive && show('fly'),
        onLeave: () => show('about'),
        onLeaveBack: () => show('hero'),
      });
      show(window.scrollY > 2 ? (window.scrollY >= growEnd() ? 'about' : 'fly') : 'hero');

      return () => { grow.kill(); st.kill(); gsap.set([thumb, media], { clearProps: 'visibility,opacity' }); };
    });
    ScrollTrigger.refresh();
  }, { dependencies: [ready], scope: root });

  return (
    <section className="about section" id="about" ref={root}>
      <div className="container">
        <h2 className="about_eyebrow"><span>{about.eyebrow[0]}</span><span className="accent">{about.eyebrow[1]}</span></h2>
        <h3 className="about_title">{about.title}</h3>
        <p className="about_body">
          {about.body.split(' ').map((w, i) => <span className="rw" key={i}>{w} </span>)}
        </p>
      </div>
      <div className="about_media_wrap container">
        <div className="about_media" data-cursor="view">
          <Media media={about.media} hue={190} />
          <div className="about_stamp"><LRMark size={46} /><span>{brand.name}</span></div>
        </div>
      </div>
      {/* travelling copy of the media (desktop only) */}
      <div className="about_fly" aria-hidden="true"><Media media={about.media} hue={190} /></div>
    </section>
  );
}
