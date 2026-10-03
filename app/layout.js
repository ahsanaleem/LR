import { GeistSans } from 'geist/font/sans';
import 'lenis/dist/lenis.css';
import './globals.css';

export const metadata = {
  title: 'Long Relation | AI-First Product Studio',
  description: 'Long Relation designs and engineers web, mobile, 3D, XR and AI products that scale.',
};
export const viewport = { themeColor: '#020d14' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
