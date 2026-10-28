// Endless ticker of chips (pure CSS animation). The list is doubled so the loop is seamless;
// the copy is hidden from screen readers. Pauses on hover and for reduced-motion users.
export default function Marquee({ items }) {
  const row = (hidden) => (
    <div className="mq_row" aria-hidden={hidden || undefined}>
      {items.map((t) => <span key={t}>{t}</span>)}
    </div>
  );
  return (
    <div className="marquee" dir="ltr">
      <div className="mq_track">{row(false)}{row(true)}</div>
    </div>
  );
}
