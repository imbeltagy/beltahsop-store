"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { getProducts } from "@/lib/actions/products";
import ProductCard from "@/view/components/features/product/product-cart";
import { Pagination } from "@/view/components/ui/pagination";
import { Skeleton } from "@/view/components/ui/skeleton";

export default function ProductsList() {
  const searchParams = useSearchParams();
  const t = useTranslations("Pages.Products.results");
  const [products, setProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
  });
  const [loading, setLoading] = useState(true);

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await getProducts({
          page: currentPage,
          limit,
          search: searchParams.get("search") || undefined,
          categoryId: searchParams.get("categoryId") || undefined,
          subCategoryId: searchParams.get("subCategoryId") || undefined,
          brandId: searchParams.get("brandId") || undefined,
          tagId: searchParams.get("tagId") || undefined,
          labelId: searchParams.get("labelId") || undefined,
          minPrice: searchParams.get("minPrice")
            ? Number(searchParams.get("minPrice"))
            : undefined,
          maxPrice: searchParams.get("maxPrice")
            ? Number(searchParams.get("maxPrice"))
            : undefined,
        });

        setProducts(result.data);
        setPagination(result.metadata);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setPagination({ total: 0, page: 1, limit: 12 });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, currentPage]);

  const totalPages = Math.ceil(pagination.total / limit);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Results Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg bg-white p-4 shadow-sm"
            >
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("title", { total: pagination.total })}
          </h2>
          <p className="text-sm text-gray-600">
            {t("showing", {
              start: (currentPage - 1) * limit + 1,
              end: Math.min(currentPage * limit, pagination.total),
              total: pagination.total,
            })}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                const params = new URLSearchParams(window.location.search);
                params.set("page", page.toString());
                window.location.href = `?${params.toString()}`;
              }}
            />
          )}
        </>
      ) : (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            {t("no_products_title")}
          </h3>
          <p className="text-gray-500">{t("no_products_message")}</p>
        </div>
      )}
    </div>
  );
}
