// Product screenshots in phone / browser frames (same look as the homepage case-study cards).
export default function Screens({ kind, screens, eager = false }) {
  return (
    <div className={`case_gallery is_${kind}`}>
      {screens.map((s) =>
        kind === 'web' ? (
          <figure className="dev_web" key={s.src}>
            <div className="dev_bar"><i /><i /><i /><span>{s.label}</span></div>
            <img src={s.src} alt={s.alt || s.label} width={1488} height={730} loading={eager ? 'eager' : 'lazy'} decoding="async" />
          </figure>
        ) : (
          <figure className="dev_phone" key={s.src}>
            <span className="dev_notch" />
            <img src={s.src} alt={s.alt || s.label} width={400} height={868} loading={eager ? 'eager' : 'lazy'} decoding="async" />
          </figure>
        )
      )}
    </div>
  );
}
