'use client';
import { useEffect, useState } from 'react';

// Website screenshots in one browser frame with tabs, instead of a tall stack of full-width frames.
// Cycles on its own until someone hovers or picks a tab.
export default function WebScreens({ screens, eager = false }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!auto || hover || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % screens.length), 5000);
    return () => clearTimeout(t);
  }, [active, auto, hover, screens.length]);

  return (
    <div className={`web_viewer ${auto && !hover ? 'is_auto' : ''}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <figure className="dev_web wv_main">
        <div className="dev_bar"><i /><i /><i /><span>{screens[active].label}</span></div>
        <div className="wv_stage">
          {screens.map((s, i) => (
            <img key={s.src} className={i === active ? 'on' : ''} src={s.src} alt={s.alt || s.label} width={1488} height={730}
              loading={eager || i === 0 ? 'eager' : 'lazy'} decoding="async" />
          ))}
        </div>
      </figure>
      <div className="wv_tabs" role="tablist">
        {screens.map((s, i) => (
          <button key={s.src} type="button" role="tab" aria-selected={i === active} className={i === active ? 'on' : ''}
            onClick={() => { setActive(i); setAuto(false); }}>
            <img src={s.src} alt="" loading="lazy" decoding="async" />
            <span><small>{String(i + 1).padStart(2, '0')}</small>{s.label}</span>
            {i === active && <i key={active} className="wv_progress" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
}
