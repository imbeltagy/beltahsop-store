"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";

import { useAuthStore } from "@/lib/store/auth";
import { CartProduct } from "@/lib/types/api/cart";
import { getDraftCart } from "@/lib/actions/draft-cart";
import { LOCAL_STORAGE_KEYS } from "@/lib/config/global";
import { getActiveCart } from "@/lib/actions/active-cart";
import { useDraftCartStore } from "@/lib/store/draft-cart";
import { useActiveCartStore } from "@/lib/store/active-cart";

export default function InitCart() {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();
  const { init } = useActiveCartStore();
  const { init: initDraftCart } = useDraftCartStore();

  useEffect(() => {
    if (isAuthLoading) return;

    if (isAuthenticated) {
      (async () => {
        try {
          const activeCart = await getActiveCart();
          init(activeCart.products, activeCart.finalPrice);
        } catch (error) {
          enqueueSnackbar(error as string, { variant: "error" });
        }
        try {
          const draftCart = await getDraftCart();
          initDraftCart(draftCart.products);
        } catch (error) {
          enqueueSnackbar(error as string, { variant: "error" });
        }
      })();
    } else {
      const activeCart: CartProduct[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEYS.ActiveCart) ?? "[]",
      );

      init(activeCart);

      const draftCart: CartProduct[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEYS.DraftCart) ?? "[]",
      );

      initDraftCart(draftCart);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoading]);

  return null;
}
