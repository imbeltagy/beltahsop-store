// "use client";

import { useTranslations } from "next-intl";

import { Order } from "@/lib/types/api/orders";
import { Container } from "@/view/components/elements";
import PageHeader from "@/view/components/page-header";

import NoOrders from "../no-orders";
import OrdersListTable from "../list-table";
import StatusFilter from "../status-filter";

interface Props {
  orders: Order[];
  total: number;
}

export default function OrdersListView({ orders, total }: Props) {
  const t = useTranslations("Pages.Orders");

  return (
    <Container className="py-sectionV-sm">
      <div className="space-y-6">
        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
          endComponent={<StatusFilter />}
        />

        {orders.length > 0 ? (
          <OrdersListTable orders={orders} total={total} />
        ) : (
          <NoOrders />
        )}
      </div>
    </Container>
  );
}
