// src/mocks/products.ts
import type { Product } from "@/types";
import { MOCK_CATEGORIES } from "./categories";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    description: "Apple iPhone 15 Pro with A17 chip and titanium body.",
    price: 1199,
    images: ["https://picsum.photos/id/1011/400/400"],
    stock: 12,
    category: MOCK_CATEGORIES[0],
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    description: "Samsung flagship smartphone with 200MP camera.",
    price: 1099,
    images: ["https://picsum.photos/id/1012/400/400"],
    stock: 8,
    category: MOCK_CATEGORIES[0],
  },
  {
    id: 3,
    title: "MacBook Air M2",
    description: "Lightweight laptop powered by Apple M2 chip.",
    price: 1299,
    images: ["https://picsum.photos/id/180/400/400"],
    stock: 5,
    category: MOCK_CATEGORIES[1],
  },
  {
    id: 4,
    title: "Dell XPS 15",
    description: "Premium laptop with Intel i7 and stunning display.",
    price: 1499,
    images: ["https://picsum.photos/id/1060/400/400"],
    stock: 6,
    category: MOCK_CATEGORIES[1],
  },
  {
    id: 5,
    title: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones.",
    price: 199,
    images: ["https://picsum.photos/id/1080/400/400"],
    stock: 20,
    category: MOCK_CATEGORIES[2],
  },
  {
    id: 6,
    title: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with tactile switches.",
    price: 149,
    images: ["https://picsum.photos/id/30/400/400"],
    stock: 15,
    category: MOCK_CATEGORIES[2],
  },
];
