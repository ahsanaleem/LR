'use client';
import { useEffect, useRef } from 'react';
import { MARK_POLYS } from './Icons';

// Looping muted video that only downloads once it nears the viewport, plays while
// visible and pauses off-screen. Until then the poster stands in (and is the LCP candidate).
// Reduced-motion users get the poster only.
function LazyVideo({ src, poster, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.src) { v.src = src; v.load(); }
        v.play().catch(() => {});
      } else if (v.src) v.pause();
    }, { rootMargin: '200px 0px' });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return <video ref={ref} className={`media ${className}`} poster={poster} muted loop playsInline preload="none" aria-hidden="true" />;
}

// Renders a lazy looping video, an image, or (when empty) animated
// placeholder artwork so the layout always looks finished.
export default function Media({ media = {}, hue = 190, variant = 'scene', label, className = '' }) {
  if (media.video) return <LazyVideo src={media.video} poster={media.poster} className={className} />;
  if (media.image) return <img className={`media ${className}`} src={media.image} alt={label || ''} loading="lazy" />;
  return (
    <div className={`media art art_${variant} ${className}`} style={{ '--h': hue }} aria-hidden="true">
      <span className="art_blob b1" />
      <span className="art_blob b2" />
      <span className="art_blob b3" />
      <span className="art_grid" />
      <svg className="art_hex" viewBox="100 300 480 480">{MARK_POLYS.map((p) => <polygon key={p} points={p} />)}</svg>
      <span className="art_scan" />
      {label && <span className="art_label">{label}</span>}
    </div>
  );
}
