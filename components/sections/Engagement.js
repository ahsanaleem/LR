'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { engagement } from '@/content/site';
import SplitHeading from '../ui/SplitHeading';
import { MARK_POLYS } from '../ui/Icons';

function Network({ center }) {
  // hub-and-spoke "people" diagram
  const nodes = [[-70, -38], [70, -38], [-92, 18], [92, 18], [-40, 62], [40, 62]];
  return (
    <svg className="net" viewBox="-130 -100 260 200" aria-hidden="true">
      {nodes.map(([x, y], i) => <line key={'l' + i} className="net_line" x1="0" y1="0" x2={x} y2={y} />)}
      {nodes.map(([x, y], i) => (
        <g key={i} className="net_node" transform={`translate(${x} ${y})`}>
          <circle r="20" className="net_ring" />
          <circle r="15" className="net_fill" />
          <circle cy="-4" r="4.5" fill="#fff" />
          <path d="M-8 9 a8 7 0 0 1 16 0z" fill="#fff" />
        </g>
      ))}
      <circle r="34" className="net_core" />
      <circle r="42" className="net_pulse" />
      {center === 'logo' ? (
        <g transform="translate(-20 -20) scale(.0899) translate(-116.97 -317.9)">{MARK_POLYS.map((p) => <polygon key={p} points={p} fill="var(--accent)" />)}</g>
      ) : (
        <text textAnchor="middle" dy="5" className="net_txt">{center}</text>
      )}
    </svg>
  );
}

export default function Engagement() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.from('.eng_intro', { y: 30, opacity: 0, duration: 1, scrollTrigger: { trigger: '.eng_intro', start: 'top 90%' } });
    gsap.from('.eng_card', { y: 120, opacity: 0, rotate: (i) => (i - 1) * 4, duration: 1.1, ease: 'power3.out', stagger: 0.15, scrollTrigger: { trigger: '.eng_cards', start: 'top 80%' } });
    gsap.from('.net_line', { strokeDashoffset: 120, duration: 1.2, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: '.eng_cards', start: 'top 70%' } });
    gsap.from('.net_node', { scale: 0, transformOrigin: 'center', duration: 0.6, stagger: 0.04, ease: 'back.out(2)', scrollTrigger: { trigger: '.eng_cards', start: 'top 70%' } });
    gsap.to('.net_pulse', { scale: 1.6, opacity: 0, transformOrigin: 'center', duration: 2, repeat: -1, ease: 'power1.out' });
  }, { scope: root });

  return (
    <section className="engagement section" ref={root}>
      <div className="container">
        <SplitHeading parts={engagement.title} className="xl tight" />
        <p className="eng_intro">{engagement.intro}</p>
        <div className="eng_cards">
          {engagement.items.map((c) => (
            <article className="eng_card" key={c.title}>
              <Network center={c.center} />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
