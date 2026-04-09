import type { Order, ORDER_STATUS, ShippingAddress } from "@/types";
import { api } from "./axios";

type CreateOrderRequest = {
  shippingAddress: ShippingAddress;
};

type GetAllOrdersResponse = {
  orders: Order[];
  totalOrders: number;
  PENDING: number;
  PAID: number;
  SHIPPED: number;
  DELIVERED: number;
  CANCELLED: number;
};

type UpdateOrderStatusResponse = {
  message: string;
  order: Order;
};

export const createOrderApi = (data: CreateOrderRequest) =>
  api.post("/orders/create", data);

export const getUserOrdersApi = () => api.get<Order[]>("/orders");

export const updateOrderStatus = (
  orderId: number,
  data: { status: ORDER_STATUS },
) => api.patch<UpdateOrderStatusResponse>(`/orders/${orderId}/status`, data);

export const getAllOrders = () => api.get<GetAllOrdersResponse>("/orders/all");
