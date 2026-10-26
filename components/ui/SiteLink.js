'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSite } from '../global/SiteProvider';
import { lp, publicPath } from '@/lib/i18n';

// Internal link that understands languages and the one-page sections.
// Content hrefs are language-neutral ('/services', '/#about'); they are prefixed with /ar on Arabic pages.
// '/#about' smooth-scrolls when already on that language's homepage, otherwise navigates there
// (SiteProvider scrolls to the hash once the page is ready).
export default function SiteLink({ href, onClick, children, ...rest }) {
  const pathname = publicPath(usePathname());
  const { scrollTo, lang } = useSite();
  const to = lp(lang, href);
  const home = lp(lang, '/');
  const hash = to.includes('#') ? to.slice(to.indexOf('#')) : null;
  const handle = (e) => {
    if (hash && hash.length > 1 && (href.startsWith('#') || pathname === home)) {
      e.preventDefault();
      scrollTo(hash);
    }
    onClick?.(e);
  };
  return <Link href={to} onClick={handle} scroll={!hash} {...rest}>{children}</Link>;
}
