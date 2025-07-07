export interface Product {
  _id: string;
  coverList: string[];
  rating: number;
  reviews: number;
  labels: any[];
  tags: any[];
  quantity: number;
  disabled: boolean;
  price: number;
  finalPrice: number;
  name: string;
  description: string;
  subcategory?: Brand;
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
