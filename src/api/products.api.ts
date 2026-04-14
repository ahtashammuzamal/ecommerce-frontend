import type { Product, ProductsResponse, SingleProductResponse } from "@/types";
import { api } from "./axios";

export type ProductFiltersType = {
  search?: string;
  categories?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "createdAt" | "price" | "title";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};

const cleanParams = (params: ProductFiltersType) => {
  const entries = Object.entries(params);

  const filtered = entries.filter(([key, value]) => {
    return value !== undefined && value !== "";
  });

  return Object.fromEntries(filtered);
};

export const getAllProductsApi = (filters: ProductFiltersType) =>
  api.get<ProductsResponse>("/products", { params: cleanParams(filters) });

export const getSingleProductApi = (id: number) =>
  api.get<SingleProductResponse>(`/products/${id}`);

export const createProductApi = (data: Product) =>
  api.post("/products/create", data);

export const updateProductApi = (id: number, data: Product) =>
  api.patch<{ message: string; product: Product }>(`/products/${id}`, data);

export const deleteProductApi = (id: number) => api.delete(`/products/${id}`);
