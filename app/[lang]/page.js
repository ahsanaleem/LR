import SiteProvider from '@/components/global/SiteProvider';
import Loader from '@/components/global/Loader';
import Cursor from '@/components/global/Cursor';
import Header from '@/components/global/Header';
import QuoteModal from '@/components/global/QuoteModal';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Expertise from '@/components/sections/Expertise';
import Featured from '@/components/sections/Featured';
import Engagement from '@/components/sections/Engagement';
import GrowAI from '@/components/sections/GrowAI';
import Why from '@/components/sections/Why';
import Awards from '@/components/sections/Awards';
import Team from '@/components/sections/Team';
import CTA from '@/components/sections/CTA';
import Reviews from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import { getContent } from '@/lib/i18n';
import { JsonLd, abs, orgRef, pageMeta } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  const { site } = getContent(lang);
  return pageMeta(lang, { path: '/', title: site.title, description: site.description });
}

// Homepage entities: what the studio offers and the work it has shipped
const homeGraph = (lang) => {
  const { featured, services, site, team } = getContent(lang);
  return [
    {
      '@type': 'ProfessionalService',
      '@id': `${site.url}/#service`,
      name: 'Long Relation',
      url: abs('/', lang),
      image: `${site.url}/og.jpg`,
      description: site.description,
      inLanguage: lang,
      parentOrganization: orgRef,
      areaServed: [{ '@type': 'Country', name: 'Saudi Arabia' }, { '@type': 'Country', name: 'United Arab Emirates' }],
      knowsAbout: ['Mobile app development', 'iOS development', 'Android development', 'React Native', 'Flutter', 'Unity', 'Unreal Engine', 'AR/VR', 'AI engineering', 'LLM integration', 'AI automation'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: services.items.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.text, url: abs(`/services/${s.slug}`, lang) } })),
      },
    },
    // leadership — only rendered once the Team section is switched on
    ...(team.show ? team.members.map((m) => ({
      '@type': 'Person',
      name: m.name.replace('\n', ' '),
      jobTitle: m.role,
      worksFor: orgRef,
      ...(m.photo && { image: abs(m.photo) }),
      ...(m.linkedin && { sameAs: [m.linkedin] }),
    })) : []),
    ...featured.items.map((p) => ({ '@type': 'CreativeWork', '@id': `${abs(`/work/${p.slug}`, lang)}#work`, name: p.name, url: abs(`/work/${p.slug}`, lang), genre: p.category, abstract: p.summary, dateCreated: p.year, creator: orgRef, inLanguage: lang })),
  ];
};

export default async function Home({ params }) {
  const { lang } = await params;
  const { awards, team, reviews } = getContent(lang);
  return (
    <SiteProvider lang={lang}>
      <JsonLd graph={homeGraph(lang)} />
      <Loader />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Expertise />
        <Featured />
        <Engagement />
        <GrowAI />
        <Why />
        {/* placeholder-only sections stay out of the page until their `show` flag is set in content/site.js */}
        {awards.show && <Awards />}
        {team.show && <Team />}
        <CTA />
        {reviews.show && <Reviews />}
        <Contact />
      </main>
      <Footer />
      <QuoteModal />
    </SiteProvider>
  );
}
