import QuoteButton from '../ui/QuoteButton';
import SplitTitle from './SplitTitle';
import { getContent } from '@/lib/i18n';

export default function CtaBand({ lang, title, text }) {
  const { ui } = getContent(lang);
  return (
    <section className="pg_section pg_cta">
      <div className="container">
        <div className="cta_band">
          <span className="cta_glow g1" aria-hidden="true" />
          <span className="cta_glow g2" aria-hidden="true" />
          <SplitTitle className="pg_h2" text={title || ui.ctaTitle} />
          <p>{text || ui.ctaText}</p>
          <QuoteButton />
        </div>
      </div>
    </section>
  );
}
