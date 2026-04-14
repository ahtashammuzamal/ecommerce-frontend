export interface Category {
  id: number;
  name: string;
  slug: string;
  imageURL: string;
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  categoryId: number;
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

export type SingleProductResponse = {
  message: string;
  product: Product;
};
