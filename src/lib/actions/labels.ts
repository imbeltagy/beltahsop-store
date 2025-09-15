"use server";

import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";
import { Label } from "../types/api/labels";
import { ListResponse } from "../types/api/metadata";

export async function getLabels({
  page = 1,
  limit = DEFAULT_LIMIT,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const labels = await getData<ListResponse<Label>>("/labels", {
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

  if ("error" in labels) {
    throw new Error(labels.error);
  }

  return labels.data;
}
