"use server";

import { ActiveCart } from "../types/api/cart";
import { DEFAULT_LIMIT } from "../config/global";
import { ListResponse } from "../types/api/metadata";
import { Order, OrderDetails } from "../types/api/orders";
import { getData, postData } from "../utils/crud-fetch-api";

export async function getOrders({
  page = "1",
  limit = DEFAULT_LIMIT.toString(),
  status,
}: {
  page?: string;
  limit?: string;
  status?: string;
}) {
  const queries: Record<string, string> = {
    page,
    limit,
  };

  if (status) {
    queries.status = status;
  }

  const orders = await getData<ListResponse<Order>>("/orders", {
    queries,
    cache: "force-cache",
    next: {
      revalidate: 3600, // 1 hour
    },
  });

  if ("error" in orders) {
    throw new Error(orders.error);
  }

  return orders.data;
}

export async function getOrder(orderId: string): Promise<OrderDetails> {
  const order = await getData<OrderDetails>(`/orders/${orderId}`);

  if ("error" in order) {
    throw new Error(order.error);
  }

  return order.data;
}

export async function createOrder(cart: ActiveCart) {
  const order = await postData("/orders", cart);

  if ("error" in order) {
    throw new Error(order.error);
  }

  return order.data;
}

export async function orderAgain(orderId: string) {
  const order = await postData<ActiveCart, any>(
    `/orders/${orderId}/order-again`,
    {},
  );

  if ("error" in order) {
    throw new Error(order.error);
  }

  return order.data;
}
