'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ, prefersReducedMotion } from '@/lib/gsap';
import { useSite } from '@/components/global/SiteProvider';
import SectionIndex from '@/components/ui/SectionIndex';
import SplitHeading from '@/components/ui/SplitHeading';
import ChamferCard from '@/components/ui/ChamferCard';
import Button from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/Icons';
import { ai } from '@/content/site';

export default function AI() {
  const { openModal } = useSite();
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const reduced = prefersReducedMotion();
      const card = q('.ai-card-reveal')[0];
      const mm = gsap.matchMedia();

      gsap.fromTo(q('.ai__sub, .ai__text'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: q('.ai__sub')[0], start: 'top 88%', once: true } });

      mm.add(MQ.motion, () => {
        // Diagonal clip reveal, scrubbed.
        gsap.fromTo(
          card,
          { clipPath: 'polygon(0% 0%, 30% 0%, 0% 30%, 0% 30%)' },
          { clipPath: 'polygon(0% 0%, 230% 0%, 0% 230%, 0% 230%)', ease: 'none', scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 25%', scrub: true } }
        );
        q('.ai-chip').forEach((chip, i) => {
          gsap.to(chip, { y: i % 2 ? 12 : -14, x: i === 1 ? 8 : -6, duration: 2.6 + i * 0.7, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        });
      });

      // Glow drifts with the mouse.
      mm.add(MQ.fine, () => {
        const glow = q('.ai__glow')[0];
        const xTo = gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power3.out' });
        const yTo = gsap.quickTo(glow, 'y', { duration: 1.4, ease: 'power3.out' });
        const move = (e) => {
          const r = ref.current.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.35);
          yTo((e.clientY - r.top - r.height / 2) * 0.35);
        };
        ref.current.addEventListener('pointermove', move);
        return () => ref.current?.removeEventListener('pointermove', move);
      });

      // Agent workflow demo — loops every ~8s, pauses off-screen.
      const steps = q('.flow__step');
      const typed = q('.flow__typed')[0];
      const text = ai.demo.prompt;
      const typing = { n: 0 };
      const demo = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
      demo
        .set(steps, { opacity: 0, y: 14 })
        .set(q('.flow__step .check__tick'), { strokeDasharray: 1, strokeDashoffset: 1 })
        .set(q('.flow__done'), { opacity: 0 })
        .set(typing, { n: 0 })
        .to(typing, { n: text.length, duration: 1.6, ease: 'none', onUpdate: () => (typed.textContent = text.slice(0, Math.round(typing.n))) });
      steps.forEach((s) => {
        demo.to(s, { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out' }, '+=0.35').to(s.querySelector('.check__tick'), { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, '+=0.25');
      });
      demo.to(q('.flow__done'), { opacity: 1, duration: 0.4 }, '+=0.2').to({}, { duration: 1.6 }).to(steps, { opacity: 0, duration: 0.4, stagger: 0.04 }).to(q('.flow__done'), { opacity: 0, duration: 0.3 }, '<');

      if (reduced) {
        demo.progress(0.8).pause();
        typed.textContent = text;
      } else {
        ScrollTrigger.create({ trigger: q('.flow')[0], start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? demo.play() : demo.pause()) });
      }

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="ai" className="section section--dark ai" aria-labelledby="ai-title">
      <span className="ai__glow" aria-hidden="true" />
      <div className="container">
        <header className="section__head">
          <SectionIndex index={ai.index} label={ai.label} />
          <SplitHeading id="ai-title" parts={ai.parts} />
          <p className="ai__sub">{ai.sub}</p>
          <p className="ai__text lead">{ai.text}</p>
        </header>

        <div className="ai-card-wrap">
          <div className="ai-card-reveal">
          <ChamferCard className="ai-card" cut={40}>
            <div className="ai-card__left">
              <h3 className="ai-card__title">{ai.cardTitle}</h3>
              <p className="ai-card__text">{ai.cardText}</p>
              <Button onClick={openModal}>{ai.cta}</Button>
            </div>
            <div className="ai-card__right">
              {/* Fake demo content */}
              <div className="flow glass" role="img" aria-label={`Demo: an AI agent runs "${ai.demo.prompt}" in four steps — ${ai.demo.steps.join(', ')}.`}>
                <div className="flow__bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <em>{ai.demo.title}</em>
                </div>
                <p className="flow__prompt" aria-hidden="true">
                  <span className="flow__caret">›</span> <span className="flow__typed">{ai.demo.prompt}</span>
                  <span className="flow__cursor" />
                </p>
                <ol className="flow__steps" aria-hidden="true">
                  {ai.demo.steps.map((s, i) => (
                    <li key={s} className="flow__step">
                      <span className="flow__idx">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flow__name">{s}</span>
                      <CheckIcon className="flow__check" />
                    </li>
                  ))}
                </ol>
                <p className="flow__done" aria-hidden="true">
                  {ai.demo.done}
                </p>
              </div>
            </div>
          </ChamferCard>
          </div>
          <ul className="ai-chips" aria-label="Capabilities">
            {ai.chips.map((c, i) => (
              <li key={c} className={`ai-chip ai-chip--${i} glass`}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
