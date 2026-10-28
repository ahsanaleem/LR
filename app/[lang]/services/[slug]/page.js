import Link from 'next/link';
import { notFound } from 'next/navigation';
import InnerShell from '@/components/global/InnerShell';
import PageHero from '@/components/inner/PageHero';
import CtaBand from '@/components/inner/CtaBand';
import SplitTitle from '@/components/inner/SplitTitle';
import Marquee from '@/components/inner/Marquee';
import QuoteButton from '@/components/ui/QuoteButton';
import { getContent, langs, lp } from '@/lib/i18n';
import { JsonLd, abs, breadcrumbLd, orgRef, pageMeta } from '@/lib/seo';
import { Arrow } from '@/components/ui/Icons';
import { techIcon } from '@/components/ui/TechIcon';
import { offeringIcons } from '@/content/stackIcons';

export const dynamicParams = false;
export function generateStaticParams() {
  return langs.flatMap((lang) => getContent(lang).servicePages.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const s = getContent(lang).servicePages.find((x) => x.slug === slug);
  return s ? pageMeta(lang, { path: `/services/${s.slug}`, title: s.metaTitle, description: s.metaDescription }) : {};
}

export default async function ServicePage({ params }) {
  const { lang, slug } = await params;
  const { servicePages, servicesIndex, featured, blog, ui } = getContent(lang);
  const s = servicePages.find((x) => x.slug === slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const trail = [[ui.home, '/'], [servicesIndex.title, '/services'], [s.name, path]];
  const work = s.work.map((w) => featured.items.find((p) => p.slug === w)).filter(Boolean);
  const articles = blog.posts.filter((p) => p.service === s.slug);
  const others = servicePages.filter((o) => o.slug !== s.slug);
  const icons = offeringIcons[s.slug] || [];

  return (
    <InnerShell lang={lang}>
      <JsonLd graph={[
        breadcrumbLd(trail, lang),
        {
          '@type': 'Service',
          '@id': `${abs(path, lang)}#service`,
          name: s.h1,
          serviceType: s.name,
          description: s.metaDescription,
          url: abs(path, lang),
          inLanguage: lang,
          provider: orgRef,
          areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
          hasOfferCatalog: { '@type': 'OfferCatalog', name: s.name, itemListElement: s.offerings.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.title, description: o.text } })) },
        },
        { '@type': 'FAQPage', inLanguage: lang, mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      ]} />

      <PageHero lang={lang} trail={trail} eyebrow={ui.servicesEyebrow} title={s.h1} lead={s.lead} media={s.media}
        chips={s.offerings.map((o) => o.title)} strip={[...s.offerings.map((o) => o.title), ...s.stack]}>
        <QuoteButton />
        <Link className="btn btn_ghost" href={lp(lang, '/work')}>{ui.seeWork} <Arrow size={18} /></Link>
      </PageHero>

      <section className="pg_section">
        <div className="container pg_split">
          <SplitTitle className="pg_h2" text={ui.approach(s.name)} />
          <div className="prose">{s.overview.map((p) => <p key={p}>{p}</p>)}</div>
        </div>
      </section>

      <section className="pg_section">
        <div className="container">
          <SplitTitle className="pg_h2" text={ui.offer} />
          <div className="card_grid bento">
            {s.offerings.map((o, i) => (
              <div className="card" key={o.title}>
                <span className="card_num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="card_title">{o.title}</h3>
                <p>{o.text}</p>
                {icons[i] && (
                  <ul className="card_stack" style={{ '--n': icons[i].length }}>
                    {icons[i].map(techIcon).filter(Boolean).map((t, k) => (
                      <li key={t.title} style={{ '--brand': t.color, '--i': k }}>
                        <span className="tile" data-name={t.title}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={t.path} /></svg></span>
                        <span className="sr_only">{t.title}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg_section">
        <div className="container">
          <SplitTitle className="pg_h2" text={ui.howWeWork} />
          <div className="steps_wrap">
            <span className="steps_line" aria-hidden="true"><i /></span>
            <ol className="steps">
              {s.process.map((p) => <li key={p.title}><h3>{p.title}</h3><p>{p.text}</p></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="pg_section">
        <div className="container">
          <SplitTitle className="pg_h2" text={ui.tech} />
        </div>
        <Marquee items={s.stack} />
      </section>

      {work.length > 0 && (
        <section className="pg_section">
          <div className="container">
            <SplitTitle className="pg_h2" text={ui.relatedWork} />
            <div className="card_grid">
              {work.map((p) => (
                <Link className="card card_link work_card" href={lp(lang, `/work/${p.slug}`)} key={p.slug} style={{ '--from': p.from, '--to': p.to }}>
                  <small className="pg_eyebrow">{p.category} · {p.year}</small>
                  <h3 className="card_title">{p.name}</h3>
                  <p>{p.summary}</p>
                  <span className="more_link">{ui.readCase} <Arrow size={16} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pg_section">
        <div className="container pg_split">
          <SplitTitle className="pg_h2" text={ui.faq} />
          <div className="faq">
            {s.faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {articles.length > 0 && (
        <section className="pg_section">
          <div className="container">
            <SplitTitle className="pg_h2" text={ui.blog.related} />
            <ul className="link_list">
              {articles.map((a) => <li key={a.slug}><Link href={lp(lang, `/blog/${a.slug}`)}>{a.title} <Arrow size={16} /></Link></li>)}
            </ul>
          </div>
        </section>
      )}

      <CtaBand lang={lang} title={ui.letsTalk(s.name)} />

      <section className="pg_section">
        <div className="container">
          <SplitTitle className="pg_h2" text={ui.moreServices} />
          <ul className="link_list">
            {others.map((o) => <li key={o.slug}><Link href={lp(lang, `/services/${o.slug}`)}>{o.h1} <Arrow size={16} /></Link></li>)}
          </ul>
        </div>
      </section>
    </InnerShell>
  );
}
