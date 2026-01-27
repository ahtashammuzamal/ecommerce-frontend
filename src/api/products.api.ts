import type { Product } from "@/types";
import { api } from "./axios";

type ProductFilters = {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "createdAt" | "price" | "title";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};

const cleanParams = (params: ProductFilters) => {
  const entries = Object.entries(params);

  const filtered = entries.filter(([key, value]) => {
    return value !== undefined && value !== "";
  });

  return Object.fromEntries(filtered);
};

export const getAllProductsApi = (filters: ProductFilters) =>
  api.get("/products", { params: cleanParams(filters) });

export const createProductApi = (data: Product) => api.post("/products", data);
export const updateProductApi = (data: Product) => api.patch("/products", data);
export const deleteProductApi = (id: number) => api.delete(`/products/${id}`);
