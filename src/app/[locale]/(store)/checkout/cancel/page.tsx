import Link from "next/link";
import { useTranslations } from "next-intl";

import { paths } from "@/lib/config/paths";
import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/ui/button";
import Alert from "@/view/components/elements/alert";

export default function CheckoutCancelPage() {
  const t = useTranslations("Pages.Checkout.cancel");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Cancel Illustration */}
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-yellow-100">
            <svg
              className="h-16 w-16 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Cancel Message */}
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mb-4 text-lg text-gray-600">{t("subtitle")}</p>
        <p className="mb-8 text-gray-600">{t("message")}</p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href={paths.checkout.productsList} className="no-underline">
              <Iconify icon="mdi:cart" className="mr-2" />
              {t("go_back")}
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
        <Alert variant="warning" className="mt-8">
          Your cart items are still saved for your convenience
        </Alert>
      </div>
    </div>
  );
}
