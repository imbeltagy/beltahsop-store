"use server";

import { Product } from "../types/api/products";
import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";
import { ListResponse } from "../types/api/metadata";

export type ProducstListPromise = Promise<ListResponse<Product>>;

export async function getProducts({
  page = 1,
  limit = DEFAULT_LIMIT,
  search,
  categoryId,
  subCategoryId,
  brandId,
  labelId,
  tagId,
  minPrice,
  maxPrice,
}: {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  subCategoryId?: string;
  brandId?: string;
  labelId?: string;
  tagId?: string;
  minPrice?: number;
  maxPrice?: number;
}): ProducstListPromise {
  const queries: Record<string, string | number> = {
    page,
    limit,
  };

  if (search) {
    queries.search = search;
  }
  if (categoryId) {
    queries.category = categoryId;
  }
  if (subCategoryId) {
    queries.subcategory = subCategoryId;
  }
  if (brandId) {
    queries.brand = brandId;
  }
  if (labelId) {
    queries.label = labelId;
  }
  if (tagId) {
    queries.tag = tagId;
  }
  if (minPrice !== undefined && minPrice !== 0) {
    queries.minPrice = minPrice;
  }
  if (maxPrice !== undefined && maxPrice !== 0) {
    queries.maxPrice = maxPrice;
  }

  const products = await getData<ListResponse<Product>>("/products", {
    queries,
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
