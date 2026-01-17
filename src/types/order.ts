import type { Product } from "./product";

export interface OrderItem {
  id: number;
  product: Product;
  quantity: string;
  subtotal: number;
}

export interface Order {
  id: number;
  total: number;
  status: boolean;
  orderItems: OrderItem[];
  createdAt: string;
}
