import Image from "next/image";
import { useTranslations } from "next-intl";

import { useFormat } from "@/lib/hooks/format";
import { cn } from "@/lib/utils/style-functions";
import { OrderDetails } from "@/lib/types/api/orders";

export default function OrderProductsList({
  products,
  className,
}: {
  products: OrderDetails["products"];
  className?: string;
}) {
  const { formatCurrency } = useFormat();
  const t = useTranslations("Pages.Orders");

  return (
    <div className={cn("bg-card rounded-lg border", className)}>
      <div className="border-b p-6">
        <h3 className="text-lg font-semibold">{t("products")}</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={product.cover}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t("quantity")}: {product.quantity}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t("price_each", {
                      price: formatCurrency(product.itemPrice),
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {formatCurrency(product.totalPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
