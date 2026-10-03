'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Big display heading. `parts` = [[text, isAccent], ...] rendered word-by-word
// inside overflow masks; words slide up as the heading scrolls into view.
export default function SplitHeading({ parts, as: Tag = 'h2', className = '', block = false, marker = true }) {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from(ref.current.querySelectorAll('.w'), {
      yPercent: 115,
      rotate: 4,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.06,
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    });
  }, { scope: ref });

  return (
    <Tag ref={ref} className={`split_heading ${marker ? 'has_marker' : ''} ${className}`}>
      {parts.map(([text, accent], i) => (
        <span key={i} className={`part ${accent ? 'accent' : ''} ${block ? 'block' : ''}`}>
          {text.split(' ').map((w, j) => (
            <span className="wm" key={j}><span className="w">{w}</span></span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
