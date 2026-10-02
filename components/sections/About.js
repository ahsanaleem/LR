'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, MQ, prefersReducedMotion } from '@/lib/gsap';
import { sectionWipe, countUp } from '@/lib/anim';
import SectionIndex from '@/components/ui/SectionIndex';
import SplitHeading from '@/components/ui/SplitHeading';
import ChamferCard from '@/components/ui/ChamferCard';
import LogoMark from '@/components/ui/LogoMark';
import Media from '@/components/ui/Media';
import { about } from '@/content/site';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const wordsHtml = (text) =>
  text
    .split(/\s+/)
    .map((w) => `<span class="hl-w">${esc(w)}</span>`)
    .join(' ');

/** Mouse-following border glow for chamfered tiles (sets --mx / --my). */
export function trackGlow(e) {
  const tile = e.target.closest('[data-glow]');
  if (!tile) return;
  const r = tile.getBoundingClientRect();
  tile.style.setProperty('--mx', `${e.clientX - r.left}px`);
  tile.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export default function About() {
  const ref = useRef(null);
  const textRef = useRef(null);
  const top = useRef(null);
  const bottom = useRef(null);
  const [splitKey, setSplitKey] = useState(0);

  // Re-split lines when the paragraph width changes.
  useEffect(() => {
    let width = textRef.current.offsetWidth;
    let t;
    const ro = new ResizeObserver(() => {
      const next = textRef.current?.offsetWidth;
      if (next && next !== width) {
        width = next;
        clearTimeout(t);
        t = setTimeout(() => setSplitKey((k) => k + 1), 200);
      }
    });
    ro.observe(textRef.current);
    // Line breaks change once the web font arrives.
    document.fonts?.ready.then(() => setSplitKey((k) => k + 1));
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, []);

  // Line-by-line highlight: a cyan bar fills behind each line, text goes from 30% to 100%.
  useGSAP(
    () => {
      const p = textRef.current;
      p.innerHTML = wordsHtml(about.text);
      const words = [...p.querySelectorAll('.hl-w')];
      const lines = [];
      let lastTop = null;
      for (const w of words) {
        const top = w.offsetTop;
        if (lastTop === null || Math.abs(top - lastTop) > 4) {
          lines.push([]);
          lastTop = top;
        }
        lines[lines.length - 1].push(w.textContent);
      }
      p.innerHTML = lines
        .map((l) => `<span class="hl-line"><span class="hl-in"><span class="hl-bar"></span><span class="hl-text">${esc(l.join(' '))}</span></span></span>`)
        .join('');

      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 78%', end: 'bottom 45%', scrub: 0.6 } });
      p.querySelectorAll('.hl-line').forEach((line) => {
        tl.fromTo(line.querySelector('.hl-bar'), { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 })
          .fromTo(line.querySelector('.hl-text'), { opacity: 0.3 }, { opacity: 1, ease: 'none', duration: 1 }, '<');
      });
    },
    { scope: ref, dependencies: [splitKey], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const reduced = prefersReducedMotion();
      sectionWipe(ref.current, reduced);

      mm.add(MQ.motion, () => {
        gsap.fromTo('.tile', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.bento', start: 'top 85%', once: true } });
        gsap.fromTo('.tile--media .media__inner', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.tile--media', start: 'top bottom', end: 'bottom 30%', scrub: true } });
        gsap.fromTo(top.current, { x: 140, y: -140 }, { x: 0, y: 0, ease: 'none', scrollTrigger: { trigger: '.tile--mark', start: 'top 95%', end: 'center 50%', scrub: true } });
        gsap.fromTo(bottom.current, { x: -140, y: 140 }, { x: 0, y: 0, ease: 'none', scrollTrigger: { trigger: '.tile--mark', start: 'top 95%', end: 'center 50%', scrub: true } });
      });

      const num = ref.current.querySelector('[data-count]');
      gsap.timeline({ scrollTrigger: { trigger: num, start: 'top 90%', once: true } }).add(countUp(num, about.stat.value, { suffix: about.stat.suffix, duration: reduced ? 0.01 : 2 }));
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="about" className="section section--paper wipe about" aria-labelledby="about-title">
      <div className="container">
        <header className="section__head">
          <SectionIndex index={about.index} label={about.label} />
          <SplitHeading id="about-title" parts={about.parts} />
        </header>

        <div className="about__grid">
          <p ref={textRef} className="about__text hl" dangerouslySetInnerHTML={{ __html: esc(about.text) }} />

          <div className="bento" onPointerMove={trackGlow}>
            <ChamferCard className="tile tile--media" data-glow>
              <Media media={about.media} ratio="16 / 9" label={about.mediaCaption} alt={about.mediaCaption} />
            </ChamferCard>
            {/* PLACEHOLDER — figure in content/site.js */}
            <ChamferCard className="tile tile--stat" data-glow>
              <p className="tile__eyebrow">{about.stat.label}</p>
              <p className="tile__num">
                <span data-count>
                  {about.stat.value}
                  {about.stat.suffix}
                </span>
                <small>{about.stat.unit}</small>
              </p>
            </ChamferCard>
            <ChamferCard className="tile tile--team" data-glow>
              <p className="tile__eyebrow">{about.team.title}</p>
              <ul className="tile__list">
                {about.team.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </ChamferCard>
            <ChamferCard className="tile tile--mark" data-glow>
              <LogoMark topRef={top} bottomRef={bottom} className="tile__mark" />
              <p className="tile__caption">{about.markCaption}</p>
            </ChamferCard>
          </div>
        </div>
      </div>
    </section>
  );
}
