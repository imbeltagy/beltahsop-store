import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

import { paths } from "@/lib/config/paths";
import { useFormat } from "@/lib/hooks/format";
import { Product } from "@/lib/types/api/products";
import { cn } from "@/lib/utils/style-functions/cn";
import { useCurrentLocale } from "@/lib/hooks/locale-hooks";

export default function CardHeader({ product }: { product: Product }) {
  const { dir } = useCurrentLocale();
  const { formatCurrency } = useFormat();

  const renderPrice = useMemo(
    () => (
      <div className="bg-background absolute end-0 bottom-0 rounded-ss-md px-4 py-2">
        {/* Price Text */}
        {product.finalPrice < product.price ? (
          <>
            <del
              className="text-primary-dark inline-block text-sm font-light"
              suppressHydrationWarning
            >
              {formatCurrency(product.price)}
            </del>{" "}
            <span
              className="inline-block font-bold text-green-600 dark:text-green-400"
              suppressHydrationWarning
            >
              {formatCurrency(product.finalPrice)}
            </span>
          </>
        ) : (
          <span className="inline-block font-semibold" suppressHydrationWarning>
            {formatCurrency(product.price)}
          </span>
        )}

        {/* Top Rounded Edge */}
        <div
          className="text-background absolute end-0 bottom-full h-1.5 w-1.5 rounded-ee-full"
          style={{
            boxShadow: `${dir === "rtl" ? "-0" : "0"}.5rem .5rem 0 .5rem currentColor`,
          }}
        ></div>
        {/* Bottom Rounded Edge */}
        <div
          className="text-background absolute end-full bottom-0 h-1.5 w-1.5 rounded-ee-full"
          style={{
            boxShadow: `${dir === "rtl" ? "-0" : "0"}.5rem .5rem 0 .5rem currentColor`,
          }}
        ></div>
      </div>
    ),
    [product.finalPrice, product.price, formatCurrency, dir],
  );

  const renderLabels = useMemo(
    () => (
      <div className="absolute inset-x-1 top-1 flex flex-wrap justify-end gap-2">
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
    ),
    [product.labels],
  );
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-md">
      <Image
        className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-110"
        src={product.coverList[0]}
        alt={`${product.name} preview image`}
        width={512}
        height={512}
      />
      {renderPrice}
      {renderLabels}
      <div className="absolute inset-0 z-10">
        {" "}
        <Link
          className="hover-overlay absolute inset-0 -z-10"
          href={paths.product(product._id)}
        />
      </div>
    </div>
  );
}
