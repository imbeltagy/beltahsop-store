"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState, useEffect, useCallback } from "react";

import { getTags } from "@/lib/actions/tags";
import Input from "@/view/components/form/input";
import { getBrands } from "@/lib/actions/brands";
import { getLabels } from "@/lib/actions/labels";
import { cn } from "@/lib/utils/style-functions";
import { Button } from "@/view/components/ui/button";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { getCategories } from "@/lib/actions/categories";
import { useQueryParams } from "@/lib/hooks/use-query-params";
import { getSubCategories } from "@/lib/actions/sub-categories";
import AutocompleteSelect from "@/view/components/form/autocomplete-select";

interface FilterState {
  search: string;
  categoryId: string;
  subCategoryId: string;
  brandId: string;
  tagId: string;
  labelId: string;
  minPrice: number;
  maxPrice: number;
}

interface FilterOptions {
  categories: Array<{ _id: string; name: string; cover: string }>;
  subCategories: Array<{ _id: string; name: string; cover: string }>;
  brands: Array<{ _id: string; name: string; cover: string }>;
  tags: Array<{ _id: string; name: string }>;
  labels: Array<{ _id: string; name: string; color: string }>;
}

export default function ProductsFilters({
  noElevation = false,
  action,
}: {
  noElevation?: boolean;
  action?: React.ReactNode;
}) {
  const t = useTranslations("Pages.Products.filters");
  const {
    values: queries,
    set: setQueries,
    clear: clearQueries,
  } = useQueryParams(
    [
      "name", // field name received by a link
      "search",
      "categoryId",
      "subCategoryId",
      "brandId",
      "tagId",
      "labelId",
      "minPrice",
      "maxPrice",
      "page",
      "limit",
    ],
    { replace: true, scroll: false },
  );

  // Derived filters from query params
  const filters = useMemo(
    () => ({
      search: queries.search || "",
      categoryId: queries.categoryId || "",
      subCategoryId: queries.subCategoryId || "",
      brandId: queries.brandId || "",
      tagId: queries.tagId || "",
      labelId: queries.labelId || "",
      minPrice: queries.minPrice ? Number(queries.minPrice) : undefined,
      maxPrice: queries.maxPrice ? Number(queries.maxPrice) : undefined,
    }),
    [queries],
  );

  // Local input state for debounced search only
  const [searchInput, setSearchInput] = useState<string>(filters.search);
  // Keep search input in sync with URL changes (e.g., back/forward)
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const [options, setOptions] = useState<FilterOptions>({
    categories: [],
    subCategories: [],
    brands: [],
    tags: [],
    labels: [],
  });

  const [loading, setLoading] = useState({
    categories: false,
    subCategories: false,
    brands: false,
    tags: false,
    labels: false,
  });

  const debouncedSearch = useDebounce(searchInput, 500);
  // Local debounced states for min/max price inputs
  const [minPriceInput, setMinPriceInput] = useState<string>(
    filters.minPrice && filters.minPrice > 0 ? String(filters.minPrice) : "",
  );
  const [maxPriceInput, setMaxPriceInput] = useState<string>(
    filters.maxPrice && filters.maxPrice ? String(filters.maxPrice) : "",
  );
  // Apply via button, not debounced

  // Keep local price inputs in sync with URL (e.g., on back/forward)
  useEffect(() => {
    setMinPriceInput(
      Number.isFinite(filters.minPrice) ? String(filters.minPrice) : "",
    );
  }, [filters.minPrice]);
  useEffect(() => {
    setMaxPriceInput(
      Number.isFinite(filters.maxPrice) ? String(filters.maxPrice) : "",
    );
  }, [filters.maxPrice]);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [categoriesRes, subCategoriesRes, brandsRes, tagsRes, labelsRes] =
          await Promise.all([
            getCategories({ limit: 6 }),
            getSubCategories({ limit: 6 }),
            getBrands({ limit: 6 }),
            getTags({ limit: 6 }),
            getLabels({ limit: 6 }),
          ]);

        setOptions({
          categories: categoriesRes.data,
          subCategories: subCategoriesRes.data,
          brands: brandsRes.data,
          tags: tagsRes.data,
          labels: labelsRes.data,
        });
      } catch (ignoreError) {}
    };

    loadInitialData();
  }, []);

  // Search functions
  const searchCategories = useCallback(async (searchTerm: string) => {
    if (!searchTerm) return;

    setLoading((prev) => ({ ...prev, categories: true }));
    try {
      const result = await getCategories({ search: searchTerm, limit: 10 });
      setOptions((prev) => ({ ...prev, categories: result.data }));
    } catch (ignoreError) {
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }));
    }
  }, []);

  const searchSubCategories = useCallback(async (searchTerm: string) => {
    if (!searchTerm) return;

    setLoading((prev) => ({ ...prev, subCategories: true }));
    try {
      const result = await getSubCategories({ search: searchTerm, limit: 10 });
      setOptions((prev) => ({ ...prev, subCategories: result.data }));
    } catch (ignoreError) {
    } finally {
      setLoading((prev) => ({ ...prev, subCategories: false }));
    }
  }, []);

  const searchBrands = useCallback(async (searchTerm: string) => {
    if (!searchTerm) return;

    setLoading((prev) => ({ ...prev, brands: true }));
    try {
      const result = await getBrands({ search: searchTerm, limit: 10 });
      setOptions((prev) => ({ ...prev, brands: result.data }));
    } catch (ignoreError) {
    } finally {
      setLoading((prev) => ({ ...prev, brands: false }));
    }
  }, []);

  const searchTags = useCallback(async (searchTerm: string) => {
    if (!searchTerm) return;

    setLoading((prev) => ({ ...prev, tags: true }));
    try {
      const result = await getTags({ search: searchTerm, limit: 10 });
      setOptions((prev) => ({ ...prev, tags: result.data }));
    } catch (ignoreError) {
    } finally {
      setLoading((prev) => ({ ...prev, tags: false }));
    }
  }, []);

  const searchLabels = useCallback(async (searchTerm: string) => {
    if (!searchTerm) return;

    setLoading((prev) => ({ ...prev, labels: true }));
    try {
      const result = await getLabels({ search: searchTerm, limit: 10 });
      setOptions((prev) => ({ ...prev, labels: result.data }));
    } catch (ignoreError) {
    } finally {
      setLoading((prev) => ({ ...prev, labels: false }));
    }
  }, []);

  // Update URL when debounced search changes
  useEffect(() => {
    setQueries({
      search: debouncedSearch ? debouncedSearch : null,
      page: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // No debounced syncing for price; applied via button

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    if (key === "search") {
      setSearchInput(String(value));
      return;
    }
    const v = value === "" ? null : String(value);
    setQueries({ [key]: v, page: null } as any);
  };

  const clearAllFilters = () => {
    clearQueries({ replace: true, scroll: false });
    setSearchInput("");
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "" && value !== 0 && value !== 1000,
  );

  // Ensure currently selected ids appear in lists even if not fetched, using queries.name as the label (or "Unknown")
  useEffect(() => {
    const displayName = (queries.name || "Unknown").trim() || "Unknown";

    setOptions((prev) => {
      let changed = false;
      const next = { ...prev };

      if (
        filters.categoryId &&
        !prev.categories.some((o) => o._id === filters.categoryId)
      ) {
        next.categories = [
          { _id: filters.categoryId, name: displayName, cover: "" },
          ...prev.categories,
        ];
        changed = true;
      }

      if (
        filters.subCategoryId &&
        !prev.subCategories.some((o) => o._id === filters.subCategoryId)
      ) {
        next.subCategories = [
          { _id: filters.subCategoryId, name: displayName, cover: "" },
          ...prev.subCategories,
        ];
        changed = true;
      }

      if (
        filters.brandId &&
        !prev.brands.some((o) => o._id === filters.brandId)
      ) {
        next.brands = [
          { _id: filters.brandId, name: displayName, cover: "" },
          ...prev.brands,
        ];
        changed = true;
      }

      if (filters.tagId && !prev.tags.some((o) => o._id === filters.tagId)) {
        next.tags = [{ _id: filters.tagId, name: displayName }, ...prev.tags];
        changed = true;
      }

      if (
        filters.labelId &&
        !prev.labels.some((o) => o._id === filters.labelId)
      ) {
        next.labels = [
          { _id: filters.labelId, name: displayName, color: "#999999" },
          ...prev.labels,
        ];
        changed = true;
      }

      return changed ? next : prev;
    });
  }, [
    queries.name,
    filters.categoryId,
    filters.subCategoryId,
    filters.brandId,
    filters.tagId,
    filters.labelId,
    options,
  ]);

  return (
    <div
      className={cn(
        "space-y-6 rounded-lg bg-white p-6 shadow-sm",
        noElevation && "shadow-none",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="grow text-lg font-semibold text-gray-900">
          {t("title")}
        </h2>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="text-red-600 hover:text-red-700"
          >
            {t("clear_all")}
          </Button>
        )}
        {action}
      </div>

      {/* Search */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t("search_placeholder")}
        </label>
        <Input
          type="text"
          placeholder={t("search_placeholder")}
          value={searchInput}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Categories */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t("category")}
        </label>
        <AutocompleteSelect
          options={options.categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }))}
          value={filters.categoryId}
          onChange={(value) => updateFilter("categoryId", value)}
          onSearch={searchCategories}
          loading={loading.categories}
          placeholder={t("select_category")}
          clearable
        />
      </div>

      {/* Subcategories */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t("subcategory")}
        </label>
        <AutocompleteSelect
          options={options.subCategories.map((sub) => ({
            value: sub._id,
            label: sub.name,
          }))}
          value={filters.subCategoryId}
          onChange={(value) => updateFilter("subCategoryId", value)}
          onSearch={searchSubCategories}
          loading={loading.subCategories}
          placeholder={t("select_subcategory")}
          clearable
        />
      </div>

      {/* Brands */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t("brand")}
        </label>
        <AutocompleteSelect
          options={options.brands.map((brand) => ({
            value: brand._id,
            label: brand.name,
          }))}
          value={filters.brandId}
          onChange={(value) => updateFilter("brandId", value)}
          onSearch={searchBrands}
          loading={loading.brands}
          placeholder={t("select_brand")}
          clearable
        />
      </div>

      {/* Tags */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t("tag")}
        </label>
        <AutocompleteSelect
          options={options.tags.map((tag) => ({
            value: tag._id,
            label: tag.name,
          }))}
          value={filters.tagId}
          onChange={(value) => updateFilter("tagId", value)}
          onSearch={searchTags}
          loading={loading.tags}
          placeholder={t("select_tag")}
          clearable
        />
      </div>

      {/* Labels */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t("label")}
        </label>
        <AutocompleteSelect
          options={options.labels.map((label) => ({
            value: label._id,
            label: label.name,
          }))}
          value={filters.labelId}
          onChange={(value) => updateFilter("labelId", value)}
          onSearch={searchLabels}
          loading={loading.labels}
          placeholder={t("select_label")}
          clearable
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t("price_range")}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              type="number"
              min={0}
              placeholder={t("min_price")}
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="number"
              min={0}
              placeholder={t("max_price")}
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMinPriceInput("");
              setMaxPriceInput("");
              setQueries({ minPrice: null, maxPrice: null, page: null });
            }}
          >
            {t("clear_price")}
          </Button>
          <Button
            size="sm"
            disabled={minPriceInput === "" && maxPriceInput === ""}
            onClick={() => {
              const min =
                minPriceInput === ""
                  ? null
                  : Math.max(0, Number(minPriceInput));
              const max =
                maxPriceInput === ""
                  ? null
                  : Math.max(0, Number(maxPriceInput));
              setQueries({
                minPrice: min === null || isNaN(min) ? null : String(min),
                maxPrice: max === null || isNaN(max) ? null : String(max),
                page: null,
              } as any);
            }}
          >
            {t("apply_price")}
          </Button>
        </div>
      </div>
    </div>
  );
}
