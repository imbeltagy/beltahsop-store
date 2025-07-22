"use server";

import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";
import { Category } from "../types/api/categories";
import { ListResponse } from "../types/api/metadata";

export async function getCategories({
  page = 1,
  limit = DEFAULT_LIMIT,
}: {
  page?: number;
  limit?: number;
}) {
  const categories = await getData<ListResponse<Category>>("/categories", {
    queries: {
      page,
      limit,
    },
    cache: "force-cache",
    next: {
      revalidate: 3600, // 1 hour
    },
  });

  if ("error" in categories) {
    throw new Error(categories.error);
  }

  return categories.data;
}
