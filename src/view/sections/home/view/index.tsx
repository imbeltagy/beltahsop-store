import { Product } from "@/lib/types/api/products";

import Hero from "../hero";
import HomeCategories from "../categories";
import Testimonials from "../testimonials";
import NewestProducts from "../newest-products";

interface Props {
  products: Product[];
}

export default function HomeView({ products }: Props) {
  return (
    <div>
      <Hero />
      <NewestProducts products={products} />
      <HomeCategories />
      <Testimonials />
    </div>
  );
}
