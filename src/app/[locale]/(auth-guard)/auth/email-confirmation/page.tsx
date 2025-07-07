"use server";

import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { LocaleType } from "@/lib/types/locale";
import { fetchUserByToken } from "@/lib/actions/auth";
import { paths, pathAfterLogin } from "@/lib/config/paths";
import EmailConfirmationView from "@/view/sections/auth/view/email-confirmation-view";

export default async function EmailConfirmationPage() {
  const t = await getTranslations("Pages.Auth");

  const res = await fetchUserByToken();

  if ("error" in res) {
    redirect(paths.auth.login);
  }

  const { confirmed } = res;

  if (confirmed)
    return (
      <div className="rounded border border-green-200 bg-green-100 px-4 py-2 text-center text-green-700">
        {t.rich("email_already_confirmed", {
          link: (chunks) => (
            <Link href={pathAfterLogin} className="mx-auto block w-fit p-1">
              {chunks}
            </Link>
          ),
        })}
      </div>
    );

  return <EmailConfirmationView />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Auth" });

  return {
    title: t("email_confirmation_title"),
  };
}
