import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Cart from "../../src/Pages/Cart";
import { useCart } from "../../src/hooks/tanstack/cart/useCart";
import { useAuthContext } from "../../src/context/AuthContext";

// Mock dependent hooks
vi.mock("../../src/hooks/tanstack/cart/useCart", () => ({
  useCart: vi.fn(),
}));

vi.mock("../../src/context/AuthContext", () => ({
  useAuthContext: vi.fn(),
}));

// Mock child actions components to isolate rendering side-effects
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

describe("Cart Page Integration (src/Pages/Cart.tsx)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderCartPage = () => {
    return render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
  };

  it("renders zero items header if user is guest", () => {
    (useAuthContext as any).mockReturnValue({ isAuthenticated: false });
    (useCart as any).mockReturnValue({
      data: null,
      isPending: false,
      isError: false,
    });

    renderCartPage();

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("0 items")).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("renders loading spinner state when query is fetching", () => {
    (useAuthContext as any).mockReturnValue({ isAuthenticated: true });
    (useCart as any).mockReturnValue({
      data: null,
      isPending: true,
      isError: false,
    });

    renderCartPage();

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders cart details, item counts and pricing math successfully", () => {
    (useAuthContext as any).mockReturnValue({ isAuthenticated: true });
    (useCart as any).mockReturnValue({
      data: {
        success: true,
        totalCartItems: 2,
        cart: {
          id: 1,
          cartItems: [
            {
              id: 10,
              quantity: 2,
              product: {
                id: 101,
                title: "Leather Wallet",
                price: 45,
                images: ["https://example.com/wallet.jpg"],
                category: { name: "Accessories" },
                stock: 12,
              },
            },
          ],
        },
      },
      isPending: false,
      isError: false,
    });

    renderCartPage();

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    // Description text displays item count
    expect(screen.getByText("1 items")).toBeInTheDocument();
    
    // Subtotal math: 45 * 2 = 90
    expect(screen.getByText("Leather Wallet")).toBeInTheDocument();
    expect(screen.getByText("Subtotal (1 items)")).toBeInTheDocument();
    expect(screen.getAllByText("$90")[0]).toBeInTheDocument();
  });
});
