'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { brand, nav } from '@/content/site';
import { useSite } from './SiteProvider';
import { Logo } from '../ui/Icons';

export default function Header() {
  const { ready, setModalOpen, scrollTo } = useSite();
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      // Dropdown menu: panel unclips from the top-right corner, links rise in.
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .set('.menu_panel', { pointerEvents: 'auto' })
        .fromTo('.menu_panel', { clipPath: 'inset(0% 0% 100% 100% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 0.6, ease: 'power4.inOut' })
        .from('.menu_panel .menu_link', { y: 24, opacity: 0, stagger: 0.05, duration: 0.45 }, '-=0.25')
        .from('.menu_panel .menu_contact > *', { y: 12, opacity: 0, stagger: 0.04, duration: 0.35 }, '-=0.25');
    },
    { scope: root }
  );

  useGSAP(() => {
    if (!ready) return;
    gsap.fromTo(root.current.querySelectorAll('.hdr_anim'), { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.3 });
  }, { dependencies: [ready], scope: root });

  useEffect(() => {
    if (!tl.current) return;
    open ? tl.current.timeScale(1).play() : tl.current.timeScale(1.6).reverse();
  }, [open]);

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  const go = (e, href) => {
    if (href.startsWith('#') && href.length > 1) { e.preventDefault(); scrollTo(href); }
    setOpen(false);
  };

  return (
    <header className="site_header" ref={root}>
      <a href="#top" className="logo hdr_anim" onClick={(e) => go(e, '#top')}>
        <Logo height={40} alt={brand.short} />
      </a>
      <button className="btn btn_solid hdr_anim quote_btn" onClick={() => setModalOpen(true)}>GET A QUOTE</button>
      <div className="menu_wrap">
        <button className={`menu_btn ${open ? 'is_open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {Array.from({ length: 9 }).map((_, i) => <span key={i} className="cell" />)}
        </button>
        <nav className="menu_panel" aria-hidden={!open}>
          <ul>
            {nav.map((n) => (
              <li key={n.label}><a className="menu_link" href={n.href} onClick={(e) => go(e, n.href)}>{n.label}</a></li>
            ))}
          </ul>
          <div className="menu_contact">
            <small>CONTACT US</small>
            <a href={`tel:${brand.phone}`}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
