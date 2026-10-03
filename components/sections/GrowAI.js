'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { growAI } from '@/content/site';
import { useSite } from '../global/SiteProvider';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';
import Media from '../ui/Media';
import { Arrow } from '../ui/Icons';

export default function GrowAI() {
  const root = useRef(null);
  const { setModalOpen } = useSite();
  useGSAP(() => {
    gsap.fromTo('.ai_card', { clipPath: 'inset(15% 10% 15% 10% round 40px)' }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', ease: 'none', scrollTrigger: { trigger: '.ai_card', start: 'top 95%', end: 'top 35%', scrub: true } });
    gsap.fromTo('.ai_card .ai_bg', { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.ai_card', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.ai_chip', { scale: 0, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'back.out(2)', scrollTrigger: { trigger: '.ai_card', start: 'top 60%' } });
    gsap.to('.ai_chip', { y: (i) => (i % 2 ? 12 : -12), duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.3 });
  }, { scope: root });

  return (
    <section className="growai section" ref={root}>
      <div className="container">
        <SplitHeading parts={[[growAI.title[0], false], [growAI.title[1], true]]} className="xl" />
        <Reveal className="ai_copy">
          <h3>{growAI.subtitle}</h3>
          <p>{growAI.body}</p>
        </Reveal>
        <div className="ai_card">
          <div className="ai_bg"><Media media={growAI.media} hue={188} variant="ai" /></div>
          <div className="ai_card_text">
            <h3>{growAI.cardTitle}</h3>
            <p>{growAI.cardText}</p>
            <button className="btn btn_light btn_glow" onClick={() => setModalOpen(true)}>{growAI.cta} <Arrow size={18} /></button>
          </div>
          <div className="ai_chips" aria-hidden="true">
            <span className="ai_chip">LLM fine-tuning</span>
            <span className="ai_chip">Agent workflows</span>
            <span className="ai_chip">Decision engines</span>
            <span className="ai_chip big">AI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
