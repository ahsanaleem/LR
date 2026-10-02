import { MARK_TOP, MARK_BOTTOM, MARK_VIEWBOX } from './Icons';

/**
 * The two-piece LR mark. `mark-top` is the R, `mark-bottom` is the L.
 * Pass `topRef` / `bottomRef` to animate the pieces (slide apart / lock together).
 * `assembled={false}` renders the pieces slightly apart along the 45° axis (static, no JS).
 */
export default function LogoMark({ className = '', topRef, bottomRef, assembled = true, title }) {
  const gap = assembled ? 0 : 40;
  return (
    <svg
      className={`logo-mark ${className}`}
      viewBox={MARK_VIEWBOX}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g ref={topRef} className="mark-top-g" transform={gap ? `translate(${gap} ${-gap})` : undefined}>
        <polygon className="mark-top" fill="currentColor" points={MARK_TOP} />
      </g>
      <g ref={bottomRef} className="mark-bottom-g" transform={gap ? `translate(${-gap} ${gap})` : undefined}>
        <polygon className="mark-bottom" fill="currentColor" points={MARK_BOTTOM} />
      </g>
    </svg>
  );
}
