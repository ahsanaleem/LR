'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap';

/*
 * Animated stack logos (inline SVG + GSAP), drawn as simplified marks.
 * Each loops while on screen, speeds up on card hover, and shows a still frame with reduced motion.
 * A card can use a real GIF instead: set `gif: '/media/stack/name.gif'` on it in content/site.js.
 */

const svgProps = { viewBox: '0 0 80 80', width: 80, height: 80, fill: 'none', 'aria-hidden': true, focusable: 'false' };

function Unity() {
  return (
    <svg {...svgProps}>
      <polygon className="u-top" points="40,8 67,23.5 40,39 13,23.5" fill="#f2fbfd" />
      <polygon className="u-left" points="11,28 37,43 37,73 11,58" fill="#f2fbfd" opacity="0.72" />
      <polygon className="u-right" points="43,43 69,28 69,58 43,73" fill="#f2fbfd" opacity="0.46" />
      <polygon className="u-glint" points="40,8 67,23.5 40,39 13,23.5" fill="#0ac4e0" opacity="0" />
    </svg>
  );
}

function Unreal() {
  return (
    <svg {...svgProps}>
      <circle className="ue-ring" cx="40" cy="40" r="32" stroke="#f2fbfd" strokeWidth="3" pathLength="1" />
      <circle className="ue-arc" cx="40" cy="40" r="32" stroke="#0ac4e0" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="14 86" />
      <path className="ue-u" d="M28 24 V42 a12 12 0 0 0 24 0 V24" stroke="#f2fbfd" strokeWidth="5.5" strokeLinecap="round" pathLength="1" />
    </svg>
  );
}

function Flutter() {
  return (
    <svg {...svgProps}>
      <polygon className="fl-a" points="50,6 66,6 24,48 16,40" fill="#54c5f8" />
      <polygon className="fl-b" points="50,36 66,36 41,61 33,53" fill="#54c5f8" />
      <polygon className="fl-c" points="41,61 49,53 67,72 51,72" fill="#01579b" />
      <polygon className="fl-d" points="41,61 49,53 53,57 45,65" fill="#29b6f6" opacity="0.8" />
    </svg>
  );
}

function ReactLogo() {
  return (
    <svg {...svgProps}>
      <g className="re-spin">
        {[0, 60, 120].map((r) => (
          <g key={r} transform={`rotate(${r} 40 40)`}>
            <ellipse cx="40" cy="40" rx="33" ry="12.5" stroke="#61dafb" strokeWidth="2.4" opacity="0.85" />
            <ellipse className="re-comet" cx="40" cy="40" rx="33" ry="12.5" stroke="#e8fbff" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="8 92" />
          </g>
        ))}
      </g>
      <circle className="re-core" cx="40" cy="40" r="6" fill="#61dafb" />
    </svg>
  );
}

function NextLogo() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="nx-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.35" stopColor="#f2fbfd" />
          <stop offset="1" stopColor="#f2fbfd" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle className="nx-disc" cx="40" cy="40" r="33" fill="#000" stroke="rgba(242,251,253,.35)" strokeWidth="1.5" />
      <path className="nx-l" d="M29 55 V25" stroke="#f2fbfd" strokeWidth="4.5" strokeLinecap="square" pathLength="1" />
      <path className="nx-d" d="M29 25 L57 63" stroke="url(#nx-fade)" strokeWidth="4.5" pathLength="1" />
      <path className="nx-r" d="M51 25 V46" stroke="#f2fbfd" strokeWidth="4.5" strokeLinecap="square" pathLength="1" />
    </svg>
  );
}

function AILogo() {
  const outer = [
    [40, 9],
    [67, 24],
    [67, 56],
    [40, 71],
    [13, 56],
    [13, 24],
  ];
  return (
    <svg {...svgProps}>
      {outer.map(([x, y], i) => (
        <g key={i}>
          <path d={`M40 40 L${x} ${y}`} stroke="rgba(10,196,224,.35)" strokeWidth="1.4" />
          <path className="ai-signal" d={`M40 40 L${x} ${y}`} stroke="#6fe6f7" strokeWidth="2.2" strokeLinecap="round" pathLength="100" strokeDasharray="18 182" strokeDashoffset="18" />
          <path d={`M${x} ${y} L${outer[(i + 1) % 6][0]} ${outer[(i + 1) % 6][1]}`} stroke="rgba(10,196,224,.2)" strokeWidth="1.2" />
        </g>
      ))}
      {outer.map(([x, y], i) => (
        <circle key={i} className="ai-node" cx={x} cy={y} r="4" fill="#0ac4e0" />
      ))}
      <g className="ai-core">
        <path d="M40 29 C41.5 36 44 38.5 51 40 C44 41.5 41.5 44 40 51 C38.5 44 36 41.5 29 40 C36 38.5 38.5 36 40 29 Z" fill="#f2fbfd" />
      </g>
    </svg>
  );
}

const ICONS = { unity: Unity, unreal: Unreal, flutter: Flutter, react: ReactLogo, next: NextLogo, ai: AILogo };

/** Builds a looping timeline for each logo. Returns the timeline. */
function build(name, q) {
  const tl = gsap.timeline({ repeat: -1, paused: true });
  switch (name) {
    case 'unity':
      // Three faces drift apart and lock back together — the same "parts joining" idea as the LR mark.
      tl.to(q('.u-top'), { y: -6, duration: 0.8, ease: 'power2.inOut' })
        .to(q('.u-left'), { x: -5, y: 3, duration: 0.8, ease: 'power2.inOut' }, '<')
        .to(q('.u-right'), { x: 5, y: 3, duration: 0.8, ease: 'power2.inOut' }, '<')
        .to(q('.u-top, .u-left, .u-right'), { x: 0, y: 0, duration: 0.7, ease: 'back.out(2.2)' }, '+=0.4')
        .fromTo(q('.u-glint'), { opacity: 0 }, { opacity: 0.55, duration: 0.25, yoyo: true, repeat: 1 }, '-=0.15')
        .to({}, { duration: 1.2 });
      break;
    case 'unreal':
      tl.fromTo(q('.ue-ring'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' })
        .fromTo(q('.ue-u'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, '-=0.4')
        .fromTo(q('.ue-arc'), { strokeDashoffset: 100, opacity: 1 }, { strokeDashoffset: -100, duration: 1.6, ease: 'power1.inOut' }, '-=0.2')
        .to(q('.ue-arc'), { opacity: 0, duration: 0.2 })
        .to({}, { duration: 0.8 });
      break;
    case 'flutter':
      tl.fromTo(q('.fl-a'), { x: 14, y: -14, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' })
        .fromTo(q('.fl-b'), { x: 14, y: -14, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, '-=0.35')
        .fromTo(q('.fl-c, .fl-d'), { x: -10, y: -10, opacity: 0 }, { x: 0, y: 0, opacity: (i) => (i ? 0.8 : 1), duration: 0.6, ease: 'expo.out' }, '-=0.35')
        .to({}, { duration: 1.6 })
        .to(q('.fl-a, .fl-b, .fl-c, .fl-d'), { opacity: 0, x: -8, y: 8, duration: 0.45, ease: 'power2.in', stagger: 0.06 });
      break;
    case 'react':
      tl.to(q('.re-spin'), { rotation: 360, svgOrigin: '40 40', duration: 12, ease: 'none' }, 0)
        .fromTo(q('.re-core'), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.35, duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: 14 }, 0);
      q('.re-comet').forEach((c, i) => tl.fromTo(c, { strokeDashoffset: 100 - i * 33 }, { strokeDashoffset: -i * 33, duration: 2, ease: 'none', repeat: 5 }, 0));
      break;
    case 'next':
      tl.set(q('.nx-l, .nx-d, .nx-r'), { strokeDasharray: 1, strokeDashoffset: 1 })
        .fromTo(q('.nx-disc'), { scale: 0.85, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, ease: 'back.out(2)' })
        .to(q('.nx-l'), { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' })
        .to(q('.nx-d'), { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' })
        .to(q('.nx-r'), { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, '-=0.25')
        .to({}, { duration: 1.6 })
        .to(q('.nx-l, .nx-d, .nx-r'), { strokeDashoffset: -1, duration: 0.45, ease: 'power2.in', stagger: 0.06 });
      break;
    case 'ai':
      tl.to(q('.ai-core'), { rotation: 90, scale: 1.15, svgOrigin: '40 40', duration: 1, ease: 'power2.inOut', yoyo: true, repeat: 1 }, 0);
      q('.ai-signal').forEach((s, i) => tl.fromTo(s, { strokeDashoffset: 18 }, { strokeDashoffset: -100, duration: 0.9, ease: 'power1.in' }, i * 0.28));
      q('.ai-node').forEach((n, i) => tl.fromTo(n, { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.6, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, i * 0.28 + 0.75));
      tl.to({}, { duration: 0.4 });
      break;
  }
  return tl;
}

/** Hovering the surrounding `.xcard` speeds the loop up. */
export default function StackIcon({ name, gif, alt = '', className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (gif) return;
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = build(name, q);
        const st = ScrollTrigger.create({ trigger: ref.current, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? tl.play() : tl.pause()) });
        const card = ref.current.closest('.xcard');
        const fast = () => gsap.to(tl, { timeScale: 2.2, duration: 0.4 });
        const slow = () => gsap.to(tl, { timeScale: 1, duration: 0.6 });
        card?.addEventListener('pointerenter', fast);
        card?.addEventListener('pointerleave', slow);
        return () => {
          st.kill();
          card?.removeEventListener('pointerenter', fast);
          card?.removeEventListener('pointerleave', slow);
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [name, gif] }
  );

  if (gif) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={`stack-icon stack-icon--gif ${className}`} src={gif} alt={alt} width={80} height={80} loading="lazy" />;
  }
  const Icon = ICONS[name];
  return (
    <span ref={ref} className={`stack-icon ${className}`} aria-hidden="true">
      {Icon ? <Icon /> : null}
    </span>
  );
}
