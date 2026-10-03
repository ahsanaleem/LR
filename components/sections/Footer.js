'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { brand, footer } from '@/content/site';
import { useSite } from '../global/SiteProvider';
import { ArrowUp, Social, Logo } from '../ui/Icons';

export default function Footer() {
  const root = useRef(null);
  const { scrollTo } = useSite();
  useGSAP(() => {
    gsap.from('.ftr_col', { y: 50, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 80%' } });
    // giant wordmark rises from below the fold (scrubbed)
    gsap.fromTo('.ftr_big img', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.ftr_big', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  }, { scope: root });

  const go = (e, href) => { if (href.startsWith('#') && href.length > 1) { e.preventDefault(); scrollTo(href); } };

  return (
    <footer className="site_footer" ref={root}>
      <svg className="circuit circuit_r" viewBox="0 0 200 300" aria-hidden="true"><rect x="20" y="10" width="80" height="55" rx="10" /><path d="M200 10 H150 a10 10 0 0 0 -10 10 V60 a10 10 0 0 1 -10 10 H110 a10 10 0 0 0 -10 10 V120 a10 10 0 0 1 -10 10 H60 a10 10 0 0 0 -10 10 V200" /></svg>
      <div className="container ftr_grid">
        <div className="ftr_col">
          <h4>CONTACT US</h4>
          <p className="ftr_inline"><a href={`tel:${brand.phone}`}>{brand.phone}</a><a href={`mailto:${brand.email}`}>{brand.email}</a></p>
          <p>{brand.address}</p>
        </div>
        <div className="ftr_col">
          <h4>SERVICES</h4>
          <ul className="two">{footer.services.map((s) => <li key={s}><a href="#services" onClick={(e) => go(e, '#services')}>{s}</a></li>)}</ul>
        </div>
        <div className="ftr_col">
          <h4>QUICK LINKS</h4>
          <ul className="two">{footer.links.map((l) => <li key={l.label}><a href={l.href} onClick={(e) => go(e, l.href)}>{l.label}</a></li>)}</ul>
        </div>
      </div>
      <div className="ftr_big" aria-hidden="true"><Logo height={400} wordOnly alt="" /></div>
      <div className="container ftr_bottom">
        <button className="back_top" onClick={() => scrollTo('#top')}><ArrowUp size={18} /> BACK TO TOP</button>
        <span>{new Date().getFullYear()} © {brand.name}. All Rights Reserved. <a href="#">Disclaimer</a></span>
        <div className="ftr_social">{brand.socials.map((s) => <a key={s.label} href={s.href} aria-label={s.label}><Social name={s.icon} /></a>)}</div>
      </div>
    </footer>
  );
}
