// Inline SVG icon set (no external icon font needed)
const S = (p) => ({ width: p.size || 24, height: p.size || 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', className: p.className, 'aria-hidden': true });

// Official Long Relation "LR" mark — vector polygons from the brand SVG (public/brand).
export const MARK_POLYS = [
  '259.88 494.27 472.52 494.27 472.52 406.71 207.97 406.71 119.78 317.9 560.71 317.9 560.71 584.34 475.02 584.34 561.96 671.27 561.96 761.96 523.81 761.96 259.88 494.27',
  '474.4 761.96 384.02 671.58 206.09 671.58 206.09 442.36 116.97 353.24 116.97 761.96 474.4 761.96',
];
export function LRMark({ size = 32, color = 'var(--accent)', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="116.97 317.9 445 444.06" className={`lrmark ${className}`} aria-hidden="true">
      {MARK_POLYS.map((p) => <polygon key={p} points={p} fill={color} />)}
    </svg>
  );
}

// Full lockup (mark + wordmark). The wordmark uses the brand typeface, so it ships as
// pre-rendered PNGs. tone="white" for dark backgrounds, "dark" for light ones.
export function Logo({ height = 40, tone = 'white', wordOnly = false, className = '', alt = 'Long Relation' }) {
  const src = `/brand/${wordOnly ? 'wordmark' : 'logo'}-${tone}.png`;
  const ratio = wordOnly ? 1051 / 372 : 1663 / 445;
  return <img src={src} alt={alt} width={Math.round(height * ratio)} height={height} className={`brand_logo ${className}`} draggable="false" />;
}

export const Check = (p) => (
  <svg {...S(p)} viewBox="0 0 24 24" stroke="none" fill="currentColor"><path d="M12 1.5l2.4 1.8 3-.1.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.1L12 22.5l-2.4-1.8-3 .1-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .1z" /><path d="M8 12.2l2.6 2.6L16.2 9" stroke="#0a0a0a" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Arrow = (p) => (<svg {...S(p)} strokeWidth={2}><path d="M4 12h15M13 6l6 6-6 6" /></svg>);
export const ArrowUp = (p) => (<svg {...S(p)} strokeWidth={2}><path d="M6 15l6-6 6 6" /></svg>);
export const ArrowLeft = (p) => (<svg {...S(p)} strokeWidth={2}><path d="M20 12H5M11 6l-6 6 6 6" /></svg>);
export const Play = (p) => (<svg {...S(p)}><circle cx="12" cy="12" r="10" /><path d="M10 8.5v7l6-3.5z" fill="currentColor" /></svg>);
export const Phone = (p) => (<svg {...S(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" /><path d="M15 3a6 6 0 016 6M15 7a2 2 0 012 2" /></svg>);

export const ServiceIcon = ({ name, size = 64 }) => {
  const p = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (name === 'mobile') return (<svg {...p}><rect x="20" y="6" width="24" height="46" rx="4" /><path d="M29 11h6M28 31l-4-4 4-4M36 23l4 4-4 4M33 21l-2 12" /><circle cx="12" cy="30" r="6" strokeDasharray="3 3" /><circle cx="52" cy="38" r="6" strokeDasharray="3 3" /><path d="M32 46v0" strokeWidth="3" /></svg>);
  if (name === 'game') return (<svg {...p}><rect x="6" y="14" width="40" height="28" rx="3" /><path d="M2 46h48M18 28h8M22 24v8M34 27v0M38 31v0" /><path d="M50 20h10v24H50z" /><path d="M53 38h4" /></svg>);
  if (name === 'megaphone') return (<svg {...p}><path d="M10 26v12h8l18 10V16L18 26z" /><path d="M42 24a10 10 0 010 16M14 38l4 14h6l-3-14" /><rect x="40" y="4" width="10" height="10" rx="2" /><circle cx="54" cy="24" r="4" /><path d="M48 50l8 6" /></svg>);
  return (<svg {...p}><path d="M32 6l22 12v28L32 58 10 46V18z" /><path d="M10 18l22 12 22-12M32 30v28" /><path d="M21 12l22 12" strokeDasharray="3 3" /></svg>);
};

export const Social = ({ name, size = 18 }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
  if (name === 'linkedin') return (<svg {...p}><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.5h4V21H3zM10 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" /></svg>);
  if (name === 'x') return (<svg {...p}><path d="M17.5 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.8L4.3 21H1l7.7-8.8L.6 3h6.8l4.7 6.2zm-1.2 16.1h1.8L6.4 4.8H4.5z" /></svg>);
  if (name === 'facebook') return (<svg {...p}><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2A21 21 0 0014.6 2C12.2 2 10.6 3.5 10.6 6.2v2.3H8v3.3h2.6V22H14V11.8h2.6l.4-3.3z" /></svg>);
  return (<svg {...p} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>);
};
