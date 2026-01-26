import type { Product } from "./product";

export interface OrderItem {
  id: number;
  product: Product;
  quantity: string;
  subtotal: number;
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

export interface Order {
  id: number;
  total: number;
  status: boolean;
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
  createdAt: string;
}
