"use client";

import SectionHeadding from "@/view/components/section-headding";
import { ProductSumCard } from "@/view/components/product-card";
import { ProductSum } from "@/lib/types/products";
import { useTranslations } from "next-intl";

interface Props {
  products: ProductSum[];
}

export default function NewestProducts({ products }: Props) {
  const t = useTranslations("Pages.Home.NewestShoes");

  return (
    <section className="bg-second">
      <div className="main-container px-4 py-section-sm md:py-section-md">
        <SectionHeadding
          headding={t("headding")}
          subheadding={t("subheadding")}
          darkBG
        />

        {/* Content */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.map((item) => {
            return <ProductSumCard {...item} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
}
