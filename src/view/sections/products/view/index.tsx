import { useTranslations } from "next-intl";

import { ProducstListPromise } from "@/lib/actions/products";

import ProductsFilters from "../filters";
import ProductsList from "../products-list";
import ProductsFiltersDialog from "../filters-dialog";

export default function ProductsView({
  productsPromise,
}: {
  productsPromise: ProducstListPromise;
}) {
  const t = useTranslations("Pages.Products");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mt-2 text-gray-600">{t("subtitle")}</p>
        </div>

        <div className="flex flex-col gap-8 xl:flex-row">
          {/* Filters Sidebar (desktop) */}
          <div className="hidden xl:block xl:w-1/4">
            <ProductsFilters />
          </div>

          {/* Products List */}
          <div className="xl:w-3/4">
            <ProductsList productsPromise={productsPromise} />
          </div>
        </div>

        <div className="xl:hidden">
          <ProductsFiltersDialog />
        </div>
      </div>
    </div>
  );
}
