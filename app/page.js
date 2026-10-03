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

export default function Home() {
  return (
    <SiteProvider>
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
        <Awards />
        <Team />
        <CTA />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <QuoteModal />
    </SiteProvider>
  );
}
