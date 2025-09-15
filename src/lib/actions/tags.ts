"use server";

import { Tag } from "../types/api/tags";
import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";
import { ListResponse } from "../types/api/metadata";

export async function getTags({
  page = 1,
  limit = DEFAULT_LIMIT,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const tags = await getData<ListResponse<Tag>>("/tags", {
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

  if ("error" in tags) {
    throw new Error(tags.error);
  }

  return tags.data;
}
