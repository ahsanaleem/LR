'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ, prefersReducedMotion } from '@/lib/gsap';
import { sectionWipe, countUp } from '@/lib/anim';
import SectionIndex from '@/components/ui/SectionIndex';
import SplitHeading from '@/components/ui/SplitHeading';
import ChamferCard from '@/components/ui/ChamferCard';
import { CheckIcon } from '@/components/ui/Icons';
import { trackGlow } from './About';
import { why } from '@/content/site';

export default function Why() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const reduced = prefersReducedMotion();
      sectionWipe(ref.current, reduced);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.fromTo(q('.stat, .promises'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: q('.why__grid')[0], start: 'top 85%', once: true } });
      });

      // Count up, grow the bar to a value-based width, then fade the label up.
      q('.stat').forEach((tile, i) => {
        const s = why.stats[i];
        const t = gsap.utils.selector(tile);
        const tl = gsap.timeline({ scrollTrigger: { trigger: tile, start: 'top 85%', once: true } });
        tl.add(countUp(t('[data-count]')[0], s.value, { decimals: s.decimals, suffix: s.suffix, duration: reduced ? 0.01 : 2 }), 0.2)
          .fromTo(t('.stat__bar-fill'), { scaleX: 0 }, { scaleX: s.bar, duration: reduced ? 0.01 : 1.8, ease: 'power3.out' }, 0.3)
          .fromTo(t('.stat__label'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }, 0.9);
      });

      // Promise checks draw in.
      gsap.timeline({ scrollTrigger: { trigger: q('.promises')[0], start: 'top 92%', once: true } })
        .fromTo(q('.promises li'), { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.15 }, 0.2)
        .fromTo(q('.promises .check__tick'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15 }, 0.45);

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="why" className="section section--paper wipe why" aria-labelledby="why-title">
      <div className="container">
        <header className="section__head">
          <SectionIndex index={why.index} label={why.label} />
          <SplitHeading id="why-title" parts={why.parts} />
        </header>

        {/* PLACEHOLDER — figures live in content/site.js */}
        <div className="why__grid" onPointerMove={trackGlow}>
          {why.stats.map((s) => (
            <ChamferCard key={s.label} className="stat tile--light" data-glow>
              <p className="stat__num">
                <span data-count>
                  {s.value}
                  {s.suffix}
                </span>
              </p>
              <span className="stat__bar" aria-hidden="true">
                <span className="stat__bar-fill" />
              </span>
              <p className="stat__label">{s.label}</p>
            </ChamferCard>
          ))}
          <ChamferCard className="promises tile--light" data-glow cut={32}>
            <p className="promises__title">{why.promisesTitle}</p>
            <ul>
              {why.promises.map((p) => (
                <li key={p}>
                  <CheckIcon size={28} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </ChamferCard>
        </div>
      </div>
    </section>
  );
}
