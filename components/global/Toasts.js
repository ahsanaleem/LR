'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useSite } from './SiteProvider';
import { CloseIcon } from '@/components/ui/Icons';

const LIFE = 4;

function Toast({ id, msg, type, onDone }) {
  const ref = useRef(null);
  const { contextSafe } = useGSAP(
    () => {
      gsap.timeline()
        .fromTo(ref.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' })
        .fromTo('.toast__bar', { scaleX: 1 }, { scaleX: 0, duration: LIFE, ease: 'none' }, 0)
        .to(ref.current, { y: 20, opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: () => onDone(id) });
    },
    { scope: ref }
  );
  const dismiss = contextSafe(() => gsap.to(ref.current, { opacity: 0, y: 20, duration: 0.25, onComplete: () => onDone(id) }));

  return (
    <div ref={ref} className={`toast toast--${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <p className="toast__msg">{msg}</p>
      <button type="button" className="toast__close" onClick={dismiss} aria-label="Dismiss notification">
        <CloseIcon size={16} />
      </button>
      <span className="toast__bar" aria-hidden="true" />
    </div>
  );
}

export default function Toasts() {
  const { toasts, removeToast } = useSite();
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onDone={removeToast} />
      ))}
    </div>
  );
}
