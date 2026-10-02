'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MQ, prefersReducedMotion } from '@/lib/gsap';
import { sectionWipe } from '@/lib/anim';
import { useSite } from '@/components/global/SiteProvider';
import Button from '@/components/ui/Button';
import LogoMark from '@/components/ui/LogoMark';
import { SocialIcon, ArrowUpIcon } from '@/components/ui/Icons';
import { footer, contact, socials, brand } from '@/content/site';

export default function Footer() {
  const { openModal, scrollTo } = useSite();
  const ref = useRef(null);
  const top = useRef(null);
  const bottom = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      sectionWipe(ref.current, prefersReducedMotion());
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const scrollTrigger = { trigger: q('.footer__giant')[0], start: 'top bottom', end: 'bottom bottom', scrub: true };
        gsap.fromTo(q('.giant__word--a'), { xPercent: -40, opacity: 0.2 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger });
        gsap.fromTo(q('.giant__word--b'), { xPercent: 40, opacity: 0.2 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger });
        // The mark's two pieces lock together at the end.
        gsap.fromTo(top.current, { x: 220, y: -220 }, { x: 0, y: 0, ease: 'none', scrollTrigger });
        gsap.fromTo(bottom.current, { x: -220, y: 220 }, { x: 0, y: 0, ease: 'none', scrollTrigger });
        gsap.fromTo(q('.footer__top > *, .footer__col'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const half = Math.ceil(footer.services.length / 2);

  return (
    <footer ref={ref} className="footer wipe" aria-label="Site footer">
      <span className="footer__glow" aria-hidden="true" />
      <svg className="footer__threads" viewBox="0 0 400 260" aria-hidden="true" focusable="false">
        <path d="M400 30 L300 70 L340 150 L230 120 L180 220" />
        <path d="M400 120 L340 150 L380 230" />
        {[
          [300, 70],
          [340, 150],
          [230, 120],
          [180, 220],
          [380, 230],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" />
        ))}
      </svg>
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Image className="footer__logo" src={brand.logoLight} width={brand.logoWidth} height={brand.logoHeight} alt="Long Relation" sizes="180px" />
            <p className="footer__line">{footer.line}</p>
          </div>
          <Button onClick={openModal}>{footer.cta}</Button>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h2 className="footer__h">{footer.contactTitle}</h2>
            {/* PLACEHOLDER — contact details live in content/site.js */}
            <ul>
              <li>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              {contact.emails.map((e) => (
                <li key={e.value}>
                  <a href={`mailto:${e.value}`}>{e.value}</a>
                </li>
              ))}
              <li>
                <address>{contact.address}</address>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h2 className="footer__h">{footer.servicesTitle}</h2>
            <div className="footer__two">
              {[footer.services.slice(0, half), footer.services.slice(half)].map((list, i) => (
                <ul key={i}>
                  {list.map((s) => (
                    <li key={s}>
                      <a href="#services">{s}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <h2 className="footer__h">{footer.companyTitle}</h2>
            <ul className="footer__two-col">
              {footer.company.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__giant" aria-hidden="true">
        <p className="giant">
          <span className="giant__word giant__word--a">{brand.wordmark[0]}</span>{' '}
          <span className="giant__word giant__word--b">
            REL<span className="giant__a">A</span>TION
          </span>
        </p>
        <LogoMark className="giant__mark" topRef={top} bottomRef={bottom} />
      </div>

      <div className="container footer__bottom">
        <button type="button" className="to-top" onClick={() => scrollTo(0)} data-hover="y:-3" data-hover-target=".to-top__arrow">
          <span className="to-top__arrow" aria-hidden="true">
            <ArrowUpIcon />
          </span>
          {footer.backToTop}
        </button>
        <p className="footer__copy">{footer.copyright}</p>
        <ul className="footer__socials">
          {socials.map((s) => (
            <li key={s.id}>
              <a className="social" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} data-hover="y:-4">
                <SocialIcon id={s.id} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
