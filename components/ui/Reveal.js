'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Fades + lifts its direct children in sequence when scrolled into view.
export default function Reveal({ children, as: Tag = 'div', className = '', y = 40, stagger = 0.1, start = 'top 85%', ...rest }) {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from(ref.current.children, { y, opacity: 0, duration: 1, ease: 'power3.out', stagger, scrollTrigger: { trigger: ref.current, start } });
  }, { scope: ref });
  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>;
}
