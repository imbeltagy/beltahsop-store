import { useTranslations } from "next-intl";

import { paths } from "@/lib/config/paths";
import { useFormat } from "@/lib/hooks/format";
import { cn } from "@/lib/utils/style-functions";
import { OrderDetails } from "@/lib/types/api/orders";
import { Container } from "@/view/components/elements";
import PageHeader from "@/view/components/page-header";

import StatusChip from "../status-chip";
import ReOrderButton from "../re-order-button";
import OrderProductsList from "../products-list";

interface Props {
  order: OrderDetails;
}

export default function OrderSingleView({ order }: Props) {
  const t = useTranslations("Pages.Orders");

  return (
    <Container className="py-sectionV-sm">
      <PageHeader
        backLink={{ href: paths.orders, label: t("back_to_orders") }}
        title={t("order_details")}
        subtitle={`Order #${order._id.slice(-8)}`}
        endComponent={<StatusChip status={order.status} />}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <OrderInfoCard order={order} />
        <OrderProductsList
          products={order.products}
          className="md:order-last md:col-span-2"
        />
        <OrderSummaryCard order={order} />
      </div>
    </Container>
  );
}

function OrderInfoCard({
  order,
  className,
}: {
  order: OrderDetails;
  className?: string;
}) {
  const { formatDate } = useFormat();
  const t = useTranslations("Pages.Orders");

  return (
    <div className={cn("bg-card rounded-lg border p-6", className)}>
      <h3 className="mb-4 text-lg font-semibold">{t("order_information")}</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("order_id")}:</span>
          <span className="font-mono" dir="ltr">
            #{order._id.slice(-8)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("date")}:</span>
          <span>{formatDate(new Date(order.createdAt))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("status")}:</span>
          <span className="capitalize">
            <StatusChip status={order.status} />
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("total")}:</span>
          <span className="font-semibold">${order.finalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function OrderSummaryCard({
  order,
  className,
}: {
  order: OrderDetails;
  className?: string;
}) {
  const t = useTranslations("Pages.Orders");

  return (
    <div className={cn("bg-card rounded-lg border p-6", className)}>
      <h3 className="mb-4 text-lg font-semibold">{t("order_summary")}</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("subtotal")}:</span>
          <span>${order.finalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("shipping")}:</span>
          <span>{t("free")}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>{t("total")}:</span>
            <span>${order.finalPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="pt-4">
          <ReOrderButton orderId={order._id} className="w-full" />
        </div>
      </div>
    </div>
  );
}
