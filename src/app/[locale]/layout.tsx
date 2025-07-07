import "@/view/css/globals.css";
import "@/view/css/fonts.css";
import "@/view/css/components.css";

import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import { routing } from "@/lib/i18n/routing";
import { LocaleType } from "@/lib/types/locale";
import { localesSettings } from "@/lib/config/locale";

export default async function RootLayout({
  children,
  auth,
  params,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
  params: Promise<{ locale: LocaleType }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const { dir } = localesSettings[locale];

  return (
    <html lang={locale} dir={dir}>
      <body className="grid min-h-screen antialiased">
        <NextIntlClientProvider>
          {auth}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({
  params,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
  params: Promise<{ locale: LocaleType }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    manifest: "/manifest.json",
    icons: [
      { rel: "icon", url: "/favicon/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x6",
        url: "/favicon/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x12",
        url: "/favicon/favicon-32x32.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x67",
        url: "/favicon/apple-touch-icon.png",
      },
    ],
  };
}
