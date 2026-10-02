// Inline SVG icon set. Decorative icons are aria-hidden; give the parent an aria-label.

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

export const MARK_TOP =
  '259.88 494.27 472.52 494.27 472.52 406.71 207.97 406.71 119.78 317.9 560.71 317.9 560.71 584.34 475.02 584.34 561.96 671.27 561.96 761.96 523.81 761.96 259.88 494.27';
export const MARK_BOTTOM =
  '474.4 761.96 384.02 671.58 206.09 671.58 206.09 442.36 116.97 353.24 116.97 761.96 474.4 761.96';
export const MARK_VIEWBOX = '116 317 447 446';

/** Small diagonal slash marker used in buttons and section indexes. */
export function SlashIcon({ size = 14, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M3 11 L11 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
      <path d="M5.5 3 H11 V8.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="square" />
    </svg>
  );
}

export function SlashMark({ className = '' }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M2 13 L12 1" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

export function CheckIcon({ className = '', size = 20 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <rect className="check__box" x="1" y="1" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path className="check__tick" d="M5.5 10.4 L8.6 13.4 L14.5 6.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
    </svg>
  );
}

export function PlayIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  );
}

export function PhoneIcon({ size = 22 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

export function ArrowUpIcon({ size = 16 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function ChevronIcon({ dir = 'right', size = 20 }) {
  return (
    <svg {...base} width={size} height={size} style={{ transform: dir === 'left' ? 'scaleX(-1)' : undefined }}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function CloseIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function StarIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
    </svg>
  );
}

/* Service line icons — every path has pathLength=1 so strokes can be drawn in. */
const serviceIcons = {
  mobile: (
    <>
      <rect x="14" y="4" width="20" height="40" rx="4" pathLength="1" />
      <path d="M21 9h6" pathLength="1" />
      <path d="M22 38h4" pathLength="1" />
      <path d="M4 18l6-6M4 26l10-10" pathLength="1" />
    </>
  ),
  game: (
    <>
      <path d="M12 16h24a8 8 0 0 1 8 8v4a8 8 0 0 1-14 5l-2-2h-8l-2 2A8 8 0 0 1 4 28v-4a8 8 0 0 1 8-8z" pathLength="1" />
      <path d="M14 22v8M10 26h8" pathLength="1" />
      <path d="M32 23l2 2M36 27l-2-2M30 29l2-2" pathLength="1" />
    </>
  ),
  growth: (
    <>
      <path d="M4 44h40" pathLength="1" />
      <path d="M6 36l10-10 8 6 16-18" pathLength="1" />
      <path d="M32 14h8v8" pathLength="1" />
    </>
  ),
  platform: (
    <>
      <path d="M24 4l18 10-18 10L6 14z" pathLength="1" />
      <path d="M6 24l18 10 18-10" pathLength="1" />
      <path d="M6 34l18 10 18-10" pathLength="1" />
    </>
  ),
};

export function ServiceIcon({ name, className = '' }) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {serviceIcons[name]}
    </svg>
  );
}

const socialPaths = {
  linkedin: 'M6.5 9.5v9M6.5 6v.01M10.5 18.5v-5a3 3 0 0 1 6 0v5M10.5 9.5v9',
  x: 'M5 5l14 14M19 5L5 19',
  facebook: 'M14 8h2V5h-2.5A3.5 3.5 0 0 0 10 8.5V11H8v3h2v6h3v-6h2.5l.5-3h-3V9a1 1 0 0 1 1-1z',
  instagram: 'M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17 6.8v.01',
};

export function SocialIcon({ id, size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d={socialPaths[id]} />
    </svg>
  );
}
