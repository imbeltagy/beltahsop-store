"use server";

import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";
import { Category } from "../types/api/categories";

export async function getCategories({
  page = 1,
  limit = DEFAULT_LIMIT,
}: {
  page?: number;
  limit?: number;
}) {
  const categories = await getData<{
    metadata: Record<"total" | "page" | "limit", number>;
    data: Category[];
  }>("/categories", {
    queries: {
      page,
      limit,
    },
  });

  if ("error" in categories) {
    throw new Error(categories.error);
  }

  return categories.data;
}
