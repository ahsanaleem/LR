import InnerShell from '@/components/global/InnerShell';
import PageHero from '@/components/inner/PageHero';
import CtaBand from '@/components/inner/CtaBand';
import ServiceList from '@/components/inner/ServiceList';
import { getContent, lp } from '@/lib/i18n';
import { JsonLd, abs, breadcrumbLd, pageMeta } from '@/lib/seo';

const path = '/services';

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  const { servicesIndex } = getContent(lang);
  return pageMeta(lang, { path, title: servicesIndex.metaTitle, description: servicesIndex.metaDescription });
}

export default async function ServicesIndex({ params }) {
  const { lang } = await params;
  const { servicePages, servicesIndex, ui } = getContent(lang);
  const trail = [[ui.home, '/'], [servicesIndex.title, path]];
  const items = servicePages.map((s) => ({ href: lp(lang, `/services/${s.slug}`), title: s.h1, lead: s.lead, poster: s.media.poster, more: ui.explore(s.name) }));
  return (
    <InnerShell lang={lang}>
      <JsonLd graph={[
        breadcrumbLd(trail, lang),
        { '@type': 'ItemList', itemListElement: servicePages.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/services/${s.slug}`, lang), name: s.h1 })) },
      ]} />
      <PageHero lang={lang} trail={trail} eyebrow={ui.whatWeDo} title={servicesIndex.title} lead={servicesIndex.lead} strip={servicePages.map((s) => s.name)} />
      <section className="pg_section">
        <div className="container">
          <ServiceList items={items} />
        </div>
      </section>
      <CtaBand lang={lang} />
    </InnerShell>
  );
}
