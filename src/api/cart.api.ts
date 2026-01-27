import { api } from "./axios";

type UpdateCartApiData = {
  id: number;
  action: "increment" | "decrement";
};

export const getUserCartApi = () => api.get("/cart");

export const addToCartApi = (productId: number) =>
  api.post(`/cart/add/:${productId}`);

export const updateCartApi = (data: UpdateCartApiData) =>
  api.patch("/cart/update", data);

export const removeFromCartApi = (id: number) => api.delete(`/cart/:${id}`);

export const clearCartApi = () => api.post("/cart/clear");
