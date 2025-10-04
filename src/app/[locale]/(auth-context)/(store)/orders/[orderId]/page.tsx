import { notFound } from "next/navigation";

import { getOrder } from "@/lib/actions/orders";
import OrderSingleView from "@/view/sections/orders/view/single-view";

interface OrderDetailsPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { orderId } = await params;

  try {
    const order = await getOrder(orderId);

    return <OrderSingleView order={order} />;
  } catch (ignoreError) {
    notFound();
  }
}
