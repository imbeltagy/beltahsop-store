"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect, useCallback } from "react";

import { Icons } from "@/lib/config/icons";
import { paths } from "@/lib/config/paths";
import { cn } from "@/lib/utils/style-functions";
import { Product } from "@/lib/types/api/products";
import { Iconify } from "@/view/components/iconify";
import { useBoolean } from "@/lib/hooks/use-boolean";
import { useDraftCartStore } from "@/lib/store/draft-cart";
import { Button, Tooltip } from "@/view/components/elements";
import { useActiveCartStore } from "@/lib/store/active-cart";

import IncreamentButton from "../increament-button";

export default function CardActions({
  product,
  className,
  disableLink,
}: {
  product: Product;
  className?: string;
  disableLink?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate mt-6 flex justify-between gap-2",
        className,
      )}
    >
      <DraftButton product={product} />

      <CartButton product={product} />

      {!disableLink && (
        <Link
          className="hover-overlay absolute inset-0 -z-10"
          href={paths.product(product._id)}
        />
      )}
    </div>
  );
}

function CartButton({ product }: { product: Product }) {
  const t = useTranslations("Pages.Product");

  const { getProduct, updateProduct, isLoading } = useActiveCartStore();

  const [quantity, setQuantity] = useState(0);

  const buttonLoading = useBoolean(false);

  const updateTimeout = useRef<NodeJS.Timeout | null>(null);

  // set initial quantity
  useEffect(() => {
    if (isLoading) return;

    setQuantity(getProduct(product._id)?.quantity ?? 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleUpdate = useCallback(
    (newQuantity: number) => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }

      updateTimeout.current = setTimeout(async () => {
        buttonLoading.onTrue();

        await updateProduct({
          productId: product._id,
          name: product.name,
          cover: product.coverList[0],
          itemPrice: product.price,
          quantity: newQuantity,
          totalPrice: product.price * newQuantity,
        });

        buttonLoading.onFalse();
      }, 800);
    },
    [
      product._id,
      product.coverList,
      product.name,
      product.price,
      buttonLoading,
      updateProduct,
    ],
  );

  if (quantity === 0)
    return (
      <Button
        variant="contained"
        color="primary"
        loading={buttonLoading.value}
        startIcon={Icons.CART}
        onClick={() => {
          setQuantity(1);
          handleUpdate(1);
        }}
      >
        {t("add_to_cart")}
      </Button>
    );

  return (
    <IncreamentButton
      value={quantity}
      onChange={(value) => {
        setQuantity(value);
        handleUpdate(value);
      }}
      max={product.quantity}
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
  );
}

function DraftButton({ product }: { product: Product }) {
  const t = useTranslations("Pages.Product");
  const { getProduct, updateProduct } = useDraftCartStore();

  const isInDraft = !!getProduct(product._id);

  const draftLoading = useBoolean(false);

  const handleDraft = useCallback(
    async (action: "add" | "remove") => {
      draftLoading.onTrue();

      await updateProduct({
        productId: product._id,
        name: product.name,
        cover: product.coverList[0],
        itemPrice: product.price,
        quantity: action === "add" ? 1 : 0,
        totalPrice: action === "add" ? product.price : 0,
      });

      draftLoading.onFalse();
    },
    [
      draftLoading,
      product._id,
      product.coverList,
      product.name,
      product.price,
      updateProduct,
    ],
  );

  return isInDraft ? (
    <Tooltip label={t("remove_from_collection")}>
      <button
        className={cn(
          "icon-btn p-1.5",
          draftLoading.value && "pointer-events-none animate-pulse",
        )}
        onClick={() => handleDraft("remove")}
        disabled={draftLoading.value}
      >
        <Iconify icon={Icons.TRASH} className="h-auto w-full text-red-500" />
      </button>
    </Tooltip>
  ) : (
    <Tooltip label={t("add_to_collection")}>
      <button
        className={cn(
          "icon-btn p-1.5",
          draftLoading.value && "pointer-events-none animate-pulse",
        )}
        onClick={() => handleDraft("add")}
        disabled={draftLoading.value}
      >
        <Iconify icon={Icons.BOOKMARK} className="text-primary h-auto w-full" />
      </button>
    </Tooltip>
  );
}
