import { Suspense } from "react";

import Hero from "../hero";
import HomeCategories from "../categories";
import Testimonials from "../testimonials";
import NewestProducts from "../newest-products";
import NewestProductsLoading from "../loading/NewestProductsLoading";
import HomeCategoriesLoading from "../loading/HomeCategoriesLoading";

export default function HomeView() {
  return (
    <div>
      <Hero />

      <Suspense fallback={<NewestProductsLoading />}>
        <NewestProducts />
      </Suspense>
      <Suspense fallback={<HomeCategoriesLoading />}>
        <HomeCategories />
      </Suspense>

      <Testimonials />
    </div>
  );
}
