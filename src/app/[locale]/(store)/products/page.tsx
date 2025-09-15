import { use } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { routing } from "@/lib/i18n/routing";
import { LocaleType } from "@/lib/types/locale";
import ProductsView from "@/view/sections/products/view";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: LocaleType }>;
// }) {
//   const { locale } = use(params);
//   setRequestLocale(locale);

//   const t = await getTranslations("Metadata.Products");

//   return {
//     title: t("title"),
//   };
// }

export default function Page({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return <ProductsView />;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
