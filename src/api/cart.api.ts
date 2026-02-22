import type { GetCartApiResponse } from "@/types";
import { api } from "./axios";

type UpdateCartApiData = {
  id: number;
  action: "increment" | "decrement";
};

export const getUserCartApi = () => api.get<GetCartApiResponse>("/cart");

export const addToCartApi = (data: { productId: number; quantity: number }) =>
  api.post("/cart/add", data);

export const updateCartApi = (data: UpdateCartApiData) =>
  api.patch("/cart/update", data);

export const removeFromCartApi = (id: number) => api.delete(`/cart/${id}`);

export const clearCartApi = () => api.post("/cart/clear");
