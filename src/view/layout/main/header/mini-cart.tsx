import Image from "next/image";
import { Fragment } from "react";
import { useTranslations } from "next-intl";

import { paths } from "@/lib/config/paths";
import { Icons } from "@/lib/config/icons";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/style-functions";
import { CartProduct } from "@/lib/types/api/cart";
import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/ui/button";
import { Skeleton } from "@/view/components/ui/skeleton";
import { useActiveCartStore } from "@/lib/store/active-cart";

export default function MiniCart() {
  const { products, isLoading, finalPrice } = useActiveCartStore();
  const t = useTranslations("Pages.Product");

  // Skeletons while loading
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-14 w-14" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
        <Skeleton className="mt-6 h-10 w-full" />
      </div>
    );
  }

  // Empty cart view
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Iconify
          icon={Icons.CART}
          className="text-gray-300"
          style={{ fontSize: 64 }}
        />
        <div className="mt-4 text-lg font-semibold text-gray-500">
          {t("cart_empty")}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-4">
      <div className="max-h-[min(300px,50vh)] space-y-4 overflow-y-auto">
        {products.map((product, index) => (
          <Fragment key={product.productId}>
            {index > 0 && <div className="border-divider w-full border" />}
            <CartItem product={product} />
          </Fragment>
        ))}
      </div>
      <div className="mt-4">
        <Button
          asChild
          variant="default"
          className="w-full py-3 text-base no-underline"
        >
          <a href={paths.store}>{t("go_to_cart", { finalPrice })}</a>
        </Button>
      </div>
    </div>
  );
}

function CartItem({ product }: { product: CartProduct }) {
  const { updateProduct } = useActiveCartStore();
  const t = useTranslations("Pages.Product");

  return (
    <div key={product.productId} className="flex items-center gap-3">
      {/* 1st column: Cover */}
      <Link
        href={paths.product(product.productId)}
        className="block h-14 w-14 shrink-0 overflow-hidden rounded bg-gray-100"
      >
        <Image
          src={product.cover}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
          width={56}
          height={56}
        />
      </Link>
      {/* 2nd column: Details with large quantity */}
      <div className="flex-1">
        <Link
          href={paths.product(product.productId)}
          className="block truncate text-sm font-medium hover:underline"
        >
          {product.name}
        </Link>
        <div className="mt-1 text-xs">
          <span className="text-xs font-semibold text-gray-500">
            {product.itemPrice}
          </span>
          <span className="inline-block translate-y-1 px-1 text-lg leading-0">
            *
          </span>
          <span className="text-primary ml-1 align-middle text-lg font-bold">
            {product.quantity}
          </span>
        </div>
        <div className="text-xs font-semibold">{product.totalPrice}</div>
      </div>
      {/* 3rd column: Vertical buttons */}
      <div className="flex flex-col items-center justify-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={async () => {
            const newQty = product.quantity + 1;
            if (newQty <= 99) {
              await updateProduct({
                ...product,
                quantity: newQty,
                totalPrice: product.itemPrice * newQty,
              });
            }
          }}
          aria-label={t("increase")}
          className="cursor-pointer"
        >
          <Iconify icon={Icons.PLUS} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={async () => {
            const newQty = product.quantity - 1;
            if (newQty >= 0) {
              await updateProduct({
                ...product,
                quantity: newQty,
                totalPrice: product.itemPrice * newQty,
              });
            }
          }}
          aria-label={product.quantity === 1 ? t("remove") : t("decrease")}
          className={cn(
            "cursor-pointer",
            product.quantity === 1 ? "text-destructive" : undefined,
          )}
        >
          <Iconify icon={product.quantity === 1 ? Icons.TRASH : Icons.MINUS} />
        </Button>
      </div>
    </div>
  );
}
