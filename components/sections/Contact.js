'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ, prefersReducedMotion } from '@/lib/gsap';
import { sectionWipe, DIAG_FROM, DIAG_TO } from '@/lib/anim';
import ChamferCard from '@/components/ui/ChamferCard';
import ContactForm from '@/components/ui/ContactForm';
import LogoMark from '@/components/ui/LogoMark';
import SplitHeading from '@/components/ui/SplitHeading';
import { PhoneIcon } from '@/components/ui/Icons';
import { contactSection as c, contact } from '@/content/site';

export default function Contact() {
  const ref = useRef(null);
  const top = useRef(null);
  const bottom = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      sectionWipe(ref.current, prefersReducedMotion());
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: q('.contact__wrap')[0], start: 'top 75%', once: true } });
        tl.fromTo(q('.contact__left-reveal'), { x: -60, clipPath: DIAG_FROM }, { x: 0, clipPath: DIAG_TO, duration: 1.3, ease: 'power3.inOut', clearProps: 'clipPath' })
          .fromTo(q('.contact__left-body > *'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, 0.6)
          .fromTo(q('.contact__form-head > *, .cform [data-field]'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07 }, 0.4);

        // The mark drifts apart and locks together on a 10s loop.
        gsap.timeline({ repeat: -1, defaults: { duration: 2.5, ease: 'sine.inOut' } })
          .to(top.current, { x: 70, y: -70 })
          .to(bottom.current, { x: -70, y: 70 }, '<')
          .to([top.current, bottom.current], { x: 0, y: 0 }, '+=2.5')
          .to({}, { duration: 2.5 });
      });

      // Phone tile rings on hover.
      mm.add(MQ.fine, () => {
        const tile = q('.talk__icon')[0];
        const box = q('.talk')[0];
        const ring = () => gsap.fromTo(tile, { rotation: 0 }, { keyframes: { rotation: [0, -14, 12, -10, 8, -4, 0] }, duration: 0.7, ease: 'none', overwrite: true });
        box.addEventListener('pointerenter', ring);
        return () => box.removeEventListener('pointerenter', ring);
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="contact" className="section section--paper wipe contact" aria-labelledby="contact-title">
      <div className="container">
        <ChamferCard className="contact__wrap tile--light" cut={36}>
          <div className="contact__left-reveal">
            <div className="contact__left">
              <LogoMark className="contact__mark" topRef={top} bottomRef={bottom} />
              <span className="hatch" aria-hidden="true" />
              <div className="contact__left-body">
                <SplitHeading id="contact-title" parts={c.titleParts} className="contact__title" start="top 80%" />
                <p className="contact__text">{c.text}</p>
                {/* PLACEHOLDER — phone number lives in content/site.js */}
                <a className="talk" href={contact.phoneHref}>
                  <span className="talk__icon" aria-hidden="true">
                    <PhoneIcon />
                  </span>
                  <span>
                    <small>{c.talkLabel}</small>
                    <strong>{contact.phone}</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="contact__right">
            <div className="contact__form-head">
              <h3 className="contact__form-title">{c.formTitle}</h3>
              <p className="contact__form-sub">{c.formSub}</p>
            </div>
            <ContactForm idPrefix="contact" />
          </div>
        </ChamferCard>
      </div>
    </section>
  );
}
