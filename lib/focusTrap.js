'use client';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Traps Tab focus inside `container`. Returns a cleanup that restores focus to the previously focused element. */
export function trapFocus(container, { initial, returnTo } = {}) {
  const previous = returnTo || document.activeElement;
  const items = () => [...container.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement);

  const onKey = (e) => {
    if (e.key !== 'Tab') return;
    const list = items();
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  document.addEventListener('keydown', onKey);
  requestAnimationFrame(() => (initial || items()[0])?.focus({ preventScroll: true }));

  return () => {
    document.removeEventListener('keydown', onKey);
    if (previous && typeof previous.focus === 'function') previous.focus({ preventScroll: true });
  };
}
