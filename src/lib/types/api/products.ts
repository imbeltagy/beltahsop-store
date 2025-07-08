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
  brand?: Brand;
}

export interface Brand {
  _id: string;
  nameAr: string;
  nameEn: string;
  cover: string;
  disabled: boolean;
  products: string[];
  employeeReadOnly: boolean;
  __v: number;
  updatedAt: Date;
  createdAt?: Date;
  category?: null | string;
}

export interface Label {
  _id: string;
  color: string;
  name: string;
}
