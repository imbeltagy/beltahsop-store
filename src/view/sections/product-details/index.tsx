import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { paths } from "@/lib/config/paths";
import { cn } from "@/lib/utils/style-functions";
import { Chip } from "@/view/components/elements";
import { getProductById } from "@/lib/actions/products";
import CardActions from "@/view/components/features/product/product-cart/card-actions";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPreview,
  CarouselPrevious,
} from "@/view/components/ui/carousel";

export default async function ProductDetailsView({ id }: { id: string }) {
  const [product, t] = await Promise.all([
    getProductById(id),
    getTranslations("Pages.ProductDetails"),
  ]);

  const hasMultiple = product.coverList && product.coverList.length > 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          {!hasMultiple && (
            <div className="overflow-hidden rounded-md border">
              <Image
                src={product.coverList?.[0] || "/assets/images/home/hero.webp"}
                alt={product.name}
                width={800}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}

          {hasMultiple && (
            <Carousel>
              <CarouselContent>
                {product.coverList.map((src) => (
                  <CarouselItem key={src}>
                    <div className="overflow-hidden rounded-md border">
                      <Image
                        src={src}
                        width={800}
                        height={800}
                        className="h-auto w-full object-cover"
                        alt={product.name}
                        priority
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              <CarouselPreview previewImages={product.coverList} />
            </Carousel>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-semibold lg:text-3xl">{product.name}</h1>
          {product.brand && (
            <div>
              <span className="text-muted-foreground">{t("brand")}:</span>{" "}
              <Link
                href={{
                  pathname: paths.products,
                  query: {
                    brandId: product.brand._id,
                    name: product.brand.name,
                  },
                }}
                className="font-medium hover:underline"
              >
                {product.brand.name}
              </Link>
            </div>
          )}

          {product.labels?.length ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {product.labels.map((label) => (
                <span
                  key={label._id}
                  className={cn(
                    "block rounded-lg px-3 py-1 text-sm font-bold text-white",
                  )}
                  style={{
                    letterSpacing: 1,
                    backgroundColor: label.color,
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          ) : null}
          <p className="text-muted-foreground mt-2">{product.description}</p>
          {product.tags?.length ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {product.tags.map((tg) => (
                <Link
                  key={tg._id}
                  href={{
                    pathname: paths.products,
                    query: { tagId: tg._id, name: tg.name },
                  }}
                >
                  <Chip size="small" className="cursor-pointer">
                    {tg.name}
                  </Chip>
                </Link>
              ))}
            </div>
          ) : null}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold">
              ${product.finalPrice ?? product.price}
            </span>
            {product.finalPrice && product.finalPrice !== product.price && (
              <span className="text-muted-foreground line-through">
                ${product.price}
              </span>
            )}
          </div>
          {/* Meta details */}
          <div className="mt-6 space-y-2 text-sm">
            {product.subcategory?.category && (
              <div>
                <span className="text-muted-foreground">{t("category")}:</span>{" "}
                <Link
                  href={{
                    pathname: paths.products,
                    query: {
                      categoryId: product.subcategory.category._id,
                      name: product.subcategory.category.name,
                    },
                  }}
                  className="font-medium hover:underline"
                >
                  {product.subcategory.category.name}
                </Link>
              </div>
            )}
            {product.subcategory && (
              <div>
                <span className="text-muted-foreground">
                  {t("subcategory")}:
                </span>{" "}
                <Link
                  href={{
                    pathname: paths.products,
                    query: {
                      subCategoryId: product.subcategory._id,
                      name: product.subcategory.name,
                    },
                  }}
                  className="font-medium hover:underline"
                >
                  {product.subcategory.name}
                </Link>
              </div>
            )}
          </div>

          <CardActions
            className="justify-start"
            product={product}
            disableLink
          />
        </div>
      </div>
    </div>
  );
}
