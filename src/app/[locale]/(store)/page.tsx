import { use } from "react";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/lib/i18n/routing";
import { LocaleType } from "@/lib/types/locale";
import HomeView from "@/view/sections/home/view";

export default function Page({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return <HomeView />;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
