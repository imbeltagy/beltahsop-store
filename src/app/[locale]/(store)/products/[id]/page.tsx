import { use } from "react";

import ProductDetailsView from "@/view/sections/product-details";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ProductDetailsView id={id} />;
}
