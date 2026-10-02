/**
 * Card with three rounded corners and one 45° cut corner (clip-path).
 * The element background acts as the 1px border; ::before paints the fill.
 * corner: 'tr' | 'tl' | 'br' | 'bl'
 */
export default function ChamferCard({ as: Tag = 'div', cut, corner = 'tr', className = '', style, children, ...rest }) {
  return (
    <Tag
      className={`chamfer chamfer--${corner} ${className}`}
      style={cut != null ? { ...style, '--cut': typeof cut === 'number' ? `${cut}px` : cut } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
