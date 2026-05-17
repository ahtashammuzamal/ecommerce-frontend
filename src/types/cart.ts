import type { Product } from "./product";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  cartItems: CartItem[];
}

export type GetCartApiResponse = {
  success: boolean;
  totalCartItems: number;
  cart?: {
    id: number;
    userId: number;
    cartItems: CartItem[];
    createdAt: string;
    updatedAt: string;
  };
};
