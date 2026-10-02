'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { DIAG_FROM, DIAG_TO } from '@/lib/anim';
import { useSite } from '@/components/global/SiteProvider';
import SectionIndex from '@/components/ui/SectionIndex';
import SplitHeading from '@/components/ui/SplitHeading';
import { SlashIcon } from '@/components/ui/Icons';
import { work } from '@/content/site';

/** Screenshot inside a phone or browser frame, so portrait and wide captures both read well. */
function Device({ p }) {
  const img = (
    <Image
      className="device__img"
      src={p.media.image}
      alt={`${p.name} — ${p.category} screen`}
      width={p.media.width}
      height={p.media.height}
      sizes={p.device === 'phone' ? '280px' : '(max-width: 1024px) 90vw, 620px'}
    />
  );
  if (p.device === 'phone') return <div className="device device--phone">{img}</div>;
  return (
    <div className="device device--browser">
      <div className="device__bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {img}
    </div>
  );
}

export default function Work() {
  const { openModal } = useSite();
  const ref = useRef(null);
  const current = useRef(-1);
  const isDesktop = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      // The accordion runs on every desktop; with reduced motion it switches instantly.
      mm.add('(min-width: 1025px)', () => {
        isDesktop.current = true;
        // Staggered diagonal reveal of the row.
        if (!prefersReducedMotion()) gsap.fromTo(q('.wpanel'), { clipPath: DIAG_FROM }, { clipPath: DIAG_TO, duration: 1.3, ease: 'power3.inOut', stagger: 0.1, clearProps: 'clipPath', scrollTrigger: { trigger: q('.work')[0], start: 'top 80%', once: true } });
        current.current = -1;
        activate(0, true);
        return () => {
          isDesktop.current = false;
          current.current = -1;
          // Hover tweens live outside this matchMedia context; clear what they left behind.
          const els = q('.wpanel, .wpanel__vname, .wpanel__media, .wpanel__media .media__inner, .wpanel__content > *');
          gsap.killTweensOf(els);
          gsap.set(els, { clearProps: 'flexGrow,opacity,transform' });
          q('.wpanel').forEach((p) => p.classList.remove('is-open'));
        };
      });

      mm.add('(max-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        q('.wpanel').forEach((p) => gsap.fromTo(p, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 88%', once: true } }));
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  // Hovered / focused panel grows to flex 4, the others shrink to 1.
  const activate = contextSafe((i, instant = false) => {
    if (!isDesktop.current || current.current === i) return;
    current.current = i;
    const panels = gsap.utils.toArray('.wpanel', ref.current);
    if (prefersReducedMotion()) instant = true;
    const d = instant ? 0 : 0.8;
    panels.forEach((p, j) => {
      const on = j === i;
      p.classList.toggle('is-open', on);
      gsap.to(p, { flexGrow: on ? 4 : 1, duration: d, ease: 'power3.inOut', overwrite: 'auto' });
      gsap.to(p.querySelector('.wpanel__vname'), { opacity: on ? 0 : 1, duration: d * 0.5, overwrite: 'auto' });
      const media = p.querySelector('.wpanel__media');
      const inner = p.querySelector('.wpanel__media .media__inner');
      const content = p.querySelectorAll('.wpanel__content > *');
      if (on) {
        gsap.fromTo(media, { opacity: 0 }, { opacity: 1, duration: d, overwrite: 'auto' });
        gsap.fromTo(inner, { scale: 1.1 }, { scale: 1, duration: instant ? 0 : 1.4, ease: 'power2.out', overwrite: 'auto' });
        gsap.fromTo(content, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: instant ? 0 : 0.8, ease: 'expo.out', stagger: 0.06, delay: instant ? 0 : 0.25, overwrite: 'auto' });
      } else {
        gsap.to(media, { opacity: 0, duration: d * 0.6, overwrite: 'auto' });
        gsap.to(content, { opacity: 0, y: 12, duration: d * 0.3, overwrite: 'auto' });
      }
    });
  });

  return (
    <section ref={ref} id="work" className="section section--dark work-section" aria-labelledby="work-title">
      <div className="container">
        <header className="section__head section__head--split">
          <div>
            <SectionIndex index={work.index} label={work.label} />
            <SplitHeading id="work-title" parts={work.parts} />
          </div>
          <p className="lead">{work.intro}</p>
        </header>

        {/* Projects live in content/site.js */}
        <div className="work">
          {work.projects.map((p, i) => (
            <article
              key={p.id}
              className={`wpanel wpanel--${p.device} chamfer-solid`}
              style={{ '--tint': p.tint }}
              data-cursor="view"
              onPointerEnter={() => activate(i)}
              onFocus={() => activate(i)}
            >
              <span className="wpanel__bg" aria-hidden="true" />
              <div className="wpanel__media">
                <div className="media__inner">
                  <Device p={p} />
                </div>
              </div>
              <span className="wpanel__shade" aria-hidden="true" />
              <span className="wpanel__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="wpanel__vname" aria-hidden="true">
                {p.name}
              </span>
              <div className="wpanel__content">
                <span className="wpanel__logo" aria-hidden="true">
                  {p.name.charAt(0)}
                </span>
                <p className="wpanel__meta">
                  {p.category} · {p.year}
                </p>
                <h3 className="wpanel__name">{p.name}</h3>
                <p className="wpanel__tagline">{p.tagline}</p>
                <p className="wpanel__text">{p.text}</p>
                <ul className="wpanel__tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="pill-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                  }}
                >
                  {work.cta}
                  <SlashIcon size={11} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
