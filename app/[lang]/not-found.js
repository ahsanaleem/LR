'use client';
import { usePathname } from 'next/navigation';
import InnerShell from '@/components/global/InnerShell';
import { getContent, lp } from '@/lib/i18n';

// not-found.js receives no params, so the language comes from the URL
export default function NotFound() {
  const lang = usePathname()?.startsWith('/ar') ? 'ar' : 'en';
  const { ui } = getContent(lang);
  return (
    <InnerShell lang={lang}>
      <section className="pg_hero">
        <div className="container">
          <p className="pg_eyebrow">404</p>
          <h1 className="pg_h1">{ui.notFoundTitle}</h1>
          <p className="pg_lead">{ui.notFoundText}</p>
          <div className="pg_actions"><a className="btn btn_solid" href={lp(lang, '/')}>{ui.backHome}</a></div>
        </div>
      </section>
    </InnerShell>
  );
}
