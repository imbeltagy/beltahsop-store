"use server";

import { DEFAULT_LIMIT } from "../config/global";
import { getData } from "../utils/crud-fetch-api";
import { ListResponse } from "../types/api/metadata";
import { Product, ProductDetails } from "../types/api/products";

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

export async function getProductById(id: string) {
  const product = await getData<ProductDetails>(`/products/${id}`, {
    cache: "no-store",
  });

  if ("error" in product) {
    throw new Error(product.error);
  }

  return product.data;
}
