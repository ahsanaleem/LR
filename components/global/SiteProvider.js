'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, useGSAP, MQ, prefersReducedMotion } from '@/lib/gsap';

const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);

const easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export default function SiteProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lenis, setLenis] = useState(null);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  // Lenis — created once, driven by gsap.ticker, synced with ScrollTrigger.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const l = new Lenis({ duration: 1.1, easing, smoothWheel: !reduced, autoRaf: false });
    l.stop();
    l.on('scroll', ScrollTrigger.update);
    const tick = (time) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      setLenis(null);
    };
  }, []);

  // Lenis stays stopped for the loader, the menu and the modal.
  const locked = !ready || modalOpen || menuOpen;
  useEffect(() => {
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
  }, [lenis, locked]);

  // Layout settles after the loader, fonts and images — refresh every ScrollTrigger.
  useEffect(() => {
    if (!ready) return;
    ScrollTrigger.refresh();
  }, [ready]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    if (document.readyState === 'complete') refresh();
    else window.addEventListener('load', refresh, { once: true });
    return () => window.removeEventListener('load', refresh);
  }, []);

  const scrollTo = useCallback(
    (target, opts = {}) => {
      let dest = target;
      if (typeof target === 'string') {
        if (target === '#' || target === '#top') dest = 0;
        else dest = document.querySelector(target);
      }
      if (dest == null) return;
      const offset = typeof dest === 'number' ? 0 : -24;
      if (lenis) lenis.scrollTo(dest, { offset, duration: 1.4, immediate: prefersReducedMotion(), force: true, ...opts });
      else if (typeof dest === 'number') window.scrollTo({ top: dest });
      else dest.scrollIntoView();
    },
    [lenis]
  );

  // Every in-page anchor smooth-scrolls with Lenis.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const href = a.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        return;
      }
      if (href === '#top' || document.querySelector(href)) {
        e.preventDefault();
        setMenuOpen(false);
        // Wait a frame so a closing menu has released Lenis.
        requestAnimationFrame(() => scrollTo(href));
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [scrollTo]);

  const removeToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback((msg, type = 'success') => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, msg, type }]);
  }, []);

  const openModal = useCallback(() => {
    setMenuOpen(false);
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const value = useMemo(
    () => ({ ready, setReady, modalOpen, openModal, closeModal, menuOpen, setMenuOpen, scrollTo, toast, toasts, removeToast, lenis }),
    [ready, modalOpen, openModal, closeModal, menuOpen, scrollTo, toast, toasts, removeToast, lenis]
  );

  return (
    <SiteContext.Provider value={value}>
      <HoverFx />
      {children}
    </SiteContext.Provider>
  );
}

/**
 * Hover transforms are owned by GSAP (CSS transitions never touch transform).
 * Any element with data-hover="x:16" / "y:-8" / "y:-4,rotation:12" moves there on hover and back on leave.
 * Add data-hover-target=".child" to move a descendant instead of the element itself.
 */
function HoverFx() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.fine, () => {
      const parse = (s) =>
        Object.fromEntries(
          s.split(',').map((p) => {
            const [k, v] = p.split(':');
            return [k.trim(), parseFloat(v)];
          })
        );
      const over = (e) => {
        const el = e.target.closest?.('[data-hover]');
        if (!el || el.contains(e.relatedTarget)) return;
        const target = el.dataset.hoverTarget ? el.querySelectorAll(el.dataset.hoverTarget) : el;
        gsap.to(target, { ...parse(el.dataset.hover), duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
      };
      const out = (e) => {
        const el = e.target.closest?.('[data-hover]');
        if (!el || el.contains(e.relatedTarget)) return;
        const target = el.dataset.hoverTarget ? el.querySelectorAll(el.dataset.hoverTarget) : el;
        const reset = Object.fromEntries(Object.keys(parse(el.dataset.hover)).map((k) => [k, k.startsWith('scale') ? 1 : 0]));
        gsap.to(target, { ...reset, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
      };
      document.addEventListener('pointerover', over);
      document.addEventListener('pointerout', out);
      return () => {
        document.removeEventListener('pointerover', over);
        document.removeEventListener('pointerout', out);
      };
    });
    return () => mm.revert();
  });
  return null;
}
