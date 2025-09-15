import { Category } from "./categories";

export interface SubCategory {
  _id: string;
  name: string;
  cover: string;
  category: null | string;
}

export interface SubCategoryDetails extends Omit<SubCategory, "category"> {
  category: Category | null;
}
