"use server";

import { Brand } from "../types/api/brands";
import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";
import { ListResponse } from "../types/api/metadata";

export async function getBrands({
  page = 1,
  limit = DEFAULT_LIMIT,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const brands = await getData<ListResponse<Brand>>("/brands", {
    queries: {
      page,
      limit,
      search,
    },
    cache: "force-cache",
    next: {
      revalidate: 3600, // 1 hour
    },
  });

  if ("error" in brands) {
    throw new Error(brands.error);
  }

  return brands.data;
}
