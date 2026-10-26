import InnerShell from '../global/InnerShell';
import PageHero from './PageHero';
import { getContent } from '@/lib/i18n';
import { JsonLd, breadcrumbLd } from '@/lib/seo';

export default function LegalPage({ lang, docKey, path }) {
  const { brand, legal, ui } = getContent(lang);
  const doc = legal[docKey];
  const trail = [[ui.home, '/'], [doc.title, path]];
  return (
    <InnerShell lang={lang}>
      <JsonLd graph={[breadcrumbLd(trail, lang)]} />
      <PageHero lang={lang} trail={trail} title={doc.title} lead={`${ui.lastUpdated}: ${legal.updated}`} />
      <section className="pg_section legal">
        <div className="container prose">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}
          <section>
            <h2>{ui.contactHead}</h2>
            <p>{ui.questions} <a href={`mailto:${brand.email}`}>{brand.email}</a></p>
          </section>
        </div>
      </section>
    </InnerShell>
  );
}
