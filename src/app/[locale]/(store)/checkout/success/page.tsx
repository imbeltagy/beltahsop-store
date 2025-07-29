import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { paths } from "@/lib/config/paths";
import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/ui/button";
import Alert from "@/view/components/elements/alert";
import { postData } from "@/lib/utils/crud-fetch-api";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ sessionId: string }>;
}) {
  const t = await getTranslations("Pages.Checkout.success");

  const { sessionId } = await searchParams;

  if (sessionId) {
    postData("/checkout/clear-session", {
      sessionId,
    }).then((res) => {
      if ("error" in res && process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error(res.error);
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Success Illustration */}
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mb-4 text-lg text-gray-600">{t("subtitle")}</p>
        <p className="mb-8 text-gray-600">{t("message")}</p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href={paths.home} className="no-underline">
              <Iconify icon="mdi:home" className="mr-2" />
              {t("go_home")}
            </Link>
          </Button>

          <Button variant="outline" className="w-full" asChild>
            <Link href={paths.home} className="no-underline">
              <Iconify icon="mdi:shopping" className="mr-2" />
              {t("continue_shopping")}
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <Alert variant="info" className="mt-8">
          Check your email for order confirmation
        </Alert>
      </div>
    </div>
  );
}
