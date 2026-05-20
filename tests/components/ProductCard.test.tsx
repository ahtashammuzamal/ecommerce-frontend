import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../../src/components/common/ProductCard";

// Mock dependent hooks
vi.mock("../../src/context/AuthContext", () => ({
  useAuthContext: () => ({
    isAuthenticated: true,
  }),
}));

vi.mock("../../src/hooks/tanstack/cart/useAddToCart", () => ({
  useAddToCart: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

describe("ProductCard Component (src/components/common/ProductCard.tsx)", () => {
  it("renders card content correctly", () => {
    render(
      <MemoryRouter>
        <ProductCard
          id={123}
          imageURL="https://example.com/image.jpg"
          title="Minimalist Mug"
          categoryName="Kitchenware"
          price={18}
          stock={15}
        />
      </MemoryRouter>
    );

    // Verify correct fields displayed
    expect(screen.getByText("Minimalist Mug")).toBeInTheDocument();
    expect(screen.getByText("Kitchenware")).toBeInTheDocument();
    expect(screen.getByText("18")).toBeInTheDocument();
    
    // Verify Stock indicator
    expect(screen.getByText("In Stock")).toBeInTheDocument();

    // Verify Link redirection path
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/products/123");
  });

  it("displays out-of-stock indicators when stock is zero", () => {
    render(
      <MemoryRouter>
        <ProductCard
          id={123}
          imageURL="https://example.com/image.jpg"
          title="Minimalist Mug"
          categoryName="Kitchenware"
          price={18}
          stock={0}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Out Of Stock")).toBeInTheDocument();
  });
});
