import { CartProduct } from "./api/cart";

export interface ActiveCartState {
  isLoading: boolean;
  products: CartProduct[];
  finalPrice: number;
}

export interface ActiveCartReducers {
  setIsLoading: (isLoading: boolean) => void;
  init: (products: CartProduct[], finalPrice?: number) => void;
  getProduct: (productId: string) => CartProduct | undefined;
  updateProduct: (product: CartProduct) => Promise<void>;
  transferLocalCartToAccount: () => Promise<void>;
}

export type ActiveCartStore = ActiveCartState & ActiveCartReducers;
