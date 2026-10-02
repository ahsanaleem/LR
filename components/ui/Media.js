'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { mountPlaceholder } from '@/lib/placeholder';
import { prefersReducedMotion } from '@/lib/gsap';

let seedCounter = 1;

/** Animated brand placeholder: navy gradient, drifting connected nodes, diagonal hatch, 45° light sweep. */
export function Placeholder({ label }) {
  const canvas = useRef(null);
  useEffect(() => mountPlaceholder(canvas.current, { seed: seedCounter++, still: prefersReducedMotion() }), []);
  return (
    <div className="ph" aria-hidden="true">
      <canvas ref={canvas} className="ph__canvas" />
      <span className="ph__hatch" />
      <span className="ph__sweep" />
      {label && <span className="ph__label">{label}</span>}
    </div>
  );
}

/**
 * Video, image or animated placeholder.
 * media = { video, poster } | { image } | {}
 * `.media__inner` is the element sections animate (scale / parallax) inside the `.media` mask.
 */
export default function Media({ media = {}, alt = '', label, ratio, className = '', sizes = '(max-width: 768px) 100vw, 50vw', priority = false, children, ...rest }) {
  return (
    <div className={`media ${className}`} style={ratio ? { aspectRatio: ratio } : undefined} {...rest}>
      <div className="media__inner">
        {media.video ? (
          <video className="media__el" src={media.video} poster={media.poster} autoPlay muted loop playsInline preload="metadata" />
        ) : media.image ? (
          <Image className="media__el" src={media.image} alt={alt} fill sizes={sizes} priority={priority} />
        ) : (
          <Placeholder label={label} />
        )}
      </div>
      {children}
    </div>
  );
}
