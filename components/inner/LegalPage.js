import InnerShell from '../global/InnerShell';
import PageHero from './PageHero';
import Toc from './Toc';
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
        <div className="container with_toc">
          <Toc items={[...doc.sections.map((s, i) => ({ id: `s${i + 1}`, label: s.h })), { id: 'contact-us', label: ui.contactHead }]} label={ui.onThisPage} />
          <div className="prose">
            {doc.sections.map((s, i) => (
              <section key={s.h} id={`s${i + 1}`}>
                <h2>{s.h}</h2>
                {s.p.map((p) => <p key={p}>{p}</p>)}
              </section>
            ))}
            <section id="contact-us">
              <h2>{ui.contactHead}</h2>
              <p>{ui.questions} <a href={`mailto:${brand.email}`}>{brand.email}</a></p>
            </section>
          </div>
        </div>
      </section>
    </InnerShell>
  );
}
