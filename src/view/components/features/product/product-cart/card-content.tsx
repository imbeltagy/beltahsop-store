import Link from "next/link";
import { Chip } from "@/view/components/elements";
import { Product } from "@/lib/types/api/products";
import { Rating } from "@/view/components/elements";
import { paths } from "@/lib/config/paths";

export default function CardContent({ product }: { product: Product }) {
  return (
    <>
      <h4 className="w-fit text-xl font-semibold lg:text-2xl">
        {product.name}
      </h4>

      {/* Rating */}
      <Rating stars={product.rating} className="ms-0 mt-1 mb-2 w-fit" />

      <div className="flex w-fit flex-wrap gap-2">
        {product.brand && (
          <Link
            href={{
              pathname: paths.products,
              query: { brandId: product.brand._id, name: product.brand.name },
            }}
          >
            <Chip size="small" className="cursor-pointer">
              {product.brand.name}
            </Chip>
          </Link>
        )}

        {product.tags.map((item) => (
          <Link
            key={item._id}
            href={{
              pathname: paths.products,
              query: { tagId: item._id, name: item.name },
            }}
          >
            <Chip size="small" className="cursor-pointer">
              {item.name}
            </Chip>
          </Link>
        ))}
      </div>
    </>
  );
}
