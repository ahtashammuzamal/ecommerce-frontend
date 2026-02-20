export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId?: number | null;
  children?: Category[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: Category;
}

export type ProductsResponse = {
  products: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
