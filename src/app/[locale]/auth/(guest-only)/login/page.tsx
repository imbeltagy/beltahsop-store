import { getTranslations } from 'next-intl/server';

import { LocaleType } from '@/lib/types/locale';
import LoginView from '@/view/sections/auth/view/login-view';

export default function LoginPage() {
  return <LoginView />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Auth' });

  return {
    title: t('login_title'),
  };
}
