"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useAuthStore } from "@/lib/store/auth";
import { Button } from "@/view/components/ui/button";
import { useBoolean } from "@/lib/hooks/use-boolean";
import Alert from "@/view/components/elements/alert";
import { useActiveCartStore } from "@/lib/store/active-cart";
import { createCheckoutSession } from "@/lib/actions/checkout";

import RequireAuthDialog from "../auth/view/require-auth-dialog";

export default function CheckoutSummary() {
  const t = useTranslations("Pages.Checkout");
  const { isAuthenticated } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const paymentLoading = useBoolean();
  const authDialogOpen = useBoolean();

  // Handle payment processing
  const handlePayment = async () => {
    if (!isAuthenticated) return;
    setError(null);
    paymentLoading.onTrue();

    try {
      const { url } = await createCheckoutSession();

      window.location.href = url;
    } catch (ignoreError) {
      setError(t("payment_failed"));
    }

    paymentLoading.onFalse();
  };

  return (
    <>
      <div className="space-y-6">
        <OrderSummary />

        {/* Development Warning */}
        {error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
          <Alert variant="warning" title={t("development_warning_title")}>
            {t("development_warning_message")}
          </Alert>
        )}

        {/* Payment Button */}
        <Button
          onClick={isAuthenticated ? handlePayment : authDialogOpen.onTrue}
          className="w-full py-6 text-lg font-semibold"
          size="lg"
          // loading={paymentLoading.value}
        >
          {paymentLoading.value ? t("processing_payment") : t("pay_now")}
        </Button>
      </div>

      <RequireAuthDialog
        isOpen={authDialogOpen.value}
        onClose={authDialogOpen.onFalse}
      />
    </>
  );
}

function OrderSummary() {
  const finalPrice = useActiveCartStore(({ finalPrice }) => finalPrice);

  const t = useTranslations("Pages.Checkout");
  return (
    <div className="bg-muted/30 rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">{t("order_summary")}</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>{t("subtotal")}</span>
          <span>{finalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>{t("shipping")}</span>
          <span>{t("free")}</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-lg font-semibold">
          <span>{t("total")}</span>
          <span className="text-primary">{finalPrice}</span>
        </div>
      </div>
    </div>
  );
}
