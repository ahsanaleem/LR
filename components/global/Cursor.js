'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Three-layer cursor: instant dot, lagging ring, slow blurred glow.
// Any element with data-cursor="view" (or "drag") morphs the ring into a labelled bubble.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const glow = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.documentElement.classList.add('has_cursor');
    const set = (el, d) => ({ x: gsap.quickTo(el, 'x', { duration: d, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: d, ease: 'power3' }) });
    const d = set(dot.current, 0.05), r = set(ring.current, 0.35), g = set(glow.current, 0.9);
    gsap.set([dot.current, ring.current, glow.current], { xPercent: -50, yPercent: -50, x: innerWidth / 2, y: innerHeight / 2 });

    const move = (e) => {
      d.x(e.clientX); d.y(e.clientY);
      r.x(e.clientX); r.y(e.clientY);
      g.x(e.clientX); g.y(e.clientY);
    };
    const over = (e) => {
      const t = e.target.closest('[data-cursor], a, button, input, textarea, label');
      const ringEl = ring.current;
      ringEl.classList.remove('is_view', 'is_link');
      if (!t) return;
      const mode = t.getAttribute('data-cursor');
      if (mode) { ringEl.classList.add('is_view'); label.current.textContent = mode.toUpperCase(); }
      else ringEl.classList.add('is_link');
    };
    const down = () => gsap.to(ring.current, { scale: 0.8, duration: 0.2 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3 });
    const leave = () => gsap.to([dot.current, ring.current, glow.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([dot.current, ring.current, glow.current], { opacity: 1, duration: 0.3 });

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.addEventListener('mouseenter', enter);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.removeEventListener('mouseenter', enter);
    };
  }, []);

  return (
    <>
      <div className="cursor_glow" ref={glow} aria-hidden="true" />
      <div className="cursor_ring" ref={ring} aria-hidden="true"><span ref={label}>VIEW</span></div>
      <div className="cursor_dot" ref={dot} aria-hidden="true" />
    </>
  );
}
