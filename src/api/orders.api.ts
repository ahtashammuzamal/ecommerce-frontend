import type { ORDER_STATUS, ShippingAddress } from "@/types";
import { api } from "./axios";

export const createOrderApi = (data: ShippingAddress) =>
  api.post("/orders/create", data);

export const getUserOrdersApi = () => api.get("/orders");

export const updateOrderStatus = (orderId: number, status: ORDER_STATUS) =>
  api.patch(`/orders/:${orderId}/status`, status);
