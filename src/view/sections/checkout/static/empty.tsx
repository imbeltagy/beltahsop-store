"use client";

import { useTranslations } from "next-intl";

import { Icons } from "@/lib/config/icons";
import { paths } from "@/lib/config/paths";
import { Link } from "@/lib/i18n/navigation";
import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/elements";

export default function CheckoutEmpty() {
  const t = useTranslations("Pages.Checkout");

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="py-12 text-center">
        <Iconify
          icon={Icons.CART}
          className="mx-auto mb-4 text-gray-300"
          style={{ fontSize: 64 }}
        />
        <h2 className="mb-2 text-2xl font-semibold text-gray-500">
          {t("cart_empty_title")}
        </h2>
        <p className="text-muted-foreground mb-6">{t("cart_empty_message")}</p>
        <Link href={paths.products}>
          <Button>{t("continue_shopping")}</Button>
        </Link>
      </div>
    </div>
  );
}
