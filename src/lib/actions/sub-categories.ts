"use server";

import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";
import { SubCategory } from "../types/api/sub-categories";

export async function getSubCategories({
  page = 1,
  limit = DEFAULT_LIMIT,
}: {
  page?: number;
  limit?: number;
}) {
  const subCategories = await getData<{
    metadata: Record<"total" | "page" | "limit", number>;
    data: SubCategory[];
  }>("/subcategories", {
    queries: {
      page,
      limit,
    },
  });

  if ("error" in subCategories) {
    throw new Error(subCategories.error);
  }

  return subCategories.data;
}
