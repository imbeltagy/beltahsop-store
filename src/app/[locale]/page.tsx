import { getProducts } from "@/lib/actions/products";
import HomeView from "@/view/sections/home/view";

export default async function Page() {
  const products = await getProducts({
    page: 1,
    limit: 8,
  });

  return <HomeView />;
}
