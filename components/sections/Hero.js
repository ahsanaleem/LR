'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { brand, hero } from '@/content/site';
import { useSite } from '../global/SiteProvider';
import HeroCanvas from '../ui/HeroCanvas';
import Media from '../ui/Media';
import { LRMark, Logo } from '../ui/Icons';

export default function Hero() {
  const root = useRef(null);
  const { ready, scrollTo } = useSite();

  // Intro (after loader) + scroll-out parallax
  useGSAP(() => {
    gsap.set('.hero_line .w', { yPercent: 120 });
    gsap.set(['.hero_tag', '.hero_since', '.hero_thumb', '.hero_pupil'], { opacity: 0 });
    gsap.set('.hero_bigword', { opacity: 0, y: 80 });
  }, { scope: root });

  useGSAP(() => {
    if (!ready) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.hero_bg', { scale: 1.25 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
      .to('.hero_pupil', { opacity: 1, duration: 1 }, 0.4)
      .from('.hero_pupil', { scale: 0.4, rotate: -90, duration: 1.4 }, 0.4)
      .to('.hero_line .w', { yPercent: 0, duration: 1.2, stagger: 0.08 }, 0.5)
      .to('.hero_tag', { opacity: 1, duration: 1 }, 0.9)
      .from('.hero_tag', { x: 40, duration: 1 }, 0.9)
      .to('.hero_since', { opacity: 1, duration: 1 }, 1.1)
      .to('.hero_bigword', { opacity: 1, y: 0, duration: 1.6 }, 0.8)
      .to('.hero_thumb', { opacity: 1, duration: 0.8 }, 1.2)
      .from('.hero_thumb', { y: 40, scale: 0.9, duration: 0.8 }, 1.2);

    // scroll-away: content drifts up & fades, background slows (parallax)
    gsap.to('.hero_content', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero_bg', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero_bigword', { xPercent: -15, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
  }, { dependencies: [ready], scope: root });

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero_bg">
        {hero.media.video ? <Media media={hero.media} /> : <HeroCanvas />}
        <div className="hero_pupil"><LRMark size={96} /></div>
      </div>
      <div className="hero_shade" />
      <div className="hero_bigword" aria-hidden="true"><Logo height={300} wordOnly alt="" /></div>
      <div className="hero_content container">
        <h1 className="hero_title">
          {hero.lines.map((line, i) => (
            <span className="hero_line" key={i}>
              {line.map((seg, j) => (
                <span key={j} className={seg.accent ? 'accent' : seg.bold ? 'bold' : ''}>
                  {seg.t.trim().split(' ').map((w, k, arr) => (
                    <span className="wm" key={k}><span className="w">{w}{k < arr.length - 1 || seg.t.endsWith(' ') ? ' ' : ''}</span></span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero_tag">{hero.tagline}</p>
        <span className="hero_since">© {brand.since}</span>
      </div>
      <button className="hero_thumb" data-cursor="view" onClick={() => scrollTo('#about')} aria-label="Scroll to about">
        <Media media={hero.thumb} variant="thumb" hue={192} />
      </button>
    </section>
  );
}
