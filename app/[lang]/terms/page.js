import LegalPage from '@/components/inner/LegalPage';
import { getContent } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

const path = '/terms';

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  const { terms } = getContent(lang).legal;
  return pageMeta(lang, { path, title: terms.metaTitle, description: terms.metaDescription });
}

export default async function Terms({ params }) {
  return <LegalPage lang={(await params).lang} docKey="terms" path={path} />;
}
