"use client";

import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import { useMemo, useState, useEffect, useCallback } from "react";

import { paths } from "@/lib/config/paths";
import { Icons } from "@/lib/config/icons";
import { useFormat } from "@/lib/hooks/format";
import { Product } from "@/lib/types/api/products";
import { cn } from "@/lib/utils/style-functions/cn";
import { useBoolean } from "@/lib/hooks/use-boolean";
import { useDraftCartStore } from "@/lib/store/draft-cart";
import { useCurrentLocale } from "@/lib/hooks/locale-hooks";
import { useActiveCartStore } from "@/lib/store/active-cart";

import IncreamentButton from "./increament-button";
import { Chip, Button, Rating } from "../../elements";

export default function ProductCard(product: Product) {
  const { dir } = useCurrentLocale();
  const { formatCurrency } = useFormat();

  const { getProduct, updateProduct } = useActiveCartStore();
  const { getProduct: getDraftProduct, updateProduct: updateDraftProduct } =
    useDraftCartStore();

  const [quantity, setQuantity] = useState(
    getProduct(product._id)?.quantity ?? 0,
  );
  const [debouncedQuantity] = useDebounce(quantity, 800);

  const quantityLoading = useBoolean(false);
  const draftLoading = useBoolean(false);

  useEffect(() => {
    if (debouncedQuantity === getProduct(product._id)?.quantity) return;

    async function handleUpdate() {
      quantityLoading.onTrue();

      await updateProduct({
        productId: product._id,
        name: product.name,
        cover: product.coverList[0],
        itemPrice: product.price,
        quantity: debouncedQuantity,
        totalPrice: product.price * debouncedQuantity,
      });

      quantityLoading.onFalse();
    }

    handleUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuantity]);

  const handleDraft = useCallback(
    async (action: "add" | "remove") => {
      draftLoading.onTrue();

      await updateDraftProduct({
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
      updateDraftProduct,
    ],
  );

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

  const renderLinkOverlay = (
    <Link
      className="hover-overlay absolute inset-0 -z-10"
      href={`${paths.store}/${product._id}`}
    />
  );

  return (
    <div
      className={cn(
        "group/card bg-background relative isolate flex flex-col overflow-hidden rounded-md p-4 shadow",
        "transition-shadow duration-300 has-[.hover-overlay:hover]:shadow-2xl",
      )}
    >
      {renderLinkOverlay}
      {/* Img Container */}
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
        <div className="absolute inset-0 z-10">{renderLinkOverlay}</div>
      </div>

      {/* Divider */}
      <hr className="border-divider my-4 border-1" />

      {/* Text */}
      <h4 className="w-fit text-xl font-semibold lg:text-2xl">
        {product.name}
      </h4>

      {/* Rating */}
      <Rating stars={product.rating} className="ms-0 mt-1 mb-2 w-fit" />

      <div className="flex w-fit gap-2">
        {product.subcategory?.name && (
          <Chip size="small" className="cursor-pointer">
            {product.subcategory.name}
          </Chip>
        )}

        {product.tags.map((item) => (
          <Chip key={item._id} size="small" className="cursor-pointer">
            {item.name}
          </Chip>
        ))}
      </div>

      {/* Empty Space to set Actions at bottom */}
      <div className="relative -z-20 grow" />

      <div className="relative isolate mt-6 flex justify-between gap-2">
        {getDraftProduct(product._id) ? (
          <Button
            startIcon={Icons.TRASH}
            variant="contained"
            loading={draftLoading.value}
            onClick={() => handleDraft("remove")}
          />
        ) : (
          <Button
            startIcon={Icons.HEART}
            variant="contained"
            loading={draftLoading.value}
            onClick={() => handleDraft("add")}
          />
        )}

        <IncreamentButton
          value={quantity}
          onChange={(value) => setQuantity(value)}
          max={product.quantity}
          slots={{
            decreseButton: { loading: quantityLoading.value },
            textInput: { disabled: quantityLoading.value },
            incrementButton: { loading: quantityLoading.value },
          }}
        />
        {renderLinkOverlay}
      </div>
    </div>
  );
}
