import WebScreens from './WebScreens';

// Product screenshots in phone / browser frames (same look as the homepage case-study cards).
export default function Screens({ kind, screens, eager = false }) {
  if (kind === 'web') return <WebScreens screens={screens} eager={eager} />;
  return (
    <div className={`case_gallery is_${kind}`}>
      {screens.map((s) => (
        <figure className="dev_phone" key={s.src}>
          <span className="dev_notch" />
          <img src={s.src} alt={s.alt || s.label} width={400} height={868} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        </figure>
      ))}
    </div>
  );
}
