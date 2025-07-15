import { create } from "zustand";

import { useAuthStore } from "./auth";
import { LOCAL_STORAGE_KEYS } from "../config/global";
import { DraftCart, CartProduct } from "../types/api/cart";
import { DraftCartStore, DraftCartState } from "../types/draft-cart";
import {
  addProductToDraftCart,
  removeProductFromDraftCart,
  addMultipleProductsToDraftCart,
} from "../actions/draft-cart";

const initialState: DraftCartState = {
  isLoading: true,
  products: [],
};

export const useDraftCartStore = create<DraftCartStore>()((set, get) => ({
  ...initialState,
  setIsLoading: (isLoading) => set({ isLoading }),
  init: (products) => {
    set({
      products,
      isLoading: false,
    });
  },
  getProduct: (productId: string) => {
    const { products } = get();
    return products.find((p) => p.productId === productId);
  },
  updateProduct: async (product) => {
    let { products } = get();
    const { isAuthenticated } = useAuthStore.getState();

    const storedProduct = products.find(
      (p) => p.productId === product.productId,
    );

    if (isAuthenticated) {
      const oldQuantity = storedProduct?.quantity ?? 0;
      const quantityDiff = product.quantity - oldQuantity;

      let newState: DraftCart;

      if (quantityDiff > 0) {
        newState = await addProductToDraftCart(product.productId, quantityDiff);
      } else {
        newState = await removeProductFromDraftCart(
          product.productId,
          quantityDiff * -1,
        );
      }

      set({
        products: newState.products,
      });
    } else {
      if (product.quantity <= 0) {
        products = products.filter((p) => p.productId !== product.productId);
      } else {
        if (storedProduct) {
          products = products.map((p) =>
            p.productId === product.productId ? product : p,
          );
        } else {
          products.push(product);
        }
      }

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.DraftCart,
        JSON.stringify(products),
      );

      set({
        products,
      });
    }
  },
  transferLocalCartToAccount: async () => {
    const products = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.DraftCart) ?? "[]",
    ) as CartProduct[];

    if (products.length > 0) {
      const updatedCart = await addMultipleProductsToDraftCart(
        products.map(({ productId, quantity }) => ({
          productId,
          quantity,
        })),
      );

      set({
        products: updatedCart.products,
        isLoading: false,
      });

      localStorage.removeItem(LOCAL_STORAGE_KEYS.DraftCart);
    }
  },
}));
