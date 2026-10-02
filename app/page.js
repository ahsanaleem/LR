import SiteProvider from '@/components/global/SiteProvider';
import Loader from '@/components/global/Loader';
import Cursor from '@/components/global/Cursor';
import Header from '@/components/global/Header';
import QuoteModal from '@/components/global/QuoteModal';
import Toasts from '@/components/global/Toasts';
import ScrollProgress from '@/components/global/ScrollProgress';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Expertise from '@/components/sections/Expertise';
import Work from '@/components/sections/Work';
import Engagement from '@/components/sections/Engagement';
import AI from '@/components/sections/AI';
import Why from '@/components/sections/Why';
import Awards from '@/components/sections/Awards';
import Team from '@/components/sections/Team';
import CTA from '@/components/sections/CTA';
import Reviews from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Page() {
  return (
    <SiteProvider>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Loader />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Expertise />
        <Work />
        <Engagement />
        <AI />
        <Why />
        <Awards />
        <Team />
        <CTA />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <QuoteModal />
      <Toasts />
      <Cursor />
    </SiteProvider>
  );
}
