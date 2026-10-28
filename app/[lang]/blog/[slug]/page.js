import Link from 'next/link';
import { notFound } from 'next/navigation';
import InnerShell from '@/components/global/InnerShell';
import PageHero from '@/components/inner/PageHero';
import CtaBand from '@/components/inner/CtaBand';
import SplitTitle from '@/components/inner/SplitTitle';
import Toc from '@/components/inner/Toc';
import { formatDate, getContent, langs, lp } from '@/lib/i18n';
import { JsonLd, abs, breadcrumbLd, orgRef, pageMeta } from '@/lib/seo';
import { Arrow } from '@/components/ui/Icons';

export const dynamicParams = false;
export function generateStaticParams() {
  return langs.flatMap((lang) => getContent(lang).blog.posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const p = getContent(lang).blog.posts.find((x) => x.slug === slug);
  if (!p) return {};
  const meta = pageMeta(lang, { path: `/blog/${p.slug}`, title: p.title.length > 45 ? p.title : `${p.title} | Long Relation`, description: p.description });
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: p.date } };
}

// body blocks: ['h2', text] | ['p', text] | ['ul', [items]]; h2s get ids for the table of contents
function Block({ block: [type, value], id }) {
  if (type === 'h2') return <h2 id={id}>{value}</h2>;
  if (type === 'ul') return <ul className="tick_list">{value.map((li) => <li key={li}>{li}</li>)}</ul>;
  return <p>{value}</p>;
}

export default async function BlogPost({ params }) {
  const { lang, slug } = await params;
  const { blog, servicePages, ui } = getContent(lang);
  const p = blog.posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const trail = [[ui.home, '/'], [blog.index.title, '/blog'], [p.title, path]];
  const service = servicePages.find((s) => s.slug === p.service);
  const more = blog.posts.filter((x) => x.slug !== p.slug);
  const sectionId = (i) => `part-${i + 1}`;
  const toc = p.body.map((b, i) => [b, i]).filter(([b]) => b[0] === 'h2').map(([b, i]) => ({ id: sectionId(i), label: b[1] }));

  return (
    <InnerShell lang={lang}>
      <JsonLd graph={[
        breadcrumbLd(trail, lang),
        {
          '@type': 'BlogPosting',
          '@id': `${abs(path, lang)}#article`,
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.date,
          inLanguage: lang,
          url: abs(path, lang),
          mainEntityOfPage: abs(path, lang),
          image: abs('/og.jpg'),
          author: orgRef,
          publisher: orgRef,
          ...(service && { about: { '@type': 'Service', name: service.h1, url: abs(`/services/${service.slug}`, lang) } }),
        },
      ]} />

      <PageHero lang={lang} trail={trail} eyebrow={`${ui.blog.eyebrow} · ${ui.blog.minRead(p.readMins)}`} title={p.title} lead={p.excerpt} />

      <article className="pg_section">
        <div className="container with_toc">
          <Toc items={toc} label={ui.onThisPage} />
          <div className="article">
            <p className="article_meta">{ui.blog.published} <time dateTime={p.date}>{formatDate(p.date, lang)}</time> · Long Relation</p>
            <div className="prose article_body">{p.body.map((b, i) => <Block key={i} block={b} id={sectionId(i)} />)}</div>
            {service && (
              <aside className="article_cta">
                <p>{ui.blog.talk}</p>
                <Link className="more_link" href={lp(lang, `/services/${service.slug}`)}>{service.h1} <Arrow size={16} /></Link>
              </aside>
            )}
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="pg_section">
          <div className="container">
            <SplitTitle className="pg_h2" text={ui.blog.related} />
            <ul className="link_list">
              {more.map((m) => <li key={m.slug}><Link href={lp(lang, `/blog/${m.slug}`)}>{m.title} <Arrow size={16} /></Link></li>)}
              <li><Link href={lp(lang, '/blog')}>{ui.blog.allPosts} <Arrow size={16} /></Link></li>
            </ul>
          </div>
        </section>
      )}

      <CtaBand lang={lang} />
    </InnerShell>
  );
}
