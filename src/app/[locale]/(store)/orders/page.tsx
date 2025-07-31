import { getOrders } from "@/lib/actions/orders";
import OrdersListView from "@/view/sections/orders/view/list-view";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: string | undefined;
    limit: string | undefined;
    status: string | undefined;
  }>;
}) {
  const { page, limit, status } = await searchParams;

  const orders = await getOrders({
    page: page,
    limit: limit,
    status: status,
  });

  return <OrdersListView orders={orders.data} total={orders.metadata.total} />;
}
