'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { useSite } from './SiteProvider';
import LogoMark from '@/components/ui/LogoMark';
import { loader } from '@/content/site';

const KEY = 'lr-loader-seen';

export default function Loader() {
  const { setReady } = useSite();
  const ref = useRef(null);
  const top = useRef(null);
  const bottom = useRef(null);
  const count = useRef(null);
  const seenRef = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      // Read once per mount (refs survive React strict-mode effect replays).
      if (seenRef.current === null) {
        seenRef.current = false;
        try {
          seenRef.current = sessionStorage.getItem(KEY) === '1';
          sessionStorage.setItem(KEY, '1');
        } catch {}
      }
      const fast = seenRef.current || prefersReducedMotion();
      const counter = { v: 0 };
      const render = () => (count.current.textContent = String(Math.round(counter.v)).padStart(2, '0'));

      // Exit wipe edge runs at 45° regardless of aspect ratio.
      const slant = (window.innerHeight / window.innerWidth) * 100;
      const exitFrom = `polygon(0% 0%, 100% 0%, 100% 100%, ${-slant}% 100%)`;
      const exitTo = `polygon(${100 + slant}% 0%, 100% 0%, 100% 100%, 100% 100%)`;

      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });
      gsap.set('.loader__inner', { autoAlpha: 1 });
      gsap.set(ref.current, { clipPath: exitFrom });

      if (fast) {
        tl.set([top.current, bottom.current], { x: 0, y: 0 })
          .fromTo('.loader__letter', { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.01 })
          .fromTo('.loader__bar', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' }, 0)
          .to(counter, { v: 100, duration: 0.3, onUpdate: render }, 0)
          .call(() => setReady(true), null, 0.35)
          .to(ref.current, { clipPath: exitTo, duration: 0.45, ease: 'power3.inOut' }, 0.3);
        return;
      }

      // Pieces start 120px apart along the 45° diagonal (in mark units) and lock together.
      tl.set(top.current, { x: 150, y: -150, opacity: 0 })
        .set(bottom.current, { x: -150, y: 150, opacity: 0 })
        .to([top.current, bottom.current], { opacity: 1, duration: 0.3, ease: 'power1.out' })
        .to(top.current, { x: -8, y: 8, duration: 0.85, ease: 'power4.out' }, 0.1)
        .to(bottom.current, { x: 8, y: -8, duration: 0.85, ease: 'power4.out' }, 0.1)
        .to([top.current, bottom.current], { x: 0, y: 0, duration: 0.25, ease: 'power2.out' }, 0.85)
        .fromTo('.loader__glow', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1.25, duration: 0.3, ease: 'power2.out' }, 0.9)
        .to('.loader__glow', { opacity: 0, scale: 1.6, duration: 0.6, ease: 'power2.in' }, 1.2)
        .fromTo(
          '.loader__letter',
          { opacity: 0, filter: 'blur(8px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.035, ease: 'power2.out' },
          0.35
        )
        .fromTo('.loader__bar', { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0.15)
        .to(counter, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: render }, 0.15)
        .call(() => setReady(true), null, 2.15)
        .to(ref.current, { clipPath: exitTo, duration: 0.9, ease: 'power3.inOut' }, 1.9);
    },
    { scope: ref }
  );

  if (done) return null;

  return (
    <div ref={ref} className="loader" role="status" aria-live="polite" aria-label="Loading Long Relation">
      <div className="loader__inner">
        <div className="loader__mark">
          <span className="loader__glow" aria-hidden="true" />
          <LogoMark topRef={top} bottomRef={bottom} />
        </div>
        <p className="loader__word" aria-hidden="true">
          {loader.label.split('').map((c, i) => (
            <span key={i} className={`loader__letter${c === 'A' && i > 5 ? ' is-accent' : ''}`}>
              {c === ' ' ? ' ' : c}
            </span>
          ))}
        </p>
        <div className="loader__progress" aria-hidden="true">
          <span className="loader__bar" />
        </div>
        <p className="loader__count" aria-hidden="true">
          <span ref={count}>00</span>
        </p>
      </div>
    </div>
  );
}
