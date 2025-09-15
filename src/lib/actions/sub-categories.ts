"use server";

import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";
import { ListResponse } from "../types/api/metadata";
import { SubCategory } from "../types/api/sub-categories";

export async function getSubCategories({
  page = 1,
  limit = DEFAULT_LIMIT,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const subCategories = await getData<ListResponse<SubCategory>>(
    "/subcategories",
    {
      queries: {
        page,
        limit,
        search,
      },
      cache: "force-cache",
      next: {
        revalidate: 3600, // 1 hour
      },
    },
  );

  if ("error" in subCategories) {
    throw new Error(subCategories.error);
  }

  return subCategories.data;
}
