'use client';
import { useEffect, useState } from 'react';

// Sticky table of contents that highlights the section currently being read.
// items: [{ id, label }] — ids must exist on the page.
export default function Toc({ items, label }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (window.lenis) window.lenis.scrollTo(el, { offset: -110, duration: 1.2 });
    else el.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav className="toc" aria-label={label}>
      <small>{label}</small>
      <ol>
        {items.map((i) => (
          <li key={i.id} className={active === i.id ? 'on' : ''}>
            <a href={`#${i.id}`} onClick={(e) => go(e, i.id)}>{i.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
