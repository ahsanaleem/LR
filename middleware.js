import { NextResponse } from 'next/server';

// English is served at the root (/services), Arabic under /ar (/ar/services).
// Internally every page lives in app/[lang]/…, so root paths are rewritten to /en/….
export function middleware(req) {
  const { pathname } = req.nextUrl;
  // files (media, robots.txt, sitemap.xml, llms.txt, icon.svg…) are served as-is
  if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();

  // /en/… is never a public URL — send it to the canonical root path
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }
  if (pathname === '/ar' || pathname.startsWith('/ar/')) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

// Skip Next internals here; files with an extension are skipped in the function above
// (an escaped dot in a matcher string does not survive Next's matcher parsing).
export const config = { matcher: ['/((?!_next|api).*)'] };
