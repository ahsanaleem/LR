'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '@/lib/gsap';

function Words({ text }) {
  return text.split(/(\s+)/).map((w, i) =>
    w === '' || /^\s+$/.test(w) ? (
      w
    ) : (
      <span className="sh-mask" key={i}>
        <span className="sh-word">{w}</span>
      </span>
    )
  );
}

/**
 * parts = [[text, isAccent], ...]; ['\n'] forces a line break.
 * Words rise from yPercent 110 inside overflow masks when the heading reaches 85% of the viewport;
 * accent words get a cyan underline that draws in from the left.
 * `manual` skips the built-in animation so a parent timeline can drive `.sh-word` / `.accent__line`.
 */
export default function SplitHeading({ parts, as: Tag = 'h2', className = '', manual = false, start = 'top 85%', id }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (manual) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start, once: true } });
        tl.fromTo('.sh-word', { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.05 });
        tl.fromTo('.accent__line', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'expo.inOut' }, '-=0.7');
      });
      mm.add(MQ.reduce, () => {
        gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.6, scrollTrigger: { trigger: ref.current, start, once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} className={`heading ${className}`}>
      {parts.map(([text, accent], i) => {
        if (text === '\n') return <br key={i} />;
        if (accent)
          return (
            <span className="accent" key={i}>
              <Words text={text} />
              <span className="accent__line" aria-hidden="true" />
            </span>
          );
        return <Words key={i} text={text} />;
      })}
    </Tag>
  );
}
