'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { why } from '@/content/site';
import SplitHeading from '../ui/SplitHeading';

export default function Why() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.utils.toArray('.stat').forEach((el) => {
      const num = el.querySelector('.stat_num b');
      const target = +num.dataset.v;
      const o = { v: 0 };
      gsap.to(o, { v: target, duration: 2.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' }, onUpdate: () => (num.textContent = Math.round(o.v)) });
      gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      gsap.from(el.querySelector('.stat_line'), { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
    // glowing orb follows the scroll diagonally
    gsap.fromTo('.why_orb', { x: '-20vw', y: 200 }, { x: '10vw', y: -100, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
  }, { scope: root });

  return (
    <section className="why section" ref={root}>
      <span className="why_orb" aria-hidden="true" />
      <div className="container why_grid">
        <SplitHeading parts={why.title} className="lg" block />
        <div className="stats">
          {why.stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat_num"><b data-v={s.value}>0</b>{s.suffix}</div>
              <span className="stat_line" />
              <span className="stat_label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
