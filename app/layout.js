import { Unbounded, Manrope } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import { meta } from '@/content/site';

const display = Unbounded({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-display', display: 'swap' });
const body = Manrope({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-body', display: 'swap' });

export const metadata = {
  metadataBase: new URL(meta.url),
  title: meta.title,
  description: meta.description,
  openGraph: { title: meta.title, description: meta.description, type: 'website' },
};

export const viewport = {
  themeColor: '#000f18',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`no-js ${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Swap .no-js for .js before paint; without JS every section stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.replace('no-js','js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
