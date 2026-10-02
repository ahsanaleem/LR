'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import { useSite } from '@/components/global/SiteProvider';
import SplitHeading from '@/components/ui/SplitHeading';
import MagneticButton from '@/components/ui/MagneticButton';
import { cta } from '@/content/site';

const THREADS = [
  'M-20 260 C 220 120, 420 360, 640 210 S 1020 60, 1240 190',
  'M-20 120 C 180 220, 380 40, 620 130 S 980 300, 1240 90',
  'M-20 360 C 260 300, 460 420, 700 330 S 1040 260, 1240 350',
];

export default function CTA() {
  const { openModal } = useSite();
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      gsap.set(q('.cta__pulse'), { strokeDasharray: '6 194', strokeDashoffset: 6 });
      mm.add(MQ.motion, () => {
        // Card scales up and its cut corner grows from 0 to full size.
        gsap.fromTo(q('.cta')[0], { scale: 0.92, '--cut': '0px' }, { scale: 1, '--cut': '44px', ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 95%', end: 'top 35%', scrub: true } });
        gsap.fromTo(q('.cta__text, .cta__action'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: q('.cta')[0], start: 'top 70%', once: true } });
        q('.cta__pulse').forEach((p, i) => {
          gsap.to(p, { strokeDashoffset: -100, duration: 3.2 + i * 0.6, ease: 'none', repeat: -1, delay: i * 0.8 });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="section section--dark cta-section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta chamfer-solid">
          <svg className="cta__threads" viewBox="0 0 1220 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            {THREADS.map((d, i) => (
              <g key={i}>
                <path className="cta__thread" d={d} />
                <path className="cta__pulse" d={d} pathLength="100" />
              </g>
            ))}
          </svg>
          <span className="cta__glow cta__glow--a" aria-hidden="true" />
          <span className="cta__glow cta__glow--b" aria-hidden="true" />
          <span className="hatch cta__hatch" aria-hidden="true" />
          <div className="cta__content">
            <SplitHeading id="cta-title" parts={cta.parts} className="cta__title" start="top 75%" />
            <p className="cta__text">{cta.text}</p>
            <div className="cta__action">
              <MagneticButton onClick={openModal}>{cta.button}</MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
