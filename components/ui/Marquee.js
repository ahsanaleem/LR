'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap';

/**
 * Infinite marquee. Content is rendered twice; the track loops over -50%.
 * mode="gsap": tween with optional scroll-velocity boost and smooth pause on hover.
 * mode="css":  pure CSS animation, paused on hover.
 */
export default function Marquee({ children, direction = 'left', duration = 40, boost = false, mode = 'gsap', pauseOnHover = true, className = '', label }) {
  const ref = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      if (mode !== 'gsap') return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const left = direction === 'left';
        const tween = gsap.fromTo(track.current, { xPercent: left ? 0 : -50 }, { xPercent: left ? -50 : 0, duration, ease: 'none', repeat: -1 });
        let hover = false;
        const settle = gsap
          .delayedCall(0.25, () => gsap.to(tween, { timeScale: hover ? 0 : 1, duration: 1, ease: 'power2.out', overwrite: true }))
          .pause();

        const st = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
          onUpdate: (self) => {
            if (!boost || hover) return;
            const v = Math.min(Math.abs(self.getVelocity()) / 500, 4);
            if (v < 0.2) return;
            gsap.to(tween, { timeScale: 1 + v, duration: 0.2, overwrite: true });
            settle.restart(true);
          },
        });

        const el = ref.current;
        const enter = () => {
          if (!pauseOnHover) return;
          hover = true;
          settle.pause();
          gsap.to(tween, { timeScale: 0, duration: 0.5, overwrite: true });
        };
        const leave = () => {
          if (!pauseOnHover) return;
          hover = false;
          gsap.to(tween, { timeScale: 1, duration: 0.5, overwrite: true });
        };
        el.addEventListener('pointerenter', enter);
        el.addEventListener('pointerleave', leave);
        el.addEventListener('focusin', enter);
        el.addEventListener('focusout', leave);
        return () => {
          st.kill();
          el.removeEventListener('pointerenter', enter);
          el.removeEventListener('pointerleave', leave);
          el.removeEventListener('focusin', enter);
          el.removeEventListener('focusout', leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`marquee marquee--${mode} marquee--${direction} ${pauseOnHover ? 'marquee--pausable' : ''} ${className}`}
      style={{ '--marquee-dur': `${duration}s` }}
      role={label ? 'region' : undefined}
      aria-label={label}
    >
      <div ref={track} className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
