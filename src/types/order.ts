import type { Product } from "./product";

export interface OrderItem {
  id: number;
  orderId: number;
  product: Product;
  quantity: string;
  subTotal: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName?: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  phone: number;
}

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: number;
  userId: number;
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
  createdAt: string;
}
