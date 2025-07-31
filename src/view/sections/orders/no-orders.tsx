import Link from "next/link";
import { useTranslations } from "next-intl";

import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/ui/button";

export default function NoOrders() {
  const t = useTranslations("Pages.Orders");

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6">
        <div className="py-12 text-center">
          <Iconify
            icon="mdi:package-variant"
            className="text-muted-foreground mx-auto h-12 w-12"
          />
          <h3 className="mt-4 text-lg font-medium">{t("no_orders_title")}</h3>
          <p className="text-muted-foreground mt-2">{t("no_orders_message")}</p>
          <Link href="/" className="mt-4 inline-block">
            <Button>{t("start_shopping")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
