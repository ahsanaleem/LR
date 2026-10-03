'use client';
import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { hero } from '@/content/site';
import { useSite } from '../global/SiteProvider';
import Media from '../ui/Media';

export default function Hero() {
  const root = useRef(null);
  const video = useRef(null);
  const { ready, scrollTo } = useSite();

  // Background video plays only while on screen, and never for reduced-motion users
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    v.muted = true;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduced) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.1 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Intro (after loader) + scroll-out parallax
  useGSAP(() => {
    gsap.set('.hero_line .w', { yPercent: 120 });
    gsap.set(['.hero_tag', '.hero_since', '.hero_thumb', '.hero_mark'], { opacity: 0 });
    gsap.set('.hero_bigword', { opacity: 0, y: 80 });
  }, { scope: root });

  useGSAP(() => {
    if (!ready) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.hero_bg', { scale: 1.25 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
      .to('.hero_mark', { opacity: 0.95, duration: 1 }, 0.4)
      .from('.hero_mark', { scale: 0.4, rotate: -95, duration: 1.4 }, 0.4)
      .to('.hero_line .w', { yPercent: 0, duration: 1.2, stagger: 0.08 }, 0.5)
      .to('.hero_tag', { opacity: 1, duration: 1 }, 0.9)
      .from('.hero_tag', { x: 40, duration: 1 }, 0.9)
      .to('.hero_since', { opacity: 1, duration: 1 }, 1.1)
      .to('.hero_bigword', { opacity: 1, y: 0, duration: 1.6 }, 0.8)
      .to('.hero_thumb', { opacity: 1, duration: 0.8 }, 1.2)
      .from('.hero_thumb', { y: 40, scale: 0.9, duration: 0.8 }, 1.2)
      .add(() => markIdle(), 1.8);

    // Mark keeps moving after the intro: a slow float + sway, and on desktop it drifts a little
    // toward the cursor like a pupil. Travel stays small so it never leaves the hole in the video.
    let offMove;
    const markIdle = () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const inner = root.current.querySelector('.hero_mark_in');
      gsap.to(inner, { y: -12, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to(inner, { rotation: 6, duration: 4.2, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to(inner, { scale: 1.06, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.6 });
      if (!matchMedia('(pointer: fine)').matches) return;
      const toX = gsap.quickTo('.hero_mark', 'x', { duration: 1.2, ease: 'power3.out' });
      const toY = gsap.quickTo('.hero_mark', 'y', { duration: 1.2, ease: 'power3.out' });
      const move = (e) => { toX((e.clientX / innerWidth - 0.5) * 36); toY((e.clientY / innerHeight - 0.5) * 28); };
      window.addEventListener('pointermove', move);
      offMove = () => window.removeEventListener('pointermove', move);
    };

    // scroll-away: content drifts up & fades, background slows (parallax)
    gsap.to('.hero_content', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero_bg', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero_bigword', { xPercent: -15, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    return () => offMove?.();
  }, { dependencies: [ready], scope: root });

  return (
    <section className="hero" id="top" ref={root}>
      {/* video + logo mark move together so the mark stays inside the hole cut in the video */}
      <div className="hero_bg">
        <video ref={video} className="hero_vid" src={hero.media.video} poster={hero.media.poster} autoPlay loop muted playsInline preload="metadata" />
        {/* outer: intro + cursor follow; inner: idle float/sway — separate so the tweens don't fight */}
        <div className="hero_mark"><div className="hero_mark_in" style={{ backgroundImage: `url(${hero.mark})` }} /></div>
      </div>
      <div className="hero_vignette" />
      <div className="hero_shade" />
      <div className="hero_bigword" aria-hidden="true">{hero.wordmark}</div>
      <div className="hero_content">
        <p className="hero_tag">{hero.tagline}</p>
        <h1 className="hero_title">
          {hero.lines.map((line, i) => (
            <span className="hero_line" key={i}>
              {line.map((seg, j) => (
                <span key={j} className={seg.accent ? 'accent' : seg.bold ? 'bold' : ''}>
                  {/* spaces sit between the inline-block word masks — inside them they'd collapse */}
                  {seg.t.trim().split(' ').map((w, k, arr) => (
                    <Fragment key={k}>
                      <span className="wm"><span className="w">{w}</span></span>
                      {k < arr.length - 1 || seg.t.endsWith(' ') ? ' ' : ''}
                    </Fragment>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <span className="hero_since">© {hero.since}</span>
      </div>
      <button className="hero_thumb" data-cursor="view" onClick={() => scrollTo('#about')} aria-label="Scroll to about">
        <Media media={hero.thumb} variant="thumb" hue={192} />
      </button>
    </section>
  );
}
