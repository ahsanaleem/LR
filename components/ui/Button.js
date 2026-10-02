import { SlashIcon } from './Icons';

/**
 * Pill button with a diagonal fill sweep on hover (CSS clip-path) and a slash icon.
 * Renders <a> when `href` is set, otherwise <button>.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  size,
  className = '',
  icon = true,
  type = 'button',
  innerRef,
  ...rest
}) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ''} ${className}`;
  // The slash icon rotates 45° on hover (GSAP via data-hover; see SiteProvider HoverFx).
  const hover = icon ? { 'data-hover': 'rotation:45', 'data-hover-target': '.btn__icon svg' } : {};
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          <SlashIcon size={12} />
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <a ref={innerRef} href={href} className={cls} {...hover} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={innerRef} type={type} className={cls} {...hover} {...rest}>
      {inner}
    </button>
  );
}
