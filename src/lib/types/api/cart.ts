export interface CartProduct {
  productId: string;
  name: string;
  cover: string;
  itemPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface ActiveCart {
  products: CartProduct[];
  finalPrice: number;
}

export interface DraftCart {
  products: CartProduct[];
}
