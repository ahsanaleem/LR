import Link from 'next/link';
import Media from '../ui/Media';
import { getContent, lp } from '@/lib/i18n';

// Inner-page header: breadcrumb trail, eyebrow, H1, lead, actions and optional media.
export default function PageHero({ lang, trail, eyebrow, title, lead, media, children }) {
  const { ui } = getContent(lang);
  return (
    <section className="pg_hero">
      <div className={`container pg_hero_grid ${media ? 'has_media' : ''}`}>
        <div>
          <nav aria-label={ui.breadcrumb}>
            <ol className="crumbs">
              {trail.map(([name, path], i) => (
                <li key={path}>{i < trail.length - 1 ? <Link href={lp(lang, path)}>{name}</Link> : <span aria-current="page">{name}</span>}</li>
              ))}
            </ol>
          </nav>
          {eyebrow && <p className="pg_eyebrow">{eyebrow}</p>}
          <h1 className="pg_h1">{title}</h1>
          {lead && <p className="pg_lead">{lead}</p>}
          {children && <div className="pg_actions">{children}</div>}
        </div>
        {media && <div className="pg_media"><Media media={media} /></div>}
      </div>
    </section>
  );
}
