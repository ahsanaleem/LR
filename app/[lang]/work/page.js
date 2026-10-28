import Link from 'next/link';
import InnerShell from '@/components/global/InnerShell';
import PageHero from '@/components/inner/PageHero';
import CtaBand from '@/components/inner/CtaBand';
import { getContent, lp } from '@/lib/i18n';
import { JsonLd, abs, breadcrumbLd, pageMeta } from '@/lib/seo';
import { Arrow } from '@/components/ui/Icons';

const path = '/work';

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  const { workIndex } = getContent(lang);
  return pageMeta(lang, { path, title: workIndex.metaTitle, description: workIndex.metaDescription });
}

export default async function WorkIndex({ params }) {
  const { lang } = await params;
  const { workIndex, featured, ui } = getContent(lang);
  const trail = [[ui.home, '/'], [workIndex.title, path]];
  return (
    <InnerShell lang={lang}>
      <JsonLd graph={[
        breadcrumbLd(trail, lang),
        { '@type': 'ItemList', itemListElement: featured.items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/work/${p.slug}`, lang), name: p.name })) },
      ]} />
      <PageHero lang={lang} trail={trail} eyebrow={ui.caseStudies} title={workIndex.title} lead={workIndex.lead} strip={featured.items.flatMap((p) => [p.name, p.category])} />
      <section className="pg_section">
        <div className="container work_list">
          {featured.items.map((p) => (
            <Link className="work_row" href={lp(lang, `/work/${p.slug}`)} key={p.slug} style={{ '--from': p.from, '--to': p.to }}>
              <div className="work_row_text">
                <small className="pg_eyebrow">{p.category} · {p.year} · {p.platforms}</small>
                <h2 className="card_title">{p.name}</h2>
                <p className="work_tagline">{p.tagline}</p>
                <p>{p.summary}</p>
                <div className="chips" dir="ltr">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <span className="more_link">{ui.readCase} <Arrow size={16} /></span>
              </div>
              <div className={`work_row_img is_${p.kind}`}>
                <img src={p.screens[0].src} alt={p.screens[0].alt} width={p.kind === 'web' ? 1488 : 400} height={p.kind === 'web' ? 730 : 868} loading="lazy" decoding="async" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand lang={lang} title={ui.haveProduct} />
    </InnerShell>
  );
}
