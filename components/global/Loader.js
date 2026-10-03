'use client';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSite } from './SiteProvider';
import { LRMark, Logo } from '../ui/Icons';

// Full-screen intro: the LR mark's two strokes slide in, the wordmark wipes up, a % counter
// runs to 100, then 10 vertical strips lift away (staggered) to reveal the page.
export default function Loader() {
  const root = useRef(null);
  const { setReady } = useSite();
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const counter = { v: 0 };
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.ld_mark polygon', { opacity: 0, x: (i) => (i ? -60 : 60), y: (i) => (i ? 60 : -60), duration: 1.1, ease: 'power3.out', stagger: 0.15 })
        .from('.ld_word img', { yPercent: 110, duration: 0.9 }, 0.45)
        .to(counter, {
          v: 100,
          duration: 1.8,
          ease: 'power1.inOut',
          onUpdate: () => {
            const el = root.current?.querySelector('.ld_count');
            if (el) el.textContent = String(Math.round(counter.v)).padStart(3, '0');
          },
        }, 0)
        .to('.ld_bar i', { scaleX: 1, duration: 1.8, ease: 'power1.inOut' }, 0)
        .to('.ld_inner', { opacity: 0, y: -30, duration: 0.5, ease: 'power2.in' }, '+=0.15')
        .to('.ld_strip', { yPercent: -100, duration: 0.8, ease: 'power4.inOut', stagger: { each: 0.05, from: 'start' } }, '-=0.1')
        .add(() => setReady(true), '-=0.55')
        .add(() => setDone(true));
    },
    { scope: root }
  );

  if (done) return null;
  return (
    <div className="site_loader" ref={root} aria-hidden="true">
      <div className="ld_strips">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="ld_strip" />
        ))}
      </div>
      <div className="ld_inner">
        <LRMark className="ld_mark" size={96} />
        <div className="ld_word"><Logo height={64} wordOnly alt="" /></div>
        <div className="ld_meta">
          <div className="ld_bar"><i /></div>
          <span className="ld_count">000</span>
        </div>
      </div>
    </div>
  );
}
