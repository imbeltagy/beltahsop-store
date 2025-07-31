export interface Order {
  _id: string;
  finalPrice: number;
  status: string;
  createdAt: Date;
}

export interface OrderDetails {
  _id: string;
  user: string;
  finalPrice: number;
  status: string;
  createdAt: Date;
  products: Product[];
}

export interface Product {
  _id: string;
  productId: string;
  name: string;
  itemPrice: number;
  quantity: number;
  totalPrice: number;
  cover: string;
}
