"use client";

import { useTranslations } from "next-intl";

import { Product } from "@/lib/types/api/products";
import { Container } from "@/view/components/elements";
import ProductCard from "@/view/components/features/product/product-card";
import SectionHeadding from "@/view/components/features/section-headding";

interface Props {
  products: Product[];
}

export default function NewestProducts({ products }: Props) {
  const t = useTranslations("Pages.Home.NewestShoes");

  return (
    <section className="bg-[#F9FAFB]">
      <Container className="py-sectionV-sm md:py-sectionV-md">
        <SectionHeadding
          headding={t("headding")}
          subheadding={t("subheadding")}
        />

        {/* Content */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item) => {
            return <ProductCard {...item} key={item._id} />;
          })}
        </div>
      </Container>
    </section>
  );
}
