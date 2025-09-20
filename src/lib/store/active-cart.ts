import { create } from "zustand";

import { useAuthStore } from "./auth";
import { LOCAL_STORAGE_KEYS } from "../config/global";
import { ActiveCart, CartProduct } from "../types/api/cart";
import { ActiveCartStore, ActiveCartState } from "../types/active-cart";
import {
  addProductToActiveCart,
  removeProductFromActiveCart,
  addMultipleProductsToActiveCart,
} from "../actions/active-cart";

const initialState: ActiveCartState = {
  isLoading: true,
  products: [],
  finalPrice: 0,
};

export const useActiveCartStore = create<ActiveCartStore>()((set, get) => ({
  ...initialState,
  setIsLoading: (isLoading) => set({ isLoading }),
  init: (products, finalPrice) => {
    const calculateFinalPrice = () => {
      return products.reduce((sum, p) => sum + p.totalPrice, 0);
    };

    set({
      products,
      finalPrice: finalPrice ?? calculateFinalPrice(),
      isLoading: false,
    });
  },
  getProduct: (productId: string) => {
    const { products } = get();
    return products.find((p) => p.productId === productId);
  },
  updateProduct: async (product) => {
    let { products, finalPrice } = get();
    const { isAuthenticated } = useAuthStore.getState();

    const storedProduct = products.find(
      (p) => p.productId === product.productId,
    );

    if (isAuthenticated) {
      const oldQuantity = storedProduct?.quantity ?? 0;
      const quantityDiff = product.quantity - oldQuantity;

      let newState: ActiveCart;

      if (quantityDiff > 0) {
        newState = await addProductToActiveCart(
          product.productId,
          quantityDiff,
        );
      } else {
        newState = await removeProductFromActiveCart(
          product.productId,
          -quantityDiff,
        );
      }

      set({
        products: newState.products,
        finalPrice: newState.finalPrice,
      });
    } else {
      let priceDiff = 0;
      if (product.quantity <= 0) {
        priceDiff = -(storedProduct?.totalPrice ?? 0);
        products = products.filter((p) => p.productId !== product.productId);
      } else {
        priceDiff = product.totalPrice - (storedProduct?.totalPrice ?? 0);

        if (storedProduct) {
          products = products.map((p) =>
            p.productId === product.productId ? product : p,
          );
        } else {
          products.push(product);
        }
      }

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ActiveCart,
        JSON.stringify(products),
      );

      set({
        products,
        finalPrice: finalPrice + priceDiff,
      });
    }
  },
  transferLocalCartToAccount: async () => {
    const products = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.ActiveCart) ?? "[]",
    ) as CartProduct[];

    const updatedCart = await addMultipleProductsToActiveCart(
      products.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
    );

    set({
      products: updatedCart.products,
      finalPrice: updatedCart.finalPrice,
      isLoading: false,
    });

    localStorage.removeItem(LOCAL_STORAGE_KEYS.ActiveCart);
  },
}));
