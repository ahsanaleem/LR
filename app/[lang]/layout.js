import { GeistSans } from 'geist/font/sans';
import { IBM_Plex_Sans_Arabic, Inter, Montserrat } from 'next/font/google';
import 'lenis/dist/lenis.css';
import '../globals.css';
import { dirOf, getContent, langs } from '@/lib/i18n';
import { JsonLd, orgRef } from '@/lib/seo';

// Hero banner fonts — self-hosted, subset and preloaded by next/font
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], display: 'swap', variable: '--font-montserrat' });
const inter = Inter({ subsets: ['latin'], weight: ['300'], display: 'swap', variable: '--font-inter' });
// Arabic pages only — not preloaded so English pages don't download it
const arabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['200', '300', '400', '500', '700'], display: 'swap', variable: '--font-arabic', preload: false });

export const dynamicParams = false;
export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { site } = getContent((await params).lang);
  return {
    metadataBase: new URL(site.url),
    title: site.title,
    description: site.description,
    icons: { icon: '/icon.svg' },
    robots: { index: true, follow: true },
  };
}
export const viewport = { themeColor: '#020d14' };

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const { brand, site } = getContent(lang);
  // Site-wide entities (every page). Only verified facts go in here — add telephone, address,
  // foundingDate and sameAs once they are real (see content/site.js).
  const socials = brand.socials.map((s) => s.href).filter(Boolean);
  const siteGraph = [
    { '@type': 'Organization', ...orgRef, name: brand.short, url: `${site.url}/`, logo: `${site.url}/brand/logo-white.png`, ...(socials.length && { sameAs: socials }) },
    { '@type': 'WebSite', '@id': `${site.url}/#website`, url: `${site.url}/`, name: brand.short, publisher: orgRef, inLanguage: ['en', 'ar'] },
  ];
  return (
    <html lang={lang} dir={dirOf(lang)} className={`${GeistSans.variable} ${montserrat.variable} ${inter.variable} ${arabic.variable}`}>
      <body>
        <JsonLd graph={siteGraph} />
        {children}
      </body>
    </html>
  );
}
