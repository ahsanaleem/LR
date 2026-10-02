'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ, prefersReducedMotion } from '@/lib/gsap';
import { useSite } from '@/components/global/SiteProvider';
import SplitHeading from '@/components/ui/SplitHeading';
import Button from '@/components/ui/Button';
import ConnectionField from './ConnectionField';
import { hero } from '@/content/site';

export default function Hero() {
  const { ready, openModal } = useSite();
  const ref = useRef(null);
  const control = useRef({ rotation: 0, drift: 0 });

  // Intro — only after the loader has finished.
  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const counters = q('[data-count]');
      if (!ready) {
        gsap.set(q('.hero__canvas'), { opacity: 0, scale: 1.1 });
        gsap.set(q('.sh-word'), { yPercent: 110 });
        gsap.set(q('.accent__line'), { scaleX: 0 });
        gsap.set(q('.hero__sub, .hero__actions > *, .hero__side'), { opacity: 0, y: 24 });
        gsap.set(q('.hero__chip'), { opacity: 0, scale: 0.8, y: 16 });
        return;
      }
      const reduced = prefersReducedMotion();
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(q('.hero__canvas'), { opacity: 1, scale: 1, duration: reduced ? 0.4 : 2.2, ease: 'power2.out' }, 0)
        .to(q('.sh-word'), { yPercent: 0, duration: reduced ? 0.01 : 1.3, stagger: 0.1 }, 0.15)
        .to(q('.accent__line'), { scaleX: 1, duration: 1.1, ease: 'expo.inOut' }, 0.8)
        .to(q('.hero__sub, .hero__actions > *'), { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.6)
        .to(q('.hero__side'), { opacity: 1, y: 0, duration: 1 }, 0.9)
        .to(q('.hero__chip'), { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.8)', stagger: 0.12 }, 1);
      counters.forEach((el, i) => {
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        el.textContent = `0${suffix}`;
        tl.to(obj, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = `${Math.round(obj.v)}${suffix}`) }, 1.05 + i * 0.12);
      });
    },
    { scope: ref, dependencies: [ready] }
  );

  // Scroll: content lifts and fades, the canvas mark rotates 8° and drifts down.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const scrollTrigger = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to('.hero__inner', { y: -140, opacity: 0, ease: 'none', scrollTrigger });
        gsap.to(control.current, { rotation: 8, drift: 140, ease: 'none', scrollTrigger });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="top" className="hero section--dark" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__canvas">
          <ConnectionField start={ready} control={control} />
        </div>
        <div className="hero__vignette" />
        <div className="hero__hatch hatch" />
        <div className="hero__fade" />
      </div>

      <div className="hero__inner container">
        <div className="hero__content">
          <SplitHeading as="h1" id="hero-title" parts={hero.parts} manual className="hero__title" />
          <p className="hero__sub">{hero.sub}</p>
          <div className="hero__actions">
            <Button onClick={openModal}>{hero.primary}</Button>
            <Button href="#work" variant="secondary">
              {hero.secondary}
            </Button>
          </div>
        </div>
        {/* PLACEHOLDER — figures live in content/site.js */}
        <ul className="hero__chips" aria-label="Studio at a glance">
          {hero.chips.map((c) => (
            <li key={c.label} className="hero__chip glass">
              <strong data-count={c.value} data-suffix={c.suffix}>
                {c.value}
                {c.suffix}
              </strong>
              <span>{c.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__side" aria-hidden="true">
        <span className="hero__side-text">{hero.side}</span>
        <span className="hero__side-line" />
      </div>
    </section>
  );
}
