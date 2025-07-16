import { getTranslations } from "next-intl/server";

import { getProducts } from "@/lib/actions/products";
import { Container } from "@/view/components/elements";
import ProductCard from "@/view/components/features/product/product-cart";
import SectionHeadding from "@/view/components/features/section-headding";

export default async function NewestProducts() {
  const { data: products } = await getProducts({
    page: 1,
    limit: 6,
  });

  const t = await getTranslations("Pages.Home.NewestProducts");

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
