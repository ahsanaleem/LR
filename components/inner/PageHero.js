import Link from 'next/link';
import Media from '../ui/Media';
import SplitTitle from './SplitTitle';
import { MARK_POLYS } from '../ui/Icons';
import { getContent, lp } from '@/lib/i18n';

// Inner-page header.
// With `media`: framed HUD panel + floating `chips` + rotating stamp. Without: giant outlined ghost title.
// `strip`: keywords for the slanted marquee along the bottom edge.
export default function PageHero({ lang, trail, eyebrow, title, lead, media, chips = [], strip = [], children }) {
  const { ui } = getContent(lang);
  const long = title.length > 34;
  // long titles (blog posts, case studies) put their section name in the ghost instead of a stray first word
  const ghost = long && trail.length > 2 ? trail[trail.length - 2][0] : title;
  const words = [...new Set(strip)]; // offerings and stack can overlap (e.g. React Native)
  const ring = 'LONG RELATION · AI PRODUCT STUDIO · LONG RELATION · AI PRODUCT STUDIO · ';
  return (
    <section className={`pg_hero ${media ? 'has_media' : 'no_media'} ${words.length ? 'has_strip' : ''}`}>
      <div className="pg_bg" aria-hidden="true">
        <span className="pg_orb o1" />
        <span className="pg_orb o2" />
        <span className="pg_grid" />
        {media
          ? <svg className="pg_bg_mark" viewBox="100 300 480 480">{MARK_POLYS.map((p) => <polygon key={p} points={p} />)}</svg>
          : <span className="pg_ghost">{ghost}</span>}
      </div>

      <div className="container pg_hero_grid">
        <div className="pg_copy">
          <nav aria-label={ui.breadcrumb}>
            <ol className="crumbs">
              {trail.map(([name, path], i) => (
                <li key={path}>{i < trail.length - 1 ? <Link href={lp(lang, path)}>{name}</Link> : <span aria-current="page">{name}</span>}</li>
              ))}
            </ol>
          </nav>
          {eyebrow && <p className="pg_eyebrow"><i aria-hidden="true" />{eyebrow}</p>}
          <SplitTitle as="h1" className={`pg_h1 ${long ? 'is_long' : ''}`} text={title} onLoad accentLast />
          {lead && <p className="pg_lead">{lead}</p>}
          {children && <div className="pg_actions">{children}</div>}
        </div>

        {media && (
          <div className="pg_visual">
            <div className="pg_media">
              <Media media={media} />
              <span className="pg_scan" aria-hidden="true" />
              <span className="hud tl" aria-hidden="true" /><span className="hud tr" aria-hidden="true" />
              <span className="hud bl" aria-hidden="true" /><span className="hud br" aria-hidden="true" />
            </div>
            {chips.slice(0, 3).map((c, i) => <span className={`pg_chip c${i + 1}`} key={c} aria-hidden="true"><i />{c}</span>)}
            <div className="pg_stamp" aria-hidden="true">
              <svg viewBox="0 0 200 200">
                <defs><path id="pgRing" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
                <text><textPath href="#pgRing">{ring}</textPath></text>
              </svg>
              <svg className="pg_stamp_mark" viewBox="100 300 480 480">{MARK_POLYS.map((p) => <polygon key={p} points={p} />)}</svg>
            </div>
          </div>
        )}
      </div>

      {words.length > 0 && (
        <div className="pg_strip" aria-hidden="true" dir="ltr">
          <div className="pg_strip_track">
            {[0, 1].map((k) => (
              <div className="pg_strip_row" key={k}>
                {words.map((s) => <span key={s}>{s}<i>✦</i></span>)}
              </div>
            ))}
          </div>
        </div>
      )}
      {!words.length && <span className="pg_scroll" aria-hidden="true"><i /></span>}
    </section>
  );
}
