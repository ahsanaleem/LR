'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, Flip, useGSAP } from '@/lib/gsap';
import { useSite } from './SiteProvider';
import LogoMark from '@/components/ui/LogoMark';
import Button from '@/components/ui/Button';
import Menu from './Menu';
import { nav } from '@/content/site';

export default function Header() {
  const { ready, openModal, menuOpen, setMenuOpen, lenis } = useSite();
  const ref = useRef(null);
  const pill = useRef(null);
  const indicator = useRef(null);
  const burger = useRef(null);
  const [active, setActive] = useState(null);

  // Drop in after the loader.
  useGSAP(
    () => {
      if (!ready) {
        gsap.set(ref.current, { y: -40, autoAlpha: 0 });
        return;
      }
      gsap.fromTo(ref.current, { y: -40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', delay: 0.4 });
    },
    { scope: ref, dependencies: [ready] }
  );

  // Hide on scroll down, show on scroll up, compact after 80px.
  useGSAP(
    () => {
      if (!lenis) return;
      let hidden = false;
      let compact = false;
      const onScroll = ({ scroll, direction }) => {
        const shouldHide = direction === 1 && scroll > 240 && !menuOpen;
        if (shouldHide !== hidden) {
          hidden = shouldHide;
          gsap.to(pill.current, { yPercent: hidden ? -180 : 0, duration: 0.6, ease: hidden ? 'power3.in' : 'expo.out', overwrite: 'auto' });
        }
        const shouldCompact = scroll > 80;
        if (shouldCompact !== compact) {
          compact = shouldCompact;
          gsap.to(pill.current, { '--pill-pad': compact ? '6px' : '10px', duration: 0.4, ease: 'power2.out' });
        }
      };
      lenis.on('scroll', onScroll);
      return () => lenis.off('scroll', onScroll);
    },
    { scope: ref, dependencies: [lenis, menuOpen] }
  );

  // Track which section is in view.
  useGSAP(
    () => {
      // Measure on every scroll update and after each refresh, so the result never depends on toggle order.
      const compute = () => {
        const mid = window.innerHeight / 2;
        let found = null;
        for (const { id } of nav.links) {
          const r = document.getElementById(id)?.getBoundingClientRect();
          if (r && r.top <= mid && r.bottom > mid) found = id;
        }
        setActive(found);
      };
      const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: compute });
      ScrollTrigger.addEventListener('refresh', compute);
      compute();
      return () => {
        st.kill();
        ScrollTrigger.removeEventListener('refresh', compute);
      };
    },
    { scope: ref }
  );

  // Slide the indicator between links with Flip.
  useGSAP(
    () => {
      const ind = indicator.current;
      const link = active && ref.current.querySelector(`.header__link[data-id="${active}"]`);
      if (!link) {
        gsap.to(ind, { opacity: 0, duration: 0.3 });
        return;
      }
      const wasHidden = gsap.getProperty(ind, 'opacity') < 0.05;
      const state = Flip.getState(ind);
      ind.style.left = `${link.offsetLeft}px`;
      ind.style.width = `${link.offsetWidth}px`;
      if (wasHidden) {
        gsap.to(ind, { opacity: 1, duration: 0.3 });
        return;
      }
      Flip.from(state, { duration: 0.6, ease: 'power3.inOut' });
    },
    { scope: ref, dependencies: [active], revertOnUpdate: false }
  );

  // Burger lines morph into an X (±45°, the brand angle).
  useGSAP(
    () => {
      const [a, b] = burger.current.children;
      gsap.to(a, { y: menuOpen ? 4 : 0, rotation: menuOpen ? 45 : 0, duration: 0.5, ease: 'power3.inOut' });
      gsap.to(b, { y: menuOpen ? -4 : 0, rotation: menuOpen ? -45 : 0, duration: 0.5, ease: 'power3.inOut' });
    },
    { scope: ref, dependencies: [menuOpen], revertOnUpdate: false }
  );

  return (
    <>
      <header ref={ref} className="header">
        <div ref={pill} className="header__pill glass">
          <a href="#top" className="header__brand" aria-label="Long Relation — back to top">
            <LogoMark />
          </a>
          <nav className="header__nav" aria-label="Primary">
            <ul className="header__links">
              {nav.links.map((l) => (
                <li key={l.id}>
                  <a className={`header__link${active === l.id ? ' is-active' : ''}`} data-id={l.id} href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <span ref={indicator} className="header__indicator" aria-hidden="true" style={{ opacity: 0 }} />
          </nav>
          <Button size="sm" className="header__cta" onClick={openModal}>
            {nav.cta}
          </Button>
          <button
            ref={burger}
            type="button"
            className="burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <Menu burgerRef={burger} />
    </>
  );
}
