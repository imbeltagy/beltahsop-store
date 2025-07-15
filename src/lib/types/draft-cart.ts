import { CartProduct } from "./api/cart";

export interface DraftCartState {
  isLoading: boolean;
  products: CartProduct[];
}

export interface DraftCartReducers {
  setIsLoading: (isLoading: boolean) => void;
  init: (products: CartProduct[]) => void;
  getProduct: (productId: string) => CartProduct | undefined;
  updateProduct: (product: CartProduct) => Promise<void>;
  transferLocalCartToAccount: () => Promise<void>;
}

export type DraftCartStore = DraftCartState & DraftCartReducers;
