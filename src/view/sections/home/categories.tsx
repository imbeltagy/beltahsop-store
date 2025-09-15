import { getTranslations } from "next-intl/server";

import { Container } from "@/view/components/elements";
import { getCategories } from "@/lib/actions/categories";
import { getSubCategories } from "@/lib/actions/sub-categories";
import CategoryCard from "@/view/components/features/category-card";
import SectionHeadding from "@/view/components/features/section-headding";

export default async function HomeCategories() {
  const { data: categories } = await getCategories({ limit: 6 });
  const { data: subCategories } = await getSubCategories({ limit: 6 });

  const t = await getTranslations("Pages.Home.Categories");

  return (
    <section className="bg-neutral py-sectionV-sm md:py-sectionV-md">
      <Container>
        <SectionHeadding
          headding={t("headding")}
          subheadding={t("subheadding")}
        />

        <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
          {subCategories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              isSubCategory
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
