import { routing } from "@/lib/i18n/routing";
import { getProducts } from "@/lib/actions/products";
import ProductsView from "@/view/sections/products/view";

type FiltersKeys =
  | "page"
  | "limit"
  | "search"
  | "categoryId"
  | "subCategoryId"
  | "brandId"
  | "tagId"
  | "labelId"
  | "minPrice"
  | "maxPrice";
interface Props {
  searchParams: Promise<Record<FiltersKeys, string | undefined>>;
}

export default async function Page({ searchParams }: Props) {
  const {
    page,
    limit,
    search,
    categoryId,
    subCategoryId,
    brandId,
    tagId,
    labelId,
    minPrice,
    maxPrice,
  } = await searchParams;

  const productsPromise = getProducts({
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    search,
    categoryId,
    subCategoryId,
    brandId,
    tagId,
    labelId,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  return <ProductsView productsPromise={productsPromise} />;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
