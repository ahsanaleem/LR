'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ, prefersReducedMotion } from '@/lib/gsap';
import { sectionWipe } from '@/lib/anim';
import SectionIndex from '@/components/ui/SectionIndex';
import SplitHeading from '@/components/ui/SplitHeading';
import ChamferCard from '@/components/ui/ChamferCard';
import Marquee from '@/components/ui/Marquee';
import { trackGlow } from './About';
import { awards } from '@/content/site';

export default function Awards() {
  const ref = useRef(null);

  useGSAP(
    () => {
      sectionWipe(ref.current, prefersReducedMotion());
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Rotating conic rings; hover spins them faster.
        const rings = gsap.utils.toArray('.badge__ring', ref.current);
        const spins = rings.map((r) => gsap.to(r, { rotation: 360, duration: 8, ease: 'none', repeat: -1 }));
        const cards = gsap.utils.toArray('.award', ref.current);
        const handlers = cards.map((card) => {
          const idx = rings.indexOf(card.querySelector('.badge__ring'));
          const enter = () => gsap.to(spins[idx], { timeScale: 4, duration: 0.5 });
          const leave = () => gsap.to(spins[idx], { timeScale: 1, duration: 0.8 });
          card.addEventListener('pointerenter', enter);
          card.addEventListener('pointerleave', leave);
          return () => {
            card.removeEventListener('pointerenter', enter);
            card.removeEventListener('pointerleave', leave);
          };
        });
        gsap.fromTo('.awards__ribbon', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.awards__ribbon', start: 'top 88%', once: true } });
        return () => handlers.forEach((h) => h());
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="awards" className="section section--dark wipe awards" aria-labelledby="awards-title">
      <div className="container">
        <header className="section__head">
          <SectionIndex index={awards.index} label={awards.label} />
          <SplitHeading id="awards-title" parts={awards.parts} />
        </header>
      </div>
      <div className="awards__ribbon" onPointerMove={trackGlow}>
        <Marquee duration={50} boost label="Awards">
          {/* PLACEHOLDER — replace with real awards in content/site.js */}
          {awards.items.map((a) => (
            <ChamferCard as="article" key={a.badge} className="award" data-glow data-hover="y:-8">
              <span className="award__spot" aria-hidden="true" />
              <div className="badge" aria-hidden="true">
                <span className="badge__ring" />
                <span className="badge__inner">{a.badge}</span>
              </div>
              <h3 className="award__title">
                {a.title[0]}
                <br />
                {a.title[1]}
              </h3>
              <p className="award__text">{a.text}</p>
            </ChamferCard>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
