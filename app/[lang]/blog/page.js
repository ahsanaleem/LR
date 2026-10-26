import Link from 'next/link';
import InnerShell from '@/components/global/InnerShell';
import PageHero from '@/components/inner/PageHero';
import CtaBand from '@/components/inner/CtaBand';
import { formatDate, getContent, lp } from '@/lib/i18n';
import { JsonLd, abs, breadcrumbLd, orgRef, pageMeta } from '@/lib/seo';
import { Arrow } from '@/components/ui/Icons';

const path = '/blog';

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  const { index } = getContent(lang).blog;
  return pageMeta(lang, { path, title: index.metaTitle, description: index.metaDescription });
}

export default async function BlogIndex({ params }) {
  const { lang } = await params;
  const { blog, ui } = getContent(lang);
  const trail = [[ui.home, '/'], [blog.index.title, path]];
  return (
    <InnerShell lang={lang}>
      <JsonLd graph={[
        breadcrumbLd(trail, lang),
        {
          '@type': 'Blog',
          '@id': `${abs(path, lang)}#blog`,
          name: blog.index.title,
          url: abs(path, lang),
          inLanguage: lang,
          publisher: orgRef,
          blogPost: blog.posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: abs(`/blog/${p.slug}`, lang), datePublished: p.date })),
        },
      ]} />
      <PageHero lang={lang} trail={trail} eyebrow={ui.blog.eyebrow} title={blog.index.title} lead={blog.index.lead} />
      <section className="pg_section">
        <div className="container post_list">
          {blog.posts.map((p) => (
            <Link className="post_card" href={lp(lang, `/blog/${p.slug}`)} key={p.slug}>
              <small className="pg_eyebrow"><time dateTime={p.date}>{formatDate(p.date, lang)}</time> · {ui.blog.minRead(p.readMins)}</small>
              <h2 className="card_title">{p.title}</h2>
              <p>{p.excerpt}</p>
              <span className="more_link">{ui.blog.readMore} <Arrow size={16} /></span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand lang={lang} />
    </InnerShell>
  );
}
