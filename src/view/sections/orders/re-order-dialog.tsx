"use client";

import Image from "next/image";
import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";

import { orderAgain } from "@/lib/actions/orders";
import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/ui/button";
import { useBoolean } from "@/lib/hooks/use-boolean";
import { OrderDetails } from "@/lib/types/api/orders";
import { useActiveCartStore } from "@/lib/store/active-cart";

interface ReOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDetails;
}

export default function ReOrderDialog({
  isOpen,
  onClose,
  order,
}: ReOrderDialogProps) {
  const t = useTranslations("Pages.Orders");
  const { enqueueSnackbar } = useSnackbar();

  const isLoading = useBoolean();
  const initActiveCart = useActiveCartStore((state) => state.init);

  const handleConfirm = async () => {
    isLoading.onTrue();
    try {
      const activeCart = await orderAgain(order._id);
      initActiveCart(activeCart.products, activeCart.finalPrice);
      onClose();
    } catch (ignoreError) {
      enqueueSnackbar(t("error_reordering"), { variant: "error" });
    } finally {
      isLoading.onFalse();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background mx-4 w-full max-w-md rounded-lg p-6">
        <div className="mb-4 flex items-center gap-3">
          <Iconify icon="mdi:refresh" className="h-6 w-6 text-green-600" />
          <h3 className="text-lg font-semibold">{t("reorder_dialog_title")}</h3>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground mb-4">
            {t("reorder_dialog_message", { orderId: order._id.slice(-8) })}
          </p>

          <div className="max-h-48 overflow-y-auto rounded-lg border bg-gray-50 p-3">
            <div className="space-y-2">
              {order.products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between rounded bg-white p-2"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <Image
                      src={product.cover}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {t("qty")} {product.quantity} × $
                        {product.itemPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${product.totalPrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-blue-800">
              <strong>{t("total")}:</strong> ${order.finalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            disabled={isLoading.value}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={isLoading.value}
          >
            {isLoading.value ? (
              <>
                <Iconify
                  icon="mdi:loading"
                  className="mr-2 h-4 w-4 animate-spin"
                />
                {t("adding_to_cart")}
              </>
            ) : (
              <>
                <Iconify icon="mdi:cart-plus" className="mr-2 h-4 w-4" />
                {t("add_to_cart")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
