import Link from "next/link";

import { paths } from "@/lib/config/paths";
import { cn } from "@/lib/utils/style-functions";
import { Product } from "@/lib/types/api/products";

import CartHeader from "./card-header";
import CardContent from "./card-content";
import CardActions from "./card-actions";

export default function ProductCard(product: Product) {
  const renderLinkOverlay = (
    <Link
      className="hover-overlay absolute inset-0 -z-10"
      href={paths.product(product._id)}
    />
  );

  return (
    <div
      className={cn(
        "group/card bg-background relative isolate flex flex-col rounded-md p-4 shadow",
        "transition-shadow duration-300 has-[.hover-overlay:hover]:shadow-2xl",
      )}
    >
      {renderLinkOverlay}
      {/* Img Container */}
      <CartHeader product={product} />

      {/* Divider */}
      <hr className="border-divider my-4 border-1" />

      {/* Text */}
      <CardContent product={product} />

      {/* Empty Space to set Actions at bottom */}
      <div className="relative -z-20 grow" />

      <CardActions product={product} />
    </div>
  );
}
