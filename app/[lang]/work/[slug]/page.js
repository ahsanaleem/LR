import Link from 'next/link';
import { notFound } from 'next/navigation';
import InnerShell from '@/components/global/InnerShell';
import PageHero from '@/components/inner/PageHero';
import CtaBand from '@/components/inner/CtaBand';
import SplitTitle from '@/components/inner/SplitTitle';
import Screens from '@/components/inner/Screens';
import QuoteButton from '@/components/ui/QuoteButton';
import { getContent, langs, lp } from '@/lib/i18n';
import { JsonLd, abs, breadcrumbLd, orgRef, pageMeta } from '@/lib/seo';
import { Arrow } from '@/components/ui/Icons';

export const dynamicParams = false;
export function generateStaticParams() {
  return langs.flatMap((lang) => getContent(lang).featured.items.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const { featured, ui } = getContent(lang);
  const p = featured.items.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta(lang, { path: `/work/${p.slug}`, title: `${p.name}: ${p.tagline} | Long Relation`, description: `${p.summary} ${ui.caseSuffix}` });
}

export default async function CaseStudyPage({ params }) {
  const { lang, slug } = await params;
  const { featured, servicePages, workIndex, ui } = getContent(lang);
  const items = featured.items;
  const p = items.find((x) => x.slug === slug);
  if (!p) notFound();
  const path = `/work/${p.slug}`;
  const trail = [[ui.home, '/'], [workIndex.title, '/work'], [p.name, path]];
  const services = p.services.map((s) => servicePages.find((x) => x.slug === s)).filter(Boolean);
  const next = items[(items.indexOf(p) + 1) % items.length];

  return (
    <InnerShell lang={lang}>
      <JsonLd graph={[
        breadcrumbLd(trail, lang),
        {
          '@type': 'CreativeWork',
          '@id': `${abs(path, lang)}#work`,
          name: `${p.name}: ${p.tagline}`,
          headline: `${p.name}: ${p.tagline}`,
          abstract: p.summary,
          genre: p.category,
          dateCreated: p.year,
          inLanguage: lang,
          url: abs(path, lang),
          image: p.screens.map((s) => abs(s.src)),
          keywords: p.tags.join(', '),
          creator: orgRef,
        },
      ]} />

      <PageHero lang={lang} trail={trail} eyebrow={`${p.category} · ${p.year}`} title={`${p.name}: ${p.tagline}`} lead={p.summary} strip={[p.name, p.platforms, ...p.tags, p.category]}>
        <QuoteButton>{ui.startSimilar}</QuoteButton>
        {p.url && <a className="btn btn_ghost" href={p.url} target="_blank" rel="noopener">{ui.visitSite} <Arrow size={18} /></a>}
      </PageHero>

      <section className="pg_section case_page" style={{ '--from': p.from, '--to': p.to }}>
        <div className="container">
          <Screens kind={p.kind} screens={p.screens} eager />
        </div>
      </section>

      <section className="pg_section">
        <div className="container pg_split">
          <SplitTitle className="pg_h2" text={ui.theProject} />
          <div className="prose">{p.description.map((d) => <p key={d}>{d}</p>)}</div>
        </div>
      </section>

      <section className="pg_section">
        <div className="container pg_split">
          <SplitTitle className="pg_h2" text={ui.whatWeBuilt} />
          <ul className="tick_list">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      </section>

      <section className="pg_section">
        <div className="container pg_split">
          <SplitTitle className="pg_h2" text={ui.platformsTech} />
          <div>
            <p className="pg_lead">{p.platforms}</p>
            <div className="chips" dir="ltr">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className="pg_section">
          <div className="container">
            <SplitTitle className="pg_h2" text={ui.servicesBehind} />
            <ul className="link_list">
              {services.map((s) => <li key={s.slug}><Link href={lp(lang, `/services/${s.slug}`)}>{s.h1} <Arrow size={16} /></Link></li>)}
            </ul>
          </div>
        </section>
      )}

      <CtaBand lang={lang} title={ui.haveProduct} />

      <section className="pg_section">
        <div className="container next_case">
          <Link href={lp(lang, `/work/${next.slug}`)} className="next_card" style={{ '--from': next.from, '--to': next.to }}>
            <span className="next_ghost" aria-hidden="true">{next.name}</span>
            <span className="next_copy">
              <span className="next_kicker"><i aria-hidden="true" />{ui.nextCase} · {String(items.indexOf(next) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
              <span className="next_name">{next.name}</span>
              <span className="next_tag">{next.tagline}</span>
              <span className="next_meta">{next.category.includes(next.platforms) ? next.category : `${next.category} · ${next.platforms}`}</span>
              <span className="next_cta"><span className="next_go"><Arrow size={24} /></span>{ui.readCase}</span>
            </span>
            <span className={`next_shots is_${next.kind}`} aria-hidden="true">
              {next.screens.slice(0, 2).map((s) => <img key={s.src} src={s.src} alt="" loading="lazy" decoding="async" />)}
            </span>
          </Link>
        </div>
      </section>
    </InnerShell>
  );
}
