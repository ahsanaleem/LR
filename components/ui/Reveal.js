'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import { DIAG_FROM, DIAG_TO } from '@/lib/anim';

/** Staggered fade-up of its direct children. variant="diagonal" uses the 45° clip-path reveal instead. */
export default function Reveal({ as: Tag = 'div', variant = 'fade', stagger = 0.08, start = 'top 85%', className = '', children, ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const items = ref.current.children;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const scrollTrigger = { trigger: ref.current, start, once: true };
        if (variant === 'diagonal') {
          gsap.fromTo(items, { clipPath: DIAG_FROM }, { clipPath: DIAG_TO, duration: 1.3, ease: 'power3.inOut', stagger, clearProps: 'clipPath', scrollTrigger });
        } else {
          gsap.fromTo(items, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger, scrollTrigger });
        }
      });
      mm.add(MQ.reduce, () => {
        gsap.fromTo(items, { opacity: 0 }, { opacity: 1, duration: 0.6, scrollTrigger: { trigger: ref.current, start, once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
