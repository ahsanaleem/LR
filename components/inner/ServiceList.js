'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Arrow } from '../ui/Icons';

// Big numbered service rows. On desktop a preview of the hovered service floats next to the cursor.
// items: [{ href, title, lead, poster, more }]
export default function ServiceList({ items }) {
  const wrap = useRef(null);
  const preview = useRef(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = preview.current, box = wrap.current;
    if (!el || !box || !matchMedia('(pointer: fine)').matches) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });
    const move = (e) => { const r = box.getBoundingClientRect(); x(e.clientX - r.left); y(e.clientY - r.top); };
    box.addEventListener('pointermove', move);
    return () => box.removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    if (!preview.current) return;
    gsap.to(preview.current, { autoAlpha: active >= 0 ? 1 : 0, scale: active >= 0 ? 1 : 0.85, duration: 0.45, ease: 'power3.out' });
  }, [active]);

  return (
    <div className="svc_list" ref={wrap} onPointerLeave={() => setActive(-1)}>
      {items.map((s, i) => (
        <Link className={`svc_row ${active === i ? 'is_on' : ''}`} href={s.href} key={s.href} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(-1)}>
          <span className="svc_num">{String(i + 1).padStart(2, '0')}</span>
          <span className="svc_main">
            <span className="svc_title">{s.title}</span>
            <span className="svc_lead">{s.lead}</span>
          </span>
          <span className="svc_go" aria-hidden="true"><Arrow size={22} /></span>
          <span className="sr_only">{s.more}</span>
        </Link>
      ))}
      <div className="svc_preview" ref={preview} aria-hidden="true">
        {items.map((s, i) => <img key={s.href} src={s.poster} alt="" className={active === i ? 'on' : ''} loading="lazy" />)}
      </div>
    </div>
  );
}
