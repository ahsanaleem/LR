'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import Button from './Button';

/** Follows the cursor by `strength` within its area, snaps back with elastic.out(1, .4). Desktop only. */
export default function MagneticButton({ strength = 0.3, className = '', ...props }) {
  const wrap = useRef(null);
  const btn = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.fine, () => {
        const area = wrap.current;
        const el = btn.current;
        const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
        const move = (e) => {
          const r = area.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, .4)', overwrite: true });
        area.addEventListener('pointermove', move);
        area.addEventListener('pointerleave', leave);
        return () => {
          area.removeEventListener('pointermove', move);
          area.removeEventListener('pointerleave', leave);
        };
      });
      return () => mm.revert();
    },
    { scope: wrap }
  );

  return (
    <span ref={wrap} className={`magnetic ${className}`}>
      <Button innerRef={btn} {...props} />
    </span>
  );
}
