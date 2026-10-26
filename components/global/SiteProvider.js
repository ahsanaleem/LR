'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getContent } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SiteCtx = createContext(null);
export const useSite = () => useContext(SiteCtx);
// Page copy + UI strings for the current language (see lib/i18n.js)
export const useContent = () => useContext(SiteCtx).c;

export default function SiteProvider({ lang = 'en', children }) {
  const lenisRef = useRef(null);
  const [ready, setReady] = useState(false); // true once the loader has left
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // ── Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: !reduce, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;
    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.stop(); // locked while loader plays
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (ready && !modalOpen) lenisRef.current.start();
    else lenisRef.current.stop();
    if (ready) ScrollTrigger.refresh();
  }, [ready, modalOpen]);

  // Arriving from an inner page via '/#section': jump there once the page is ready
  useEffect(() => {
    if (!ready || !location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) requestAnimationFrame(() => lenisRef.current?.scrollTo(el, { immediate: true }));
  }, [ready]);

  const scrollTo = useCallback((target) => {
    const el = typeof target === 'string' && target.startsWith('#') ? document.querySelector(target) : target;
    if (el !== null && el !== undefined) lenisRef.current?.scrollTo(el, { duration: 1.6 });
  }, []);

  const toast = useCallback((msg, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  return (
    <SiteCtx.Provider value={{ ready, setReady, modalOpen, setModalOpen, scrollTo, toast, lang, c: getContent(lang) }}>
      {children}
      <div className="toast_stack" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast_${t.type}`}>
            <span>{t.msg}</span>
            <i className="toast_bar" />
          </div>
        ))}
      </div>
    </SiteCtx.Provider>
  );
}
