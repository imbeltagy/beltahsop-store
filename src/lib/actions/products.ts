"use server";

import { Product } from "../types/api/products";
import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";

export async function getProducts({
  page = 1,
  limit = DEFAULT_LIMIT,
}: {
  page?: number;
  limit?: number;
}) {
  const products = await getData<{
    metadata: Record<"total" | "page" | "limit", number>;
    data: Product[];
  }>("/products", {
    queries: {
      page,
      limit,
    },
  });

  if ("error" in products) {
    throw new Error(products.error);
  }

  return products.data;
}
