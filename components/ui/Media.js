'use client';
import { MARK_POLYS } from './Icons';
// Renders a looping muted video, an image, or (when empty) animated
// placeholder artwork so the layout always looks finished.
export default function Media({ media = {}, hue = 190, variant = 'scene', label, className = '' }) {
  if (media.video)
    return <video className={`media ${className}`} src={media.video} poster={media.poster} autoPlay muted loop playsInline preload="metadata" />;
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
