import HomeView from "@/view/sections/home/view";
import { getProducts } from "@/lib/actions/products";

export default async function Page() {
  const products = await getProducts({
    page: 1,
    limit: 6,
  });

  return <HomeView products={products.data} />;
}
