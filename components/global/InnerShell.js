'use client';
import { useEffect } from 'react';
import SiteProvider, { useSite } from './SiteProvider';
import Cursor from './Cursor';
import Header from './Header';
import QuoteModal from './QuoteModal';
import Footer from '../sections/Footer';
import InnerFx from '../inner/InnerFx';

// No intro loader on inner pages — mark the site ready straight away so the header and Lenis start.
function Ready() {
  const { setReady } = useSite();
  useEffect(() => setReady(true), [setReady]);
  return null;
}

// Shared chrome for every page except the homepage (which adds the loader and its own sections).
export default function InnerShell({ lang, children }) {
  return (
    <SiteProvider lang={lang}>
      <Ready />
      <Cursor />
      <Header />
      <div className="read_progress" aria-hidden="true"><i /></div>
      <main className="inner">
        {children}
        <InnerFx />
      </main>
      <Footer />
      <QuoteModal />
    </SiteProvider>
  );
}
