'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, Flip, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { fadeUp } from '@/lib/anim';
import SectionIndex from '@/components/ui/SectionIndex';
import SplitHeading from '@/components/ui/SplitHeading';
import ChamferCard from '@/components/ui/ChamferCard';
import Marquee from '@/components/ui/Marquee';
import StackIcon from '@/components/ui/StackIcon';
import { expertise } from '@/content/site';

export default function Expertise() {
  const ref = useRef(null);
  const pill = useRef(null);
  const [current, setCurrent] = useState('all');

  const placePill = (tab) => {
    pill.current.style.left = `${tab.offsetLeft}px`;
    pill.current.style.width = `${tab.offsetWidth}px`;
  };

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      placePill(q('.tabs__tab')[0]);
      fadeUp(q('.expertise__intro, .tabs'), q('.expertise__intro')[0]);
      fadeUp(q('.xcard'), q('.xgrid')[0], { stagger: 0.07, y: 0 });
      // Re-place the pill after fonts change tab widths.
      document.fonts?.ready.then(() => {
        const tab = ref.current?.querySelector('.tabs__tab.is-active');
        if (tab) placePill(tab);
      });
    },
    { scope: ref }
  );

  const filter = contextSafe((id, tab) => {
    if (id === current) return;
    setCurrent(id);
    const q = gsap.utils.selector(ref);
    const reduced = prefersReducedMotion();
    const duration = reduced ? 0 : 0.7;

    // Tab pill slides with Flip.
    const pillState = Flip.getState(pill.current);
    placePill(tab);
    Flip.from(pillState, { duration: reduced ? 0 : 0.5, ease: 'power3.inOut' });

    // Cards re-arrange with Flip: leavers scale to 0.9 and fade, the rest move to their new slots.
    const cards = q('.xcard');
    const state = Flip.getState(cards, { props: 'opacity' });
    cards.forEach((c) => (c.style.display = id === 'all' || c.dataset.cat === id ? '' : 'none'));
    Flip.from(state, {
      duration,
      ease: 'power3.inOut',
      absolute: true,
      scale: true,
      nested: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: duration * 0.9, delay: duration * 0.2 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: duration * 0.6 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  });

  return (
    <section ref={ref} id="expertise" className="section section--surface expertise" aria-labelledby="expertise-title">
      <div className="container">
        <header className="section__head section__head--split">
          <div>
            <SectionIndex index={expertise.index} label={expertise.label} />
            <SplitHeading id="expertise-title" parts={expertise.parts} />
          </div>
          <p className="expertise__intro lead">{expertise.intro}</p>
        </header>

        <div className="tabs glass" role="tablist" aria-label="Filter technologies">
          {expertise.filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={current === f.id}
              aria-controls="xgrid"
              className={`tabs__tab${current === f.id ? ' is-active' : ''}`}
              onClick={(e) => filter(f.id, e.currentTarget)}
            >
              {f.label}
            </button>
          ))}
          <span ref={pill} className="tabs__pill" aria-hidden="true" />
        </div>

        <div id="xgrid" className="xgrid" role="tabpanel">
          {expertise.cards.map((c) => (
            <ChamferCard as="article" key={c.id} className={`xcard xcard--${c.size}`} data-cat={c.cat} data-hover="scale:1.08" data-hover-target=".xcard__glyph">
              <span className="xcard__beam" aria-hidden="true" />
              <StackIcon name={c.icon} gif={c.gif} alt={`${c.title} logo`} className="xcard__glyph" />
              <div className="xcard__body">
                <p className="xcard__cat">{c.catLabel}</p>
                <h3 className="xcard__title">{c.title}</h3>
                <p className="xcard__text">{c.text}</p>
              </div>
            </ChamferCard>
          ))}
        </div>
      </div>

      <div className="expertise__marquees" role="group" aria-label="More tools we use">
        {expertise.marquee.map((row, i) => (
          <Marquee key={i} direction={i % 2 ? 'right' : 'left'} duration={34 + i * 6} boost>
            {row.map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
