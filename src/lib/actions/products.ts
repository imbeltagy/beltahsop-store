"use server";

import { Product } from "../types/api/products";
import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";
import { ListResponse } from "../types/api/metadata";

export async function getProducts({
  page = 1,
  limit = DEFAULT_LIMIT,
}: {
  page?: number;
  limit?: number;
}) {
  const products = await getData<ListResponse<Product>>("/products", {
    queries: {
      page,
      limit,
    },
    cache: "force-cache",
    next: {
      revalidate: 3600, // 1 hour
    },
  });

  if ("error" in products) {
    throw new Error(products.error);
  }

  return products.data;
}
