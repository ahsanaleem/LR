'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ, prefersReducedMotion } from '@/lib/gsap';
import { sectionWipe, DIAG_FROM, DIAG_TO } from '@/lib/anim';
import { useSite } from '@/components/global/SiteProvider';
import SectionIndex from '@/components/ui/SectionIndex';
import SplitHeading from '@/components/ui/SplitHeading';
import ChamferCard from '@/components/ui/ChamferCard';
import Media from '@/components/ui/Media';
import { ServiceIcon, CheckIcon, SlashMark } from '@/components/ui/Icons';
import { services } from '@/content/site';

export default function Services() {
  const { scrollTo } = useSite();
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      sectionWipe(ref.current, prefersReducedMotion());

      // Left list follows whichever panel crosses the centre.
      q('.svc-panel').forEach((panel, i) =>
        ScrollTrigger.create({
          trigger: panel,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => self.isActive && setActive(i),
        })
      );

      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        gsap.fromTo(q('.svc__progress-fill'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: q('.svc__panels')[0], start: 'top center', end: 'bottom center', scrub: true } });
        gsap.fromTo(q('.svc__item'), { x: -30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: q('.svc__nav')[0], start: 'top 80%', once: true } });

        q('.svc-panel').forEach((panel) => {
          const p = gsap.utils.selector(panel);
          const tl = gsap.timeline({ scrollTrigger: { trigger: panel, start: 'top 78%', once: true } });
          tl.fromTo(p('.svc-panel__reveal'), { clipPath: DIAG_FROM }, { clipPath: DIAG_TO, duration: 1.3, ease: 'power3.inOut', clearProps: 'clipPath' })
            .fromTo(p('.svc-panel__icon *'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: 0.12 }, 0.4)
            .fromTo(p('.svc-panel__title, .svc-panel__text, .checklist li'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0.55);

          gsap.fromTo(p('.media__inner'), { yPercent: -8, scale: 1.18 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: p('.svc-panel__media')[0], start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });

      // Mouse tilt on the media cards (desktop, fine pointer).
      mm.add(`${MQ.desktop} and (pointer: fine)`, () => {
        const cleanups = q('.svc-panel__media').map((card) => {
          gsap.set(card, { transformPerspective: 900 });
          const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power2.out' });
          const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power2.out' });
          // ±6° tilt toward the pointer.
          const move = (e) => {
            const r = card.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 12);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
          };
          const leave = () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'power2.out' });
          card.addEventListener('pointermove', move);
          card.addEventListener('pointerleave', leave);
          return () => {
            card.removeEventListener('pointermove', move);
            card.removeEventListener('pointerleave', leave);
          };
        });
        return () => cleanups.forEach((c) => c());
      });

      // Tablet / mobile: simple fade-ups.
      mm.add('(max-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        q('.svc-panel').forEach((panel) => {
          gsap.fromTo(gsap.utils.selector(panel)('.svc-panel__card > *'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: panel, start: 'top 85%', once: true } });
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="services" className="section section--dark wipe services" aria-labelledby="services-title">
      <div className="container">
        <header className="section__head">
          <SectionIndex index={services.index} label={services.label} />
          <SplitHeading id="services-title" parts={services.parts} />
        </header>

        <div className="svc">
          <aside className="svc__nav" aria-label="Services">
            <span className="svc__progress" aria-hidden="true">
              <span className="svc__progress-fill" />
            </span>
            <ol>
              {services.items.map((s, i) => (
                <li key={s.id}>
                  <button type="button" className={`svc__item${active === i ? ' is-active' : ''}`} aria-current={active === i ? 'true' : undefined} onClick={() => scrollTo(`#svc-${s.id}`, { offset: -120 })}>
                    <span className="svc__num">{String(i + 1).padStart(2, '0')}</span>
                    <SlashMark className="svc__slash" />
                    <span className="svc__name">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <div className="svc__panels">
            {services.items.map((s, i) => (
              <article key={s.id} id={`svc-${s.id}`} className="svc-panel">
                <div className="svc-panel__reveal">
                  <ChamferCard className="svc-panel__card" cut={36}>
                    <ServiceIcon name={s.icon} className="svc-panel__icon" />
                    <h3 className="svc-panel__title">
                      <span className="svc-panel__num">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </h3>
                    <p className="svc-panel__text">{s.text}</p>
                    <ul className="checklist">
                      {s.list.map((item) => (
                        <li key={item} data-hover="x:6">
                          <CheckIcon />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="svc-panel__media" data-cursor="view">
                      <Media media={s.media} ratio="4 / 3" label={s.title} alt={s.title} />
                    </div>
                  </ChamferCard>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
