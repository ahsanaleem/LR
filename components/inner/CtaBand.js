import QuoteButton from '../ui/QuoteButton';
import { getContent } from '@/lib/i18n';

export default function CtaBand({ lang, title, text }) {
  const { ui } = getContent(lang);
  return (
    <section className="pg_section">
      <div className="container">
        <div className="cta_band">
          <h2 className="pg_h2">{title || ui.ctaTitle}</h2>
          <p>{text || ui.ctaText}</p>
          <QuoteButton />
        </div>
      </div>
    </section>
  );
}
