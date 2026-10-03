'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { services } from '@/content/site';
import SplitHeading from '../ui/SplitHeading';
import Media from '../ui/Media';
import { Arrow, Check, ServiceIcon } from '../ui/Icons';

export default function Services() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.from('.serv_sub', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.serv_sub', start: 'top 90%' } });
    gsap.utils.toArray('.serv_row').forEach((row, i) => {
      const fromLeft = i % 2 === 1;
      const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 75%' }, defaults: { ease: 'power3.out' } });
      tl.from(row.querySelector('.serv_icon'), { scale: 0, rotate: -45, duration: 0.8, ease: 'back.out(2)' })
        .from(row.querySelector('h3'), { y: 40, opacity: 0, duration: 0.8 }, '-=0.5')
        .from(row.querySelector('p'), { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from(row.querySelectorAll('li'), { x: -30, opacity: 0, stagger: 0.07, duration: 0.6 }, '-=0.5')
        .from(row.querySelector('.serv_vid_box'), { x: fromLeft ? -120 : 120, opacity: 0, rotateY: fromLeft ? 12 : -12, duration: 1.2 }, 0);
      // inner media drifts for depth
      gsap.fromTo(row.querySelector('.serv_vid_box .media'), { yPercent: -8, scale: 1.15 }, { yPercent: 8, scale: 1.15, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }, { scope: root });

  // subtle 3D tilt on the media card
  const tilt = (e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: x * 10, rotateX: -y * 10, duration: 0.6, ease: 'power3.out' });
  };
  const untilt = (e) => gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1,0.5)' });

  return (
    <section className="services section" id="services" ref={root}>
      <div className="container">
        <SplitHeading parts={[[services.title[0], false], [services.title[1], true]]} className="xl" />
        <p className="serv_sub">{services.subtitle}</p>
        <div className="serv_rows">
          {services.items.map((s, i) => (
            <div className={`serv_row ${i % 2 ? 'rev' : ''}`} key={s.title}>
              <div className="serv_text">
                <span className="serv_icon"><ServiceIcon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.list.map((l) => (
                    <li key={l}><a href="#contact"><Check size={22} /> <span>{l}</span> <Arrow size={16} className="li_arrow" /></a></li>
                  ))}
                </ul>
              </div>
              <div className="serv_vid_box" data-cursor="view" onMouseMove={tilt} onMouseLeave={untilt}>
                <Media media={s.media} hue={s.hue} label={s.title} />
                <span className="serv_glow" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <svg className="circuit circuit_r" viewBox="0 0 200 400" aria-hidden="true"><path d="M200 20 H150 a12 12 0 0 0 -12 12 V90 a12 12 0 0 1 -12 12 H90 a12 12 0 0 0 -12 12 V180 a12 12 0 0 1 -12 12 H20 M200 240 H160 a12 12 0 0 0 -12 12 V330 a12 12 0 0 1 -12 12 H60" /><rect x="40" y="200" width="70" height="50" rx="10" /></svg>
    </section>
  );
}
