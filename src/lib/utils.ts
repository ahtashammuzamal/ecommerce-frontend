import type { CartItem } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateSubtotal(cartItems: CartItem[] | undefined) {
  let subtotal = 0;
  cartItems?.forEach(
    (item) => (subtotal += item.product.price * item.quantity),
  );
  return subtotal;
}

export function truncateTitle(title: string, limit: number) {
  if (title.length > limit) {
    return title.slice(0, limit) + "...";
  }
  return title;
}

export function organizeDate(date: string) {
  const d = new Date(date);
  const day = d.getUTCDate();
  const month = d.toLocaleString("default", { month: "short" });
  const year = d.getUTCFullYear();

  return `${day} ${month} ${year}`;
}
