export interface Product {
  _id: string;
  coverList: string[];
  rating: number;
  reviews: number;
  labels: Label[];
  tags: { _id: string; name: string }[];
  quantity: number;
  disabled: boolean;
  price: number;
  finalPrice: number;
  name: string;
  description: string;
  subcategory?: { _id: string; name: string };
  brand?: { _id: string; name: string };
}

export interface Label {
  _id: string;
  color: string;
  name: string;
}
