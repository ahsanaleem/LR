'use client';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { expertise } from '@/content/site';
import SplitHeading from '../ui/SplitHeading';

export default function Expertise() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    gsap.from('.exp_intro', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.exp_intro', start: 'top 90%' } });
    gsap.utils.toArray('.exp_item').forEach((el, i) => {
      gsap.from(el, { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      gsap.from(el.querySelector('.exp_line'), { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 88%' } });
      // the item nearest the viewport centre becomes active
      ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setActive(i) });
    });
    // orbit rings spin continuously
    gsap.to('.exp_orbit', { rotate: 360, duration: 40, repeat: -1, ease: 'none' });
    gsap.to('.exp_orbit2', { rotate: -360, duration: 60, repeat: -1, ease: 'none' });
  }, { scope: root });

  // crossfade logo when active changes
  useGSAP(() => {
    gsap.to('.exp_glyph:not(.on)', { opacity: 0, scale: 0.6, rotateY: 90, duration: 0.35, ease: 'power2.in', overwrite: true });
    gsap.fromTo('.exp_glyph.on', { scale: 0.6, opacity: 0, rotateY: -90 }, { scale: 1, opacity: 1, rotateY: 0, duration: 0.7, delay: 0.15, ease: 'back.out(1.7)', overwrite: true });
  }, { dependencies: [active], scope: root });

  return (
    <section className="expertise section" ref={root}>
      <div className="container">
        <SplitHeading parts={[[expertise.title[0], false], [expertise.title[1], true]]} className="xl" />
        <p className="exp_intro">{expertise.intro}</p>
        <div className="exp_grid">
          <div className="exp_list">
            {expertise.items.map((it, i) => (
              <div key={it.title} className={`exp_item ${active === i ? 'is_active' : ''}`} onMouseEnter={() => setActive(i)}>
                <span className="exp_cat">{it.cat}</span>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
                <span className="exp_line" />
              </div>
            ))}
          </div>
          <div className="exp_visual">
            <div className="exp_sticky">
              <span className="exp_orbit" /><span className="exp_orbit2" />
              <span className="exp_halo" />
              {expertise.items.map((it, i) => (
                <span key={it.title} className={`exp_glyph ${active === i ? 'on' : ''}`}><img src={it.logo} alt={`${it.title} logo`} /></span>
              ))}
              <span className="exp_count">{String(active + 1).padStart(2, '0')} / {String(expertise.items.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
