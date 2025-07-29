"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

import { Icons } from "@/lib/config/icons";
import { paths } from "@/lib/config/paths";
import { Link } from "@/lib/i18n/navigation";
import { CartProduct } from "@/lib/types/api/cart";
import { useBoolean } from "@/lib/hooks/use-boolean";
import { useActiveCartStore } from "@/lib/store/active-cart";
import IncreamentButton from "@/view/components/features/product/increament-button";

export default function CheckoutItem({ product }: { product: CartProduct }) {
  const { updateProduct } = useActiveCartStore();
  const [quantity, setQuantity] = useState(product.quantity);

  const buttonLoading = useBoolean(false);

  const updateTimeout = useRef<NodeJS.Timeout | null>(null);

  // set initial quantity
  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  const handleUpdate = useCallback(
    (newQuantity: number) => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }

      updateTimeout.current = setTimeout(async () => {
        buttonLoading.onTrue();
        await updateProduct({
          productId: product.productId,
          name: product.name,
          cover: product.cover,
          itemPrice: product.itemPrice,
          quantity: newQuantity,
          totalPrice: product.itemPrice * newQuantity,
        });

        buttonLoading.onFalse();
      }, 800);
    },
    [buttonLoading, updateProduct, product],
  );

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      {/* Product Image */}
      <Link
        href={paths.product(product.productId)}
        className="block h-20 w-20 shrink-0 overflow-hidden rounded bg-gray-100"
      >
        <Image
          src={product.cover}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
          width={80}
          height={80}
        />
      </Link>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        <Link
          href={paths.product(product.productId)}
          className="line-clamp-2 text-sm font-medium hover:underline"
        >
          {product.name}
        </Link>
        <div className="text-muted-foreground mt-1 text-sm">
          {product.itemPrice} × {quantity}
        </div>
        <div className="text-primary mt-1 text-lg font-semibold">
          {product.totalPrice}
        </div>
      </div>

      {/* Quantity Controls */}
      <IncreamentButton
        value={quantity}
        onChange={(value) => {
          setQuantity(value);
          handleUpdate(value);
        }}
        slots={{
          decreseButton: {
            startIcon: quantity === 1 ? Icons.TRASH : undefined,
            className:
              quantity === 1
                ? "[&_svg]:h-5 [&_svg]:w-5 h-10 w-12 flex justify-center align-center"
                : undefined,
          },
        }}
        loading={buttonLoading.value}
      />
    </div>
  );
}
