import type { Order, ORDER_STATUS, ShippingAddress } from "@/types";
import { api } from "./axios";

type CreateOrderRequest = {
  shippingAddress: ShippingAddress;
};

export const createOrderApi = (data: CreateOrderRequest) =>
  api.post("/orders/create", data);

  export const getUserOrdersApi = () => api.get<Order[]>("/orders");

export const updateOrderStatus = (orderId: number, status: ORDER_STATUS) =>
  api.patch(`/orders/:${orderId}/status`, status);
