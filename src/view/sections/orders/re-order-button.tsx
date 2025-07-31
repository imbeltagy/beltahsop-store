"use client";

import { useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";

import { getOrder } from "@/lib/actions/orders";
import { cn } from "@/lib/utils/style-functions";
import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/ui/button";
import { useBoolean } from "@/lib/hooks/use-boolean";
import { OrderDetails } from "@/lib/types/api/orders";

import ReOrderDialog from "./re-order-dialog";

interface ReOrderButtonProps {
  orderId: string;
  className?: string;
}

export default function ReOrderButton({
  orderId,
  className,
}: ReOrderButtonProps) {
  const t = useTranslations("Pages.Orders");
  const { enqueueSnackbar } = useSnackbar();

  const isDialogOpen = useBoolean();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const isLoading = useBoolean();

  const handleClick = async () => {
    isLoading.onTrue();
    try {
      const orderData = await getOrder(orderId);
      setOrder(orderData);
      isDialogOpen.onTrue();
    } catch (ignoreError) {
      enqueueSnackbar(t("error_loading_order"), {
        variant: "error",
      });
    } finally {
      isLoading.onFalse();
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={cn("text-green-600 hover:text-green-700", className)}
        onClick={handleClick}
        disabled={isLoading.value}
      >
        {isLoading.value ? (
          <Iconify icon="mdi:loading" className="h-4 w-4 animate-spin" />
        ) : (
          <Iconify icon="mdi:refresh" className="h-4 w-4" />
        )}
        {t("order_again")}
      </Button>

      {order && (
        <ReOrderDialog
          isOpen={isDialogOpen.value}
          onClose={isDialogOpen.onFalse}
          order={order}
        />
      )}
    </>
  );
}
