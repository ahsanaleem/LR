'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useSite, useContent } from './SiteProvider';
import ContactForm from '../ui/ContactForm';

export default function QuoteModal() {
  const { modalOpen, setModalOpen } = useSite();
  const { ui } = useContent();
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (modalOpen) {
      gsap.set(el, { display: 'grid' });
      gsap.fromTo(el.querySelector('.modal_bg'), { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(el.querySelector('.modal_card'), { y: 60, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });
    } else {
      gsap.to(el.querySelector('.modal_card'), { y: 40, opacity: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(el.querySelector('.modal_bg'), { opacity: 0, duration: 0.35, onComplete: () => gsap.set(el, { display: 'none' }) });
    }
    const esc = (e) => e.key === 'Escape' && setModalOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [modalOpen, setModalOpen]);

  return (
    <div className="modal" ref={root} style={{ display: 'none' }} role="dialog" aria-modal="true" aria-label={ui.quoteTitle}>
      <div className="modal_bg" onClick={() => setModalOpen(false)} />
      <div className="modal_card" data-lenis-prevent>
        <button className="modal_close" aria-label={ui.close} onClick={() => setModalOpen(false)}>×</button>
        <h3>{ui.quoteTitle}</h3>
        <p>{ui.quoteSub}</p>
        <ContactForm onDone={() => setModalOpen(false)} compact />
      </div>
    </div>
  );
}
