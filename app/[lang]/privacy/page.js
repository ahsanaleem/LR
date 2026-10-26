import LegalPage from '@/components/inner/LegalPage';
import { getContent } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

const path = '/privacy';

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  const { privacy } = getContent(lang).legal;
  return pageMeta(lang, { path, title: privacy.metaTitle, description: privacy.metaDescription });
}

export default async function Privacy({ params }) {
  return <LegalPage lang={(await params).lang} docKey="privacy" path={path} />;
}
