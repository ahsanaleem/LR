'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { awards } from '@/content/site';
import SplitHeading from '../ui/SplitHeading';

export default function Awards() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.from('.award_card', { y: 90, opacity: 0, scale: 0.94, duration: 1, ease: 'power3.out', stagger: { each: 0.12, grid: 'auto' }, scrollTrigger: { trigger: '.award_grid', start: 'top 80%' } });
  }, { scope: root });

  // spotlight that follows the mouse inside each card
  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className="awards section" ref={root}>
      <div className="container">
        <SplitHeading parts={[[awards.title[0], false], [awards.title[1], true]]} className="xl" block />
        <div className="award_grid">
          {awards.items.map((a, i) => (
            <article className="award_card" key={i} onMouseMove={spot}>
              <div className="badge"><span>{a.badge}</span></div>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
