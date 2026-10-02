'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { trapFocus } from '@/lib/focusTrap';
import { useSite } from './SiteProvider';
import { SocialIcon } from '@/components/ui/Icons';
import { nav, contact, socials, brand } from '@/content/site';

const CLOSED = 'polygon(100% 0%, 100% 0%, 100% 0%)';
const OPEN = 'polygon(-110% 0%, 100% 0%, 100% 210%)';

/** Full-screen menu; opens with a diagonal wipe from the top-right corner. */
export default function Menu({ burgerRef }) {
  const { menuOpen, setMenuOpen } = useSite();
  const ref = useRef(null);
  const wasOpen = useRef(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!menuOpen && !wasOpen.current) {
        gsap.set(el, { autoAlpha: 0, clipPath: CLOSED });
        return;
      }
      wasOpen.current = menuOpen;
      const reduced = prefersReducedMotion();
      if (menuOpen) {
        const tl = gsap.timeline();
        tl.set(el, { autoAlpha: 1 })
          .fromTo(el, { clipPath: reduced ? OPEN : CLOSED }, { clipPath: OPEN, duration: reduced ? 0 : 0.8, ease: 'power3.inOut' })
          .fromTo('.menu__item', { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, '-=0.35')
          .fromTo('.menu__foot > *', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 }, '-=0.6');
      } else {
        gsap.timeline()
          .to('.menu__item', { yPercent: -110, duration: 0.35, ease: 'power3.in', stagger: 0.02 })
          .to(el, { clipPath: CLOSED, duration: reduced ? 0 : 0.6, ease: 'power3.inOut' }, '-=0.15')
          .set(el, { autoAlpha: 0 });
      }
    },
    { scope: ref, dependencies: [menuOpen], revertOnUpdate: false }
  );

  useEffect(() => {
    if (!menuOpen) return;
    const release = trapFocus(ref.current, { returnTo: burgerRef?.current });
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      release();
    };
  }, [menuOpen, setMenuOpen, burgerRef]);

  return (
    <div ref={ref} id="site-menu" className="menu" role="dialog" aria-modal="true" aria-label="Site menu">
      <span className="menu__hatch" aria-hidden="true" />
      <Image className="menu__logo" src={brand.logoLight} width={brand.logoWidth} height={brand.logoHeight} alt="Long Relation" sizes="160px" />
      <nav className="menu__nav" aria-label="Menu">
        <ul>
          {nav.menuLinks.map((l, i) => (
            <li key={l.id} className="menu__row">
              <span className="menu__mask">
                <a className="menu__item" href={`#${l.id}`} data-hover="x:16">
                  <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="menu__node" aria-hidden="true" />
                  <span className="menu__label">{l.label}</span>
                </a>
              </span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="menu__foot">
        <a href={contact.phoneHref}>{contact.phone}</a>
        {contact.emails.map((e) => (
          <a key={e.value} href={`mailto:${e.value}`}>
            {e.value}
          </a>
        ))}
        <div className="menu__socials">
          {socials.map((s) => (
            <a key={s.id} className="social" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <SocialIcon id={s.id} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
