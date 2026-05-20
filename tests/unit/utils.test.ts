import { describe, it, expect } from "vitest";
import { cn, calculateSubtotal, truncateTitle, organizeDate } from "../../src/lib/utils";
import type { CartItem } from "../../src/types";

describe("Utility Functions (src/lib/utils.ts)", () => {
  // Test Class Name Merger helper
  describe("cn", () => {
    it("should merge tailwind classes cleanly", () => {
      expect(cn("px-2", "py-2")).toBe("px-2 py-2");
    });

    it("should resolve conflicts correctly using tailwind-merge", () => {
      expect(cn("p-4", "p-2")).toBe("p-2");
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("should filter falsy values", () => {
      expect(cn("px-2", null, undefined, false, "py-2")).toBe("px-2 py-2");
    });
  });

  // Test Shopping Cart Subtotal Math
  describe("calculateSubtotal", () => {
    it("should return 0 when cart is undefined or empty", () => {
      expect(calculateSubtotal(undefined)).toBe(0);
      expect(calculateSubtotal([])).toBe(0);
    });

    it("should calculate correct totals for multiple items", () => {
      const items: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 101,
            title: "Classic Tee",
            price: 20,
            images: [],
            category: {
              id: 1,
              name: "Apparel",
              slug: "apparel",
              imageURL: "",
              products: []
            },
            stock: 15,
            description: "A tee",
            categoryId: 1
          }
        },
        {
          id: 2,
          quantity: 3,
          product: {
            id: 102,
            title: "Denim Jacket",
            price: 80,
            images: [],
            category: {
              id: 1,
              name: "Apparel",
              slug: "apparel",
              imageURL: "",
              products: []
            },
            stock: 5,
            description: "A jacket",
            categoryId: 1
          }
        }
      ];

      // Math: (20 * 2) + (80 * 3) = 40 + 240 = 280
      expect(calculateSubtotal(items)).toBe(280);
    });
  });

  // Test Title Truncation Helper
  describe("truncateTitle", () => {
    it("should return the full string if it is shorter than the limit", () => {
      expect(truncateTitle("Hello", 10)).toBe("Hello");
    });

    it("should truncate and append ellipses if string is longer than the limit", () => {
      expect(truncateTitle("Hello World", 5)).toBe("Hello...");
    });

    it("should handle boundary conditions exactly", () => {
      expect(truncateTitle("12345", 5)).toBe("12345");
      expect(truncateTitle("123456", 5)).toBe("12345...");
    });
  });

  // Test Date Organizer formatting
  describe("organizeDate", () => {
    it("should format ISO string into clean format: DD MMM YYYY", () => {
      // 2026-05-20 is May 20th
      const dateStr = "2026-05-20T12:00:00Z";
      const formatted = organizeDate(dateStr);
      expect(formatted).toBe("20 May 2026");
    });

    it("should handle single digit days correctly", () => {
      const dateStr = "2026-05-09T12:00:00Z";
      const formatted = organizeDate(dateStr);
      expect(formatted).toBe("9 May 2026");
    });
  });
});
