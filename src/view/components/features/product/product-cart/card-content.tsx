import { Chip } from "@/view/components/elements";
import { Product } from "@/lib/types/api/products";
import { Rating } from "@/view/components/elements";

export default function CardContent({ product }: { product: Product }) {
  return (
    <>
      <h4 className="w-fit text-xl font-semibold lg:text-2xl">
        {product.name}
      </h4>

      {/* Rating */}
      <Rating stars={product.rating} className="ms-0 mt-1 mb-2 w-fit" />

      <div className="flex w-fit gap-2">
        {product.brand?.name && (
          <Chip size="small" className="cursor-pointer">
            {product.brand.name}
          </Chip>
        )}

        {product.tags.map((item) => (
          <Chip key={item._id} size="small" className="cursor-pointer">
            {item.name}
          </Chip>
        ))}
      </div>
    </>
  );
}
