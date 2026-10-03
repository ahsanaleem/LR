'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { cta } from '@/content/site';
import { useSite } from '../global/SiteProvider';
import { Arrow } from '../ui/Icons';

export default function CTA() {
  const root = useRef(null);
  const { setModalOpen } = useSite();
  useGSAP(() => {
    gsap.fromTo('.cta_box', { scale: 0.85, borderRadius: 60, opacity: 0.4 }, { scale: 1, borderRadius: 24, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.cta_box', start: 'top bottom', end: 'center 60%', scrub: true } });
    gsap.fromTo('.cta_box h2 .ln, .cta_box p, .cta_box .btn', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.cta_box', start: 'top 65%' } });
    gsap.to('.cta_blob', { x: (i) => (i ? -60 : 60), y: (i) => (i ? 40 : -40), duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, { scope: root });

  // magnetic button
  const mag = (e) => {
    const b = e.currentTarget, r = b.getBoundingClientRect();
    gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4 });
  };
  const unmag = (e) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' });

  return (
    <section className="cta section_sm" ref={root}>
      <div className="container">
        <div className="cta_box">
          <span className="cta_blob" /><span className="cta_blob b2" />
          <span className="cta_pattern" />
          <h2>{cta.title.split('\n').map((l) => <span className="ln" key={l}>{l}</span>)}</h2>
          <p>{cta.text}</p>
          <button className="btn btn_solid btn_glow" onClick={() => setModalOpen(true)} onMouseMove={mag} onMouseLeave={unmag}>
            {cta.button} <Arrow size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
