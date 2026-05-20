import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import UserCart from "../../src/components/cart/UserCart";

// Mock dependent hooks used inside Cart components
vi.mock("../../src/hooks/tanstack/cart/useRemoveFromCart", () => ({
  useRemoveFromCart: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("../../src/hooks/tanstack/cart/useUpdateCart", () => ({
  useUpdateCart: () => ({
    mutate: vi.fn(),
    isPending: false,
    variables: null,
  }),
}));

describe("UserCart Component (src/components/cart/UserCart.tsx)", () => {
  const mockCartItems = [
    {
      id: 1,
      quantity: 2,
      product: {
        _id: "prod-1",
        title: "Eco Cotton Tee",
        price: 25,
        images: ["https://example.com/tee.jpg"],
        category: { name: "Clothing" },
        stock: 20,
        description: "A comfortable organic cotton t-shirt.",
      },
    },
    {
      id: 2,
      quantity: 1,
      product: {
        _id: "prod-2",
        title: "Retro Canvas Sneakers",
        price: 60,
        images: ["https://example.com/sneakers.jpg"],
        category: { name: "Footwear" },
        stock: 5,
        description: "Classic sneakers for everyday wear.",
      },
    },
  ];

  it("renders the loading spinner fallback when isPending is true", () => {
    render(
      <MemoryRouter>
        <UserCart
          cartItems={[]}
          subTotal={0}
          totalCartItems={0}
          isPending={true}
          isError={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument(); // Spinner uses role="status"
    expect(screen.queryByText("Order Summary")).not.toBeInTheDocument();
  });

  it("renders the empty cart view when cartItems is empty and not loading/error", () => {
    render(
      <MemoryRouter>
        <UserCart
          cartItems={[]}
          subTotal={0}
          totalCartItems={0}
          isPending={false}
          isError={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.queryByText("Order Summary")).not.toBeInTheDocument();
  });

  it("renders the cart items and order summary successfully", () => {
    render(
      <MemoryRouter>
        <UserCart
          cartItems={mockCartItems as any}
          subTotal={110}
          totalCartItems={3}
          isPending={false}
          isError={false}
        />
      </MemoryRouter>
    );

    // Verify product details rendered
    expect(screen.getByText("Eco Cotton Tee")).toBeInTheDocument();
    expect(screen.getByText("Retro Canvas Sneakers")).toBeInTheDocument();

    // Verify subtotal math in order summary
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("Subtotal (3 items)")).toBeInTheDocument();
    
    // There will be two price values of $110 (one for subtotal, one for total)
    const subtotalTextElements = screen.getAllByText("$110");
    expect(subtotalTextElements.length).toBeGreaterThanOrEqual(2);
  });
});
