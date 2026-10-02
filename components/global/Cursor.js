'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '@/lib/gsap';

/** Dot + lagging ring. Desktop with a fine pointer only; disabled for touch and reduced motion. */
export default function Cursor() {
  const ref = useRef(null);
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.fine, () => {
        const root = document.documentElement;
        root.classList.add('has-cursor');
        gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

        const dotX = gsap.quickSetter(dot.current, 'x', 'px');
        const dotY = gsap.quickSetter(dot.current, 'y', 'px');
        const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.3, ease: 'power3.out' });
        const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.3, ease: 'power3.out' });
        let state = 'default';
        let visible = false;

        const setState = (next, text = '') => {
          if (next === state) return;
          state = next;
          ring.current.dataset.state = next;
          label.current.textContent = text;
          const size = next === 'media' ? 90 : next === 'link' ? 52 : 34;
          gsap.to(ring.current, { width: size, height: size, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
          gsap.to(label.current, { opacity: next === 'media' ? 1 : 0, duration: 0.25 });
          gsap.to(dot.current, { scale: next === 'media' ? 0 : 1, duration: 0.25 });
        };

        const move = (e) => {
          if (!visible) {
            visible = true;
            gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
            gsap.set(ring.current, { x: e.clientX, y: e.clientY });
          }
          dotX(e.clientX);
          dotY(e.clientY);
          ringX(e.clientX);
          ringY(e.clientY);
        };
        const over = (e) => {
          const media = e.target.closest('[data-cursor]');
          if (media) return setState('media', media.dataset.cursor.toUpperCase());
          if (e.target.closest('a, button, [role="button"], label, input, textarea, select, .chip')) return setState('link');
          setState('default');
        };
        const leaveWindow = () => {
          visible = false;
          gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
        };
        const down = () => gsap.to(ring.current, { scaleX: 1.15, scaleY: 0.85, duration: 0.15, ease: 'power2.out' });
        const up = () => gsap.to(ring.current, { scaleX: 1, scaleY: 1, duration: 0.5, ease: 'elastic.out(1, .5)' });

        window.addEventListener('pointermove', move, { passive: true });
        document.addEventListener('pointerover', over);
        document.documentElement.addEventListener('pointerleave', leaveWindow);
        window.addEventListener('pointerdown', down);
        window.addEventListener('pointerup', up);
        return () => {
          root.classList.remove('has-cursor');
          window.removeEventListener('pointermove', move);
          document.removeEventListener('pointerover', over);
          document.documentElement.removeEventListener('pointerleave', leaveWindow);
          window.removeEventListener('pointerdown', down);
          window.removeEventListener('pointerup', up);
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span ref={ring} className="cursor__ring" data-state="default">
        <span ref={label} className="cursor__label" />
      </span>
      <span ref={dot} className="cursor__dot" />
    </div>
  );
}
