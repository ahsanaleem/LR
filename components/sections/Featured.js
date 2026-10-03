'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { featured } from '@/content/site';
import SplitHeading from '../ui/SplitHeading';
import { Arrow } from '../ui/Icons';

// Phone / browser chrome around a real product screenshot.
function Screen({ kind, src, label }) {
  if (kind === 'web')
    return (
      <figure className="dev_web">
        <div className="dev_bar"><i /><i /><i /><span>{label}</span></div>
        <img src={src} alt={label} loading="lazy" />
      </figure>
    );
  return (
    <figure className="dev_phone">
      <span className="dev_notch" />
      <img src={src} alt={label} loading="lazy" />
    </figure>
  );
}

function CaseStudy({ project, onClose }) {
  const root = useRef(null);
  useEffect(() => {
    if (!project) return;
    window.lenis?.stop();
    const el = root.current;
    gsap.fromTo(el.querySelector('.modal_bg'), { opacity: 0 }, { opacity: 1, duration: 0.4 });
    gsap.fromTo(el.querySelector('.case_card'), { y: 60, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); window.lenis?.start(); };
  }, [project, onClose]);

  if (!project) return null;
  return (
    <div className="modal case_modal" ref={root} role="dialog" aria-modal="true" aria-label={`${project.name} case study`}>
      <div className="modal_bg" onClick={onClose} />
      <div className="modal_card case_card" data-lenis-prevent style={{ '--from': project.from, '--to': project.to }}>
        <button className="modal_close" aria-label="Close" onClick={onClose}>×</button>
        <small className="case_meta">{project.category} · {project.year}</small>
        <h3>{project.name}</h3>
        <div className="feat_tags">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <div className="case_text">{project.description.map((d) => <p key={d}>{d}</p>)}</div>
        <div className={`case_gallery is_${project.kind}`}>
          {project.screens.map((s) => <Screen key={s.src} kind={project.kind} {...s} />)}
        </div>
      </div>
    </div>
  );
}

export default function Featured() {
  const root = useRef(null);
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  useGSAP(() => {
    gsap.from('.feat_intro', { opacity: 0, y: 20, duration: 1, scrollTrigger: { trigger: '.feat_head', start: 'top 80%' } });
    // "PROJECTS" slides in from the right, offset from "FEATURED"
    gsap.fromTo('.feat_head .split_heading:last-child', { xPercent: 20 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.feat_head', start: 'top bottom', end: 'top 30%', scrub: true } });

    const cards = gsap.utils.toArray('.featured_box');
    cards.forEach((card, i) => {
      // fade-up entrance, screens fan out a beat later
      gsap.fromTo(card, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none reverse' } });
      gsap.from(card.querySelectorAll('.feat_screens figure'), { y: 120, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: card, start: 'top 75%' } });
      // stacked-deck effect: as the next card slides over, this one shrinks & dims
      if (i < cards.length - 1) {
        gsap.to(card.querySelector('.feat_inner'), {
          scale: 0.9, filter: 'brightness(0.45)', ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 18%', scrub: true },
        });
      }
    });
  }, { scope: root });

  return (
    <section className="featured section" id="work" ref={root}>
      <div className="container">
        <div className="feat_head">
          <SplitHeading parts={[[featured.title[0], false]]} className="xl" marker={false} />
          <div className="feat_row">
            <p className="feat_intro">{featured.intro}</p>
            <SplitHeading parts={[[featured.title[1], true]]} className="xl" />
          </div>
        </div>
        <div className="feat_stack">
          {featured.items.map((p, i) => (
            <article key={p.name} className="featured_box" data-cursor="view" onClick={() => setOpen(p)} style={{ '--from': p.from, '--to': p.to, top: `${90 + i * 18}px` }}>
              <div className="feat_inner">
                <div className="feat_info">
                  <small>{p.category} · {p.year}</small>
                  <h3>{p.name}</h3>
                  <p className="feat_tagline">{p.tagline}</p>
                  <p className="feat_summary">{p.summary}</p>
                  <div className="feat_tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  <button className="case_btn" onClick={(e) => { e.stopPropagation(); setOpen(p); }}>View Case Study <Arrow size={18} /></button>
                </div>
                <div className={`feat_screens is_${p.kind}`}>
                  {p.screens.map((s) => <Screen key={s.src} kind={p.kind} {...s} />)}
                </div>
                <span className="feat_num">{String(i + 1).padStart(2, '0')} / {String(featured.items.length).padStart(2, '0')}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <CaseStudy project={open} onClose={close} />
    </section>
  );
}
