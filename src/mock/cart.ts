// src/mocks/cart.ts
import type { Cart } from "@/types";
import { MOCK_PRODUCTS } from "./products";

export const MOCK_CART: Cart = {
  id: 1,
  cartItems: [
    {
      id: 1,
      product: MOCK_PRODUCTS[0], // iPhone 15 Pro
      quantity: 1,
    },
    {
      id: 2,
      product: MOCK_PRODUCTS[2], // MacBook Air M2
      quantity: 2,
    },
    {
      id: 3,
      product: MOCK_PRODUCTS[5], // Mechanical Keyboard
      quantity: 1,
    },
  ],
};
