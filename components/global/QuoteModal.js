'use client';

import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { trapFocus } from '@/lib/focusTrap';
import { useSite } from './SiteProvider';
import ChamferCard from '@/components/ui/ChamferCard';
import ContactForm from '@/components/ui/ContactForm';
import { CloseIcon } from '@/components/ui/Icons';
import { contactSection as c } from '@/content/site';

export default function QuoteModal() {
  const { modalOpen, closeModal } = useSite();
  const ref = useRef(null);
  const wasOpen = useRef(false);

  useGSAP(
    () => {
      if (!modalOpen && !wasOpen.current) {
        gsap.set(ref.current, { autoAlpha: 0 });
        return;
      }
      wasOpen.current = modalOpen;
      if (modalOpen) {
        gsap.timeline()
          .set(ref.current, { autoAlpha: 1 })
          .fromTo('.modal__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.4 })
          .fromTo('.modal__card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }, 0.05);
      } else {
        gsap.timeline()
          .to('.modal__card', { y: 24, opacity: 0, duration: 0.3, ease: 'power2.in' })
          .to('.modal__backdrop', { opacity: 0, duration: 0.3 }, 0.1)
          .set(ref.current, { autoAlpha: 0 });
      }
    },
    { scope: ref, dependencies: [modalOpen], revertOnUpdate: false }
  );

  useEffect(() => {
    if (!modalOpen) return;
    const release = trapFocus(ref.current.querySelector('.modal__card'));
    const onKey = (e) => e.key === 'Escape' && closeModal();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      release();
    };
  }, [modalOpen, closeModal]);

  return (
    <div ref={ref} className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden={!modalOpen}>
      <div className="modal__backdrop" onClick={closeModal} />
      <ChamferCard className="modal__card" cut={28}>
        <div className="modal__scroll" data-lenis-prevent>
          <div className="modal__head">
            <div>
              <h2 id="modal-title" className="modal__title">
                {c.formTitle}
              </h2>
              <p className="modal__sub">{c.formSub}</p>
            </div>
            <button type="button" className="icon-btn" onClick={closeModal} aria-label="Close dialog">
              <CloseIcon />
            </button>
          </div>
          <ContactForm idPrefix="modal" onSuccess={closeModal} />
        </div>
      </ChamferCard>
    </div>
  );
}
