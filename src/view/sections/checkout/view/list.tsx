"use client";

import { useTranslations } from "next-intl";

import { useActiveCartStore } from "@/lib/store/active-cart";

// Import the new components
import CheckoutEmpty from "../static/empty";
import CheckoutItem from "../checkout-item";
import CheckoutLoading from "../static/loading";
import CheckoutSummary from "../checkout-summary";

export default function CheckoutList() {
  const { products, isLoading } = useActiveCartStore();
  const t = useTranslations("Pages.Checkout");

  if (isLoading) return <CheckoutLoading />;
  if (products.length === 0) return <CheckoutEmpty />;

  return (
    <>
      <div className="container mx-auto mt-4 max-w-7xl px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{t("checkout_title")}</h1>
            <div className="text-muted-foreground text-sm">
              {products.length} {t("items_count", { count: products.length })}
            </div>
          </div>

          {/* Two Column Layout for Big Screens */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Products Column - Takes 2/3 of space */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {products.map((product) => (
                  <CheckoutItem key={product.productId} product={product} />
                ))}
              </div>
            </div>

            {/* Order Summary Column - Takes 1/3 of space */}
            <div className="lg:col-span-1">
              <CheckoutSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
