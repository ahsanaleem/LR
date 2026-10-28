'use client';
import { Fragment, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Heading whose words rise out of masks — on load for page titles (`onLoad`), on scroll otherwise.
// `accentLast` paints the final word with the brand gradient.
export default function SplitTitle({ as: Tag = 'h2', text, className = '', onLoad = false, accentLast = false }) {
  const ref = useRef(null);
  useGSAP(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from(ref.current.querySelectorAll('.w'), {
      yPercent: 115,
      rotate: 3,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.06,
      ...(onLoad ? { delay: 0.15 } : { scrollTrigger: { trigger: ref.current, start: 'top 88%' } }),
    });
  }, { scope: ref });

  const words = String(text).split(' ');
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="wm"><span className={`w ${accentLast && i === words.length - 1 && words.length > 1 ? 'grad' : ''}`}>{w}</span></span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
}
