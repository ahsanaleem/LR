'use client';

import { gsap } from './gsap';

/** 45° diagonal reveal: a triangle opens from the top-right (cut) corner until it covers the box. */
export const DIAG_FROM = 'polygon(100% 0%, 100% 0%, 100% 0%)';
export const DIAG_TO = 'polygon(-110% 0%, 100% 0%, 100% 210%)';

export function diagonalReveal(targets, vars = {}) {
  return gsap.fromTo(
    targets,
    { clipPath: DIAG_FROM },
    {
      clipPath: DIAG_TO,
      duration: 1.2,
      ease: 'power3.inOut',
      clearProps: 'clipPath',
      ...vars,
    }
  );
}

/**
 * Section top-edge wipe. The section overlaps the previous one (see `.wipe` in CSS)
 * and its top edge is a diagonal that flattens out as the section scrolls into view.
 */
export function sectionWipe(section, reduced) {
  if (!section) return;
  if (reduced) return;
  // The overlap is set in CSS as a negative margin; the diagonal spans exactly that height.
  const h = Math.abs(parseFloat(getComputedStyle(section).marginTop)) || 120;
  gsap.fromTo(
    section,
    { clipPath: `polygon(0% ${h}px, 100% 0px, 100% 100%, 0% 100%)` },
    {
      clipPath: 'polygon(0% 0px, 100% 0px, 100% 100%, 0% 100%)',
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 35%', scrub: true },
    }
  );
}

/** Staggered fade-up for a set of elements when `trigger` reaches 85% of the viewport. */
export function fadeUp(targets, trigger, vars = {}) {
  return gsap.fromTo(
    targets,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: trigger || targets, start: 'top 85%', once: true },
      ...vars,
    }
  );
}

/** Count a number up inside `el`. */
export function countUp(el, value, { decimals = 0, suffix = '', duration = 2, ease = 'power3.out', ...rest } = {}) {
  const obj = { v: 0 };
  const fmt = (v) => v.toFixed(decimals) + suffix;
  el.textContent = fmt(0);
  return gsap.to(obj, {
    v: value,
    duration,
    ease,
    onUpdate: () => (el.textContent = fmt(obj.v)),
    ...rest,
  });
}
